import { NextRequest, NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";

const protectedRoutes: { [key: string]: string[] } = {
  "/exerciseDashboard": ["USER", "ADMIN"],
  "/exerciseRecommend": ["USER", "ADMIN"],
  "/exerciseSchedule": ["USER", "ADMIN"],
  "/searchByBarcode": ["USER", "ADMIN"],
  "/dietDashboard": ["USER","ADMIN"],
  "/dietRecommend": ["USER", "ADMIN"],
  "/dietRecord": ["USER", "ADMIN"],
};

export async function middleware(req: NextRequest) {
  const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });

  const { pathname } = req.nextUrl;

  const requiredRole = protectedRoutes[pathname];

  if (requiredRole) {
    if (!token) {
      return NextResponse.redirect(new URL("/login", req.url));
    }

    const role = token.role ?? "USER";

    if (!requiredRole.includes(role)) {
      return NextResponse.redirect(new URL("/unauthorized", req.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/exerciseDashboard",
    "/exerciseRecommend",
    "/exerciseSchedule",
    "/searchByBarcode",
    "/dietDashboard",
    "/dietRecommend",
    "/dietRecord",
  ],
};
