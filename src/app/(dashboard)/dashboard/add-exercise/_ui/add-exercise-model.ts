import { exerciseExperienceSchema } from "@/db";
import { ALLOWED_IMAGE_EXTENSIONS } from "@/shared/consts";
import { validateImage } from "@/shared/lib";
import { z } from "zod";

export const addExerciseFormSchema = z.object({
  name: z.string().min(1, "Name is required"),
  image: z
    .instanceof(File)
    .refine(
      (file) => file.size <= 1024 * 1024 * 10,
      "Image must be less than 10MB"
    )
    .refine(
      validateImage,
      `Image must be one of the following: ${ALLOWED_IMAGE_EXTENSIONS.join(
        ", "
      )}`
    )
    .optional(),
  targetMuscle: z.number().int().optional(),
  type: z.number().int().optional(),
  equipment: z.number().int().optional(),
  mechanics: z.string().optional(),
  forceType: z.string().optional(),
  experienceLevel: exerciseExperienceSchema.optional(),
  secondaryMuscles: z.string().optional(),
  notes: z.string().optional(),
  overview: z.string().optional(),
  instructions: z.string().optional(),
  tips: z.string().optional(),
});

export type AddExerciseFormSchema = z.infer<typeof addExerciseFormSchema>;
