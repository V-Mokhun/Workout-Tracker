import { Workout, workout } from "@/db";
import { db } from "@/db/database";
import { dateWithoutTimezone } from "@/shared/lib";
import { endOfMonth, startOfMonth } from "date-fns";
import { and, eq, gte, lte } from "drizzle-orm";

class WorkoutService {
  async getMonthlyWorkouts(
    userId: string,
    date?: { month: number; year: number }
  ): Promise<Workout[]> {
    const startDate = date
      ? startOfMonth(new Date(date.year, date.month))
      : startOfMonth(new Date());
    const endDate = date
      ? endOfMonth(new Date(date.year, date.month))
      : endOfMonth(new Date());

    const workouts = await db.query.workout.findMany({
      where: and(
        eq(workout.userId, userId),
        gte(workout.date, dateWithoutTimezone(startDate)),
        lte(workout.date, dateWithoutTimezone(endDate))
      ),
    });

    return workouts;
  }
}

export const workoutService = new WorkoutService();
