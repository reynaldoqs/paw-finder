import { z } from "zod/v3";
import { animalStatus, imageUploadConfig, species } from "../constants";

export const animalSchema = z.object({
  id: z.string(),
  name: z.string().min(1, "Name is required"),
  specie: z.enum(species, { message: "Invalid species" }),
  breed: z.string().optional().nullable(),
  color: z.string().min(1, "Color is required"),
  description: z
    .string()
    .min(5, "Description must be at least 5 characters")
    .max(1000),
  location: z
    .string()
    .min(5, "Location must be at least 5 characters")
    .max(300),
  coords: z
    .object({
      lat: z.number(),
      lng: z.number(),
    })
    .nullable(),
  imageUrl: z.string(),
  userId: z.string(),
  createdAt: z.string(),
  lostDate: z.string().optional().nullable(),
  status: z.enum(animalStatus),
  contactNumber: z.string().min(1, "Contact number is required").max(20),
});

export type Animal = z.infer<typeof animalSchema>;

export const animalFormSchema = animalSchema
  .omit({
    id: true,
    imageUrl: true,
    coords: true,
    userId: true,
    createdAt: true,
  })
  .extend({
    // specie: z.enum(species).nullable(),
    imageFile: z
      .instanceof(File)
      .refine(
        (file) => file.size <= imageUploadConfig.maxUploadSize,
        `File size must be less than 5MB.`
      )
      .refine(
        (file) => imageUploadConfig.acceptedImageTypes.includes(file.type),
        "Only .jpg, .jpeg, .png, and .webp formats are supported."
      ),
    // lostDate: z.date().nullable(),
    status: z.string().default("active"),
  });

export type AnimalForm = z.infer<typeof animalFormSchema>;
