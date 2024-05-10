import { relations } from "drizzle-orm";
import {
  index,
  integer,
  pgTable,
  serial,
  text,
  timestamp,
} from "drizzle-orm/pg-core";
import { exerciseExperienceEnum } from "./enums";
import { exerciseTargetMuscle } from "./exercise-target-muscle";
import { exerciseType } from "./exercise-type";
import { userExercise } from "./user-exercise";
import { workoutExercise } from "./workout-exercise";
import { exerciseEquipment } from "./exercise-equipment";

export const exercise = pgTable(
  "exercise",
  {
    id: serial("id").primaryKey(),
    name: text("name").notNull(),
    image: text("image"),
    targetMuscle: text("target_muscle")
      .notNull()
      .references(() => exerciseTargetMuscle.name),
    type: text("type")
      .notNull()
      .references(() => exerciseType.name),
    equipment: text("equipment")
      .notNull()
      .references(() => exerciseEquipment.name),
    mechanics: text("mechanics"),
    forceType: text("force_type"),
    experienceLevel: exerciseExperienceEnum("experience_level"),
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

// const selectExerciseSchema = createSelectSchema(exercise);
// type Exercise = z.infer<typeof selectExerciseSchema>;

export const exerciseRelations = relations(exercise, ({ one, many }) => ({
  workoutExercises: many(workoutExercise),
  userExercises: many(userExercise),
  targetMuscle: one(exerciseTargetMuscle, {
    fields: [exercise.targetMuscle],
    references: [exerciseTargetMuscle.name],
  }),
  type: one(exerciseType, {
    fields: [exercise.type],
    references: [exerciseType.name],
  }),
  equipment: one(exerciseEquipment, {
    fields: [exercise.equipment],
    references: [exerciseEquipment.name],
  }),
}));
