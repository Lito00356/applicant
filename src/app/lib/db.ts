import knex, { type Knex } from "knex";
import config from "@/knexfile";

// Hergebruik één verbinding, ook wanneer de dev-server modules herlaadt.
const globalForDb = globalThis as unknown as { db?: Knex };

export const db = globalForDb.db ?? knex(config);

if (process.env.NODE_ENV !== "production") {
  globalForDb.db = db;
}
