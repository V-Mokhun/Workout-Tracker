import { integer, pgTable, serial, text, timestamp } from "drizzle-orm/pg-core";
import { user } from "./user";
import {
  exerciseExperienceEnum,
  exerciseTypeEnum,
  targetMuscleEnum,
} from "./enums";

export const exercise = pgTable("exercise", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  image: text("image"),
  target_muscle: targetMuscleEnum("target_muscle"),
  type: exerciseTypeEnum("type"),
  equipment: text("equipment"),
  mechanics: text("mechanics"),
  force_type: text("force_type"),
  experience_level: exerciseExperienceEnum("experience_level"),
  secondary_muscles: text("secondary_muscles"),
  overview: text("overview"),
  instructions: text("instructions"),
  tips: text("tips"),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at").notNull().defaultNow(),
  user_id: integer("user_id").references(() => user.id, {
    onDelete: "cascade",
  }),
  user_notes: text("user_notes"),
});
