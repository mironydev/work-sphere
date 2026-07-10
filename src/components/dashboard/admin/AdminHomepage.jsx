import {
  ArrowChevronUp,
  ArrowShapeUp,
  ArrowUp,
  Briefcase,
  Calendar,
  CircleDollar,
  Factory,
  Person,
  Persons,
} from "@gravity-ui/icons";
import React from "react";

const stats = [
  { icon: Person, text: "Total Users", number: 123456 },
  { icon: Persons, text: "Total Recruiters", number: 12345 },
  { icon: Factory, text: "Total Companies", number: 1234 },
  { icon: Briefcase, text: "Jobs Posted", number: 12345 },
  { icon: CircleDollar, text: "Platform Revenue", number: 123456 },
];

const AdminHomepage = () => {
  return (
    <div>
      <div className="flex justify-between mb-4">
        <div>
          <p className="text-3xl font-semibold">Dashboard Overview</p>
          <p className="text-sm text-muted mt-1">
            Real-time platform performance and growth metrics.
          </p>
        </div>
        <div className="flex flex-row items-center justify-center gap-4">
          <button className=" flex items-center justify-center gap-1 bg-foreground/10 rounded-md px-4 py-1.5 text-sm cursor-pointer hover:bg-foreground/15 active:bg-foreground/15 font-medium duration-100">
            <Calendar />
            Last 30 Days
          </button>
          <button className=" flex items-center justify-center gap-1 bg-foreground text-background rounded-md px-4 py-1.5 text-sm cursor-pointer font-medium">
            Export Report
          </button>
        </div>
      </div>
      <div className="flex gap-2">
        {stats.map((stat, i) => {
          const Icons = stat.icon;
          return (
            <div
              key={i}
              className="bg-foreground/5 border p-4 rounded-sm flex-1 flex justify-between"
            >
              <div>
                <div className="bg-foreground/10 p-1.5 rounded-sm w-fit">
                  <Icons />
                </div>
                <p className="text-xs text-muted mt-2">{stat.text}</p>
                <p className="text-xl font-medium">
                  {stat.text === "Platform Revenue" ? "$" : ""}
                  {stat.number}
                </p>
              </div>
              <div className="flex text-xs text-emerald-500 dark:text-green-500">
                <ArrowUp className="scale-75" />
                <p className="leading- font-bold">+10%</p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default AdminHomepage;
