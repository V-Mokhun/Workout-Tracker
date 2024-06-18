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
    .min(0, "Weight must be at least 0kg")
    .max(200, "Weight must be less than 200kg")
    .refine(
      (n) => {
        const decimalPart = n.toString().split(".")[1];
        return !decimalPart || decimalPart.length <= 1;
      },
      { message: "Max precision is 1 decimal place" }
    ),
  weightImperial: z
    .number()
    .min(0, "Weight must be at least 0 lbs")
    .max(440, "Weight must be less than 440 lbs")
    .refine(
      (n) => {
        const decimalPart = n.toString().split(".")[1];
        return !decimalPart || decimalPart.length <= 1;
      },
      { message: "Max precision is 1 decimal place" }
    ),
  heightMetricMetres: z
    .number()
    .min(0, "You can't have a negative height")
    .max(2, "Height must be at most 2 metres"),
  heightMetricCentimetres: z
    .number()
    .min(0, "You can't have a negative height")
    .max(99, "Height must be less than 100cm"),
  heightImperialFeet: z
    .number()
    .min(0, "You can't have a negative height")
    .max(8, "Height must be at most 8 feet"),
  heightImperialInches: z
    .number()
    .min(0, "You can't have a negative height")
    .max(11, "Height must be less than 12 inches"),
  gender: genderSchema.default("male"),
});

export type AccountFormSchema = z.infer<typeof accountFormSchema>;
