import { NextResponse, type NextRequest } from "next/server";

// No backend auth configured yet — pass all requests through.
export function middleware(request: NextRequest) {
    return NextResponse.next({ request });
}

export const config = {
    matcher: [
        "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
    ],
};
