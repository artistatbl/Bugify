import { getToken } from 'next-auth/jwt';
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export async function middleware(req: NextRequest) {
  // Define the list of protected routes
  const protectedRoutes = ['/dashboard', '/issuespage'];
  const isProtectedRoute = protectedRoutes.includes(req.nextUrl.pathname) || /\/issues\/\d+/.test(req.nextUrl.pathname);

  if (isProtectedRoute) {
   // const session = request.cookies.get('__secure-next-auth.session-token'); 
    const token =  await  getToken({ req });
    
    // Use '__Secure-next-auth.session-token' instead of 'next-auth.session-token' for production?
    if (!token) {
      const loginUrl = new URL('/login', req.nextUrl.origin);
      loginUrl.searchParams.append('redirected', 'true'); // Append query parameter
      return NextResponse.redirect(loginUrl);
    }
  }

  return NextResponse.next();
}
// 