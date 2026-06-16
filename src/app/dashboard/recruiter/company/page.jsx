import RecruiterCompany from "@/components/dashboard/RecruiterCompany";
import { getAllCompanies } from "@/lib/fetch/fetchJobs";
import React from "react";

const CompanyPage = async () => {
  const companies = await getAllCompanies();
  return (
    <div>
      <RecruiterCompany companies={companies} />
    </div>
  );
};

export default CompanyPage;
