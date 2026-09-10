import { Spinner } from "@heroui/react";

const DashboardSpinner = () => {
  return (
    <div className="h-screen flex justify-center items-center -mt-26">
      <Spinner color="current" size="xl" />
    </div>
  );
};

export default DashboardSpinner;
