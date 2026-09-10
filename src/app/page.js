import Banner from "@/components/homepage/Banner";
import BottomBanner from "@/components/homepage/BottomBanner";
import Careertools from "@/components/homepage/Careertools";
import FeaturedJobs from "@/components/homepage/FeaturedJobs";
import PricingHomepage from "@/components/homepage/PricingHomepage";
import { auth } from "@/lib/auth";
import { getAllJobs } from "@/lib/fetch/fetchJobs";
import { headers } from "next/headers";

export default async function Home() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });
  const user = session?.user || null;
  const allJobs = await getAllJobs();
  const jobs = allJobs.jobs.slice(0, 6);
  return (
    <div>
      <Banner />
      <FeaturedJobs jobs={jobs} />
      <Careertools />
      <PricingHomepage user={user} />
      <BottomBanner user={user} />
    </div>
  );
}
