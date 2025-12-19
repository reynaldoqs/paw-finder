import Link from "next/link";
import { Button } from "../atoms";
import { ImageMagnifier } from "../molecules";

export const HeroSection = () => {
  return (
    <section className="relative flex flex-col md:flex-row md:justify-between min-h-[60vh] w-full max-w-[1600px] mx-auto overflow-hidden">
      <div className="flex flex-1 flex-col justify-center space-y-4 md:space-y-6">
        <div className="px-4 py-2 md:px-6">
          <h1 className="text-4xl md:text-6xl font-extrabold tracking-normal">
            Reunite Lost Pets <br /> With Their Families
          </h1>
          <p className="text-md md:text-lg text-foreground font-medium w-full md:w-2/3 leading-5 md:leading-5 mt-4">
            Help bring lost pets home. Report found pets or search for your
            missing companion in our community-driven platform.
          </p>
        </div>
        <div className="px-4 md:px-6 flex flex-col sm:flex-row gap-3 md:gap-4">
          <Link
            href="/animal/report/found"
            className="group relative text-base text-center md:text-lg px-8 py-3 md:px-10 md:py-4 rounded-full bg-foreground text-background font-semibold transition-all duration-300 hover:scale-105 hover:shadow-xl overflow-hidden"
          >
            <span className="relative z-10">Report found pet</span>
            <div className="absolute inset-0 bg-gradient-to-r from-primary to-primary/80 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          </Link>

          <Link
            href="/animal/report/lost"
            className="group text-base text-center md:text-lg px-8 py-3 md:px-10 md:py-4 rounded-full border-2 border-foreground/20 font-semibold transition-all duration-300 hover:border-foreground hover:bg-foreground/5 hover:scale-105"
          >
            Report lost pet
          </Link>
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
