"use client";

import Pricing from "@/app/pricing/Pricing";
import { useEffect, useState } from "react";

const PricingHomepage = ({ user }) => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMounted(true);
  }, []);

  return (
    <div className="mt-28 sm:mt-36 px-4">
      <div className="text-center space-y-2">
        <div className="flex justify-center items-center gap-3">
          <span className="bg-indigo-500 h-2 w-2 rounded-xs"></span>
          <p className="text-lg text-stone-500 dark:text-stone-300">PRICING</p>
          <span className="bg-indigo-500 h-2 w-2 rounded-xs"></span>
        </div>

        <h2 className="text-4xl/tight font-semibold max-w-xl mx-auto">
          Unlock More Features, <br className="hidden sm:block" />
          Accelerate Your Job Search
        </h2>
      </div>

      <Pricing user={user} showSkeleton={!mounted} />
    </div>
  );
};

export default PricingHomepage;
