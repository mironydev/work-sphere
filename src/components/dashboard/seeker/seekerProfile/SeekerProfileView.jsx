"use client";

import { FileText, MapPin, PencilToSquare } from "@gravity-ui/icons";
import { useSessionClient } from "@/lib/helpers";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { Mail, Phone } from "lucide-react";
import DashboardSpinner from "../../DashboardSpinner";

const Empty = ({ children = "Not added" }) => (
  <span className="italic text-sm text-muted">{children}</span>
);

const SeekerProfileView = () => {
  const { user, isPending } = useSessionClient();

  if (isPending) {
    return <DashboardSpinner />;
  }

  const skills =
    user?.skills
      ?.split(",")
      .map((s) => s.trim())
      .filter(Boolean) || [];

  return (
    <div className="space-y-6">
      {/* Hero */}
      <div className="relative overflow-hidden rounded-xl bg-white dark:bg-foreground/5 border">
        <div className="h-32 bg-linear-to-t sm:bg-linear-to-r from-[#161616] via-[#b0b0b0] sm:via-[#e1e1e1] to-white dark:from-[#858585] dark:via-[#262626] dark:to-black" />
        <div className="px-8 pb-6">
          <div className="-mt-16 flex flex-col items-center sm:items-start sm:flex-row sm:gap-4 md:gap-6">
            <div className="w-32 h-32 rounded-full border-3 dark:border-2 border-[#FCFCFC] dark:border-[#1D1D1D] overflow-hidden bg-gray-200 dark:bg-gray-500 flex items-center justify-center shrink-0 select-none">
              {user?.image ? (
                <Image
                  src={user.image}
                  alt={user.name}
                  width={128}
                  height={128}
                  className="w-full h-full object-cover"
                />
              ) : (
                <span className="text-5xl font-bold">
                  {user?.name?.charAt(0)?.toUpperCase() || "?"}
                </span>
              )}
            </div>

            <div className="flex-1 sm:pt-5 text-center sm:text-left">
              <h1 className="text-3xl pt-3 sm:pt-0 font-bold text-center sm:text-white sm:text-left sm:text-shadow-lg">
                {user?.name || <Empty>No name</Empty>}
              </h1>
              <p className="mt-3 text-center sm:text-left">
                {user?.headline || <Empty>Add professional headline</Empty>}
              </p>

              <div className="flex flex-wrap gap-3 mt-1.5 text-sm text-muted justify-center sm:justify-start">
                <span className="flex items-center gap-1">
                  <Mail width={14} />
                  {user?.email}
                </span>
                <span className="flex items-center gap-1">
                  <Phone width={14} />
                  {user?.phone || <Empty>No phone</Empty>}
                </span>
                <span className="flex items-center gap-1">
                  <MapPin width={14} />
                  {user?.city || user?.country ? (
                    [user.city, user.country].filter(Boolean).join(", ")
                  ) : (
                    <Empty>No location</Empty>
                  )}
                </span>
              </div>

              <div className="flex gap-2 mt-4 justify-center sm:justify-start">
                {user?.portfolio ? (
                  <Link
                    href={user.portfolio}
                    target="_blank"
                    className="px-4 py-1.5 rounded-lg bg-foreground/5 hover:bg-foreground/8 text-sm font-medium text-stone-600 hover:text-black dark:text-stone-300 dark:hover:text-white duration-75"
                  >
                    Portfolio
                  </Link>
                ) : (
                  <div className="px-4 py-1.5 rounded-lg border border-dashed border-foreground/20 text-muted text-sm">
                    No Portfolio
                  </div>
                )}

                {user?.linkedin ? (
                  <Link
                    href={user.linkedin}
                    target="_blank"
                    className="px-4 py-1.5 rounded-lg bg-foreground/5 hover:bg-foreground/8 text-sm flex items-center gap-1 font-medium text-stone-600 hover:text-black dark:text-stone-300 dark:hover:text-white duration-75"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="1em"
                      height="1em"
                      viewBox="0 0 256 256"
                    >
                      <g fill="none">
                        <rect
                          width={256}
                          height={256}
                          fill="#0a66c2"
                          rx={60}
                        ></rect>
                        <path
                          fill="#fff"
                          d="M184.715 217.685h29.27a4 4 0 0 0 4-3.999l.015-61.842c0-32.323-6.965-57.168-44.738-57.168c-14.359-.534-27.9 6.868-35.207 19.228a.32.32 0 0 1-.595-.161V101.66a4 4 0 0 0-4-4h-27.777a4 4 0 0 0-4 4v112.02a4 4 0 0 0 4 4h29.268a4 4 0 0 0 4-4v-55.373c0-15.657 2.97-30.82 22.381-30.82c19.135 0 19.383 17.916 19.383 31.834v54.364a4 4 0 0 0 4 4M38 59.628c0 11.864 9.767 21.626 21.632 21.626c11.862-.001 21.623-9.769 21.623-21.631C81.253 47.761 71.491 38 59.628 38C47.762 38 38 47.763 38 59.627m6.959 158.058h29.307a4 4 0 0 0 4-4V101.66a4 4 0 0 0-4-4H44.959a4 4 0 0 0-4 4v112.025a4 4 0 0 0 4 4"
                        ></path>
                      </g>
                    </svg>
                    LinkedIn
                  </Link>
                ) : (
                  <div className="px-4 py-1.5 rounded-lg border border-dashed border-foreground/20 text-muted text-sm">
                    No LinkedIn
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
        <Link
          href={"/dashboard/seeker/profile/edit"}
          className="absolute top-3 right-3 flex items-center gap-2 bg-foreground/90 sm:bg-transparent text-background sm:text-foreground font-medium rounded-lg p-3 sm:px-4 sm:py-2 select-none"
        >
          <span className="hidden sm:block">Edit Profile</span>
          <PencilToSquare className="scale-110 sm:scale-100" />
        </Link>
      </div>

      {/* About + Resume */}
      <div className="grid lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 rounded-xl bg-white dark:bg-foreground/5 p-6 border">
          <h2 className="text-xl font-semibold mb-4">About</h2>

          <p className="leading-7 text-muted">
            {user?.bio || <Empty>No info has been added yet.</Empty>}
          </p>
        </div>

        <div className="rounded-xl bg-white dark:bg-foreground/5 p-6 border">
          <h2 className="text-xl font-semibold mb-4">Resume</h2>

          {user?.resumeLink ? (
            <>
              <div className="flex items-center gap-3">
                <div className="p-3 rounded-lg bg-foreground/5">
                  <FileText />
                </div>

                <div>
                  <p className="font-medium">Resume uploaded</p>

                  <p className="text-sm text-muted">Ready for employers</p>
                </div>
              </div>

              <Link
                href={user.resumeLink}
                target="_blank"
                className="block text-center mt-6 rounded-lg border-2 border-foreground/3 dark:border-foreground/10 py-2 bg-foreground/5 hover:bg-foreground/10 active:bg-foreground/5 duration-100"
              >
                View Resume
              </Link>
            </>
          ) : (
            <Empty>No resume uploaded.</Empty>
          )}
        </div>
      </div>

      {/* Skills */}
      <div className="rounded-xl bg-white dark:bg-foreground/5 p-6 border">
        <h2 className="text-xl font-semibold mb-4">Skills</h2>

        {skills.length ? (
          <div className="flex flex-wrap gap-2">
            {skills.map((skill) => (
              <span
                key={skill}
                className="px-3 py-1 rounded-md bg-foreground/10 text-sm"
              >
                {skill}
              </span>
            ))}
          </div>
        ) : (
          <Empty>No skills added</Empty>
        )}
      </div>

      {/* Professional */}
      <div className="rounded-xl bg-white dark:bg-foreground/5 p-6 border">
        <div className="flex justify-between items-center">
          <h2 className="text-xl font-semibold">Professional Information</h2>
          <Link
            href={"/dashboard/seeker/profile/edit"}
            className="flex items-center gap-2 bg-foreground/5 dark:bg-foreground/10 text-foreground font-medium rounded-lg p-3 sm:px-4 sm:py-2 select-none"
          >
            <span className="hidden sm:block">Edit</span>
            <PencilToSquare className="scale-110 sm:scale-100" />
          </Link>
        </div>

        <hr className="my-5 border-foreground/10" />

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div>
            <p className="text-sm text-muted">Years of Experience</p>
            <p className="mt-1 font-medium">
              {user?.yearsOfExperience || <Empty />}
            </p>
          </div>

          <div>
            <p className="text-sm text-muted">Phone Number</p>
            <p className="mt-1 font-medium">{user?.phone || <Empty />}</p>
          </div>

          <div>
            <p className="text-sm text-muted">Location</p>
            <p className="mt-1 font-medium">
              {user?.city || user?.country ? (
                [user.city, user.country].filter(Boolean).join(", ")
              ) : (
                <Empty />
              )}
            </p>
          </div>

          <div>
            <p className="text-sm text-muted">Email</p>
            <p className="mt-1 font-medium break-all">{user?.email}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SeekerProfileView;
