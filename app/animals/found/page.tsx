// import { redirect } from "next/navigation";
import { LostReportContent } from "@/components";
import { createClient } from "@/lib/supabase/server";

export default async function FoundPage() {
  // const supabase = await createClient();

  // const { data, error } = await supabase.auth.getClaims();
  // if (error || !data?.claims) {
  //   redirect("/auth/login");
  // }

  return (
    <div className="flex flex-1 flex-col gap-12">
      <LostReportContent />
    </div>
  );
}
