"use client";

import {
  LogoLinkedin,
  Clock,
  CircleCheckFill,
  PersonPencil,
  Xmark,
} from "@gravity-ui/icons";
import { ArrowUpRight, FileText, Globe } from "lucide-react";
import { capitalize, formatDate, useSessionClient } from "@/lib/helpers";
import { Chip, ListBox, Select } from "@heroui/react";
import { updateApplicationStatus } from "@/lib/actions/application";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { useState } from "react";
import DashboardSpinner from "../DashboardSpinner";
import Link from "next/link";

const ApplicationDetails = ({ application }) => {
  const [updatingId, setUpdatingId] = useState(null);
  const router = useRouter();

  const { user, isPending } = useSessionClient();

  const statusMap = {
    applied: {
      color: "default",
      icon: null,
    },
    reviewing: {
      color: "warning",
      icon: <Clock width={12} />,
    },
    shortlisted: {
      color: "default",
      icon: <CircleCheckFill width={12} />,
    },
    interviewing: {
      color: "accent",
      icon: <PersonPencil width={12} />,
    },
    offered: {
      color: "success",
      icon: <CircleCheckFill width={12} />,
    },
    rejected: {
      color: "danger",
      icon: <Xmark width={12} />,
    },
  };

  const statusOptions = [
    "applied",
    "reviewing",
    "shortlisted",
    "interviewing",
    "offered",
    "rejected",
  ];

  const handleStatusChange = async (appId, newStatus) => {
    setUpdatingId(appId);
    try {
      const res = await updateApplicationStatus(appId, newStatus);
      if (res.modifiedCount) {
        toast.success(`Status updated to ${capitalize(newStatus)}`);
        router.refresh();
      } else {
        toast.error("Failed to update status");
      }
    } catch (error) {
      toast.error("Something went wrong");
    } finally {
      setUpdatingId(null);
    }
  };

  if (isPending) {
    return <DashboardSpinner />;
  }

  return (
    <div>
      {/* Header */}
      <div className="mb-4">
        <h1 className="text-3xl sm:text-4xl font-bold mb-1">
          {application.job.title}
        </h1>
        <div className="flex items-end justify-between gap-4">
          <div>
            <p className="text- text-muted">
              {application.company.name || (
                <span className="italic opacity-60">Not available</span>
              )}
            </p>
            <p className="flex items-center gap-1 text-sm text-muted">
              Applied {formatDate(application.createdAt)}
            </p>
          </div>
          <div>
            {user?.accountType === "recruiter" ? (
              <Select
                className="w-33 mx-auto"
                variant="secondary"
                value={application.status}
                isDisabled={updatingId === application._id}
                onChange={(value) => handleStatusChange(application._id, value)}
                aria-label="Application status"
              >
                <Select.Trigger
                  style={{
                    outline: "none",
                    boxShadow: "none",
                    borderRadius: "none",
                  }}
                  className="rounded-md bg-white/80 dark:bg-foreground/8 border border-foreground/10"
                >
                  <Select.Value className="text-sm" />
                  <Select.Indicator />
                </Select.Trigger>

                <Select.Popover className="rounded-md dark:bg-[#171717]">
                  <ListBox>
                    {statusOptions.map((option) => (
                      <ListBox.Item
                        style={{
                          outline: "none",
                          boxShadow: "none",
                        }}
                        className="rounded-sm"
                        key={option}
                        id={option}
                        textValue={capitalize(option)}
                      >
                        {capitalize(option)}
                        <ListBox.ItemIndicator />
                      </ListBox.Item>
                    ))}
                  </ListBox>
                </Select.Popover>
              </Select>
            ) : (
              <Chip
                className="pl-4 pr-5 text-sm pb-2 pt-1.75 rounded-md bg-white dark:bg-foreground/10 border"
                color={
                  statusMap[application.status?.toLowerCase()]?.color ||
                  "default"
                }
              >
                {statusMap[application.status?.toLowerCase()]?.icon && (
                  <span className="mr-1">
                    {statusMap[application.status?.toLowerCase()].icon}
                  </span>
                )}
                {application.status?.charAt(0).toUpperCase() +
                  application.status?.slice(1)}
              </Chip>
            )}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="grid grid-cols-1 md:grid-cols-3 md:gap-6">
        {/* Left: Application Info */}
        <div className="col-span-2 space-y-6">
          {/* Applicant Info */}
          <div className="rounded-lg bg-white dark:bg-foreground/5 p-6 border">
            <h2 className="text-lg font-bold mb-4">Applicant Information</h2>
            <div className="space-y-4">
              <div>
                <p className="text-sm text-muted mb-1">Name</p>
                <p className="font-medium">{application.user.name}</p>
              </div>
              <div>
                <p className="text-sm text-muted mb-1">Email</p>
                <p className="font-medium">{application.user.email}</p>
              </div>
              <div>
                <p className="text-sm text-muted mb-1">Phone</p>
                {application.phoneNumber ? (
                  <Link
                    href={`tel:${application.phoneNumber}`}
                    className="font-medium"
                  >
                    {application.phoneNumber}
                  </Link>
                ) : (
                  <p className="text-sm text-muted">Not provided</p>
                )}
              </div>
              <div>
                <p className="text-sm text-muted mb-1">Years of Experience</p>
                <p className="font-medium">
                  {application.yearsOfExperience} years
                </p>
              </div>
            </div>
          </div>

          {/* Cover Letter */}
          <div className="rounded-lg bg-white dark:bg-foreground/5 p-6 border">
            <h2 className="text-lg font-bold mb-4">Cover Letter</h2>
            <p className="text-sm leading-relaxed whitespace-pre-wrap">
              {application.coverLetter || "No cover letter provided"}
            </p>
          </div>

          {/* Additional Message */}
          <div className="rounded-lg bg-white dark:bg-foreground/5 p-6 mb-6 border">
            <h2 className="text-lg font-bold mb-4">Additional Message</h2>
            <p className="text-sm leading-relaxed whitespace-pre-wrap">
              {application.additionalMessage || (
                <span className="text-sm text-muted">Not provided</span>
              )}
            </p>
          </div>
        </div>

        {/* Right: Links & Documents */}
        <div className="space-y-6">
          {/* Resume */}
          <div className="rounded-lg bg-white dark:bg-foreground/5 p-6 shrink-0 min-w-44 border">
            <h3 className="font-bold mb-4 flex items-center gap-2">
              <FileText className="w-4 h-4" />
              Resume
            </h3>
            {application.resumeLink ? (
              <Link
                href={application.resumeLink}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-sm font-medium transition-colors text-center block text-nowrap"
                style={{ outline: "none", boxShadow: "none" }}
              >
                View Resume
              </Link>
            ) : (
              <p className="text-sm text-muted">No resume provided</p>
            )}
          </div>

          {/* LinkedIn */}
          <div className="rounded-lg bg-white dark:bg-foreground/5 p-6 border">
            <h3 className="font-bold mb-4 flex items-center gap-2">
              <LogoLinkedin className="w-4 h-4" />
              LinkedIn
            </h3>

            {application.linkedinProfile ? (
              <Link
                href={application.linkedinProfile}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full px-4 py-2 bg-stone-600 hover:bg-stone-700 dark:bg-transparent dark:hover:bg-transparent border-2 border-transparent dark:border-stone-500 dark:hover:border-stone-400 text-white rounded-sm font-medium transition-colors text-center block text-sm text-nowrap"
                style={{ outline: "none", boxShadow: "none" }}
              >
                View Profile
              </Link>
            ) : (
              <p className="text-sm text-muted">Not provided</p>
            )}
          </div>

          {/* Portfolio */}
          <div className="rounded-lg bg-white dark:bg-foreground/5 p-6 border">
            <h3 className="font-bold mb-4 flex items-center gap-2">
              <Globe className="w-4 h-4" />
              Portfolio
            </h3>

            {application.portfolio ? (
              <Link
                href={application.portfolio}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full px-4 py-2 bg-gray-600 hover:bg-gray-700 text-white rounded-sm font-medium transition-colors text-center block text-sm dark:bg-transparent dark:hover:bg-transparent border-2 border-transparent dark:border-gray-500 dark:hover:border-gray-400 text-nowrap"
                style={{ outline: "none", boxShadow: "none" }}
              >
                View Portfolio
              </Link>
            ) : (
              <p className="text-sm text-muted">Not provided</p>
            )}
          </div>

          {/* Application Meta */}
          <div className="rounded-lg bg-white dark:bg-foreground/5 p-6 border">
            <h3 className="font-bold mb-4">Details</h3>
            <div className="space-y-3 text-sm">
              <div>
                <p className="text-muted">Status</p>
                <p className="font-medium capitalize">{application.status}</p>
              </div>
              <div>
                <p className="text-muted">Application ID</p>
                <p className="text-xs break-all">{application._id}</p>
              </div>
              <Link
                href={`/jobs/${application.job.id}`}
                className="w-fit flex items-center gap-0.5 font-bold hover:underline active:underline select-none"
              >
                View Job <ArrowUpRight size={16} />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ApplicationDetails;
