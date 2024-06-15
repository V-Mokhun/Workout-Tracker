import { genderSchema } from "@/db";
import { z } from "zod";

export const accountFormSchema = z.object({
  name: z
    .string()
    .min(3, "Name must be at least 3 characters long")
    .max(255, "Name must be less than 255 characters long"),
  birthdate: z.date().optional(),
  weightMetric: z
    .number()
    .min(20, "Weight must be at least 20kg")
    .max(200, "Weight must be less than 200kg")
    .refine(
      (n) => {
        const decimalPart = n.toString().split(".")[1];
        return !decimalPart || decimalPart.length <= 1;
      },
      { message: "Max precision is 1 decimal place" }
    )
    .optional(),
  weightImperial: z
    .number()
    .min(44, "Weight must be at least 44 lbs")
    .max(440, "Weight must be less than 440 lbs")
    .refine(
      (n) => {
        const decimalPart = n.toString().split(".")[1];
        return !decimalPart || decimalPart.length <= 1;
      },
      { message: "Max precision is 1 decimal place" }
    )
    .optional(),
  heightMetric: z
    .number()
    .min(50, "Height must be at least 50 cm")
    .max(250, "Height must be less than 250 cm")
    .refine(
      (n) => {
        const decimalPart = n.toString().split(".")[1];
        return !decimalPart || decimalPart.length <= 1;
      },
      { message: "Max precision is 1 decimal place" }
    )
    .optional(),
  heightImperial: z
    .number()
    .min(2, "Height must be at least 2 feet")
    .max(8, "Height must be less than 8 feet")
    .refine(
      (n) => {
        const decimalPart = n.toString().split(".")[1];
        return !decimalPart || decimalPart.length <= 1;
      },
      { message: "Max precision is 1 decimal place" }
    )
    .optional(),
  gender: genderSchema.default("male"),
});

export type AccountFormSchema = z.infer<typeof accountFormSchema>;
