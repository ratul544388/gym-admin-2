"use client";

import { useLoadingStore } from "@/hooks/use-loading-store";
import { useQueryString } from "@/hooks/use-query-string";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useDebounceValue } from "usehooks-ts";

interface SearchInputProps {}

export const SearchInput = ({}: SearchInputProps) => {
  const [value, setValue] = useState("");
  const { push } = useQueryString();
  const [debouncedValue] = useDebounceValue(value, 400);
  const router = useRouter();
  const { setLoading } = useLoadingStore();

  useEffect(() => {
    if (debouncedValue) {
      setLoading(true);
      router.push(`/members?q=${debouncedValue.replace(/ /g, "+")}`);
    } else {
      push({ q: debouncedValue });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [router, debouncedValue, setLoading]);

  return (
    <input
      value={value}
      onChange={(e) => setValue(e.target.value)}
      placeholder="Search members..."
      className="focus:visible:ring-primary h-9 rounded-md border bg-background_2 px-3 outline-none placeholder:text-sm hover:bg-background_2/90 focus:bg-background_2/90"
    />
  );
};
