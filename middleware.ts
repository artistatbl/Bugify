import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// List of protected routes
const protectedRoutes = ['/dashboard', '/issuespage'];

export function middleware(request: NextRequest) {
    // Check if the current request's path is in the list of protected routes
    const isProtectedRoute = protectedRoutes.includes(request.nextUrl.pathname);

    // If it's a protected route, check for the session cookie
    if (isProtectedRoute) {
        let session = request.cookies.get('next-auth.session-token');

        // If no session cookie exists for a protected route, redirect to the login page
        if (!session) {
            return NextResponse.redirect(new URL('/', request.url));
        }
    }

    // For non-protected routes or if there's a session, continue with the request
    // This line is not strictly necessary as it's the default behavior, but it's here for clarity
    return NextResponse.next();
}
