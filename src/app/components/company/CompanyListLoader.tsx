import CompanyBoard from "@/src/app/components/company/CompanyBoard";
import { getCompanies } from "@/src/app/lib/companies";

const CompanyListLoader = async () => {
  const allCompanies = await getCompanies();

  return <CompanyBoard companies={allCompanies} />;
};

export default CompanyListLoader;
