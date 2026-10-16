import type { Knex } from "knex";

export async function seed(knex: Knex): Promise<void> {
  await knex("users").del();

  await knex("users").insert([
    {
      id: 1,
      name: "Tomasz",
      email: "tomasz@gmail.com",
      password_hash: "geen-hash",
    },
    {
      id: 2,
      name: "saartje",
      email: "saartje@gmail.com",
      password_hash: "geen-hash",
    },
  ]);
}
