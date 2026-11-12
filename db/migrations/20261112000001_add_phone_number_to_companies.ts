import type { Knex } from "knex";

// Tekst i.p.v. getal: anders verdwijnen een voorloopnul of "+32", en spaties/streepjes mogen blijven staan.
export async function up(knex: Knex): Promise<void> {
  await knex.schema.alterTable("companies", (table) => {
    table.string("phone_number").nullable();
  });
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.alterTable("companies", (table) => {
    table.dropColumn("phone_number");
  });
}
