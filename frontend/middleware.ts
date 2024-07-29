import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { jwtVerify, decodeJwt } from "jose";
import { verifyUser } from "./apis/auth";


const protectedRoutes = ["/admin/*", "/users/*", "/collector/*"];
const publicPaths = ["/api/", "/_next/", "/favicon.ico", "/static/"];




export default async function middleware(req: NextRequest) {
  const path = req.nextUrl.pathname;

  console.log("Middleware called for path:", req.nextUrl.pathname);

  // if (publicPaths.some(publicPath => path.startsWith(publicPath))) {
  //   return NextResponse.next();
  // }

  const isProtectedRoute = protectedRoutes.some(route => path.startsWith(route.replace('*', '')));

  if (isProtectedRoute) {
    // const token = getTokenFromCookies(req);
    const token = req.cookies.get('token')?.value;

    console.log("token:", token);

    if (!token) {
      console.log('No token found redirecting to login');
      const loginUrl = new URL(`/login?returnUrl=${path}`, req.nextUrl.origin);
      return NextResponse.redirect(loginUrl);
    }

    try {
      const payload = decodeJwt(token);
      const role = payload.role as string;
      console.log("Decoded payload:", payload);



    if(!path.startsWith(`/${role}`)) {
      const redirectMap: Record<string, string> = {
        admin: '/admin/dashboard',
        user: '/users/request',
        collector: '/collector/requests'
      };
      return NextResponse.redirect(new URL(redirectMap[role], req.nextUrl.origin));
    }
    } catch (error) {
      return NextResponse.redirect(new URL('/login', req.nextUrl.origin));
     }
  }

    

//     if (payload.role === 'admin' && !req.nextUrl.pathname.startsWith('/admin')) {
//       return NextResponse.redirect(new URL('/admin/dashboard', req.nextUrl.origin));
//     } else if (payload.role === 'user' && !req.nextUrl.pathname.startsWith('/users')) {
//       return NextResponse.redirect(new URL('/users/request', req.nextUrl.origin));
//     } else if (payload.role === 'collector' && !req.nextUrl.pathname.startsWith('/collector')) {
//       return NextResponse.redirect(new URL('/collector/requests', req.nextUrl.origin));
//     }
//   } catch (error) {
//     console.error('Error verifying token:', error);
//     return NextResponse.redirect(new URL('/login', req.nextUrl.origin));
//   }
// }

  return NextResponse.next();
}




export function getTokenFromCookies(req: NextRequest): string | null {
  const token = req.cookies.get('token')?.value;
  return token || null;
}

export const config = {
  matcher: [
    '/((?!api|_next/static|_next/image|manifest|icon|favicon.ico).*)',
  ],
};
