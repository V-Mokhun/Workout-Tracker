import { Table, getTableName, sql } from "drizzle-orm";
import { db } from "./database";
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
import {
  seedExerciseEquipments,
  seedExerciseTargetMuscles,
  seedExerciseTypes,
  seedExercises,
} from "./seeds";

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

    await seedExerciseEquipments(db);
    await seedExerciseTargetMuscles(db);
    await seedExerciseTypes(db);
    await seedExercises(db);
    //TODO seed workouts and users

    console.log("Seeding complete!");
  } catch (error) {
    console.error("Error seeding db: ", error);
  }
};

main();
