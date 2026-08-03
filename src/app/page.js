import AuthToast from "@/components/AuthToast";
import Banner from "@/components/homepage/Banner";
import BottomBanner from "@/components/homepage/BottomBanner";
import Careertools from "@/components/homepage/Careertools";
import FeaturedJobs from "@/components/homepage/FeaturedJobs";
import Pricing from "@/components/homepage/Pricing";
import { getAllJobs } from "@/lib/fetch/fetchJobs";

export default async function Home() {
  const allJobs = await getAllJobs();
  const jobs = allJobs.jobs.slice(0, 6);
  return (
    <div>
      <Banner />
      <FeaturedJobs jobs={jobs} />
      <Careertools />
      <Pricing />
      <BottomBanner />
      <AuthToast />
    </div>
  );
}
