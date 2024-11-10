import { NextResponse } from "next/server";

export function middleware(request) {
  const path = request.nextUrl.pathname;

  const token = request.cookies.get("token")?.value;

  const isPublicPath = path.includes("/login");

  if (!token && !isPublicPath) {
    return NextResponse.redirect(new URL("/en/login", request.url));
  }

  if (token && isPublicPath) {
    return NextResponse.redirect(new URL("/en/dashboard", request.url));
  }
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
