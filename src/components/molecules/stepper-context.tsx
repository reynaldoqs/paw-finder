"use client";

import * as React from "react";
import type { AnimalForm } from "@/types";

type StepperContextValue = {
  next: () => void;
  prev: () => void;
  goToStep: (step: number) => void;

  currentStep: number;
  totalSteps: number;
  isFirst: boolean;
  isLast: boolean;

  formData: Partial<AnimalForm>;
  updateFormData: (data: Partial<AnimalForm>) => void;

  complete: () => void;
  completed: boolean;
  reset: () => void;
};

const StepperContext = React.createContext<StepperContextValue | null>(null);

type StepperProviderProps = {
  children: React.ReactNode;
  totalSteps: number;
  onComplete?: (data: Partial<AnimalForm>) => void;
  initialData?: Partial<AnimalForm>;
  onReset?: () => void;
};

export const StepperProvider: React.FC<StepperProviderProps> = ({
  children,
  totalSteps,
  onComplete,
  initialData = {},
  onReset,
}) => {
  const [currentStep, setCurrentStep] = React.useState(0);
  const [completed, setCompleted] = React.useState(false);
  const [formData, setFormData] =
    React.useState<Partial<AnimalForm>>(initialData);

  const next = React.useCallback(() => {
    setCurrentStep((prev) => Math.min(prev + 1, totalSteps - 1));
  }, [totalSteps]);

  const prev = React.useCallback(() => {
    setCurrentStep((prev) => Math.max(prev - 1, 0));
  }, []);

  const goToStep = React.useCallback(
    (step: number) => {
      if (step >= 0 && step < totalSteps) {
        setCurrentStep(step);
      }
    },
    [totalSteps]
  );

  const updateFormData = React.useCallback((data: Partial<AnimalForm>) => {
    setFormData((prev) => ({ ...prev, ...data }));
  }, []);

  const complete = React.useCallback(() => {
    onComplete?.(formData);
    setCompleted(true);
  }, [formData, onComplete]);

  const reset = React.useCallback(() => {
    setCurrentStep(0);
    setCompleted(false);
    setFormData(initialData);
    onReset?.();
  }, [initialData, onReset]);

  const value = React.useMemo(
    () => ({
      next,
      prev,
      goToStep,
      currentStep,
      totalSteps,
      isFirst: currentStep === 0,
      isLast: currentStep === totalSteps - 1,
      formData,
      updateFormData,
      complete,
      completed,
      reset,
    }),
    [
      next,
      prev,
      goToStep,
      currentStep,
      totalSteps,
      formData,
      updateFormData,
      complete,
      completed,
      reset,
    ]
  );

  return (
    <StepperContext.Provider value={value}>{children}</StepperContext.Provider>
  );
};

export const useStepper = () => {
  const context = React.useContext(StepperContext);
  if (!context) {
    throw new Error("useStepper must be used within StepperProvider");
  }
  return context;
};
