import { NextResponse } from "next/server";

const supportedLocales = ["en", "ka"];

export function middleware(request) {
  const path = request.nextUrl.pathname;
  const isPublicPath = path.includes("/login");
  const token = request.cookies.get("token")?.value;

  const locale = path.split("/")[1];

  if (!locale || !supportedLocales.includes(locale)) {
    return NextResponse.redirect(new URL(`/en${path}`, request.url));
  }

  if (!token && !isPublicPath) {
    return NextResponse.redirect(new URL(`/${locale}/login`, request.url));
  }

  if (token && isPublicPath) {
    return NextResponse.redirect(new URL(`/${locale}/dashboard`, request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|.*\\.png$).*)"],
};
