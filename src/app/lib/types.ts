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
  filter: string;
  isActive: boolean;
  index: number;
};
