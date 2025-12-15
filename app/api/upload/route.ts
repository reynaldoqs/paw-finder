import { type NextRequest, NextResponse } from "next/server";
import OpenAI from "openai";
import { createClient } from "@/lib/supabase/server";
import { type Animal, animalFormSchema, type ResponseBody } from "@/types";

const openaiClient = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

// export const runtime = "edge";

export async function POST(request: NextRequest) {
  try {
    const supabase = await createClient();

    const {
      data: { user },
      error: authError,
    } = await supabase.auth.getUser();

    if (authError || !user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const formData = await request.formData();
    const formDataObject = {
      name: formData.get("name"),
      specie: formData.get("specie"),
      breed: formData.get("breed") || undefined,
      color: formData.get("color"),
      description: formData.get("description"),
      location: formData.get("location"),
      contactNumber: formData.get("contactNumber"),
      lostDate: formData.get("lostDate") || undefined,
      imageFile: formData.get("imageFile"),
    };

    const validationResult = animalFormSchema.safeParse(formDataObject);

    if (!validationResult.success) {
      const errors = validationResult.error.flatten().fieldErrors;
      console.log("errors:", errors);
      return NextResponse.json(
        { error: "Validation failed", errors },
        { status: 400 }
      );
    }

    const validatedData = validationResult.data;
    const image = validatedData.imageFile as any;

    const imageUuid = `${crypto.randomUUID()}.jpg`;
    const { data: uploadData, error: uploadError } = await supabase.storage
      .from("animals")
      .upload(imageUuid, image, {
        // cacheControl: "3600",
        // upsert: false,
      });

    if (uploadError)
      return NextResponse.json({ error: uploadError.message }, { status: 500 });

    const image_url = `${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/animals/${uploadData.path}`;

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

    let generatedDescription = response.choices[0].message.content || "";

    if (!generatedDescription) {
      console.error(
        "Failed to generate description, using specie + color instead"
      );
      generatedDescription = `${validatedData.specie} ${validatedData.color}`;
    }

    const embedding = await openaiClient.embeddings.create({
      model: "text-embedding-3-large",
      input: generatedDescription,
    });

    const {
      // biome-ignore lint/correctness/noUnusedVariables: a way to not use delete
      imageFile,
      lostDate: lost_date,
      contactNumber: contact_number,
      ...rest
    } = validatedData;

    const { data: animal } = await supabase
      .from("lost_animal")
      .insert([{ ...rest, lost_date, contact_number, image_url }])
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

    const res: ResponseBody<Animal> = {
      success: true,
      data: animal,
    };

    return NextResponse.json(res, { status: 200 });
  } catch (error) {
    console.error("Unexpected error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
