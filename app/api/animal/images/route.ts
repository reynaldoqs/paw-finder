import { type NextRequest, NextResponse } from "next/server";
import OpenAI from "openai";
import { animalAISchema } from "@/types";

const openaiClient = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(request: NextRequest) {
  try {
    const data = await request.json();

    if (!data.files || data.files.length === 0) {
      return NextResponse.json(
        {
          success: false,
          message: "No image file provided",
        },
        { status: 400 }
      );
    }

    const base64MainImage = data.files[0].data_url;

    const response = await openaiClient.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        {
          role: "user",
          content: [
            {
              type: "text",
              text: `Analyze this pet image and extract detailed information. Return ONLY a valid JSON object with this EXACT structure:

{
  "embeddingDescription": "A comprehensive description of the pet for semantic search (include breed, colors, distinctive features, and any unique characteristics)",
  "specie": "dog" | "cat" | "rabbit" | "guinea pig" | "hamster" | "other" if uncertain (can be null),
  "breed": "specific breed name or 'Mixed breed' if uncertain (can be null)",
  "color": "color or colors name",
  "size": "small" | "medium" | "large" if uncertain (can be null),
  "distinctiveFeatures": ["feature 1", "feature 2", "feature 3..."],
  "estimatedAge": "infant" | "young" | "adult" | "senior" if uncertain (can be null)"
}

CRITICAL REQUIREMENTS:
- "specie" must be EXACTLY one of: "dog", "cat", "rabbit", "guinea pig", "hamster", or "other"
- "breed" can be a string or null if uncertain
- "color" must be a string of color name (at least one color)
- "size" must be EXACTLY one of: "small", "medium", "large"
- "distinctiveFeatures" must be an array of strings describing notable features
- "estimatedAge" must be EXACTLY one of: "infant", "young", "adult", "senior"

Be as specific and accurate as possible. If uncertain about any field, use the most appropriate general term from the allowed values.`,
            },
            {
              type: "image_url",
              image_url: {
                url: base64MainImage,
              },
            },
          ],
        },
      ],
      response_format: { type: "json_object" },
    });

    const aiResponse = response.choices[0].message.content;

    if (!aiResponse) {
      return NextResponse.json(
        {
          success: false,
          message: "Failed to get response from AI",
        },
        { status: 500 }
      );
    }

    console.log("AI response", aiResponse);

    const animalInfo = JSON.parse(aiResponse);
    // @todo: verify what happens if AI response is a json which doest fit with the schema
    const validatedAnimalInfo = animalAISchema.partial().parse(animalInfo);

    return NextResponse.json(
      {
        success: true,
        message: "Animal information extracted successfully",
        data: {
          ...validatedAnimalInfo,
          imageBase64: base64MainImage,
        },
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error processing animal images:", error);
    return NextResponse.json(
      {
        success: false,
        message: "Failed to process animal images",
        error: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}
