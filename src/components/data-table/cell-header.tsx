"use client";

import { ChevronDown } from "lucide-react";
import { DropdownMenu } from "../dropdown-menu";
import { Button } from "../ui/button";
import { useQueryString } from "@/hooks/use-query-string";
import { useSearchParams } from "next/navigation";
import { useLoadingStore } from "@/hooks/use-loading-store";

interface CellHeaderProps {
  label: string;
  items: string[];
  filterKey: string;
}

export const CellHeader = ({ items, filterKey, label }: CellHeaderProps) => {
  const { push } = useQueryString();
  const searchParams = useSearchParams();
  const { setLoading } = useLoadingStore();

  const activeValue = searchParams.get(filterKey);

  const handleClick = (selectedValue: string) => {
    setLoading(true);
    if (selectedValue === searchParams.get(filterKey)) {
      push({ [filterKey]: "" });
    } else {
      push({ [filterKey]: selectedValue });
    }
  };

  const trigger = (
    <Button
      variant="secondary"
      className="capitalize text-muted-foreground hover:bg-white/5"
    >
      {label}
      <ChevronDown className="size-4" />
      {activeValue && (
        <span className="rounded-sm bg-background px-2 py-0.5 text-xs capitalize">
          {activeValue}
        </span>
      )}
    </Button>
  );

  return (
    <DropdownMenu
      trigger={trigger}
      items={items.map((item) => ({
        label: item,
        onClick: () => handleClick(item.toLowerCase()),
      }))}
      value={activeValue}
    />
  );
};
