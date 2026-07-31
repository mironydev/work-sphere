"use client";

import { Dropdown, Label, Separator } from "@heroui/react";
import {
  EllipsisVertical,
  Bookmark,
  BookmarkOff,
  Share2,
  Eye,
  EyeOff,
  AlertCircle,
} from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useSessionClient } from "@/lib/helpers";
import { toast } from "sonner";
import { removeSavedJob, saveJob } from "@/lib/actions/jobs";
import { getSavedJobs } from "@/lib/fetch/fetchJobs";
export const JobCardMenu = ({ job, savedJobs }) => {
  const [isSaved, setIsSaved] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const { user } = useSessionClient();

  const handleAction = async (key) => {
    switch (key) {
      case "save":
        await handleToggleSaveJob();
        break;
      case "share":
        // Share job
        break;
      case "details":
        router.push(`/jobs/${job._id}`);
        break;
      case "hide":
        // Hide job
        break;
      case "report":
        // Report job
        break;
    }
  };

  const handleToggleSaveJob = async () => {
    try {
      setIsLoading(true);

      if (isSaved) {
        // Remove saved job
        await removeSavedJob({
          userId: user.id,
          jobId: job._id,
        });
        setIsSaved(false);
        toast.success("Job removed from saved");
      } else {
        // Save job
        await saveJob({
          userId: user.id,
          jobId: job._id,
        });
        setIsSaved(true);
        toast.success("Job saved");
      }
    } catch (error) {
      console.error("Error toggling save job:", error);
      toast.error("Failed to save/remove job");
    } finally {
      setIsLoading(false);
    }
  };

  const func = () => {
    const isJobSaved = savedJobs.some((s) => s.jobId === job._id);
    setIsSaved(isJobSaved);
  };

  return (
    <Dropdown
      onOpenChange={(open) => {
        if (open) func();
      }}
    >
      <Dropdown.Trigger style={{ boxShadow: "none", outline: "none" }}>
        <p className="p-2 hover:bg-foreground/5 rounded-sm cursor-pointer">
          <EllipsisVertical className="w-4 h-4" />
        </p>
      </Dropdown.Trigger>
      <Dropdown.Popover className={"dark:bg-stone-950"}>
        <Dropdown.Menu onAction={(key) => handleAction(key)}>
          <Dropdown.Item
            id="save"
            textValue="Save"
            isDisabled={isLoading}
            style={{ boxShadow: "none", outline: "none" }}
          >
            {isSaved ? (
              <>
                <BookmarkOff className="w-4 h-4" />
                <Label>Remove from saved</Label>
              </>
            ) : (
              <>
                <Bookmark className="w-4 h-4" />
                <Label>Save job</Label>
              </>
            )}
          </Dropdown.Item>

          <Dropdown.Item
            id="details"
            textValue="View details"
            style={{ boxShadow: "none", outline: "none" }}
          >
            <Eye className="w-4 h-4" />
            <Label>View details</Label>
          </Dropdown.Item>

          <Dropdown.Item
            id="share"
            textValue="Share"
            style={{ boxShadow: "none", outline: "none" }}
          >
            <Share2 className="w-4 h-4" />
            <Label>Share</Label>
          </Dropdown.Item>

          <Separator />
          <Dropdown.Item
            id="hide"
            textValue="Hide"
            style={{ boxShadow: "none", outline: "none" }}
          >
            <EyeOff className="w-4 h-4" />
            <Label>Hide job</Label>
          </Dropdown.Item>
          <Dropdown.Item
            id="report"
            variant="danger"
            textValue="Report"
            style={{ boxShadow: "none", outline: "none" }}
          >
            <AlertCircle className="w-4 h-4" />
            <Label>Report</Label>
          </Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown.Popover>
    </Dropdown>
  );
};

export default JobCardMenu;
