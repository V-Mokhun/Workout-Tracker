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

export const workoutExerciseSet = pgTable(
  "workout_exercise_sets",
  {
    id: serial("id").primaryKey(),
    workoutId: integer("workout_id").notNull(),
    exerciseId: integer("exercise_id").notNull(),
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
  },
  (table) => {
    return {
      workoutExerciseReference: foreignKey({
        columns: [table.workoutId, table.exerciseId],
        foreignColumns: [workoutExercise.workoutId, workoutExercise.exerciseId],
        name: "fk_workout_exercise_set",
      }).onDelete("cascade"),
    };
  }
);

export const workoutExerciseSetRelations = relations(
  workoutExerciseSet,
  ({ one }) => ({
    workoutExercise: one(workoutExercise, {
      fields: [workoutExerciseSet.workoutId, workoutExerciseSet.exerciseId],
      references: [workoutExercise.workoutId, workoutExercise.exerciseId],
    }),
  })
);
