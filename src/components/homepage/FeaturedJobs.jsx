"use client";

import { Avatar, Button } from "@heroui/react";
import React from "react";
import {
  ArrowUpRight,
  MapPin,
  Briefcase,
  CircleDollar,
} from "@gravity-ui/icons";
import Link from "next/link";
import { capitalize, currencySymbol, truncate } from "@/lib/helpers";

const FeaturedJobs = ({ jobs }) => {
  return (
    <div className="px-4">
      <div className="text-center space-y-2">
        <div className="flex justify-center items-center gap-3">
          <span className="bg-indigo-500 h-2 w-2 rounded-xs"></span>
          <p className="text-lg text-stone-500 dark:text-stone-300">
            FEATURED JOBS
          </p>
          <span className="bg-indigo-500 h-2 w-2 rounded-xs"></span>
        </div>
        <h2 className="text-4xl font-semibold max-w-2xl mx-auto">
          Discover Jobs That Match Your Skills
        </h2>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5 mt-12 mb-5">
        {jobs.map((job) => {
          return (
            <div
              key={job._id}
              className="flex flex-col justify-between p-6 rounded-xl bg-white dark:bg-foreground/10 border"
            >
              <div>
                <div className="flex justify-between items-start">
                  <div className="flex items-center gap-2 mb-3">
                    <Avatar size="sm" className="rounded-lg bg-transparent">
                      <Avatar.Image
                        alt={job.company.companyName}
                        src={job.company.logo}
                      />
                      <Avatar.Fallback className="rounded-lg">
                        {job.company.companyName.charAt(0).toUpperCase()}
                      </Avatar.Fallback>
                    </Avatar>
                    <p>{job.company.companyName}</p>
                  </div>
                </div>
                <h3 className="text-3xl">{job.jobTitle}</h3>
                <p className="text-stone-600 dark:text-stone-300 mt-3">
                  {truncate(job.responsibilities, 80)}
                </p>
                <div className="flex flex-wrap gap-1 space-y-0.5 my-6 text-xs">
                  {
                    <div className="border dark:border-foreground/15 px-2.5 py-1.5 rounded-full flex items-center gap-1">
                      <span>
                        <MapPin />
                      </span>
                      {job.city ? (
                        <p>
                          {job.city}, {job.country}
                        </p>
                      ) : (
                        "Remote"
                      )}
                    </div>
                  }
                  <div className="border dark:border-foreground/15 bg-white dark:bg-transparent px-2.5 py-1.5 rounded-full flex items-center gap-1">
                    <span>
                      <Briefcase />
                    </span>
                    <p>{capitalize(job.jobType)}</p>
                  </div>
                  <div className="border dark:border-foreground/15 bg-white dark:bg-transparent px-2.5 py-1.5 rounded-full flex items-center gap-1">
                    <span>
                      <CircleDollar />
                    </span>
                    <p>
                      {currencySymbol(job.currency)}
                      {Math.round(job.salaryMin / 1000)}K -{" "}
                      {currencySymbol(job.currency)}
                      {Math.round(job.salaryMax / 1000)}K{" "}
                      {job.currency.toUpperCase()}
                    </p>
                  </div>{" "}
                </div>
              </div>
              <Link
                href={`/jobs/${job._id}`}
                className="w-fit flex items-center gap-1 hover:bg-foreground/5 active:bg-foreground/5 px-4 py-2 rounded-full text-sm active:scale-95 duration-100"
              >
                Apply Now <ArrowUpRight />
              </Link>
            </div>
          );
        })}
      </div>

      <div className="text-center">
        <Link
          href="/jobs?page=1"
          className="inline-block py-3 px-10 rounded-lg bg-foreground text-background font-bold hover:opacity-90 active:scale-95 duration-75"
        >
          View All Jobs
        </Link>
      </div>
    </div>
  );
};

export default FeaturedJobs;
