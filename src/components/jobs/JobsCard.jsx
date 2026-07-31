import { capitalize, currencySymbol, truncate } from "@/lib/helpers";
import {
  ArrowUpRight,
  Briefcase,
  CircleDollar,
  MapPin,
} from "@gravity-ui/icons";
import { Avatar, Button } from "@heroui/react";
import Link from "next/link";
import React from "react";
import { JobCardMenu } from "./JobCardMenu";

const JobsCard = ({ job, savedJobs }) => {
  const {
    _id,
    companyName,
    companyLogo,
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
    <div className="flex flex-col justify-between p-6 rounded-xl bg-white/80 dark:bg-foreground/10 sm:dark:bg-foreground/5 border-t-2 dark:border border-white dark:border-white/15 shadow-[0_1px_2px_rgba(0,0,0,0.06)]">
      <div>
        <div className="flex justify-between items-start">
          <div className="flex items-center gap-2 mb-3">
            <Avatar size="sm" className="rounded-lg bg-transparent">
              <Avatar.Image alt={companyName} src={companyLogo} />
              <Avatar.Fallback className="rounded-lg">
                {companyName.charAt(0).toUpperCase()}
              </Avatar.Fallback>
            </Avatar>
            <p>{companyName}</p>
          </div>
          <JobCardMenu job={job} savedJobs={savedJobs} />
        </div>
        <h3 className="text-3xl">{jobTitle}</h3>
        <p className="text-stone-600 dark:text-stone-300 mt-3">
          {truncate(responsibilities, 80)}
        </p>
        <div className="flex flex-wrap gap-1 space-y-0.5 my-6 text-xs">
          {
            <div className="border bg-white dark:bg-[#2c2c2e] px-2.5 py-1.5 rounded-full flex items-center gap-1">
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
          }
          <div className="border bg-white dark:bg-[#2c2c2e] px-2.5 py-1.5 rounded-full flex items-center gap-1">
            <span>
              <Briefcase />
            </span>
            <p>{capitalize(jobType)}</p>
          </div>
          <div className="border bg-white dark:bg-[#2c2c2e] px-2.5 py-1.5 rounded-full flex items-center gap-1">
            <span>
              <CircleDollar />
            </span>
            <p>
              {currencySymbol(currency)}
              {salaryMin} - {currencySymbol(currency)}
              {salaryMax} {currency.toUpperCase()}
            </p>
          </div>{" "}
        </div>
      </div>
      <Link href={`/jobs/${_id}`}>
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
};

export default JobsCard;
