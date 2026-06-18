import RecruiterHomepage from "@/components/dashboard/RecruiterHomepage";
import { getAllCompanies, getAllJobs } from "@/lib/fetch/fetchJobs";
import React from "react";

const RecruiterPage = async () => {
  const totalJobs = await getAllJobs();
  const allCompanies = await getAllCompanies();
  const topCompanies = allCompanies.slice(0, 3);
  return (
    <div>
      <RecruiterHomepage totalJobs={totalJobs} topCompanies={topCompanies} />
    </div>
  );
};

export default RecruiterPage;
