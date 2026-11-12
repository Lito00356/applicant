import type { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
  await knex.schema.alterTable("companies", (table) => {
    table.timestamp("rejected_at").nullable();
  });

  // Bestaande rejected bedrijven: updated_at is de beste schatting die we hebben
  await knex("companies").where({ status: "rejected" }).update({ rejected_at: knex.ref("updated_at") });
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.alterTable("companies", (table) => {
    table.dropColumn("rejected_at");
  });
}
