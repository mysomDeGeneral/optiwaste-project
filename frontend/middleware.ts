import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { jwtVerify, decodeJwt } from "jose";
// import { getTokenFromCookie } from "./contexts/auth-context";
import { verifyUser } from "./apis/auth";


const protectedRoutes = ["/dashboard/*", "/users/*", "/collector/*"];



export default async function middleware(req: NextRequest) {
  console.log("Middleware called for path:", req.nextUrl.pathname);
  // if (protectedRoutes.includes(req.nextUrl.pathname)) {
  if (protectedRoutes.some(route => req.nextUrl.pathname.startsWith(route.replace('*', '')))) {
    const token = getTokenFromCookies(req);
    console.log("token:", token);
    if (!token) {
      console.log('No token found redirecting to login');
      const returnUrl = req.nextUrl.pathname;
      const loginUrl = new URL(`/login?returnUrl=${returnUrl}`, req.nextUrl.origin);
      return NextResponse.redirect(loginUrl);
    }

    try {
      const payload = decodeJwt(token);
      console.log("Decoded payload:", payload);

      // const { payload } = await verifyToken(token);
      // console.log('userRole in middleware:', payload.role);


    if (payload.role === 'admin' && !req.nextUrl.pathname.startsWith('/dashboard')) {
      return NextResponse.redirect(new URL('/dashboard', req.nextUrl.origin));
    } else if (payload.role === 'user' && !req.nextUrl.pathname.startsWith('/users')) {
      return NextResponse.redirect(new URL('/users/request', req.nextUrl.origin));
    } else if (payload.role === 'collector' && !req.nextUrl.pathname.startsWith('/collector')) {
      return NextResponse.redirect(new URL('/collector/requests', req.nextUrl.origin));
    }
  } catch (error) {
    console.error('Error verifying token:', error);
    return NextResponse.redirect(new URL('/login', req.nextUrl.origin));
  }
}

  return NextResponse.next();
}


async function verifyToken(token: string) {
  console.log("jwt:", process.env.JWT_SECRET);
  const secret = new TextEncoder().encode(process.env.JWT_SECRET);
  return await jwtVerify(token, secret);
}


export function getTokenFromCookies(req: NextRequest): string | null {
  const token = req.cookies.get('token')?.value;
  return token || null;
}

// export function getTokenFromCookies(req: NextRequest): string | null {
//   if (!req || !req.headers) return null;

//   const cookieHeader = req.headers.get('cookie');
//   if (!cookieHeader) return null;

//   const cookies = cookieHeader.split(';').reduce((acc, cookie) => {
//     const [key, value] = cookie.trim().split('=');
//     acc[key] = value;
//     return acc;
//   }, {} as Record<string, string>);

//   return cookies['token'] || null;
// }
