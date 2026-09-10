import RecruiterHomepage from "@/components/dashboard/recruiter/RecruiterHomepage";
import { getRecruiterStats } from "@/lib/fetch/fetchRecruiterStats";

const RecruiterPage = async () => {
  const stats = await getRecruiterStats();

  return (
    <div>
      <RecruiterHomepage
        totalApplications={stats.totalApplications}
        totalJobs={stats.totalJobs}
        recentApplications={stats.recentApplications}
        topCompanies={stats.topCompanies}
        pendingReview={stats.pendingApplications}
        activeJobs={stats.activeJobs}
      />
    </div>
  );
};

export default RecruiterPage;
