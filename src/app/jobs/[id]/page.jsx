import JobDetails from "@/components/jobs/JobDetails";
import { auth } from "@/lib/auth";
import { getJobDetails } from "@/lib/fetch/fetchJobs";
import { getApplications } from "@/lib/fetch/fetchApplications";
import { headers } from "next/headers";
import React from "react";

const JobsDetailsPage = async ({ params }) => {
  const { id } = await params;
  const session = await auth.api.getSession({
    headers: await headers(),
  });
  const user = session?.user;
  const job = await getJobDetails(id);
  const applications = await getApplications(user?.id);
  const application = applications.find((a) => a.job.id === id);
  const hasApplied = !!application;
  const applicationId = application?._id;

  return (
    <div className="mt-26 px-4">
      <JobDetails
        job={job}
        hasApplied={hasApplied}
        applicationId={applicationId}
      />
    </div>
  );
};

export default JobsDetailsPage;
