export const STATUSES = ["toContact", "stretch", "pending", "interview", "offer", "rejected"] as const;
export const APPLICATION_METHODS = ["email", "website", "job_platform", "phone", "recruiter"] as const;
export const FOLLOW_UP_METHODS = ["email", "phone"] as const;
export const FOLLOW_UP_OUTCOMES = ["no_answer", "replied", "invited"] as const;

export const statusLabels = {
  toContact: "To contact",
  stretch: "Long shot",
  pending: "Pending",
  interview: "Interview",
  offer: "Offer",
  rejected: "Rejected",
} satisfies Record<(typeof STATUSES)[number], string>;

// Achtergrondkleur per status (klassen uit globals.css).
export const statusColors = {
  toContact: "bg-to-contact",
  stretch: "bg-long-shot",
  pending: "bg-pending",
  interview: "bg-interview",
  offer: "bg-offer",
  rejected: "bg-rejected",
} satisfies Record<(typeof STATUSES)[number], string>;

// Kolommen van de tabel: koppen en rijen gebruiken hetzelfde raster.
export const ROW_GRID = "grid grid-cols-5 items-center gap-4";

// De filtertabs boven de tabel. "all" toont alles, de rest filtert op status.
export const FILTERS = [
  { value: "toContact", label: "To contact", color: "bg-to-contact" },
  { value: "stretch", label: "Long shot", color: "bg-long-shot" },
  { value: "pending", label: "Pending", color: "bg-pending" },
  { value: "rejected", label: "Rejected by", color: "bg-rejected" },
  { value: "all", label: "All", color: "bg-all" },
] as const;

export const applicationMethodLabels = {
  email: "Email",
  website: "Company website",
  job_platform: "Job platform",
  phone: "Phone",
  recruiter: "Recruiter",
} satisfies Record<(typeof APPLICATION_METHODS)[number], string>;

export const followUpMethodLabels = {
  email: "Email",
  phone: "Phone",
} satisfies Record<(typeof FOLLOW_UP_METHODS)[number], string>;

export const followUpOutcomeLabels = {
  no_answer: "No answer",
  replied: "Replied",
  invited: "Invited",
} satisfies Record<(typeof FOLLOW_UP_OUTCOMES)[number], string>;
