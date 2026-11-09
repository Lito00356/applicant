import type { Knex } from "knex";

const OLD_CHECK = "in('toContact' , 'stretch' , 'pending' , 'interview' , 'offer' , 'rejected')";
const NEW_CHECK = "in('toContact' , 'stretch' , 'pending' , 'interview' , 'offer' , 'rejected' , 'archived')";

// SQLite kan een CHECK niet aanpassen, en Knex' .alter() laat de oude CHECK gewoon staan.
// Daarom bouwen we de tabel zelf opnieuw op: zelfde definitie, enkel de lijst met statussen verandert.
async function replaceStatusCheck(knex: Knex, from: string, to: string): Promise<void> {
  const { sql } = await knex("sqlite_master").where({ type: "table", name: "companies" }).first("sql");

  if (!sql.includes(from)) {
    throw new Error("The status CHECK of companies does not look like expected, nothing changed.");
  }

  const newSql = sql.replace('CREATE TABLE "companies"', 'CREATE TABLE "companies_new"').replace(from, to);

  await knex.raw(newSql);
  await knex.raw("INSERT INTO companies_new SELECT * FROM companies");
  await knex.schema.dropTable("companies");
  await knex.schema.renameTable("companies_new", "companies");
}

export async function up(knex: Knex): Promise<void> {
  await replaceStatusCheck(knex, OLD_CHECK, NEW_CHECK);
}

export async function down(knex: Knex): Promise<void> {
  // Zonder deze stap faalt de rollback: "archived" past niet meer in de oude CHECK
  await knex("companies").where({ status: "archived" }).update({ status: "toContact" });
  await replaceStatusCheck(knex, NEW_CHECK, OLD_CHECK);
}
