import { relations } from "drizzle-orm";
import { exercise } from "./exercise";
import { user } from "./user";
import { workout, workoutExercise, workoutExerciseSet } from "./workout";

export const userRelations = relations(user, ({ one, many }) => ({
  workouts: many(workout),
  exercises: many(exercise),
}));

export const workoutRelations = relations(workout, ({ one, many }) => ({
  user: one(user, { fields: [workout.userId], references: [user.id] }),
  workoutExercises: many(workoutExercise),
}));

export const exerciseRelations = relations(exercise, ({ one, many }) => ({
  user: one(user, { fields: [exercise.userId], references: [user.id] }),
  workoutExercises: many(workoutExercise),
}));

export const workoutExerciseRelations = relations(
  workoutExercise,
  ({ one, many }) => ({
    workout: one(workout, {
      fields: [workoutExercise.workoutId],
      references: [workout.id],
    }),
    exercise: one(exercise, {
      fields: [workoutExercise.exerciseId],
      references: [exercise.id],
    }),
    workoutExerciseSets: many(workoutExerciseSet),
  })
);

export const workoutExerciseSetRelations = relations(
  workoutExerciseSet,
  ({ one }) => ({
    workoutExercise: one(workoutExercise, {
      fields: [workoutExerciseSet.workoutId, workoutExerciseSet.exerciseId],
      references: [workoutExercise.workoutId, workoutExercise.exerciseId],
    }),
  })
);
