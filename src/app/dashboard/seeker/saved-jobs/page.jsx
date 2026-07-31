import SeekerSavedJobs from "@/components/dashboard/seeker/SeekerSavedJobs";
import { auth } from "@/lib/auth";
import { getSavedJobs } from "@/lib/fetch/fetchJobs";
import { headers } from "next/headers";

const SavedJobsPage = async () => {
  const session = await auth.api.getSession({
    headers: await headers(),
  });
  const user = session?.user;
  const savedJobs = await getSavedJobs(user?.id);
  const data = savedJobs.result;

  return (
    <div>
      <SeekerSavedJobs savedJobs={data} />
    </div>
  );
};

export default SavedJobsPage;
