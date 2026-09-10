import React from "react";
import Link from "next/link";
import ThemeToggle from "./ThemeToggle";

const Footer = () => {
  return (
    <footer className="mt-16 sm:mt-24 bg-indigo-50 dark:bg-indigo-600/5">
      <div className="max-w-7xl mx-auto pt-10 pb-6 px-4 md:px-6 lg:px-10 text-center lg:text-left">
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-6">
          <div className="lg:col-span-2">
            <h2 className="text-2xl font-bold flex items-center justify-center lg:justify-start gap-2">
              WorkSphere
            </h2>

            <p className="mx-auto lg:mx-0 mt-4 text-gray-600 dark:text-gray-400 max-w-md">
              A platform that connects serious professionals with real
              opportunities.
            </p>
          </div>

          <div>
            <h3 className="font-semibold text-foreground mb-4">Product</h3>

            <ul className="space-y-3 text-gray-600 dark:text-gray-400">
              <li>
                <Link
                  href="/"
                  className="hover:text-foreground active:opacity-70 transition-colors"
                >
                  Find Jobs
                </Link>
              </li>

              <li>
                <Link
                  href="/"
                  className="hover:text-foreground active:opacity-70 transition-colors"
                >
                  Career Assistant
                </Link>
              </li>

              <li>
                <Link
                  href="/"
                  className="hover:text-foreground active:opacity-70 transition-colors"
                >
                  Companies
                </Link>
              </li>

              <li>
                <Link
                  href="/"
                  className="hover:text-foreground active:opacity-70 transition-colors"
                >
                  Salary Insights
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-foreground mb-4">Navigation</h3>
            <ul className="space-y-3 text-gray-600 dark:text-gray-400">
              <li>
                <Link
                  href="/"
                  className="hover:text-foreground active:opacity-70 transition-colors"
                >
                  Home
                </Link>
              </li>
              <li>
                <Link
                  href="/"
                  className="hover:text-foreground active:opacity-70 transition-colors"
                >
                  Help Center
                </Link>
              </li>

              <li>
                <Link
                  href="/"
                  className="hover:text-foreground active:opacity-70 transition-colors"
                >
                  Career Library
                </Link>
              </li>

              <li>
                <Link
                  href="/"
                  className="hover:text-foreground active:opacity-70 transition-colors"
                >
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-foreground mb-4">Resources</h3>

            <ul className="space-y-3 text-gray-600 dark:text-gray-400">
              <li>
                <Link
                  href="/"
                  className="hover:text-foreground active:opacity-70 transition-colors"
                >
                  News
                </Link>
              </li>

              <li>
                <Link
                  href="/"
                  className="hover:text-foreground active:opacity-70 transition-colors"
                >
                  Brand Guidelines
                </Link>
              </li>
            </ul>

            <div className="flex items-center justify-center lg:justify-start gap-3 mt-6">
              <Link
                href="/"
                className="flex items-center justify-center hover:-translate-y-0.5 transition-all active:opacity-70"
                aria-label="Facebook"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="23"
                  height="23"
                  viewBox="0 0 256 256"
                >
                  <path
                    fill="#1877f2"
                    d="M256 128C256 57.308 198.692 0 128 0S0 57.308 0 128c0 63.888 46.808 116.843 108 126.445V165H75.5v-37H108V99.8c0-32.08 19.11-49.8 48.348-49.8C170.352 50 185 52.5 185 52.5V84h-16.14C152.959 84 148 93.867 148 103.99V128h35.5l-5.675 37H148v89.445c61.192-9.602 108-62.556 108-126.445"
                  />
                  <path
                    fill="#fff"
                    d="m177.825 165l5.675-37H148v-24.01C148 93.866 152.959 84 168.86 84H185V52.5S170.352 50 156.347 50C127.11 50 108 67.72 108 99.8V128H75.5v37H108v89.445A129 129 0 0 0 128 256a129 129 0 0 0 20-1.555V165z"
                  />
                </svg>
              </Link>

              <Link
                href="/"
                className="flex items-center justify-center hover:-translate-y-0.5 transition-all active:opacity-70"
                aria-label="LinkedIn"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="23"
                  height="23"
                  viewBox="0 0 128 128"
                >
                  <path
                    fill="#0076b2"
                    d="M116 3H12a8.91 8.91 0 0 0-9 8.8v104.42a8.91 8.91 0 0 0 9 8.78h104a8.93 8.93 0 0 0 9-8.81V11.77A8.93 8.93 0 0 0 116 3"
                  />
                  <path
                    fill="#fff"
                    d="M21.06 48.73h18.11V107H21.06zm9.06-29a10.5 10.5 0 1 1-10.5 10.49a10.5 10.5 0 0 1 10.5-10.49m20.41 29h17.36v8h.24c2.42-4.58 8.32-9.41 17.13-9.41C103.6 47.28 107 59.35 107 75v32H88.89V78.65c0-6.75-.12-15.44-9.41-15.44s-10.87 7.36-10.87 15V107H50.53z"
                  />
                </svg>
              </Link>

              <Link
                href="/"
                className="flex items-center justify-center hover:-translate-y-0.5 transition-all active:opacity-70"
                aria-label="X (formerly Twitter)"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="21"
                  height="21"
                  viewBox="0 0 16 16"
                >
                  <path
                    className="fill-foreground"
                    d="m9.237 7.004l4.84-5.505H12.93L8.727 6.28L5.371 1.5H1.5l5.075 7.228L1.5 14.499h1.147l4.437-5.047l3.545 5.047H14.5zM7.666 8.791l-.514-.72L3.06 2.344h1.762l3.302 4.622l.514.72l4.292 6.007h-1.761z"
                  />
                </svg>
              </Link>
            </div>
          </div>

          <div className="text-center">
            <h3 className="font-semibold mb-3">Switch theme</h3>

            <div className="scale-150 w-fit mx-auto text-gray-600 dark:text-gray-400 hover:text-foreground dark:hover:text-foreground transition-colors">
              <ThemeToggle />
            </div>
          </div>
        </div>

        <div className="border-t border-foreground/10 mt-10 pt-6 flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-gray-500 dark:text-gray-400">
          <p>© {new Date().getFullYear()} WorkSphere</p>

          <div className="flex items-center gap-3">
            <Link
              href="/"
              className="hover:text-black dark:hover:text-white active:opacity-70 transition-colors"
            >
              Terms & Policy
            </Link>

            <span>•</span>

            <Link
              href="/"
              className="hover:text-black dark:hover:text-white active:opacity-70 transition-colors"
            >
              Privacy Guideline
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
