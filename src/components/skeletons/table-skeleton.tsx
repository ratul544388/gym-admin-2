"use client";

import { Skeleton } from "../ui/skeleton";

export const TableSkeleton = () => {
  return (
    <div className="overflow-x-auto border bg-background">
      {Array.from({ length: 11 }).map((_, index) => (
        <div
          key={index}
          className="grid grid-cols-8 items-center gap-6 w-[1200px] border-b p-3.5"
        >
          <Skeleton className="h-5" />
          <Skeleton className="h-5" />
          <Skeleton className="h-5" />
          <Skeleton className="h-5" />
          <Skeleton className="h-5" />
          <Skeleton className="h-5" />
          <Skeleton className="h-5" />
          <Skeleton className="h-5" />
        </div>
      ))}
    </div>
  );
};
