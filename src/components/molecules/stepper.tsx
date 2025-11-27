"use client";

import { defineStepper } from "@stepperize/react";
import * as React from "react";
import { cn } from "@/src/lib/utils";
import { Button } from "../atoms";

type StepData = {
  title: string;
  description?: string;
  element: React.ReactNode;
};

type StepperProps = {
  data: StepData[];
  onNext?: (currentStep: number) => void | Promise<void>;
  onPrev?: (currentStep: number) => void;
  onComplete?: () => void | Promise<void>;
  className?: string;
};

export const Stepper: React.FC<StepperProps> = ({
  data,
  onNext,
  onPrev,
  onComplete,
  className,
}) => {
  const [direction, setDirection] = React.useState<"left" | "right">("right");

  const { useStepper } = React.useMemo(
    () => defineStepper(...data.map((_, i) => ({ id: `step-${i}` }))),
    [data]
  );

  const stepper = useStepper();
  const currentIndex = stepper.all.findIndex(
    (s) => s.id === stepper.current.id
  );
  const progress = ((currentIndex + 1) / data.length) * 100;

  const handleNext = async () => {
    setDirection("right");
    await onNext?.(currentIndex);
    if (!stepper.isLast) {
      stepper.next();
    } else {
      await onComplete?.();
    }
  };

  const handlePrev = () => {
    setDirection("left");
    onPrev?.(currentIndex);
    if (!stepper.isFirst) {
      stepper.prev();
    }
  };

  return (
    <div className={cn("flex h-full w-full flex-col", className)}>
      <div className="flex flex-col flex-1">
        <div
          className="flex items-center flex-col motion-preset-fade"
          key={data[currentIndex].title}
        >
          <h2 className="text-xl font-bold text-foreground text-center line-clamp-1">
            {data[currentIndex]?.title}
          </h2>
          {data[currentIndex]?.description && (
            <p className="mt-1 text-sm text-muted-foreground text-center line-clamp-2 px-3">
              {data[currentIndex].description}
            </p>
          )}
        </div>
        <div className="w-2/3 mx-auto mt-4">
          <div className="h-1 w-full overflow-hidden rounded-full bg-orange-500/20">
            <div
              className="h-full bg-orange-500 transition-all duration-500 ease-out"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>

        <div
          key={currentIndex}
          className={cn(
            "mb-6 mt-8 flex-grow motion-delay-100",
            direction === "right" && "motion-preset-slide-right",
            direction === "left" && "motion-preset-slide-left"
          )}
        >
          {data[currentIndex]?.element}
        </div>
      </div>

      <div className="flex items-center justify-between gap-4 border-t border-border pt-4">
        <Button
          type="button"
          variant="outline"
          onClick={handlePrev}
          disabled={stepper.isFirst}
        >
          Previous
        </Button>

        <div className="text-xs text-muted-foreground">
          Step {currentIndex + 1} of {data.length}
        </div>

        <Button type="button" onClick={handleNext}>
          {stepper.isLast ? "Complete" : "Next"}
        </Button>
      </div>
    </div>
  );
};
