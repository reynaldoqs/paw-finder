import { z } from "zod/v3";
import { animalStatus, species } from "../constants";

export const animalSchema = z.object({
  id: z.string(),
  name: z.string(),
  specie: z.enum(species),
  breed: z.string().optional(),
  color: z.string(),
  description: z.string().min(5).max(100),
  location: z.string().min(5).max(100),
  coords: z
    .object({
      lat: z.number(),
      lng: z.number(),
    })
    .nullable(),
  imageUrl: z.string(),
  userId: z.string(),
  createdAt: z.string(),
  lostDate: z.string().optional(),
  status: z.enum(animalStatus),
  contactNumber: z.string().min(1).max(20),
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
    specie: z.enum(species).nullable(),
    imageFile: z.any().refine((val) => Array.isArray(val) && val.length > 0, {
      message: "Please upload at least one image",
    }),
    lostDate: z.date().nullable(),
    status: z.string().default("active"),
  });

export type AnimalForm = z.infer<typeof animalFormSchema>;
