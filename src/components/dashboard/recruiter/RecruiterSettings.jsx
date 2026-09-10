"use client";

import { useSessionClient } from "@/lib/helpers";
import DashboardSpinner from "../DashboardSpinner";
import { Avatar } from "@heroui/react";

const Empty = ({ children = "Not added" }) => (
  <span className="italic text-sm text-muted">{children}</span>
);

const formatPlanName = (plan) => {
  if (!plan) return "N/A";
  return plan
    .split("_")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
};

const RecruiterSettings = () => {
  const { isPending, user } = useSessionClient();

  if (isPending) {
    return <DashboardSpinner />;
  }

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-3xl font-semibold">Profile</h1>
        <p className="text-muted mt-1">Your account information.</p>
      </div>

      <div className="rounded-xl border bg-white dark:bg-foreground/5 p-6 max-w-xs">
        {" "}
        <div className="flex items-center gap-4 mb-6">
          <Avatar className="size-16 rounded-lg">
            <Avatar.Image alt="profile image" src={user?.image} />
            <Avatar.Fallback className="rounded-lg bg-transparent border text-2xl">
              {user?.name?.[0]?.toUpperCase() || "U"}
            </Avatar.Fallback>
          </Avatar>
          <div>
            <p className="text-xl font-semibold">
              {user?.name || <Empty>No name</Empty>}
            </p>
            <p className="text-sm text-muted">
              {user?.headline || <Empty>No job title</Empty>}
            </p>
          </div>
        </div>
        <div className="grid grid-cols-1 gap-5 text-sm">
          <div>
            <p className="text-muted mb-1">Email</p>
            <p className="font-medium">{user?.email}</p>
          </div>
          <div>
            <p className="text-muted mb-1">Phone</p>
            <p className="font-medium">{user?.phone || <Empty />}</p>
          </div>
          <div>
            <p className="text-muted mb-1">Role</p>
            <p className="font-medium capitalize">
              {user?.accountType || <Empty />}
            </p>
          </div>
          <div>
            <p className="text-muted mb-1">Plan</p>
            <p className="font-medium">{formatPlanName(user?.plan)}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RecruiterSettings;
