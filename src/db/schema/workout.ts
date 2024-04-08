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

export const workout = pgTable("workout", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  date: date("date").notNull(),
  description: text("description"),
  duration: integer("duration"),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at").notNull().defaultNow(),
  user_id: integer("user_id")
    .notNull()
    .references(() => user.id, { onDelete: "cascade" }),
});

export const workoutExercise = pgTable(
  "workout_exercise",
  {
    workout_id: integer("workout_id")
      .references(() => workout.id, {
        onDelete: "cascade",
      })
      .notNull(),
    exercise_id: integer("exercise_id")
      .references(() => exercise.id)
      .notNull(),
    position: integer("position").notNull(),
    createdAt: timestamp("created_at").notNull().defaultNow(),
    updatedAt: timestamp("updated_at").notNull().defaultNow(),
  },
  (table) => {
    return {
      pk: primaryKey({ columns: [table.workout_id, table.exercise_id] }),
    };
  }
);

export const workoutExerciseSet = pgTable(
  "workout_exercise_set",
  {
    id: serial("id").primaryKey(),
    workout_id: integer("workout_id").notNull(),
    exercise_id: integer("exercise_id").notNull(),
    position: integer("position").notNull(),
    reps: integer("reps"),
    rpe: integer("rpe"),
    duration: integer("duration"),
    weight: integer("weight"),
    createdAt: timestamp("created_at").notNull().defaultNow(),
    updatedAt: timestamp("updated_at").notNull().defaultNow(),
  },
  (table) => {
    return {
      workoutExerciseReference: foreignKey({
        columns: [table.workout_id, table.exercise_id],
        foreignColumns: [
          workoutExercise.workout_id,
          workoutExercise.exercise_id,
        ],
        name: "fk_workout_exercise_set",
      }).onDelete("cascade"),
    };
  }
);
