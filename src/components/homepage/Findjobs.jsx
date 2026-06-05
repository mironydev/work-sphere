import { Button, Input } from "@heroui/react";
import React from "react";
import { Magnifier, Briefcase } from "@gravity-ui/icons";

const Findjobs = () => {
  return (
    <div className="text-center space-y-5 mt-32 px-4">
      <div className="bg-linear-to-b from-white to-stone-300 dark:from-stone-900 dark:to-black rounded-full px-5 py-2 w-fit mx-auto border-t dark:border-foreground/30">
        <p className="flex flex-wrap justify-center items-center gap-2 ">
          <span>
            <Briefcase />
          </span>
          <span className="font-semibold">10,000+</span>
          <span className="opacity-70">NEW JOBS THIS MONTH</span>
        </p>
      </div>
      <h2 className="font-semibold text-4xl/tight sm:text-5xl/tight">
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
          className="w-full border border-black/20 dark:border-white/20 rounded-xl py-4 pr-15 pl-11"
          placeholder="Enter job title, skill or company"
        />

        <Button className="rounded-lg absolute right-2 top-1/2 -translate-y-1/2 bg-indigo-600">
          <Magnifier />
        </Button>
      </div>
      <div className="flex flex-col sm:flex-row justify-center items-center gap-3">
        <p className="opacity-60">Trending Position</p>
        <div className="space-y-2 sm:space-y-0 sm:flex flex-row items-center justify-center gap-1">
          <p className="bg-stone-200 dark:bg-stone-900 py-1.5 px-4 rounded-full border border-white/70 dark:border-white/20">
            UX Designer
          </p>
          <p className="bg-stone-200 dark:bg-stone-900 py-1.5 px-4 rounded-full border border-white/70 dark:border-white/20">
            Marketing Coordinator
          </p>
          <p className="bg-stone-200 dark:bg-stone-900 py-1.5 px-4 rounded-full border border-white/70 dark:border-white/20">
            DevOps Engineer
          </p>
        </div>
      </div>
    </div>
  );
};

export default Findjobs;
