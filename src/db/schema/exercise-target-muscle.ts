import { relations } from "drizzle-orm";
import { integer, pgTable, text, timestamp } from "drizzle-orm/pg-core";
import { createSelectSchema } from "drizzle-zod";
import { z } from "zod";
import { exercise } from "./exercise";

export const exerciseTargetMuscle = pgTable("exercise_target_muscles", {
  id: integer("id").primaryKey().generatedAlwaysAsIdentity(),
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
