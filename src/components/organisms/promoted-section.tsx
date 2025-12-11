import camelcaseKeys from "camelcase-keys";
import { getPromotedAnimals } from "@/actions/get-promoted-animals";
import { cn, sizedArray } from "@/lib/utils";
import { PetCard, PetCardSkeleton } from "../molecules/pet-card";

type PromotedSectionProps = {
  className?: string;
};

export const PromotedSection = async ({ className }: PromotedSectionProps) => {
  const response = await getPromotedAnimals();
  const lostAnimals = camelcaseKeys(response);
  return (
    <section className={cn("flex flex-col items-center", className)}>
      <h2 className="font-bold text-xl text-foreground">Lost animals</h2>
      <p className="text-muted-foreground text-xs">
        Find lost pets and help them find their way home.
      </p>

      <div className="flex flex-wrap justify-center gap-4 mt-4">
        {lostAnimals.map((animal) => (
          <PetCard key={animal.id} animal={animal} />
        ))}
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
      <div className="flex flex-wrap justify-center gap-4 mt-4">
        {sizedArray(4).map((item) => (
          <PetCardSkeleton key={item} />
        ))}
      </div>
    </div>
  );
};
