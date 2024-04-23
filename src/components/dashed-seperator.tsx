"use client";

import { cn } from "@/lib/utils";

interface DashedSeperatorProps {
  className?: string;
}

export const DashedSeperator = ({ className }: DashedSeperatorProps) => {
  return (
    <span className={cn("w-full border-[1.2px] border-dashed", className)} />
  );
};
