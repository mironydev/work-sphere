import RecruiterCompany from "@/components/dashboard/recruiter/RecruiterCompany";
import { auth } from "@/lib/auth";
import { getCompanies } from "@/lib/fetch/fetchJobs";
import { headers } from "next/headers";
import React from "react";

const CompanyPage = async () => {
  const session = await auth.api.getSession({
    headers: await headers(),
  });
  const userid = session?.user?.id;
  const companies = await getCompanies(userid);
  return (
    <div>
      <RecruiterCompany companies={companies} />
    </div>
  );
};

export default CompanyPage;
