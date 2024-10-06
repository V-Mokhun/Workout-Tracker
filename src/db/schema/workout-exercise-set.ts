import {
  foreignKey,
  integer,
  pgTable,
  real,
  serial,
  timestamp,
} from "drizzle-orm/pg-core";
import { workoutExercise } from "./workout-exercise";
import { relations } from "drizzle-orm";
import { createSelectSchema } from "drizzle-zod";
import { z } from "zod";

export const workoutExerciseSet = pgTable("workout_exercise_sets", {
  id: serial("id").primaryKey(),
  workoutExerciseId: integer("workout_exercise_id")
    .references(() => workoutExercise.id, {
      onDelete: "cascade",
    })
    .notNull(),
  position: integer("position").notNull(),
  reps: integer("reps"),
  rpe: integer("rpe"),
  duration: integer("duration"),
  weightMetric: real("weight_metric"),
  weightImperial: real("weight_imperial"),
  createdAt: timestamp("created_at", { mode: "date", precision: 3 })
    .notNull()
    .defaultNow(),
  updatedAt: timestamp("updated_at", { mode: "date", precision: 3 })
    .notNull()
    .defaultNow()
    .$onUpdate(() => new Date()),
});

const selectWorkoutExerciseSetSchema = createSelectSchema(workoutExerciseSet);
export type WorkoutExerciseSet = z.infer<typeof selectWorkoutExerciseSetSchema>;
export type BasicWorkoutExerciseSet = Pick<
  WorkoutExerciseSet,
  | "id"
  | "reps"
  | "rpe"
  | "duration"
  | "weightMetric"
  | "weightImperial"
  | "position"
>;

export const workoutExerciseSetRelations = relations(
  workoutExerciseSet,
  ({ one }) => ({
    workoutExercise: one(workoutExercise, {
      fields: [workoutExerciseSet.workoutExerciseId],
      references: [workoutExercise.id],
    }),
  })
);
