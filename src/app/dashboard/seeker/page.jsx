import SeekerHomepage from "@/components/dashboard/seeker/seekerHomepage/SeekerHomepage";
import { auth } from "@/lib/auth";
import { getApplications, getSavedJobs } from "@/lib/fetch/fetchJobs";
import { headers } from "next/headers";

const SeekerPage = async () => {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  const applications = await getApplications(session?.user?.id);
  const savedJobs = await getSavedJobs(session?.user?.id);
  const savedJobsCount = savedJobs.total;
  return (
    <div>
      <SeekerHomepage
        applications={applications}
        savedJobsCount={savedJobsCount}
      />
    </div>
  );
};

export default SeekerPage;
