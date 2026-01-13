"use server";
import { createClient } from "@/lib/supabase/server";
import { delay } from "@/lib/utils";
import type { LostAnimal } from "@/types/animal";

export async function getPromotedAnimals(): Promise<LostAnimal[]> {
	const supabase = await createClient();

	const { data: lostAnimals, error } = await supabase
		.from("animal")
		.select("*")
		.order("created_at", { ascending: false })
		.limit(4);

	if (error) {
		console.error("Database error:", error);
		return [];
	}
	await delay(2000);

	return lostAnimals || [];
}
