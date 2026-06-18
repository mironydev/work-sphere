"use client";

import React from "react";
import {
  Persons,
  Thunderbolt,
  SquareXmark,
  File,
  Plus,
} from "@gravity-ui/icons";
import { Avatar, Chip, Table } from "@heroui/react";
import Link from "next/link";
import RecruiterAddCompanyModal from "./RecruiterAddCompanyModal";

const RecruiterHomepage = ({ totalJobs, topCompanies }) => {
  const capitalize = (str) => str.charAt(0).toUpperCase() + str.slice(1);
  const getJobCount = (companyId) => {
    return totalJobs.filter(
      (job) => String(job.companyId) === String(companyId),
    ).length;
  };

  return (
    <div className="md:pl-5">
      <div>
        <p className="text-2xl font-semibold">Dashboard</p>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 mt-5 gap-4">
          <div className="bg-foreground/5 dark:bg-foreground/3 border border-foreground/15 rounded-lg p-4">
            <div className="flex items-center justify-between">
              <div className="p-2 bg-foreground/10 w-fit rounded-md">
                <File />
              </div>
              <Link
                href={"/dashboard/recruiter/jobs/new"}
                className="p-1 bg-indigo-500 hover:bg-indigo-500/80 text-white dark:bg-indigo-600/80 dark:hover:bg-indigo-600 duration-75 font-bold w-fit rounded-sm active:scale-95"
              >
                <Plus />
              </Link>
            </div>
            <p className="text-sm font-medium pt-4 pb-1">Total Job Posts</p>
            <p className="text-2xl font-bold">{totalJobs.length}</p>
          </div>
          <div className="bg-foreground/5 dark:bg-foreground/3 border border-foreground/15 rounded-lg p-4">
            <div className="p-2 bg-foreground/10 w-fit rounded-md">
              <Persons />
            </div>
            <p className="text-sm font-medium pt-4 pb-1">Total Applicants</p>
            <p className="text-2xl font-bold">0</p>
          </div>
          <div className="bg-foreground/5 dark:bg-foreground/3 border border-foreground/15 rounded-lg p-4">
            <div className="p-2 bg-foreground/10 w-fit rounded-md">
              <Thunderbolt />
            </div>
            <p className="text-sm font-medium pt-4 pb-1">Active Jobs</p>
            <p className="text-2xl font-bold">0</p>
          </div>
          <div className="bg-foreground/5 dark:bg-foreground/3 border border-foreground/15 rounded-lg p-4">
            <div className="p-2 bg-foreground/10 w-fit rounded-md">
              <SquareXmark />
            </div>
            <p className="text-sm font-medium pt-4 pb-1">Jobs Closed</p>
            <p className="text-2xl font-bold">0</p>
          </div>
        </div>
      </div>
      <div className="flex flex-col lg:flex-row mt-10 gap-10 md:gap-5">
        <div className="flex-2">
          <div className="flex justify-between items-center">
            <p className="text-xl font-semibold">Recent Applications</p>

            <Link
              href={"/dashboard/recruiter"}
              className="rounded-md hover:bg-foreground/10 active:bg-foreground/10 px-4 py-2 text-sm duration-100"
              variant="ghost"
            >
              View all
            </Link>
          </div>
          <Table className="rounded-lg p-0 border border-foreground/15 mt-3">
            <Table.ScrollContainer>
              <Table.Content aria-label="Team members">
                <Table.Header
                  style={{
                    border: "1px solid rgb(220, 38, 38)",
                    padding: "2.5rem",
                    margin: "2.5rem",
                  }}
                >
                  <Table.Column isRowHeader className={"py-4"}>
                    Candidate Name
                  </Table.Column>
                  <Table.Column>Role</Table.Column>
                  <Table.Column>Date Applied</Table.Column>
                  <Table.Column>Experience</Table.Column>
                  <Table.Column>Status</Table.Column>
                </Table.Header>
                <Table.Body>
                  <Table.Row>
                    <Table.Cell className={"rounded-none py-5 font-bold"}>
                      Kate Moore
                    </Table.Cell>
                    <Table.Cell>SWE</Table.Cell>
                    <Table.Cell>Jan 01, 2026</Table.Cell>
                    <Table.Cell>5 years</Table.Cell>
                    <Table.Cell className={"rounded-none"}>
                      <Chip color="warning">Reviewing</Chip>
                    </Table.Cell>
                  </Table.Row>
                </Table.Body>
              </Table.Content>
            </Table.ScrollContainer>
          </Table>
        </div>
        <div className="flex-1">
          <div className="flex justify-between items-center">
            <p className="text-xl font-semibold">My Top Companies</p>
            <Link
              href={"/dashboard/recruiter/company"}
              className="rounded-md hover:bg-foreground/10 active:bg-foreground/10 px-4 py-2 text-sm duration-100"
              variant="ghost"
            >
              View all
            </Link>
          </div>
          {topCompanies.length ? (
            topCompanies.map((comp) => (
              <div
                key={comp._id}
                className="rounded-lg border border-foreground/15 mt-3 p-6 bg-foreground/5"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Avatar className="rounded-lg">
                      <Avatar.Image alt={comp.companyName} src={comp.logo} />
                      <Avatar.Fallback className="rounded-lg">
                        {comp.companyName.charAt(0).toUpperCase()}
                      </Avatar.Fallback>
                    </Avatar>
                    <div>
                      <p className="font-semibold">{comp.companyName}</p>
                      <p className="text-xs opacity-60">
                        {capitalize(comp.industry)} <br /> {comp.location}
                      </p>
                    </div>
                  </div>
                  <div className="flex flex-col items-end">
                    <p className="font-semibold">{getJobCount(comp._id)}</p>
                    <p className="text-xs opacity-80 text-right">ACTIVE JOBS</p>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="flex flex-col items-center gap-2 pt-3 justify-center">
              <p className="text-lg text-foreground/50">
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
