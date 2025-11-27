import { Controller, useFormContext } from "react-hook-form";
import { species } from "@/src/types";
import {
  Field,
  FieldDescription,
  FieldError,
  FieldGroup,
  Input,
} from "../atoms";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../atoms/select";
import { Textarea } from "../atoms/textarea";

export const LostAnimalInfoForm = () => {
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
                <FieldDescription>What is your pet's name?</FieldDescription>
                <Input
                  {...field}
                  id="name"
                  aria-invalid={fieldState.invalid}
                  placeholder="Name"
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
                <FieldDescription>What type of animal is it?</FieldDescription>
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
                    <SelectValue placeholder="Species" />
                  </SelectTrigger>
                  <SelectContent position="item-aligned">
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
                <FieldDescription>What breed is your pet?</FieldDescription>
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
                <FieldDescription>What color is your pet?</FieldDescription>
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
      </div>
    </FieldGroup>
  );
};
