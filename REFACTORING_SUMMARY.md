# Form Refactoring Summary

## What's Been Done

### 1. Stepper Component Updated
- Changed `element` prop from `React.ReactNode` to `(props: StepChildProps) => React.ReactNode`
- Removed navigation buttons from Stepper
- Stepper now passes navigation callbacks to each step via render function
- Exported `StepChildProps` type

### 2. LostAnimalImageForm Converted
- Now has its own `useForm` with `imageFormSchema`
- Accepts `StepChildProps` + `defaultValues` + `onSubmit` props
- Renders its own Next button
- Calls `onSubmit` then `onNext` when form is valid

### 3. LostAnimalInfoForm Converted
- Now has its own `useForm` with `infoFormSchema`
- Accepts `StepChildProps` + `defaultValues` + `onSubmit` props
- Renders Previous (if not first) and Next buttons
- Changed field name from `species` to `specie` to match schema

## What Still Needs To Be Done

### 4. LostAnimalLocationForm - Needs Conversion
Similar pattern:
```typescript
const locationFormSchema = z.object({
  location: z.string().min(1),
  contactNumber: z.string().min(1),
  lostDate: z.date().optional(),
});

type LocationFormData = z.infer<typeof locationFormSchema>;

type LostAnimalLocationFormProps = StepChildProps & {
  defaultValues?: Partial<LocationFormData>;
  onSubmit: (data: LocationFormData) => void;
};
```

### 5. LostAnimalReview - Needs Conversion
Should accept all accumulated data as props and render Previous + Complete buttons.

### 6. LostReportContent - Major Update Needed
Needs to:
- Remove the single `useForm` 
- Manage accumulated form data in state
- Convert `data` array elements to render functions
- Pass callbacks to collect data from each step

Example structure:
```typescript
const [formData, setFormData] = useState({
  imageFile: [],
  name: "",
  specie: "cat",
  // ... etc
});

const data = [
  {
    id: "image-form",
    title: "Pet Photo",
    description: "...",
    element: (props: StepChildProps) => (
      <LostAnimalImageForm
        {...props}
        defaultValues={{ imageFile: formData.imageFile }}
        onSubmit={(data) => setFormData(prev => ({ ...prev, ...data }))}
      />
    ),
  },
  // ... etc
];
```

## Benefits of This Architecture
- Each form is self-contained with its own validation
- Forms can be reused independently
- Easier to test individual forms
- Better separation of concerns
- Navigation logic is in the forms themselves
