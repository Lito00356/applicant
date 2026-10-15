import type { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
  await knex.schema.createTable("companies", (table) => {
    table.increments("id");
    table.string("name").notNullable();
    table.string("role").notNullable();
    table.string("location").notNullable();
    table
      .enu("status", ["toContact", "stretch", "pending", "interview", "offer", "rejected"])
      .notNullable()
      .defaultTo("toContact");
    table.string("job_url").notNullable();
    table.timestamps(true, true);
  });
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTable("companies");
}
