import { db } from "./db";
import { exercise, user, workout } from "./schema";

const main = async () => {
  try {
    console.log("Seeding db...");
    await db.delete(user);
    await db.delete(workout);
    await db.delete(exercise);

    console.log("Seeding complete!");
  } catch (error) {
    console.error("Error seeding db: ", error);
  }
};

main();
