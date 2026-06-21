"use client";

import React, { useState } from "react";
import JobsCard from "./JobsCard";
import JobsFilter from "./JobsFilter";

const Jobs = ({ jobs }) => {
  const [filters, setFilters] = useState({
    search: "",
    jobType: "",
    category: "",
    isRemote: false,
  });

  const filteredJobs = jobs.filter((job) => {
    // Search filter
    const searchLower = filters.search.toLowerCase();
    const matchesSearch =
      job.companyName?.toLowerCase().includes(searchLower) ||
      job.jobTitle?.toLowerCase().includes(searchLower);

    // Job type filter
    const matchesJobType = !filters.jobType || job.jobType === filters.jobType;

    // Category filter
    const matchesCategory =
      !filters.category || job.jobCategory === filters.category;

    // Remote filter
    const matchesRemote = !filters.isRemote || job.jobType === "remote";

    return matchesSearch && matchesJobType && matchesCategory && matchesRemote;
  });

  return (
    <div>
      <p className="text-5xl font-semibold text-center">Browse Jobs</p>
      <JobsFilter onFilterChange={setFilters} />
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {filteredJobs.length > 0 ? (
          filteredJobs.map((job) => <JobsCard key={job._id} job={job} />)
        ) : (
          <p className="col-span-full text-center text-muted">No jobs found</p>
        )}
      </div>
    </div>
  );
};

export default Jobs;
