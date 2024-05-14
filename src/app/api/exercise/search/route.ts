import { exercise, exerciseTargetMuscle } from "@/db";
import { exerciseService } from "@/shared/api";
import { SQL, and, eq, ilike } from "drizzle-orm";

export async function POST(req: Request) {
  try {
    const data = await req.json();
    const { searchValue, targetMuscleId } = data;

    if (!searchValue) {
      return Response.json(
        { data: [], message: "Wrong request body" },
        { status: 400 }
      );
    }

    let whereClause = ilike(exercise.name, `%${searchValue}%`);

    if (targetMuscleId) {
      whereClause = and(
        whereClause,
        eq(exercise.targetMuscleId, targetMuscleId)
      )!;
    }
    const exercises = await exerciseService.searchExercises(whereClause);

    return Response.json({ data: exercises, message: "OK" }, { status: 200 });
  } catch (error) {
    console.log("search exercises error: ", error);
    return Response.json(
      { data: [], message: "Server error" },
      { status: 500 }
    );
  }
}
