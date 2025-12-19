import { redirect } from "next/navigation";
import { LostReportContent } from "@/components";
import { TransitionDemo } from "@/components/organisms/transition-demo";
import { createClient } from "@/lib/supabase/server";

export default async function ProtectedPage() {
  const supabase = await createClient();

  const { data, error } = await supabase.auth.getClaims();
  if (error || !data?.claims) {
    redirect("/auth/login");
  }

  return <div>Lost</div>;
}
