import { HeroSection } from "@/components/organisms/hero-section";
import { PetsMarquee } from "@/components/organisms/pets-marquee";

export default function Home() {
  return (
    <main className="flex flex-col min-h-screen">
      <HeroSection />
      <PetsMarquee />
    </main>
  );
}
