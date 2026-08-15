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
} from "@gravity-ui/icons";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { signOut } from "@/lib/auth-client";
import { toast } from "sonner";
import { useDashboardMenu } from "@/app/providers";

export default function DashboardSidebar() {
  const { user, isPending } = useSessionClient();
  const { setIsDashboardMenuOpen } = useDashboardMenu();
  const pathname = usePathname();
  const router = useRouter();
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
  ];

  const seekerNavItems = [
    { icon: Circles4Square, label: "Dashboard", href: "/dashboard/seeker" },
    { icon: Briefcase, label: "Browse Jobs", href: "/jobs?page=1" },
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
      label: "Profile Settings",
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

  if (isPending) {
    return "";
  }

  const navItems =
    user?.role === "recruiter"
      ? recruiterNavItems
      : user?.role === "admin"
        ? adminNavItems
        : seekerNavItems;

  const renderSidebar = (variant) => (
    <nav className="flex flex-col gap-1">
      {navItems.map((item) => {
        const isActive = pathname === item.href;

        return (
          <Link
            key={item.label}
            href={item.href}
            onClick={
              variant === "drawer"
                ? () => setIsDashboardMenuOpen(false)
                : undefined
            }
            className={`flex items-center gap-3 rounded-md px-3 text-sm text-foreground transition-colors ${
              variant === "drawer" ? "py-3" : "py-2.5"
            } ${
              isActive
                ? variant === "drawer"
                  ? "bg-foreground/8 dark:bg-default"
                  : "hover:bg-none bg-white/90 shadow-[0_1px_2px_rgba(0,0,0,0.04)] dark:bg-default"
                : variant === "drawer"
                  ? "hover:bg-foreground/5"
                  : "hover:bg-white/60 dark:hover:bg-default/60"
            }`}
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
      {isDashboardRoute && (
        <aside className="hidden md:block border-r border-foreground/15 h-full px-3">
          <div>{renderSidebar("aside")}</div>
        </aside>
      )}
    </div>
  );
}
