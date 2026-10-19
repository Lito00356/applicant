import type { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
  await knex.schema.alterTable("companies", (table) => {
    table.string("location").nullable().alter();
    table.string("job_url").nullable().alter();
  });
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.alterTable("companies", (table) => {
    table.string("location").notNullable().alter();
    table.string("job_url").notNullable().alter();
  });
}
