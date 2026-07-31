"use client";

import { useSessionClient } from "@/lib/helpers";
import { Spinner } from "@heroui/react";
import Stats from "./Stats";
import Profile from "./Profile";
import ApplicationStatus from "./ApplicationStatus";
import RecentApplications from "./RecentApplications";
import RecentActivity from "./RecentActivity";

const SeekerHomepage = ({ applications, savedJobsCount }) => {
  const { isPending } = useSessionClient();
  if (isPending) {
    return (
      <div className="flex justify-center items-center mt-10 md:mt-16">
        <Spinner color="current" size="xl" />
      </div>
    );
  }

  return (
    <div className="space-y-10">
      <Stats savedJobsCount={savedJobsCount} applications={applications} />
      <div className="flex flex-wrap justify-between gap-5">
        <RecentApplications applications={applications} />
        <Profile />
        <ApplicationStatus applications={applications} />
      </div>
      <RecentActivity />
    </div>
  );
};

export default SeekerHomepage;
