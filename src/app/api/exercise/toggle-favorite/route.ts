import { userExercise } from "@/db";
import { db } from "@/db/database";
import { getSession } from "@auth0/nextjs-auth0";
import { and, eq } from "drizzle-orm";

export async function PATCH(req: Request) {
  const { exerciseId } = await req.json();

  if (!exerciseId) {
    return Response.json({ error: "Exercise ID is required" }, { status: 400 });
  }

  const session = await getSession();
  const userId = session?.user?.sub;
  if (!userId) {
    return Response.json({ error: "Unauthorized" }, { status: 401 });
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

      return Response.json({
        data: true,
        message: "Exercise added to favorites",
      });
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

    return Response.json({
      data: !existingRecord.isFavorite,
      message: "Exercise added to favorites",
    });
  } catch (error) {
    return Response.json(
      { error: "Failed to toggle exercise favorite" },
      { status: 500 }
    );
  }
}
