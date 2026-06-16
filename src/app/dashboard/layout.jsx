import DashboardSidebar from "@/components/dashboard/DashboardSidebar";
import React from "react";

const DashboardLayout = ({ children }) => {
  return (
    <div className="mt-26 px-4 flex flex-col md:flex-row">
      <DashboardSidebar />
      <div className="flex-1">{children}</div>
    </div>
  );
};

export default DashboardLayout;
