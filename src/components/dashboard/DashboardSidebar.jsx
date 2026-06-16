import { auth } from "@/lib/auth";
import {
  Gear,
  LayoutHeaderSideContent,
  Briefcase,
  Factory,
  FileText,
  Circles4Square,
} from "@gravity-ui/icons";
import { Avatar, Button, Drawer } from "@heroui/react";
import { headers } from "next/headers";
import Link from "next/link";

export default async function DashboardSidebar() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });
  const user = session?.user;

  const navItems = [
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

  const sidebarContent = (
    <nav className="flex flex-col gap-1">
      {navItems.map((item) => (
        <button key={item.label}>
          <Link
            href={item.href}
            className="flex items-center gap-3 rounded-md px-3 py-2.5 text-sm text-foreground transition-colors hover:bg-default"
            type="button"
          >
            <item.icon className="size-5 text-muted" />
            {item.label}
          </Link>
        </button>
      ))}
    </nav>
  );

  return (
    <div>
      <aside className="hidden md:block border-r h-full px-3">
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
