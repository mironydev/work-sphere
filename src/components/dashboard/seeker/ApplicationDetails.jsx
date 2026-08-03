"use client";

import React from "react";
import {
  LogoLinkedin,
  Clock,
  CircleCheckFill,
  PersonPencil,
  Xmark,
} from "@gravity-ui/icons";
import { FileText, Globe, Calendar } from "lucide-react";
import { formatDate } from "@/lib/helpers";
import Link from "next/link";
import { Badge, Chip } from "@heroui/react";

const ApplicationDetails = ({ application }) => {
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

  return (
    <div>
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-start justify-between gap-4 mb-4">
          <div>
            <h1 className="text-4xl font-bold mb-2">{application.job.title}</h1>
            <p className="text-xl text-muted">{application.company.name}</p>
          </div>
          <Chip
            className="pl-4 pr-5 text-sm pb-2 pt-1.75 rounded-md select-none"
            color={
              statusMap[application.status?.toLowerCase()]?.color || "default"
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
        </div>

        <div className="flex items-center gap-2 text-muted">
          <Calendar className="w-4 h-4" />
          Applied {formatDate(application.createdAt)}
        </div>
      </div>

      {/* Main Content */}
      <div className="grid grid-cols-3 gap-6">
        {/* Left: Application Info */}
        <div className="col-span-2 space-y-6">
          {/* Applicant Info */}
          <div className="rounded-lg border-t-2 border-white dark:border dark:border-foreground/15 bg-white/80 dark:bg-foreground/5 p-6 shadow-[0_1px_2px_rgba(0,0,0,0.06)]">
            <h2 className="text-lg font-semibold mb-4">
              Applicant Information
            </h2>
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
          <div className="rounded-lg border-t-2 border-white dark:border dark:border-foreground/15 bg-white/80 dark:bg-foreground/5 p-6 shadow-[0_1px_2px_rgba(0,0,0,0.06)]">
            <h2 className="text-lg font-semibold mb-4">Cover Letter</h2>
            <p className="text-sm leading-relaxed whitespace-pre-wrap">
              {application.coverLetter || "No cover letter provided"}
            </p>
          </div>

          {/* Additional Message */}
          <div className="rounded-lg border-t-2 border-white dark:border dark:border-foreground/15 bg-white/80 dark:bg-foreground/5 p-6 shadow-[0_1px_2px_rgba(0,0,0,0.06)]">
            <h2 className="text-lg font-semibold mb-4">Additional Message</h2>
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
          <div className="rounded-lg border-t-2 border-white dark:border dark:border-foreground/15 bg-white/80 dark:bg-foreground/5 p-6 shadow-[0_1px_2px_rgba(0,0,0,0.06)]">
            <h3 className="font-semibold mb-4 flex items-center gap-2">
              <FileText className="w-4 h-4" />
              Resume
            </h3>
            {application.resumeLink ? (
              <Link
                href={application.resumeLink}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-sm font-medium transition-colors text-center block"
              >
                View Resume
              </Link>
            ) : (
              <p className="text-sm text-muted">No resume provided</p>
            )}
          </div>

          {/* LinkedIn */}
          <div className="rounded-lg border-t-2 border-white dark:border dark:border-foreground/15 bg-white/80 dark:bg-foreground/5 p-6 shadow-[0_1px_2px_rgba(0,0,0,0.06)]">
            <h3 className="font-semibold mb-4 flex items-center gap-2">
              <LogoLinkedin className="w-4 h-4" />
              LinkedIn
            </h3>

            {application.linkedinProfile ? (
              <Link
                href={application.linkedinProfile}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full px-4 py-2 bg-stone-600 hover:bg-stone-700 dark:bg-transparent dark:hover:bg-transparent border-2 border-transparent dark:border-stone-500 dark:hover:border-stone-400 text-white rounded-sm font-medium transition-colors text-center block text-sm"
              >
                View Profile
              </Link>
            ) : (
              <p className="text-sm text-muted">Not provided</p>
            )}
          </div>

          {/* Portfolio */}
          <div className="rounded-lg border-t-2 border-white dark:border dark:border-foreground/15 bg-white/80 dark:bg-foreground/5 p-6 shadow-[0_1px_2px_rgba(0,0,0,0.06)]">
            <h3 className="font-semibold mb-4 flex items-center gap-2">
              <Globe className="w-4 h-4" />
              Portfolio
            </h3>

            {application.portfolio ? (
              <Link
                href={application.portfolio}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full px-4 py-2 bg-gray-600 hover:bg-gray-700 text-white rounded-sm font-medium transition-colors text-center block text-sm dark:bg-transparent dark:hover:bg-transparent border-2 border-transparent dark:border-gray-500 dark:hover:border-gray-400"
              >
                View Portfolio
              </Link>
            ) : (
              <p className="text-sm text-muted">Not provided</p>
            )}
          </div>

          {/* Application Meta */}
          <div className="rounded-lg border-t-2 border-white dark:border dark:border-foreground/15 bg-white/80 dark:bg-foreground/5 p-6 shadow-[0_1px_2px_rgba(0,0,0,0.06)]">
            <h3 className="font-semibold mb-4">Details</h3>
            <div className="space-y-3 text-sm">
              <div>
                <p className="text-muted">Status</p>
                <p className="font-medium capitalize">{application.status}</p>
              </div>
              <div>
                <p className="text-muted">Application ID</p>
                <p className="font-mono text-xs">{application._id}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ApplicationDetails;
