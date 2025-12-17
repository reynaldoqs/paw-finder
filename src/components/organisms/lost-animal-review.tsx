"use client";
import { useMutation } from "@tanstack/react-query";
import { postData } from "@/lib/utils";
import type { Animal, AnimalForm, ResponseBody } from "@/types";
import { Button } from "../atoms";
import { AnimalSummaryCard } from "../molecules";
import { useStepper } from "../molecules/stepper-context";

export const LostAnimalReview: React.FC = () => {
  const { formData, goToStep, complete, completed, reset } = useStepper();

  const submitMutation = useMutation({
    mutationFn: (data: Partial<AnimalForm>) => {
      return postData<ResponseBody<Animal>>("/api/animal-lost", data);
    },
    onSuccess: (res) => {
      console.log("Submission successful:", res);
      complete();
    },
    onError: (error) => {
      console.error("Submission failed:", error);
    },
  });

  const handleSubmit = () => {
    submitMutation.mutate(formData);
  };

  return (
    <div className="flex flex-col flex-1 justify-center">
      <div className="flex-1 mb-6">
        <AnimalSummaryCard
          data={formData}
          showFullData={!completed}
          loading={submitMutation.isPending}
          actions={
            <Button type="button" onClick={reset}>
              Report another
            </Button>
          }
        />
      </div>
      {!completed && (
        <div className="flex flex-col gap-4 px-10 mt-auto">
          {submitMutation.error && (
            <p className="text-red-500 text-sm text-center">
              {(submitMutation.error as Error).message}
            </p>
          )}
          <Button
            type="button"
            onClick={handleSubmit}
            loading={submitMutation.isPending}
          >
            {submitMutation.isPending ? "Submitting..." : "Complete"}
          </Button>
          <Button type="button" variant="ghost" onClick={() => goToStep(0)}>
            Edit
          </Button>
        </div>
      )}
    </div>
  );
};
