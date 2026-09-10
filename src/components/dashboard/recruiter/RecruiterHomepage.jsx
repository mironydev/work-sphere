"use client";

import React from "react";
import {
  Persons,
  Thunderbolt,
  File,
  FileLetterX,
  PersonPencil,
  CircleCheckFill,
  Xmark,
  Clock,
  Eye,
} from "@gravity-ui/icons";
import { Avatar, Chip, Table, EmptyState } from "@heroui/react";
import Link from "next/link";
import RecruiterAddCompanyModal from "./RecruiterAddCompanyModal";
import { capitalize, formatDate, useSessionClient } from "@/lib/helpers";
import DashboardSpinner from "../DashboardSpinner";

const RecruiterHomepage = ({
  totalApplications,
  totalJobs,
  recentApplications,
  topCompanies,
  pendingReview,
  activeJobs,
}) => {
  const { isPending } = useSessionClient();

  const statusMap = {
    applied: {
      color: "default",
      icon: null,
    },
    reviewing: {
      color: "warning",
      icon: <Clock width={12} />,
    },
    shortlisted: {
      color: "default",
      icon: <CircleCheckFill width={12} />,
    },
    interviewing: {
      color: "accent",
      icon: <PersonPencil width={12} />,
    },
    offered: {
      color: "success",
      icon: <CircleCheckFill width={12} />,
    },
    rejected: {
      color: "danger",
      icon: <Xmark width={12} />,
    },
  };

  const stats = [
    { icon: Thunderbolt, label: "Active Jobs", value: activeJobs },
    { icon: Persons, label: "Total Applications", value: totalApplications },
    { icon: Clock, label: "Pending Review", value: pendingReview },
    { icon: File, label: "Total Jobs Posted", value: totalJobs },
  ];

  if (isPending) {
    return <DashboardSpinner />;
  }

  return (
    <div>
      <div>
        <h1 className="text-3xl font-semibold">Dashboard</h1>
        <p className="mt-1 text-muted">
          Track jobs, applications, and hiring activity in one place.
        </p>

        {/*Stats*/}
        <div className="grid grid-cols-2 lg:grid-cols-4 mt-5 gap-4">
          {stats.map(({ icon: Icon, label, value }) => (
            <div
              key={label}
              className="bg-white dark:bg-foreground/5 rounded-lg p-4 border"
            >
              <div className="p-2 bg-foreground/5 dark:bg-foreground/10 w-fit rounded-md">
                <Icon />
              </div>

              <p className="text-sm font-medium pt-4 pb-1">{label}</p>
              <p className="text-2xl font-bold">{value}</p>
            </div>
          ))}
        </div>
      </div>
      <div className="flex flex-col lg:flex-row mt-10 gap-10 md:gap-5">
        <div className="flex-1">
          <div className="flex justify-between items-center mb-3">
            <p className="text-xl font-semibold">Recent Applications</p>

            <Link
              href={"/dashboard/recruiter/applications"}
              className="text-sm hover:underline text-nowrap active:text-foreground/50 mr-2"
            >
              View all
            </Link>
          </div>

          {/*Recent Applications*/}
          <div className="overflow-x-auto rounded-lg dark:bg-foreground/3 border">
            <table className="w-full border-collapse">
              <thead>
                <tr className="bg-gray-100 dark:bg-foreground/8">
                  <th className="px-4 py-4 text-left font-medium text-xs text-muted">
                    #
                  </th>

                  <th className="px-4 py-4 text-left font-medium text-xs text-muted">
                    Applicant
                  </th>

                  <th className="px-4 py-4 text-left font-medium text-xs text-muted text-nowrap">
                    Job Title
                  </th>

                  <th className="px-4 py-4 text-left font-medium text-xs text-muted">
                    Applied
                  </th>

                  <th className="px-4 py-4 text-left font-medium text-xs text-muted">
                    Status
                  </th>

                  <th className="px-4 py-4 text-left font-medium text-xs text-muted">
                    Actions
                  </th>
                </tr>
              </thead>

              <tbody>
                {recentApplications.length === 0 ? (
                  <tr>
                    <td colSpan={6}>
                      <div className="flex flex-col items-center justify-center text-center py-10 bg-white dark:bg-transparent border-t border-foreground/10">
                        <FileLetterX className="scale-150" />

                        <span className="text-xl text-muted mt-3 mb-1">
                          No applications yet
                        </span>

                        <p className="text-sm text-muted">
                          Applications for your jobs will show up here.
                        </p>
                      </div>
                    </td>
                  </tr>
                ) : (
                  recentApplications.map((app, i) => {
                    const status = statusMap[app.status.toLowerCase()] || {
                      color: "default",
                      icon: null,
                    };

                    return (
                      <tr
                        key={app._id}
                        className="border-t border-foreground/10 bg-white dark:border-white/10 dark:bg-foreground/3 hover:bg-gray-50 dark:hover:bg-foreground/5 transition-colors text-sm"
                      >
                        <td className="px-4 py-3 text-muted">{i + 1}</td>

                        <td className="px-4 py-3 text-nowrap">
                          <p className="font-medium">
                            {app.user.name || "Not found"}
                          </p>
                        </td>

                        <td className="px-4 py-3 text-nowrap">
                          {app.job.title || "Not found"}
                        </td>

                        <td className="px-4 py-3 text-nowrap">
                          {formatDate(app.createdAt) || "Not found"}
                        </td>

                        <td className="px-4 py-3">
                          <Chip color={status.color}>
                            {status.icon}

                            <Chip.Label>
                              {capitalize(app.status) || "Not found"}
                            </Chip.Label>
                          </Chip>
                        </td>

                        <td className="px-4 py-3">
                          <Link
                            href={`/dashboard/recruiter/applications/${app._id}`}
                            title="View"
                            className="inline-flex active:opacity-70 p-1.25 hover:bg-foreground/5 rounded-sm"
                          >
                            <Eye />
                          </Link>
                        </td>
                      </tr>
                    );
                  })
                )}
              </tbody>
            </table>
          </div>
        </div>
        <div className="lg:max-w-80">
          <div className="flex justify-between items-center">
            <p className="text-xl font-semibold">My Top Companies</p>
            <Link
              href={"/dashboard/recruiter/company"}
              className="text-sm hover:underline text-nowrap active:text-foreground/50 mr-2"
            >
              View all
            </Link>
          </div>

          {/*My Top Companies*/}
          {topCompanies.length > 0 ? (
            topCompanies.map((comp, i) => (
              <div
                key={i}
                className="rounded-lg mt-3 p-4 sm:flex-1 bg-white dark:bg-foreground/5 border"
              >
                <div className="flex items-center justify-between gap-2">
                  <div className="flex items-center gap-3 min-w-0">
                    <Avatar className="rounded-lg bg-transparent">
                      <Avatar.Image alt={comp.companyName} src={comp.logo} />
                      <Avatar.Fallback className="rounded-lg">
                        {comp.companyName.charAt(0).toUpperCase()}
                      </Avatar.Fallback>
                    </Avatar>
                    <div className="min-w-0">
                      <p className="font-semibold overflow-hidden">
                        {comp.companyName}
                      </p>
                      <p className="text-xs opacity-60 overflow-hidden mt-0.5">
                        {comp.location}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="flex flex-col items-center gap-3 rounded-lg mt-3 p-10 lg:min-w-80 bg-white dark:bg-foreground/5 border">
              <p className="text-foreground/50 text-center mb-1">
                You don&apos;t have any company
              </p>
              <RecruiterAddCompanyModal />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default RecruiterHomepage;
