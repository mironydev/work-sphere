"use client";

import React from "react";
import {
  FileLetterX,
  PersonPencil,
  CircleCheckFill,
  Xmark,
  Clock,
  Eye,
} from "@gravity-ui/icons";
import { Chip } from "@heroui/react";
import Link from "next/link";
import { capitalize, formatDate, useSessionClient } from "@/lib/helpers";
import DashboardSpinner from "../DashboardSpinner";

const RecruiterHomepage = ({
  totalApplications,
  totalJobs,
  recentApplications,
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
    { label: "Active Jobs", value: activeJobs },
    { label: "Total Applications", value: totalApplications },
    { label: "Pending Review", value: pendingReview },
    { label: "Total Jobs Posted", value: totalJobs },
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
        <div className="grid grid-cols-2 lg:grid-cols-4 mt-4 gap-4">
          {stats.map((stat, i) => (
            <div
              key={i}
              className="flex flex-col justify-between gap-3 bg-white dark:bg-foreground/5 rounded-lg p-4 border"
            >
              <p className="text-xs opacity-70 overflow-hidden">{stat.label}</p>
              <p className="text-3xl font-medium overflow-hidden leading-none">
                {stat.value}
              </p>
            </div>
          ))}
        </div>
      </div>
      <div className="mt-10">
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
              {recentApplications?.length === 0 ? (
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
                recentApplications?.map((app, i) => {
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
    </div>
  );
};

export default RecruiterHomepage;
