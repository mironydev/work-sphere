"use client";

import { useSessionClient } from "@/lib/helpers";
import { Avatar, Input, Label } from "@heroui/react";
import React from "react";

const SeekerProfile = () => {
  const { user } = useSessionClient();
  const inputClassName =
    "border border-foreground/10 rounded-md focus:ring-1 focus:ring-indigo-500 aria-invalid:focus:ring-red-500 bg-white dark:bg-black/40";

  return (
    <div className="rounded-lg border-t-2 dark:border border-white dark:border-foreground/10 bg-white/80 dark:bg-foreground/5 shadow-[0_1px_2px_rgba(0,0,0,0.06)]">
      <div className="p-6 pb-0">
        <h2 className="text-xl font-semibold">Profile Information</h2>
      </div>

      <div className="p-6 space-y-8">
        <div className="flex flex-row gap-5 items-start">
          <Avatar className="size-16 rounded-lg">
            <Avatar.Image alt="profile image" src={user?.image} />
            <Avatar.Fallback className="rounded-lg bg-background border dark:bg-foreground/50 text-2xl">
              {user.name?.[0]?.toUpperCase() || "U"}
            </Avatar.Fallback>
          </Avatar>

          <div>
            <button className="bg-background dark:bg-foreground/8 active:bg-transparent dark:active:bg-transparent border border-foreground/10 px-5 py-2 rounded-lg text-sm font-medium cursor-pointer">
              Change Avatar
            </button>
            <p className="text-xs text-muted mt-2">
              JPG, GIF or PNG. Max size of 5MB.
            </p>
          </div>
        </div>

        <div className="space-y-5">
          <div className="flex flex-col gap-1">
            <Label htmlFor="newName">New Name</Label>
            <Input
              id="newName"
              placeholder="Enter your new name"
              variant="secondary"
              className={inputClassName}
            />
          </div>
        </div>

        <div className="flex flex-wrap gap-4">
          <button className="bg-foreground font-medium text-background px-4 py-2 cursor-pointer select-none rounded-sm active:bg-foreground/80 duration-75">
            Update Profile
          </button>
          <button className="bg-red-50 dark:bg-red-600/4 px-3 font-medium dark:font-normal border border-red-100 dark:border-red-600/5 text-red-500 dark:text-rose-500 active:text-red-400 dark:active:text-red-700 rounded-sm cursor-pointer select-none">
            Reset Password
          </button>
        </div>
      </div>
    </div>
  );
};

export default SeekerProfile;
