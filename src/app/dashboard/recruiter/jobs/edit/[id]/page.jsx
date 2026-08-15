import RecruiterEditJob from "@/components/dashboard/recruiter/RecruiterEditJob";
import { getJobDetails } from "@/lib/fetch/fetchJobs";

const RecruiterEditJobPage = async ({ params }) => {
  const { id } = await params;
  const job = await getJobDetails(id);
  return (
    <div>
      <RecruiterEditJob job={job} />
    </div>
  );
};

export default RecruiterEditJobPage;
