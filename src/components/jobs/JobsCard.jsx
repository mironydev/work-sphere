import { capitalize, currencySymbol, truncate } from "@/lib/helpers";
import {
  ArrowUpRight,
  Briefcase,
  CircleDollar,
  MapPin,
} from "@gravity-ui/icons";
import { Avatar, Skeleton } from "@heroui/react";
import Link from "next/link";
import React from "react";
import { JobCardMenu } from "./JobCardMenu";

const JobsCard = ({ job, savedJobs, isPending }) => {
  if (isPending) {
    return (
      <div className="flex flex-col justify-between p-6 rounded-xl bg-white dark:bg-foreground/5 border-t-2 dark:border border-white dark:border-white/15 shadow-sm">
        <div>
          <div className="flex items-center gap-2 mb-4">
            <Skeleton className="w-8 h-8 rounded-full" />
            <Skeleton className="h-4 w-24 rounded" />
          </div>
          <Skeleton className="h-9 w-3/4 rounded" />
          <div className="space-y-2 mt-4">
            <Skeleton className="h-4 w-full rounded" />
            <Skeleton className="h-4 w-2/3 rounded" />
            <Skeleton className="h-4 w-1/3 rounded sm:hidden" />
          </div>
          <div className="space-y-1.5 my-6">
            <div className="flex gap-1">
              <Skeleton className="h-7 w-26 rounded-full" />
              <Skeleton className="h-7 w-20 rounded-full" />
              <Skeleton className="h-7 w-20 rounded-full" />
            </div>
            <div className="flex gap-1">
              <Skeleton className="h-7 w-28 rounded-full" />
            </div>
          </div>
        </div>
        <Skeleton className="h-6 w-26 ml-2 mt-2 mb-1 rounded-full " />
      </div>
    );
  }

  const {
    _id,
    jobTitle,
    jobType,
    salaryMax,
    salaryMin,
    city,
    country,
    currency,
    responsibilities,
  } = job;

  return (
    <div className="flex flex-col justify-between p-6 rounded-xl bg-white dark:bg-foreground/10 border">
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
          <JobCardMenu job={job} savedJobs={savedJobs} />
        </div>
        <h3 className="text-3xl">{jobTitle}</h3>
        <p className="text-stone-600 dark:text-stone-300 mt-3">
          {truncate(responsibilities, 80)}
        </p>
        <div className="flex flex-wrap gap-1 space-y-0.5 my-6 text-xs">
          <div className="border dark:border-foreground/15 px-2.5 py-1.5 rounded-full flex items-center gap-1">
            <span>
              <MapPin />
            </span>
            {city ? (
              <p>
                {city}, {country}
              </p>
            ) : (
              "Remote"
            )}
          </div>
          <div className="border dark:border-foreground/15 px-2.5 py-1.5 rounded-full flex items-center gap-1">
            <span>
              <Briefcase />
            </span>
            <p>{capitalize(jobType)}</p>
          </div>
          <div className="border dark:border-foreground/15 px-2.5 py-1.5 rounded-full flex items-center gap-1">
            <span>
              <CircleDollar />
            </span>
            <p>
              {currencySymbol(currency)}
              {Math.round(salaryMin / 1000)}K - {currencySymbol(currency)}
              {Math.round(salaryMax / 1000)}K {currency.toUpperCase()}
            </p>
          </div>
        </div>
      </div>
      <Link
        href={`/jobs/${_id}`}
        className="w-fit flex items-center gap-1 hover:bg-foreground/5 active:bg-foreground/5 px-4 py-2 rounded-full text-sm active:scale-95 duration-100"
      >
        Apply Now <ArrowUpRight />
      </Link>
    </div>
  );
};

export default JobsCard;
