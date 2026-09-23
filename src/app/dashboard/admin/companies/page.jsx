import Companies from "@/components/dashboard/admin/companies/Companies";
import { getCompanies } from "@/lib/fetch/fetchCompanies";

const CompaniesPage = async ({ searchParams }) => {
  const param = await searchParams;
  const query = new URLSearchParams(param);
  const { result, total, approved, rejected, pending } = await getCompanies(
    query.toString(),
  );
  return (
    <div>
      <Companies
        allCompanies={result}
        total={total}
        approved={approved}
        rejected={rejected}
        pending={pending}
      />
    </div>
  );
};

export default CompaniesPage;
