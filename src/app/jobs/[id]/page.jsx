import JobDetails from "@/components/dashboard/JobDetails";
import { getJobDetails } from "@/lib/fetch/fetchJobs";
import React from "react";

const JobsDetailsPage = async ({ params }) => {
  const { id } = await params;
  const job = await getJobDetails(id);
  return (
    <div className="mt-26 px-4">
      <JobDetails job={job} />
    </div>
  );
};

export default JobsDetailsPage;
