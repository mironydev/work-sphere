"use client";

import { useSessionClient } from "@/lib/helpers";
import { Spinner } from "@heroui/react";
import React from "react";

const SeekerSavedJobs = () => {
  const { isPending } = useSessionClient();
  if (isPending) {
    return (
      <div className="flex justify-center items-center mt-10 md:mt-16">
        <Spinner color="current" size="xl" />
      </div>
    );
  }
  return <div>SeekerSavedJobs - client</div>;
};

export default SeekerSavedJobs;
