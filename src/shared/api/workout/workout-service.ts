import { workout } from "@/db";
import { db } from "@/db/database";
import { dateWithoutTimezone } from "@/shared/lib";
import { endOfMonth, startOfMonth } from "date-fns";
import { and, eq, gte, lte } from "drizzle-orm";

class WorkoutService {
  async getMonthlyWorkouts(userId: string) {
    const workouts = await db.query.workout.findMany({
      where: and(
        eq(workout.userId, userId),
        gte(workout.date, dateWithoutTimezone(startOfMonth(new Date()))),
        lte(workout.date, dateWithoutTimezone(endOfMonth(new Date())))
      ),
    });

    return workouts;
  }
}

export const workoutService = new WorkoutService();
