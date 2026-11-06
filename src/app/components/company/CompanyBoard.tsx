"use client";

import { useState } from "react";
import AddCompanyButton from "@/src/app/components/companiesCRUD/AddCompanyButton";
import CompanyList from "@/src/app/components/company/CompanyList";
import FilterButton from "@/src/app/components/filters/FilterButton";
import { FILTERS, PAGE_SIZE, ROW_GRID } from "@/src/app/lib/constants";
import { CompanyBoardProps, Filter } from "@/src/app/lib/types";

const tableTitles = ["Company", "Function", "Location", "Application status", "Vacature"];

const CompanyBoard = ({ companies }: CompanyBoardProps) => {
  const [activeFilter, setActiveFilter] = useState<Filter>("toContact");
  const [currentPage, setCurrentPage] = useState(1);

  const visibleCompanies =
    activeFilter === "all" ? companies : companies.filter((company) => company.status === activeFilter);

  const pages = Math.ceil(Math.max(1, visibleCompanies.length / PAGE_SIZE));
  const start = (currentPage - 1) * PAGE_SIZE;
  const end = start + PAGE_SIZE;
  const displayedCompanies = visibleCompanies.slice(start, end);

  return (
    <div className="flex flex-1 flex-col">
      <nav aria-label="Application filters">
        {/* Op smalle schermen scrollen de tabs horizontaal in plaats van uit beeld te vallen */}
        <ul className="flex items-end gap-2 overflow-x-auto pl-0">
          {FILTERS.map((filter) => (
            <li key={filter.value} className="shrink-0">
              <FilterButton
                label={filter.label}
                color={filter.color}
                isActive={activeFilter === filter.value}
                onClick={() => setActiveFilter(filter.value)}
              />
            </li>
          ))}
        </ul>
      </nav>

      <section
        aria-label="Job applications"
        className="relative flex flex-1 flex-col overflow-x-auto rounded-b-xl rounded-tr-xl bg-surface px-3 pb-20 pt-3 sm:px-5 sm:pt-5"
      >
        <div className="md:min-w-190">
          {/* Kolomtitels alleen bij de tabelweergave */}
          <div className="hidden md:block">
            <div className={`${ROW_GRID} px-3 pb-4`}>
              {tableTitles.map((title) => (
                <div key={title} className="text-base font-semibold text-slate-950">
                  {title}
                </div>
              ))}
            </div>
          </div>

          {visibleCompanies.length > 0 ? (
            <CompanyList companies={displayedCompanies} />
          ) : (
            <p className="px-3 py-6 text-sm text-slate-500">No companies here yet.</p>
          )}
        </div>

        <div className="absolute bottom-5 right-5">
          <AddCompanyButton />
        </div>
      </section>
    </div>
  );
};

export default CompanyBoard;
