import { db } from "@/db/database";
import { customExercise } from "@/db/schema";
import { SQL, and, eq } from "drizzle-orm";

class ExerciseService {
  async searchExercises({
    whereClause,
    userId,
    limit = 5,
  }: {
    whereClause: SQL<unknown>;
    userId: string;
    limit?: number;
  }) {
    const [exercises, customExercises] = await Promise.all([
      this.searchRegularExercises(whereClause, limit),
      this.searchCustomExercises(whereClause, userId, limit),
    ]);

    const combinedExercises = [
      ...customExercises.map((ce) => ({ ...ce, isCustom: true })),
      ...exercises.map((e) => ({ ...e, isCustom: false })),
    ];

    return combinedExercises.slice(0, limit);
  }

  private async searchRegularExercises(
    whereClause: SQL<unknown>,
    limit: number
  ) {
    const exercises = await db.query.exercise.findMany({
      where: whereClause,
      columns: {
        id: true,
        name: true,
        slug: true,
        image: true,
      },
      with: {
        targetMuscle: {
          columns: {
            name: true,
          },
        },
      },
      limit,
    });

    return exercises;
  }

  private async searchCustomExercises(
    whereClause: SQL<unknown>,
    userId: string,
    limit: number
  ) {
    return await db.query.customExercise.findMany({
      where: and(eq(customExercise.userId, userId), whereClause),
      columns: {
        id: true,
        name: true,
        slug: true,
        image: true,
      },
      with: {
        targetMuscle: {
          columns: {
            name: true,
          },
        },
      },
      limit,
    });
  }
}

export const exerciseService = new ExerciseService();
