import camelcaseKeys from "camelcase-keys";
import { getPromotedAnimals } from "@/actions/get-promoted-animals";
import { cn, sizedArray } from "@/lib/utils";
import { Animal, type LostAnimal } from "@/types";
import { LogoLoop } from "../atoms";
import { PetCard, PetCardSkeleton } from "../molecules/pet-card";

type PromotedSectionProps = {
  className?: string;
};

export const PromotedSection = async ({ className }: PromotedSectionProps) => {
  const response = await getPromotedAnimals();
  const lostAnimals = camelcaseKeys(response);
  const animalCards = lostAnimals.map((animal) => ({
    node: <PetCard animal={animal} className="h-[100px] w-[120px]" />,
    title: animal.name,
  }));
  return (
    <section className={cn("flex flex-col items-center", className)}>
      <h2 className="font-bold text-xl text-foreground">Lost animals</h2>
      <p className="text-muted-foreground text-xs">
        Find lost pets and help them find their way home.
      </p>
      <div className="w-full h-[122px] mt-4 relative overflow-hidden">
        <LogoLoop
          logos={animalCards}
          speed={8}
          direction="left"
          logoHeight={100}
          gap={16}
          hoverSpeed={0}
          scaleOnHover
          fadeOut
          fadeOutColor="transparent"
          ariaLabel="lost pets"
        />
      </div>
    </section>
  );
};

export const PromotedSectionSkeleton = () => {
  return (
    <div className="flex flex-col items-center">
      <h2 className="font-bold text-xl text-foreground">Lost animals</h2>
      <p className="text-muted-foreground text-xs">
        Find lost pets and help them find their way home.
      </p>
      <div className="w-full h-[122px] mt-4 flex items-center gap-[16px] overflow-hidden">
        {sizedArray(12).map((item) => (
          <PetCardSkeleton key={item} className="min-h-[100px] min-w-[120px]" />
        ))}
      </div>
    </div>
  );
};
