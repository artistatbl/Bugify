import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  // Define the list of protected routes
  const protectedRoutes = ['/dashboard', '/issuespage'];
  //const isProtectedRoute = protectedRoutes.includes(request.nextUrl.pathname) || /\/issues\/\d+/.test(request.nextUrl.pathname);

  if (protectedRoutes.includes(request.nextUrl.pathname)) {
    const session = request.cookies.get('next-auth.session-token');
    if (!session) {
      const loginUrl = new URL('/login', request.nextUrl.origin);
      loginUrl.searchParams.append('redirected', 'true'); // Append query parameter
      return NextResponse.redirect(loginUrl);
    }
  }

  return NextResponse.next();
}
