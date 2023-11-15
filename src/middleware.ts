import { cookies } from "next/headers";
import { NextResponse } from "next/server";

import type { NextRequest } from "next/server";
import { PrismaService } from "./services/Prisma";

export async function middleware(req: NextRequest) {
  // const res = await fetch("/api/auth");
  const userCookie = cookies().get("auth2");
  if (!userCookie) {
    return NextResponse.redirect(new URL("/auth", req.url));
  }

  const user = await PrismaService.getUser(parseInt(userCookie.value));

  // if user is signed in and the current path is / redirect the user to /dashboard
  if (user && req.nextUrl.pathname === "/auth") {
    return NextResponse.redirect(new URL("/", req.url));
  }
  // if user is not signed in and the current path is not / redirect the user to /
  if (!user && req.nextUrl.pathname === "/") {
    return NextResponse.redirect(new URL("/auth", req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/", "/auth"],
};
