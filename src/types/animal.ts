import type { ImageListType } from "react-images-uploading";
import { z } from "zod/v4";
import {
  animalStatus,
  estimatedAges,
  imageUploadConfig,
  sizes,
  species,
} from "../constants";

// ANIMAL IMAGES SCHEMA
export const animalImageSchema = z.object({
  url: z.string(),
  width: z.number(),
  height: z.number(),
  color: z.string().optional(),
});

export type AnimalImage = z.infer<typeof animalImageSchema>;

// BASE ANIMAL SCHEMA
export const animalSchema = z.object({
  id: z.string(),
  specie: z.enum(species, { message: "Invalid species" }),
  breed: z.string().optional(),
  color: z.string().min(1, "Color is required"),
  size: z.enum(sizes, { message: "Invalid size" }),
  estimatedAge: z.enum(estimatedAges, { message: "Invalid estimated age" }),
  description: z
    .string()
    .min(5, "Description must be at least 5 characters")
    .max(1000),
  imageUrl: z.string(),
  images: z.array(animalImageSchema).optional(),
  userId: z.string(),
  createdAt: z.string(),
  status: z.enum(animalStatus).default("active"),
});

export type Animal = z.infer<typeof animalSchema>;

// LOST ANIMAL SCHEMA
export const lostAnimalSchema = animalSchema.extend({
  name: z.string().min(1, "Name is required"),
  lostDate: z.string().optional(),
  contactNumber: z.string().min(1, "Contact number is required").max(20),
  lastSeenLocation: z
    .string()
    .min(5, "Location must be at least 5 characters")
    .max(300),
});

export type LostAnimal = z.infer<typeof lostAnimalSchema>;

// FOUND ANIMAL SCHEMA
export const foundAnimalSchema = animalSchema
  .extend({
    foundLocation: z
      .string()
      .min(5, "Location must be at least 5 characters")
      .max(300),
    contactNumber: z.string().min(1, "Contact number is required").max(20),
  })
  .partial({
    foundLocation: true,
    contactNumber: true,
    breed: true,
    size: true,
    estimatedAge: true,
  });

export type FoundAnimal = z.infer<typeof foundAnimalSchema>;

// LOST ANIMAL FORM SCHEMA
export const lostAnimalFormSchema = lostAnimalSchema
  .omit({
    id: true,
    imageUrl: true,
    userId: true,
    createdAt: true,
  })
  .extend({
    embeddingDescription: z.string(),
    imageBase64: z.string(),
  });

export type LostAnimalForm = z.infer<typeof lostAnimalFormSchema>;

// FOUND ANIMAL FORM SCHEMA
export const foundAnimalFormSchema = foundAnimalSchema
  .omit({
    id: true,
    imageUrl: true,
    userId: true,
    createdAt: true,
  })
  .extend({
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
