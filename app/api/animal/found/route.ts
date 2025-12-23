import { type NextRequest, NextResponse } from "next/server";
import OpenAI from "openai";
import { createFoundAnimal } from "@/actions/create-found-animal";
import { createClient } from "@/lib/supabase/server";

import {
  type FoundAnimal,
  foundAnimalFormSchema,
  type ResponseBody,
} from "@/types";

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

    const requestBody = await request.json();

    const validationResult = foundAnimalFormSchema.safeParse(requestBody);

    if (!validationResult.success) {
      console.error("[Validation Error]:", validationResult.error);
      return NextResponse.json(
        {
          error: "Invalid form data",
          details: validationResult.error.format(),
        },
        { status: 400 }
      );
    }

    const validatedFormData = validationResult.data;

    const { error: creationError, animal: createdAnimal } =
      await createFoundAnimal({
        formData: validatedFormData,
        userId: user.id,
      });

    if (creationError || !createdAnimal) {
      console.error("[Found Animal Creation Error]:", creationError);
      return NextResponse.json(
        { error: "Failed to create found animal record" },
        { status: 500 }
      );
    }

    try {
      const embeddingResponse = await openaiClient.embeddings.create({
        model: "text-embedding-3-small",
        input:
          validatedFormData.embeddingDescription ||
          validatedFormData.description ||
          "",
      });

      const embeddingVector = embeddingResponse.data[0]?.embedding;

      if (!embeddingVector) {
        throw new Error("No embedding vector returned from OpenAI");
      }

      const { error: embeddingInsertError } = await supabase
        .from("found_animal_embeddings")
        .insert({
          animal_id: createdAnimal.id,
          embedding: embeddingVector,
        });

      if (embeddingInsertError) {
        console.error("[Embedding DB Error]:", embeddingInsertError);
      }
    } catch (embeddingError) {
      console.error("[Embedding Process Error]:", embeddingError);
    }

    const response: ResponseBody<FoundAnimal> = {
      success: true,
      message: "Found animal created successfully",
      data: createdAnimal,
    };

    return NextResponse.json(response, { status: 200 });
  } catch (error) {
    console.error("[Found Animal API Error]:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
