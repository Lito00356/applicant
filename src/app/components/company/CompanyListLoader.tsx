import CompanyList from "@/src/app/components/company/CompanyList";
import { getCompanies } from "@/src/app/lib/companies";

const CompanyListLoader = async () => {
  const allCompanies = await getCompanies();

  return <CompanyList companies={allCompanies} />;
};

export default CompanyListLoader;
