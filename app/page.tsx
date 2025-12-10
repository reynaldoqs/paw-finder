import { Suspense } from "react";
import { PromotedSection } from "@/components";
import { HeroSection } from "@/components/organisms/hero-section";

export default function Home() {
  return (
    <main className="flex flex-col min-h-screen">
      <HeroSection />
      <Suspense fallback={<div>loading</div>}>
        <PromotedSection />
      </Suspense>
    </main>
  );
}
