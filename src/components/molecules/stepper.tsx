"use client";

import type * as React from "react";
import { cn } from "@/lib/utils";
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
            className="flex items-start flex-col motion-preset-fade"
            key={data[currentStep]?.title}
          >
            {data[currentStep]?.description && (
              <p className="text-xs text-muted-foreground text-center line-clamp-2">
                {data[currentStep].description}
              </p>
            )}
            <h2 className="text-xl font-black text-foreground text-center line-clamp-1">
              {data[currentStep]?.title}
            </h2>
          </div>
        )}
        {!isLast && (
          <div className="w-full mx-auto mt-2">
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
          className="grow flex flex-col animate-in duration-1000 fade-in w-full"
        >
          {data[currentStep]?.element}
        </div>
      </div>
    </div>
  );
};
