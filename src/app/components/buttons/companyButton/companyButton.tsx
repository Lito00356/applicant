"use client";

import { CompanyButtonProps, Status } from "@/src/app/lib/types";
import { useState } from "react";

const statusLabels: Record<Status, string> = {
  toContact: "To contact",
  stretch: "Stretch",
  pending: "Pending",
  interview: "Interview",
  offer: "Offer",
  rejected: "Rejected",
};

const CompanyButton = ({ companyProp, onOpen }: CompanyButtonProps) => {
  const [status, setStatus] = useState<Status>(companyProp.status);

  return (
    <>
      <button
        onClick={() => onOpen(companyProp)}
        className="col-span-3 grid cursor-pointer grid-cols-subgrid items-center text-left"
      >
        <span className="font-semibold text-slate-900">{companyProp.name}</span>
        <span className="text-slate-600">{companyProp.role}</span>
        <span className="text-slate-600">{companyProp.location}</span>
      </button>
      <select className="inline-flex rounded-full bg-slate-100 px-3 py-1 text-xs font-medium text-slate-700">
        {Object.entries(statusLabels).map(([status, label]) => (
          <option key={status} value={status} onChange={(e) => setStatus(e.target.value as Status)}>
            {label}
          </option>
        ))}
      </select>
      <a
        href={companyProp.jobUrl}
        target="_blank"
        rel="noreferrer"
        className="truncate text-slate-500 underline decoration-slate-300 underline-offset-4 transition-colors hover:text-slate-950"
      >
        {companyProp.jobUrl}
      </a>
    </>
  );
};

export default CompanyButton;
