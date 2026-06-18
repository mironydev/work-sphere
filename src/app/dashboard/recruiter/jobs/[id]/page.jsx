import JobDetails from "@/components/dashboard/JobDetails";
import { getCompanyDetails, getJobDetails } from "@/lib/fetch/fetchJobs";
import React from "react";

const JobDetailsPage = async ({ params }) => {
  const { id } = await params;
  const job = await getJobDetails(id);
  const companyId = job.companyId;
  const company = await getCompanyDetails(companyId);
  const companyLocation = company.location;
  console.log(companyLocation);
  return (
    <div>
      <JobDetails job={job} companyLocation={companyLocation} />
    </div>
  );
};

export default JobDetailsPage;
