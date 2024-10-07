import { exerciseSetTypeSchema } from "@/db";
import { z } from "zod";

export const addWorkoutFormSchema = z.object({
  name: z.string().min(1, {
    message: "Name is required",
  }),
  date: z.date(),
  notes: z.string().optional(),
  hours: z.number().optional(),
  minutes: z.number().optional(),
  seconds: z.number().optional(),
  exercises: z
    .array(
      z.object({
        id: z.number(),
        sets: z
          .array(
            z
              .object({
                id: z.number(),
                type: exerciseSetTypeSchema.default("Normal"),
                position: z.number(),
                reps: z.coerce
                  .number()
                  .refine((value) => value >= 0, {
                    message: "Reps must be a positive number",
                  })
                  .nullable(),
                weightMetric: z.coerce.number().nullable(),
                weightImperial: z.coerce.number().nullable(),
                rpe: z.coerce
                  .number()
                  .refine((value) => value >= 0 && value <= 10, {
                    message: "RPE must be between 0 and 10",
                  })
                  .nullable(),
                duration: z.coerce
                  .number()
                  .refine((value) => value >= 0, {
                    message: "Duration must be a positive number",
                  })
                  .nullable(),
              })
              .refine((data) => data.reps ?? data.duration, {
                message: "Either reps or duration must be provided",
              })
          )
          .min(1, { message: "At least one set is required" }),
      })
    )
    .min(1, { message: "At least one exercise is required" }),
});

export type AddWorkoutFormSchema = z.infer<typeof addWorkoutFormSchema>;
