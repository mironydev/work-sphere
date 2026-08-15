"use client";

import Link from "next/link";
import React from "react";

const primaryClass =
  "rounded-lg bg-black px-4 py-3 font-medium ring-2 ring-black/80 dark:ring-white ring-offset-2 ring-offset-background dark:ring-offset-background text-white dark:bg-white dark:text-black";

const secondaryClass =
  "rounded-lg px-4 py-3 font-medium ring-2 ring-white dark:ring-black ring-offset-2 ring-offset-foreground/10 dark:ring-offset-foreground/10 bg-white dark:bg-black";

const BottomBanner = ({ user }) => {
  const dashboardHref =
    user?.role === "recruiter"
      ? "/dashboard/recruiter"
      : user?.role === "admin"
        ? "/dashboard/admin"
        : "/dashboard/seeker";

  const settingsHref =
    user?.role === "recruiter"
      ? "/dashboard/recruiter/settings"
      : user?.role === "admin"
        ? "/dashboard/admin/settings"
        : "/dashboard/seeker/settings";

  const buttons = user
    ? [
        {
          href: dashboardHref,
          label: "Go to dashboard",
          className: primaryClass,
        },
        {
          href: settingsHref,
          label: "View Profile",
          className: secondaryClass,
        },
      ]
    : [
        {
          href: "/signup",
          label: "Create a free account",
          className: primaryClass,
        },
        { href: "/pricing", label: "View Pricing", className: secondaryClass },
      ];

  return (
    <div className="mt-16 sm:mt-24 mx-4 py-20 px-4 relative overflow-hidden bg-[radial-gradient(circle,rgba(0,0,0,0.1)_1px,transparent_2px)] dark:bg-[radial-gradient(circle,rgba(255,255,255,.2)_1px,transparent_1px)] bg-size-[20px_20px]">
      <h2 className="text-4xl/tight font-semibold text-center">
        Your Next Career Move <br className="hidden md:block" /> Starts Here
      </h2>

      <p className="opacity-60 text-center mt-4 mb-8">
        Create your profile, explore opportunities, and find a role that feels
        right for you.
      </p>
      <div className="flex flex-wrap gap-5 justify-center">
        {buttons.map((btn) => (
          <Link key={btn.href} href={btn.href} className={btn.className}>
            {btn.label}
          </Link>
        ))}
      </div>
    </div>
  );
};

export default BottomBanner;
