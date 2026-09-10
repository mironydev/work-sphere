import React from "react";
import SearchJobs from "./SearchJobs";
import Stats from "./Stats";

const Banner = () => {
  return (
    <div className="overflow-hidden pt-20">
      <div className="absolute inset-0 dark:bg-[radial-gradient(circle_at_top_left,rgba(120,120,120,.5),transparent_15%),radial-gradient(circle_at_top_right,rgba(120,120,120,.5),transparent_15%),radial-gradient(circle_at_top,rgba(120,120,120,0.3),transparent_20%)]" />

      <div className="relative z-10 flex flex-col ">
        <SearchJobs />
        <Stats />
      </div>
    </div>
  );
};

export default Banner;
