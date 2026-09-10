"use client";

import React from "react";
import DashboardSpinner from "../DashboardSpinner";
import { useSessionClient } from "@/lib/helpers";

const History = () => {
  const { user, isPending } = useSessionClient();

  if (isPending) {
    return <DashboardSpinner />;
  }
  return (
    <div>
      <div>
        <h1 className="text-3xl font-semibold">History</h1>
        <p className="text-muted mt-1 mb-4">
          See all history of your activities
        </p>
      </div>
      <p className="bg-foreground/5 text-red-400 text-center py-5">
        under construction...
      </p>
    </div>
  );
};

export default History;
