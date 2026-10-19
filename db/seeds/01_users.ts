import type { Knex } from "knex";
import bcrypt from "bcrypt";

export async function seed(knex: Knex): Promise<void> {
  await knex("users").del();

  const passwordHash = await bcrypt.hash("admin", 10);

  await knex("users").insert([
    {
      id: 1,
      name: "Tomasz",
      email: "tomasz@gmail.com",
      password_hash: passwordHash,
    },
  ]);
}
