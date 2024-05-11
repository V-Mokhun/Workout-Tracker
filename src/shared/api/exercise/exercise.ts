import { db, exercise } from "@/db";
import { SQL, ilike } from "drizzle-orm";

export const searchExercises = async (
  searchValue: string,
  whereClause: SQL<unknown>
) => {
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
};
