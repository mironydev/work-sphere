"use client";

import { capitalize, formatDate, useSessionClient } from "@/lib/helpers";
import {
  FileLetterX,
  ArrowRight,
  Clock,
  CircleCheckFill,
  PersonPencil,
  Xmark,
} from "@gravity-ui/icons";
import { Chip } from "@heroui/react";
import Link from "next/link";
import DashboardSpinner from "../DashboardSpinner";
import { MoveUpRight } from "lucide-react";

const SeekerApplications = ({ applications }) => {
  const { isPending } = useSessionClient();

  if (isPending) {
    return <DashboardSpinner />;
  }

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

  return (
    <div>
      <div>
        <h1 className="text-3xl font-semibold">My Applications</h1>
        <p className="text-muted mt-1 mb-4">
          {applications.length} applications
        </p>
      </div>

      <div className="overflow-x-auto rounded-lg border dark:bg-foreground/3">
        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-gray-100 dark:bg-foreground/8">
              <th className="px-4 py-4 text-left font-medium text-xs text-muted">
                #
              </th>
              <th className="px-4 py-4 text-left font-medium text-xs text-muted text-nowrap">
                Job Title
              </th>
              <th className="px-4 py-4 text-left font-medium text-xs text-muted">
                Company
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
            {applications.length === 0 ? (
              <tr>
                <td colSpan={6}>
                  <div className="flex flex-col items-center justify-center text-center py-10 bg-white dark:bg-foreground/3 border-t">
                    <FileLetterX className="scale-150" />

                    <span className="text-xl text-muted mt-3 mb-1">
                      No results found
                    </span>

                    <Link
                      href="/jobs"
                      className="text-base bg-foreground/90 text-background px-4 py-2 rounded-lg flex items-center gap-2 mt-2 active:scale-95 duration-100 font-semibold"
                    >
                      Apply to a Job <ArrowRight />
                    </Link>
                  </div>
                </td>
              </tr>
            ) : (
              applications.map((app, i) => {
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
                      <p className="text-base">
                        {app.job.title || "Not found"}
                      </p>

                      <p className="font-light text-xs dark:text-foreground/70">
                        {capitalize(app.job.jobType) || "Not found"}{" "}
                        <span className="opacity-60">•</span>{" "}
                        {app.job.isRemote ? "Remote" : "On-site"}
                      </p>
                    </td>

                    <td className="px-4 py-3">
                      {app.company.name || "Not found"}
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
                        href={`/dashboard/seeker/applications/${app._id}`}
                        className="font-medium text-foreground/80 active:opacity-50 flex items-center gap-1"
                      >
                        <span>Details</span>
                        <MoveUpRight size={10} />
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
  );
};

export default SeekerApplications;
