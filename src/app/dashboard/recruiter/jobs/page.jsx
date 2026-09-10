import { getRecruiterJobs } from "@/lib/fetch/fetchJobs";
import React from "react";
import RecruiterAllJobs from "@/components/dashboard/recruiter/RecruiterAllJobs";

const RecruiterJobsPage = async ({ searchParams }) => {
  const params = await searchParams;
  const page = Number(params.page) || 1;
  const jobsData = await getRecruiterJobs(page);

  return <RecruiterAllJobs jobsData={jobsData} />;
};

export default RecruiterJobsPage;
