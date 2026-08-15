import JobDetails from "@/components/jobs/JobDetails";
import { getJobDetails } from "@/lib/fetch/fetchJobs";
import React from "react";

const JobDetailsPage = async ({ params }) => {
  const { id } = await params;
  const job = await getJobDetails(id);
  return (
    <div>
      <JobDetails job={job} />
    </div>
  );
};

export default JobDetailsPage;
