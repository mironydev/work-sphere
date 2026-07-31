"use client";

import React, { useState } from "react";
import { Trash2 } from "lucide-react";
import { currencySymbol, formatDate } from "@/lib/helpers";
import { useSessionClient } from "@/lib/helpers";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { removeSavedJob } from "@/lib/actions/jobs";
import Link from "next/link";
import { AlertDialog, Button } from "@heroui/react";

const SeekerSvdJobCard = ({ job }) => {
  const [isRemoving, setIsRemoving] = useState(false);
  const { user } = useSessionClient();
  const router = useRouter();

  const handleRemoveSavedJob = async () => {
    try {
      setIsRemoving(true);
      await removeSavedJob({
        userId: user.id,
        jobId: job.jobId,
      });
      toast.success("Job removed from saved");
      router.refresh();
    } catch (error) {
      console.error("Error removing saved job:", error);
      toast.error("Failed to remove job");
    } finally {
      setIsRemoving(false);
    }
  };

  return (
    <div className="rounded-lg border-t border-white dark:border dark:border-foreground/10 bg-linear-to-r from-white to-foreground/3 dark:from-foreground/10 dark:to-foreground/5 overflow-hidden shadow-[0_1px_2px_rgba(0,0,0,0.06)]">
      <div className="p-6">
        <div className="flex justify-between items-start">
          <div>
            <h2 className="text-2xl font-bold">{job.jobTitle}</h2>
            <p className="text-lg text-muted">{job.companyName}</p>
          </div>
          <div>
            <p className="text-xs uppercase text-muted font-semibold">
              Apply By
            </p>
            <p className="text-lg font-semibold">{formatDate(job.deadline)}</p>
          </div>
        </div>

        <div className="grid grid-cols-3 gap-6 pt-6 mt-6 border-t border-foreground/10">
          <div>
            <p className="text-xs uppercase text-muted font-semibold">Salary</p>
            <p className="text-lg font-medium">
              {currencySymbol(job.currency)}
              {job.salaryMin} - {currencySymbol(job.currency)}
              {job.salaryMax}
            </p>
          </div>
          <div>
            <p className="text-xs uppercase text-muted font-semibold">
              Location
            </p>
            <div className="text-lg font-semibold">
              {job.isRemote ? "Remote" : ` ${job.city}, ${job.country}`}
            </div>
          </div>
          <div className="flex justify-between gap-5">
            <Link href={`/jobs/${job.jobId}`} className="block w-full">
              <button className="w-full py-3 px-6 bg-foreground/95 text-background rounded-lg font-medium text-lg hover:bg-foreground active:bg-foreground cursor-pointer">
                View Job
              </button>
            </Link>

            <AlertDialog>
              <AlertDialog.Trigger>
                <button className="text-red-500 hover:bg-red-600/10 p-3 rounded-lg cursor-pointer">
                  <Trash2 className="w-6 h-6" />
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

                    <AlertDialog.Footer>
                      <Button slot="close" variant="tertiary">
                        Cancel
                      </Button>
                      <Button
                        onClick={handleRemoveSavedJob}
                        slot={isRemoving ? "" : "close"}
                        variant="danger"
                      >
                        {isRemoving ? "Removing..." : "Remove"}
                      </Button>
                    </AlertDialog.Footer>
                  </AlertDialog.Dialog>
                </AlertDialog.Container>
              </AlertDialog.Backdrop>
            </AlertDialog>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SeekerSvdJobCard;
