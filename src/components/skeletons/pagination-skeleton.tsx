import { cn } from "@/lib/utils";
import { Skeleton } from "../ui/skeleton";

interface PaginationSkeletonProps {
  className?: string;
}

export const PaginationSkeleton = ({ className }: PaginationSkeletonProps) => {
  return (
    <div
      className={cn(
        "flex flex-col gap-1 rounded-full bg-background_2 px-3 py-2 shadow-xl xs:gap-2",
        className,
      )}
    >
      {Array.from({ length: 7 }).map((_, index) => (
        <Skeleton key={index} className="size-8 rounded-full" />
      ))}
    </div>
  );
};
