"use client";

import { useState } from "react";
import Link from "next/link";
import { AlertDialog, Button, Select, ListBox } from "@heroui/react";
import { FileLetterX, ArrowRight } from "@gravity-ui/icons";
import { MoveUpRight, Trash2 } from "lucide-react";
import { toast } from "sonner";
import { formatDate, currencySymbol, useSessionClient } from "@/lib/helpers";
import { useRouter } from "next/navigation";
import DashboardSpinner from "../DashboardSpinner";
import { removeSavedJob } from "@/lib/actions/jobs";
import { getSavedJobs } from "@/lib/fetch/fetchJobs";

const SeekerSavedJobs = ({ savedJobs, total }) => {
  const [jobs, setJobs] = useState(savedJobs);
  const [removingId, setRemovingId] = useState(null);
  const [openDialogId, setOpenDialogId] = useState(null);
  const { user, isPending } = useSessionClient();

  const handleRemoveSavedJob = async (job) => {
    try {
      setRemovingId(job._id);

      await removeSavedJob({
        userId: user.id,
        jobId: job.jobId,
      });

      setJobs((prev) => prev.filter((item) => item._id !== job._id));
      setOpenDialogId(null);

      toast.success("Job removed from saved");
    } catch (error) {
      toast.error("Failed to remove job");
    } finally {
      setRemovingId(null);
    }
  };

  const sort = [
    { id: "name-asc", label: "Name (A-Z)" },
    { id: "name-desc", label: "Name (Z-A)" },
    { id: "date-newest", label: "Date (Newest)" },
    { id: "date-oldest", label: "Date (Oldest)" },
  ];

  const handleSelectFilter = async (value) => {
    const res = await getSavedJobs(user?.id, value);
    setJobs(res.result);
  };

  if (isPending) {
    return <DashboardSpinner />;
  }

  return (
    <div className="min-h-[50vh]">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-semibold">Saved Jobs</h1>
          <p className="text-muted mt-1 mb-4">{total} saved jobs</p>
        </div>

        <Select
          className="rounded-sm border border-foreground/20"
          placeholder="Sort By"
          aria-label="Sort By"
          onChange={(value) => handleSelectFilter(value)}
        >
          <Select.Trigger
            className="rounded-sm hover:bg-foreground/5 dark:hover:bg-foreground/15"
            style={{ outline: "none", boxShadow: "none" }}
          >
            <Select.Value className="whitespace-nowrap text-sm data-[placeholder=true]:text-foreground/70" />
            <Select.Indicator />
          </Select.Trigger>
          <Select.Popover className="rounded-lg">
            <ListBox>
              {sort.map((item, i) => {
                return (
                  <ListBox.Item
                    key={i}
                    id={item.id}
                    textValue={item.label}
                    style={{
                      outline: "none",
                      boxShadow: "none",
                      borderRadius: "6px",
                    }}
                    className="text-nowrap"
                  >
                    {item.label}
                    <div className="px-1">
                      <ListBox.ItemIndicator />
                    </div>
                  </ListBox.Item>
                );
              })}
            </ListBox>
          </Select.Popover>
        </Select>
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
                Deadline
              </th>

              <th className="px-4 py-4 text-left font-medium text-xs text-muted">
                Salary
              </th>

              <th className="px-4 py-4 text-left font-medium text-xs text-muted">
                Location
              </th>

              <th className="px-4 py-4 text-left font-medium text-xs text-muted">
                Actions
              </th>
            </tr>
          </thead>

          <tbody>
            {jobs.length === 0 ? (
              <tr>
                <td colSpan={7}>
                  <div className="flex flex-col items-center justify-center text-center py-10 bg-white dark:bg-foreground/3 border-t">
                    <FileLetterX className="scale-150" />

                    <span className="text-xl text-muted mt-3 mb-1">
                      No saved jobs yet
                    </span>

                    <Link
                      href="/jobs?page=1"
                      className="text-base bg-foreground/90 text-background px-4 py-2 rounded-lg flex items-center gap-2 mt-2 active:scale-95 duration-100 font-semibold"
                    >
                      Browse Jobs <ArrowRight />
                    </Link>
                  </div>
                </td>
              </tr>
            ) : (
              jobs.map((job, i) => {
                return (
                  <tr
                    key={job._id}
                    className="border-t border-foreground/10 bg-white dark:border-white/10 dark:bg-foreground/3 hover:bg-gray-50 dark:hover:bg-foreground/5 transition-colors text-sm"
                  >
                    <td className="px-4 py-3 text-muted">{i + 1}</td>

                    <td className="px-4 py-3 text-nowrap">
                      <p className="text-base">
                        {job?.jobDetails?.jobTitle || (
                          <span className="text-muted text-sm">Not found</span>
                        )}
                      </p>
                    </td>

                    <td className="px-4 py-3 text-nowrap">
                      {job?.company?.companyName || (
                        <span className="text-muted">Not found</span>
                      )}
                    </td>

                    <td className="px-4 py-3 text-nowrap">
                      {job?.jobDetails?.deadline ? (
                        formatDate(job?.jobDetails?.deadline)
                      ) : (
                        <span className="text-muted">Not found</span>
                      )}
                    </td>

                    <td className="px-4 py-3 text-nowrap">
                      {job?.jobDetails?.salaryMin != null &&
                      job?.jobDetails?.salaryMax != null ? (
                        <>
                          {job?.jobDetails?.currency
                            ? currencySymbol(job?.jobDetails?.currency)
                            : ""}
                          {Math.round(job?.jobDetails?.salaryMin / 1000)}K{" "}
                          <span className="text-muted">-</span>{" "}
                          {job?.jobDetails?.currency
                            ? currencySymbol(job?.jobDetails?.currency)
                            : ""}
                          {Math.round(job?.jobDetails?.salaryMax / 1000)}K
                        </>
                      ) : (
                        <span className="text-muted">Not found</span>
                      )}
                    </td>

                    <td className="px-4 py-3 text-nowrap">
                      {job?.jobDetails?.isRemote ? (
                        "Remote"
                      ) : job?.jobDetails?.city && job?.jobDetails?.country ? (
                        `${job?.jobDetails?.city}, ${job?.jobDetails?.country}`
                      ) : (
                        <span className="text-muted">Not found</span>
                      )}
                    </td>

                    <td className="px-4 py-3">
                      <div className="flex items-center gap-5">
                        <Link
                          href={`/jobs/${job?.jobId}`}
                          className="font-medium hover:underline active:underline flex items-center gap-1"
                        >
                          View
                          <MoveUpRight size={10} />
                        </Link>

                        <AlertDialog
                          isOpen={openDialogId === job?._id}
                          onOpenChange={(isOpen) =>
                            setOpenDialogId(isOpen ? job?._id : null)
                          }
                        >
                          <AlertDialog.Trigger>
                            <button
                              className="text-red-400 dark:text-red-500 active:opacity-50 rounded-lg cursor-pointer"
                              disabled={removingId === job?._id}
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </AlertDialog.Trigger>

                          <AlertDialog.Backdrop>
                            <AlertDialog.Container placement="center">
                              <AlertDialog.Dialog className="rounded-xl sm:max-w-96">
                                <AlertDialog.Header>
                                  <AlertDialog.Heading className="text-xl">
                                    Remove saved job?
                                  </AlertDialog.Heading>
                                </AlertDialog.Header>

                                <AlertDialog.Body>
                                  <p className="text-sm leading-6 text-muted">
                                    This will remove{" "}
                                    <span className="font-medium text-foreground">
                                      {job?.jobDetails?.jobTitle}
                                    </span>{" "}
                                    from your saved jobs.
                                  </p>
                                </AlertDialog.Body>

                                <AlertDialog.Footer>
                                  <Button
                                    slot="close"
                                    variant="tertiary"
                                    className="w-full rounded-lg text-base"
                                    style={{
                                      outline: "none",
                                      boxShadow: "none",
                                    }}
                                  >
                                    Cancel
                                  </Button>

                                  <Button
                                    variant="danger"
                                    className="w-full rounded-lg text-base"
                                    style={{
                                      outline: "none",
                                      boxShadow: "none",
                                    }}
                                    onClick={() => handleRemoveSavedJob(job)}
                                  >
                                    {removingId === job?._id
                                      ? "Removing..."
                                      : "Remove Job"}
                                  </Button>
                                </AlertDialog.Footer>
                              </AlertDialog.Dialog>
                            </AlertDialog.Container>
                          </AlertDialog.Backdrop>
                        </AlertDialog>
                      </div>
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

export default SeekerSavedJobs;
