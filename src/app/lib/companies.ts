import { db } from "@/src/app/lib/db";
import { Company } from "@/src/app/lib/types";

export async function getCompanies(): Promise<Company[]> {
  const companies = await db("companies")
    .select("id", "name", "role", "location", "status", "job_url as jobUrl", "created_at as added", "updated_at as updated")
    .orderBy("created_at");

  return companies.map((company) => ({
    id: company.id,
    name: company.name,
    role: company.role,
    location: company.location,
    status: company.status,
    jobUrl: company.jobUrl,
    createdAt: company.added,
    updatedAt: company.updated,
  }));
}
