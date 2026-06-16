"use client";

import React from "react";
import { Persons, Thunderbolt, SquareXmark, File } from "@gravity-ui/icons";
import { Button, Chip, Table } from "@heroui/react";

const RecruiterHomepage = () => {
  return (
    <div className="md:pl-5">
      <div>
        <p className="text-2xl font-semibold">Dashboard</p>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 mt-5 gap-4">
          <div className="bg-foreground/5 dark:bg-foreground/3 border border-foreground/15 rounded-lg p-4">
            <div className="p-2 bg-foreground/10 w-fit rounded-md">
              <File />
            </div>
            <p className="text-sm font-medium pt-4 pb-1">Total Job Posts</p>
            <p className="text-2xl font-bold">0</p>
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

            <Button
              className="rounded-md ring-transparent font-normal"
              variant="ghost"
            >
              View all
            </Button>
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
            <Button
              className="rounded-md ring-transparent font-normal"
              variant="ghost"
            >
              View all
            </Button>
          </div>
          <div className="rounded-lg border border-foreground/15 mt-3 p-6 bg-foreground/5">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 bg-foreground/10 rounded-lg flex justify-center items-center font-bold">
                  G
                </div>
                <div>
                  <p className="font-semibold">Google Inc.</p>
                  <p className="text-xs opacity-60 hidden sm:block">
                    Technology • Mountain View
                  </p>
                </div>
              </div>
              <div className="flex flex-col items-end">
                <p className="font-semibold">0</p>
                <p className="text-xs opacity-80 text-right">ACTIVE JOBS</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RecruiterHomepage;
