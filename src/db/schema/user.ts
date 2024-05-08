import {
  pgTable,
  real,
  serial,
  text,
  timestamp,
  varchar,
} from "drizzle-orm/pg-core";
import { genderEnum, unitsEnum } from "./enums";
import { relations } from "drizzle-orm";
import { workout } from "./workout";
import { userExercise } from "./user-exercise";

export const user = pgTable("user", {
  id: serial("id").primaryKey(),
  email: varchar("email", { length: 255 }).notNull().unique(),
  name: varchar("name", { length: 255 }),
  avatar: text("avatar"),
  birthdate: varchar("birthdate", { length: 10 }),
  weightMetric: real("weight_metric"),
  weightImperial: real("weight_imperial"),
  heightMetric: real("height_metric"),
  heightImperial: real("height_imperial"),
  gender: genderEnum("gender"),
  units: unitsEnum("units"),
  createdAt: timestamp("created_at", { mode: "string" }).notNull().defaultNow(),
  updatedAt: timestamp("updated_at", { mode: "string" }).notNull().defaultNow(),
});

export const userRelations = relations(user, ({ one, many }) => ({
  workouts: many(workout),
  userExercises: many(userExercise),
}));
