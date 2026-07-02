"use client";

import { formatDate, useSessionClient } from "@/lib/helpers";
import { FileLetterX, ArrowRight } from "@gravity-ui/icons";
import { EmptyState, Spinner, Table } from "@heroui/react";
import Link from "next/link";
import React from "react";

const SeekerApplications = ({ applications }) => {
  const { isPending } = useSessionClient();

  if (isPending) {
    return (
      <div className="flex justify-center items-center mt-10 md:mt-16">
        <Spinner color="current" size="xl" />
      </div>
    );
  }

  return (
    <div className="md:pl-5">
      <div className="flex flex-col sm:flex-row items-start sm:items-end gap-5 text-xs">
        <p className="text-3xl font-semibold">My Applications</p>
        <div className="shadow-[inset_0_0_5px_rgba(0,0,0,0.3)] dark:shadow-[inset_0_0_5px_rgba(255,255,255,0.3)] px-3 py-1 rounded-sm">
          Total applications:{" "}
          <span className="font-medium">{applications.length}</span>
        </div>
      </div>
      <Table
        className="rounded-lg p-0 border border-foreground/15 mt-6 bg-background dark:bg-foreground/3"
        variant="secondary"
      >
        <Table.ScrollContainer>
          <Table.Content aria-label="Job applications">
            <Table.Header>
              <Table.Column isRowHeader className={"py-4 rounded-none"}>
                Job Title
              </Table.Column>
              <Table.Column>Company</Table.Column>
              <Table.Column>Applied Date</Table.Column>
              <Table.Column className={"rounded-none"}>Actions</Table.Column>
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
              {applications.map((application) => (
                <Table.Row key={application._id}>
                  <Table.Cell className={"rounded-none py-5 font-medium"}>
                    {application.jobTitle}
                  </Table.Cell>
                  <Table.Cell>{application.companyName}</Table.Cell>
                  <Table.Cell>{formatDate(application.createdAt)}</Table.Cell>
                  <Table.Cell className={"rounded-none"}>
                    <div className="flex gap-1">
                      <Link
                        href={`/dashboard/seeker/applications/${application._id}`}
                        className="cursor-pointer p-2 hover:bg-foreground/5 rounded-sm duration-75"
                      >
                        View
                      </Link>
                    </div>
                  </Table.Cell>
                </Table.Row>
              ))}
            </Table.Body>
          </Table.Content>
        </Table.ScrollContainer>
      </Table>
    </div>
  );
};

export default SeekerApplications;
