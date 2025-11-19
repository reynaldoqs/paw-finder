import { redirect } from "next/navigation";
import { UploadContent } from "@/src/components/ui/organisms/lost-paw-form-container";
import { createClient } from "@/src/lib/supabase/server";

export default async function FoundPage() {
  const supabase = await createClient();

  const { data, error } = await supabase.auth.getClaims();
  if (error || !data?.claims) {
    redirect("/auth/login");
  }

  return (
    <div className="flex flex-1 flex-col gap-12">
      <UploadContent />
    </div>
  );
}
