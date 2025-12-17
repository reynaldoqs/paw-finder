"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import type { z } from "zod/v3";
import { species } from "@/constants";

import { lostAnimalFormSchema } from "@/types";
import { AnimalButton, Button, FieldGroup } from "../atoms";
import { useStepper } from "../molecules/stepper-context";

const speciesFormSchema = lostAnimalFormSchema.pick({ specie: true });

type SpeciesFormData = z.infer<typeof speciesFormSchema>;

export const FoundAnimalSpeciesForm: React.FC = () => {
  const { prev, next, formData, updateFormData } = useStepper();

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
    updateFormData(data);
    next();
  };

  return (
    <form
      onSubmit={handleSubmit(onFormSubmit)}
      className="flex flex-col flex-1 mt-10"
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

      <div className="flex items-center justify-end gap-2 border-t border-border pt-4">
        <Button type="button" variant="ghost" onClick={prev}>
          Previous
        </Button>

        <Button type="submit" disabled={!formState.isValid || !selectedSpecie}>
          Continue
        </Button>
      </div>
    </form>
  );
};
