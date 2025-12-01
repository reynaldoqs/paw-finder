"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { format } from "date-fns";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { z } from "zod/v3";
import { cn } from "@/src/lib/utils";
import {
  Button,
  Field,
  FieldDescription,
  FieldGroup,
  Input,
  PhoneInput,
} from "../atoms";
import { Calendar } from "../atoms/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "../atoms/popover";
import { useStepper } from "../molecules/stepper-context";

const locationFormSchema = z.object({
  location: z.string().min(1),
  contactNumber: z.string().min(1),
  lostDate: z.date().optional(),
});

type LocationFormData = z.infer<typeof locationFormSchema>;

export const LostAnimalLocationForm: React.FC = () => {
  const { next, prev, isFirst, formData, updateFormData } = useStepper();
  const [isOpen, setIsOpen] = useState(false);

  const { control, handleSubmit, formState } = useForm<LocationFormData>({
    resolver: zodResolver(locationFormSchema),
    mode: "onChange",
    defaultValues: {
      location: formData.location || "",
      contactNumber: formData.contactNumber || "",
      lostDate: formData.lostDate || undefined,
    },
  });

  const onFormSubmit = (data: LocationFormData) => {
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
          <div className="col-span-4">
            <Controller
              control={control}
              name="location"
              render={({ field, fieldState }) => (
                <Field aria-invalid={fieldState.invalid}>
                  <FieldDescription>
                    Enter the address or area where the pet was last seen.
                  </FieldDescription>
                  <Input
                    {...field}
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
              name="lostDate"
              render={({ field, fieldState }) => (
                <Field aria-invalid={fieldState.invalid}>
                  <FieldDescription>
                    Date when the pet was lost.
                  </FieldDescription>
                  <Popover open={isOpen} onOpenChange={setIsOpen}>
                    <PopoverTrigger asChild>
                      <button
                        type="button"
                        className={cn(
                          "w-full px-3 py-2 rounded-lg text-left font-normal bg-gray-400/10 text-sm",
                          !field.value && "text-muted-foreground"
                        )}
                      >
                        {field.value ? (
                          format(field.value, "PPP")
                        ) : (
                          <span>Select a date</span>
                        )}
                      </button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0">
                      <Calendar
                        mode="single"
                        selected={field.value}
                        onSelect={(date) => {
                          field.onChange(date);
                          setIsOpen(false);
                        }}
                      />
                    </PopoverContent>
                  </Popover>
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
                  <FieldDescription>Your phone number.</FieldDescription>
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
