import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import type { Animal, ResponseBody } from "@/types";

export async function GET() {
  try {
    const supabase = await createClient();

    // Query all lost animals from the database
    const { data: lostAnimals, error } = await supabase
      .from("lost_animal")
      .select("*");
    // .eq("status", "active")
    // .order("created_at", { ascending: false });

    if (error) {
      console.error("Database error:", error);
      return NextResponse.json(
        { error: "Failed to fetch lost animals" },
        { status: 500 }
      );
    }

    const response: ResponseBody<Animal[]> = {
      success: true,
      data: lostAnimals || [],
    };

    return NextResponse.json(response, { status: 200 });
  } catch (error) {
    console.error("Unexpected error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
