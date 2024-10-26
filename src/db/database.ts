import "dotenv/config";
import { drizzle } from "drizzle-orm/node-postgres";
import { Pool } from "pg";
import * as schema from "./schema";

const sql = new Pool({
  connectionString: process.env.DB_URL!,
});

export const db = drizzle({ client: sql, schema });

export type DB = typeof db;
