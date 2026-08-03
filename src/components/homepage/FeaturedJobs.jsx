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
    <div className="mt-28 sm:mt-36 px-4">
      <div className="text-center space-y-2">
        <div className="flex justify-center items-center gap-3">
          <span className="bg-indigo-500 h-2 w-2 rounded-xs"></span>
          <p className="text-lg text-stone-500 dark:text-stone-300">
            FEATURED JOBS
          </p>
          <span className="bg-indigo-500 h-2 w-2 rounded-xs"></span>
        </div>
        <h2 className="text-4xl font-semibold max-w-xl mx-auto">
          Discover Hidden Career Opportunities
        </h2>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5 mt-14 mb-8">
        {jobs.map((job) => {
          return (
            <div
              key={job._id}
              className="flex flex-col justify-between p-6 rounded-xl bg-white/80 dark:bg-foreground/10 sm:dark:bg-foreground/5 border-t-2 dark:border border-white dark:border-white/15 shadow-[0_1px_2px_rgba(0,0,0,0.06)]"
            >
              <div>
                <div className="flex justify-between items-start">
                  <div className="flex items-center gap-2 mb-3">
                    <Avatar size="sm" className="rounded-lg bg-transparent">
                      <Avatar.Image
                        alt={job.companyName}
                        src={job.companyLogo}
                      />
                      <Avatar.Fallback className="rounded-lg">
                        {job.companyName.charAt(0).toUpperCase()}
                      </Avatar.Fallback>
                    </Avatar>
                    <p>{job.companyName}</p>
                  </div>
                </div>
                <h3 className="text-3xl">{job.jobTitle}</h3>
                <p className="text-stone-600 dark:text-stone-300 mt-3">
                  {truncate(job.responsibilities, 80)}
                </p>
                <div className="flex flex-wrap gap-1 space-y-0.5 my-6 text-xs">
                  {
                    <div className="border bg-white dark:bg-[#2c2c2e] px-2.5 py-1.5 rounded-full flex items-center gap-1">
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
                  <div className="border bg-white dark:bg-[#2c2c2e] px-2.5 py-1.5 rounded-full flex items-center gap-1">
                    <span>
                      <Briefcase />
                    </span>
                    <p>{capitalize(job.jobType)}</p>
                  </div>
                  <div className="border bg-white dark:bg-[#2c2c2e] px-2.5 py-1.5 rounded-full flex items-center gap-1">
                    <span>
                      <CircleDollar />
                    </span>
                    <p>
                      {currencySymbol(job.currency)}
                      {job.salaryMin} - {currencySymbol(job.currency)}
                      {job.salaryMax} {job.currency.toUpperCase()}
                    </p>
                  </div>{" "}
                </div>
              </div>
              <Link href={`/jobs/${job._id}`}>
                <Button
                  variant="ghost"
                  style={{
                    boxShadow: "none",
                    outline: "none",
                  }}
                >
                  Apply Now <ArrowUpRight />
                </Button>
              </Link>
            </div>
          );
        })}
      </div>

      <div className="text-center">
        <Button className="rounded-lg bg-black dark:bg-white dark:text-black py-6 px-10 sm:px-20 text-base text-center">
          View All Jobs
        </Button>
      </div>
    </div>
  );
};

export default FeaturedJobs;
