import { Table, getTableName, sql } from "drizzle-orm";
import { db } from "./db";
import {
  exercise,
  user,
  workout,
  exerciseTargetMuscle,
  exerciseType,
  userExercise,
  workoutExercise,
  workoutExerciseSet,
  exerciseEquipment,
} from "./schema";

async function resetTable(table: Table) {
  return db.execute(
    sql.raw(`TRUNCATE TABLE ${getTableName(table)} RESTART IDENTITY CASCADE`)
  );
}

const main = async () => {
  try {
    console.log("Seeding db...");

    for (const table of [
      workoutExerciseSet,
      workoutExercise,
      userExercise,
      workout,
      exercise,
      user,
      exerciseType,
      exerciseTargetMuscle,
      exerciseEquipment,
    ]) {
      await resetTable(table);
    }

    console.log("Seeding complete!");
  } catch (error) {
    console.error("Error seeding db: ", error);
  }
};

main();
