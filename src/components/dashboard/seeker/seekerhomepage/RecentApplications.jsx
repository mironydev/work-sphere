"use client";

import React from "react";
import {
  Eye,
  Clock,
  CircleCheckFill,
  PersonPencil,
  Xmark,
} from "@gravity-ui/icons";
import { Tooltip, Chip } from "@heroui/react";
import { capitalize, formatDate } from "@/lib/helpers";
import Link from "next/link";

const RecentApplications = ({ applications }) => {
  const app = applications
    .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
    .slice(0, 3);

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
    <div className="rounded-lg overflow-hidden w-full xl:w-fit lg:flex-1 border dark:bg-foreground/3">
      {/* Header */}
      <div className="bg-gray-100 dark:bg-foreground/8 px-6 py-4 border-b border-foreground/10 flex justify-between items-center">
        <h3>Recent Applications</h3>
        <Link
          href="/dashboard/seeker/applications"
          className="text-sm hover:underline text-nowrap active:text-foreground/50"
        >
          View All
        </Link>
      </div>

      {/* Body */}
      {app.length > 0 ? (
        <div className="bg-white dark:bg-foreground/3 divide-y divide-foreground/10 h-full">
          {app.slice(0, 10).map((app) => {
            const status = statusMap[app.status.toLowerCase()] || {
              color: "default",
              icon: null,
            };
            return (
              <Link
                href={`/dashboard/seeker/applications/${app._id}`}
                key={app._id}
                className="block p-4  hover:bg-foreground/2 transition-colors"
              >
                <div className="flex items-center justify-between gap-3">
                  {/* Left: Job Info */}
                  <div>
                    <p className="font-semibold text-sm">{app.job.title}</p>
                    <div className="flex items-center gap-2">
                      <p className="text-xs text-muted">{app.company.name}</p>
                      <span className="text-muted text-xs">•</span>
                      <p className="text-xs text-muted text-nowrap">
                        {formatDate(app.createdAt)}
                      </p>
                    </div>
                  </div>

                  {/* Right: Status */}
                  <div>
                    <Chip color={status.color}>
                      {status.icon}
                      <Chip.Label>{capitalize(app.status)}</Chip.Label>
                    </Chip>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      ) : (
        <div className="px-8 flex py-14 lg:pt-28 text-sm text-muted bg-white dark:bg-foreground/3 h-full">
          <p className="mx-auto">
            No applications yet. Start applying to jobs!
          </p>
        </div>
      )}
    </div>
  );
};

export default RecentApplications;
