"use client";

import React from "react";
import {
  Eye,
  Clock,
  CircleCheckFill,
  PersonPencil,
  Xmark,
} from "@gravity-ui/icons";
import { Link, Tooltip, Chip } from "@heroui/react";
import { capitalize, formatDate } from "@/lib/helpers";

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
    <div className="rounded-lg border-t-2 dark:border-t border-white dark:border-foreground/15 overflow-hidden shadow-[0_1px_2px_rgba(0,0,0,0.06)] w-full xl:w-fit">
      {/* Header */}
      <div className="bg-white dark:bg-foreground/10 p-6 border-b border-foreground/10 flex justify-between items-center">
        <h3 className="text-lg font-semibold">Recent Applications</h3>
        <Link
          href="/dashboard/seeker/applications"
          style={{ outline: "none", boxShadow: "none" }}
        >
          View All
          <Link.Icon />
        </Link>
      </div>

      {/* Body */}
      {app.length > 0 ? (
        <div className="bg-white/80 dark:bg-foreground/5 divide-y divide-foreground/10 h-full">
          {app.slice(0, 10).map((app) => {
            const status = statusMap[app.status.toLowerCase()] || {
              color: "default",
              icon: null,
            };
            return (
              <div
                key={app._id}
                className="px-6 py-4.25 hover:bg-foreground/2 transition-colors"
              >
                <div className="flex items-center justify-between gap-3">
                  {/* Left: Job Info */}
                  <div className="flex-1">
                    <div className="flex flex-col sm:flex-row xl:flex-col sm:gap-3 xl:gap-0">
                      <div>
                        <p className="font-semibold text-sm">{app.job.title}</p>
                        <p className="text-sm text-muted">{app.company.name}</p>
                      </div>
                      <span className="text-muted hidden sm:block xl:hidden">
                        •
                      </span>
                      <p className="text-xs text-muted text-nowrap mt-1 xl:mt-0">
                        {formatDate(app.createdAt)}
                      </p>
                    </div>
                  </div>

                  {/* Middle: Status */}
                  <div>
                    <Chip color={status.color}>
                      {status.icon}
                      <Chip.Label>{capitalize(app.status)}</Chip.Label>
                    </Chip>
                  </div>

                  {/* Right: Actions */}
                  <div className="flex gap-2">
                    <Tooltip delay={500} closeDelay={0}>
                      <Tooltip.Trigger>
                        <Link
                          href={`/dashboard/seeker/applications/${app._id}`}
                          className="p-2 hover:bg-foreground/5 rounded-sm cursor-pointer transition-colors"
                        >
                          {" "}
                          <Eye className="w-4 h-4" />
                        </Link>
                      </Tooltip.Trigger>
                      <Tooltip.Content
                        showArrow
                        offset={8}
                        className={"px-2 rounded-md"}
                      >
                        <Tooltip.Arrow />
                        <p>View</p>
                      </Tooltip.Content>
                    </Tooltip>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <div className="px-8 flex py-14 xl:pt-28 text-sm text-muted bg-white/80 dark:bg-foreground/5 h-full">
          <p className="mx-auto">
            No applications yet. Start applying to jobs!
          </p>
        </div>
      )}
    </div>
  );
};

export default RecentApplications;
