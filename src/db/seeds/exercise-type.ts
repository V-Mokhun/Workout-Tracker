import { DB } from "../db";
import { exerciseType } from "../schema";
import types from "./data/exercise-types.json";

export async function seedExerciseTypes(db: DB) {
  await db.insert(exerciseType).values(types);
}
