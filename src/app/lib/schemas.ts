import { z } from "zod";
import { APPLICATION_METHODS, STATUSES } from "@/src/app/lib/constants";

const optional = <T extends z.ZodType>(schema: T) =>
  z.preprocess((value) => (value === "" ? null : value), schema.nullable());

const httpUrl = (message: string) => z.url({ protocol: /^https?$/, error: message });

export const companySchema = z.object({
  name: z.string().trim().min(1, { error: "Name is required." }),
  role: z.string().trim().min(1, { error: "Role is required." }),
  location: z.string().trim().min(1, { error: "Location is required." }),
  status: z.enum(STATUSES, { error: "Choose a valid status." }),
  jobUrl: httpUrl("The job URL must be a valid link."),
  websiteUrl: optional(httpUrl("The website URL must be a valid http(s) link.")),
  applicationMethod: optional(z.enum(APPLICATION_METHODS, { error: "Choose a valid application method." })),
  isSpontaneous: z.boolean(),
  cons: optional(z.string()),
  rejectionReason: optional(z.string()),
});

export type CompanyInput = z.infer<typeof companySchema>;
