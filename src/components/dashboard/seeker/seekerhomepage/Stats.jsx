import {
  BookmarkCheck,
  CalendarClock,
  ClipboardClock,
  FileUser,
} from "lucide-react";
import React from "react";

const Stats = ({ savedJobsCount, applications }) => {
  const stat = applications.reduce((acc, app) => {
    acc[app.status] = (acc[app.status] || 0) + 1;
    return acc;
  }, {});

  const cards = [
    { title: "Saved Jobs", number: savedJobsCount || 0, icon: BookmarkCheck },
    {
      title: "Applications Submitted",
      number: applications.length || 0,
      icon: FileUser,
    },
    {
      title: "Interviews Scheduled",
      number: stat.interviewing || 0,
      icon: ClipboardClock,
    },
    {
      title: "Offers Received",
      number: stat.offered || 0,
      icon: CalendarClock,
    },
  ];

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
      {cards.map((card, i) => {
        const IconComponent = card.icon;
        return (
          <div
            key={i}
            className="bg-white dark:bg-foreground/5 p-5 rounded-lg flex-1 flex flex-col justify-between gap-2 border"
          >
            <div className="flex justify-between gap-2">
              <p className="dark:text-stone-200 text-sm">{card.title}</p>
              <IconComponent
                strokeWidth={1.5}
                opacity={0.8}
                className="shrink-0 hidden sm:block"
              />
            </div>
            <p className="text-2xl font-medium">{card.number}</p>
          </div>
        );
      })}
    </div>
  );
};

export default Stats;
