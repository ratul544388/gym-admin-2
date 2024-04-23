import { Skeleton } from "../ui/skeleton";

export const DashboardCardsSkeleton = () => {
  return (
    <div className="xs:grid-cols-2 grid gap-6 lg:grid-cols-3">
      {Array.from({ length: 6 }).map((_, index) => (
        <div
          key={index}
          className="relative space-y-3 overflow-hidden rounded-lg border bg-background_2 p-4 shadow-xl"
        >
          <Skeleton className="h-5 w-40" />
          <Skeleton className="h-7 w-24" />
          <Skeleton className="absolute -right-10 -top-12 size-28 text-muted-foreground opacity-20" />
        </div>
      ))}
    </div>
  );
};
