import { Container } from "@/components/container";
import { PageLoader } from "@/components/page-loader";
import { PaginationSkeleton } from "@/components/skeletons/pagination-skeleton";
import { TableSkeleton } from "@/components/skeletons/table-skeleton";
import { Skeleton } from "@/components/ui/skeleton";

const Loading = () => {
  return (
    <Container className="flex flex-col gap-4">
      <div className="flex items-center justify-between ">
        <div className="flex items-center gap-2">
          <Skeleton className="h-5 w-20" />
          <Skeleton className="size-4" />
          <Skeleton className="h-5 w-20" />
        </div>
        <Skeleton className="h-9 w-28" />
      </div>
      <Skeleton className="h-0.5 w-full" />
      <Skeleton className="h-9 w-60" />
      <div className="gaa-2 flex items-center gap-2">
        <Skeleton className="h-4 w-5" />
        <Skeleton className="h-4 w-20" />
        <Skeleton className="size-4" />
        <Skeleton className="h-4 w-8" />
      </div>
      <TableSkeleton />
      <PaginationSkeleton />
    </Container>
  );
};

export default Loading;
