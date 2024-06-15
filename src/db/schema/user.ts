import {
  pgTable,
  real,
  serial,
  text,
  timestamp,
  varchar,
} from "drizzle-orm/pg-core";
import { gender, units } from "./enums";
import { relations } from "drizzle-orm";
import { workout } from "./workout";
import { userExercise } from "./user-exercise";
import { createSelectSchema } from "drizzle-zod";
import { z } from "zod";

export const user = pgTable("users", {
  id: text("id").primaryKey(),
  email: varchar("email", { length: 255 }),
  name: varchar("name", { length: 255 }),
  avatar: text("avatar"),
  birthdate: varchar("birthdate", { length: 10 }),
  weightMetric: real("weight_metric"),
  weightImperial: real("weight_imperial"),
  heightMetric: real("height_metric"),
  heightImperial: real("height_imperial"),
  gender: gender("gender"),
  units: units("units").default("metric"),
  createdAt: timestamp("created_at", { mode: "date", precision: 3 })
    .notNull()
    .defaultNow(),
  updatedAt: timestamp("updated_at", { mode: "date", precision: 3 })
    .notNull()
    .defaultNow()
    .$onUpdate(() => new Date()),
});

const selectUserSchema = createSelectSchema(user);
export type User = z.infer<typeof selectUserSchema>;

export const userRelations = relations(user, ({ one, many }) => ({
  workouts: many(workout),
  userExercises: many(userExercise),
}));
