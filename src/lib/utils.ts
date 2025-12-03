import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const fetcher = async <T>(url: string): Promise<T> => {
  const res = await fetch(url, {
    method: "GET",
    headers: { "Content-Type": "application/json" },
  });

  if (!res.ok) {
    throw new Error("Error fetching data");
  }

  return res.json();
};

export const objectToFormData = (object: Record<string, unknown>) => {
  const formData = new FormData();

  Object.entries(object).forEach(([key, value]) => {
    formData.append(key, value as string);
  });

  return formData;
};
