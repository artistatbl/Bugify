import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  // Define the list of protected routes
  const protectedRoutes = ['/dashboard', '/issuespage'];
  const isProtectedRoute = protectedRoutes.includes(request.nextUrl.pathname) || /\/issues\/\d+/.test(request.nextUrl.pathname);

  if (isProtectedRoute) {
    const session = request.cookies.get('__Secure-next-auth.session-token'); // Use '__Secure-next-auth.session-token' instead of 'next-auth.session-token' for production
    if (!session) {
      const loginUrl = new URL('/login', request.nextUrl.origin);
      loginUrl.searchParams.append('redirected', 'true'); // Append query parameter
      return NextResponse.redirect(loginUrl);
    }
  }

  return NextResponse.next();
}
