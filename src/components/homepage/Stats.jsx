import React from "react";
import {
  BriefcaseFill,
  Factory,
  PersonMagnifier,
  StarFill,
} from "@gravity-ui/icons";
import ShootingStars from "../ShootingStars";

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
    <div className="relative overflow-hidden pt-32 pb-28 sm:pb-36 px-4">
      <ShootingStars />
      <div className="relative z-10">
        <h3 className="max-w-xl mx-auto text-center text-4xl font-semibold mb-12">
          15,000+ job seekers have found opportunities through us.
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {stats.map((stat) => {
            const IconComponent = stat.icon;

            return (
              <div
                key={stat.label}
                className="bg-white/70 dark:bg-white/5 backdrop-blur-[2px] p-6 rounded-xl border border-black/10 dark:border-white/10"
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
