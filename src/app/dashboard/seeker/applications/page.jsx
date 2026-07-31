import SeekerApplications from "@/components/dashboard/seeker/SeekerApplications";
import { getApplications } from "@/lib/fetch/fetchJobs";
import React from "react";
import { headers } from "next/headers";
import { auth } from "@/lib/auth";

const ApplicationsPage = async () => {
  const session = await auth.api.getSession({
    headers: await headers(),
  });
  const user = session?.user;
  const applications = await getApplications(user?.id);

  return (
    <div>
      <SeekerApplications applications={applications} />
    </div>
  );
};

export default ApplicationsPage;
