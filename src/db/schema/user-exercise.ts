import {
  boolean,
  integer,
  pgTable,
  primaryKey,
  text,
  timestamp,
} from "drizzle-orm/pg-core";
import { exercise } from "./exercise";
import { user } from "./user";
import { relations } from "drizzle-orm";
import { createSelectSchema } from "drizzle-zod";
import { z } from "zod";

export const userExercise = pgTable(
  "user_exercises",
  {
    exerciseId: integer("exercise_id")
      .notNull()
      .references(() => exercise.id, {
        onDelete: "cascade",
        onUpdate: "cascade",
      }),
    userId: text("user_id")
      .notNull()
      .references(() => user.id, {
        onDelete: "cascade",
        onUpdate: "cascade",
      }),
    userNotes: text("user_notes"),
    isFavorite: boolean("is_favorite").notNull().default(false),
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
      pk: primaryKey({ columns: [table.userId, table.exerciseId] }),
    };
  }
);

const selectUserExerciseSchema = createSelectSchema(userExercise);
export type UserExercise = z.infer<typeof selectUserExerciseSchema>;

export const userExerciseRelations = relations(userExercise, ({ one }) => ({
  user: one(user, { fields: [userExercise.userId], references: [user.id] }),
  exercise: one(exercise, {
    fields: [userExercise.exerciseId],
    references: [exercise.id],
  }),
}));
