"use client";
import { format } from "date-fns";
import { useState } from "react";
import { Controller, useFormContext } from "react-hook-form";
import { cn } from "@/src/lib/utils";
import {
  Field,
  FieldDescription,
  FieldError,
  FieldGroup,
  Input,
} from "../atoms";
import { Calendar } from "../atoms/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "../atoms/popover";

export const LostAnimalLocationForm = () => {
  const { control } = useFormContext();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <FieldGroup>
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
                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />
        </div>

        <div className="col-span-2">
          <Controller
            control={control}
            name="coords.lat"
            render={({ field, fieldState }) => (
              <Field aria-invalid={fieldState.invalid}>
                <FieldDescription>Latitude (optional)</FieldDescription>
                <Input
                  {...field}
                  id="latitude"
                  type="number"
                  step="any"
                  aria-invalid={fieldState.invalid}
                  placeholder="40.7128"
                  autoComplete="off"
                  onChange={(e) => {
                    const value = e.target.value;
                    field.onChange(value ? Number.parseFloat(value) : null);
                  }}
                  value={field.value ?? ""}
                />
                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />
        </div>

        <div className="col-span-2">
          <Controller
            control={control}
            name="coords.lng"
            render={({ field, fieldState }) => (
              <Field aria-invalid={fieldState.invalid}>
                <FieldDescription>Longitude (optional)</FieldDescription>
                <Input
                  {...field}
                  id="longitude"
                  type="number"
                  step="any"
                  aria-invalid={fieldState.invalid}
                  placeholder="-74.0060"
                  autoComplete="off"
                  onChange={(e) => {
                    const value = e.target.value;
                    field.onChange(value ? Number.parseFloat(value) : null);
                  }}
                  value={field.value ?? ""}
                />
                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />
        </div>

        <div className="col-span-4">
          <Controller
            control={control}
            name="lost_date"
            render={({ field, fieldState }) => (
              <Field aria-invalid={fieldState.invalid}>
                <FieldDescription>
                  Select the date when the pet was lost.
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
                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />
        </div>

        <div className="col-span-4">
          <Controller
            control={control}
            name="contactNumber"
            render={({ field, fieldState }) => (
              <Field aria-invalid={fieldState.invalid}>
                <FieldDescription>
                  Your phone number so people can contact you if they find your
                  pet.
                </FieldDescription>
                <Input
                  {...field}
                  id="contactNumber"
                  type="tel"
                  aria-invalid={fieldState.invalid}
                  placeholder="+1 (555) 123-4567"
                  autoComplete="tel"
                />
                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />
        </div>
      </div>
    </FieldGroup>
  );
};
