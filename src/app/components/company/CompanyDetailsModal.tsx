"use client";

import type { ReactNode } from "react";
import Modal from "@/src/app/components/ui/Modal";
import {
  applicationMethodLabels,
  followUpMethodLabels,
  followUpOutcomeLabels,
  statusLabels,
} from "@/src/app/lib/constants";
import { formatDate, formatDateTime } from "@/src/app/lib/format";
import { CompanyDetailsModalProps, Status } from "@/src/app/lib/types";

const statusStyles: Record<Status, string> = {
  toContact: "bg-slate-100 text-slate-700",
  stretch: "bg-violet-100 text-violet-700",
  pending: "bg-amber-100 text-amber-800",
  interview: "bg-sky-100 text-sky-800",
  offer: "bg-emerald-100 text-emerald-800",
  rejected: "bg-rose-100 text-rose-700",
};

const Empty = () => <span className="text-slate-400">—</span>;

// Eén label + waarde. Lege waarden (null, undefined, "" of false) tonen een streepje.
const DetailItem = ({ label, children, wide = false }: { label: string; children: ReactNode; wide?: boolean }) => {
  const isEmpty = children === null || children === undefined || children === "" || children === false;

  return (
    <div className={wide ? "sm:col-span-2" : undefined}>
      <dt className="text-xs font-semibold uppercase tracking-wide text-slate-500">{label}</dt>
      <dd className="mt-1 text-sm text-slate-900">{isEmpty ? <Empty /> : children}</dd>
    </div>
  );
};

const ExternalLink = ({ href }: { href: string }) => (
  <a
    href={href}
    target="_blank"
    rel="noreferrer"
    className="break-all underline decoration-slate-300 underline-offset-4 hover:text-slate-600"
  >
    {href}
  </a>
);

const Section = ({ title, children }: { title: string; children: ReactNode }) => (
  <section className="border-t border-slate-100 pt-5">
    <h3 className="mb-4 text-sm font-semibold text-slate-900">{title}</h3>
    <dl className="grid gap-4 sm:grid-cols-2">{children}</dl>
  </section>
);

const CompanyDetailsModal = ({ company, onClose }: CompanyDetailsModalProps) => {
  return (
    <Modal open={company !== null} onClose={onClose} title={company?.name ?? ""}>
      {company && (
        <div className="flex flex-col gap-6">
          {/* Kop: functie, locatie en labels */}
          <div className="-mt-4 flex flex-wrap items-center gap-2 text-sm text-slate-600">
            <span>{company.role}</span>
            {company.location && <span>· {company.location}</span>}
            <span className={`ml-auto rounded-full px-3 py-1 text-xs font-medium ${statusStyles[company.status]}`}>
              {statusLabels[company.status]}
            </span>
            {company.isSpontaneous && (
              <span className="rounded-full bg-slate-950 px-3 py-1 text-xs font-medium text-white">Spontaneous</span>
            )}
          </div>

          <Section title="Vacancy">
            <DetailItem label="Job URL" wide>
              {company.jobUrl && <ExternalLink href={company.jobUrl} />}
            </DetailItem>
            <DetailItem label="Company website" wide>
              {company.websiteUrl && <ExternalLink href={company.websiteUrl} />}
            </DetailItem>
          </Section>

          <Section title="Application">
            <DetailItem label="Applied via">
              {company.applicationMethod && applicationMethodLabels[company.applicationMethod]}
            </DetailItem>
            <DetailItem label="Type">{company.isSpontaneous ? "Spontaneous" : "On a vacancy"}</DetailItem>
          </Section>

          <Section title="Follow-up">
            <DetailItem label="Method">
              {company.followUpMethod && followUpMethodLabels[company.followUpMethod]}
            </DetailItem>
            <DetailItem label="Outcome">
              {company.followUpOutcome && followUpOutcomeLabels[company.followUpOutcome]}
            </DetailItem>
            <DetailItem label="Date">{company.followUpAt && formatDateTime(company.followUpAt)}</DetailItem>
            <DetailItem label="Note" wide>
              {company.followUpNote && <p className="whitespace-pre-line">{company.followUpNote}</p>}
            </DetailItem>
          </Section>

          <Section title="Notes">
            <DetailItem label="Cons" wide>
              {company.cons && <p className="whitespace-pre-line">{company.cons}</p>}
            </DetailItem>
            <DetailItem label="Rejection reason" wide>
              {company.rejectionReason && <p className="whitespace-pre-line">{company.rejectionReason}</p>}
            </DetailItem>
          </Section>

          <p className="border-t border-slate-100 pt-4 text-xs text-slate-400">
            Added {formatDate(company.createdAt, { isUtc: true })} · Last updated{" "}
            {formatDate(company.updatedAt, { isUtc: true })}
          </p>
        </div>
      )}
    </Modal>
  );
};

export default CompanyDetailsModal;
