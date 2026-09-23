import RecruiterHomepage from "@/components/dashboard/recruiter/RecruiterHomepage";
import { getRecruiterStats } from "@/lib/fetch/fetchRecruiterStats";

const RecruiterPage = async () => {
  const {
    totalApplications,
    totalJobs,
    recentApplications,
    pendingApplications,
    activeJobs,
  } = await getRecruiterStats();

  return (
    <div>
      <RecruiterHomepage
        totalApplications={totalApplications}
        totalJobs={totalJobs}
        recentApplications={recentApplications}
        pendingReview={pendingApplications}
        activeJobs={activeJobs}
      />
    </div>
  );
};

export default RecruiterPage;
