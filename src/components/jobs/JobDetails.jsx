"use client";

import { Avatar, Button } from "@heroui/react";
import {
  MapPin,
  Clock,
  Briefcase,
  CircleDollar,
  ArrowUpRightFromSquare,
} from "@gravity-ui/icons";
import Link from "next/link";
import { capitalize, currencySymbol, formatDate } from "@/lib/helpers";

const JobDetails = ({ job, hasApplied, applicationId, user }) => {
  const userRole = user?.role;
  const {
    _id,
    benefits,
    city,
    country,
    currency,
    deadline,
    jobCategory,
    jobTitle,
    jobType,
    requirements,
    responsibilities,
    salaryMax,
    salaryMin,
  } = job;

  return (
    <div>
      {/* Hero header */}
      <div className="relative overflow-hidden rounded-xl border-t-2 border-white dark:border dark:border-foreground/10 bg-white/80 dark:bg-foreground/5 shadow-[0_1px_2px_rgba(0,0,0,0.06)] px-6 py-6 mb-8">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold">{jobTitle}</h1>
            <p className="text-sm text-muted">{job.company.companyName}</p>
          </div>

          {userRole === "recruiter" ? (
            <Link
              href={`/dashboard/recruiter/jobs/edit/${_id}`}
              className="px-8 py-2 active:opacity-70 bg-foreground/5 border dark:border-stone-700 font-medium dark:bg-foreground/10 rounded-md text-center"
            >
              Edit
            </Link>
          ) : (
            <Link
              href={
                hasApplied
                  ? `/dashboard/seeker/applications/${applicationId}`
                  : `/jobs/${_id}/apply`
              }
              className={`hidden sm:block text-center ${hasApplied ? "bg-foreground text-background" : "bg-indigo-600 hover:bg-indigo-700 text-white"} dark:font-medium rounded-lg px-4 py-2 active:scale-95 duration-100`}
            >
              {hasApplied ? "View Application" : "Apply Now"}
            </Link>
          )}
        </div>
      </div>

      {/* Quick facts */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <div className="rounded-lg border-t-2 border-white dark:border dark:border-foreground/10 bg-white/80 dark:bg-foreground/5 shadow-[0_1px_2px_rgba(0,0,0,0.06)] p-4 flex items-center gap-3">
          <Briefcase className="w-5 h-5 opacity-40 shrink-0" />
          <div>
            <p className="text-xs text-muted mb-1">Job Type</p>
            <p className="font-medium capitalize">{jobType}</p>
          </div>
        </div>
        <div className="rounded-lg border-t-2 border-white dark:border dark:border-foreground/10 bg-white/80 dark:bg-foreground/5 shadow-[0_1px_2px_rgba(0,0,0,0.06)] p-4 flex items-center gap-3">
          <CircleDollar className="w-5 h-5 opacity-40 shrink-0" />
          <div>
            <p className="text-xs text-muted mb-1">Salary Range</p>
            <p className="font-medium">
              {currencySymbol(currency)}
              {salaryMin} - {currencySymbol(currency)}
              {salaryMax} {currency.toUpperCase()}
            </p>
          </div>
        </div>
        <div className="rounded-lg border-t-2 border-white dark:border dark:border-foreground/10 bg-white/80 dark:bg-foreground/5 shadow-[0_1px_2px_rgba(0,0,0,0.06)] p-4 flex items-center gap-3">
          <MapPin className="w-5 h-5 opacity-40 shrink-0" />
          <div>
            <p className="text-xs text-muted mb-1">Location</p>
            <p className="font-medium">
              {city && country
                ? `${city}, ${country}`
                : jobType === "remote"
                  ? "Remote"
                  : "Location not specified"}
            </p>
          </div>
        </div>
        <div className="rounded-lg border-t-2 border-white dark:border dark:border-foreground/10 bg-white/80 dark:bg-foreground/5 shadow-[0_1px_2px_rgba(0,0,0,0.06)] p-4 flex items-center gap-3">
          <Clock className="w-5 h-5 opacity-40 shrink-0" />
          <div>
            <p className="text-xs text-muted mb-1">Deadline</p>
            <p className="font-medium">{formatDate(deadline)}</p>
          </div>
        </div>
      </div>

      <div className="mb-2">
        <span className="inline-block bg-white/50 dark:bg-foreground/8 px-3 pt-1 pb-1.25 rounded-full text-sm font-medium">
          {capitalize(jobCategory)}
        </span>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
          <section className="rounded-lg border-t-2 border-white dark:border dark:border-foreground/10 bg-white/80 dark:bg-foreground/5 shadow-[0_1px_2px_rgba(0,0,0,0.06)] p-6">
            <h2 className="text-lg font-semibold mb-3">Responsibilities</h2>
            <div className="text-foreground/80 text-sm leading-relaxed whitespace-pre-wrap">
              {responsibilities}
            </div>
          </section>
          <section className="rounded-lg border-t-2 border-white dark:border dark:border-foreground/10 bg-white/80 dark:bg-foreground/5 shadow-[0_1px_2px_rgba(0,0,0,0.06)] p-6">
            <h2 className="text-lg font-semibold mb-3">Requirements</h2>
            <div className="text-foreground/80 text-sm leading-relaxed whitespace-pre-wrap">
              {requirements}
            </div>
          </section>
          {benefits && (
            <section className="rounded-lg border-t-2 border-white dark:border dark:border-foreground/10 bg-white/80 dark:bg-foreground/5 shadow-[0_1px_2px_rgba(0,0,0,0.06)] p-6">
              <h2 className="text-lg font-semibold mb-3">Benefits</h2>
              <div className="text-foreground/80 text-sm leading-relaxed whitespace-pre-wrap">
                {benefits}
              </div>
            </section>
          )}

          <div
            className={`justify-center pt-2 ${userRole === "recruiter" ? "hidden" : "flex"}`}
          >
            <Link
              href={
                hasApplied
                  ? `/dashboard/seeker/applications/${applicationId}`
                  : `/jobs/${_id}/apply`
              }
              className={`${hasApplied ? "bg-foreground text-background" : "bg-indigo-600 hover:bg-indigo-700 text-white"} rounded-lg px-12 py-4 font-bold text-lg active:scale-95 duration-100`}
            >
              {hasApplied ? "View Application" : "Apply Now"}
            </Link>
          </div>
        </div>

        {/*company details */}
        <div className="lg:col-span-1">
          <div className="rounded-lg border-t-2 border-white dark:border dark:border-foreground/10 bg-white/80 dark:bg-foreground/5 shadow-[0_1px_2px_rgba(0,0,0,0.06)] p-5">
            <div className="flex items-center gap-3 mb-4">
              <Avatar className="rounded-lg bg-transparent">
                <Avatar.Image
                  alt={job.company.companyName}
                  src={job.company.logo}
                />
                <Avatar.Fallback className="rounded-lg bg-gray-200 dark:bg-gray-600">
                  {job.company.companyName.charAt(0).toUpperCase()}
                </Avatar.Fallback>
              </Avatar>

              <div className="flex flex-col">
                <h3 className="font-bold text-lg">{job.company.companyName}</h3>
                <p className="text-sm text-muted">{job.company.location}</p>
              </div>
            </div>

            {job.company.description && (
              <p className="text-sm text-foreground/70 leading-relaxed mb-4 line-clamp-4">
                {job.company.description}
              </p>
            )}

            {job.company.totalEmployees && (
              <p className="text-sm text-foreground/70 mb-4 bg-foreground/5 px-3 py-0.5 rounded-full w-fit">
                {job.company.totalEmployees} employees
              </p>
            )}

            {job.company.url && (
              <Link
                href={job.company.url}
                target="_blank"
                rel="noopener noreferrer"
              >
                <Button
                  variant="tertiary"
                  className="rounded-lg w-full flex items-center justify-center gap-2"
                >
                  Visit Company
                  <ArrowUpRightFromSquare className="w-4 h-4" />
                </Button>
              </Link>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default JobDetails;
