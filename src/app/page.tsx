"use client";

import CompanyButton from "@/src/app/components/buttons/companyButton/CompanyButton";
import FilterButton from "@/src/app/components/buttons/filterButton/FilterButton";
import Clock from "@/src/app/components/clock/Clock";
import CompanyDetails from "@/src/app/components/companyODatails/CompanyDetails";
import { companies } from "@/src/app/lib/companies";
import { Company } from "@/src/app/lib/types";
import { useState } from "react";

const tableTitles = ["Company", "Role", "Location", "Application status", "URL"];
const filters = ["All", "To contact", "stretch", "Pending", "Rejected"];

export default function Home() {
  const [selectedCompany, setSelectedCompany] = useState<Company | null>(null);

  const onOpen = (company: Company) => {
    setSelectedCompany(company);
  };

  const onClose = () => {
    setSelectedCompany(null);
  };

  return (
    <main className="min-h-screen bg-slate-50 px-4 py-8 text-slate-950 sm:px-8">
      <div className="mx-auto max-w-6xl">
        <header className="mb-8 flex items-end justify-between gap-4">
          <div>
            <p className="mb-2 text-sm font-medium uppercase tracking-[0.2em] text-slate-500">Applications</p>
            <h1 className="text-3xl font-semibold tracking-tight">Jobhunt</h1>
          </div>
          <div className="flex items-baseline gap-1 text-slate-400">
            <h2 className="text-lg font-semibold text-slate-700">TWJ</h2>
            <Clock />
          </div>
        </header>

        <nav aria-label="Application filters" className="mb-6">
          <ul className="flex flex-wrap items-center gap-2">
            {filters.map((filter, index) => {
              const isActive = index === 0;
              return (
                <li key={index}>
                  <FilterButton isActive={isActive} filter={filter} index={index} />
                </li>
              );
            })}
          </ul>
        </nav>

        <section
          aria-label="Job applications"
          className="overflow-x-auto rounded-2xl border border-slate-200 bg-white shadow-sm"
        >
          <div className="min-w-[760px]">
            <div className="grid grid-cols-[1.2fr_1.4fr_1fr_1.2fr_1.5fr] gap-4 border-b border-slate-200 bg-slate-50 px-6 py-4">
              {tableTitles.map((title) => (
                <div key={title} className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                  {title}
                </div>
              ))}
            </div>

            <ul>
              {companies.map((company) => (
                <li
                  key={company.id}
                  className="grid grid-cols-[1.2fr_1.4fr_1fr_1.2fr_1.5fr] items-center gap-4 border-b border-slate-100 px-6 py-5 transition-colors last:border-b-0 hover:bg-slate-50"
                >
                  <CompanyButton companyProp={company} onOpen={onOpen} />
                </li>
              ))}
            </ul>
          </div>
        </section>
      </div>
      {selectedCompany && <CompanyDetails onClose={onClose} />}
    </main>
  );
}
