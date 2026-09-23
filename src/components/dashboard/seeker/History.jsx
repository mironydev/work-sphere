"use client";

import React from "react";
import DashboardSpinner from "../DashboardSpinner";
import { useSessionClient } from "@/lib/helpers";

const History = () => {
  const { isPending } = useSessionClient();

  if (isPending) {
    return <DashboardSpinner />;
  }
  return (
    <div className="flex min-h-screen items-center justify-center px-4 -mt-26">
      <div className="text-center">
        <h1 className="text-2xl font-semibold">History</h1>
        <p className="mt-2 text-sm text-muted">
          This page is currently under development.
        </p>
        <p className="mt-1 text-sm text-muted">
          We are working on it and it will be available soon.
        </p>
      </div>
    </div>
  );
};

export default History;
