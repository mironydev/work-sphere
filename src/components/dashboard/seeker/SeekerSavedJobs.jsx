"use client";

import { useState } from "react";
import Link from "next/link";
import { AlertDialog, Button, EmptyState, Table } from "@heroui/react";
import { FileLetterX, ArrowRight } from "@gravity-ui/icons";
import { MoveUpRight, Trash2 } from "lucide-react";
import { toast } from "sonner";
import { formatDate, currencySymbol, useSessionClient } from "@/lib/helpers";
import { useRouter } from "next/navigation";
import DashboardSpinner from "../DashboardSpinner";
import { removeSavedJob } from "@/lib/actions/jobs";

const SeekerSavedJobs = ({ savedJobs }) => {
  const [removingId, setRemovingId] = useState(null);
  const { user, isPending } = useSessionClient();
  const router = useRouter();

  const handleRemoveSavedJob = async (job) => {
    try {
      setRemovingId(job._id);

      await removeSavedJob({
        userId: user.id,
        jobId: job.jobId,
      });

      toast.success("Job removed from saved");
      router.refresh();
    } catch (error) {
      toast.error("Failed to remove job");
    } finally {
      setRemovingId(null);
    }
  };

  if (isPending) {
    return <DashboardSpinner />;
  }

  return (
    <div>
      <div>
        <h1 className="text-3xl font-semibold">Saved Jobs</h1>

        <p className="text-muted mt-1 mb-4">{savedJobs.length} saved jobs</p>
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
            {savedJobs.length === 0 ? (
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
              savedJobs.map((job, i) => (
                <tr
                  key={job._id}
                  className="border-t border-foreground/10 bg-white dark:border-white/10 dark:bg-foreground/3 hover:bg-gray-50 dark:hover:bg-foreground/5 transition-colors text-sm"
                >
                  <td className="px-4 py-3 text-muted">{i + 1}</td>

                  <td className="px-4 py-3 text-nowrap">
                    <p className="text-base">{job.jobTitle || "Not found"}</p>
                  </td>

                  <td className="px-4 py-3 text-nowrap">
                    {job.companyName || "Not found"}
                  </td>

                  <td className="px-4 py-3 text-nowrap">
                    {formatDate(job.deadline) || "Not found"}
                  </td>

                  <td className="px-4 py-3 text-nowrap">
                    {currencySymbol(job.currency)}
                    {Math.round(job.salaryMin / 1000)}K{" "}
                    <span className="text-muted">-</span>{" "}
                    {currencySymbol(job.currency)}
                    {Math.round(job.salaryMax / 1000)}K
                  </td>

                  <td className="px-4 py-3 text-nowrap">
                    {job.isRemote ? "Remote" : `${job.city}, ${job.country}`}
                  </td>

                  <td className="px-4 py-3">
                    <div className="flex items-center gap-5">
                      <Link
                        href={`/jobs/${job.jobId}`}
                        className="font-medium text-foreground/80 active:opacity-50 flex items-center gap-1"
                      >
                        View
                        <MoveUpRight size={10} />
                      </Link>

                      <AlertDialog>
                        <AlertDialog.Trigger>
                          <button
                            className="text-red-400 dark:text-red-500 active:opacity-50 rounded-lg cursor-pointer"
                            disabled={removingId === job._id}
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </AlertDialog.Trigger>

                        <AlertDialog.Backdrop>
                          <AlertDialog.Container>
                            <AlertDialog.Dialog className="sm:max-w-100">
                              <AlertDialog.CloseTrigger />

                              <AlertDialog.Header>
                                <AlertDialog.Icon status="danger" />

                                <AlertDialog.Heading>
                                  Remove this job from Saved Jobs?
                                </AlertDialog.Heading>
                              </AlertDialog.Header>

                              <AlertDialog.Body>
                                <p>
                                  This job will be removed from your saved jobs.
                                </p>
                              </AlertDialog.Body>

                              <AlertDialog.Footer>
                                <Button slot="close" variant="tertiary">
                                  Cancel
                                </Button>

                                <Button
                                  onClick={() => handleRemoveSavedJob(job)}
                                  slot={removingId === job._id ? "" : "close"}
                                  variant="danger"
                                >
                                  {removingId === job._id
                                    ? "Removing..."
                                    : "Remove"}
                                </Button>
                              </AlertDialog.Footer>
                            </AlertDialog.Dialog>
                          </AlertDialog.Container>
                        </AlertDialog.Backdrop>
                      </AlertDialog>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default SeekerSavedJobs;
