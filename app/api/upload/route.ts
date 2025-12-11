import { type NextRequest, NextResponse } from "next/server";
import OpenAI from "openai";
import { createClient } from "@/lib/supabase/server";

const openaiClient = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

// export const runtime = "edge";

export async function POST(request: NextRequest) {
  try {
    const supabase = await createClient();

    // Check if user is authenticated
    const {
      data: { user },
      error: authError,
    } = await supabase.auth.getUser();

    if (authError || !user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // Get the form data
    const formData = await request.formData();
    console.log("formData", formData);
    const image = formData.get("imageFile") as File;

    if (!image) {
      return NextResponse.json(
        { error: "No image file provided" },
        { status: 400 }
      );
    }

    // Validate file type
    const validImageTypes = [
      "image/jpeg",
      "image/jpg",
      "image/png",
      "image/webp",
      "image/gif",
    ];

    console.log("file", image.type);
    if (!validImageTypes.includes(image.type)) {
      return NextResponse.json(
        {
          error: "Invalid file type. Only JPEG, PNG, WebP, and GIF are allowed",
        },
        { status: 400 }
      );
    }

    // 1️⃣ Upload image to Supabase Storage

    const imageUuid = `${crypto.randomUUID()}.jpg`;

    const { data: uploadData, error: uploadError } = await supabase.storage
      .from("animals")
      .upload(imageUuid, image, {
        // cacheControl: "3600",
        // upsert: false,
      });

    console.log("uploadError:", uploadError);

    if (uploadError)
      return NextResponse.json({ error: uploadError.message }, { status: 500 });

    const image_url = `${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/animals/${uploadData.path}`;

    // generate description using OpenAI
    const response = await openaiClient.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        {
          role: "user",
          content: [
            {
              type: "text",
              text: "Describe this image in detail, focusing on the pet's appearance, breed, colors, and distinctive features.",
            },
            {
              type: "image_url",
              image_url: {
                url: image_url,
              },
            },
          ],
        },
      ],
    });

    const generatedDescription = response.choices[0].message.content || "";

    if (!generatedDescription) {
      return NextResponse.json(
        { error: "Failed to generate embedding" },
        { status: 500 }
      );
    }

    const embedding = await openaiClient.embeddings.create({
      model: "text-embedding-3-large",
      input: generatedDescription,
    });

    const lostAnimalData = {
      name: formData.get("name") as string,
      specie: formData.get("specie") as string,
      breed: formData.get("breed") as string,
      color: formData.get("color") as string,
      description: formData.get("description") as string,
      location: formData.get("location") as string,
      contact_number: formData.get("contactNumber") as string,
      lost_date: formData.get("lostDate") as string,
    };

    const { data: animal } = await supabase
      .from("lost_animals")
      .insert([{ ...lostAnimalData, image_url }])
      .select()
      .single();

    if (!animal) {
      return NextResponse.json(
        { error: "Failed to create animal" },
        { status: 500 }
      );
    }

    await supabase
      .from("animal_embeddings")
      .insert([{ animal_id: animal.id, embedding }]);

    return NextResponse.json(
      {
        success: true,
        animal: animal,
        url: image_url,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Unexpected error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
