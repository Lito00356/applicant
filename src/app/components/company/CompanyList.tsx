"use client";

import CompanyDetailsModal from "@/src/app/components/company/CompanyDetailsModal";
import CompanyRow from "@/src/app/components/company/CompanyRow";
import { ROW_GRID } from "@/src/app/lib/constants";
import { Company, CompanyListProps } from "@/src/app/lib/types";
import { useState } from "react";

const CompanyList = ({ companies }: CompanyListProps) => {
  const [selectedCompany, setSelectedCompany] = useState<Company | null>(null);

  const openDetails = (company: Company) => {
    setSelectedCompany(company);
  };

  const closeDetails = () => {
    setSelectedCompany(null);
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
