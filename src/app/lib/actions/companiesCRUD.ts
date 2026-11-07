"use server";

import { revalidatePath } from "next/cache";
import { db } from "@/src/app/lib/db";
import { readCompanyForm } from "@/src/app/lib/readCompanyForms";
import { companySchema, statusUpdateSchema } from "@/src/app/lib/schemas";
import { requireUser } from "@/src/app/lib/sessions";
import { CompanyFormState, Status } from "@/src/app/lib/types";

export async function createCompany(_prevState: CompanyFormState, formData: FormData): Promise<CompanyFormState> {
  const user = await requireUser();

  const values = readCompanyForm(formData);

  const result = companySchema.safeParse(values);
  if (!result.success) {
    return { success: false, error: result.error.issues[0].message, values };
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
  return { success: true };
}

export async function updateCompanyStatus(companyId: number, status: Status): Promise<{ success: boolean }> {
  const user = await requireUser();

  const result = statusUpdateSchema.safeParse({ companyId, status });
  if (!result.success) {
    return { success: false };
  }

  const updatedRows = await db("companies").where({ id: result.data.companyId, user_id: user.id }).update({
    status: result.data.status,
    updated_at: db.fn.now(),
  });

  if (updatedRows === 0) {
    return { success: false };
  }

  revalidatePath("/");
  return { success: true };
}

export async function updateCompanyDetails(
  companyId: number,
  _prevState: CompanyFormState,
  formData: FormData,
): Promise<CompanyFormState> {
  const user = await requireUser();

  const values = readCompanyForm(formData);

  const result = companySchema.safeParse(values);
  if (!result.success) {
    return { success: false, error: result.error.issues[0].message, values };
  }

  const company = result.data;

  const updatedRows = await db("companies").where({ id: companyId, user_id: user.id }).update({
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
    updated_at: db.fn.now(),
  });

  if (updatedRows === 0) {
    return { success: false, error: "Company not found", values };
  }

  revalidatePath("/");
  return { success: true };
}

export async function deleteCompany(companyId: number): Promise<{ success: boolean }> {
  const user = await requireUser();

  const deletedRows = await db("companies").where({ id: companyId, user_id: user.id }).del();

  if (deletedRows === 0) {
    return { success: false };
  }

  revalidatePath("/");
  return { success: true };
}
