"use server";
import { createClient } from "@/lib/supabase/server";
import { omit, snakeCase } from "@/lib/utils";
import { getImageSize } from "@/lib/utils.server";
import type { AnimalImage, FoundAnimal, FoundAnimalForm } from "@/types/animal";

type CreateFoundAnimalProps = {
  formData: FoundAnimalForm;
  userId: string;
};

type CreateFoundAnimalResult = {
  animal: FoundAnimal | null;
  error: Error | null;
};

const FOUND_ANIMAL_FIELDS = ["contact_number", "found_location"] as const;

export async function createFoundAnimal({
  formData,
  userId,
}: CreateFoundAnimalProps): Promise<CreateFoundAnimalResult> {
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
      ...FOUND_ANIMAL_FIELDS
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

    const foundAnimalData = omit(
      formDataSnakeCase,
      "image_base64",
      "embedding_description",
      ...Object.keys(animalRecord)
    );

    const foundAnimalRecord = {
      id: insertedAnimal.id,
      ...foundAnimalData,
    };

    console.log("animal to insert:", foundAnimalRecord);

    const { data: insertedFoundAnimal, error: foundAnimalInsertError } =
      await supabase
        .from("found_animal")
        .insert(foundAnimalRecord)
        .select()
        .single();

    if (foundAnimalInsertError || !insertedFoundAnimal) {
      throw (
        foundAnimalInsertError ||
        new Error("Failed to insert found animal record")
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
        animal_id: insertedFoundAnimal.id,
        ...imageMetadata,
      });

    if (imageInsertError) {
      console.error("[Animal Image Insert Error]:", imageInsertError);
    }

    const completeFoundAnimal: FoundAnimal = {
      ...insertedFoundAnimal,
      images: [imageMetadata],
    };

    return { animal: completeFoundAnimal, error: null };
  } catch (error) {
    console.error("[Create Found Animal Error]:", error);
    return {
      animal: null,
      error: error instanceof Error ? error : new Error(String(error)),
    };
  }
}
