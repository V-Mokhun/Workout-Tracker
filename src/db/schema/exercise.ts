import { relations } from "drizzle-orm";
import { index, integer, pgTable, text, timestamp } from "drizzle-orm/pg-core";
import { createSelectSchema } from "drizzle-zod";
import { z } from "zod";
import { exerciseExperience } from "./enums";
import { ExerciseEquipment, exerciseEquipment } from "./exercise-equipment";
import {
  ExerciseTargetMuscle,
  exerciseTargetMuscle,
} from "./exercise-target-muscle";
import { ExerciseType, exerciseType } from "./exercise-type";
import { userExercise } from "./user-exercise";
import { workoutExercise } from "./workout-exercise";

export const exercise = pgTable(
  "exercises",
  {
    id: integer("id").primaryKey().generatedAlwaysAsIdentity(),
    name: text("name").notNull(),
    slug: text("slug").notNull().unique(),
    image: text("image"),
    targetMuscleSlug: text("target_muscle_slug")
      .notNull()
      .references(() => exerciseTargetMuscle.slug, {
        onUpdate: "cascade",
      }),
    typeSlug: text("type_slug")
      .notNull()
      .references(() => exerciseType.slug, {
        onUpdate: "cascade",
      }),
    equipmentSlug: text("equipment_slug")
      .notNull()
      .references(() => exerciseEquipment.slug, {
        onUpdate: "cascade",
      }),
    mechanics: text("mechanics"),
    forceType: text("force_type"),
    experienceLevel: exerciseExperience("experience_level"),
    secondaryMuscles: text("secondary_muscles"),
    overview: text("overview"),
    instructions: text("instructions"),
    tips: text("tips"),
    createdAt: timestamp("created_at", { mode: "date", precision: 3 })
      .notNull()
      .defaultNow(),
    updatedAt: timestamp("updated_at", { mode: "date", precision: 3 })
      .notNull()
      .defaultNow()
      .$onUpdate(() => new Date()),
  },
  (table) => {
    return {
      nameIndex: index().on(table.name),
    };
  }
);

const selectExerciseSchema = createSelectSchema(exercise);
export type Exercise = z.infer<typeof selectExerciseSchema>;
export type BasicExercise = Pick<Exercise, "id" | "name" | "slug" | "image">;
export type FullExercise = Exercise & {
  targetMuscle: ExerciseTargetMuscle;
  type: ExerciseType;
  equipment: ExerciseEquipment;
};

export const exerciseRelations = relations(exercise, ({ one, many }) => ({
  workoutExercises: many(workoutExercise),
  userExercises: many(userExercise),
  targetMuscle: one(exerciseTargetMuscle, {
    fields: [exercise.targetMuscleSlug],
    references: [exerciseTargetMuscle.slug],
  }),
  type: one(exerciseType, {
    fields: [exercise.typeSlug],
    references: [exerciseType.slug],
  }),
  equipment: one(exerciseEquipment, {
    fields: [exercise.equipmentSlug],
    references: [exerciseEquipment.slug],
  }),
}));
