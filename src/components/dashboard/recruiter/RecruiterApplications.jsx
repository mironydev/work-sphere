"use client";

import { Spinner } from "@heroui/react";
import IfNotRecruiter from "./IfNotRecruiter";
import { useSessionClient } from "@/lib/helpers";

const RecruiterApplications = () => {
  const { user, isPending } = useSessionClient();
  if (isPending) {
    return (
      <div className="flex justify-center items-center mt-10 md:mt-16">
        <Spinner color="current" size="xl" />
      </div>
    );
  }
  if (user?.role !== "recruiter") {
    return <IfNotRecruiter />;
  }
  return <div>RecruiterApplications - client</div>;
};

export default RecruiterApplications;
