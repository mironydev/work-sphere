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
import { Chip, EmptyState, Spinner, Table } from "@heroui/react";
import { useTheme } from "next-themes";
import Link from "next/link";

const SeekerApplications = ({ applications }) => {
  const { isPending } = useSessionClient();

  const { resolvedTheme } = useTheme();
  const isDark = resolvedTheme === "dark";

  if (isPending) {
    return (
      <div className="flex justify-center items-center mt-10 md:mt-16">
        <Spinner color="current" size="xl" />
      </div>
    );
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
      <div className="">
        <h2 className="text-3xl font-semibold">My Applications</h2>
        <p className="text-muted mt-1">{applications.length} applications</p>
      </div>
      <Table
        className="rounded-lg p-0 border-t border-x dark:border-foreground/15 mt-6 bg-background dark:bg-foreground/5 shadow-[0_1px_2px_rgba(0,0,0,0.06)]"
        variant={isDark ? "secondary" : "primary"}
      >
        <Table.ScrollContainer>
          <Table.Content aria-label="Job applications">
            <Table.Header>
              <Table.Column
                isRowHeader
                className={
                  "py-4 rounded-none bg-white/5 border-b dark:border-0"
                }
              >
                Job Title
              </Table.Column>
              <Table.Column className={"bg-white/5 border-b dark:border-0"}>
                Company
              </Table.Column>
              <Table.Column
                className={"bg-white/5 border-b dark:border-0 text-center"}
              >
                Applied
              </Table.Column>
              <Table.Column
                className={"bg-white/5 border-b dark:border-0 text-center"}
              >
                Status
              </Table.Column>
              <Table.Column
                className={
                  "rounded-none bg-white/5 border-b dark:border-0 text-center"
                }
              >
                Actions
              </Table.Column>
            </Table.Header>
            <Table.Body
              renderEmptyState={() => (
                <EmptyState className="flex h-full w-full flex-col items-center justify-center gap-3 text-center py-10">
                  <FileLetterX className="scale-150" />
                  <span className="text-xl text-muted">No results found</span>
                  <Link
                    href={"/jobs"}
                    className="text-base bg-foreground/90 text-background px-4 py-2 rounded-lg flex items-center gap-2 mt-2 active:scale-95 duration-100 font-semibold"
                  >
                    Apply to a Job <ArrowRight />
                  </Link>
                </EmptyState>
              )}
            >
              {applications.map((app) => {
                const status = statusMap[app.status.toLowerCase()] || {
                  color: "default",
                  icon: null,
                };
                return (
                  <Table.Row key={app._id}>
                    <Table.Cell className={"rounded-none py-"}>
                      <p className="text-lg">{app.job.title || "Not found"}</p>
                      <p className="font-light dark:text-foreground/70">
                        {capitalize(app.job.jobType) || "Not found"} •{" "}
                        {app.job.isRemote ? "Remote" : "On-site" || "Not found"}
                      </p>
                    </Table.Cell>
                    <Table.Cell>{app.company.name || "Not found"}</Table.Cell>
                    <Table.Cell className={"text-center"}>
                      {formatDate(app.createdAt) || "Not found"}
                    </Table.Cell>
                    <Table.Cell className={"text-center"}>
                      <Chip color={status.color}>
                        {status.icon}
                        <Chip.Label>
                          {capitalize(app.status) || "Not found"}
                        </Chip.Label>
                      </Chip>
                    </Table.Cell>
                    <Table.Cell className={"rounded-none"}>
                      <div className="flex gap-1 justify-center">
                        <Link
                          href={`/dashboard/seeker/applications/${app._id}`}
                          className="cursor-pointer px-6 py-2 hover:bg-foreground/5 active:bg-foreground/10 rounded-sm duration-75 font-medium text-foreground/85"
                        >
                          View Details
                        </Link>
                      </div>
                    </Table.Cell>
                  </Table.Row>
                );
              })}
            </Table.Body>
          </Table.Content>
        </Table.ScrollContainer>
      </Table>
    </div>
  );
};

export default SeekerApplications;
