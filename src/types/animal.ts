import * as z from "zod";

export const species = [
  "dog",
  "cat",
  "rabbit",
  "guinea pig",
  "hamster",
  "other",
];
export const animalFormSchema = z.object({
  name: z.string().min(1).max(100).nullable(),
  species: z.enum(species),
  breed: z.string().min(1).max(100).nullable(),
  color: z.string().min(1).max(100),
  description: z.string().min(1).max(100).nullable(),
  location: z.string().min(1).max(100),
  coords: z
    .object({
      lat: z.number(),
      lng: z.number(),
    })
    .nullable(),
  imageFile: z.array(z.instanceof(File)).min(1),
  lostDate: z.date().nullable(),
  contactNumber: z.string().min(1).max(20),
});

export type AnimalForm = z.infer<typeof animalFormSchema>;
