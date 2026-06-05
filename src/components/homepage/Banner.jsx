import React from "react";
import Findjobs from "./Findjobs";
import Stats from "./Stats";

const Banner = () => {
  return (
    <div className="overflow-hidden pt-5 md:pt-20">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(120,120,120,.5),transparent_15%),radial-gradient(circle_at_top_right,rgba(120,120,120,.5),transparent_15%),radial-gradient(circle_at_top,rgba(120,120,120,0.3),transparent_40%)]" />

      <div className="relative z-10 flex flex-col ">
        <Findjobs />
        <Stats />
      </div>
    </div>
  );
};

export default Banner;
