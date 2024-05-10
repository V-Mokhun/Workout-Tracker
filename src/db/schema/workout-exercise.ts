import {
  date,
  foreignKey,
  integer,
  pgTable,
  primaryKey,
  serial,
  text,
  timestamp,
} from "drizzle-orm/pg-core";
import { user } from "./user";
import { exercise } from "./exercise";
import { relations } from "drizzle-orm";
import { workout } from "./workout";
import { workoutExerciseSet } from "./workout-exercise-set";

export const workoutExercise = pgTable(
  "workout_exercise",
  {
    workoutId: integer("workout_id")
      .references(() => workout.id, {
        onDelete: "cascade",
      })
      .notNull(),
    exerciseId: integer("exercise_id")
      .references(() => exercise.id)
      .notNull(),
    position: integer("position").notNull(),
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
      pk: primaryKey({ columns: [table.workoutId, table.exerciseId] }),
    };
  }
);

export const workoutExerciseRelations = relations(
  workoutExercise,
  ({ one, many }) => ({
    workout: one(workout, {
      fields: [workoutExercise.workoutId],
      references: [workout.id],
    }),
    exercise: one(exercise, {
      fields: [workoutExercise.exerciseId],
      references: [exercise.id],
    }),
    workoutExerciseSets: many(workoutExerciseSet),
  })
);
