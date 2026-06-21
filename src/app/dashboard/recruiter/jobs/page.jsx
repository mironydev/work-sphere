import { getRecruiterJobs } from "@/lib/fetch/fetchJobs";
import React from "react";
import RecruiterAllJobs from "@/components/dashboard/RecruiterAllJobs";

const RecruiterJobsPage = async () => {
  const allJobs = await getRecruiterJobs();

  return <RecruiterAllJobs allJobs={allJobs} />;
};

export default RecruiterJobsPage;
