import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";

export async function proxy(request) {
  const pathname = request.nextUrl.pathname;

  const session = await auth.api.getSession({
    headers: request.headers,
  });

  const user = session?.user;

  // Not logged in → cannot access dashboard or complete profile
  if (
    !user &&
    (pathname.startsWith("/dashboard") || pathname === "/complete-profile")
  ) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  // Logged in → don't go back to login/signup
  if (user && (pathname === "/login" || pathname === "/signup")) {
    if (user.role === "admin") {
      return NextResponse.redirect(
        new URL("/dashboard/admin", request.url),
      );
    }

    if (user.accountType === "recruiter") {
      return NextResponse.redirect(
        new URL("/dashboard/recruiter", request.url),
      );
    }

    if (user.accountType === "seeker") {
      return NextResponse.redirect(
        new URL("/dashboard/seeker", request.url),
      );
    }

    return NextResponse.redirect(
      new URL("/complete-profile", request.url),
    );
  }

  // No account type → must complete profile
  if (user && !user.accountType && pathname !== "/complete-profile") {
    return NextResponse.redirect(
      new URL("/complete-profile", request.url),
    );
  }

  // Already has account type → cannot access complete profile
  if (user && user.accountType && pathname === "/complete-profile") {
    return NextResponse.redirect(new URL("/", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/",
    "/complete-profile",
    "/login",
    "/signup",
    "/dashboard/:path*",
  ],
};