"use client";
import { Controller, useFormContext } from "react-hook-form";
import type { ImageListType } from "react-images-uploading";
import { ImageUploader } from "../molecules";

export const LostAnimalImageForm: React.FC = () => {
  const { control } = useFormContext();

  return (
    <Controller
      name="imageFile"
      control={control}
      render={({ field }) => {
        const value = (field.value as ImageListType | undefined) ?? [];
        return (
          <ImageUploader
            images={value}
            onChange={(newImages) => field.onChange(newImages)}
          />
        );
      }}
    />
  );
};
