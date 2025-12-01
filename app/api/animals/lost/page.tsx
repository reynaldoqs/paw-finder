import { redirect } from "next/navigation";
import { LostReportContent } from "@/src/components";
import { TransitionDemo } from "@/src/components/organisms/transition-demo";
import { createClient } from "@/src/lib/supabase/server";

export default async function ProtectedPage() {
  const supabase = await createClient();

  const { data, error } = await supabase.auth.getClaims();
  if (error || !data?.claims) {
    redirect("/auth/login");
  }

  return <LostReportContent />;
}
