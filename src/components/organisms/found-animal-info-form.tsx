"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import type { z } from "zod/v4";
import { estimatedAges, sizes } from "@/constants";
import { type FoundAnimalForm, foundAnimalFormSchema } from "@/types";
import {
  Button,
  Field,
  FieldGroup,
  Input,
  Label,
  PhoneInput,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../atoms";
import { Textarea } from "../atoms/textarea";
import { useStepper } from "../molecules/stepper-context";

const infoFormSchema = foundAnimalFormSchema
  .pick({
    breed: true,
    color: true,
    size: true,
    estimatedAge: true,
    description: true,
    location: true,
    contactNumber: true,
  })
  .partial({
    description: true,
  });

type InfoFormData = z.infer<typeof infoFormSchema>;

export const FoundAnimalInfoForm: React.FC = () => {
  const { next, prev, formData, updateFormData } =
    useStepper<Partial<FoundAnimalForm>>();

  const { control, handleSubmit, formState } = useForm<InfoFormData>({
    resolver: zodResolver(infoFormSchema),
    mode: "onChange",
    defaultValues: {
      breed: formData.breed,
      color: formData.color,
      size: formData.size,
      estimatedAge: formData.estimatedAge,
      description: formData.description,
      location: formData.location,
      contactNumber: formData.contactNumber,
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
              name="color"
              render={({ field, fieldState }) => (
                <Field aria-invalid={fieldState.invalid}>
                  <Label htmlFor="color" className="font-bold">
                    Color *
                  </Label>
                  <Input
                    {...field}
                    value={field.value ?? ""}
                    id="color"
                    aria-invalid={fieldState.invalid}
                    placeholder="e.g. Brown"
                    autoComplete="off"
                  />
                </Field>
              )}
            />
          </div>
          <div className="col-span-2">
            <Controller
              control={control}
              name="breed"
              render={({ field, fieldState }) => (
                <Field aria-invalid={fieldState.invalid}>
                  <Label htmlFor="breed" className="font-bold">
                    Breed
                  </Label>
                  <Input
                    {...field}
                    value={field.value ?? ""}
                    id="breed"
                    aria-invalid={fieldState.invalid}
                    placeholder="e.g. Labrador Retriever"
                    autoComplete="off"
                  />
                </Field>
              )}
            />
          </div>

          <div className="col-span-2">
            <Controller
              control={control}
              name="size"
              render={({ field, fieldState }) => (
                <Field aria-invalid={fieldState.invalid}>
                  <Label className="font-bold">Size *</Label>
                  <Select
                    value={field.value ?? ""}
                    onValueChange={field.onChange}
                  >
                    <SelectTrigger aria-invalid={fieldState.invalid}>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {sizes.map((size) => (
                        <SelectItem key={size} value={size}>
                          {size.charAt(0).toUpperCase() + size.slice(1)}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </Field>
              )}
            />
          </div>

          <div className="col-span-2">
            <Controller
              control={control}
              name="estimatedAge"
              render={({ field, fieldState }) => (
                <Field aria-invalid={fieldState.invalid}>
                  <Label className="font-bold">Age *</Label>
                  <Select
                    value={field.value ?? ""}
                    onValueChange={field.onChange}
                  >
                    <SelectTrigger aria-invalid={fieldState.invalid}>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {estimatedAges.map((age) => (
                        <SelectItem key={age} value={age}>
                          {age.charAt(0).toUpperCase() + age.slice(1)}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
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
                  <Label htmlFor="description" className="font-bold">
                    Description
                  </Label>
                  <Textarea
                    {...field}
                    id="description"
                    aria-invalid={fieldState.invalid}
                    placeholder="e.g. Friendly dog with a distinctive white patch on chest."
                    className="min-h-[80px]"
                  />
                </Field>
              )}
            />
          </div>

          <div className="col-span-2">
            <Controller
              control={control}
              name="location"
              render={({ field, fieldState }) => (
                <Field aria-invalid={fieldState.invalid}>
                  <Label htmlFor="location" className="font-bold">
                    Location *
                  </Label>
                  <Input
                    {...field}
                    value={field.value ?? ""}
                    id="location"
                    aria-invalid={fieldState.invalid}
                    placeholder="e.g., Central Park, New York"
                    autoComplete="off"
                  />
                </Field>
              )}
            />
          </div>

          <div className="col-span-2">
            <Controller
              control={control}
              name="contactNumber"
              render={({ field, fieldState }) => (
                <Field aria-invalid={fieldState.invalid}>
                  <Label htmlFor="contactNumber" className="font-bold">
                    Contact Number
                  </Label>
                  <PhoneInput
                    {...field}
                    id="contactNumber"
                    aria-invalid={fieldState.invalid}
                    placeholder="+1 (555) 123-4567"
                    autoComplete="tel"
                  />
                </Field>
              )}
            />
          </div>
        </div>
      </FieldGroup>

      <div className="flex items-center justify-end gap-2 pt-4">
        <Button type="button" size="lg" variant="ghost" onClick={prev}>
          Previous
        </Button>

        <Button type="submit" size="lg" disabled={!formState.isValid}>
          Continue
        </Button>
      </div>
    </form>
  );
};
