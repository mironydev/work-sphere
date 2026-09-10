import RecruiterPostJob from "@/components/dashboard/recruiter/RecruiterPostJob";
import { auth } from "@/lib/auth";
import { getMyCompanies } from "@/lib/fetch/fetchCompanies";
import { headers } from "next/headers";

export default async function AddJobPage() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });
  const userId = session?.user?.id;
  const companies = await getMyCompanies(userId);

  return <RecruiterPostJob companies={companies} userId={userId} />;
}
