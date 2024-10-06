"use server";
import { ActionFormState } from "@/shared/api";
import {
  addWorkoutFormSchema,
  AddWorkoutFormSchema,
} from "./add-workout-model";
import { db } from "@/db/database";
import {
  user as dbUser,
  workout as dbWorkout,
  workoutExercise,
  workoutExerciseSet,
} from "@/db";
import { eq } from "drizzle-orm";
import { AddWorkoutSubmissionValues } from "./add-workout-form";

export async function addWorkout(
  values: AddWorkoutSubmissionValues,
  userId: string
): Promise<ActionFormState> {
  try {
    const parsed = addWorkoutFormSchema.safeParse(values);

    if (!parsed.success) {
      return {
        message: "Invalid form values",
        isError: true,
      };
    }

    const user = await db.query.user.findFirst({
      where: eq(dbUser.id, userId),
    });

    if (!user) {
      return {
        message: "User not found",
        isError: true,
      };
    }

    await db.transaction(async (tx) => {
      const [{ id: workoutId }] = await tx
        .insert(dbWorkout)
        .values({
          userId,
          name: values.name,
          date: values.date,
          notes: values.notes,
          duration: values.duration,
        })
        .returning({ id: dbWorkout.id });

      const exerciseInserts = values.exercises.map((exercise, index) => ({
        workoutId,
        exerciseId: exercise.id,
        position: index + 1,
      }));

      const setInserts = values.exercises.flatMap((exercise) =>
        exercise.sets.map((set, setIndex) => ({
          workoutId,
          exerciseId: exercise.id,
          position: setIndex + 1,
          weightMetric: set.weightMetric,
          weightImperial: set.weightImperial,
          rpe: set.rpe,
          reps: set.reps,
          duration: set.duration,
        }))
      );

      await tx.insert(workoutExercise).values(exerciseInserts);
      await tx.insert(workoutExerciseSet).values(setInserts);
    });

    return {
      message: "Workout added successfully",
      isError: false,
    };
  } catch (error) {
    return {
      message: "Something went wrong. Please try again later.",
      isError: true,
    };
  }
}
