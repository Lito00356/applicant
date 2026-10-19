import { db } from "@/src/app/lib/db";
import { requireUser } from "@/src/app/lib/sessions";
import { Company } from "@/src/app/lib/types";

export async function getCompanies(): Promise<Company[]> {
  const user = await requireUser();
  const companies = await db("companies")
    .select(
      "id",
      "name",
      "role",
      "location",
      "status",
      "job_url as jobUrl",
      "created_at as createdAt",
      "updated_at as updatedAt",
      "application_method as applicationMethod",
      "is_spontaneous as isSpontaneous",
      "follow_up_method as followUpMethod",
      "follow_up_outcome as followUpOutcome",
      "follow_up_at as followUpAt",
      "follow_up_note as followUpNote",
      "rejection_reason as rejectionReason",
      "cons",
      "website_url as websiteUrl",
    )
    .where("user_id", user.id)
    .orderBy("created_at");

  return companies.map((company) => ({
    ...company,
    isSpontaneous: company.isSpontaneous === 1,
  }));
}
