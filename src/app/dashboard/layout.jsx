import DashboardSidebar from "@/components/dashboard/DashboardSidebar";

const DashboardLayout = async ({ children }) => {
  return (
    <div className="mt-26 px-4 flex flex-col md:flex-row">
      <DashboardSidebar />
      <div className="flex-1 md:pl-4 xl:pl-6">{children}</div>
    </div>
  );
};

export default DashboardLayout;
