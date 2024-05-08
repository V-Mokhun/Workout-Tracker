import { z } from "zod";
import { pgEnum } from "drizzle-orm/pg-core";

export const unitsEnum = pgEnum("units", ["metric", "imperial"]);
export const unitsEnumSchema = z.enum(unitsEnum.enumValues);

export const genderEnum = pgEnum("gender", ["male", "female"]);
export const genderEnumSchema = z.enum(genderEnum.enumValues);

export const exerciseExperienceEnum = pgEnum("exercise_experience", [
  "beginner",
  "intermediate",
  "advanced",
]);
export const exerciseExperienceEnumSchema = z.enum(
  exerciseExperienceEnum.enumValues
);

/*
export const targetMuscleEnum = pgEnum("target_muscle", [
  "abductors",
  "abs",
  "adductors",
  "biceps",
  "calves",
  "chest",
  "forearms",
  "glutes",
  "hamstrings",
  "hip-flexors",
  "lats",
  "lower-back",
  "upper-back",
  "neck",
  "obliques",
  "quads",
  "shoulders",
  "traps",
  "triceps",
]);

export const exerciseTypeEnum = pgEnum("exercise_type", [
  "strength",
  "plyometrics",
  "warmup",
  "smr",
  "conditioning",
  "activation",
  "powerlifting",
  "olympic-weightlifting",
]);
*/
