import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

const publicRoutes = createRouteMatcher(["/"]);
const privateRoutes = createRouteMatcher(["/dashboard", "/members"]);

export const adminIds = ["user_2fWJhVppPvakH4KhO17soQ8GNU2"];

export default clerkMiddleware((auth, req) => {
  const getUrl = (url: string) => {
    return new URL(url, req.url);
  };

  if (privateRoutes(req)) auth().protect();

  if (privateRoutes(req) && !adminIds.includes(auth().userId as string)) {
    return NextResponse.redirect(getUrl("/"));
  }

  if (publicRoutes(req) && adminIds.includes(auth().userId as string)) {
    return NextResponse.redirect(getUrl("/dashboard"));
  }
});

export const config = {
  matcher: ["/((?!.*\\..*|_next).*)", "/", "/(api|trpc)(.*)"],
};
