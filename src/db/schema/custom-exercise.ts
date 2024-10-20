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
import { workoutExercise } from "./workout-exercise";
import { ExerciseEquipment, exerciseEquipment } from "./exercise-equipment";
import { z } from "zod";
import { createSelectSchema } from "drizzle-zod";
import { user } from "./user";

export const customExercise = pgTable(
  "custom_exercises",
  {
    id: serial("id").primaryKey(),
    userId: text("user_id")
      .notNull()
      .references(() => user.id),
    name: text("name").notNull(),
    slug: text("slug").notNull(),
    image: text("image"),
    targetMuscleId: integer("target_muscle_id").references(
      () => exerciseTargetMuscle.id
    ),
    typeId: integer("type_id").references(() => exerciseType.id),
    equipmentId: integer("equipment_id").references(() => exerciseEquipment.id),
    mechanics: text("mechanics"),
    forceType: text("force_type"),
    experienceLevel: exerciseExperience("experience_level"),
    secondaryMuscles: text("secondary_muscles"),
    notes: text("notes"),
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

const selectCustomExerciseSchema = createSelectSchema(customExercise);
export type CustomExercise = z.infer<typeof selectCustomExerciseSchema>;
export type BasicCustomExercise = Pick<
  CustomExercise,
  "id" | "name" | "slug" | "image"
>;
export type FullCustomExercise = CustomExercise & {
  targetMuscle: ExerciseTargetMuscle;
  type: ExerciseType;
  equipment: ExerciseEquipment;
};

export const customExerciseRelations = relations(
  customExercise,
  ({ one, many }) => ({
    user: one(user, {
      fields: [customExercise.userId],
      references: [user.id],
    }),
    workoutExercises: many(workoutExercise),
    targetMuscle: one(exerciseTargetMuscle, {
      fields: [customExercise.targetMuscleId],
      references: [exerciseTargetMuscle.id],
    }),
    type: one(exerciseType, {
      fields: [customExercise.typeId],
      references: [exerciseType.id],
    }),
    equipment: one(exerciseEquipment, {
      fields: [customExercise.equipmentId],
      references: [exerciseEquipment.id],
    }),
  })
);
