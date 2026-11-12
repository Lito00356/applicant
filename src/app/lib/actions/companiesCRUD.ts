"use server";

import { revalidatePath } from "next/cache";
import { db } from "@/src/app/lib/db";
import { readCompanyForm } from "@/src/app/lib/readCompanyForms";
import { companySchema, statusUpdateSchema } from "@/src/app/lib/schemas";
import { requireUser } from "@/src/app/lib/sessions";
import { CompanyFormState, Status } from "@/src/app/lib/types";

// Het overzicht én het archief tonen bedrijven, dus beide pagina's moeten vers opgehaald worden
function revalidateCompanyPages() {
  revalidatePath("/");
  revalidatePath("/archive");
}

// Zet rejected_at enkel op het moment dat een bedrijf náár "rejected" gaat.
// In een UPDATE verwijst "status" in de CASE nog naar de óúde waarde:
// was het al rejected (bv. je past enkel de notities aan), dan blijft de bestaande datum staan.
// Bij andere statussen raken we rejected_at niet aan.
function rejectedAtUpdate(newStatus: Status) {
  if (newStatus !== "rejected") return {};

  return {
    rejected_at: db.raw(
      "CASE WHEN status = 'rejected' THEN COALESCE(rejected_at, CURRENT_TIMESTAMP) ELSE CURRENT_TIMESTAMP END",
    ),
  };
}

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
    phone_number: company.phoneNumber,
    application_method: company.applicationMethod,
    is_spontaneous: company.isSpontaneous,
    cons: company.cons,
    rejection_reason: company.rejectionReason,
    rejected_at: company.status === "rejected" ? db.fn.now() : null,
  });

  revalidateCompanyPages();
  return { success: true };
}

export async function updateCompanyStatus(
  companyId: number,
  status: Status,
  rejectionReason?: string,
): Promise<{ success: boolean }> {
  const user = await requireUser();

  const result = statusUpdateSchema.safeParse({ companyId, status, rejectionReason });
  if (!result.success) {
    return { success: false };
  }

  const { rejectionReason: reason } = result.data;

  const updatedRows = await db("companies")
    .where({ id: result.data.companyId, user_id: user.id })
    .update({
      status: result.data.status,
      updated_at: db.fn.now(),
      ...rejectedAtUpdate(result.data.status),
      // Enkel als er een reden meekomt; anders blijft de bestaande reden staan
      ...(reason ? { rejection_reason: reason } : {}),
    });

  if (updatedRows === 0) {
    return { success: false };
  }

  revalidateCompanyPages();
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
    phone_number: company.phoneNumber,
    application_method: company.applicationMethod,
    is_spontaneous: company.isSpontaneous,
    cons: company.cons,
    rejection_reason: company.rejectionReason,
    updated_at: db.fn.now(),
    ...rejectedAtUpdate(company.status),
  });

  if (updatedRows === 0) {
    return { success: false, error: "Company not found", values };
  }

  revalidateCompanyPages();
  return { success: true };
}

export async function deleteCompany(companyId: number): Promise<{ success: boolean }> {
  const user = await requireUser();

  const deletedRows = await db("companies").where({ id: companyId, user_id: user.id }).del();

  if (deletedRows === 0) {
    return { success: false };
  }

  revalidateCompanyPages();
  return { success: true };
}
