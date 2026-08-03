"use client";

import { useSessionClient } from "@/lib/helpers";
import { Spinner } from "@heroui/react";
import SeekerProfile from "./SeekerProfile";
import SeekerAdditional from "./SeekerAdditional";
import Resume from "./Resume";

const SeekerSettings = () => {
  const { isPending } = useSessionClient();

  if (isPending) {
    return (
      <div className="flex justify-center items-center mt-10 md:mt-16">
        <Spinner color="current" size="xl" />
      </div>
    );
  }

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-semibold">Settings</h1>
        <p className="text-muted mt-1">
          Manage your profile information and account settings.
        </p>
      </div>

      <div className="flex flex-col lg:flex-row gap-5">
        <div className="space-y-5 flex-2">
          <SeekerProfile />
          <SeekerAdditional />
        </div>
        <div className="flex-1">
          <Resume />
        </div>
      </div>
    </div>
  );
};

export default SeekerSettings;
