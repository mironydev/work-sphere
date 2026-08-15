"use client";

import { useSessionClient } from "@/lib/helpers";
import { Spinner } from "@heroui/react";
import Stats from "./Stats";
import Profile from "./Profile";
import ApplicationStatus from "./ApplicationStatus";
import RecentApplications from "./RecentApplications";
import RecentActivity from "./RecentActivity";

const SeekerHomepage = ({ applications, savedJobsCount }) => {
  const { user, isPending } = useSessionClient();

  if (isPending) {
    return (
      <div className="flex justify-center items-center mt-10 md:mt-16">
        <Spinner color="current" size="xl" />
      </div>
    );
  }

  return (
    <div>
      <h1 className="text-3xl font-medium">
        Hey there, {user?.name?.split(" ")[0]}!
      </h1>
      <p className="text-muted mb-4 mt-1">
        View and manage everything from your dashboard
      </p>
      <Stats savedJobsCount={savedJobsCount} applications={applications} />
      <div className="flex flex-wrap justify-between gap-3 mt-5">
        <RecentApplications applications={applications} />
        <Profile />
        <ApplicationStatus applications={applications} />
      </div>
      <RecentActivity />
    </div>
  );
};

export default SeekerHomepage;
