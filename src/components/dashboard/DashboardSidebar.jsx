"use client";

import { useSessionClient } from "@/lib/helpers";
import {
  Gear,
  LayoutHeaderSideContent,
  Briefcase,
  Factory,
  FileText,
  Circles4Square,
  Persons,
} from "@gravity-ui/icons";
import { Avatar, Button, Drawer } from "@heroui/react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function DashboardSidebar() {
  const { user, isPending } = useSessionClient();

  const pathname = usePathname();

  const recruiterNavItems = [
    {
      icon: Circles4Square,
      label: "Dashboard",
      href: "/dashboard/recruiter",
    },
    {
      icon: Factory,
      label: "My Company",
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
  ];

  const seekernNavItems = [
    {
      icon: Circles4Square,
      label: "Dashboard",
      href: "/dashboard/seeker",
    },
    {
      icon: Briefcase,
      label: "Browse Jobs",
      href: "/jobs",
    },
    {
      icon: FileText,
      label: "My Applications",
      href: "/dashboard/seeker/applications",
    },
    {
      icon: Persons,
      label: "Saved Jobs",
      href: "/dashboard/seeker/saved-jobs",
    },
    {
      icon: Gear,
      label: "Profile Settings",
      href: "/dashboard/seeker/settings",
    },
  ];

  const adminNavItems = [
    {
      icon: Circles4Square,
      label: "Dashboard",
      href: "/dashboard/admin",
    },
    {
      icon: Persons,
      label: "Users",
      href: "/dashboard/admin/users",
    },
    {
      icon: Factory,
      label: "Companies",
      href: "/dashboard/admin/companies",
    },
    {
      icon: Briefcase,
      label: "Jobs",
      href: "/dashboard/admin/jobs",
    },
    {
      icon: Briefcase,
      label: "Payments",
      href: "/dashboard/admin/payments",
    },
    {
      icon: Gear,
      label: "Settings",
      href: "/dashboard/admin/settings",
    },
  ];

  if (isPending) {
    return "";
  }

  const sidebarContent = (
    <nav className="flex flex-col gap-1">
      {user?.role === "recruiter"
        ? recruiterNavItems.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.label}
                href={item.href}
                className={`flex items-center gap-3 rounded-md px-3 py-2.5 text-sm text-foreground transition-colors hover:bg-background/50 dark:hover:bg-default/40 ${isActive ? "bg-background dark:bg-default" : ""}`}
                type="button"
              >
                <item.icon className="size-5 text-muted" />
                {item.label}
              </Link>
            );
          })
        : user?.role === "admin"
          ? adminNavItems.map((item) => {
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.label}
                  href={item.href}
                  className={`flex items-center gap-3 rounded-md px-3 py-2.5 text-sm text-foreground transition-colors hover:bg-background/50 dark:hover:bg-default/40 ${isActive ? "bg-background dark:bg-default" : ""}`}
                  type="button"
                >
                  <item.icon className="size-5 text-muted" />
                  {item.label}
                </Link>
              );
            })
          : seekernNavItems.map((item) => {
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.label}
                  href={item.href}
                  className={`flex items-center gap-3 rounded-md px-3 py-2.5 text-sm text-foreground transition-colors hover:bg-background/50 dark:hover:bg-default/40 ${isActive ? "bg-background dark:bg-default" : ""}`}
                  type="button"
                >
                  <item.icon className="size-5 text-muted" />
                  {item.label}
                </Link>
              );
            })}
    </nav>
  );

  return (
    <div>
      <aside className="hidden md:block border-r border-foreground/15 h-full px-3">
        <div
          className={`flex items-center gap-3 mb-5 ${!user ? "hidden" : ""}`}
        >
          <Avatar>
            <Avatar.Image alt="profile image" src={user?.image} />
            <Avatar.Fallback className="bg-foreground/5 dark:bg-background/5">
              {user?.name?.[0]?.toUpperCase() || "U"}
            </Avatar.Fallback>
          </Avatar>
          <div>
            <p className="font-medium">{user?.name || ""}</p>
            <p className="text-xs opacity-60">
              {user?.role === "seeker"
                ? "Job Seeker"
                : user?.role === "recruiter"
                  ? "Recruiter"
                  : ""}
            </p>
          </div>
        </div>
        <div>{sidebarContent}</div>
      </aside>
      <Drawer>
        <Button
          className="md:hidden rounded-lg text-foreground mb-4"
          variant="secondary"
          style={{
            boxShadow: "none",
            outline: "none",
          }}
        >
          <LayoutHeaderSideContent />
          Menu
        </Button>
        <Drawer.Backdrop>
          <Drawer.Content placement="left">
            <Drawer.Dialog>
              <Drawer.CloseTrigger />
              <Drawer.Header>
                <Drawer.Heading>Navigation</Drawer.Heading>
              </Drawer.Header>
              <Drawer.Body>{sidebarContent}</Drawer.Body>
            </Drawer.Dialog>
          </Drawer.Content>
        </Drawer.Backdrop>
      </Drawer>
    </div>
  );
}
