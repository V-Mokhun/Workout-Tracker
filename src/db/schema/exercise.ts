import { relations } from "drizzle-orm";
import {
  index,
  integer,
  pgTable,
  serial,
  text,
  timestamp,
} from "drizzle-orm/pg-core";
import { exerciseExperienceEnum } from "./enums";
import { exerciseTargetMuscle } from "./exercise-target-muscle";
import { exerciseType } from "./exercise-type";
import { userExercise } from "./user-exercise";
import { workoutExercise } from "./workout-exercise";

export const exercise = pgTable(
  "exercise",
  {
    id: serial("id").primaryKey(),
    name: text("name").notNull(),
    image: text("image"),
    targetMuscleId: integer("target_muscle_id")
      .notNull()
      .references(() => exerciseTargetMuscle.id),
    typeId: integer("exercise_type_id")
      .notNull()
      .references(() => exerciseType.id),
    equipment: text("equipment"),
    mechanics: text("mechanics"),
    forceType: text("force_type"),
    experienceLevel: exerciseExperienceEnum("experience_level"),
    secondaryMuscles: text("secondary_muscles"),
    overview: text("overview"),
    instructions: text("instructions"),
    tips: text("tips"),
    createdAt: timestamp("created_at").notNull().defaultNow(),
    updatedAt: timestamp("updated_at").notNull().defaultNow(),
  },
  (table) => {
    return {
      nameIndex: index().on(table.name),
    };
  }
);

// const selectExerciseSchema = createSelectSchema(exercise);
// type Exercise = z.infer<typeof selectExerciseSchema>;

export const exerciseRelations = relations(exercise, ({ one, many }) => ({
  workoutExercises: many(workoutExercise),
  userExercises: many(userExercise),
  targetMuscle: one(exerciseTargetMuscle, {
    fields: [exercise.targetMuscleId],
    references: [exerciseTargetMuscle.id],
  }),
  type: one(exerciseType, {
    fields: [exercise.typeId],
    references: [exerciseType.id],
  }),
}));
