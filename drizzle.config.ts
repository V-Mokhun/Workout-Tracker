import type { Config } from "drizzle-kit";

export default {
  schema: "./src/db/schema",
  out: "./src/db/migrations",
  dialect: "postgresql",
  dbCredentials: {
    url: process.env.DB_URL!,
  },
} satisfies Config;
