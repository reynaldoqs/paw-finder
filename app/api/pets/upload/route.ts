import { type NextRequest, NextResponse } from "next/server";
import OpenAI from "openai";
import { createClient } from "@/src/lib/supabase/server";

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
    const file = formData.get("image") as File;

    if (!file) {
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
    if (!validImageTypes.includes(file.type)) {
      return NextResponse.json(
        {
          error: "Invalid file type. Only JPEG, PNG, WebP, and GIF are allowed",
        },
        { status: 400 }
      );
    }

    const imageFile = formData.get("image") as File;
    const name = formData.get("name") as string;
    const type = formData.get("type") as "lost" | "found";

    // 1️⃣ Upload image to Supabase Storage

    const location = `${crypto.randomUUID()}.jpg`;
    console.log("location", location);

    const { data: uploadData, error: uploadError } = await supabase.storage
      .from("animals")
      .upload(location, imageFile, {
        // cacheControl: "3600",
        // upsert: false,
      });

    console.log("uploadData 1111:", uploadError);

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

    const description = response.choices[0].message.content || "";

    if (!description) {
      return NextResponse.json(
        { error: "Failed to generate description" },
        { status: 500 }
      );
    }

    const embedding = await openaiClient.embeddings.create({
      model: "text-embedding-3-large",
      input: description,
    });

    const { data: animal } = await supabase
      .from("animals")
      .insert([{ name, description, type, image_url }])
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
