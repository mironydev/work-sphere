import RecruiterHomepage from "@/components/dashboard/RecruiterHomepage";
import { getAllCompanies, getRecruiterJobs } from "@/lib/fetch/fetchJobs";
import React from "react";

const RecruiterPage = async () => {
  const totalJobs = await getRecruiterJobs();
  const allCompanies = await getAllCompanies();
  const topCompanies = allCompanies.slice(0, 3);
  return (
    <div>
      <RecruiterHomepage totalJobs={totalJobs} topCompanies={topCompanies} />
    </div>
  );
};

export default RecruiterPage;
