"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { Controller, useForm } from "react-hook-form";
import type { ImageListType } from "react-images-uploading";
import { animalAItoAnimalForm, postData } from "@/lib/utils";
import {
  type AnimalAI,
  type AnimalImageFiles,
  animalImageFilesSchema,
  type ResponseBody,
} from "@/types";
import { Button } from "../atoms";
import { ImageUploader } from "../molecules";
import { useStepper } from "../molecules/stepper-context";

export const FoundAnimalImageForm: React.FC = () => {
  const { next, updateFormData } = useStepper();

  const { control, handleSubmit, formState } = useForm({
    resolver: zodResolver(animalImageFilesSchema),
    mode: "onChange",
    defaultValues: {
      files: [],
    },
  });

  const uploadImagesMutation = useMutation({
    mutationFn: (data: AnimalImageFiles) => {
      return postData<ResponseBody<AnimalAI>>("/api/animal-images", data);
    },
    onSuccess: (data: ResponseBody<AnimalAI>) => {
      console.log("Upload successful:", data);
      updateFormData(animalAItoAnimalForm(data.data));
      next();
    },
    onError: (error) => {
      console.error("Upload failed:", error);
    },
  });

  const onFormSubmit = (data: AnimalImageFiles) => {
    uploadImagesMutation.mutate(data);
  };

  return (
    <form
      onSubmit={handleSubmit(onFormSubmit)}
      className="flex flex-col flex-1 mt-10"
    >
      <div className="flex-1 mb-6">
        <Controller
          name="files"
          control={control}
          render={({ field }) => {
            return (
              <ImageUploader
                images={(field.value as ImageListType | undefined) ?? []}
                isLoading={uploadImagesMutation.isPending}
                onChange={(newImages) => {
                  field.onChange(newImages as ImageListType);
                }}
              />
            );
          }}
        />
      </div>

      <div className="flex items-center justify-end gap-2 pt-4">
        <Button
          type="submit"
          size="lg"
          disabled={!formState.isValid || uploadImagesMutation.isPending}
        >
          {uploadImagesMutation.isPending ? "Uploading..." : "Continue"}
        </Button>
      </div>
    </form>
  );
};
