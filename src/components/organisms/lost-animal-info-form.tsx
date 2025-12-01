"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import { z } from "zod/v3";
import { Button, Field, FieldDescription, FieldGroup, Input } from "../atoms";
import { Textarea } from "../atoms/textarea";
import { useStepper } from "../molecules/stepper-context";

const infoFormSchema = z.object({
  name: z.string().min(1),
  breed: z.string().optional(),
  color: z.string().min(1),
  description: z.string().min(5),
});

type InfoFormData = z.infer<typeof infoFormSchema>;

export const LostAnimalInfoForm: React.FC = () => {
  const { next, prev, isFirst, formData, updateFormData } = useStepper();

  const { control, handleSubmit, formState } = useForm<InfoFormData>({
    resolver: zodResolver(infoFormSchema),
    mode: "onChange",
    defaultValues: {
      name: formData.name || "",
      breed: formData.breed || "",
      color: formData.color || "",
      description: formData.description || "",
    },
  });

  const onFormSubmit = (data: InfoFormData) => {
    updateFormData(data);
    next();
  };

  return (
    <form
      onSubmit={handleSubmit(onFormSubmit)}
      className="flex flex-col flex-1 mt-10"
    >
      <FieldGroup className="flex-1 mb-6">
        <div className="grid grid-cols-4 gap-4">
          <div className="col-span-2">
            <Controller
              control={control}
              name="name"
              render={({ field, fieldState }) => (
                <Field aria-invalid={fieldState.invalid}>
                  <FieldDescription>
                    What is your pet's name? (required)
                  </FieldDescription>
                  <Input
                    {...field}
                    id="name"
                    aria-invalid={fieldState.invalid}
                    placeholder="e.g. Max"
                    autoComplete="off"
                  />
                </Field>
              )}
            />
          </div>
          <div className="col-span-2">
            <Controller
              control={control}
              name="color"
              render={({ field, fieldState }) => (
                <Field aria-invalid={fieldState.invalid}>
                  <FieldDescription>
                    What color is your pet? (required)
                  </FieldDescription>
                  <Input
                    {...field}
                    id="color"
                    aria-invalid={fieldState.invalid}
                    placeholder="e.g. Brown"
                    autoComplete="off"
                  />
                </Field>
              )}
            />
          </div>
          <div className="col-span-4">
            <Controller
              control={control}
              name="breed"
              render={({ field, fieldState }) => (
                <Field aria-invalid={fieldState.invalid}>
                  <FieldDescription>
                    What breed is your pet? (required)
                  </FieldDescription>
                  <Input
                    {...field}
                    id="breed"
                    aria-invalid={fieldState.invalid}
                    placeholder="e.g. Labrador Retriever"
                    autoComplete="off"
                  />
                </Field>
              )}
            />
          </div>

          <div className="col-span-4">
            <Controller
              control={control}
              name="description"
              render={({ field, fieldState }) => (
                <Field aria-invalid={fieldState.invalid}>
                  <FieldDescription>
                    Describe the pet in detail. This will help others identify
                    the pet. (required)
                  </FieldDescription>
                  <Textarea
                    {...field}
                    id="description"
                    aria-invalid={fieldState.invalid}
                    placeholder="e.g. Max is a friendly dog who loves to play with his toys."
                    className="min-h-[120px]"
                  />
                </Field>
              )}
            />
          </div>
        </div>
      </FieldGroup>

      <div className="flex items-center justify-end gap-2 border-t border-border pt-4">
        <Button type="button" variant="ghost" onClick={prev}>
          Previous
        </Button>

        <Button type="submit" disabled={!formState.isValid}>
          Continue
        </Button>
      </div>
    </form>
  );
};
