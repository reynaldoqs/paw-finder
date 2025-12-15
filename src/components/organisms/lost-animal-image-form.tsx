"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import type { ImageListType } from "react-images-uploading";
import { animalFormSchema } from "@/types";
import { Button } from "../atoms";
import { ImageUploader } from "../molecules";
import { useStepper } from "../molecules/stepper-context";

const imageFormSchema = animalFormSchema.pick({ imageFile: true });

export const LostAnimalImageForm: React.FC = () => {
  const { next, formData, updateFormData } = useStepper();

  const { control, handleSubmit, formState, getValues } = useForm({
    resolver: zodResolver(imageFormSchema),
    mode: "onChange",
    defaultValues: { imageFile: formData.imageFile as any },
  });

  console.log("formState errors:", formState.errors);
  console.log("formState values:", getValues());

  const onFormSubmit = (data: any) => {
    updateFormData(data);
    next();
  };

  return (
    <form
      onSubmit={handleSubmit(onFormSubmit)}
      className="flex flex-col flex-1 mt-10"
    >
      <div className="flex-1 mb-6">
        <Controller
          name="imageFile"
          control={control}
          render={({ field }) => {
            return (
              <ImageUploader
                images={(field.value as ImageListType | undefined) ?? []}
                onChange={(newImages) => {
                  console.log("newImages", newImages);
                  field.onChange(newImages as ImageListType);
                }}
              />
            );
          }}
        />
      </div>

      <div className="flex items-center justify-end gap-2 border-t border-border pt-4">
        <Button type="submit" disabled={!formState.isValid}>
          Continue
        </Button>
      </div>
    </form>
  );
};
