import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import React from "react";
import Apply from "./Apply";
import { getJobDetails } from "@/lib/fetch/fetchJobs";

const ApplyPage = async ({ params }) => {
  const { id } = await params;
  const session = await auth.api.getSession({
    headers: await headers(),
  });
  const user = session?.user;

  if (!user) {
    redirect(`/login?redirect=jobs/${id}/apply`);
  }

  if (user.role !== "seeker") {
    return (
      <div className="mt-36 px-4 flex justify-center">
        <div className="max-w-md w-full rounded-xl border border-foreground/15 bg-foreground/5 p-8 text-center">
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
      <Apply job={job} user={user} />
    </div>
  );
};

export default ApplyPage;
