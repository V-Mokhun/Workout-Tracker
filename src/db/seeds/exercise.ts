import { eq } from "drizzle-orm";
import { DB } from "../database";
import {
  exercise,
  exerciseEquipment,
  ExerciseExperience,
  exerciseTargetMuscle,
  exerciseType,
} from "../schema";
import exercises from "./data/exercises.json";

export async function seedExercises(db: DB) {
  const insertable = await Promise.all(
    exercises.map(async (ex) => {
      const { type, targetMuscle, equipment, ...restExercise } = ex;

      const foundType = await db.query.exerciseType.findFirst({
        where: eq(exerciseType.name, type),
      });
      if (!foundType) {
        throw new Error(`Type not found: ${type}`);
      }

      const foundTargetMuscle = await db.query.exerciseTargetMuscle.findFirst({
        where: eq(exerciseTargetMuscle.name, targetMuscle),
      });
      if (!foundTargetMuscle) {
        throw new Error(`Target muscle not found: ${targetMuscle}`);
      }

      const foundEquipment = await db.query.exerciseEquipment.findFirst({
        where: eq(exerciseEquipment.name, equipment),
      });
      if (!foundEquipment) {
        throw new Error(`Equipment not found: ${equipment}`);
      }

      return {
        ...restExercise,
        typeSlug: foundType.slug,
        targetMuscleSlug: foundTargetMuscle.slug,
        equipmentSlug: foundEquipment.slug,
        experienceLevel: ex.experienceLevel as ExerciseExperience,
      };
    })
  );

  await db.insert(exercise).values(insertable);
}
