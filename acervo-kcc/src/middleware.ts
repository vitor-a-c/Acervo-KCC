import { NextRequest, NextResponse } from 'next/server';

export function middleware(request: NextRequest) {
  // Protect admin routes
  if (request.nextUrl.pathname.startsWith('/admin')) {
    // Allow access to login page and auth API
    if (
      request.nextUrl.pathname === '/admin' ||
      request.nextUrl.pathname === '/api/admin/auth'
    ) {
      return NextResponse.next();
    }

    // Check for admin token in Authorization header for API routes
    if (request.nextUrl.pathname.startsWith('/api/admin')) {
      const authHeader = request.headers.get('authorization');
      if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return NextResponse.json(
          { message: 'Unauthorized' },
          { status: 401 }
        );
      }
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/admin/:path*', '/api/admin/:path*']
};