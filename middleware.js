import { NextResponse } from "next/server"
import { COOKIE_NAME } from "./lib/constants"

export function middleware(request) {
    const start = Date.now();

    let response;

    // Handle /dashboard auth check
    if (request.nextUrl.pathname.startsWith("/dashboard")) {
        if (!request.cookies.has(COOKIE_NAME)) {
            response = NextResponse.redirect(new URL("/signin", request.url));
        }
    }

    // Handle root redirect
    if (!response && request.nextUrl.pathname === "/") {
        response = NextResponse.redirect(new URL("/dashboard", request.url));
    }

    if (!response) {
        response = NextResponse.next();
    }

    const method = request.method;
    const url = request.nextUrl.pathname + request.nextUrl.search;
    const status = response.status;
    console.log(`${method} ${url} ${status}`);

    return response;
}

export const config = {
    matcher: ['/dashboard/:path*', '/'],
}