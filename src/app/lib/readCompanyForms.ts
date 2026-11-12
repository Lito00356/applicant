import { CompanyFormValues } from "@/src/app/lib/types";

function getText(formData: FormData, field: string): string {
  return String(formData.get(field) ?? "").trim();
}

export function readCompanyForm(formData: FormData): CompanyFormValues {
  return {
    name: getText(formData, "name"),
    role: getText(formData, "role"),
    location: getText(formData, "location"),
    status: getText(formData, "status"),
    jobUrl: getText(formData, "jobUrl"),
    websiteUrl: getText(formData, "websiteUrl"),
    phoneNumber: getText(formData, "phoneNumber"),
    applicationMethod: getText(formData, "applicationMethod"),
    isSpontaneous: formData.get("isSpontaneous") === "on",
    cons: getText(formData, "cons"),
    rejectionReason: getText(formData, "rejectionReason"),
  };
}
