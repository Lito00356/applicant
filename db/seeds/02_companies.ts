import type { Knex } from "knex";

export async function seed(knex: Knex): Promise<void> {
  await knex("companies").del();

  await knex("companies").insert([
    {
      user_id: 1,
      name: "Flux",
      role: "ThreeJS Developer",
      location: "Antwerpen",
      status: "rejected",
      job_url: "https://flux.be",
    },
    {
      user_id: 1,
      name: "Nanopixel",
      role: "ThreeJS Developer",
      location: "Roeselare",
      status: "rejected",
      job_url: "https://nannanopixel3d.com",
    },
    {
      user_id: 1,
      name: "Renson",
      role: "Front-end developer",
      location: "Waregem",
      status: "pending",
      job_url: "https://renson.net",
    },
  ]);
}
