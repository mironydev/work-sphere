import { Button, Input } from "@heroui/react";
import React from "react";
import { Magnifier, Briefcase } from "@gravity-ui/icons";

const SearchJobs = () => {
  return (
    <div className="text-center px-4 space-y-5 mt-12 sm:mt-20 2xl:mt-28">
      <div className="bg-linear-to-b from-white via-white to-stone-100 dark:from-stone-900 dark:via-stone-950 dark:to-stone-950 rounded-full px-5 py-2 w-fit mx-auto border-b-2 dark:border-b-0 dark:border-t dark:border-foreground/25 text-xs select-none">
        <p className="flex flex-wrap justify-center items-center gap-2 ">
          <span>
            <Briefcase />
          </span>
          <span className="font-bold">10,000+</span>
          <span className="opacity-70 font-medium">NEW JOBS THIS MONTH</span>
        </p>
      </div>
      <h2 className="font-bold text-5xl/tight">
        Search Jobs. <br className="sm:hidden" /> Apply Faster. <br />
        Get Hired.
      </h2>
      <p className="opacity-60 max-w-2xl mx-auto">
        WorkSphere helps you find and apply to jobs from top companies. Explore
        thousands of opportunities and move faster in your career.
      </p>
      <div className="mt-8 w-full sm:w-96 relative mx-auto">
        <Magnifier className="absolute left-4 top-1/2 -translate-y-1/2" />
        <Input
          aria-label="Name"
          className="w-full dark:bg-foreground/5 border border-black/20 dark:border-white/20 rounded-xl py-4 pr-15 pl-11 focus:ring-1 ring-indigo-500 shadow-none placeholder:text-foreground/40"
          placeholder="Enter job title, skill or company"
        />

        <button className="px-3 py-2.5 rounded-lg absolute right-2.5 top-1/2 -translate-y-1/2 bg-indigo-600 active:bg-indigo-700 text-white cursor-pointer duration-75">
          <Magnifier />
        </button>
      </div>
      <div className="flex flex-col sm:flex-row justify-center items-center gap-3">
        <p className="opacity-60">Trending Position</p>
        <div className="space-y-2 sm:space-y-0 sm:flex flex-row items-center justify-center gap-1">
          <p className="bg-white/80 dark:bg-foreground/5 py-1.5 px-4 rounded-full border-t border-foreground/5 text-sm sm:text-base dark:border dark:border-white/20 shadow-xs">
            UX Designer
          </p>
          <p className="bg-white/80 dark:bg-foreground/5 py-1.5 px-4 rounded-full border-t border-foreground/5 text-sm sm:text-base dark:border dark:border-white/20 shadow-xs">
            Marketing Coordinator
          </p>
          <p className="bg-white/80 dark:bg-foreground/5 py-1.5 px-4 rounded-full border-t border-foreground/5 text-sm sm:text-base dark:border dark:border-white/20 shadow-xs">
            DevOps Engineer
          </p>
        </div>
      </div>
    </div>
  );
};

export default SearchJobs;
