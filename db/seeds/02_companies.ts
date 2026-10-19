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
      application_method: "email",
      is_spontaneous: false,
      follow_up_method: "phone",
      follow_up_at: "2026-10-10 14:00:00",
      follow_up_note: null,
      follow_up_outcome: "replied",
      rejection_reason: "Net mensen aangenomen",
      cons: "Net mensen aangenomen",
      website_url: "https://flux.be",
    },
    {
      user_id: 1,
      name: "Nanopixel",
      role: "ThreeJS Developer",
      location: "Roeselare",
      status: "rejected",
      job_url: "https://nannanopixel3d.com",
      application_method: "email",
      is_spontaneous: false,
      follow_up_method: "phone",
      follow_up_at: "2026-10-10 14:00:00",
      follow_up_note: "replied",
      rejection_reason: "Net mensen aangenomen",
      cons: "Vacature vergeten offline te zetten",
      website_url: "https://nannanopixel3d.com",
    },
    {
      user_id: 1,
      name: "Renson",
      role: "Front-end developer",
      location: "Waregem",
      status: "rejected",
      job_url: "https://renson.net",
      application_method: "email",
      is_spontaneous: false,
      follow_up_method: "phone",
      follow_up_at: "2026-10-10 14:00:00",
      follow_up_note: "no_answer",
      rejection_reason: null,
      cons: null,
      website_url: "https://renson.net",
    },
  ]);
}
