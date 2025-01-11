import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// Protecting routes with next-auth
// https://next-auth.js.org/configuration/nextjs#middleware
// https://nextjs.org/docs/app/building-your-application/routing/middleware
// import { NextResponse } from 'next/server';
// import { auth } from './auth';


// export default auth((req) => {
//   if (!req.auth) {
//     const url = req.url.replace(req.nextUrl.pathname, '/');
//     return NextResponse.redirect(url)
//   }
// });

export default function middleware(req: NextRequest) {
  console.log('Request received:', req.url);
  return NextResponse.next();
}

export const config = {
  matcher: '/',
};
