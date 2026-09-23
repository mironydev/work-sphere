"use client";
import {
  AlertDialog,
  Button,
  Dropdown,
  Label,
  Modal,
  Pagination,
  Separator,
} from "@heroui/react";
import { capitalize, formatDate } from "@/lib/helpers";
import { EllipsisVertical } from "lucide-react";
import { useState } from "react";
import Stats from "./Stats";
import { useRouter, useSearchParams } from "next/navigation";
import { deleteJob } from "@/lib/actions/jobs";
import { toast } from "sonner";

const Jobs = ({ jobs, total, count, active, addedThisMonth }) => {
  const [job, setJob] = useState(null);
  const [isViewDialogOpen, setIsViewDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const searchParams = useSearchParams();
  const router = useRouter();

  const currentPage = Number(searchParams.get("page")) || 1;
  const limit = 9;
  const totalPages = Math.ceil(total / limit);
  const totalJobs = total;
  const startIndex = (currentPage - 1) * limit;
  const start = startIndex + 1;
  const end = Math.min(startIndex + limit, totalJobs);

  const handlePageChange = (newPage) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("page", newPage.toString());

    const table = document.getElementById("jobs-table");

    if (table) {
      const navbarOffset = 150;
      const start = window.scrollY;
      const target =
        table.getBoundingClientRect().top + window.scrollY - navbarOffset;

      const distance = target - start;
      const duration = 400;
      const startTime = performance.now();

      const scrollToTable = (currentTime) => {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);
        const ease = 1 - Math.pow(1 - progress, 3);

        window.scrollTo(0, start + distance * ease);

        if (progress < 1) {
          requestAnimationFrame(scrollToTable);
        }
      };

      requestAnimationFrame(scrollToTable);
    }

    router.push(`?${params.toString()}`);
  };

  const handleAction = async (key, job) => {
    switch (key) {
      case "view":
        setJob(job);
        setIsViewDialogOpen(true);
        break;
      case "delete":
        setJob(job);
        setIsDeleteDialogOpen(true);
        break;
    }
  };

  const handleDelete = async (jobId) => {
    const { error } = await deleteJob(jobId);
    if (!error) {
      toast.success("Job Deleted");
      setIsDeleteDialogOpen(false);
      router.refresh();
    }
  };

  return (
    <div className="min-w-0">
      <div id="jobs-section" className="mb-4">
        <h1 className="text-3xl font-semibold">All Jobs</h1>
        <p className="text-muted text-sm mt-1">
          Manage jobs registered on the platform.
        </p>
      </div>
      <Stats count={count} active={active} addedThisMonth={addedThisMonth} />

      <div
        id="jobs-table"
        className="overflow-x-auto rounded-t-lg border dark:bg-foreground/3"
      >
        <table className="min-w-full border-collapse">
          <thead>
            <tr className="bg-gray-100 dark:bg-foreground/8">
              <th className="px-4 py-4 text-left font-medium text-xs text-muted">
                #
              </th>

              <th className="px-4 py-4 text-left font-medium text-xs text-muted text-nowrap">
                Job Title
              </th>

              <th className="px-4 py-4 text-left font-medium text-xs text-muted text-nowrap">
                Company
              </th>

              <th className="px-4 py-4 text-left font-medium text-xs text-muted text-nowrap">
                Recruiter Email
              </th>

              <th className="px-4 py-4 text-left font-medium text-xs text-muted text-nowrap">
                Created
              </th>

              <th className="px-4 py-4 text-left font-medium text-xs text-muted">
                Actions
              </th>
            </tr>
          </thead>

          <tbody>
            {jobs.length === 0 ? (
              <tr>
                <td colSpan={6}>
                  <div className="flex flex-col items-center justify-center text-center py-10 bg-white dark:bg-foreground/5 border-t">
                    <span className="text-xl text-muted">No jobs found</span>

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
                  <td className="px-4 py-3 text-muted">{startIndex + i + 1}</td>

                  <td className="px-4 py-3 text-nowrap">
                    <p className="font-medium truncate">
                      {job.jobTitle || "Not found"}
                    </p>
                  </td>

                  <td className="px-4 py-3 text-muted text-nowrap">
                    {job.company?.companyName || "Not found"}
                  </td>

                  <td className="px-4 py-3 text-muted">
                    {job.user?.email || "Not found"}
                  </td>

                  <td className="px-4 py-3 text-nowrap text-muted">
                    {job.createdAt
                      ? formatDate(job.createdAt)
                      : "Not Available"}
                  </td>

                  <td className="px-4 py-3">
                    <Dropdown>
                      <Dropdown.Trigger
                        style={{
                          boxShadow: "none",
                          outline: "none",
                        }}
                      >
                        <div className="flex items-center justify-center hover:bg-foreground/5 active:bg-foreground/5 p-1.5 rounded-full cursor-pointer">
                          <EllipsisVertical className="w-4 h-4" />
                        </div>
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
                            <Label>View</Label>
                          </Dropdown.Item>

                          <Separator />

                          <Dropdown.Item
                            id="delete"
                            textValue="Delete"
                            className="rounded-lg mt-0.5"
                            style={{
                              boxShadow: "none",
                              outline: "none",
                            }}
                          >
                            <Label className="text-rose-500 dark:font-bold">
                              Delete
                            </Label>
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

      {total > 9 && (
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
                  onPress={() => handlePageChange(Math.max(1, currentPage - 1))}
                >
                  <Pagination.PreviousIcon />
                  <span className="hidden xs:inline sm:inline">Prev</span>
                </Pagination.Previous>
              </Pagination.Item>

              {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
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
              ))}

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

      {/* View Job Modal */}
      {job && (
        <Modal isOpen={isViewDialogOpen} onOpenChange={setIsViewDialogOpen}>
          <Modal.Backdrop>
            <Modal.Container placement="center">
              <Modal.Dialog className="rounded-xl pt-4">
                <Modal.Header>
                  <Modal.Heading className="text-center text-lg">
                    Job Details
                  </Modal.Heading>
                  <Separator />
                </Modal.Header>

                <div className="max-h-[65vh] overflow-y-auto px-1 pt-3 pb-4">
                  <div className="space-y-1">
                    <h2 className="text-3xl font-semibold text-foreground">
                      {job.jobTitle}
                    </h2>

                    <p className="text-sm text-muted">
                      {job.company?.companyName || "Not found"}
                    </p>

                    <div className="flex flex-wrap gap-x-4 gap-y-1 pt-2 text-sm">
                      <span className="text-muted">
                        Status:{" "}
                        <span className="font-medium text-foreground">
                          {job.isActive ? "Active" : "Inactive"}
                        </span>
                      </span>

                      <span className="text-muted">
                        Type:{" "}
                        <span className="font-medium text-foreground">
                          {capitalize(job.jobType)}
                        </span>
                      </span>

                      <span className="text-muted">
                        Remote:{" "}
                        <span className="font-medium text-foreground">
                          {job.isRemote ? "Yes" : "No"}
                        </span>
                      </span>
                    </div>
                  </div>

                  <Separator className="my-4" />

                  <div className="grid grid-cols-2 gap-x-6 gap-y-4 text-sm">
                    {(job.city || job.country) && (
                      <div>
                        <div className="text-muted">Location</div>
                        <div className="mt-1 font-medium text-foreground">
                          {[job.city, job.country].filter(Boolean).join(", ")}
                        </div>
                      </div>
                    )}

                    <div>
                      <div className="text-muted">Category</div>
                      <div className="mt-1 font-medium text-foreground capitalize">
                        {job.jobCategory}
                      </div>
                    </div>

                    <div>
                      <div className="text-muted">Salary</div>
                      <div className="mt-1 font-medium text-foreground">
                        {job.currency?.toUpperCase()}{" "}
                        {job.salaryMin?.toLocaleString()} to{" "}
                        {job.salaryMax?.toLocaleString()}
                      </div>
                    </div>

                    <div>
                      <div className="text-muted">Deadline</div>
                      <div className="mt-1 font-medium text-foreground">
                        {job.deadline
                          ? formatDate(job.deadline)
                          : "Not available"}
                      </div>
                    </div>
                  </div>

                  <Separator className="my-4" />

                  <div className="space-y-4 text-sm">
                    <div>
                      <h3 className="font-medium text-foreground">Recruiter</h3>

                      <div className="mt-1 text-muted">
                        {job.user?.name || "Not found"}
                        {" · "}
                        <span className="break-all">
                          {job.user?.email || "Not found"}
                        </span>
                      </div>
                    </div>

                    <div>
                      <h3 className="font-medium text-foreground">
                        Responsibilities
                      </h3>
                      <p className="mt-1 leading-6 text-muted">
                        {job.responsibilities || "Not available"}
                      </p>
                    </div>

                    <div>
                      <h3 className="font-medium text-foreground">
                        Requirements
                      </h3>
                      <p className="mt-1 leading-6 text-muted">
                        {job.requirements || "Not available"}
                      </p>
                    </div>

                    <div>
                      <h3 className="font-medium text-foreground">Benefits</h3>
                      <p className="mt-1 leading-6 text-muted">
                        {job.benefits || "Not available"}
                      </p>
                    </div>

                    <div className="text-xs text-muted">
                      Created {formatDate(job.createdAt)}
                    </div>
                  </div>
                </div>

                <Modal.Footer>
                  <Button
                    variant="tertiary"
                    className="w-full rounded-lg"
                    style={{ outline: "none", boxShadow: "none" }}
                    slot="close"
                  >
                    Close
                  </Button>
                </Modal.Footer>
              </Modal.Dialog>
            </Modal.Container>
          </Modal.Backdrop>
        </Modal>
      )}

      {/* Delete Job Modal */}
      {job && (
        <AlertDialog
          isOpen={isDeleteDialogOpen}
          onOpenChange={setIsDeleteDialogOpen}
        >
          <AlertDialog.Backdrop>
            <AlertDialog.Container placement="center">
              <AlertDialog.Dialog className="rounded-xl sm:max-w-100">
                <AlertDialog.Header>
                  <AlertDialog.Heading className="text-xl">
                    Delete Job Permanently?
                  </AlertDialog.Heading>
                </AlertDialog.Header>
                <AlertDialog.Body>
                  <p>
                    This will permanently delete{" "}
                    <span className="text-foreground font-medium">
                      {job.jobTitle}
                    </span>{" "}
                    and all of its applications. This action cannot be undone.
                  </p>
                </AlertDialog.Body>
                <AlertDialog.Footer className="justify-between">
                  <Button
                    slot="close"
                    variant="tertiary"
                    className="rounded-lg w-full"
                    style={{ outline: "none", boxShadow: "none" }}
                  >
                    Cancel
                  </Button>
                  <Button
                    variant="danger"
                    className="rounded-lg w-full"
                    style={{ outline: "none", boxShadow: "none" }}
                    onClick={() => handleDelete(job._id)}
                  >
                    Delete Job
                  </Button>
                </AlertDialog.Footer>
              </AlertDialog.Dialog>
            </AlertDialog.Container>
          </AlertDialog.Backdrop>
        </AlertDialog>
      )}
    </div>
  );
};

export default Jobs;
