"use client";
import { deleteJob, toggleJobActive } from "@/lib/actions/jobs";
import { Pencil, EllipsisVertical, FileLetterX } from "@gravity-ui/icons";
import {
  Button,
  AlertDialog,
  Separator,
  Dropdown,
  Label,
  Pagination,
} from "@heroui/react";
import Link from "next/link";
import React, { useState } from "react";
import { toast } from "sonner";
import { capitalize, formatDate, useSessionClient } from "@/lib/helpers";
import DashboardSpinner from "../DashboardSpinner";
import { Eye, EyeOff, Plus, Trash2 } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";

const RecruiterAllJobs = ({ jobsData }) => {
  const { jobs, totalJobs, totalPages, currentPage, limit } = jobsData;

  const router = useRouter();
  const searchParams = useSearchParams();
  const [jobToDelete, setJobToDelete] = useState(null);
  const [isDeleting, setIsDeleting] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [jobToPause, setJobToPause] = useState(null);
  const [isPausing, setIsPausing] = useState(false);
  const [isPauseDialogOpen, setIsPauseDialogOpen] = useState(false);
  const { isPending } = useSessionClient();

  const startIndex = (currentPage - 1) * limit;
  const start = startIndex + 1;
  const end = Math.min(startIndex + limit, totalJobs);

  const handlePageChange = (newPage) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("page", newPage.toString());
    router.push(`?${params.toString()}`);
  };

  const handleAction = async (key, job) => {
    switch (key) {
      case "view":
        router.push(`/dashboard/recruiter/jobs/${job._id}`);
        break;
      case "edit":
        router.push(`/dashboard/recruiter/jobs/edit/${job._id}`);
        break;
      case "unpublishJob":
        setJobToPause(job);
        setIsPauseDialogOpen(true);
        break;
      case "delete":
        setJobToDelete(job);
        setIsDeleteDialogOpen(true);
        break;
    }
  };

  const handleConfirmDelete = async () => {
    if (!jobToDelete) return;
    try {
      setIsDeleting(true);
      const res = await deleteJob(jobToDelete._id);
      if (res.deletedCount) {
        toast.success("Job Deleted");
      } else {
        toast.error("Something went wrong");
      }
    } catch (error) {
      toast.error("Something went wrong");
    } finally {
      setIsDeleting(false);
      setIsDeleteDialogOpen(false);
      setJobToDelete(null);
    }
  };

  const handleConfirmPauseToggle = async () => {
    if (!jobToPause) return;
    try {
      setIsPausing(true);
      const res = await toggleJobActive(jobToPause._id, !jobToPause.isActive);
      if (res.modifiedCount) {
        toast.success(
          jobToPause.isActive ? "Job unpublished" : "Job republished",
        );
        router.refresh();
      } else {
        toast.error("Something went wrong");
      }
    } catch (error) {
      toast.error("Something went wrong");
    } finally {
      setIsPausing(false);
      setIsPauseDialogOpen(false);
      setJobToPause(null);
    }
  };

  if (isPending) {
    return <DashboardSpinner />;
  }

  return (
    <div>
      <div className="flex flex-col gap-5 sm:flex-row sm:items-end justify-between">
        <div>
          <h1 className="text-3xl font-semibold">Manage Your Jobs</h1>
          <p className="mt-1 opacity-70">
            Create, edit, and manage your job postings in one place.
          </p>
        </div>

        <Link
          href="/dashboard/recruiter/new"
          className="bg-foreground text-background rounded-md pl-3 pr-4 py-1.5  flex items-center gap-1 w-fit active:scale-95 duration-100 font-semibold"
        >
          <Plus size={15} />
          <span>Add a Job</span>
        </Link>
      </div>
      <div className="mt-6">
        <div className="overflow-x-auto rounded-t-lg dark:bg-foreground/3 border">
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
                  Location
                </th>

                <th className="px-4 py-4 text-left font-medium text-xs text-muted text-nowrap">
                  Job Type
                </th>

                <th className="px-4 py-4 text-left font-medium text-xs text-muted">
                  Deadline
                </th>

                <th className="px-4 py-4 text-left font-medium text-xs text-muted">
                  Action
                </th>
              </tr>
            </thead>

            <tbody>
              {jobs.length === 0 ? (
                <tr>
                  <td colSpan={7}>
                    <div className="flex flex-col items-center justify-center text-center py-10 bg-white dark:bg-foreground/5 border-t">
                      <FileLetterX className="scale-150 mb-3" />

                      <span className="text-xl text-muted">No jobs yet</span>

                      <p className="text-sm text-muted">
                        Jobs will show up here.
                      </p>
                    </div>
                  </td>
                </tr>
              ) : (
                jobs.map((job, i) => (
                  <tr
                    key={job._id}
                    className="border-t border-foreground/10 bg-white dark:border-white/10 dark:bg-foreground/3 hover:bg-gray-50 dark:hover:bg-foreground/5 transition-colors text-sm"
                  >
                    <td
                      className={`px-4 py-3 ${
                        !job.isActive ? "text-foreground/45" : "text-muted"
                      }`}
                    >
                      {startIndex + i + 1}
                    </td>

                    <td
                      className={`px-4 py-3 font-medium text-nowrap max-w-80 overflow-hidden ${
                        !job.isActive ? "text-foreground/50" : ""
                      }`}
                    >
                      {job?.jobTitle || (
                        <span className="text-muted italic">Not available</span>
                      )}
                    </td>

                    <td
                      className={`px-4 py-3 max-w-72 overflow-hidden ${
                        !job.isActive ? "text-foreground/50" : ""
                      }`}
                    >
                      {job?.company?.companyName || (
                        <span className="text-muted italic">Not available</span>
                      )}
                    </td>

                    <td
                      className={`px-4 py-3 ${
                        !job.isActive ? "text-foreground/50" : ""
                      }`}
                    >
                      {job?.isRemote ? (
                        "Remote"
                      ) : (
                        <div className="max-w-52 overflow-hidden">
                          <span className="text-nowrap">
                            {job?.city || (
                              <span className="text-muted italic">
                                Not available
                              </span>
                            )}
                          </span>
                          ,{" "}
                          <span className="text-nowrap">
                            {job?.country || (
                              <span className="text-muted italic">
                                Not available
                              </span>
                            )}
                          </span>
                        </div>
                      )}
                    </td>

                    <td
                      className={`px-4 py-3 ${
                        !job.isActive ? "text-foreground/50" : ""
                      }`}
                    >
                      <div className="flex flex-col">
                        <p className="font-medium">
                          {capitalize(job?.jobType) || (
                            <span className="text-muted italic">
                              Not available
                            </span>
                          )}
                        </p>

                        <p
                          className={`text-xs text-nowrap ${
                            job.isActive ? "text-muted" : "text-foreground/40"
                          }`}
                        >
                          {capitalize(job.jobCategory) || (
                            <span className="text-muted italic">
                              Not available
                            </span>
                          )}
                        </p>
                      </div>
                    </td>

                    <td
                      className={`px-4 py-3 text-nowrap ${
                        !job.isActive ? "text-foreground/50" : ""
                      }`}
                    >
                      {formatDate(job?.deadline) || (
                        <span className="text-muted italic">Not available</span>
                      )}
                    </td>

                    <td className="px-4 py-3">
                      <Dropdown>
                        <Dropdown.Trigger
                          style={{
                            boxShadow: "none",
                            outline: "none",
                          }}
                        >
                          <p className="p-2 hover:bg-foreground/5 rounded-sm cursor-pointer">
                            <EllipsisVertical className="w-4 h-4" />
                          </p>
                        </Dropdown.Trigger>

                        <Dropdown.Popover className="dark:bg-[#151515] rounded-xl w-fit min-w-32">
                          <Dropdown.Menu
                            onAction={(key) => {
                              handleAction(key, job);
                            }}
                          >
                            <Dropdown.Item
                              id="view"
                              textValue="View"
                              className="gap-2 rounded-lg mb-0.5"
                              style={{
                                boxShadow: "none",
                                outline: "none",
                              }}
                            >
                              <Eye strokeWidth={2.25} className="w-4 h-4" />
                              <Label>View</Label>
                            </Dropdown.Item>

                            <Dropdown.Item
                              id="edit"
                              textValue="Edit"
                              className="gap-2 rounded-lg mb-0.5"
                              style={{
                                boxShadow: "none",
                                outline: "none",
                              }}
                            >
                              <Pencil strokeWidth={2.25} className="w-4 h-4" />
                              <Label>Edit</Label>
                            </Dropdown.Item>

                            <Separator />

                            <Dropdown.Item
                              id="unpublishJob"
                              textValue={
                                job.isActive ? "Unpublish Job" : "Republish Job"
                              }
                              className="rounded-lg text-nowrap"
                              style={{
                                boxShadow: "none",
                                outline: "none",
                              }}
                            >
                              {job.isActive ? (
                                <>
                                  <EyeOff className="w-4 h-4" />
                                  <Label>Unpublish</Label>
                                </>
                              ) : (
                                <>
                                  <Eye className="w-4 h-4" />
                                  <Label>Republish</Label>
                                </>
                              )}
                            </Dropdown.Item>

                            <Dropdown.Item
                              id="delete"
                              textValue="Delete"
                              className="text-red-500 gap-2 rounded-lg mt-0.5"
                              style={{
                                boxShadow: "none",
                                outline: "none",
                              }}
                            >
                              <Trash2 strokeWidth={2.25} className="w-4 h-4" />
                              <Label className="text-red-500">Delete</Label>
                            </Dropdown.Item>
                          </Dropdown.Menu>
                        </Dropdown.Popover>
                      </Dropdown>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {jobs.length > 0 && (
          <div className="bg-gray-100 dark:bg-foreground/12 p-3 mt-0 rounded-b-lg border border-t-0">
            <Pagination className="gap-3">
              <Pagination.Summary className="w-full sm:w-fit justify-center">
                {start} to {end} of {totalJobs} results
              </Pagination.Summary>

              <Pagination.Content className="w-full sm:w-fit justify-center">
                <Pagination.Item>
                  <Pagination.Previous
                    style={{
                      outline: "none",
                      boxShadow: "none",
                    }}
                    isDisabled={currentPage === 1}
                    onPress={() =>
                      handlePageChange(Math.max(1, currentPage - 1))
                    }
                  >
                    <Pagination.PreviousIcon />
                    <span className="hidden xs:inline sm:inline">Prev</span>
                  </Pagination.Previous>
                </Pagination.Item>

                {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                  (p) => (
                    <Pagination.Item key={p}>
                      <Pagination.Link
                        isActive={p === currentPage}
                        onPress={() => handlePageChange(p)}
                        className={p === currentPage ? "bg-foreground/10" : ""}
                        style={{
                          outline: "none",
                          boxShadow: "none",
                        }}
                      >
                        {p}
                      </Pagination.Link>
                    </Pagination.Item>
                  ),
                )}

                <Pagination.Item>
                  <Pagination.Next
                    style={{
                      outline: "none",
                      boxShadow: "none",
                    }}
                    isDisabled={currentPage === totalPages}
                    onPress={() =>
                      handlePageChange(Math.min(totalPages, currentPage + 1))
                    }
                  >
                    <span className="hidden xs:inline sm:inline">Next</span>
                    <Pagination.NextIcon />
                  </Pagination.Next>
                </Pagination.Item>
              </Pagination.Content>
            </Pagination>
          </div>
        )}
      </div>

      {/* Single shared delete confirmation, reused across every row */}
      <AlertDialog
        isOpen={isDeleteDialogOpen}
        onOpenChange={setIsDeleteDialogOpen}
      >
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
                  <strong>{jobToDelete?.jobTitle}</strong>. This action cannot
                  be undone.
                </p>
              </AlertDialog.Body>
              <AlertDialog.Footer>
                <Button slot="close" variant="tertiary" className="rounded-lg">
                  Cancel
                </Button>
                <Button
                  slot={isDeleting ? "" : "close"}
                  variant="danger"
                  className="rounded-lg"
                  onClick={handleConfirmDelete}
                >
                  {isDeleting ? "Deleting..." : "Delete Job"}
                </Button>
              </AlertDialog.Footer>
            </AlertDialog.Dialog>
          </AlertDialog.Container>
        </AlertDialog.Backdrop>
      </AlertDialog>

      {/* Single shared pause/resume confirmation, reused across every row */}
      <AlertDialog
        isOpen={isPauseDialogOpen}
        onOpenChange={setIsPauseDialogOpen}
      >
        <AlertDialog.Backdrop>
          <AlertDialog.Container>
            <AlertDialog.Dialog className="rounded-xl">
              <AlertDialog.CloseTrigger />
              <AlertDialog.Header>
                <AlertDialog.Icon
                  status={jobToPause?.isActive ? "warning" : "success"}
                />
                <AlertDialog.Heading>
                  {jobToPause?.isActive
                    ? "Unpublish this job?"
                    : "Republish this job?"}
                </AlertDialog.Heading>
              </AlertDialog.Header>
              <AlertDialog.Body>
                <p>
                  {jobToPause?.isActive ? (
                    <>
                      <strong>{jobToPause?.jobTitle}</strong> will be hidden
                      from job seekers until you resume it. You can reactivate
                      it anytime.
                    </>
                  ) : (
                    <>
                      <strong>{jobToPause?.jobTitle}</strong> will become
                      visible to job seekers again.
                    </>
                  )}
                </p>
              </AlertDialog.Body>
              <AlertDialog.Footer>
                <Button slot="close" variant="tertiary" className="rounded-lg">
                  Cancel
                </Button>
                <Button
                  slot={isPausing ? "" : "close"}
                  className={`rounded-lg ${jobToPause?.isActive ? "bg-yellow-600 hover:bg-yellow-700 active:bg-yellow-700 dark:bg-yellow-700 hover:dark:bg-yellow-800 active:dark:bg-yellow-800" : "bg-emerald-600 hover:bg-emerald-700 active:bg-emerald-700 dark:bg-emerald-700 hover:dark:bg-emerald-800 active:dark:bg-emerald-800"}`}
                  style={{ outline: "none", boxShadow: "none" }}
                  onClick={handleConfirmPauseToggle}
                >
                  {isPausing
                    ? "Updating..."
                    : jobToPause?.isActive
                      ? "Unpublish"
                      : "Republish"}
                </Button>
              </AlertDialog.Footer>
            </AlertDialog.Dialog>
          </AlertDialog.Container>
        </AlertDialog.Backdrop>
      </AlertDialog>
    </div>
  );
};

export default RecruiterAllJobs;
