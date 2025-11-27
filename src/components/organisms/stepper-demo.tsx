"use client";

import { Stepper } from "../molecules";

export const StepperDemo: React.FC = () => {
  const stepData = [
    {
      title: "Pet Information",
      description: "Basic details about your pet",
      element: (
        <div className="space-y-4">
          <p className="text-sm text-muted-foreground">
            Enter the basic information about the pet.
          </p>
          <div className="rounded-lg border border-border bg-muted/50 p-4">
            <p className="text-sm">Form fields would go here...</p>
          </div>
        </div>
      ),
    },
    {
      title: "Upload Photo",
      description: "Add a clear photo of the pet",
      element: (
        <div className="space-y-4">
          <p className="text-sm text-muted-foreground">
            Upload a clear, recent photo of the pet.
          </p>
          <div className="rounded-lg border border-border bg-muted/50 p-8 text-center">
            <p className="text-sm">Image uploader would go here...</p>
          </div>
        </div>
      ),
    },
    {
      title: "Location",
      description: "Where was the pet last seen",
      element: (
        <div className="space-y-4">
          <p className="text-sm text-muted-foreground">
            Provide the location where the pet was last seen.
          </p>
          <div className="rounded-lg border border-border bg-muted/50 p-4">
            <p className="text-sm">Map or location input would go here...</p>
          </div>
        </div>
      ),
    },
    {
      title: "Contact Information",
      description: "How can we reach you",
      element: (
        <div className="space-y-4">
          <p className="text-sm text-muted-foreground">
            Provide your contact information.
          </p>
          <div className="rounded-lg border border-border bg-muted/50 p-4">
            <p className="text-sm">Contact form fields would go here...</p>
          </div>
        </div>
      ),
    },
  ];

  const handleComplete = () => {
    console.log("Stepper completed!");
    alert("Form submitted successfully!");
  };

  return (
    <div className="h-full w-full p-6">
      <Stepper data={stepData} onComplete={handleComplete} />
    </div>
  );
};
