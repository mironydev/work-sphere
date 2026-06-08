import React from "react";
import { BriefcaseFill } from "@gravity-ui/icons";
import { Factory, PersonMagnifier, StarFill } from "@gravity-ui/icons";

const Stats = () => {
  return (
    <div className="relative px-4 pt-64 overflow-hidden">
      <div className="absolute inset-0 bg-[url('/2.png')] lg:bg-[url('/1.png')] bg-no-repeat bg-size-[230%] md:bg-size-[120%] lg:bg-size-[100%] bg-position-[50%_0%] sm:bg-position-[50%_30%] lg:bg-position-[50%_18%] opacity-50 dark:opacity-100" />

      <div className="relative z-10">
        <div className="relative">
          <h3 className="absolute inset-0 max-w-xl mx-auto blur-[10px] text-center text-4xl font-semibold mb-12 text-black translate-x-0.5 translate-y-0.5">
            15,000+ job seekers have found opportunities through us.
          </h3>

          <h3 className="relative max-w-xl mx-auto text-center text-4xl font-semibold mb-12 text-white">
            15,000+ job seekers have found opportunities through us.
          </h3>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          <div className="bg-linear-to-b from-white to-stone-300 dark:from-black dark:to-stone-800 p-5 rounded-xl border">
            <div>
              <BriefcaseFill />
            </div>
            <p className="text-6xl font-semibold mt-18 mb-4">30K+</p>
            <p>Active Jobs</p>
          </div>

          <div className="bg-linear-to-b from-white to-stone-300 dark:from-black dark:to-stone-800 p-5 rounded-xl border">
            <div>
              <Factory />
            </div>
            <p className="text-6xl font-semibold mt-18 mb-4">7K+</p>
            <p>Companies</p>
          </div>

          <div className="bg-linear-to-b from-white to-stone-300 dark:from-black dark:to-stone-800 p-5 rounded-xl border">
            <div>
              <PersonMagnifier />
            </div>
            <p className="text-6xl font-semibold mt-18 mb-4">1M+</p>
            <p>Job Seekers</p>
          </div>

          <div className="bg-linear-to-b from-white to-stone-300 dark:from-black dark:to-stone-800 p-5 rounded-xl border">
            <div>
              <StarFill />
            </div>
            <p className="text-6xl font-semibold mt-18 mb-4">98%</p>
            <p>Satisfaction Rate</p>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Stats;
