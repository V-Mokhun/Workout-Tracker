import { relations } from "drizzle-orm";
import { pgTable, serial, text } from "drizzle-orm/pg-core";
import { exercise } from "./exercise";

export const exerciseTargetMuscle = pgTable("exercise_target_muscle", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  slug: text("slug").notNull().unique(),
});

export const exerciseTargetMuscleRelations = relations(
  exerciseTargetMuscle,
  ({ many }) => ({
    exercises: many(exercise),
  })
);
