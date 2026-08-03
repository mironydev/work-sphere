import { Input, Label, TextArea } from "@heroui/react";
import React from "react";

const SeekerAdditional = () => {
  const inputClassName =
    "border border-foreground/10 rounded-md focus:ring-1 focus:ring-indigo-500 aria-invalid:focus:ring-red-500 bg-white dark:bg-black/40";

  return (
    <div className="rounded-lg border-t-2 dark:border border-white dark:border-foreground/10 bg-white/80 dark:bg-foreground/5 shadow-[0_1px_2px_rgba(0,0,0,0.06)]">
      <div className="p-6 pb-0">
        <h2 className="text-xl font-semibold">Professional Details</h2>
      </div>

      <div className="p-6 space-y-5">
        <div className="flex flex-col gap-1">
          <Label htmlFor="headline">Professional Headline</Label>
          <Input
            id="headline"
            placeholder="e.g. Senior UX/UI Designer"
            variant="secondary"
            className={inputClassName}
          />
        </div>

        <div className="flex flex-col gap-1">
          <Label htmlFor="bio">Bio</Label>
          <TextArea
            id="bio"
            placeholder="Tell employers about yourself..."
            variant="secondary"
            className={inputClassName}
            rows={5}
          />
        </div>

        <div className="flex flex-col gap-1">
          <Label htmlFor="skills">Skills</Label>
          <Input
            id="skills"
            placeholder="React, Next.js, TypeScript"
            variant="secondary"
            className={inputClassName}
          />
        </div>

        <button className="bg-foreground font-medium text-background px-4 py-2 cursor-pointer select-none rounded-sm active:bg-foreground/80 duration-75">
          Save Details
        </button>
      </div>
    </div>
  );
};

export default SeekerAdditional;
