"use client";

import { useSessionClient } from "@/lib/helpers";
import Link from "next/link";
import React from "react";

const BottomBanner = () => {
  const { user } = useSessionClient();
  console.log(user);
  return (
    <div className="mt-16 sm:mt-24 mx-4 py-20 px-4 bg-[radial-gradient(circle,rgba(0,0,0,0.1)_1px,transparent_2px)] dark:bg-[radial-gradient(circle,rgba(255,255,255,.2)_1px,transparent_1px)] bg-size-[20px_20px]">
      <h2 className="text-4xl/tight font-semibold text-center">
        Your Next Role is <br className="hidden md:block" /> Already Looking For
        You
      </h2>
      <p className="opacity-60 text-center mt-4 mb-8">
        Build a profile in three minutes. The matches start arriving tomorrow
        morning.
      </p>
      <div className="flex flex-wrap gap-3 justify-center">
        {user ? (
          <>
            <Link
              href={
                user.role === "recruiter"
                  ? "dashboard/recruiter"
                  : "/dashboard/seeker"
              }
              className={
                "rounded-lg bg-black text-base px-4 py-3 font-medium text-white dark:bg-white dark:text-black"
              }
            >
              Go to dashboard
            </Link>
            <Link
              href={
                user.role === "recruiter"
                  ? "/dashboard/recruiter/settings"
                  : "/dashboard/seeker/settings"
              }
              className={
                "rounded-lg text-base px-4 py-3 font-medium border-2 bg-stone-100 text-black dark:text-white dark:bg-black"
              }
            >
              View Profile
            </Link>
          </>
        ) : (
          <>
            <Link
              href={"/signup"}
              className={
                "rounded-lg bg-black text-base px-4 py-3 font-medium text-white dark:bg-white dark:text-black"
              }
            >
              Create a free account
            </Link>
            <Link
              href={"/pricing"}
              className={
                "rounded-lg text-base px-4 py-3 font-medium border-2 bg-stone-100 text-black dark:text-white dark:bg-black"
              }
            >
              View Pricing
            </Link>
          </>
        )}
      </div>
    </div>
  );
};

export default BottomBanner;
