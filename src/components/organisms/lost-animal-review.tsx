"use client";
import { usePostData } from "@/hooks/use-post-data";
import { objectToFormData } from "@/lib/utils";
import { Button } from "../atoms";
import { AnimalSummaryCard } from "../molecules";
import { useStepper } from "../molecules/stepper-context";

export const LostAnimalReview: React.FC = () => {
  const { formData, goToStep, complete, completed, reset } = useStepper();
  const { postData, loading, error } = usePostData({
    url: "/api/upload",
    onSuccess: () => {
      complete();
    },
  });

  const handleSubmit = () => {
    const payload = objectToFormData(formData);

    postData(payload);
  };

  return (
    <div className="flex flex-col flex-1 justify-center">
      <div className="flex-1 mb-6">
        <AnimalSummaryCard
          data={formData}
          showFullData={!completed}
          actions={
            <Button type="button" onClick={reset}>
              Report another pet
            </Button>
          }
        />
      </div>
      {!completed && (
        <div className="flex flex-col gap-4 px-10 mt-auto">
          {error && (
            <p className="text-red-500 text-sm text-center">{error.message}</p>
          )}
          <Button type="button" onClick={handleSubmit} loading={loading}>
            {loading ? "Submitting..." : "Complete"}
          </Button>
          <Button type="button" variant="ghost" onClick={() => goToStep(0)}>
            Edit
          </Button>
        </div>
      )}
    </div>
  );
};
