"use client";

import Link from "next/link";

const ErrorPage = () => {
  return (
    <div className="mt-24 px-4 flex items-center justify-center min-h-[60vh]">
      <div className="max-w-md w-full text-center shadow-xs dark:border border-foreground/15 rounded-xl p-8 bg-white dark:bg-foreground/5">
        <p className="text-4xl font-bold mb-2 text-red-500">Oops!</p>
        <h1 className="text-xl font-semibold mb-3">Something went wrong</h1>
        <p className="text-foreground/70 mb-8">
          We couldn&apos;t load the requested data right now. Please try again
          in a moment.
        </p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <button
            onClick={() => window.location.reload()}
            className="cursor-pointer active:scale-95 px-4 py-2 rounded-lg bg-indigo-600 text-white hover:bg-indigo-700 duration-100"
          >
            Refresh Page
          </button>

          <Link
            href="/"
            className="active:scale-95 px-4 py-2 border rounded-lg bg-foreground/10 hover:bg-foreground/15 duration-100"
          >
            Go Home
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ErrorPage;
