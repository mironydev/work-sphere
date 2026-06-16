import RecruiterPostJob from "@/components/dashboard/RecruiterPostJob";
import { auth } from "@/lib/auth";
import { getAllCompanies } from "@/lib/fetch/fetchJobs";
import { headers } from "next/headers";

export default async function AddJobPage() {
  const companies = await getAllCompanies();

  const session = await auth.api.getSession({
    headers: await headers(),
  });
  const userId = session?.user?.id;
  return <RecruiterPostJob companies={companies} userId={userId} />;
}
