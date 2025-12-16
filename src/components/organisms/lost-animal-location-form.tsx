"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { format } from "date-fns";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { z } from "zod/v3";
import { cn } from "@/lib/utils";
import { Button, Field, FieldGroup, Input, Label, PhoneInput } from "../atoms";
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
      lostDate: (formData.lostDate as any) || undefined,
    },
  });

  const onFormSubmit = (data: any) => {
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
                  <Label htmlFor="location" className="font-bold">
                    Location *
                  </Label>
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
                  <Label htmlFor="lostDate" className="font-bold">
                    Lost Date
                  </Label>
                  <Popover open={isOpen} onOpenChange={setIsOpen}>
                    <PopoverTrigger aria-label="Select date">
                      <button
                        type="button"
                        id="lostDate"
                        className={cn(
                          "bg-input/30 border-input focus-visible:border-ring focus-visible:ring-ring/50 h-9 rounded-4xl border px-3 py-1 text-sm transition-colors w-full text-left outline-none",
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
