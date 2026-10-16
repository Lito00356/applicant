import type { Knex } from "knex";

const config: Knex.Config = {
  client: "better-sqlite3",
  connection: {
    filename: "./db/applicant.sqlite3",
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
