"use client";

import CompanyDetailsModal from "@/src/app/components/company/CompanyDetailsModal";
import CompanyRow from "@/src/app/components/company/CompanyRow";
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
      <ul>
        {companies.map((company) => (
          <li
            key={company.id}
            className="grid grid-cols-[1.2fr_1.4fr_1fr_1.2fr_1.5fr] items-center gap-4 border-b border-slate-100 px-6 py-5 transition-colors last:border-b-0 hover:bg-slate-50"
          >
            <CompanyRow company={company} onOpen={openDetails} />
          </li>
        ))}
      </ul>
      {selectedCompany && <CompanyDetailsModal onClose={closeDetails} />}
    </>
  );
};

export default CompanyList;
