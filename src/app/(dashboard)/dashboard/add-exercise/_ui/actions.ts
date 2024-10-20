"use server";

import { ActionFormState } from "@/shared/api";
import { AddExerciseFormSchema } from "./add-exercise-model";

export async function addExercise(
  values: AddExerciseFormSchema,
  userId: string
): Promise<ActionFormState> {
  console.log(values);

  return {
    message: "Exercise added successfully",
    isError: false,
  };
}
