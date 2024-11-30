import { customExercise, exercise, userExercise } from "@/db";
import { db } from "@/db/database";
import {
  DEFAULT_EXERCISE_LIMIT,
  DEFAULT_USER_EXERCISE_LIMIT,
} from "@/shared/consts";
import { ExerciseCardType } from "@/widgets";
import { getSession } from "@auth0/nextjs-auth0";
import { and, count, eq, ilike } from "drizzle-orm";
import { NextRequest } from "next/server";

export async function GET(req: NextRequest) {
  try {
    const session = await getSession();
    if (!session) {
      return new Response("Unauthorized", { status: 401 });
    }

    const userId = session.user.sub;

    const searchParams = req.nextUrl.searchParams;
    const page = parseInt(searchParams.get("page") ?? "1", 10);
    const query = searchParams.get("query");
    const muscleGroup = searchParams.get("muscleGroup");
    const equipment = searchParams.get("equipment");
    const type = searchParams.get("type");

    const userExercisesWhere = [
      eq(userExercise.userId, userId),
      eq(userExercise.isFavorite, true),
    ];
    const customExercisesWhere = [eq(customExercise.userId, userId)];

    //TODO: rewrite userExercises to select instead of query
    if (query) {
      // userExercisesWhere.push(ilike(userExercise, `%${query}%`));
      customExercisesWhere.push(ilike(customExercise.name, `%${query}%`));
    }

    if (muscleGroup) {
      // userExercisesWhere.push(eq(exercise.targetMuscleSlug, muscleGroup));
      customExercisesWhere.push(
        eq(customExercise.targetMuscleSlug, muscleGroup)
      );
    }

    if (equipment) {
      // userExercisesWhere.push(eq(exercise.equipmentSlug, equipment));
      customExercisesWhere.push(eq(customExercise.equipmentSlug, equipment));
    }

    const [userExercises, customExercises] = await Promise.all([
      db.query.userExercise.findMany({
        where: and(...userExercisesWhere),
        with: {
          exercise: {
            columns: {
              id: true,
              slug: true,
              name: true,
              image: true,
            },
            with: {
              targetMuscle: {
                columns: {
                  name: true,
                },
              },
              equipment: {
                columns: {
                  name: true,
                },
              },
              type: {
                columns: {
                  name: true,
                },
              },
            },
          },
        },
        limit: DEFAULT_USER_EXERCISE_LIMIT,
        offset: (page - 1) * DEFAULT_USER_EXERCISE_LIMIT,
      }),
      db.query.customExercise.findMany({
        where: and(...customExercisesWhere),
        columns: {
          id: true,
          slug: true,
          name: true,
          image: true,
        },
        with: {
          targetMuscle: {
            columns: {
              name: true,
            },
          },
          equipment: {
            columns: {
              name: true,
            },
          },
          type: {
            columns: {
              name: true,
            },
          },
        },
        limit: DEFAULT_USER_EXERCISE_LIMIT,
        offset: (page - 1) * DEFAULT_USER_EXERCISE_LIMIT,
      }),
    ]);

    const [[totalUserExercises], [totalCustomExercises]] = await Promise.all([
      db
        .select({ count: count() })
        .from(userExercise)
        .where(and(...userExercisesWhere)),
      db
        .select({ count: count() })
        .from(customExercise)
        .where(and(...customExercisesWhere)),
    ]);

    // TODO: logic is wrong, this way we skip on user exercises in favor of custom ones. When limit is 1, it returns 1 custom exercise, then go to page 2 and returns second user exercise. First one is lost.
    let totalPages = Math.ceil(
      (totalUserExercises.count + totalCustomExercises.count) /
        DEFAULT_USER_EXERCISE_LIMIT
    );
    const exercises: ExerciseCardType[] = [];

    if (type === "favorite") {
      totalPages = Math.ceil(
        totalUserExercises.count / DEFAULT_USER_EXERCISE_LIMIT
      );

      exercises.push(
        ...userExercises.map((ue) => ({
          ...ue.exercise,
          userExercise: {
            isFavorite: ue.isFavorite,
          },
        }))
      );
    } else if (type === "custom") {
      totalPages = Math.ceil(
        totalCustomExercises.count / DEFAULT_USER_EXERCISE_LIMIT
      );

      exercises.push(
        ...customExercises.map((ce) => ({
          ...ce,
          isCustom: true,
        }))
      );
    } else {
      exercises.push(
        ...customExercises.map((ce) => ({
          ...ce,
          isCustom: true,
        })),
        ...userExercises.map((ue) => ({
          ...ue.exercise,
          userExercise: {
            isFavorite: ue.isFavorite,
          },
        }))
      );
    }

    return Response.json(
      {
        data: {
          exercises: exercises.slice(0, DEFAULT_USER_EXERCISE_LIMIT),
          totalPages,
        },
        message: "Success",
      },
      { status: 200 }
    );
  } catch (error) {
    return Response.json({ error: new Error("Server error") }, { status: 500 });
  }
}
