import type { ImageListType } from "react-images-uploading";
import { z } from "zod/v4";
import {
  animalStatus,
  estimatedAges,
  imageUploadConfig,
  sizes,
  species,
} from "../constants";

// BASE ANIMAL SCHEMA
export const animalSchema = z.object({
  id: z.string(),
  specie: z.enum(species, { message: "Invalid species" }),
  breed: z.string().optional().nullable(),
  color: z.string().min(1, "Color is required"),
  size: z.enum(sizes, { message: "Invalid size" }),
  estimatedAge: z.enum(estimatedAges, { message: "Invalid estimated age" }),
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
  status: z.enum(animalStatus),
  contactNumber: z.string().min(1, "Contact number is required").max(20),
});

export type Animal = z.infer<typeof animalSchema>;

// LOST ANIMAL SCHEMA
export const lostAnimalSchema = animalSchema.extend({
  name: z.string().min(1, "Name is required"),
  lostDate: z.string().optional().nullable(),
});

export type LostAnimal = z.infer<typeof lostAnimalSchema>;

// LOST ANIMAL FORM SCHEMA
export const lostAnimalFormSchema = lostAnimalSchema
  .omit({
    id: true,
    imageUrl: true,
    coords: true,
    userId: true,
    createdAt: true,
  })
  .extend({
    location: z.string().optional().nullable(),
    specie: z.enum(species).nullable(),
    size: z.enum(sizes).nullable(),
    estimatedAge: z.enum(estimatedAges).nullable(),
    status: z.string().default("active"),
    embeddingDescription: z.string(),
    imageBase64: z.string(),
  });

export type LostAnimalForm = z.infer<typeof lostAnimalFormSchema>;

// FOUND ANIMAL SCHEMA
export const foundAnimalSchema = animalSchema
  .omit({
    coords: true,
  })
  .partial({
    description: true,
    contactNumber: true,
    userId: true,
    breed: true,
    size: true,
    estimatedAge: true,
  });

export type FoundAnimal = z.infer<typeof foundAnimalSchema>;

// FOUND ANIMAL FORM SCHEMA
export const foundAnimalFormSchema = foundAnimalSchema
  .omit({
    id: true,
    imageUrl: true,
    userId: true,
    createdAt: true,
  })
  .extend({
    specie: z.enum(species).nullable(),
    size: z.enum(sizes).nullable(),
    estimatedAge: z.enum(estimatedAges).nullable(),
    status: z.string().default("active"),
    embeddingDescription: z.string(),
    imageBase64: z.string(),
  });

export type FoundAnimalForm = z.infer<typeof foundAnimalFormSchema>;

// COMMON SCHEMAS

export const animalImageFilesSchema = z.object({
  files: z
    .custom<ImageListType>()
    .refine(
      (list) =>
        Array.isArray(list) &&
        list.length > 0 &&
        list.every((item) => item.file instanceof File),
      "Please select an image."
    )
    .refine((files) => {
      return files.every(
        (item) => item.file && item.file.size <= imageUploadConfig.maxUploadSize
      );
    }, `File size must be less than 5MB.`)
    .refine((files) => {
      return files.every(
        (item) =>
          item.file &&
          imageUploadConfig.acceptedImageTypes.includes(item.file.type)
      );
    }, "Only .jpg, .jpeg, .png, and .webp formats are supported."),
});

export type AnimalImageFiles = z.infer<typeof animalImageFilesSchema>;

export const animalAISchema = animalSchema
  .pick({
    specie: true,
    breed: true,
    color: true,
    size: true,
    estimatedAge: true,
  })
  .extend({
    distinctiveFeatures: z.array(z.string()),
    embeddingDescription: z.string(),
    imageBase64: z.string(),
  });

export type AnimalAI = z.infer<typeof animalAISchema>;
