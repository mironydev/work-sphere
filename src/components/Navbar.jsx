"use client";

import { useState } from "react";
import { Button } from "@heroui/react";
import Link from "next/link";

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <div className="p-4 sticky top-0 z-40">
      <nav className=" w-full bg-background/70 backdrop-blur-lg max-w-7xl mx-auto rounded-lg">
        <header className=" flex h-16  items-center justify-between px-3 md:px-6">
          <div className="flex items-center gap-4">
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
            <Link href="/" className="flex items-center gap-3">
              <svg
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
              <p className="font-bold text-xl md:text-2xl">WorkSphere</p>
            </Link>
          </div>
          <div className="flex gap-10">
            <ul className="hidden items-center gap-4 lg:flex">
              <li>
                <Link href="#" className="p-2 active:text-stone-500">
                  Browse Jobs
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="font-normal p-2 active:text-stone-500"
                  aria-current="page"
                >
                  Company
                </Link>
              </li>
              <li>
                <Link href="#" className="p-2 active:text-stone-500">
                  Pricing
                </Link>
              </li>
            </ul>
            <div className="border-r hidden lg:block"></div>
            <div className="items-center gap-10 md:flex">
              <Link
                href="#"
                className=" active:text-indigo-400 hidden md:block"
              >
                Sign In
              </Link>
              <Link href="#">
                <Button className="bg-indigo-600 rounded-lg">
                  Get Started
                </Button>
              </Link>
            </div>
          </div>
        </header>
        {isMenuOpen && (
          <div className="border-t border-separator md:hidden">
            <ul className="flex flex-col gap-4 p-2 pt-5">
              <li>
                <Link href="#" className="p-2 active:text-stone-500">
                  Browse Jobs
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="font-normal p-2 active:text-stone-500"
                  aria-current="page"
                >
                  Company
                </Link>
              </li>
              <li>
                <Link href="#" className="p-2 active:text-stone-500">
                  Pricing
                </Link>
              </li>
              <li className="mt-1 flex flex-col gap-2 border-t border-separator py-2 px-2">
                <Link href="#" className="block py-2">
                  Login
                </Link>
              </li>
            </ul>
          </div>
        )}
      </nav>
    </div>
  );
}
