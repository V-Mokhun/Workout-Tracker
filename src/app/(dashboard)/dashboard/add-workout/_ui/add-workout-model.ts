import { z } from "zod";

export const addWorkoutFormSchema = z.object({
  name: z.string({ message: "Name is required" }),
  date: z.date(),
  notes: z.string().optional(),
  hours: z.number().optional(),
  minutes: z.number().optional(),
  seconds: z.number().optional(),
});

export type AddWorkoutFormSchema = z.infer<typeof addWorkoutFormSchema>;
