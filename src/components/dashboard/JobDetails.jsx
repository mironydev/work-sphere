"use client";

import React from "react";
import { Avatar, Button } from "@heroui/react";
import { MapPin, Clock, Briefcase, CircleDollar } from "@gravity-ui/icons";
import { useSession } from "@/lib/auth-client";
import Link from "next/link";

const JobDetails = ({ job, companyLocation }) => {
  const { data: session } = useSession();
  const userRole = session?.user?.role;

  const {
    _id,
    benefits,
    city,
    companyName,
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

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });
  };

  const currencySymbol =
    {
      usd: "$",
      eur: "€",
      gbp: "£",
      bdt: "৳",
    }[currency] || currency.toUpperCase();

  const capitalize = (str) => str.charAt(0).toUpperCase() + str.slice(1);

  return (
    <div className="px-0 sm:px-10 pb-10">
      <div className="bg-background/95 backdrop-blur-sm px-5 py-3 rounded-lg mb-6 border-b border-foreground/10">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold">{jobTitle}</h1>
            <p className="hidden sm:block text-sm text-muted">{companyName}</p>
          </div>

          {userRole === "recruiter" ? (
            <Link
              href={`/dashboard/recruiter/jobs/edit/${_id}`}
              className="px-8 py-2 active:opacity-70 bg-foreground/10 dark:bg-foreground/15 rounded-md"
            >
              Edit
            </Link>
          ) : (
            <Button className="bg-indigo-600 hover:bg-indigo-700 rounded-lg">
              Apply Now
            </Button>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <div className="border rounded-lg p-4 flex items-center gap-3">
          <Briefcase className="w-5 h-5 text-muted" />
          <div>
            <p className="text-xs text-muted mb-1">Job Type</p>
            <p className="font-medium capitalize">{jobType}</p>
          </div>
        </div>
        <div className="border rounded-lg p-4 flex items-center gap-3">
          <CircleDollar className="w-5 h-5 text-muted" />
          <div>
            <p className="text-xs text-muted mb-1">Salary Range</p>
            <p className="font-medium">
              {currencySymbol}
              {salaryMin} - {currencySymbol}
              {salaryMax} {currency.toUpperCase()}
            </p>
          </div>
        </div>
        <div className="border rounded-lg p-4 flex items-center gap-3">
          <MapPin className="w-5 h-5 text-muted" />
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
        <div className="border rounded-lg p-4 flex items-center gap-3">
          <Clock className="w-5 h-5 text-muted" />
          <div>
            <p className="text-xs text-muted mb-1">Deadline</p>
            <p className="font-medium">{formatDate(deadline)}</p>
          </div>
        </div>
      </div>

      <div className="mb-6">
        <span className="inline-block bg-indigo-600/10 dark:bg-indigo-600/20 text-indigo-600 dark:text-indigo-400 px-3 py-1 rounded-full text-sm font-medium">
          {capitalize(jobCategory)}
        </span>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-8">
          <section>
            <h2 className="text-xl font-bold mb-3">Responsibilities</h2>
            <div className="text-foreground/80 leading-relaxed whitespace-pre-wrap">
              {responsibilities}
            </div>
          </section>

          <section>
            <h2 className="text-xl font-bold mb-3">Requirements</h2>
            <div className="text-foreground/80 leading-relaxed whitespace-pre-wrap">
              {requirements}
            </div>
          </section>

          {benefits && (
            <section>
              <h2 className="text-xl font-bold mb-3">Benefits</h2>
              <div className="text-foreground/80 leading-relaxed whitespace-pre-wrap">
                {benefits}
              </div>
            </section>
          )}

          <div
            className={`mt-12 justify-center pt-8 border-t border-foreground/10 ${userRole === "recruiter" ? "hidden" : "flex"}`}
          >
            <Button className="bg-indigo-600 hover:bg-indigo-700 rounded-lg px-12 py-6 text-base ">
              Apply Now
            </Button>
          </div>
        </div>

        <div className="lg:col-span-1">
          <div className="border rounded-lg p-5">
            <div className="flex items-center gap-3 mb-4">
              <Avatar className="rounded-lg">
                <Avatar.Image alt={companyName} src="/" />
                <Avatar.Fallback className="rounded-lg">
                  {companyName.charAt(0).toUpperCase()}
                </Avatar.Fallback>
              </Avatar>
              <div>
                <h3 className="font-bold text-lg">{companyName}</h3>
                <div className="flex items-end gap-1 text-sm text-muted">
                  <MapPin />
                  <p>{companyLocation}</p>
                </div>
              </div>
            </div>
            <Button variant="tertiary" className="w-   rounded-lg ">
              Visit Company
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default JobDetails;
