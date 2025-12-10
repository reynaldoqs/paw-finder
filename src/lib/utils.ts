import camelcaseKeys from "camelcase-keys";
import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import type z from "zod/v3";
import type { ResponseBody } from "@/types";

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
    formData.append(key, value as string);
  });

  return formData;
};

export const delay = (ms: number) => new Promise((res) => setTimeout(res, ms));
