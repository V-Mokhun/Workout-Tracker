import {
	pgTable,
	real,
	serial,
	text,
	timestamp,
	varchar
} from "drizzle-orm/pg-core";
import { genderEnum, unitsEnum } from "./enums";

export const user = pgTable("user", {
  id: serial("id").primaryKey(),
  email: varchar("email", { length: 255 }).notNull().unique(),
  name: varchar("name", { length: 255 }),
  avatar: text("avatar"),
  birthdate: varchar("birthdate", { length: 10 }),
  weight_metric: real("weight_metric"),
  weight_imperial: real("weight_imperial"),
  height_metric: real("height_metric"),
  height_imperial: real("height_imperial"),
  gender: genderEnum("gender"),
  units: unitsEnum("units"),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at").notNull().defaultNow(),
});
