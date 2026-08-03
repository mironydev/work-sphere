import ApplicationDetails from "@/components/dashboard/seeker/ApplicationDetails";
import { getApplicationDetails } from "@/lib/fetch/fetchApplications";
import React from "react";

const ApplicationDetailsPage = async ({ params }) => {
  const { id } = await params;
  const application = await getApplicationDetails(id);
  return (
    <div>
      <ApplicationDetails application={application} />
    </div>
  );
};

export default ApplicationDetailsPage;
