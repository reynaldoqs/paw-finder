import Link from "next/link";
import { Button } from "../atoms";
import { ImageMagnifier } from "../molecules";

export const HeroSection = () => {
  return (
    <section className="relative flex flex-col md:flex-row md:justify-between min-h-[60vh] w-full max-w-[1600px] mx-auto overflow-hidden">
      <div className="flex flex-1 flex-col justify-center space-y-4 md:space-y-6">
        <div className="px-4 py-2 md:px-6">
          <h1 className="text-4xl md:text-6xl font-extrabold tracking-normal">
            Discover the <br /> World’s Top Designers
          </h1>
          <p className="text-md md:text-lg text-foreground font-medium w-full md:w-2/3 leading-5 md:leading-5 mt-4">
            Explore work from the most talented and accomplished designers ready
            to take on your next project.
          </p>
        </div>
        <div className="px-4 md:px-6 flex flex-col sm:flex-row gap-3 md:gap-6">
          <Button
            asChild
            size="lg"
            variant="outline"
            className="text-base md:text-lg px-6 py-[10px] md:px-8 md:py-[16px] rounded-lg border-2"
          >
            <Link href="/animals/found">Report found pet</Link>
          </Button>
          <Button
            asChild
            size="lg"
            className="text-base md:text-lg px-6 py-[10px] md:px-8 md:py-[18px] rounded-lg"
          >
            <Link href="/animals/lost">Report lost pet</Link>
          </Button>
        </div>
      </div>
      <ImageMagnifier
        src="/images/pets.webp"
        alt="Paw Icon"
        width={600}
        height={320}
        circleRadius={40}
        easing={0.15}
      />
    </section>
  );
};
