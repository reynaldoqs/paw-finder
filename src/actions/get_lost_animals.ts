"use server";

import { createClient } from "@/lib/supabase/server";
import type { LostAnimal } from "@/types/animal";

export async function getLostAnimals(): Promise<LostAnimal[]> {
  const supabase = await createClient();
  const { data, error } = await supabase.rpc("get_lost_animals");

  if (error) {
    console.error("Server error:", error);
    return [];
  }

  return data as LostAnimal[];
}
