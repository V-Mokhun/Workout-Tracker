import { relations } from "drizzle-orm";
import { pgTable, serial, text, timestamp } from "drizzle-orm/pg-core";
import { exercise } from "./exercise";
import { createSelectSchema } from "drizzle-zod";
import { z } from "zod";

export const exerciseEquipment = pgTable("exercise_equipments", {
  id: serial("id").primaryKey(),
  name: text("name").notNull().unique(),
  slug: text("slug").notNull().unique(),
  image: text("image").notNull(),
  createdAt: timestamp("created_at", { mode: "date", precision: 3 })
    .notNull()
    .defaultNow(),
  updatedAt: timestamp("updated_at", { mode: "date", precision: 3 })
    .notNull()
    .defaultNow()
    .$onUpdate(() => new Date()),
});

const selectExerciseEquipmentSchema = createSelectSchema(exerciseEquipment);
export type FullExerciseEquipment = z.infer<
  typeof selectExerciseEquipmentSchema
>;
export type ExerciseEquipment = Pick<
  FullExerciseEquipment,
  "id" | "name" | "slug"
>;

export const exerciseEquipmentRelations = relations(
  exerciseEquipment,
  ({ many }) => ({
    exercises: many(exercise),
  })
);
