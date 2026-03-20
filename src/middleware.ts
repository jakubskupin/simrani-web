import { NextRequest, NextResponse } from "next/server";

export function middleware(request: NextRequest) {
  const host = request.headers.get("host") || "";

  // /brand only accessible on Vercel preview URL and localhost, not on public domain
  if (
    !host.includes("vercel.app") &&
    !host.includes("localhost")
  ) {
    return new NextResponse("Not Found", { status: 404 });
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/brand", "/brand/:path*"],
};
