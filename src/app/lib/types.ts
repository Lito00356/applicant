export type Status = "toContact" | "stretch" | "pending" | "interview" | "offer" | "rejected";

export const APPLICATION_METHODS = ["email", "website", "job_platform", "phone", "recruiter"] as const;
export type ApplicationMethod = (typeof APPLICATION_METHODS)[number];
export type FollowUpMethod = "email" | "phone";
export type FollowUpOutcome = "no_answer" | "replied" | "invited";

export type Company = {
  id: number;
  name: string;
  role: string;
  location: string;
  status: Status;
  jobUrl: string;
  createdAt: string;
  updatedAt: string;
  applicationMethod: ApplicationMethod | null;
  isSpontaneous: boolean;
  followUpMethod: FollowUpMethod | null;
  followUpOutcome: FollowUpOutcome | null;
  followUpAt: string | null;
  followUpNote: string | null;
  rejectionReason: string | null;
  cons: string | null;
  websiteUrl: string | null;
};

export type FilterButtonProps = {
  label: string;
  isActive: boolean;
};

export type CompanyRowProps = {
  company: Company;
  onOpen: (company: Company) => void;
};

export type CompanyDetailsModalProps = {
  onClose: () => void;
};

export type CompanyListProps = {
  companies: Company[];
};

export type RegisterState = {
  error: string;
  name: string;
  email: string;
} | null;

export type LoginState = {
  error: string;
  email: string;
} | null;

export type CurrentUser = {
  id: number;
  name: string;
  email: string;
};
