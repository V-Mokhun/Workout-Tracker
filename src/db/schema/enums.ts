import { z } from "zod";
import { pgEnum } from "drizzle-orm/pg-core";

export const units = pgEnum("units", ["metric", "imperial"]);
export const unitsSchema = z.enum(units.enumValues);
export type Units = z.infer<typeof unitsSchema>;

export const gender = pgEnum("gender", ["male", "female"]);
export const genderSchema = z.enum(gender.enumValues);
export type Gender = z.infer<typeof genderSchema>;

export const exerciseExperience = pgEnum("exercise_experience", [
  "Beginner",
  "Intermediate",
  "Advanced",
]);
export const exerciseExperienceSchema = z.enum(exerciseExperience.enumValues);
export type ExerciseExperience = z.infer<typeof exerciseExperienceSchema>;

export const exerciseSetType = pgEnum("exercise_set_type", [
  "Normal",
  "Warmup",
  "Failure",
]);
export const exerciseSetTypeSchema = z.enum(exerciseSetType.enumValues);
export type ExerciseSetType = z.infer<typeof exerciseSetTypeSchema>;
