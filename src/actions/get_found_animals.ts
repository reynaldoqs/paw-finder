"use server";

import { createClient } from "@/lib/supabase/server";
import type { FoundAnimal } from "@/types/animal";

export async function getFoundAnimals(): Promise<FoundAnimal[]> {
  const supabase = await createClient();
  const { data, error } = await supabase.rpc("get_found_animals");

  if (error) {
    console.error("Server error:", error);
    return [];
  }

  return data as FoundAnimal[];
}
