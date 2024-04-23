"use client";

import { Skeleton } from "../ui/skeleton";

export const TableSkeleton = () => {
  return (
    <div className="border bg-background overflow-x-auto">
      {Array.from({ length: 11 }).map((_, index) => (
        <div
          key={index}
          className="flex items-center border-b p-3.5 gap-6 w-[1100px]"
        >
          <Skeleton className="w-12 h-5" />
          <Skeleton className="w-28 h-5" />
          <Skeleton className="w-28 h-5" />
          <Skeleton className="w-20 h-5" />
          <Skeleton className="w-20 h-5" />
          <Skeleton className="w-20 h-5" />
          <Skeleton className="w-20 h-5" />
          <Skeleton className="w-20 h-5" />
          <Skeleton className="w-20 h-5" />
          <Skeleton className="w-20 h-5" />
          <Skeleton className="w-20 h-5" />
          <Skeleton className="w-8 h-8 rounded-full" />
        </div>
      ))}
    </div>
  );
};
