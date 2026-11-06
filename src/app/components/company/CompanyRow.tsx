"use client";

import { useOptimistic, useState, useTransition } from "react";
import { updateCompanyStatus } from "@/src/app/lib/actions/companiesCRUD";
import { STATUSES, statusColors, statusLabels } from "@/src/app/lib/constants";
import { CompanyRowProps, Status } from "@/src/app/lib/types";

const CompanyRow = ({ company, onOpen }: CompanyRowProps) => {
  const [status, setOptimisticStatus] = useOptimistic(company.status);
  const [isPending, startTransition] = useTransition();
  const [hasError, setHasError] = useState(false);

  const changeStatus = (newStatus: Status) => {
    setHasError(false);

    startTransition(async () => {
      setOptimisticStatus(newStatus);
      const result = await updateCompanyStatus(company.id, newStatus);
      if (!result.success) setHasError(true);
    });
  };

  return (
    <>
      <button
        type="button"
        onClick={() => onOpen(company)}
        className="flex min-w-0 cursor-pointer flex-col text-left md:col-span-3 md:grid md:grid-cols-subgrid md:items-center"
      >
        <span className="truncate font-medium md:font-normal">{company.name}</span>
        <span className="truncate text-xs text-slate-600 md:text-sm md:text-slate-950">{company.role}</span>
        <span className="truncate text-xs text-slate-600 md:text-sm md:text-slate-950">{company.location ?? "–"}</span>
      </button>
      <div className="relative w-32 md:w-36">
        <select
          value={status}
          onChange={(e) => changeStatus(e.target.value as Status)}
          aria-label={`Status of ${company.name}`}
          aria-invalid={hasError}
          title={hasError ? "Could not save the status. Try again." : undefined}
          className={`${statusColors[status]} w-full cursor-pointer appearance-none rounded-md py-0.5 pl-1.5 pr-6 text-xs text-slate-950 ${
            isPending ? "opacity-60" : ""
          } ${hasError ? "ring-2 ring-red-600" : ""}`}
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
        <a href={company.jobUrl} target="_blank" rel="noreferrer" className="hidden truncate hover:underline md:block">
          {company.jobUrl}
        </a>
      ) : (
        <span className="hidden text-slate-400 md:block">–</span>
      )}
    </>
  );
};

export default CompanyRow;
