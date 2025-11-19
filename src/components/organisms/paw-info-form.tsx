import { Controller, useFormContext } from "react-hook-form";
import { cn } from "@/src/lib/utils";
import { species } from "@/src/types";
import {
  Button,
  Field,
  FieldContent,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "../atoms";
import { Calendar } from "../atoms/calendar";
import { FormControl } from "../atoms/form";
import { Popover, PopoverContent, PopoverTrigger } from "../atoms/popover";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectSeparator,
  SelectTrigger,
  SelectValue,
} from "../atoms/select";
import { Textarea } from "../atoms/textarea";
import { Input } from "../input";

export const PawInfoForm = () => {
  const { control } = useFormContext();
  return (
    <FieldGroup>
      <div className="grid grid-cols-4 gap-4">
        <div className="col-span-2">
          <Controller
            control={control}
            name="name"
            render={({ field, fieldState }) => (
              <Field aria-invalid={fieldState.invalid}>
                <FieldLabel>Pet Name </FieldLabel>
                <Input
                  {...field}
                  id="name"
                  aria-invalid={fieldState.invalid}
                  placeholder="Pet Name"
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
            name="species"
            render={({ field, fieldState }) => (
              <Field aria-invalid={fieldState.invalid}>
                <FieldLabel>Species</FieldLabel>
                <Select
                  {...field}
                  value={field.value}
                  onValueChange={field.onChange}
                  aria-invalid={fieldState.invalid}
                >
                  <SelectTrigger
                    id="species"
                    aria-invalid={fieldState.invalid}
                    className="min-w-[120px]"
                  >
                    <SelectValue placeholder="Select" />
                  </SelectTrigger>
                  <SelectContent position="item-aligned">
                    <SelectItem value="auto">Auto</SelectItem>
                    <SelectSeparator />
                    {species.map((s) => (
                      <SelectItem key={s} value={s}>
                        {s}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
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
            name="breed"
            render={({ field, fieldState }) => (
              <Field aria-invalid={fieldState.invalid}>
                <FieldLabel>Breed</FieldLabel>
                <Input
                  {...field}
                  id="breed"
                  aria-invalid={fieldState.invalid}
                  placeholder="Breed"
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
            name="color"
            render={({ field, fieldState }) => (
              <Field aria-invalid={fieldState.invalid}>
                <FieldLabel>Color</FieldLabel>
                <Input
                  {...field}
                  id="color"
                  aria-invalid={fieldState.invalid}
                  placeholder="Color"
                  autoComplete="off"
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
            name="description"
            render={({ field, fieldState }) => (
              <Field aria-invalid={fieldState.invalid}>
                <FieldLabel>Description</FieldLabel>
                <FieldDescription>
                  Describe the pet in detail. This will help others identify the
                  pet.
                </FieldDescription>
                <Textarea
                  {...field}
                  id="description"
                  aria-invalid={fieldState.invalid}
                  placeholder="Description"
                  className="min-h-[120px]"
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
                <FieldLabel>Lost Date</FieldLabel>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className={cn(
                        "w-full pl-3 text-left font-normal",
                        !field.value && "text-muted-foreground"
                      )}
                    >
                      {field.value ? (
                        field.value.toLocaleDateString()
                      ) : (
                        <span>Select a date</span>
                      )}
                      cal
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0">
                    <Calendar
                      mode="single"
                      selected={field.value}
                      onSelect={field.onChange}
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
      </div>
    </FieldGroup>
  );
};
