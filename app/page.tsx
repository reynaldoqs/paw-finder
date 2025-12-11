import { Suspense } from "react";
import { PromotedSection, PromotedSectionSkeleton } from "@/components";
import { HeroSection } from "@/components/organisms/hero-section";

export default function Home() {
  return (
    <main className="flex flex-col justify-between h-full py-2 md:py-4">
      <HeroSection />
      <Suspense fallback={<PromotedSectionSkeleton />}>
        <PromotedSection />
      </Suspense>
    </main>
  );
}
