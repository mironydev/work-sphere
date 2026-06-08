import { Button } from "@heroui/react";
import React from "react";

const BottomBanner = () => {
  return (
    <div className="mt-16 sm:mt-24 mx-4 py-20 px-4 bg-[radial-gradient(circle,rgba(0,0,0,0.1)_1px,transparent_2px)] dark:bg-[radial-gradient(circle,rgba(255,255,255,.2)_1px,transparent_1px)] bg-size-[20px_20px]">
      <h2 className="text-4xl/tight font-semibold text-center">
        Your Next Role is <br className="hidden md:block" /> Already Looking For
        You
      </h2>
      <p className="opacity-60 text-center mt-4 mb-8">
        Build a profile in three minutes. The matches start arriving tomorrow
        morning.
      </p>
      <div className="flex flex-wrap gap-3 justify-center">
        <Button
          className={
            "rounded-lg bg-black text-base py-5 text-white dark:bg-white dark:text-black"
          }
        >
          Create a free account
        </Button>
        <Button
          className={
            "rounded-lg text-base py-5 border-2 bg-stone-100 text-black dark:text-white dark:bg-black"
          }
        >
          View Pricing
        </Button>
      </div>
    </div>
  );
};

export default BottomBanner;
