"use client";

import { UserButton } from "@clerk/nextjs";
import { Logo } from "./logo";
import { SidebarLinks } from "./sidebar-links";

export const Sidebar = () => {
  return (
    <div className="fixed inset-y-0 top-0 z-20 hidden min-w-[240px] flex-col gap-10 bg-background_2 p-5 pb-3 md:flex">
      <Logo className="ml-4" />
      <SidebarLinks />
      <div className="mt-auto pl-4">
        <UserButton afterSignOutUrl="/sign-in">
          hello
        </UserButton>
      </div>
    </div>
  );
};
