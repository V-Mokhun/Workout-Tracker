import { relations } from "drizzle-orm";
import { integer, pgTable, primaryKey, timestamp } from "drizzle-orm/pg-core";
import { exercise } from "./exercise";
import { workout } from "./workout";
import { workoutExerciseSet } from "./workout-exercise-set";

export const workoutExercise = pgTable(
  "workout_exercises",
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
