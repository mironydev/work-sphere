"use client";

import Link from "next/link";

const primaryClass =
  "rounded-lg bg-black px-4 py-3 font-medium ring-2 ring-black/80 dark:ring-white ring-offset-2 ring-offset-background text-white dark:bg-white dark:text-black active:scale-95 duration-100";

const secondaryClass =
  "rounded-lg px-4 py-3 font-medium ring-2 ring-white dark:ring-black ring-offset-2 ring-offset-foreground/10 bg-white dark:bg-black active:scale-95 duration-100";

const BottomBanner = ({ user }) => {
  const dashboardHref =
    user?.accountType === "recruiter"
      ? "/dashboard/recruiter"
      : user?.role === "admin"
        ? "/dashboard/admin"
        : "/dashboard/seeker";

  const settingsHref = "/dashboard/seeker/profile"; // only ever used for seeker now

  const buttons =
    user?.accountType === "seeker"
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
      : user
        ? [
            {
              href: dashboardHref,
              label: "Go to dashboard",
              className: primaryClass,
            },
          ]
        : [
            {
              href: "/signup",
              label: "Create a free account",
              className: primaryClass,
            },
          ];

  const descriptions = {
    guest:
      "Create your profile, explore opportunities, and find a role that feels right for you.",
    seeker:
      "Keep your profile fresh, explore new opportunities, and find a role that feels right for you.",
    recruiter:
      "Post roles, review applicants, and find the right talent for your team.",
    admin: "Manage the platform and keep everything running smoothly.",
  };

  const description = !user
    ? descriptions.guest
    : (descriptions[user.role] ?? descriptions.seeker);

  return (
    <div className="mt-16 sm:mt-24 mx-4 py-20 px-4 relative overflow-hidden bg-[radial-gradient(circle,rgba(0,0,0,0.05)_1px,transparent_3px)] dark:bg-[radial-gradient(circle,rgba(255,255,255,.07)_1px,transparent_3px)] bg-size-[20px_20px]">
      <h2 className="text-4xl/tight font-bold text-center">
        Your Next Career Move <br className="hidden md:block" /> Starts Here
      </h2>

      <p className="opacity-60 text-center mt-4 mb-8">{description}</p>

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
