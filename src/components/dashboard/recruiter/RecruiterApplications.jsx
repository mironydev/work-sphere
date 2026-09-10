"use client";

import { useState } from "react";
import { capitalize, formatDate, useSessionClient } from "@/lib/helpers";
import { FileLetterX } from "@gravity-ui/icons";
import { ListBox, Select } from "@heroui/react";
import Link from "next/link";
import { toast } from "sonner";
import DashboardSpinner from "../DashboardSpinner";
import { useRouter } from "next/navigation";
import { updateApplicationStatus } from "@/lib/actions/application";
import { MoveUpRight } from "lucide-react";

const statusOptions = [
  "applied",
  "reviewing",
  "shortlisted",
  "interviewing",
  "offered",
  "rejected",
];

const RecruiterApplications = ({ applications }) => {
  const { isPending } = useSessionClient();
  const router = useRouter();
  const [updatingId, setUpdatingId] = useState(null);

  if (isPending) {
    return <DashboardSpinner />;
  }

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

  return (
    <div>
      <div>
        <h1 className="text-3xl font-semibold">Applications</h1>
        <p className="text-muted mt-1 mb-6">
          {applications.length} applications received
        </p>
      </div>

      <div className="overflow-x-auto rounded-lg dark:bg-foreground/3 border">
        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-gray-100 dark:bg-foreground/8">
              <th className="px-4 py-4 text-left font-medium text-xs text-muted">
                #
              </th>

              <th className="px-4 py-4 text-left font-medium text-xs text-muted">
                Applicant
              </th>

              <th className="px-4 py-4 text-left font-medium text-xs text-muted text-nowrap">
                Job Title
              </th>

              <th className="px-4 py-4 text-center font-medium text-xs text-muted">
                Experience
              </th>

              <th className="px-4 py-4 text-center font-medium text-xs text-muted">
                Applied
              </th>

              <th className="px-4 py-4 text-center font-medium text-xs text-muted">
                Status
              </th>

              <th className="px-4 py-4 text-left font-medium text-xs text-muted">
                Actions
              </th>
            </tr>
          </thead>

          <tbody>
            {applications.length === 0 ? (
              <tr>
                <td colSpan={7}>
                  <div className="flex flex-col items-center justify-center text-center py-10 bg-white dark:bg-foreground/5 border-t">
                    <FileLetterX className="scale-150 mb-3" />

                    <span className="text-xl text-muted">
                      No applications yet
                    </span>

                    <p className="text-sm text-muted">
                      Applications for your jobs will show up here.
                    </p>
                  </div>
                </td>
              </tr>
            ) : (
              applications.map((app, i) => (
                <tr
                  key={app._id}
                  className="border-t border-foreground/10 bg-white dark:border-white/10 dark:bg-foreground/3 hover:bg-gray-50 dark:hover:bg-foreground/5 transition-colors text-sm"
                >
                  <td className="px-4 py-3 text-muted">{i + 1}</td>

                  <td className="px-4 py-3 text-nowrap">
                    <p className="font-medium">
                      {app.user.name || "Not found"}
                    </p>
                  </td>

                  <td className="px-4 py-3 text-nowrap">
                    {app.job.title || "Not found"}
                  </td>

                  <td className="px-4 py-3 text-center text-nowrap">
                    {app.yearsOfExperience
                      ? `${app.yearsOfExperience} yrs`
                      : "Not found"}
                  </td>

                  <td className="px-4 py-3 text-center text-nowrap">
                    {formatDate(app.createdAt) || "Not found"}
                  </td>

                  <td className="px-4 py-3 text-center">
                    <Select
                      className="w-32 mx-auto hover:bg-foreground/5 rounded-md"
                      variant="secondary"
                      value={app.status}
                      isDisabled={updatingId === app._id}
                      onChange={(value) => handleStatusChange(app._id, value)}
                      aria-label="Application status"
                    >
                      <Select.Trigger
                        style={{
                          outline: "none",
                          boxShadow: "none",
                          borderRadius: "none",
                        }}
                        className="rounded-md bg-foreground/5"
                      >
                        <Select.Value className="text-sm" />
                        <Select.Indicator />
                      </Select.Trigger>

                      <Select.Popover className="rounded-md dark:bg-[#171717]">
                        <ListBox>
                          {statusOptions.map((option) => (
                            <ListBox.Item
                              key={option}
                              id={option}
                              textValue={capitalize(option)}
                              style={{
                                outline: "none",
                                boxShadow: "none",
                              }}
                              className="rounded-sm"
                            >
                              {capitalize(option)}
                              <ListBox.ItemIndicator />
                            </ListBox.Item>
                          ))}
                        </ListBox>
                      </Select.Popover>
                    </Select>
                  </td>

                  <td className="px-4 py-3">
                    <Link
                      href={`/dashboard/recruiter/applications/${app._id}`}
                      className="font-medium text-foreground/80 active:opacity-50 flex items-center gap-1"
                    >
                      <span>Details</span>
                      <MoveUpRight size={10} />
                    </Link>
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

export default RecruiterApplications;
