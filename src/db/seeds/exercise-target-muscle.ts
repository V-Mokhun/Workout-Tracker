import { DB } from "../database";
import { exerciseTargetMuscle } from "../schema";
import muscleGroups from "./data/exercise-muscle-groups.json";

export async function seedExerciseTargetMuscles(db: DB) {
  await db.insert(exerciseTargetMuscle).values(muscleGroups);
}
