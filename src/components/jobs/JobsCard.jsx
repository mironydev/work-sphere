import { capitalize, truncate } from "@/lib/helpers";
import {
  ArrowUpRight,
  Briefcase,
  CircleDollar,
  MapPin,
} from "@gravity-ui/icons";
import { Avatar, Button } from "@heroui/react";
import Link from "next/link";
import React from "react";

const JobsCard = ({ job }) => {
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

  const currencySymbol = {
    usd: "$",
    eur: "€",
    gbp: "£",
    bdt: "৳",
  }[currency];

  return (
    <Link
      href={`/jobs/${_id}`}
      className="flex flex-col justify-between p-6 rounded-xl bg-background dark:bg-foreground/10 sm:dark:bg-foreground/5 border"
    >
      <div>
        <div className="flex items-center gap-2 mb-3">
          <Avatar size="sm" className="rounded-lg bg-transparent">
            <Avatar.Image alt={companyName} src={companyLogo} />
            <Avatar.Fallback className="rounded-lg">
              {companyName.charAt(0).toUpperCase()}
            </Avatar.Fallback>
          </Avatar>
          <p>{companyName}</p>
        </div>
        <h3 className="text-3xl">{jobTitle}</h3>
        <p className="text-stone-600 dark:text-stone-300 mt-3">
          {truncate(responsibilities, 80)}
        </p>
        <div className="flex flex-wrap gap-1 space-y-0.5 my-6 text-xs">
          {city && (
            <div className="bg-white dark:bg-[#2c2c2e] px-2.5 py-1.5 rounded-full flex items-center gap-1">
              <span>
                <MapPin />
              </span>
              <p>
                {city}, {country}
              </p>
            </div>
          )}
          <div className="bg-white dark:bg-[#2c2c2e] px-2.5 py-1.5 rounded-full flex items-center gap-1">
            <span>
              <Briefcase />
            </span>
            <p>{capitalize(jobType)}</p>
          </div>
          <div className="bg-white dark:bg-[#2c2c2e] px-2.5 py-1.5 rounded-full flex items-center gap-1">
            <span>
              <CircleDollar />
            </span>
            <p>
              {currencySymbol}
              {salaryMin} - {currencySymbol}
              {salaryMax} {currency.toUpperCase()}
            </p>
          </div>{" "}
        </div>
      </div>
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
  );
};

export default JobsCard;
