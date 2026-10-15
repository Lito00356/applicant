export type Status = "toContact" | "stretch" | "pending" | "interview" | "offer" | "rejected";

export type Company = {
  id: number;
  name: string;
  role: string;
  location: string;
  status: Status;
  jobUrl: string;
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
