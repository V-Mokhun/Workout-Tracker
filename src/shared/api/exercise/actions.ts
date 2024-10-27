"use server";

import { userExercise } from "@/db";
import { db } from "@/db/database";
import { getSession } from "@auth0/nextjs-auth0";
import { and, eq } from "drizzle-orm";

export async function toggleExerciseFavorite(exerciseId: number) {
  const session = await getSession();
  const userId = session?.user?.sub;
  if (!userId) {
    return {
      success: false,
      error: "Unauthorized",
    };
  }

  try {
    const existingRecord = await db.query.userExercise.findFirst({
      where: and(
        eq(userExercise.userId, userId),
        eq(userExercise.exerciseId, exerciseId)
      ),
    });

    if (!existingRecord) {
      await db.insert(userExercise).values({
        userId,
        exerciseId,
        isFavorite: true,
      });

      return {
        success: true,
        isFavorite: true,
      };
    }

    await db
      .update(userExercise)
      .set({ isFavorite: !existingRecord.isFavorite })
      .where(
        and(
          eq(userExercise.userId, userId),
          eq(userExercise.exerciseId, exerciseId)
        )
      );

    return {
      success: true,
      isFavorite: !existingRecord.isFavorite,
    };
  } catch (error) {
    return {
      success: false,
      error: "Failed to toggle exercise favorite",
    };
  }
}
