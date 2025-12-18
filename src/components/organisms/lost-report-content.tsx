"use client";
import { useState } from "react";
import type { LostAnimalForm } from "@/types";
import { Card, CleanCard } from "../atoms";
import { Stepper, StepperProvider, TransitionContainer } from "../molecules";
import { LostAnimalImageForm } from "./lost-animal-image-form";
import { LostAnimalInfoForm } from "./lost-animal-info-form";
import { LostAnimalLocationForm } from "./lost-animal-location-form";
import { LostAnimalReview } from "./lost-animal-review";
import { LostAnimalSpeciesForm } from "./lost-animal-species-form";

const data = [
  {
    id: "image-form",
    title: "Pet Photo",
    description: "Upload a clear photo of your pet to help.",
    element: <LostAnimalImageForm />,
  },
  {
    id: "species-form",
    title: "Pet Species",
    description: "What type of animal are you looking for?",
    element: <LostAnimalSpeciesForm />,
  },
  {
    id: "info-form",
    title: "Pet Details",
    description: "Provide the pet's details.",
    element: <LostAnimalInfoForm />,
  },
  {
    id: "location-form",
    title: "Last Known Location",
    description:
      "Tell us where your pet was last seen so nearby users can help look for them.",
    element: <LostAnimalLocationForm />,
  },
  {
    id: "review",
    title: "Review & Submit",
    description:
      "Review all the information before submitting your lost pet report.",
    element: <LostAnimalReview />,
  },
];

export const LostReportContent: React.FC = () => {
  const [isExpanded, setIsExpanded] = useState(false);

  const handleComplete = (data: Partial<LostAnimalForm>) => {
    console.log("Form completed with data:", data);
    setIsExpanded(true);
  };

  return (
    <div>
      <TransitionContainer isExpanded={isExpanded}>
        <StepperProvider<LostAnimalForm>
          totalSteps={data.length}
          onComplete={handleComplete}
          onReset={() => setIsExpanded(false)}
        >
          <CleanCard className="h-full w-full">
            <Stepper data={data} />
          </CleanCard>
        </StepperProvider>
      </TransitionContainer>
    </div>
  );
};
