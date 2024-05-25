import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { auth } from "./auth";
import { authRoutes } from "./routes";

// This function can be marked `async` if using `await` inside
export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;
  const session = await auth();
  const isLoggedIn = session?.user;

  
  const isAuthRoute = authRoutes.includes(pathname);
  if (isLoggedIn && isAuthRoute) {
    return NextResponse.redirect(new URL("/", req.url));
  }
}


export const config = {
  matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
};
