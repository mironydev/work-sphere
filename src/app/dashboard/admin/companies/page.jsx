import Companies from "@/components/dashboard/admin/Companies";
import { getCompanies } from "@/lib/fetch/fetchCompanies";

const CompaniesPage = async () => {
  const allCompanies = await getCompanies();
  return (
    <div>
      <Companies allCompanies={allCompanies} />
    </div>
  );
};

export default CompaniesPage;
