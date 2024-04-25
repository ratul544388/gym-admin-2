"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { Button } from "./ui/button";
import qs from "query-string";
import { useLoadingStore } from "@/hooks/use-loading-store";
import {
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
  MoreHorizontal,
} from "lucide-react";

interface PaginationProps {
  maxPages: number;
}

export const Pagination = ({ maxPages }: PaginationProps) => {
  const router = useRouter();
  const { setLoading } = useLoadingStore();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const currentPage = Number(searchParams.get("page")) || 1;

  let maxPageButtons = maxPages >= 5 ? 5 : maxPages || 1;

  let startPage = currentPage - 3 <= 0 ? 1 : currentPage - 3;
  if (currentPage >= maxPages) {
    startPage = currentPage - 4 <= 1 ? 1 : currentPage - 4;
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

  const showJumpAheadButton = maxPages > 5 && maxPages > currentPage + 1;
  const showJumpBackButton = maxPages > 5 && currentPage > 4;

  if (showJumpAheadButton && showJumpBackButton) {
    maxPageButtons = 3;
    startPage = currentPage - 1;
  }

  const handleJumpAhead = () => {
    if (currentPage + 5 > maxPages) {
      handleClick(maxPages);
    } else {
      handleClick(currentPage + 5);
    }
  };

  const handleJumpBack = () => {
    if (currentPage - 5 <= 0) {
      handleClick(1);
    } else {
      handleClick(currentPage - 5);
    }
  };

  return (
    <div className="mx-auto flex items-center gap-1.5 rounded-full bg-background_2 px-3 py-2 shadow-xl xs:gap-2">
      <Button
        onClick={() => handleClick(currentPage - 1)}
        disabled={currentPage === 1}
        variant="ghost"
        size="icon"
        className="size-8 rounded-full bg-background"
      >
        <ChevronLeft className="size-4" />
      </Button>
      {showJumpBackButton && (
        <>
          <Button
            onClick={() => handleClick(1)}
            variant="ghost"
            size="icon"
            className="group size-8 rounded-full bg-background"
          >
            1
          </Button>
          <Button
            onClick={handleJumpBack}
            variant="ghost"
            size="icon"
            className="group size-8 rounded-full bg-background text-muted-foreground"
          >
            <MoreHorizontal className="size-4 group-hover:hidden" />
            <ChevronsLeft className="hidden size-4 group-hover:block" />
          </Button>
        </>
      )}
      {Array.from({ length: maxPageButtons }).map((_, index) => {
        const page = startPage + index;
        const isActive = currentPage === page;
        const variant = isActive ? "primary" : "ghost";
        return (
          <Button
            onClick={() => handleClick(page)}
            key={index}
            variant={variant}
            size="icon"
            className="size-8 rounded-full bg-background"
          >
            {page}
          </Button>
        );
      })}
      {showJumpAheadButton && (
        <>
          <Button
            onClick={handleJumpAhead}
            variant="ghost"
            size="icon"
            className="group size-8 rounded-full bg-background text-muted-foreground"
          >
            <MoreHorizontal className="size-4 group-hover:hidden" />
            <ChevronsRight className="hidden size-4 group-hover:block" />
          </Button>
          <Button
            onClick={() => handleClick(maxPages)}
            variant="ghost"
            size="icon"
            className="group size-8 rounded-full bg-background"
          >
            {maxPages}
          </Button>
        </>
      )}
      <Button
        onClick={() => handleClick(currentPage + 1)}
        disabled={currentPage === (maxPages || 1)}
        variant="ghost"
        size="icon"
        className="size-8 rounded-full bg-background"
      >
        <ChevronRight className="size-4" />
      </Button>
    </div>
  );
};
