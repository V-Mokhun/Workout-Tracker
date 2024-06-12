import { relations } from "drizzle-orm";
import { pgTable, serial, text, timestamp } from "drizzle-orm/pg-core";
import { exercise } from "./exercise";
import { createSelectSchema } from "drizzle-zod";
import { z } from "zod";

export const exerciseTargetMuscle = pgTable("exercise_target_muscles", {
  id: serial("id").primaryKey(),
  name: text("name").notNull().unique(),
  slug: text("slug").notNull().unique(),
  image: text("image").notNull(),
  fullImage: text("full_image").notNull(),
  createdAt: timestamp("created_at", { mode: "date", precision: 3 })
    .notNull()
    .defaultNow(),
  updatedAt: timestamp("updated_at", { mode: "date", precision: 3 })
    .notNull()
    .defaultNow()
    .$onUpdate(() => new Date()),
});

const selectExerciseTargetMuscleSchema =
  createSelectSchema(exerciseTargetMuscle);
export type FullExerciseTargetMuscle = z.infer<
  typeof selectExerciseTargetMuscleSchema
>;
export type ExerciseTargetMuscle = Pick<
  FullExerciseTargetMuscle,
  "id" | "name" | "slug" | "fullImage"
>;

export const exerciseTargetMuscleRelations = relations(
  exerciseTargetMuscle,
  ({ many }) => ({
    exercises: many(exercise),
  })
);
