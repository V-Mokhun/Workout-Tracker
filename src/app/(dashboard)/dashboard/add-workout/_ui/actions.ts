"use server";
import {
  user as dbUser,
  workout as dbWorkout,
  workoutExercise,
  workoutExerciseSet,
} from "@/db";
import { db } from "@/db/database";
import { ActionFormState } from "@/shared/api";
import { eq } from "drizzle-orm";
import { AddWorkoutSubmissionValues } from "./add-workout-form";
import { addWorkoutFormSchema } from "./add-workout-model";

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

      const insertedExercises = await tx
        .insert(workoutExercise)
        .values(exerciseInserts)
        .returning({
          id: workoutExercise.id,
        });

      const setInserts = values.exercises.flatMap((exercise, index) =>
        exercise.sets.map((set, setIndex) => ({
          workoutExerciseId: insertedExercises[index].id,
          position: setIndex + 1,
          weightMetric: set.weightMetric,
          weightImperial: set.weightImperial,
          rpe: set.rpe,
          reps: set.reps,
          duration: set.duration,
        }))
      );
      await tx.insert(workoutExerciseSet).values(setInserts);
    });

    return {
      message: "Workout added successfully",
      isError: false,
    };
  } catch (error) {
    const errorMessage =
      error instanceof Error
        ? error.message
        : "Something went wrong. Please try again later.";

    console.log(error);
    return {
      message: errorMessage,
      isError: true,
    };
  }
}
