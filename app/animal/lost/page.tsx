import { redirect } from "next/navigation";
import { Suspense } from "react";
import { Spinner } from "@/components";
import { LostPetsGrid } from "@/components/organisms/lost-pets-grid";
import { createClient } from "@/lib/supabase/server";

export default async function ProtectedPage() {
  const supabase = await createClient();

  const { data, error } = await supabase.auth.getClaims();
  if (error || !data?.claims) {
    redirect("/auth/login");
  }

  return (
    <div>
      <Suspense
        fallback={
          <div className="flex p-4 place-content-center">
            <Spinner />
          </div>
        }
      >
        <LostPetsGrid />
      </Suspense>
    </div>
  );
}
