import { getAllJobs } from "@/lib/fetch/fetchJobs";
import React from "react";
import RecruiterAllJobs from "@/components/dashboard/RecruiterAllJobs";

const RecruiterJobsPage = async () => {
  const allJobs = await getAllJobs();

  return <RecruiterAllJobs allJobs={allJobs} />;
};

export default RecruiterJobsPage;
