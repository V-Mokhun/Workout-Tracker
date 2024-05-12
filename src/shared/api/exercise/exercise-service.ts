import { db } from "@/db";
import { SQL } from "drizzle-orm";

class ExerciseService {
  async searchExercises(whereClause: SQL<unknown>) {
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
      limit: 5,
    });

    return exercises;
  }
}

export const exerciseService = new ExerciseService();
