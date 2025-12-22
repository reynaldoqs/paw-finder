"use server";
import { createClient } from "@/lib/supabase/server";
import { omit, snakeCase } from "@/lib/utils";
import { getImageSize } from "@/lib/utils.server";
import type { AnimalImage, LostAnimal, LostAnimalForm } from "@/types/animal";

type CreateLostAnimalProps = {
  formData: LostAnimalForm;
  userId: string;
};

type CreateLostAnimalResult = {
  animal: LostAnimal | null;
  error: Error | null;
};

const LOST_ANIMAL_FIELDS = [
  "contact_number",
  "lost_date",
  "name",
  "last_seen_location",
] as const;

export async function createLostAnimal({
  formData,
  userId,
}: CreateLostAnimalProps): Promise<CreateLostAnimalResult> {
  try {
    const supabase = await createClient();

    const base64Content = formData.imageBase64.replace(
      /^data:image\/\w+;base64,/,
      ""
    );
    const imageBuffer = Buffer.from(base64Content, "base64");
    const imageFileName = `${crypto.randomUUID()}.jpg`;
    const { data: uploadedFile, error: uploadError } = await supabase.storage
      .from("animals")
      .upload(imageFileName, imageBuffer, {
        contentType: "image/jpeg",
        cacheControl: "3600",
        upsert: false,
      });

    if (uploadError || !uploadedFile) {
      throw uploadError || new Error("Failed to upload image");
    }

    const imageUrl = `${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/animals/${uploadedFile.path}`;

    const formDataSnakeCase = snakeCase(formData);

    const baseAnimalData = omit(
      formDataSnakeCase,
      "image_base64",
      "embedding_description",
      ...LOST_ANIMAL_FIELDS
    );

    const animalRecord = {
      ...baseAnimalData,
      image_url: imageUrl,
      user_id: userId,
    };

    const { data: insertedAnimal, error: animalInsertError } = await supabase
      .from("animal")
      .insert(animalRecord)
      .select()
      .single();

    if (animalInsertError || !insertedAnimal) {
      throw animalInsertError || new Error("Failed to insert animal record");
    }

    const lostAnimalSpecificData = omit(
      formDataSnakeCase,
      "image_base64",
      "embedding_description",
      ...Object.keys(baseAnimalData)
    );

    const lostAnimalRecord = {
      id: insertedAnimal.id,
      ...lostAnimalSpecificData,
    };

    const { data: insertedLostAnimal, error: lostAnimalInsertError } =
      await supabase
        .from("lost_animal")
        .insert(lostAnimalRecord)
        .select()
        .single();

    if (lostAnimalInsertError || !insertedLostAnimal) {
      throw (
        lostAnimalInsertError ||
        new Error("Failed to insert lost animal record")
      );
    }

    const { width, height } = getImageSize(imageBuffer);
    const imageMetadata: AnimalImage = {
      url: imageUrl,
      width,
      height,
    };

    const { error: imageInsertError } = await supabase
      .from("animal_image")
      .insert({
        animal_id: insertedAnimal.id,
        ...imageMetadata,
      });

    if (imageInsertError) {
      console.error("[Animal Image Insert Error]:", imageInsertError);
    }

    const completeLostAnimal: LostAnimal = {
      ...insertedAnimal,
      ...insertedLostAnimal,
      images: [imageMetadata],
    };

    return { animal: completeLostAnimal, error: null };
  } catch (error) {
    console.error("[Create Lost Animal Error]:", error);
    return {
      animal: null,
      error: error instanceof Error ? error : new Error(String(error)),
    };
  }
}
