import RecruiterHomepage from "@/components/dashboard/recruiter/RecruiterHomepage";
import { auth } from "@/lib/auth";
import { getCompanies } from "@/lib/fetch/fetchCompanies";
import { getRecruiterJobs } from "@/lib/fetch/fetchJobs";
import { headers } from "next/headers";
import React from "react";

const RecruiterPage = async () => {
  const session = await auth.api.getSession({
    headers: await headers(),
  });
  const userid = session?.user?.id;

  const totalJobs = await getRecruiterJobs();
  const companies = await getCompanies(userid);
  const topCompanies = companies.slice(0, 3);

  return (
    <div>
      <RecruiterHomepage totalJobs={totalJobs} topCompanies={topCompanies} />
    </div>
  );
};

export default RecruiterPage;
