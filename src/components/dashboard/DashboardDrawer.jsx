"use client";

import {
  ArrowRightFromSquare,
  Xmark,
  Gear,
  Briefcase,
  Factory,
  FileText,
  Circles4Square,
  Persons,
  CircleDollar,
  CirclePlusFill,
} from "@gravity-ui/icons";
import { Avatar, Drawer } from "@heroui/react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { capitalize, useSessionClient } from "@/lib/helpers";
import { signOut } from "@/lib/auth-client";
import { toast } from "sonner";
import { useDashboardMenu } from "@/app/providers";
import { useTheme } from "next-themes";

export default function DashboardDrawer() {
  const { user, isPending } = useSessionClient();
  const { isDashboardMenuOpen, setIsDashboardMenuOpen } = useDashboardMenu();
  const pathname = usePathname();
  const router = useRouter();
  const { resolvedTheme, setTheme } = useTheme();

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
    return null;
  }

  const navItems =
    user?.accountType === "recruiter"
      ? recruiterNavItems
      : user?.role === "admin"
        ? adminNavItems
        : seekerNavItems;

  const handleSignout = async () => {
    const res = await signOut();

    if (!res.error) {
      toast.success("Logout successful");
      setIsDashboardMenuOpen(false);
      router.refresh();
    } else {
      toast.error("Couldn't log out, something went wrong.");
    }
  };

  return (
    <Drawer isOpen={isDashboardMenuOpen} onOpenChange={setIsDashboardMenuOpen}>
      <Drawer.Backdrop>
        <Drawer.Content placement="left">
          <Drawer.Dialog className="w-72 h-full flex flex-col px-2 py-0 bg-white dark:bg-[#191919]">
            <div className="flex items-center justify-between px-5 py-4 border-b border-foreground/10">
              <p className="font-bold text-lg">WorkSphere</p>

              <Drawer.CloseTrigger className="p-1.5 rounded-md bg-transparent hover:bg-foreground/5">
                <Xmark className="size-5" />
              </Drawer.CloseTrigger>
            </div>
            <div className="flex-1 overflow-y-auto px-3 py-4">
              <nav className="flex flex-col gap-1">
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
                      onClick={() => setIsDashboardMenuOpen(false)}
                      className={`font-semibold flex items-center gap-3 rounded-md px-3 py-3 text-sm text-foreground transition-colors ${
                        isActive
                          ? "bg-foreground/8 dark:bg-default"
                          : "hover:bg-foreground/5 active:bg-foreground/5"
                      }`}
                    >
                      <item.icon
                        className={`size-5 ${item.iconColor || "text-muted"}`}
                      />
                      {item.label}
                    </Link>
                  );
                })}
              </nav>
            </div>
            <div className="flex p-3 items-center justify-between">
              <p className="text-xs select-none">
                Theme: {capitalize(resolvedTheme)}
              </p>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="1em"
                height="1em"
                viewBox="0 0 24 24"
                className="cursor-pointer text-sm active:opacity-70"
                onClick={() => {
                  setTheme(resolvedTheme === "dark" ? "light" : "dark");
                  setIsDashboardMenuOpen(false);
                }}
              >
                <path
                  fill="currentColor"
                  stroke="currentColor"
                  fillRule="evenodd"
                  d="m18.94 6.5l-2.97-2.97l1.06-1.06l3.897 3.896a1.25 1.25 0 0 1 0 1.768L17.03 12.03l-1.06-1.06L18.94 8H5.75c-.69 0-1.25.56-1.25 1.25V11H3V9.25A2.75 2.75 0 0 1 5.75 6.5zm-13.88 11l2.97 2.97l-1.06 1.06l-3.897-3.896a1.25 1.25 0 0 1 0-1.768L6.97 11.97l1.06 1.06L5.06 16h13.19c.69 0 1.25-.56 1.25-1.25V13H21v1.75a2.75 2.75 0 0 1-2.75 2.75z"
                  clipRule="evenodd"
                ></path>
              </svg>
            </div>
            {user && (
              <div className="border-t border-foreground/10 p-4 flex items-center justify-between">
                <div
                  className="flex items-center gap-3 min-w-0 cursor-pointer"
                  onClick={() => {
                    router.push(
                      user?.accountType === "seeker"
                        ? "/dashboard/seeker/profile"
                        : user?.accountType === "recruiter"
                          ? "/dashboard/recruiter/settings"
                          : user?.role === "admin"
                            ? "/dashboard/admin/settings"
                            : null,
                    );
                    setIsDashboardMenuOpen(false);
                  }}
                >
                  <Avatar className="size-9 shrink-0 select-none">
                    <Avatar.Image alt="profile" src={user.image} />
                    <Avatar.Fallback className="bg-foreground/5 text-sm">
                      {user.name?.[0]?.toUpperCase() || "U"}
                    </Avatar.Fallback>
                  </Avatar>

                  <div className="min-w-0">
                    <p className="text-sm font-medium truncate">{user.name}</p>

                    <p className="text-xs text-muted truncate">{user.email}</p>
                  </div>
                </div>

                <button
                  onClick={handleSignout}
                  aria-label="Sign out"
                  className="p-2 rounded-md active:bg-red-600/10 text-red-500 shrink-0"
                >
                  <ArrowRightFromSquare className="size-5" />
                </button>
              </div>
            )}
          </Drawer.Dialog>
        </Drawer.Content>
      </Drawer.Backdrop>
    </Drawer>
  );
}
