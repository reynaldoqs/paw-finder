"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import type { z } from "zod/v4";
import { species } from "@/constants";

import {
  type LostAnimal,
  type LostAnimalForm,
  lostAnimalFormSchema,
} from "@/types";
import { AnimalButton, Button, FieldGroup } from "../atoms";
import { useStepper } from "../molecules/stepper-context";

const speciesFormSchema = lostAnimalFormSchema.pick({ specie: true });

type SpeciesFormData = z.infer<typeof speciesFormSchema>;

export const LostAnimalSpeciesForm: React.FC = () => {
  const { prev, next, formData, updateFormData } =
    useStepper<Partial<LostAnimalForm>>();

  const { setValue, watch, handleSubmit, formState } = useForm<SpeciesFormData>(
    {
      resolver: zodResolver(speciesFormSchema),
      mode: "onChange",
      defaultValues: {
        specie: formData.specie || undefined,
      },
    }
  );

  const selectedSpecie = watch("specie");

  const onFormSubmit = (data: SpeciesFormData) => {
    updateFormData({ specie: data.specie ?? undefined });
    next();
  };

  return (
    <form
      onSubmit={handleSubmit(onFormSubmit)}
      className="flex flex-col flex-1 mt-10 w-full"
    >
      <FieldGroup className="flex-1">
        <div className="grid grid-cols-3 grid-rows-2 gap-3 md:gap-4">
          {species.map((specie) => (
            <AnimalButton
              key={specie}
              specie={specie}
              isSelected={selectedSpecie === specie}
              onClick={() =>
                setValue("specie", specie, { shouldValidate: true })
              }
            />
          ))}
        </div>
      </FieldGroup>

      <div className="flex items-center justify-end gap-2 pt-4">
        <Button type="button" size="lg" variant="ghost" onClick={prev}>
          Previous
        </Button>

        <Button
          type="submit"
          size="lg"
          disabled={!formState.isValid || !selectedSpecie}
        >
          Continue
        </Button>
      </div>
    </form>
  );
};
