"use client";

import { standardSchemaResolver } from "@hookform/resolvers/standard-schema";
import { defineStepper } from "@stepperize/react";
import { useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { cn } from "@/src/lib/utils";
import { type AnimalForm, animalFormSchema } from "@/src/types";
import { Button, Loader, Progress } from "../atoms";
import { MagicLayout, PawHeader } from "../molecules";
import { PawImageForm } from "./paw-image-form";
import { PawInfoForm } from "./paw-info-form";

const { useStepper, utils } = defineStepper(
  {
    id: "step-1",
    title: "Image Upload",
    description:
      "Upload a photo of the pet you found to help reunite them with their owner.",
  },
  {
    id: "step-2",
    title: "Details",
    description: "Confirm the details of the pet you found.",
  },
  {
    id: "step-3",
    title: "location",
    description: "Submit the form to help reunite the pet with their owner.",
  }
);
const stepSchemas = [
  animalFormSchema.pick({
    imageFile: true,
  }),
  animalFormSchema.pick({
    type: true,
    name: true,
    species: true,
    breed: true,
    color: true,
    description: true,
  }),
  animalFormSchema.pick({
    location: true,
    coords: true,
  }),
];

export const UploadContent = () => {
  const methods = useForm<AnimalForm>({
    // resolver: standardSchemaResolver(animalFormSchema),

    defaultValues: {
      name: "",
      species: "dog",
      breed: "",
      color: "",
      description: "",
      location: "",
      coords: null,
      imageFile: [],
    },
  });
  const stepper = useStepper();
  const currentIndex = utils.getIndex(stepper.current.id);
  const total = utils.getAll().length;
  const progress = (currentIndex / total) * 100;
  const isLastStep = currentIndex === total - 1;
  const isFirstStep = currentIndex === 0;

  const currentStepSchema = stepSchemas[currentIndex];
  const [state, setState] = useState<"expanded" | "collapsed">("collapsed");
  const nextStep = async () => {
    const fields = Object.keys(currentStepSchema.shape) as (keyof AnimalForm)[];
    console.log("fields", fields);
    const isValid = await methods.trigger(fields);
    console.log("isValid", isValid);
    if (isValid) stepper.next();
  };

  const prevStep = () => {
    stepper.prev();
  };
  console.log("errors", methods.formState.errors);

  const onSubmit = (data: AnimalForm) => {
    console.log("onSubmit", data);
  };
  return (
    <div className={cn("relative flex flex-col h-full px-2")}>
      <MagicLayout
        state={state}
        header={
          <FormProvider {...methods}>
            <form onSubmit={methods.handleSubmit(onSubmit)}>
              <div className="bg-beige-low rounded-lg border p-6 flex flex-col gap-6 w-full md:w-2/3 max-w-[600px]">
                <div>
                  <PawHeader
                    title={stepper.current.title}
                    description={stepper.current.description}
                    emoji="🐶"
                  />
                  <Progress
                    value={progress}
                    max={total}
                    className="bg-beige-medium h-1 mt-3"
                    indicatorClassName="bg-orange-500"
                  />
                </div>
                <div className="flex flex-col gap-4 h-[500px]">
                  {stepper.switch({
                    "step-1": () => <PawImageForm />,
                    "step-2": () => <PawInfoForm />,
                    "step-3": (step) => (
                      <div className="flex flex-col gap-4">
                        <span>Third: {step.title}</span>
                        <p>{step.description}</p>
                      </div>
                    ),
                  })}
                </div>
                <div className="flex gap-4 justify-end">
                  {!isFirstStep && (
                    <Button type="button" variant="outline" onClick={prevStep}>
                      Prev
                    </Button>
                  )}
                  {!isLastStep && (
                    <Button type="button" onClick={nextStep}>
                      Next
                    </Button>
                  )}
                  {isLastStep && <Button type="submit">Submit</Button>}
                </div>
              </div>
            </form>
          </FormProvider>
        }
        content={
          <div>
            <Loader />
          </div>
        }
      />
    </div>
  );
};
