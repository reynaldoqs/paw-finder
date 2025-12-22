"use client";
import { useState } from "react";
import type { FoundAnimalForm } from "@/types";
import { CleanCard } from "../atoms";
import { Stepper, StepperProvider, TransitionContainer } from "../molecules";
import { AnimalImageForm } from "./animal-image-form";
import { FoundAnimalInfoForm } from "./found-animal-info-form";
import { FoundAnimalReview } from "./found-animal-review";
import { FoundAnimalSpeciesForm } from "./found-animal-species-form";

const data = [
  {
    id: "image-form",
    title: "Animal Photo",
    description: "Upload a clear photo of the animal you found.",
    element: <AnimalImageForm />,
  },
  {
    id: "species-form",
    title: "Animal Species",
    description: "What type of animal did you find?",
    element: <FoundAnimalSpeciesForm />,
  },
  {
    id: "info-form",
    title: "Animal Details",
    description: "Provide the animal's details.",
    element: <FoundAnimalInfoForm />,
  },

  {
    id: "review",
    title: "Review & Submit",
    description:
      "Review all the information before submitting your found animal report.",
    element: <FoundAnimalReview />,
  },
];

export const FoundReportContent: React.FC = () => {
  const [isExpanded, setIsExpanded] = useState(false);

  const handleComplete = (data: Partial<FoundAnimalForm>) => {
    console.log("Form completed with data:", data);
    setIsExpanded(true);
  };

  return (
    <div>
      <TransitionContainer isExpanded={isExpanded}>
        <StepperProvider
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
