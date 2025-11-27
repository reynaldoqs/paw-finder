"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { type AnimalForm, animalFormSchema } from "@/src/types";
import { Stepper, TransitionContainer } from "../molecules";
import { LostAnimalImageForm } from "./lost-animal-image-form";
import { LostAnimalInfoForm } from "./lost-animal-info-form";
import { LostAnimalLocationForm } from "./lost-animal-location-form";

export const LostReportContent: React.FC = () => {
  const [isExpanded, setIsExpanded] = useState(false);
  const methods = useForm<AnimalForm>({
    resolver: zodResolver(animalFormSchema),

    defaultValues: {
      name: "",
      species: "dog",
      breed: "",
      color: "",
      description: "",
      location: "",
      coords: null,
      imageFile: [],
      contactNumber: "",
    },
  });

  const onComplete = () => {
    setIsExpanded(false);
  };
  const data = [
    {
      id: "image-form",
      title: "Pet Photo",
      description:
        "Upload a clear photo of your pet to help others recognize and identify them.",
      element: <LostAnimalImageForm />,
    },
    {
      id: "info-form",
      title: "Pet Details",
      description:
        "Provide the pet’s name, characteristics, and any important information to assist in the search.",
      element: <LostAnimalInfoForm />,
    },
    {
      id: "location-form",
      title: "Last Known Location",
      description:
        "Tell us where your pet was last seen so nearby users can help look for them.",
      element: <LostAnimalLocationForm />,
    },
  ];

  return (
    <>
      <TransitionContainer isExpanded={isExpanded}>
        <FormProvider {...methods}>
          <Stepper
            data={data}
            onComplete={onComplete}
            className="p-4 md:p-5 overflow-hidden"
          />
        </FormProvider>
      </TransitionContainer>

      <div className="flex-1 p-8">
        <h1 className="text-2xl font-bold mb-4">Page Content</h1>
        <p className="text-muted-foreground">
          Click the button to toggle between states
        </p>
      </div>
    </>
  );
};
