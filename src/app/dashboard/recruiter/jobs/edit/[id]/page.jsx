import RecruiterEditJob from "@/components/dashboard/RecruiterEditJob";
import { getJobDetails } from "@/lib/fetch/fetchJobs";

const RecruiterEditJobPage = async ({ params }) => {
  const { id } = await params;
  const job = await getJobDetails(id);
  return (
    <div className="px-0 sm:px-10">
      <RecruiterEditJob job={job} />
    </div>
  );
};

export default RecruiterEditJobPage;
