import { NextResponse } from "next/server";
import { headers } from "next/headers";
import { auth } from "@/lib/auth";

export async function proxy(request) {
  const pathname = request.nextUrl.pathname;

  const session = await auth.api.getSession({
    headers: await headers(),
  });
  const user = session?.user;

  if (!user && pathname === "/profile") {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  if (user && (pathname === "/login" || pathname === "/signup")) {
    return NextResponse.redirect(new URL("/profile", request.url));
  }

  if (user) {
    if (pathname === "/") {
      if (!user.role) {
        return NextResponse.redirect(new URL("/complete-profile", request.url));
      }
    }

    if (pathname === "/complete-profile") {
      if (user.role) {
        return NextResponse.redirect(new URL("/", request.url));
      }
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/", "/complete-profile", "/profile", "/login", "/signup"],
};
