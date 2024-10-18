import { workoutService } from "@/shared/api";
import { getSession } from "@auth0/nextjs-auth0";
import { NextRequest } from "next/server";

export async function GET(req: NextRequest) {
  try {
    const session = await getSession();
    const userId = session?.user.sub;

    if (!userId) {
      return Response.json(
        { error: new Error("Unauthorized") },
        { status: 401 }
      );
    }

    const date = req.nextUrl.searchParams.get("date");
    const dateObj = date
      ? {
          year: parseInt(date.split("-")[0]),
          month: parseInt(date.split("-")[1]) - 1,
        }
      : undefined;

    const workouts = await workoutService.getMonthlyWorkouts(userId, dateObj);

    return Response.json({ data: workouts }, { status: 200 });
  } catch (error) {
    return Response.json({ error: new Error("Server error") }, { status: 500 });
  }
}
