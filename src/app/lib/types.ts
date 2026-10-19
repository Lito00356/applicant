import type { ReactNode } from "react";
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
  company: Company | null;
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

export type CompanyFormState =
  | { success: true }
  | { success: false; error: string; values: CompanyFormValues }
  | null;

export type CompanyFormProps = {
  onSuccess: () => void;
  onCancel: () => void;
};

export type ModalProps = {
  open: boolean;
  onClose: () => void;
  title: string;
  children: ReactNode;
};

export type CurrentUser = {
  id: number;
  name: string;
  email: string;
};
