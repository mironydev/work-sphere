"use client";
import { deleteJob } from "@/lib/actions/jobs";
import { Plus, Eye, TrashBin, Pencil } from "@gravity-ui/icons";
import { Button, Table, AlertDialog } from "@heroui/react";
import Link from "next/link";
import React from "react";
import { toast } from "sonner";

const RecruiterAllJobs = ({ allJobs }) => {
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });
  };
  const capitalize = (str) => str.charAt(0).toUpperCase() + str.slice(1);

  const handleJobDelete = async (jobId) => {
    const res = await deleteJob(jobId);
    if (res.deletedCount) {
      toast.success("Job Deleted");
    } else {
      toast.error("Something went wrong");
    }
  };

  if (!allJobs.length) {
    return (
      <div className="sm:px-10">
        <div className="bg-foreground/5 rounded-md text-center py-12">
          <p className="text-4xl font-medium">No Jobs Found</p>
          <p className="text-muted mt-2 mb-8">
            Create a job posting to start attracting candidates.
          </p>
          <Link href={"/dashboard/recruiter/jobs/new"} className="">
            <Button
              className={"bg-foreground text-background"}
              variant="tertiary"
            >
              <Plus /> Add a job
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="sm:px-10">
      <div className="flex flex-col gap-5 sm:flex-row justify-between">
        <p className="text-3xl font-semibold">Manage Your Jobs</p>

        <Link href={"/dashboard/recruiter/jobs/new"} className="">
          <Button
            className={"bg-foreground text-background"}
            variant="tertiary"
          >
            <Plus /> Add a job
          </Button>
        </Link>
      </div>
      <Table className="rounded-lg p-0 border border-foreground/15 mt-6">
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
                Job Title
              </Table.Column>
              <Table.Column>Company</Table.Column>
              <Table.Column>Location</Table.Column>
              <Table.Column>Job Type</Table.Column>
              <Table.Column>Deadline</Table.Column>
              <Table.Column>Actions</Table.Column>
            </Table.Header>
            <Table.Body>
              {allJobs.map((job) => (
                <Table.Row key={job._id}>
                  <Table.Cell className={"rounded-none py-5 font-medium"}>
                    {job.jobTitle}
                  </Table.Cell>
                  <Table.Cell>{job.companyName}</Table.Cell>
                  <Table.Cell>
                    {job.jobType === "remote"
                      ? "Remote"
                      : `${job.city}, ${job.country}`}
                  </Table.Cell>
                  <Table.Cell>
                    <div className="flex flex-col">
                      <p className="font-medium">{capitalize(job.jobType)}</p>
                      <p className="text-xs text-muted">
                        {capitalize(job.jobCategory)}
                      </p>
                    </div>
                  </Table.Cell>
                  <Table.Cell>{formatDate(job.deadline)}</Table.Cell>
                  <Table.Cell className={"rounded-none"}>
                    <div className="flex gap-1">
                      <Link
                        href={`/dashboard/recruiter/jobs/${job._id}`}
                        className=" cursor-pointer p-2 hover:bg-foreground/5 rounded-sm duration-75"
                      >
                        <Eye />
                      </Link>
                      <Link
                        href={`/dashboard/recruiter/jobs/edit/${job._id}`}
                        className="hover:text-blue-500 dark:hover:text-blue-400 active:text-blue-400 cursor-pointer p-2 hover:bg-foreground/5 active:bg-foreground/5 rounded-sm duration-75"
                      >
                        <Pencil />
                      </Link>

                      <AlertDialog>
                        <AlertDialog.Trigger>
                          <span className="text-red-400 dark:text-red-500 flex p-2 hover:bg-foreground/5 active:bg-foreground/5 rounded-sm duration-75">
                            <TrashBin />
                          </span>
                        </AlertDialog.Trigger>
                        <AlertDialog.Backdrop>
                          <AlertDialog.Container>
                            <AlertDialog.Dialog className="rounded-xl">
                              <AlertDialog.CloseTrigger />
                              <AlertDialog.Header>
                                <AlertDialog.Icon status="danger" />
                                <AlertDialog.Heading>
                                  Delete job permanently?
                                </AlertDialog.Heading>
                              </AlertDialog.Header>
                              <AlertDialog.Body>
                                <p>
                                  This will permanently delete the job{" "}
                                  <strong>{job.jobTitle}</strong>. This action
                                  cannot be undone.
                                </p>
                              </AlertDialog.Body>
                              <AlertDialog.Footer>
                                <Button
                                  slot="close"
                                  variant="tertiary"
                                  className="rounded-lg"
                                >
                                  Cancel
                                </Button>
                                <Button
                                  slot="close"
                                  variant="danger"
                                  className="rounded-lg"
                                  onClick={() => handleJobDelete(job._id)}
                                >
                                  Delete Job
                                </Button>
                              </AlertDialog.Footer>
                            </AlertDialog.Dialog>
                          </AlertDialog.Container>
                        </AlertDialog.Backdrop>
                      </AlertDialog>
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

export default RecruiterAllJobs;
