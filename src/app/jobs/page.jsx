import Jobs from "@/components/jobs/Jobs";
import { getAllJobs } from "@/lib/fetch/fetchJobs";
import React from "react";

const JobsPage = async () => {
  const jobs = await getAllJobs();

  return (
    <div className="mt-26 px-4">
      <Jobs jobs={jobs} />
    </div>
  );
};

export default JobsPage;
