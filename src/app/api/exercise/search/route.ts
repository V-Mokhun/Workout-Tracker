import { exercise } from "@/db";
import { exerciseService } from "@/shared/api";
import { getSession } from "@auth0/nextjs-auth0";
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

    const session = await getSession();
    if (!session) {
      return Response.json(
        { error: new Error("Unauthorized") },
        { status: 401 }
      );
    }

    const userId = session.user.sub;
    const where = [ilike(exercise.name, `%${searchValue}%`)];

    if (whereOptions.targetMuscleSlug) {
      where.push(eq(exercise.targetMuscleSlug, whereOptions.targetMuscleSlug));
    }

    if (whereOptions.equipmentSlug) {
      where.push(eq(exercise.equipmentSlug, whereOptions.equipmentSlug));
    }

    const exercises = await exerciseService.searchExercises({
      whereClause: and(...where)!,
      userId,
    });

    return Response.json(
      { data: exercises, message: "OK" },
      { status: 200, headers: { "Cache-Control": "public, s-maxage=86400" } }
    );
  } catch (error) {
    return Response.json({ error: new Error("Server error") }, { status: 500 });
  }
}
