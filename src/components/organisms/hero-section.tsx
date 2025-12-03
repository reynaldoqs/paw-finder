import Image from "next/image";
import { Button } from "../atoms";

export const HeroSection = () => {
  return (
    <section className="relative flex justify-between min-h-[60vh] w-full max-w-[1600px] mx-auto overflow-hidden">
      <div className="flex flex-1 flex-col justify-center space-y-6">
        <div className="px-6 py-2">
          <h1 className="text-4xl md:text-6xl font-extrabold tracking-normal">
            Discover the <br /> World’s Top Designers
          </h1>
          <p className="text-md md:text-lg text-foreground font-medium w-2/3 leading-5 md:leading-5 mt-4">
            Explore work from the most talented and accomplished designers ready
            to take on your next project.
          </p>
        </div>
        <div className="px-6 flex gap-6">
          <Button
            type="button"
            size="lg"
            variant="outline"
            className="text-lg px-8 py-6 rounded-lg border-2"
          >
            Report found pet
          </Button>
          <Button
            type="button"
            size="lg"
            className="text-lg px-8 py-6 rounded-lg"
          >
            Report lost pet
          </Button>
        </div>
      </div>
      <div className="flex flex-1 justify-center pl-6">
        <Image
          src="/images/cat-dog.png"
          alt="Paw Icon"
          objectFit="contain"
          width={390}
          height={350}
        />
      </div>
    </section>
  );
};
