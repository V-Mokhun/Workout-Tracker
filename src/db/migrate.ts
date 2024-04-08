import { db } from "./db";
import { migrate } from "drizzle-orm/neon-http/migrator";

const main = async () => {
  try {
    await migrate(db, {
      migrationsFolder: "src/db/migrations",
    });
    console.log("Migration complete");
  } catch (error) {
    console.error("Error running migration: ", error);
  }
};

main();
