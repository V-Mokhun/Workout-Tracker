import { relations } from "drizzle-orm";
import { pgTable, serial, text, timestamp } from "drizzle-orm/pg-core";
import { exercise } from "./exercise";
import { z } from "zod";
import { createSelectSchema } from "drizzle-zod";

export const exerciseType = pgTable("exercise_types", {
  id: serial("id").primaryKey(),
  name: text("name").notNull().unique(),
  slug: text("slug").notNull().unique(),
  createdAt: timestamp("created_at", { mode: "date", precision: 3 })
    .notNull()
    .defaultNow(),
  updatedAt: timestamp("updated_at", { mode: "date", precision: 3 })
    .notNull()
    .defaultNow()
    .$onUpdate(() => new Date()),
});

const selectExerciseTypeSchema = createSelectSchema(exerciseType);
export type FullExerciseType = z.infer<typeof selectExerciseTypeSchema>;
export type ExerciseType = Pick<FullExerciseType, "id" | "name" | "slug">;

export const exerciseTypeRelations = relations(exerciseType, ({ many }) => ({
  exercises: many(exercise),
}));
