"use client";

import { cn } from "@/lib/utils";
import { ChevronRight } from "lucide-react";
import Link from "next/link";

interface BreadCrumbsProps {
  items: {
    label: string;
    href?: string;
  }[];
}

export const BreadCrumbs = ({ items }: BreadCrumbsProps) => {
  return (
    <nav className="flex items-center gap-2">
      <ul className="flex items-center gap-2 truncate text-sm font-medium">
        {items.map(({ label, href }) => (
          <li key={label} className={cn("flex items-center gap-2")}>
            <Link
              href={href || ""}
              className={cn(
                "peer line-clamp-1 py-2 text-muted-foreground transition-colors hover:text-foreground",
                !href && "pointer-events-none text-foreground",
              )}
            >
              {label}
            </Link>
            <ChevronRight
              className={cn(
                "size-3.5 text-muted-foreground",
                !href && "hidden",
              )}
            />
          </li>
        ))}
      </ul>
    </nav>
  );
};
