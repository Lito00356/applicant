export const STATUSES = ["toContact", "stretch", "pending", "interview", "offer", "rejected"] as const;
export const APPLICATION_METHODS = ["email", "website", "job_platform", "phone", "recruiter"] as const;
export const FOLLOW_UP_METHODS = ["email", "phone"] as const;
export const FOLLOW_UP_OUTCOMES = ["no_answer", "replied", "invited"] as const;

export const statusLabels = {
  toContact: "To contact",
  stretch: "Stretch",
  pending: "Pending",
  interview: "Interview",
  offer: "Offer",
  rejected: "Rejected",
} satisfies Record<(typeof STATUSES)[number], string>;

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
