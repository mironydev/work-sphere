import Jobs from "@/components/dashboard/admin/jobs/Jobs";
import { getAllJobs } from "@/lib/fetch/fetchJobs";
import React from "react";

const JobsPage = async ({ searchParams }) => {
  const searchQuery = await searchParams;
  const query = new URLSearchParams(searchQuery);
  const { jobs, total, count, active, addedThisMonth } = await getAllJobs(
    query.toString(),
  );
  return (
    <div>
      <Jobs
        jobs={jobs}
        total={total}
        count={count}
        active={active}
        addedThisMonth={addedThisMonth}
      />
    </div>
  );
};

export default JobsPage;
