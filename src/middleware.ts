import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";

const privateRoutes = createRouteMatcher(["/dashboard", "/members"]);

export default clerkMiddleware((auth, req) => {
  if (privateRoutes(req)) auth().protect();
});

export const config = {
  matcher: ["/((?!.*\\..*|_next).*)", "/", "/(api|trpc)(.*)"],
};
