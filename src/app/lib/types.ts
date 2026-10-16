export type Status = "toContact" | "stretch" | "pending" | "interview" | "offer" | "rejected";

export type Company = {
  id: number;
  name: string;
  role: string;
  location: string;
  status: Status;
  jobUrl: string;
  createdAt: string;
  updatedAt: string;
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
