import { getToken } from 'next-auth/jwt';
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export async function middleware(request: NextRequest) {
  // Define the list of protected routes
  const protectedRoutes = ['/dashboard', '/issuespage', '/profile'];
  const isProtectedRoute = protectedRoutes.includes(request.nextUrl.pathname) 
    || /\/issues\/\d+/.test(request.nextUrl.pathname)
    || /\/ground\/[^\/]+/.test(request.nextUrl.pathname);

  if (isProtectedRoute) {
    const token = await getToken({ req: request });
    
    if (!token) {
      const loginUrl = new URL('/login', request.nextUrl.origin);
      loginUrl.searchParams.append('callbackUrl', request.nextUrl.pathname);
      return NextResponse.redirect(loginUrl);
    }
  }

  return NextResponse.next();
}

// Configure which routes to run middleware on
export const config = {
  matcher: [
    '/dashboard/:path*',
    '/issuespage/:path*',
    '/profile/:path*',
    '/issues/:path*',
    '/ground/:path*'
  ]
};