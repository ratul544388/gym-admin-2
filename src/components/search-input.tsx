"use client";

import { useLoadingStore } from "@/hooks/use-loading-store";
import { useQueryString } from "@/hooks/use-query-string";
import { cn } from "@/lib/utils";
import { X } from "lucide-react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useDebounceValue } from "usehooks-ts";
import { Button, buttonVariants } from "./ui/button";
import { Input } from "./ui/input";

export const SearchInput = ({
  searchParams,
}: {
  searchParams: Record<string, string | undefined>;
}) => {
  const pathname = usePathname();
  const [value, setValue] = useState(searchParams.q || "");
  const { push } = useQueryString();
  const [debouncedValue] = useDebounceValue(value, 400);
  const router = useRouter();
  const { setLoading } = useLoadingStore();

  useEffect(() => {
    setLoading(true);
    if (debouncedValue) {
      push({ q: debouncedValue.replace(/ /g, "+") });
    } else {
      push({ q: debouncedValue });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [router, debouncedValue, setLoading]);

  const handleResetFilters = () => {
    if (pathname === "/members") return;
    setLoading(true);
    setValue("");
  };

  return (
    <section className="flex items-center gap-4">
      <div className="relative w-full max-w-[400px]">
        <Input
          value={value}
          onChange={(e) => setValue(e.target.value)}
          placeholder="Search Members by Name, Id or Phone"
          className="placeholder-shown:text-ellipsis"
        />
        {value && (
          <Button
            className="absolute right-1 top-1/2 size-8 -translate-y-1/2 rounded-full text-muted-foreground"
            variant="ghost"
            size="icon"
            onClick={() => setValue("")}
          >
            <X className="size-4" />
          </Button>
        )}
      </div>
      <Link
        onClick={handleResetFilters}
        href="/members"
        className={cn(
          buttonVariants({ variant: "secondary" }),
          "text-muted-foreground",
          !Object.keys(searchParams).length && "hidden",
        )}
      >
        Reset
        <X className="size-4" />
      </Link>
    </section>
  );
};
