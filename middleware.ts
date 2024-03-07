import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { useToast } from './lib/hooks/use-toast';

// List of protected routes
export function middleware(request: NextRequest) {
  const isProtectedRoute = ['/', '/'].includes(request.nextUrl.pathname);

  if (isProtectedRoute) {
      const session = request.cookies.get('next-auth.session-token');
      if (!session) {
          const loginUrl = new URL('/login', request.url);
          loginUrl.searchParams.append('redirected', 'true'); // Append query parameter
          return NextResponse.redirect(loginUrl);
      }
  }

  return NextResponse.next();
}
