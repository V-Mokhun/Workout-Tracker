import { exercise } from "@/db";
import { exerciseService } from "@/shared/api";
import { and, eq, ilike } from "drizzle-orm";

export async function POST(req: Request) {
  try {
    const data = await req.json();
    const { searchValue, ...whereOptions } = data;

    if (!searchValue) {
      return Response.json(
        { error: new Error("Wrong request body") },
        { status: 400 }
      );
    }

    const where = [ilike(exercise.name, `%${searchValue}%`)];

    if (whereOptions.targetMuscleSlug) {
      where.push(eq(exercise.targetMuscleSlug, whereOptions.targetMuscleSlug));
    }

    if (whereOptions.equipmentSlug) {
      where.push(eq(exercise.equipmentSlug, whereOptions.equipmentSlug));
    }

    //TODO: search also in user's custom created exercises
    const exercises = await exerciseService.searchExercises(and(...where)!);

    return Response.json(
      { data: exercises, message: "OK" },
      { status: 200, headers: { "Cache-Control": "public, s-maxage=86400" } }
    );
  } catch (error) {
    return Response.json({ error: new Error("Server error") }, { status: 500 });
  }
}
