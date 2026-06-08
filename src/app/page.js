import AuthToast from "@/components/AuthToast";
import Banner from "@/components/homepage/Banner";
import BottomBanner from "@/components/homepage/BottomBanner";
import Careertools from "@/components/homepage/Careertools";
import FeaturedJobs from "@/components/homepage/FeaturedJobs";
import Pricing from "@/components/homepage/Pricing";

export default function Home() {
  return (
    <div>
      <Banner />
      <FeaturedJobs />
      <Careertools />
      <Pricing />
      <BottomBanner />
      <AuthToast />
    </div>
  );
}
