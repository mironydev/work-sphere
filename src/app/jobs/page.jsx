import Jobs from "@/components/jobs/Jobs";
import { getAllJobs } from "@/lib/fetch/fetchJobs";
import React from "react";

const JobsPage = async ({ searchParams }) => {
  const searchQuery = await searchParams;
  const query = new URLSearchParams(searchQuery);
  const { jobs, total } = await getAllJobs(query.toString());

  return (
    <div className="mt-26 px-4">
      <Jobs jobs={jobs} total={total} searchQuery={searchQuery} />
    </div>
  );
};

export default JobsPage;
