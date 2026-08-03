import React from "react";
import { CheckCircle, XCircle, Bell, MessageSquare, Star } from "lucide-react";
import { formatDate } from "@/lib/helpers";
import { Link } from "@heroui/react";

const RecentActivity = () => {
  const activities = [
    {
      id: 1,
      icon: CheckCircle,
      message:
        "Your application for Frontend Developer at Tech Corp was approved",
      timestamp: new Date("2026-07-25T10:30:00"),
      type: "success",
    },
    {
      id: 2,
      icon: Bell,
      message: "New job matching your profile: Senior React Developer",
      timestamp: new Date("2026-07-24T14:15:00"),
      type: "info",
    },
    {
      id: 3,
      icon: MessageSquare,
      message: "Recruiter sent you a message regarding your application",
      timestamp: new Date("2026-07-23T09:45:00"),
      type: "message",
    },
    {
      id: 4,
      icon: XCircle,
      message:
        "Your application for UI/UX Designer at Design Studio was rejected",
      timestamp: new Date("2026-07-22T16:20:00"),
      type: "error",
    },
    {
      id: 5,
      icon: Star,
      message: "You saved 'Full Stack Developer' job at StartUp Inc",
      timestamp: new Date("2026-07-21T11:00:00"),
      type: "saved",
    },
  ];

  const getIconColor = (type) => {
    switch (type) {
      case "success":
        return "text-green-600 dark:text-green-400 bg-green-600/10";
      case "error":
        return "text-red-600 dark:text-red-400 bg-red-600/10";
      case "message":
        return "text-blue-600 dark:text-blue-400 bg-blue-600/10";
      case "info":
        return "text-yellow-600 dark:text-yellow-400 bg-yellow-600/10";
      case "saved":
        return "text-purple-600 dark:text-purple-400 bg-purple-600/10";
      default:
        return "text-gray-600 dark:text-gray-400 bg-gray-600/10";
    }
  };

  return (
    <div className="rounded-lg border-t-2 dark:border-t border-white dark:border-foreground/15 overflow-hidden mt-6 shadow-[0_1px_2px_rgba(0,0,0,0.06)]">
      {/* Header */}
      <div className="bg-white/80 dark:bg-foreground/2 p-6 border-b border-foreground/10 flex justify-between items-center">
        <h3 className="text-lg font-semibold">
          Recent Activity{" "}
          <span className="text-xs text-muted font-normal">[dummy data]</span>
        </h3>
        <Link
          href="#"
          className="text-sm hover:underline cursor-pointer"
          style={{ outline: "none", boxShadow: "none" }}
        >
          View all activity
          <Link.Icon />
        </Link>
      </div>

      {/* Activities */}
      {/* Activities */}
      {activities.length > 0 ? (
        <div className="bg-white/50 dark:bg-black/30 divide-y divide-foreground/10">
          {activities.map((activity) => {
            const IconComponent = activity.icon;
            const timeAgo = getTimeAgo(activity.timestamp);

            return (
              <div
                key={activity.id}
                className="flex items-center gap-4 p-6 hover:bg-foreground/3 transition-colors"
              >
                {/* Left: Icon */}
                <div
                  className={`p-2 rounded-lg shrink-0 ${getIconColor(
                    activity.type,
                  )}`}
                >
                  <IconComponent className="w-5 h-5" />
                </div>

                {/* Middle: Message */}
                <div className="flex-1 min-w-0">
                  <p className="text-sm text-foreground">{activity.message}</p>
                </div>

                {/* Right: Date/Time */}
                <div className="text-xs text-muted shrink-0">{timeAgo}</div>
              </div>
            );
          })}
        </div>
      ) : (
        <div className="bg-white/50 dark:bg-black/30 p-12 text-center">
          <p className="text-sm text-muted">
            No activity yet. Start exploring jobs!
          </p>
        </div>
      )}
    </div>
  );
};

// Helper function to format time ago
const getTimeAgo = (date) => {
  const now = new Date();
  const seconds = Math.floor((now - date) / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);

  if (seconds < 60) return "Just now";
  if (minutes < 60) return `${minutes}m ago`;
  if (hours < 24) return `${hours}h ago`;
  if (days < 7) return `${days}d ago`;
  return formatDate(date);
};

export default RecentActivity;
