import { relations } from "drizzle-orm";
import { pgTable, serial, text } from "drizzle-orm/pg-core";
import { exercise } from "./exercise";

export const exerciseEquipment = pgTable("exercise_equipment", {
  id: serial("id").primaryKey(),
  name: text("name").notNull().unique(),
  slug: text("slug").notNull().unique(),
  image: text("image").notNull(),
});

export const exerciseEquipmentRelations = relations(
  exerciseEquipment,
  ({ many }) => ({
    exercises: many(exercise),
  })
);
