import { NextRequest, NextResponse } from 'next/server';
import { getToken } from 'next-auth/jwt';

const protectedRoutes: { [key: string]: string[] } = {
  '/action_history': ['ADMIN'],
  '/staff_accounts_info': ['USER','ADMIN'],
  '/user_management': ['ADMIN'],
};

export async function middleware(req: NextRequest) {

  const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });

  const { pathname } = req.nextUrl;

  const requiredRole = protectedRoutes[pathname];

  if (requiredRole) {

    if (!token) {
      return NextResponse.redirect(new URL('/login', req.url));
    }

    const role = token.role ?? 'USER';
    
    if (!requiredRole.includes(role)) {
      return NextResponse.redirect(new URL('/unauthorized', req.url));
    }

  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/action_history', '/staff_accounts_info','/user_management'],
};