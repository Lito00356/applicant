"use client";

import { useState } from "react";
import AddCompanyButton from "@/src/app/components/companiesCRUD/AddCompanyButton";
import CompanyList from "@/src/app/components/company/CompanyList";
import FilterButton from "@/src/app/components/filters/FilterButton";
import { FILTERS, PAGE_SIZE, REJECTED_PAGE_SIZE, ROW_GRID, TABLE_TITLES } from "@/src/app/lib/constants";
import { CompanyBoardProps, Filter } from "@/src/app/lib/types";
import Pagination from "@/src/app/components/ui/Pagination";
import { groupByWeek, paginateWeeks, rejectedDate } from "@/src/app/lib/weeks";

const CompanyBoard = ({ companies }: CompanyBoardProps) => {
  const [activeFilter, setActiveFilter] = useState<Filter>("toContact");
  const [currentPage, setCurrentPage] = useState(1);

  const isRejectedFilter = activeFilter === "rejected";

  // Rejected: meest recent afgewezen eerst, zodat de weken van recent naar oud lopen. De rest: alfabetisch.
  const visibleCompanies = (
    activeFilter === "all" ? companies : companies.filter((company) => company.status === activeFilter)
  ).toSorted((a, b) =>
    isRejectedFilter
      ? rejectedDate(b).localeCompare(rejectedDate(a))
      : a.name.localeCompare(b.name, "nl", { sensitivity: "base" }),
  );

  // Rejected: pagina's bestaan uit hele weken. De rest: vaste blokken van PAGE_SIZE.
  const weekPages = isRejectedFilter ? paginateWeeks(groupByWeek(visibleCompanies), REJECTED_PAGE_SIZE) : [];

  const totalPages = isRejectedFilter
    ? Math.max(1, weekPages.length)
    : Math.max(1, Math.ceil(visibleCompanies.length / PAGE_SIZE));
  const safePage = Math.min(currentPage, totalPages);
  const start = (safePage - 1) * PAGE_SIZE;
  const end = start + PAGE_SIZE;
  const displayedCompanies = visibleCompanies.slice(start, end);
  const displayedWeeks = weekPages[safePage - 1] ?? [];

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
                onClick={() => {
                  setActiveFilter(filter.value);
                  setCurrentPage(1);
                }}
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
          <div className="hidden md:block">
            <div className={`${ROW_GRID} px-3 pb-4`}>
              {TABLE_TITLES.map((title) => (
                <div key={title} className="text-base font-semibold text-slate-950">
                  {title}
                </div>
              ))}
            </div>
          </div>

          {visibleCompanies.length > 0 ? (
            isRejectedFilter ? (
              <div className="flex flex-col gap-4">
                {displayedWeeks.map((week) => (
                  <section key={week.key} aria-label={week.label} className="rounded-lg border border-slate-200 p-2">
                    <h3 className="px-3 pb-2 pt-1 text-sm font-semibold text-slate-700">{week.label}</h3>
                    <CompanyList companies={week.companies} />
                  </section>
                ))}
              </div>
            ) : (
              <CompanyList companies={displayedCompanies} />
            )
          ) : (
            <p className="px-3 py-6 text-sm text-slate-500">No companies here yet.</p>
          )}
        </div>

        {/* Onderaan in het midden, op dezelfde hoogte als de +-knop */}
        <div className="absolute inset-x-0 bottom-5 flex h-10 items-center justify-center">
          <Pagination currentPage={safePage} totalPages={totalPages} onPageChange={setCurrentPage} />
        </div>
        <div className="absolute bottom-5 right-5">
          <AddCompanyButton />
        </div>
      </section>
    </div>
  );
};

export default CompanyBoard;
