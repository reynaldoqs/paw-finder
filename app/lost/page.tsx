import { InfoIcon } from "lucide-react";
import { redirect } from "next/navigation";
import { createClient } from "@/src/lib/supabase/server";

export default async function ProtectedPage() {
  const supabase = await createClient();

  const { data, error } = await supabase.auth.getClaims();
  if (error || !data?.claims) {
    redirect("/auth/login");
  }

  return <div className="flex-1 w-full flex flex-col gap-12">as</div>;
}
