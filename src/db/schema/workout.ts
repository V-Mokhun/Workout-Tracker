import { relations } from "drizzle-orm";
import { date, integer, pgTable, text, timestamp } from "drizzle-orm/pg-core";
import { createSelectSchema } from "drizzle-zod";
import { z } from "zod";
import { user } from "./user";
import { workoutExercise } from "./workout-exercise";

export const workout = pgTable("workouts", {
  id: integer("id").primaryKey().generatedAlwaysAsIdentity(),
  userId: text("user_id")
    .notNull()
    .references(() => user.id, {
      onDelete: "cascade",
      onUpdate: "cascade",
    }),
  name: text("name").notNull(),
  date: date("date", { mode: "date" }).notNull(),
  notes: text("notes"),
  duration: integer("duration"), // in seconds
  createdAt: timestamp("created_at", { mode: "date", precision: 3 })
    .notNull()
    .defaultNow(),
  updatedAt: timestamp("updated_at", { mode: "date", precision: 3 })
    .notNull()
    .defaultNow()
    .$onUpdate(() => new Date()),
});

const selectWorkoutSchema = createSelectSchema(workout);
export type Workout = z.infer<typeof selectWorkoutSchema>;

export const workoutRelations = relations(workout, ({ one, many }) => ({
  user: one(user, { fields: [workout.userId], references: [user.id] }),
  workoutExercises: many(workoutExercise),
}));
