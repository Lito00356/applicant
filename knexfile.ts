import type { Knex } from "knex";

const config: Knex.Config = {
  client: "better-sqlite3",
  connection: {
    // Met DB_FILE kan je een andere database gebruiken (bv. een demo-db voor screenshots)
    filename: process.env.DB_FILE ?? "./db/applicant.sqlite3",
  },
  useNullAsDefault: true,
  pool: {
    afterCreate: (conn: any, done: (err: Error | null, conn: any) => void) => {
      conn.pragma("foreign_keys = ON");
      done(null, conn);
    },
  },
  migrations: {
    directory: "./db/migrations",
    extension: "ts",
  },
  seeds: {
    directory: "./db/seeds",
    extension: "ts",
  },
};

export default config;
