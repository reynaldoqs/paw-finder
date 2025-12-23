import { Suspense } from "react";
import { Spinner } from "@/components";
import { FoundPetsGrid } from "@/components/organisms/found-pets-grid";

export default async function FoundPage() {
  return (
    <div>
      <Suspense
        fallback={
          <div className="flex p-4 place-content-center">
            <Spinner />
          </div>
        }
      >
        <FoundPetsGrid />
      </Suspense>
    </div>
  );
}
