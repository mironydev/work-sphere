"use client";

import { Button } from "@heroui/react";
import {
  ArrowRight,
  Check,
  Star,
  Person,
  ChartLineArrowUp,
} from "@gravity-ui/icons";
import React, { useState } from "react";

const Pricing = () => {
  const [isActive, setIsActive] = useState("monthly");

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
      <div className="w-fit p-1.5 bg-foreground/85 dark:bg-foreground/15 rounded-full mx-auto mt-10 mb-5 sm:mt-14 sm:mb-10 space-x-1">
        <Button
          onClick={() => {
            setIsActive("monthly");
          }}
          className={`${isActive === "monthly" ? "bg-white text-black" : "bg-transparent"}`}
        >
          Monthly
        </Button>
        <Button
          onClick={() => {
            setIsActive("yearly");
          }}
          className={`${isActive === "yearly" ? "bg-white text-black" : "bg-transparent"}`}
        >
          Yearly
        </Button>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-7 md:gap-4 lg:gap-7">
        <div className="border rounded-2xl px-5 py-8 flex flex-col justify-between inset-shadow-[0_1px_30px_rgba(255,255,255,1)] dark:inset-shadow-[0_1px_40px_rgba(255,255,255,.1)] dark:bg-foreground/10">
          <div>
            <div className="flex flex-wrap gap-3 justify-between">
              <div className="flex items-end gap-3">
                <div className="border bg-foreground/5 dark:bg-foreground/10 p-2 rounded-md">
                  <Person />
                </div>
                <p className="text-2xl">Starter</p>
              </div>
              <div className="flex items-end gap-1">
                <p className="text-4xl font-semibold">$0</p>
                <p className="opacity-70 flex">
                  /m<span className="md:hidden lg:block">onth</span>
                </p>
              </div>
            </div>
            <div className="mt-6 mb-10">
              <p>Get started with the essentials:</p>
              <div className="mt-3 space-y-2">
                <div className="flex items-end gap-2">
                  <span className="text-indigo-500">
                    <Check />
                  </span>
                  <p className="text-sm opacity-60">Browse job listings</p>
                </div>
                <div className="flex items-end gap-2">
                  <span className="text-indigo-500">
                    <Check />
                  </span>
                  <p className="text-sm opacity-60">Save up to 20 jobs</p>
                </div>
                <div className="flex items-end gap-2">
                  <span className="text-indigo-500">
                    <Check />
                  </span>
                  <p className="text-sm opacity-60">
                    Apply to 10 jobs per month
                  </p>
                </div>
                <div className="flex items-end gap-2">
                  <span className="text-indigo-500">
                    <Check />
                  </span>
                  <p className="text-sm opacity-60">Basic salary insights</p>
                </div>
              </div>
            </div>
          </div>
          <Button
            className={
              "flex justify-between py-6 px-6 w-full rounded-lg bg-black/85 dark:bg-foreground/20"
            }
          >
            <p>Choose This Plan</p>
            <ArrowRight />
          </Button>
        </div>
        <div className="relative  rounded-2xl px-5 py-8 flex flex-col justify-between inset-shadow-[0_0_40px_rgba(99,102,241,0.5)] bg-indigo-600 text-white dark:bg-indigo-600/30 mt-5 sm:mt-0">
          <div className="bg-linear-to-b from-white to-stone-300 dark:from-black dark:to-indigo-600 border-t  dark:border-gray-500 text-indigo-600 dark:text-white py-1.5 px-4 font-medium rounded-full absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 text-sm whitespace-nowrap">
            MOST POPULAR
          </div>
          <div>
            <div className="flex flex-wrap gap-3 justify-between">
              <div className="flex items-end gap-3">
                <div className=" bg-foreground/5 dark:bg-foreground/10 p-2 rounded-md">
                  <ChartLineArrowUp />
                </div>
                <p className="text-2xl">Pro</p>
              </div>
              <div className="flex items-end gap-1">
                <p className="text-4xl font-semibold">$20</p>
                <p className="opacity-70 flex">
                  /m<span className="md:hidden lg:block">onth</span>
                </p>
              </div>
            </div>
            <div className="mt-6 mb-10">
              <p>Unlock faster, smarter job searching:</p>
              <div className="mt-3 space-y-2">
                <div className="flex items-end gap-2">
                  <span className="text-indigo-500">
                    <Check />
                  </span>
                  <p className="text-sm opacity-60">
                    Unlimited job applications
                  </p>
                </div>
                <div className="flex items-end gap-2">
                  <span className="text-indigo-500">
                    <Check />
                  </span>
                  <p className="text-sm opacity-60">Unlimited saved jobs</p>
                </div>
                <div className="flex items-end gap-2">
                  <span className="text-indigo-500">
                    <Check />
                  </span>
                  <p className="text-sm opacity-60">AI job recommendations</p>
                </div>
                <div className="flex items-end gap-2">
                  <span className="text-indigo-500">
                    <Check />
                  </span>
                  <p className="text-sm opacity-60">
                    Company insight dashboards
                  </p>
                </div>
              </div>
            </div>
          </div>
          <Button
            className={
              "flex justify-between py-6 px-6 w-full rounded-lg bg-white dark:bg-indigo-600 "
            }
          >
            <p className="text-indigo-600 dark:text-white">Choose This Plan</p>
            <ArrowRight className="text-indigo-500 dark:text-white" />
          </Button>
        </div>
        <div className="border rounded-2xl px-5 py-8 flex flex-col justify-between inset-shadow-[0_1px_30px_rgba(255,255,255,1)] dark:inset-shadow-[0_1px_40px_rgba(255,255,255,.1)] dark:bg-foreground/10">
          <div>
            <div className="flex flex-wrap gap-3 justify-between">
              <div className="flex items-end gap-3">
                <div className="border bg-foreground/5 dark:bg-foreground/10 p-2 rounded-md">
                  <Star />
                </div>
                <p className="text-2xl">Premium</p>
              </div>
              <div className="flex items-end gap-1">
                <p className="text-4xl font-semibold">$99</p>
                <p className="opacity-70 flex">
                  /m<span className="md:hidden lg:block">onth</span>
                </p>
              </div>
            </div>
            <div className="mt-6 mb-10">
              <p>Stand out with professional career tools:</p>
              <div className="mt-3 space-y-2">
                <div className="flex items-end gap-2">
                  <span className="text-indigo-500">
                    <Check />
                  </span>
                  <p className="text-sm opacity-60">Everything in Pro</p>
                </div>
                <div className="flex items-end gap-2">
                  <span className="text-indigo-500">
                    <Check />
                  </span>
                  <p className="text-sm opacity-60">Premium resume builder</p>
                </div>
                <div className="flex items-end gap-2">
                  <span className="text-indigo-500">
                    <Check />
                  </span>
                  <p className="text-sm opacity-60">
                    Multi profile career portfolios
                  </p>
                </div>
                <div className="flex items-end gap-2">
                  <span className="text-indigo-500">
                    <Check />
                  </span>
                  <p className="text-sm opacity-60">Recruiter view access</p>
                </div>
              </div>
            </div>
          </div>
          <Button
            className={
              "flex justify-between py-6 px-6 w-full rounded-lg bg-black/85 dark:bg-foreground/20"
            }
          >
            <p>Choose This Plan</p>
            <ArrowRight />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Pricing;
