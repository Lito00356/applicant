import type { APPLICATION_METHODS, FOLLOW_UP_METHODS, FOLLOW_UP_OUTCOMES, STATUSES } from "@/src/app/lib/constants";

export type Status = (typeof STATUSES)[number];
export type ApplicationMethod = (typeof APPLICATION_METHODS)[number];
export type FollowUpMethod = (typeof FOLLOW_UP_METHODS)[number];
export type FollowUpOutcome = (typeof FOLLOW_UP_OUTCOMES)[number];

export type Company = {
  id: number;
  name: string;
  role: string;
  location: string | null;
  status: Status;
  jobUrl: string | null;
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

export type CompanyFormValues = {
  name: string;
  role: string;
  location: string;
  status: string;
  jobUrl: string;
  websiteUrl: string;
  applicationMethod: string;
  isSpontaneous: boolean;
  cons: string;
  rejectionReason: string;
};

export type CompanyFormState = {
  error: string;
  values: CompanyFormValues;
} | null;

export type CurrentUser = {
  id: number;
  name: string;
  email: string;
};
