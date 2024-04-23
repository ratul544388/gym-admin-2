"use client";

import { sidebarLinks } from "@/constants";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { buttonVariants } from "./ui/button";
import { usePathname } from "next/navigation";

interface SidebarLinksProps {
  onCloseSidebar?: () => void;
}

export const SidebarLinks = ({ onCloseSidebar }: SidebarLinksProps) => {
  const pathname = usePathname();
  return (
    <nav className="flex flex-col">
      <ul>
        {sidebarLinks.map(({ label, href, icon: Icon }) => {
          const active = pathname === href;
          return (
            <li key={label} onClick={onCloseSidebar}>
              <Link
                href={href}
                className={cn(
                  buttonVariants({
                    variant: "ghost",
                  }),
                  "h-12 w-full justify-start gap-4 text-muted-foreground hover:bg-white/5",
                  active && "bg-white/5 text-foreground",
                )}
              >
                <Icon className="size-5" />
                {label}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
};
