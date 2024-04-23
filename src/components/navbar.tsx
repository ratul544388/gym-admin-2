"use client";

import { UserButton, useUser } from "@clerk/nextjs";
import { Container } from "./container";
import { Logo } from "./logo";
import { Skeleton } from "./ui/skeleton";
import { MobileSidebar } from "./mobile-sidebar";

export const Navbar = () => {
  const { isLoaded } = useUser();
  return (
    <nav className="sticky top-0 z-20 w-full h-[60px] bg-background_2 md:hidden">
      <Container className="flex h-full items-center justify-between">
        <div className="flex items-center gap-4">
          <MobileSidebar/>
          <Logo />
        </div>
        {isLoaded && <UserButton afterSignOutUrl="/sign-in" />}
        {!isLoaded && <Skeleton className="size-8 rounded-full" />}
      </Container>
    </nav>
  );
};
