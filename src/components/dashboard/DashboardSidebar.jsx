"use client";

import { useSessionClient } from "@/lib/helpers";
import {
  Gear,
  Briefcase,
  Factory,
  FileText,
  Circles4Square,
  Persons,
  CircleDollar,
  CirclePlusFill,
  ClockArrowRotateLeft,
} from "@gravity-ui/icons";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useDashboardMenu } from "@/app/providers";
import { Skeleton } from "@heroui/react";

export default function DashboardSidebar() {
  const { user, isPending } = useSessionClient();
  const { setIsDashboardMenuOpen } = useDashboardMenu();
  const pathname = usePathname();
  const isDashboardRoute = pathname.startsWith("/dashboard");

  const recruiterNavItems = [
    { icon: Circles4Square, label: "Dashboard", href: "/dashboard/recruiter" },
    {
      icon: Factory,
      label: "My Companies",
      href: "/dashboard/recruiter/company",
    },
    {
      icon: Briefcase,
      label: "Manage Jobs",
      href: "/dashboard/recruiter/jobs",
    },
    {
      icon: FileText,
      label: "Applications",
      href: "/dashboard/recruiter/applications",
    },
    { icon: Gear, label: "Settings", href: "/dashboard/recruiter/settings" },
    {
      icon: CirclePlusFill,
      iconColor: "text-indigo-500",
      label: "Add a Job",
      href: "/dashboard/recruiter/new",
    },
  ];

  const seekerNavItems = [
    { icon: Circles4Square, label: "Dashboard", href: "/dashboard/seeker" },
    { icon: Briefcase, label: "Find Jobs", href: "/jobs?page=1" },
    {
      icon: FileText,
      label: "Applications",
      href: "/dashboard/seeker/applications",
    },
    {
      icon: Persons,
      label: "Saved Jobs",
      href: "/dashboard/seeker/saved-jobs",
    },
    {
      icon: ClockArrowRotateLeft,
      label: "History",
      href: "/dashboard/seeker/history",
    },
    {
      icon: Gear,
      label: "Profile",
      href: "/dashboard/seeker/profile",
    },
  ];

  const adminNavItems = [
    { icon: Circles4Square, label: "Dashboard", href: "/dashboard/admin" },
    { icon: Persons, label: "Users", href: "/dashboard/admin/users" },
    { icon: Factory, label: "Companies", href: "/dashboard/admin/companies" },
    { icon: Briefcase, label: "Jobs", href: "/dashboard/admin/jobs" },
    {
      icon: CircleDollar,
      label: "Payments",
      href: "/dashboard/admin/payments",
    },
    { icon: Gear, label: "Settings", href: "/dashboard/admin/settings" },
  ];

  if (isPending) {
    return (
      <aside className="hidden md:block border-r border-foreground/15 h-full">
        <nav className="flex flex-col">
          {Array.from({ length: 6 }).map((_, index) => (
            <div
              key={index}
              className="flex items-center gap-3 rounded-md pl-3 pr-7.75 py-2.5 border border-transparent"
            >
              <Skeleton className="size-5 rounded-md" />
              <Skeleton className="h-4 w-21.5 rounded-md" />
            </div>
          ))}
        </nav>
      </aside>
    );
  }

  const navItems =
    user?.accountType === "recruiter"
      ? recruiterNavItems
      : user?.role === "admin"
        ? adminNavItems
        : seekerNavItems;

  const renderSidebar = (variant) => (
    <nav className="flex flex-col">
      {navItems.map((item) => {
        const isActive =
          pathname === item.href ||
          (item.href !== "/dashboard/seeker" &&
            item.href !== "/dashboard/recruiter" &&
            item.href !== "/dashboard/admin" &&
            pathname.startsWith(`${item.href}/`)) ||
          (item.href.startsWith("/jobs") && pathname === "/jobs");

        return (
          <Link
            key={item.label}
            href={item.href}
            onClick={
              variant === "drawer"
                ? () => setIsDashboardMenuOpen(false)
                : undefined
            }
            className={`border border-r-0 font-semibold text-nowrap flex items-center gap-3 rounded-l-md pl-3 pr-6 text-sm text-foreground transition-colors ${
              variant === "drawer" ? "py-3" : "py-2.5"
            } ${
              isActive
                ? variant === "drawer"
                  ? "bg-foreground/8 dark:bg-default"
                  : "bg-white dark:bg-default dark:border-foreground/10"
                : variant === "drawer"
                  ? "hover:bg-foreground/5"
                  : "hover:bg-white dark:hover:bg-default/60 border-transparent"
            }`}
          >
            <item.icon className={`size-5 ${item.iconColor || "text-muted"}`} />
            {item.label}
          </Link>
        );
      })}
    </nav>
  );

  return (
    <div>
      {isDashboardRoute && (
        <aside
          className={`hidden md:block border-r border-foreground/15 h-full ${
            user?.role === "admin" || user?.accountType === "seeker"
              ? "w-[163.5px]"
              : "w-auto"
          }`}
        >
          <div>{renderSidebar("aside")}</div>
        </aside>
      )}
    </div>
  );
}
