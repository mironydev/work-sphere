import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import React from "react";
import Apply from "./Apply";
import { getJobDetails, getPlans } from "@/lib/fetch/fetchJobs";
import { getApplications } from "@/lib/fetch/fetchApplications";

const ApplyPage = async ({ params }) => {
  const { id } = await params;
  const session = await auth.api.getSession({
    headers: await headers(),
  });
  const user = session?.user;

  const plan = await getPlans(user?.plan);

  const applications = await getApplications(user?.id);
  const totalApplications = applications.length;

  if (!user) {
    redirect(`/login?redirect=jobs/${id}/apply`);
  }

  if (user.accountType !== "seeker") {
    return (
      <div className="mt-36 px-4 flex justify-center">
        <div className="max-w-md w-full rounded-xl border border-white dark:border-foreground/15 bg-white/70 dark:bg-foreground/5 p-8 text-center shadow-xs">
          <div className="pt-2 pb-5">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="3em"
              height="3em"
              viewBox="0 0 24 24"
              className="w-full"
            >
              <g
                fill="none"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1}
              >
                <path d="M8 13V5.5a1.5 1.5 0 0 1 3 0V12m0-6.5v-2a1.5 1.5 0 1 1 3 0V12m0-6.5a1.5 1.5 0 0 1 3 0V12"></path>
                <path d="M17 7.5a1.5 1.5 0 0 1 3 0V16a6 6 0 0 1-6 6h-2h.208a6 6 0 0 1-5.012-2.7L7 19q-.468-.718-3.286-5.728a1.5 1.5 0 0 1 .536-2.022a1.87 1.87 0 0 1 2.28.28L8 13"></path>
              </g>
            </svg>
          </div>
          <h2 className="text-2xl font-semibold mb-3">
            Job Seeker Account Required
          </h2>
          <p className="text-foreground/70">
            Only job seekers can apply for positions. Please sign in with a
            seeker account to continue.
          </p>
        </div>
      </div>
    );
  }

  const job = await getJobDetails(id);

  return (
    <div className="mt-26 px-4">
      <Apply
        job={job}
        user={user}
        totalApplications={totalApplications}
        plan={plan}
      />
    </div>
  );
};

export default ApplyPage;
