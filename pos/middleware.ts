// Protecting routes with next-auth
// https://next-auth.js.org/configuration/nextjs#middleware
// https://nextjs.org/docs/app/building-your-application/routing/middleware
import { NextResponse } from 'next/server';
import { auth } from './auth';


export default auth((req) => {
  // if (!req.auth) {
  //   const url = req.url.replace(req.nextUrl.pathname, '/');
  //   return NextResponse.redirect(url)
  // }
});

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
 };