import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

const SeekerLayoutPage = async ({ children }) => {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  const user = session?.user;

  if (!user) {
    redirect("/login");
  }

  if (user.role !== "seeker") {
    return (
      <div>
        <div className="md:pl-4 flex justify-center items-center min-h-[40vh] sm:min-h-[60vh]">
          <div className="max-w-lg text-center rounded-xl shadow-xs border border-white dark:border-foreground/15 bg-white/70 dark:bg-foreground/5 p-8">
            <h1 className="text-2xl font-semibold mb-3 text-red-500">
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
