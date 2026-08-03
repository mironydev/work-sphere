import { useSessionClient } from "@/lib/helpers";
import { Avatar } from "@heroui/react";
import Link from "next/link";
import React from "react";

const Profile = () => {
  const { user } = useSessionClient();

  // Calculate profile completion percentage
  const getProfileCompletion = () => {
    let completed = 0;
    const fields = ["name", "email", "image"];

    fields.forEach((field) => {
      if (user[field]) completed++;
    });

    return Math.round((completed / fields.length) * 100);
  };

  // Format plan name
  const formatPlanName = (plan) => {
    return plan
      .split("_")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");
  };

  // Get plan color
  const getPlanColor = (plan) => {
    if (plan.includes("seeker")) {
      if (plan.includes("starter")) return "bg-foreground/5 text-foreground";
      if (plan.includes("pro"))
        return "bg-blue-600/15 text-blue-600 dark:text-blue-400";
      if (plan.includes("premium"))
        return "bg-gradient-to-r from-blue-600 to-cyan-500 text-white font-bold"; // Premium gradient
    } else if (plan.includes("recruiter")) {
      if (plan.includes("starter")) return "bg-foreground/5 text-foreground";
      if (plan.includes("pro"))
        return "bg-orange-600/15 text-orange-600 dark:text-orange-400";
      if (plan.includes("premium"))
        return "bg-gradient-to-r from-amber-500 to-orange-600 text-white font-bold"; // Premium gradient
    }
    return "bg-gray-600/10 text-gray-600";
  };

  const profileCompletion = getProfileCompletion();

  return (
    <div className="bg-white/80 dark:bg-foreground/5 p-5 rounded-lg border-t-2 dark:border-t border-white dark:border-white/10 shadow-[0_1px_2px_rgba(0,0,0,0.06)] flex flex-col justify-between gap-5 w-full md:w-fit flex-1">
      <div className="flex gap-4">
        <Avatar className="rounded-lg bg-transparent">
          <Avatar.Image alt={user.name} src={user.image} />
          <Avatar.Fallback className="rounded-lg">
            {user.name.charAt(0).toUpperCase()}
          </Avatar.Fallback>
        </Avatar>
        <div>
          <p className="text-xl leading-4 mb-1">{user.name}</p>
          <p className="text-sm text-muted">{user.email}</p>
          <span
            className={`inline-block text-xs font-semibold px-3 py-1 rounded-md mt-1.5 ${getPlanColor(
              user.plan,
            )}`}
          >
            {formatPlanName(user.plan)}
          </span>
        </div>
      </div>

      {/* Profile Completion Circle */}
      <div className="flex justify-center">
        <div className="relative w-30 h-30 flex items-center justify-center">
          <svg
            className="w-full h-full transform -rotate-90"
            viewBox="0 0 100 100"
          >
            {/* Background circle */}
            <circle
              cx="50"
              cy="50"
              r="45"
              fill="none"
              stroke="currentColor"
              strokeWidth="4"
              className="text-foreground/10"
            />
            {/* Progress circle */}
            <circle
              cx="50"
              cy="50"
              r="45"
              fill="none"
              stroke="currentColor"
              strokeWidth="4"
              strokeDasharray={`${2 * Math.PI * 45}`}
              strokeDashoffset={`${2 * Math.PI * 45 * (1 - profileCompletion / 100)}`}
              className="text-indigo-600 dark:text-indigo-400 transition-all duration-500"
              strokeLinecap="round"
            />
          </svg>
          <div className="absolute flex flex-col items-center">
            <p className="text-2xl font-semibold">{profileCompletion}%</p>
            <p className="text-xs text-muted">Complete</p>
          </div>
        </div>
      </div>

      <Link
        href={"/dashboard/seeker/settings"}
        className="border border-foreground/20 dark:border-white/10 px-5 py-2 rounded-sm cursor-pointer bg-black hover:bg-black/80 dark:bg-white dark:hover:bg-white/80 text-background w-full duration-75 active:scale-95 text-sm font-medium text-center"
      >
        Edit Profile
      </Link>
    </div>
  );
};

export default Profile;
