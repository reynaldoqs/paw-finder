import camelcaseKeys from "camelcase-keys";
import { Suspense } from "react";
import { getPromotedAnimals } from "@/actions/get-promoted-animals";
import { cn } from "@/lib/utils";
import { PetCard } from "../molecules/pet-card";

type PromotedSectionProps = {
  className?: string;
};

export const PromotedSection = async ({ className }: PromotedSectionProps) => {
  const response = await getPromotedAnimals();
  const lostAnimals = camelcaseKeys(response);
  return (
    <section className={cn("flex flex-wrap justify-center gap-4", className)}>
      {lostAnimals.map((animal, index) => (
        <PetCard key={animal.id} animal={animal} />
      ))}
    </section>
  );
};
