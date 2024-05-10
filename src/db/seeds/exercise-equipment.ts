import { DB } from "../db";
import { exerciseEquipment } from "../schema";
import equipments from "./data/exercise-equipments.json";

export async function seedExerciseEquipments(db: DB) {
  await db.insert(exerciseEquipment).values(equipments);
}
