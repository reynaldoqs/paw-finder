"use client";

import * as React from "react";
import { cn } from "@/src/lib/utils";
import { useStepper } from "./stepper-context";

type StepData = {
  title: string;
  description?: string;
  element: React.ReactNode;
};

type StepperProps = {
  data: StepData[];
  className?: string;
};

export const Stepper: React.FC<StepperProps> = ({ data, className }) => {
  const { currentStep, isLast } = useStepper();

  const progress = ((currentStep + 1) / data.length) * 100;

  return (
    <div className={cn("flex h-full w-full flex-col", className)}>
      <div className="flex flex-col flex-1">
        {!isLast && (
          <div
            className="flex items-center flex-col motion-preset-fade"
            key={data[currentStep]?.title}
          >
            <h2 className="text-xl font-bold text-foreground text-center line-clamp-1">
              {data[currentStep]?.title}
            </h2>
            {data[currentStep]?.description && (
              <p className="mt-1 text-sm text-muted-foreground text-center line-clamp-2 px-4">
                {data[currentStep].description}
              </p>
            )}
          </div>
        )}
        {!isLast && (
          <div className="w-2/3 mx-auto mt-4">
            <div className="h-[6px] w-full overflow-hidden rounded-full bg-orange-500/20">
              <div
                className="h-full bg-orange-500 transition-all duration-500 ease-out"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>
        )}

        <div
          key={currentStep}
          className="flex-grow flex flex-col motion-preset-fade-lg"
        >
          {data[currentStep]?.element}
        </div>
      </div>
    </div>
  );
};
