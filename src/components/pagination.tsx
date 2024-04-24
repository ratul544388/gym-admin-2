"use client";

import { useLoadingStore } from "@/hooks/use-loading-store";
import { cn } from "@/lib/utils";
import {
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
  MoreHorizontal,
} from "lucide-react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import qs from "query-string";
import { Button } from "./ui/button";

interface PaginationProps {
  maxPages: number;
}

export const Pagination = ({ maxPages }: PaginationProps) => {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();
  const { setLoading } = useLoadingStore();

  const currentPage = Number(searchParams.get("page")) || 1;

  let startPage = currentPage - 2;
  if (startPage <= 0) {
    startPage = 1;
  }
  if (currentPage >= maxPages) {
    startPage = currentPage - 3;
  }

  const handleClick = (page: number) => {
    if (page === currentPage) return;
    setLoading(true);
    const currentQuery = qs.parse(searchParams.toString());
    const url = qs.stringifyUrl({
      url: pathname,
      query: {
        ...currentQuery,
        page,
      },
    });
    router.push(url);
  };

  const showJumpAheadButton = maxPages - currentPage > 2;
  const showJumpBackButton = currentPage - 3 >= 1;

  let maxPageCount = 4;
  if (maxPageCount < 4) {
    maxPageCount = maxPages || 1;
  }
  if (showJumpAheadButton && showJumpBackButton) {
    maxPageCount = 3;
    startPage = currentPage - 1;
  }

  const handleJumpAhead = () => {
    const page = currentPage + 5 > maxPages ? maxPages : currentPage + 5;
    handleClick(page);
  };

  const handleJumpBack = () => {
    const page = currentPage - 5 <= 1 ? 1 : currentPage - 5;
    handleClick(page);
  };

  const showFirstPageButton = currentPage > 3;

  const showLastPageButton = currentPage + 1 < maxPages;

  return (
    <div className="mx-auto mt-3 flex w-fit items-center gap-1.5 rounded-full bg-background_2 px-3 py-2 shadow-xl xs:gap-2">
      <Button
        variant="ghost"
        size="icon"
        disabled={currentPage === 1}
        onClick={() => handleClick(currentPage - 1)}
        className={cn("size-8 rounded-full bg-background")}
      >
        <ChevronLeft className="size-4" />
      </Button>
      {showFirstPageButton && (
        <Button
          onClick={() => handleClick(1)}
          variant="outline"
          size="icon"
          className={cn("size-8 rounded-full bg-background")}
        >
          {1}
        </Button>
      )}
      {showJumpBackButton && (
        <Button
          onClick={handleJumpBack}
          variant="ghost"
          size="icon"
          className={cn(
            "group size-8 rounded-full bg-background text-muted-foreground",
          )}
        >
          <MoreHorizontal className="size-4 group-hover:hidden" />
          <ChevronsLeft className="hidden size-4 group-hover:block" />
        </Button>
      )}
      {Array.from({ length: maxPageCount }).map((_, index) => {
        const page = startPage + index;
        return (
          <Button
            onClick={() => handleClick(page)}
            variant={currentPage === page ? "primary" : "ghost"}
            size="icon"
            className={cn("size-8 rounded-full bg-background")}
            key={index}
          >
            {page}
          </Button>
        );
      })}
      {showJumpAheadButton && (
        <Button
          onClick={handleJumpAhead}
          variant="ghost"
          size="icon"
          className={cn(
            "group size-8 rounded-full bg-background text-muted-foreground",
          )}
        >
          <MoreHorizontal className="size-4 group-hover:hidden" />
          <ChevronsRight className="hidden size-4 group-hover:block" />
        </Button>
      )}
      {showLastPageButton && (
        <Button
          onClick={() => handleClick(maxPages)}
          variant="outline"
          size="icon"
          className={cn("size-8 rounded-full bg-background")}
        >
          {maxPages}
        </Button>
      )}
      <Button
        onClick={() => handleClick(currentPage + 1)}
        variant="ghost"
        size="icon"
        className={cn("size-8 rounded-full bg-background")}
        disabled={currentPage >= maxPages}
      >
        <ChevronRight className="size-4" />
      </Button>
    </div>
  );
};
