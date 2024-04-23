"use client";

import { useLoadingStore } from "@/hooks/use-loading-store";
import { cn } from "@/lib/utils";
import { ChevronsLeft, ChevronsRight } from "lucide-react";
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
  const startPage = currentPage < 5 ? 1 : currentPage > maxPages ? 4 : 3;

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

  const PAGE_BUTTON_COUNT = maxPages > 5 ? 5 : maxPages || 1;

  return (
    <div className="mx-auto mt-3 flex w-fit items-center gap-2 rounded-full bg-background_2 px-3 py-2 shadow-xl">
      <Button
        variant="ghost"
        size="icon"
        disabled={currentPage === 1}
        onClick={() => handleClick(currentPage - 1)}
        className={cn("size-8 rounded-full bg-background")}
      >
        <ChevronsLeft className="size-4" />
      </Button>
      {Array.from({ length: PAGE_BUTTON_COUNT }).map((_, index) => {
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
      <Button
        onClick={() => handleClick(currentPage + 1)}
        variant="ghost"
        size="icon"
        className={cn("size-8 rounded-full bg-background")}
        disabled={currentPage >= maxPages}
      >
        <ChevronsRight className="size-4" />
      </Button>
    </div>
  );
};