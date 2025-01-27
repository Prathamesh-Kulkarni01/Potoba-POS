import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const hostname = request.headers.get('host') || '';
  const pathname = request.nextUrl.pathname;
  
  // Handle subdomain access
  if (hostname.includes('.localhost:3000')) {
    const subdomain = hostname.split('.')[0];
    if (subdomain === 'localhost') {
      return NextResponse.next();
    }
    return NextResponse.rewrite(new URL(`/store/${subdomain}${pathname}`, request.url));
  }
  
  return NextResponse.next();
}

export const config = {
  matcher: [
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
};