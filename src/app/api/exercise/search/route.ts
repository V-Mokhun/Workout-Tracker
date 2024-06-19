import { exercise } from "@/db";
import { exerciseService } from "@/shared/api";
import { and, eq, ilike } from "drizzle-orm";

export async function POST(req: Request) {
  try {
    const data = await req.json();
    const { searchValue, targetMuscleId } = data;

    if (!searchValue) {
      return Response.json(
        { error: new Error("Wrong request body") },
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

    return Response.json(
      { data: exercises, message: "OK" },
      { status: 200, headers: { "Cache-Control": "public, s-maxage=86400" } }
    );
  } catch (error) {
    return Response.json({ error: new Error("Server error") }, { status: 500 });
  }
}
