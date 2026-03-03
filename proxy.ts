// proxy.ts
import { type NextRequest, NextResponse } from 'next/server';
import { auth } from './app/auth';

const protectedRoutes = ['/']; // Example protected routes

export default async function proxy(request: NextRequest) {
    const session = await auth(); // Get the session using the auth function from app/auth.ts

    const { pathname } = request.nextUrl;

    if(pathname.startsWith('/login') && session) {
        return NextResponse.redirect(new URL('/', request.url));
    }

    // Check if the requested path is protected and if the user is not authenticated
    if (protectedRoutes.includes(pathname) && !session) {
        // Redirect to the login page if not authenticated
        return NextResponse.redirect(new URL('/login', request.url));
    }
    // If authenticated or the route is not protected, continue to the requested page
    return NextResponse.next();
}

// Configure which routes the proxy applies to
export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico).*)'],
};
