"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { db } from "@/src/app/lib/db";
import { companySchema } from "@/src/app/lib/schemas";
import { requireUser } from "@/src/app/lib/sessions";
import { CompanyFormState, CompanyFormValues } from "@/src/app/lib/types";

function getText(formData: FormData, field: string): string {
  return String(formData.get(field) ?? "").trim();
}

// ---------- Create ----------

export async function createCompany(_prevState: CompanyFormState, formData: FormData): Promise<CompanyFormState> {
  const user = await requireUser();

  const values: CompanyFormValues = {
    name: getText(formData, "name"),
    role: getText(formData, "role"),
    location: getText(formData, "location"),
    status: getText(formData, "status"),
    jobUrl: getText(formData, "jobUrl"),
    websiteUrl: getText(formData, "websiteUrl"),
    applicationMethod: getText(formData, "applicationMethod"),
    isSpontaneous: formData.get("isSpontaneous") === "on",
    cons: getText(formData, "cons"),
    rejectionReason: getText(formData, "rejectionReason"),
  };

  const result = companySchema.safeParse(values);
  if (!result.success) {
    return { error: result.error.issues[0].message, values };
  }

  const company = result.data;

  await db("companies").insert({
    user_id: user.id,
    name: company.name,
    role: company.role,
    location: company.location,
    status: company.status,
    job_url: company.jobUrl,
    website_url: company.websiteUrl,
    application_method: company.applicationMethod,
    is_spontaneous: company.isSpontaneous,
    cons: company.cons,
    rejection_reason: company.rejectionReason,
  });

  revalidatePath("/");
  redirect("/");
}
