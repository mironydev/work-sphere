import Jobs from "@/components/jobs/Jobs";
import { getAllJobs } from "@/lib/fetch/fetchJobs";
import { auth } from "@/lib/auth";
import { getSavedJobs } from "@/lib/fetch/fetchJobs";
import { headers } from "next/headers";

const JobsPage = async ({ searchParams }) => {
  const searchQuery = await searchParams;
  const query = new URLSearchParams(searchQuery);
  const { jobs, total } = await getAllJobs(query.toString());

  const session = await auth.api.getSession({
    headers: await headers(),
  });
  const user = session?.user;
  const savedJobs = await getSavedJobs(user?.id);
  const data = savedJobs.result;

  return (
    <div className="mt-26 px-4">
      <Jobs
        jobs={jobs}
        total={total}
        searchQuery={searchQuery}
        savedJobs={data}
        user={user}
      />
    </div>
  );
};

export default JobsPage;
