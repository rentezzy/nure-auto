import { cookies } from "next/headers";
import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

export async function middleware(req: NextRequest) {
  const userCookie = cookies().toString();
  const res = await fetch(new URL("/api/auth", req.url), {
    credentials: "include",
    headers: { Cookie: userCookie },
  });
  const { user } = await res.json();
  if (user && req.nextUrl.pathname === "/auth") {
    return NextResponse.redirect(new URL("/dashboard", req.url));
  }
  if (!user && req.nextUrl.pathname === "/dashboard") {
    return NextResponse.redirect(new URL("/auth", req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard", "/auth"],
};
