import RecruiterCompany from "@/components/dashboard/recruiter/RecruiterCompany";
import { getMyCompanies } from "@/lib/fetch/fetchCompanies";
import React from "react";

const CompanyPage = async () => {
  const companies = await getMyCompanies();
  return (
    <div>
      <RecruiterCompany companies={companies} />
    </div>
  );
};

export default CompanyPage;
