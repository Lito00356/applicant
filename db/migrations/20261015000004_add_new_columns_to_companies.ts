import type { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
  await knex.schema.alterTable("companies", (table) => {
    table.enum("application_method", ["email", "website", "job_platform", "phone", "recruiter"]).nullable();
    table.boolean("is_spontaneous").defaultTo(false).notNullable();
    table.enum("follow_up_method", ["email", "phone"]).nullable();
    table.enum("follow_up_outcome", ["no_answer", "replied", "invited"]).nullable();
    table.timestamp("follow_up_at").nullable();
    table.text("follow_up_note").nullable();
    table.text("rejection_reason").nullable();
    table.text("cons").nullable();
    table.string("website_url").nullable();
  });
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.alterTable("companies", (table) => {
    table.dropColumns(
      "application_method",
      "is_spontaneous",
      "follow_up_method",
      "follow_up_outcome",
      "follow_up_at",
      "follow_up_note",
      "rejection_reason",
      "cons",
      "website_url",
    );
  });
}
