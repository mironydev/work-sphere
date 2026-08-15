"use client";

import { useEffect, useState } from "react";
import { Avatar, Button, Spinner, Tooltip } from "@heroui/react";
import Link from "next/link";
import ThemeToggle from "./ThemeToggle";
import { signOut, useSession } from "@/lib/auth-client";
import { ArrowRightFromSquare } from "@gravity-ui/icons";
import { toast } from "sonner";
import { usePathname, useRouter } from "next/navigation";
import { useDashboardMenu } from "@/app/providers";

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const router = useRouter();
  const pathname = usePathname();
  const { setIsDashboardMenuOpen } = useDashboardMenu();

  useEffect(() => {
    if (isMenuOpen) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setIsMenuOpen(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname]);

  const { data: session, isPending } = useSession();
  const user = session?.user;

  const handleSignout = async () => {
    const res = await signOut();
    if (!res.error) {
      toast.success("Logout successful");
      router.refresh();
    } else {
      toast.error("Couldn't log out, something went wrong.");
    }
  };

  return (
    <div className="p-4 fixed w-full top-0 z-40">
      <nav className=" w-full bg-white/80 dark:bg-background/30 backdrop-blur-lg max-w-6xl mx-auto rounded-lg border-t dark:border border-foreground/7 dark:border-foreground/15 shadow-[0_1px_2px_rgba(0,0,0,0.06)]">
        <header className="flex py-3.5 sm:py-0 sm:h-16 gap-3 items-center justify-between px-4 md:px-5 flex-wrap">
          <div className="flex items-center gap-3">
            {!user ? (
              <button
                className="md:hidden"
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                aria-label="Toggle menu"
                aria-expanded={isMenuOpen}
              >
                <span className="sr-only">Menu</span>
                <svg
                  className="h-6 w-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  {isMenuOpen ? (
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M6 18L18 6M6 6l12 12"
                    />
                  ) : (
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M4 6h16M4 12h16M4 18h16"
                    />
                  )}
                </svg>
              </button>
            ) : (
              <button
                className="md:hidden cursor-pointer"
                onClick={() => setIsDashboardMenuOpen(true)}
                aria-label="Open dashboard menu"
              >
                <span className="sr-only">Sidebar</span>
                <svg
                  className="h-6 w-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                </svg>
              </button>
            )}

            <Link
              href="/"
              className="flex items-center gap-3"
              style={{
                boxShadow: "none",
                outline: "none",
              }}
            >
              <svg
                className="hidden md:block"
                xmlns="http://www.w3.org/2000/svg"
                width="1.16em"
                height="1em"
                viewBox="0 0 256 222"
              >
                <path
                  fill="#6363f1"
                  d="M149.078 0a44.2 44.2 0 0 0-12.137 12.95l-.575.963l-10.844 18.766l-45.14 78.256l42.755 73.9l-10.834 18.776c-8.692 15.106-26.867 21.938-43.357 16.298c-8.41-2.806-15.229-8.964-19.833-16.536l-.468-.788l-44.892-77.737C1.276 120.66 0 115.798 0 110.935a27.44 27.44 0 0 1 3.305-13.107l.448-.797l46.168-79.966C55.844 6.72 66.757.285 78.653.01l.795-.01zm14.329 1.96c16.235-5.47 34.053 1.05 42.946 15.61l.41.688l45.484 78.763c2.477 4.179 3.753 9.05 3.753 13.914c0 4.558-1.121 9.117-3.303 13.112l-.45.791l-46.168 79.966c-5.923 10.345-16.836 16.781-28.732 17.056l-.795.009h-69.63c4.802-3.44 8.929-7.783 12.092-12.883l.62-1.03l10.844-18.776l45.14-78.245l-42.755-73.994l10.243-17.657c4.603-7.94 11.61-14.421 20.3-17.324"
                ></path>
              </svg>
              <p className="font-bold text-2xl md:text-2xl">WorkSphere</p>
            </Link>
          </div>

          <div className="flex gap-6">
            <ul
              className={`hidden items-center gap-4 ${isPending ? "hidden" : "md:flex"}`}
            >
              <li>
                <Link
                  href={
                    user?.role === "recruiter"
                      ? "/dashboard/recruiter"
                      : user?.role === "admin"
                        ? "/dashboard/admin"
                        : "/dashboard/seeker"
                  }
                  className={`${!user ? "hidden" : "block"} p-2 active:text-stone-500`}
                >
                  Dashboard
                </Link>
              </li>
              <li>
                <Link href="/jobs?page=1" className="p-2 active:text-stone-500">
                  {user?.role === "recruiter"
                    ? "Browse Jobs"
                    : user?.role === "admin"
                      ? "Browse Jobs"
                      : "Apply to Jobs"}
                </Link>
              </li>
              <li className="md:hidden lg:block">
                <Link
                  href="#"
                  className="font-normal p-2 active:text-stone-500"
                  aria-current="page"
                >
                  Company
                </Link>
              </li>
              <li>
                <Link href="/pricing" className="p-2 active:text-stone-500">
                  Pricing
                </Link>
              </li>
            </ul>
            <div className="hidden sm:block my-auto -mx-3">
              <ThemeToggle />
            </div>
            <div className="border-r hidden sm:block"></div>

            {isPending ? (
              <div className="flex items-center justify-center px-5.5 ">
                <Spinner color="current" />
              </div>
            ) : user ? (
              <div className="flex items-center gap-2">
                <Link
                  href={
                    user.role === "recruiter"
                      ? "/dashboard/recruiter/settings"
                      : user.role === "admin"
                        ? "/dashboard/admin/profile"
                        : "/dashboard/seeker/profile"
                  }
                >
                  <Avatar size="sm">
                    <Avatar.Image
                      alt="profile image"
                      src={user.image}
                      className="w-full h-full object-cover"
                    />
                    <Avatar.Fallback className="bg-foreground/5 dark:bg-background/5">
                      {user.name?.[0]?.toUpperCase() || "U"}
                    </Avatar.Fallback>
                  </Avatar>
                </Link>

                <button
                  className="md:hidden cursor-pointer"
                  onClick={() => setIsMenuOpen(!isMenuOpen)}
                  aria-label="Menu"
                  aria-expanded={isMenuOpen}
                >
                  <svg
                    className={`h-5 w-5 transition-transform duration-100 ease-in-out ${
                      isMenuOpen ? "rotate-180" : "rotate-0"
                    }`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M5 9l7 7 7-7"
                    />
                  </svg>
                </button>

                <Tooltip delay={500} closeDelay={0}>
                  <Tooltip.Trigger>
                    <button
                      onClick={handleSignout}
                      className="hidden rounded-md bg-transparent pl-1 ring-0 md:block"
                    >
                      <ArrowRightFromSquare className="h-6 w-6 text-black hover:text-red-400 dark:text-white hover:dark:text-red-500 cursor-pointer duration-100" />
                    </button>
                  </Tooltip.Trigger>
                  <Tooltip.Content
                    showArrow
                    offset={5}
                    placement="bottom"
                    className="py-1 rounded-sm bg-white/10 dark:bg-foreground/20 backdrop-blur-xs"
                  >
                    <p>logout</p>
                  </Tooltip.Content>
                </Tooltip>
              </div>
            ) : (
              <div className="flex items-center gap-6">
                <Link
                  href="/login"
                  className="hidden px-2 py-1.5 active:text-indigo-500 sm:block"
                >
                  Log in
                </Link>

                <Link
                  href="/signup"
                  className="rounded-lg bg-indigo-600 px-4 py-2 text-base text-white duration-75 active:scale-95"
                >
                  Get Started
                </Link>
              </div>
            )}
          </div>
        </header>

        <div
          className={`md:hidden grid transition-[grid-template-rows] duration-150 ease-in-out ${
            isMenuOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
          }`}
          aria-hidden={!isMenuOpen}
        >
          <div className="overflow-hidden">
            <div className="border-t border-separator">
              <ul className="flex flex-col gap-1 p-2">
                <li>
                  <div className="flex justify-between items-center">
                    <Link
                      href="/jobs?page=1"
                      className="p-2 active:text-foreground/70 block"
                    >
                      Browse Jobs
                    </Link>
                  </div>
                </li>
                <li>
                  <Link
                    href="#"
                    className="font-normal p-2 active:text-foreground/70 block"
                    aria-current="page"
                  >
                    Company
                  </Link>
                </li>
                <li>
                  <Link
                    href="/pricing"
                    className="p-2 active:text-foreground/70 block"
                  >
                    Pricing
                  </Link>
                </li>
                <li
                  className={`${!user && "mt-1 flex flex-col gap-2 border-t border-separator pt-0.75 px-2"}`}
                >
                  <div className="flex justify-between">
                    {!user && (
                      <Link
                        href="/login"
                        className="block py-2 active:text-indigo-500"
                      >
                        Log in
                      </Link>
                    )}
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </nav>
    </div>
  );
}
