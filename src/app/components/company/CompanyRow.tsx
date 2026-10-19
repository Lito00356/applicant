"use client";

import { STATUSES, statusColors, statusLabels } from "@/src/app/lib/constants";
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
        <span className="truncate">{company.name}</span>
        <span className="truncate">{company.role}</span>
        <span className="truncate">{company.location ?? "–"}</span>
      </button>
      <div className="relative w-36">
        <select
          value={status}
          onChange={(e) => setStatus(e.target.value as Status)}
          aria-label={`Status of ${company.name}`}
          className={`${statusColors[status]} w-full cursor-pointer appearance-none rounded-md py-0.5 pl-1.5 pr-6 text-xs text-slate-950`}
        >
          {STATUSES.map((value) => (
            <option key={value} value={value} className="bg-white">
              {statusLabels[value]}
            </option>
          ))}
        </select>
        {/* Eigen pijltje, omdat appearance-none het standaardpijltje verbergt */}
        <svg
          aria-hidden="true"
          viewBox="0 0 20 20"
          className="pointer-events-none absolute right-1.5 top-1/2 size-3 -translate-y-1/2"
        >
          <path d="M5 7l5 5 5-5" fill="none" stroke="currentColor" strokeWidth="2" />
        </svg>
      </div>
      {company.jobUrl ? (
        <a
          href={company.jobUrl}
          target="_blank"
          rel="noreferrer"
          className="truncate hover:underline"
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
