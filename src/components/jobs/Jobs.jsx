"use client";

import { useState } from "react";
import JobsCard from "./JobsCard";
import JobsFilter from "./JobsFilter";
import JobsPagination from "./JobsPagination";

const Jobs = ({ jobs, total, searchQuery }) => {
  const [page, setPage] = useState(searchQuery.page || 1);
  const startItem = (page - 1) * 9 + 1;
  const endItem = Math.min(startItem + 9 - 1, total);

  return (
    <div>
      <p className="text-5xl font-semibold text-center">Browse Jobs</p>
      <JobsFilter
        searchQuery={searchQuery}
        jobs={jobs}
        page={page}
        setPage={setPage}
        total={total}
      />
      <p className="text-sm text-muted mb-3">
        {" "}
        Showing {startItem}-{endItem} of {total} results
      </p>
      <div>
        {jobs.length > 0 ? (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {jobs.map((job) => (
                <JobsCard key={job._id} job={job} />
              ))}
            </div>
            <JobsPagination
              jobs={jobs}
              searchQuery={searchQuery}
              page={page}
              setPage={setPage}
              total={total}
            />
          </>
        ) : (
          <p className="col-span-full  text-center text-muted">No jobs found</p>
        )}
      </div>
    </div>
  );
};

export default Jobs;
