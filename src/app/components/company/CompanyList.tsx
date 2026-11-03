"use client";

import CompanyDetailsModal from "@/src/app/components/company/CompanyDetailsModal";
import CompanyRow from "@/src/app/components/company/CompanyRow";
import { updateCompanyDetails } from "@/src/app/lib/actions/companiesCRUD";
import { ROW_GRID } from "@/src/app/lib/constants";
import { Company, CompanyListProps } from "@/src/app/lib/types";
import { useState } from "react";

const CompanyList = ({ companies }: CompanyListProps) => {
  const [selectedId, setSelectedId] = useState<number | null>(null);
  const selectedCompany = companies.find((company) => company.id === selectedId) ?? null;

  const openDetails = (company: Company) => {
    setSelectedId(company.id);
  };

  const closeDetails = () => {
    setSelectedId(null);
  };

  return (
    <>
      <ul className="flex flex-col gap-2">
        {companies.map((company) => (
          <li
            key={company.id}
            className={`${ROW_GRID} rounded-md px-3 py-1 text-sm text-slate-950 transition-colors odd:bg-row hover:bg-slate-300`}
          >
            <CompanyRow company={company} onOpen={openDetails} />
          </li>
        ))}
      </ul>
      <CompanyDetailsModal company={selectedCompany} onClose={closeDetails} />
    </>
  );
};

export default CompanyList;
