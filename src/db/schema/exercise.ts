import { relations } from "drizzle-orm";
import {
  index,
  integer,
  pgTable,
  serial,
  text,
  timestamp,
} from "drizzle-orm/pg-core";
import { exerciseExperience } from "./enums";
import {
  ExerciseTargetMuscle,
  exerciseTargetMuscle,
} from "./exercise-target-muscle";
import { ExerciseType, exerciseType } from "./exercise-type";
import { userExercise } from "./user-exercise";
import { workoutExercise } from "./workout-exercise";
import { ExerciseEquipment, exerciseEquipment } from "./exercise-equipment";
import { z } from "zod";
import { createSelectSchema } from "drizzle-zod";

export const exercise = pgTable(
  "exercises",
  {
    id: serial("id").primaryKey(),
    name: text("name").notNull(),
    slug: text("slug").notNull().unique(),
    image: text("image"),
    targetMuscleId: integer("target_muscle_id")
      .notNull()
      .references(() => exerciseTargetMuscle.id),
    typeId: integer("type_id")
      .notNull()
      .references(() => exerciseType.id),
    equipmentId: integer("equipment_id")
      .notNull()
      .references(() => exerciseEquipment.id),
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
    fields: [exercise.targetMuscleId],
    references: [exerciseTargetMuscle.id],
  }),
  type: one(exerciseType, {
    fields: [exercise.typeId],
    references: [exerciseType.id],
  }),
  equipment: one(exerciseEquipment, {
    fields: [exercise.equipmentId],
    references: [exerciseEquipment.id],
  }),
}));
