import {
  customExercise,
  exercise,
  exerciseEquipment,
  exerciseTargetMuscle,
  exerciseType,
  userExercise,
} from "@/db";
import { db } from "@/db/database";
import { DEFAULT_USER_EXERCISE_LIMIT } from "@/shared/consts";
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
    const userExercisesJoinWhere = [eq(userExercise.exerciseId, exercise.id)];
    const customExercisesWhere = [eq(customExercise.userId, userId)];

    if (query) {
      userExercisesJoinWhere.push(ilike(exercise.name, `%${query}%`));
      customExercisesWhere.push(ilike(customExercise.name, `%${query}%`));
    }

    if (muscleGroup) {
      userExercisesJoinWhere.push(eq(exercise.targetMuscleSlug, muscleGroup));
      customExercisesWhere.push(
        eq(customExercise.targetMuscleSlug, muscleGroup)
      );
    }

    if (equipment) {
      userExercisesJoinWhere.push(eq(exercise.equipmentSlug, equipment));
      customExercisesWhere.push(eq(customExercise.equipmentSlug, equipment));
    }

    if (type === "favorite") {
      const [userExercises, [totalUserExercises]] = await Promise.all([
        db
          .select({
            id: exercise.id,
            slug: exercise.slug,
            name: exercise.name,
            image: exercise.image,
            targetMuscle: {
              name: exerciseTargetMuscle.name,
            },
            equipment: {
              name: exerciseEquipment.name,
            },
            type: {
              name: exerciseType.name,
            },
            userExercise: {
              isFavorite: userExercise.isFavorite,
            },
          })
          .from(userExercise)
          .where(and(...userExercisesWhere))
          .innerJoin(exercise, and(...userExercisesJoinWhere))
          .innerJoin(
            exerciseTargetMuscle,
            eq(exercise.targetMuscleSlug, exerciseTargetMuscle.slug)
          )
          .innerJoin(
            exerciseEquipment,
            eq(exercise.equipmentSlug, exerciseEquipment.slug)
          )
          .innerJoin(exerciseType, eq(exercise.typeSlug, exerciseType.slug))
          .limit(DEFAULT_USER_EXERCISE_LIMIT)
          .offset((page - 1) * DEFAULT_USER_EXERCISE_LIMIT),
        db
          .select({ count: count() })
          .from(userExercise)
          .where(and(...userExercisesWhere))
          .innerJoin(exercise, and(...userExercisesJoinWhere)),
      ]);

      const totalPages = Math.ceil(
        totalUserExercises.count / DEFAULT_USER_EXERCISE_LIMIT
      );

      return Response.json({
        data: { exercises: userExercises, totalPages },
        message: "Success",
      });
    } else if (type === "custom") {
      const [customExercises, [totalCustomExercises]] = await Promise.all([
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
        db
          .select({ count: count() })
          .from(customExercise)
          .where(and(...customExercisesWhere)),
      ]);

      const totalPages = Math.ceil(
        totalCustomExercises.count / DEFAULT_USER_EXERCISE_LIMIT
      );

      return Response.json({
        data: {
          exercises: customExercises.map((ce) => ({
            ...ce,
            isCustom: true,
          })),
          totalPages,
        },
        message: "Success",
      });
    } else {
      const [customExercises, [totalCustomExercises]] = await Promise.all([
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
        db
          .select({ count: count() })
          .from(customExercise)
          .where(and(...customExercisesWhere)),
      ]);

      const pageToStartShowingUserExercises =
        Math.floor(totalCustomExercises.count / DEFAULT_USER_EXERCISE_LIMIT) +
        1;
      const userExercisesLimit = Math.min(
        DEFAULT_USER_EXERCISE_LIMIT,
        Math.max(
          0,
          page * DEFAULT_USER_EXERCISE_LIMIT - totalCustomExercises.count
        )
      );
      const userExercisesFirstPageOffset =
        (page * DEFAULT_USER_EXERCISE_LIMIT - totalCustomExercises.count) %
        DEFAULT_USER_EXERCISE_LIMIT;
      let userExercisesOffset =
        userExercisesFirstPageOffset +
        (page - pageToStartShowingUserExercises - 1) *
          DEFAULT_USER_EXERCISE_LIMIT;
      if (userExercisesOffset < 0) {
        userExercisesOffset = 0;
      }

      const [userExercises, [totalUserExercises]] = await Promise.all([
        db
          .select({
            id: exercise.id,
            slug: exercise.slug,
            name: exercise.name,
            image: exercise.image,
            targetMuscle: {
              name: exerciseTargetMuscle.name,
            },
            equipment: {
              name: exerciseEquipment.name,
            },
            type: {
              name: exerciseType.name,
            },
            userExercise: {
              isFavorite: userExercise.isFavorite,
            },
          })
          .from(userExercise)
          .where(and(...userExercisesWhere))
          .innerJoin(exercise, and(...userExercisesJoinWhere))
          .innerJoin(
            exerciseTargetMuscle,
            eq(exercise.targetMuscleSlug, exerciseTargetMuscle.slug)
          )
          .innerJoin(
            exerciseEquipment,
            eq(exercise.equipmentSlug, exerciseEquipment.slug)
          )
          .innerJoin(exerciseType, eq(exercise.typeSlug, exerciseType.slug))
          .limit(userExercisesLimit)
          .offset(userExercisesOffset),
        db
          .select({ count: count() })
          .from(userExercise)
          .where(and(...userExercisesWhere))
          .innerJoin(exercise, and(...userExercisesJoinWhere)),
      ]);

      const exercises = [
        ...customExercises.map((ce) => ({ ...ce, isCustom: true })),
        ...userExercises,
      ];

      const totalPages = Math.ceil(
        (totalCustomExercises.count + totalUserExercises.count) /
          DEFAULT_USER_EXERCISE_LIMIT
      );

      return Response.json({
        data: { exercises, totalPages },
        message: "Success",
      });
    }
  } catch (error) {
    console.error(error);
    return Response.json({ error: new Error("Server error") }, { status: 500 });
  }
}
