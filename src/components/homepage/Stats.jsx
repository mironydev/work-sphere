import React from "react";
import {
  BriefcaseFill,
  Factory,
  PersonMagnifier,
  StarFill,
} from "@gravity-ui/icons";

const Stats = () => {
  const stats = [
    {
      icon: BriefcaseFill,
      number: "30K+",
      label: "Active Jobs",
    },
    {
      icon: Factory,
      number: "7K+",
      label: "Companies",
    },
    {
      icon: PersonMagnifier,
      number: "1M+",
      label: "Job Seekers",
    },
    {
      icon: StarFill,
      number: "98%",
      label: "Satisfaction Rate",
    },
  ];

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
          {stats.map((stat) => {
            const IconComponent = stat.icon;
            return (
              <div
                key={stat.label}
                className="bg-linear-to-b from-white to-stone-200 dark:from-black dark:to-stone-800 p-5 rounded-xl border"
              >
                <IconComponent />
                <p className="text-6xl font-semibold mt-18 mb-4">
                  {stat.number}
                </p>
                <p>{stat.label}</p>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Stats;
