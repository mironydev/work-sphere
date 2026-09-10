"use client";

import { useState } from "react";
import JobsCard from "./JobsCard";
import JobsFilter from "./JobsFilter";
import JobsPagination from "./JobsPagination";
import { useSessionClient } from "@/lib/helpers";

const Jobs = ({ jobs, total, searchQuery, savedJobs }) => {
  const [page, setPage] = useState(searchQuery.page || 1);
  const { isPending } = useSessionClient();

  const handleSetPage = (newPage) => {
    window.scrollTo({ top: 0, behavior: "smooth" });
    setPage(newPage);
  };

  const startItem = (page - 1) * 9 + 1;
  const endItem = Math.min(startItem + 9 - 1, total);

  return (
    <div>
      <h1 className="text-4xl md:text-5xl font-bold text-center sm:py-5">
        Find Jobs
      </h1>
      {jobs.length > 0 && (
        <JobsFilter
          searchQuery={searchQuery}
          page={page}
          setPage={handleSetPage}
        />
      )}
      <p className={`text-sm text-muted mb-3 ${!jobs.length && "hidden"}`}>
        Showing {startItem}-{endItem} of
        <span className="font-medium"> {total} Jobs</span>
      </p>

      <div>
        {jobs.length ? (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {jobs.map((job) => (
                <JobsCard
                  key={job._id}
                  job={job}
                  savedJobs={savedJobs}
                  isPending={isPending}
                />
              ))}
            </div>
            <JobsPagination page={page} setPage={handleSetPage} total={total} />
          </>
        ) : (
          <div className="text-xl h-[30vh] flex items-center justify-center border-t">
            <p className="bg-foreground/3 py-1 w-full text-center">
              No jobs found.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Jobs;
