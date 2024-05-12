import { exercise } from "@/db";
import { exerciseService } from "@/shared/api";
import { and, ilike } from "drizzle-orm";

export async function POST(req: Request) {
  try {
    const data = await req.json();
    const { searchValue } = data;

    if (!searchValue) {
      return Response.json(
        { data: [], message: "Wrong request body" },
        { status: 400 }
      );
    }

    const whereClause =
      and(data.whereClause, ilike(exercise.name, `%${searchValue}%`)) ??
      ilike(exercise.name, `%${searchValue}%`);

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
