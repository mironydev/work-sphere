import SeekerSavedJobs from "@/components/dashboard/seeker/SeekerSavedJobs";
import { auth } from "@/lib/auth";
import { getSavedJobs } from "@/lib/fetch/fetchJobs";
import { headers } from "next/headers";

const SavedJobsPage = async () => {
  const session = await auth.api.getSession({
    headers: await headers(),
  });
  const user = session?.user;
  const { result, total } = await getSavedJobs(user?.id);

  return (
    <div>
      <SeekerSavedJobs savedJobs={result} total={total} />
    </div>
  );
};

export default SavedJobsPage;
