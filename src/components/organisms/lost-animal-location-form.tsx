"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { format } from "date-fns";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import type { z } from "zod/v4";
import { cn } from "@/lib/utils";
import { lostAnimalFormSchema } from "@/types";
import { Button, Field, FieldGroup, Input, Label, PhoneInput } from "../atoms";
import { Calendar } from "../atoms/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "../atoms/popover";
import { useStepper } from "../molecules/stepper-context";

const locationFormSchema = lostAnimalFormSchema.pick({
  lastSeenLocation: true,
  contactNumber: true,
  lostDate: true,
});

type LocationFormData = z.infer<typeof locationFormSchema>;

export const LostAnimalLocationForm: React.FC = () => {
  const { next, prev, formData, updateFormData } =
    useStepper<Partial<LocationFormData>>();
  const [isOpen, setIsOpen] = useState(false);

  const { control, handleSubmit, formState } = useForm<LocationFormData>({
    resolver: zodResolver(locationFormSchema),
    mode: "onChange",
    defaultValues: {
      lastSeenLocation: formData.lastSeenLocation,
      contactNumber: formData.contactNumber,
      lostDate: formData.lostDate,
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
              name="lastSeenLocation"
              render={({ field, fieldState }) => (
                <Field aria-invalid={fieldState.invalid}>
                  <Label htmlFor="lastSeenLocation" className="font-bold">
                    Location *
                  </Label>
                  <Input
                    {...field}
                    value={field.value ?? ""}
                    id="lastSeenLocation"
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
                  <Label htmlFor="lostDate" className="font-bold">
                    Lost Date
                  </Label>
                  <Popover open={isOpen} onOpenChange={setIsOpen}>
                    <PopoverTrigger
                      type="button"
                      id="lostDate"
                      aria-label="Select date"
                      className={cn(
                        "bg-input/30 border-input focus-visible:border-ring focus-visible:ring-ring/50 h-9 rounded-4xl border px-3 py-1 text-sm transition-colors w-full text-left outline-none",
                        !field.value && "text-muted-foreground"
                      )}
                    >
                      {field.value ? (
                        format(new Date(field.value), "PPP")
                      ) : (
                        <span>Select a date</span>
                      )}
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0">
                      <Calendar
                        mode="single"
                        selected={
                          field.value ? new Date(field.value) : undefined
                        }
                        onSelect={(date) => {
                          field.onChange(date?.toISOString());
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
                  <Label htmlFor="contactNumber" className="font-bold">
                    Contact Number *
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
