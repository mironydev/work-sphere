import RecruiterApplications from "@/components/dashboard/recruiter/RecruiterApplications";
import { getRecruiterApplications } from "@/lib/fetch/fetchApplications";

const ApplicationsPage = async () => {
  const applications = await getRecruiterApplications();
  return <RecruiterApplications applications={applications} />;
};

export default ApplicationsPage;
