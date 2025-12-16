import camelcaseKeys from "camelcase-keys";
import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import type z from "zod/v3";
import type { AnimalAI, AnimalForm, ResponseBody } from "@/types";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const fetcher =
  <T = unknown>(schema: z.ZodSchema) =>
  async (url: string): Promise<ResponseBody<T>> => {
    const res = await fetch(url);

    if (!res.ok) {
      throw new Error("Server error: Error fetching data");
    }
    const parsedData = camelcaseKeys(await res.json(), { deep: true });
    console.log("parsedData:", parsedData);
    const validatedData = schema.safeParse(parsedData.data);
    if (!validatedData.success) {
      console.log("validatedData.error", validatedData.error);
      throw new Error("Server error: Invalid data");
    }

    return validatedData.data as ResponseBody<T>;
  };

export const objectToFormData = (object: Record<string, unknown>) => {
  const formData = new FormData();

  Object.entries(object).forEach(([key, value]) => {
    if (key === "imageFile" && Array.isArray(value) && value.length > 0) {
      const imageData = value[0];
      if (imageData.file) {
        formData.append(key, imageData.file);
      }
    } else if (value instanceof File) {
      formData.append(key, value);
    } else if (value instanceof Date) {
      formData.append(key, value.toISOString());
    } else if (value !== null && value !== undefined) {
      formData.append(key, String(value));
    }
  });

  return formData;
};

export const animalAItoAnimalForm = (
  animalAI: AnimalAI
): Partial<AnimalForm> => {
  const {
    specie,
    breed,
    color,
    size,
    estimatedAge,
    imageBase64,
    embeddingDescription,
  } = animalAI;

  const animalForm = {
    specie,
    breed,
    color,
    size,
    estimatedAge,
    imageBase64,
    embeddingDescription,
    description: animalAI.distinctiveFeatures.join(", "),
  };

  return animalForm;
};

export const postData = async <T = unknown>(
  url: string,
  data: unknown
): Promise<T> => {
  const response = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    throw new Error(`Failed to post data: ${response.statusText}`);
  }

  return response.json();
};

export const delay = (ms: number) => new Promise((res) => setTimeout(res, ms));

export const sizedArray = (size: number) =>
  Array.from({ length: size }, (_, index) => `item ${index + 1}`);
