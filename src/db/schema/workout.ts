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
  userId: integer("user_id")
    .notNull()
    .references(() => user.id, { onDelete: "cascade" }),
});

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
    createdAt: timestamp("created_at").notNull().defaultNow(),
    updatedAt: timestamp("updated_at").notNull().defaultNow(),
  },
  (table) => {
    return {
      pk: primaryKey({ columns: [table.workoutId, table.exerciseId] }),
    };
  }
);

export const workoutExerciseSet = pgTable(
  "workout_exercise_set",
  {
    id: serial("id").primaryKey(),
    workoutId: integer("workout_id").notNull(),
    exerciseId: integer("exercise_id").notNull(),
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
        columns: [table.workoutId, table.exerciseId],
        foreignColumns: [
          workoutExercise.workoutId,
          workoutExercise.exerciseId,
        ],
        name: "fk_workout_exercise_set",
      }).onDelete("cascade"),
    };
  }
);
