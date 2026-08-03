"use client";

import React from "react";
import SeekerSvdJobCard from "./SeekerSvdJobCard";
import Link from "next/link";

const SeekerSavedJobs = ({ savedJobs }) => {
  return (
    <div>
      {savedJobs.length > 0 ? (
        <div className="flex flex-col gap-2">
          <div>
            <h1 className="text-3xl font-semibold">Saved Jobs</h1>
            <p className="text-muted mt-2">{savedJobs.length} jobs saved</p>
          </div>
          {savedJobs.map((job) => (
            <SeekerSvdJobCard key={job._id} job={job} />
          ))}
        </div>
      ) : (
        <div className="flex flex-col justify-center items-center py-16">
          <div className="text-center">
            <p className="text-xl text-muted">No saved jobs yet</p>
            <p className="text-sm text-muted mt-2">
              Start saving jobs to view them later
            </p>
          </div>
          <Link
            href={"/jobs?page=1"}
            className="bg-foreground text-background px-5 py-2.5 rounded-lg mt-4 font-medium"
          >
            Browse Jobs
          </Link>
        </div>
      )}
    </div>
  );
};

export default SeekerSavedJobs;
