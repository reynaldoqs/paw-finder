import { type NextRequest, NextResponse } from "next/server";
import OpenAI from "openai";
import { createClient } from "@/lib/supabase/server";
import { omit } from "@/lib/utils";
import { type Animal, foundAnimalFormSchema, type ResponseBody } from "@/types";

const openaiClient = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

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

    const formData = await request.json();

    const validationResult = foundAnimalFormSchema.safeParse(formData);

    if (!validationResult.success) {
      console.log("Validation failed:", validationResult.error);
      const errors = validationResult.error.flatten().fieldErrors;
      return NextResponse.json(
        { error: "Validation failed", errors },
        { status: 400 }
      );
    }

    const validatedData = validationResult.data;
    console.log("Validation success");

    const base64Data = validatedData.imageBase64.replace(
      /^data:image\/\w+;base64,/,
      ""
    );
    const buffer = Buffer.from(base64Data, "base64");

    const imageUuid = `${crypto.randomUUID()}.jpg`;
    const { data: uploadData, error: uploadError } = await supabase.storage
      .from("animals")
      .upload(imageUuid, buffer, {
        contentType: "image/jpeg",
        cacheControl: "3600",
        upsert: false,
      });

    if (uploadError)
      return NextResponse.json({ error: uploadError.message }, { status: 500 });

    const image_url = `${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/animals/${uploadData.path}`;

    const embedding = await openaiClient.embeddings.create({
      model: "text-embedding-3-large",
      input:
        validatedData.embeddingDescription || validatedData.description || "",
    });

    const {
      estimatedAge: estimated_age,
      contactNumber: contact_number,
      ...rest
    } = omit(validatedData, "imageBase64", "embeddingDescription");

    const { data: animal, error: animalError } = await supabase
      .from("found_animal")
      .insert([{ ...rest, contact_number, estimated_age, image_url }])
      .select()
      .single();

    console.log("Animal error:", animalError);

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
      message: "Found animal created successfully",
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
