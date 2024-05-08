import { relations } from "drizzle-orm";
import {
  date,
  integer,
  pgTable,
  serial,
  text,
  timestamp,
} from "drizzle-orm/pg-core";
import { user } from "./user";
import { workoutExercise } from "./workout-exercise";

export const workout = pgTable("workout", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  date: date("date", { mode: "string" }).notNull(),
  description: text("description"),
  duration: integer("duration"), // in seconds
  createdAt: timestamp("created_at", { mode: "string" }).notNull().defaultNow(),
  updatedAt: timestamp("updated_at", { mode: "string" }).notNull().defaultNow(),
  userId: integer("user_id")
    .notNull()
    .references(() => user.id, { onDelete: "cascade" }),
});

export const workoutRelations = relations(workout, ({ one, many }) => ({
  user: one(user, { fields: [workout.userId], references: [user.id] }),
  workoutExercises: many(workoutExercise),
}));
