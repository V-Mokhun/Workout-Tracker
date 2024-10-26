import { relations } from "drizzle-orm";
import {
  date,
  integer,
  pgTable,
  real,
  text,
  timestamp,
  varchar,
} from "drizzle-orm/pg-core";
import { createSelectSchema } from "drizzle-zod";
import { z } from "zod";
import { gender, units } from "./enums";
import { userExercise } from "./user-exercise";
import { workout } from "./workout";
import { customExercise } from "./custom-exercise";

export const user = pgTable("users", {
  id: text("id").primaryKey(),
  email: varchar("email", { length: 255 }),
  name: varchar("name", { length: 255 }),
  avatar: text("avatar"),
  birthdate: date("birthdate", { mode: "string" }),
  weightMetric: real("weight_metric").default(0).notNull(),
  weightImperial: real("weight_imperial").default(0).notNull(),
  heightMetricMetres: integer("height_metric_metres").default(0).notNull(),
  heightMetricCentimetres: integer("height_metric_centimetres")
    .default(0)
    .notNull(),
  heightImperialFeet: integer("height_imperial_feet").default(0).notNull(),
  heightImperialInches: integer("height_imperial_inches").default(0).notNull(),
  gender: gender("gender").default("male").notNull(),
  units: units("units").default("metric").notNull(),
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
  customExercises: many(customExercise),
}));
