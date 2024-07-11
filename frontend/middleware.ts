import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import Cookies from "cookies";

const protectedRoutes = ["/dashboard/profile"];

export default function middleware(req: NextRequest) {
  if (protectedRoutes.includes(req.nextUrl.pathname)) {
    const token = getTokenFromCookies(req);
    if (!token) {
      const returnUrl = req.nextUrl.pathname;
      const loginUrl = new URL(`/login?returnUrl=${returnUrl}`, req.nextUrl.origin);
      return NextResponse.redirect(loginUrl);
    }
  }
  return NextResponse.next();
}


// export function getTokenFromCookie(): string | undefined {
//   return Cookies.get('token');
// }

export function getTokenFromCookies(req: NextRequest): string | null {
  const cookieHeader = req.headers.get('cookie');
  if (!cookieHeader) return null;

  const cookies = cookieHeader.split(';').reduce((acc, cookie) => {
    const [key, value] = cookie.trim().split('=');
    acc[key] = value;
    return acc;
  }, {} as Record<string, string>);

  return cookies['token'] || null;
}
