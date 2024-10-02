import { db } from "./database";
import { migrate } from "drizzle-orm/node-postgres/migrator";

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
