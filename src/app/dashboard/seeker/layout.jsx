import { auth } from "@/lib/auth";
import { headers } from "next/headers";

const SeekerLayoutPage = async ({ children }) => {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (session?.user?.accountType !== "seeker") {
    return (
      <div>
        <div className="flex justify-center items-center -mt-26 sm:mt-0 h-screen sm:h-[60vh]">
          <div className="max-w-lg text-center rounded-xl shadow-xs border border-white dark:border-foreground/15 bg-white/70 dark:bg-foreground/5 px-4 py-8 sm:p-8">
            <h1 className="text-2xl font-semibold mb-3 text-red-400">
              Job Seeker Account Required
            </h1>
            <p className="text-foreground/70">
              This page is only available to job seeker accounts. Switch to a
              job seeker account to browse jobs, save positions, and track your
              applications.
            </p>
          </div>
        </div>
      </div>
    );
  }

  return children;
};

export default SeekerLayoutPage;
