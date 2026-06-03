import React from "react";
import { BriefcaseFill } from "@gravity-ui/icons";
import { Factory, PersonMagnifier, StarFill } from "@gravity-ui/icons";

const Stats = () => {
  return (
    <div className="px-4">
      <h3 className="text-4xl max-w-xl mx-auto text-center mb-12 text-white font-semibold text-shadow-lg/20">
        15,000+ job seekers have found opportunities through us.
      </h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        <div className="bg-linear-to-b from-white to-stone-300 dark:from-black dark:to-stone-900 p-5 rounded-xl border">
          <div>
            <BriefcaseFill />
          </div>
          <p className="text-6xl font-semibold mt-18 mb-4 ">30K+</p>
          <p>Active Jobs</p>
        </div>
        <div className="bg-linear-to-b from-white to-stone-300 dark:from-black dark:to-stone-900 p-5 rounded-xl border">
          <div>
            <Factory />
          </div>
          <p className="text-6xl font-semibold mt-18 mb-4 ">7K+</p>
          <p>Companies</p>
        </div>
        <div className="bg-linear-to-b from-white to-stone-300 dark:from-black dark:to-stone-900 p-5 rounded-xl border">
          <div>
            <PersonMagnifier />
          </div>
          <p className="text-6xl font-semibold mt-18 mb-4 ">1M+</p>
          <p>Job Seekers</p>
        </div>
        <div className="bg-linear-to-b from-white to-stone-300 dark:from-black dark:to-stone-900 p-5 rounded-xl border">
          <div>
            <StarFill />
          </div>
          <p className="text-6xl font-semibold mt-18 mb-4 ">98%</p>
          <p>Satisfaction Rate</p>
        </div>
      </div>
    </div>
  );
};

export default Stats;
