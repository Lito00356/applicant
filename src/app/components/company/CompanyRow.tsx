"use client";

import { useOptimistic, useState, useTransition } from "react";
import { toast } from "sonner";
import RejectionReasonModal from "@/src/app/components/company/RejectionReasonModal";
import { updateCompanyStatus } from "@/src/app/lib/actions/companiesCRUD";
import { STATUSES, statusColors, statusLabels } from "@/src/app/lib/constants";
import { DEFAULT_JOB_URL_TEXT, isHttpUrl } from "@/src/app/lib/format";
import { CompanyRowProps, Status } from "@/src/app/lib/types";

const CompanyRow = ({ company, onOpen }: CompanyRowProps) => {
  const [status, setOptimisticStatus] = useOptimistic(company.status);
  const [isPending, startTransition] = useTransition();
  const [hasError, setHasError] = useState(false);
  const [isAskingReason, setIsAskingReason] = useState(false);

  const changeStatus = (newStatus: Status, rejectionReason?: string) => {
    setHasError(false);

    startTransition(async () => {
      setOptimisticStatus(newStatus);
      const result = await updateCompanyStatus(company.id, newStatus, rejectionReason);
      if (!result.success) {
        setHasError(true);
        toast.error(`Could not update the status of ${company.name}`);
      }
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
          onChange={(e) => {
            const newStatus = e.target.value as Status;
            // Rejected gaat pas door nadat de reden is ingevuld; tot dan blijft de oude status staan
            if (newStatus === "rejected") {
              setIsAskingReason(true);
            } else {
              changeStatus(newStatus);
            }
          }}
          aria-label={`Status of ${company.name}`}
          aria-invalid={hasError}
          title={hasError ? "Could not save the status. Try again." : undefined}
          className={`${statusColors[status]} w-full cursor-pointer appearance-none rounded-md py-0.5 pl-1.5 pr-6 text-xs text-slate-950 ${
            isPending ? "opacity-60" : ""
          } ${hasError ? "ring-2 ring-red-600" : ""}`}
        >
          {/* In het archief toont "Archived" nog als huidige waarde, maar je kan het niet opnieuw kiezen */}
          {STATUSES.map((value) => (
            <option
              key={value}
              value={value}
              disabled={value === "archived" && company.status === "archived"}
              hidden={value === "archived" && company.status === "archived"}
              className="bg-white"
            >
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
      {company.jobUrl && isHttpUrl(company.jobUrl) ? (
        <a href={company.jobUrl} target="_blank" rel="noreferrer" className="hidden truncate hover:underline md:block">
          {company.jobUrl}
        </a>
      ) : (
        <span className="hidden truncate text-slate-500 md:block">{company.jobUrl ?? DEFAULT_JOB_URL_TEXT}</span>
      )}
      {/* Pas renderen wanneer nodig, zodat het tekstveld telkens vers begint */}
      {isAskingReason && (
        <RejectionReasonModal
          open
          companyName={company.name}
          defaultReason={company.rejectionReason}
          onCancel={() => setIsAskingReason(false)}
          onConfirm={(reason) => {
            setIsAskingReason(false);
            changeStatus("rejected", reason);
          }}
        />
      )}
    </>
  );
};

export default CompanyRow;
