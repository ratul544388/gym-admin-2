"use client";

import { statuses } from "@/constants";
import { cn, isEqualString } from "@/lib/utils";
import { Check, ChevronDown } from "lucide-react";
import { useSearchParams } from "next/navigation";
import { useState } from "react";
import { Button } from "../ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { useQueryString } from "@/hooks/use-query-string";
import { useLoadingStore } from "@/hooks/use-loading-store";

export const StatusDropdownMenu = () => {
  const [open, setOpen] = useState(false);
  const searchParams = useSearchParams();
  const status = searchParams.get("status");
  const { push } = useQueryString();
  const { setLoading } = useLoadingStore();

  type ItemProps = {
    label: (typeof statuses)[number]["label"];
    dotColor: string;
  };

  const items: ItemProps[] = [
    {
      label: "Active",
      dotColor: "bg-green-500",
    },
    {
      label: "Pending",
      dotColor: "bg-blue-500",
    },
    {
      label: "Expire",
      dotColor: "bg-red-500",
    },
    {
      label: "Invalid",
      dotColor: "bg-black",
    },
  ];

  const handleClick = (value: string) => {
    setLoading(true);
    if (isEqualString(value, status)) {
      push({ status: "" });
    } else {
      push({ status: value });
    }
    setOpen(false);
  };

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="secondary"
          className="text-muted-foreground hover:bg-white/5 hover:text-muted-foreground"
        >
          Status
          <ChevronDown
            className={cn("size-4 transition", open && "rotate-180")}
          />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="flex w-fit flex-col p-0 py-2">
        {items.map(({ label, dotColor }) => (
          <Button
            onClick={() => handleClick(label)}
            variant="ghost"
            key={label}
            className="min-w-28 justify-start"
          >
            <span className={cn("size-4 rounded-full", dotColor)} />
            {label}
            {isEqualString(status, label) && (
              <Check className="ml-auto size-4" />
            )}
          </Button>
        ))}
      </PopoverContent>
    </Popover>
  );
};
