import React from "react";
import Findjobs from "./Findjobs";
import Stats from "./Stats";

const Banner = () => {
  return (
    <div className="relative  bg-position-[50%_25%] w-full  pt-5 md:pt-20">
      <div className="absolute inset-0 bg-[url('/globe-2.png')] lg:bg-[url('/globe.png')] bg-[length:300%] min-[500px]:bg-[length:200%] sm:bg-[length:140%] bg-[position:50%_0%] md:bg-cover bg-no-repeat md:bg-[position:50%_0%] opacity-70 dark:opacity-100" />

      <div className="relative z-10 flex flex-col gap-28 sm:gap-52">
        <Findjobs />
        <Stats />
      </div>
    </div>
  );
};

export default Banner;
