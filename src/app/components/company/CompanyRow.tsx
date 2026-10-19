"use client";

import { statusLabels } from "@/src/app/lib/constants";
import { CompanyRowProps, Status } from "@/src/app/lib/types";
import { useState } from "react";

const CompanyRow = ({ company, onOpen }: CompanyRowProps) => {
  const [status, setStatus] = useState<Status>(company.status);

  return (
    <>
      <button
        type="button"
        onClick={() => onOpen(company)}
        className="col-span-3 grid cursor-pointer grid-cols-subgrid items-center text-left"
      >
        <span className="font-semibold text-slate-900">{company.name}</span>
        <span className="text-slate-600">{company.role}</span>
        <span className="text-slate-600">{company.location ?? "–"}</span>
      </button>
      <select
        value={status}
        onChange={(e) => setStatus(e.target.value as Status)}
        className="inline-flex rounded-full bg-slate-100 px-3 py-1 text-xs font-medium text-slate-700"
      >
        {Object.entries(statusLabels).map(([value, label]) => (
          <option key={value} value={value}>
            {label}
          </option>
        ))}
      </select>
      {company.jobUrl ? (
        <a
          href={company.jobUrl}
          target="_blank"
          rel="noreferrer"
          className="truncate text-slate-500 underline decoration-slate-300 underline-offset-4 transition-colors hover:text-slate-950"
        >
          {company.jobUrl}
        </a>
      ) : (
        <span className="text-slate-400">–</span>
      )}
    </>
  );
};

export default CompanyRow;
