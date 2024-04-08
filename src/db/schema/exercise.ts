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
  targetMuscle: targetMuscleEnum("target_muscle"),
  type: exerciseTypeEnum("type"),
  equipment: text("equipment"),
  mechanics: text("mechanics"),
  forceType: text("force_type"),
  experienceLevel: exerciseExperienceEnum("experience_level"),
  secondaryMuscles: text("secondary_muscles"),
  overview: text("overview"),
  instructions: text("instructions"),
  tips: text("tips"),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at").notNull().defaultNow(),
  userId: integer("user_id").references(() => user.id, {
    onDelete: "cascade",
  }),
  userNotes: text("user_notes"),
});
