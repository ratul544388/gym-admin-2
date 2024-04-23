"use client";

import { useState } from "react";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import { formatPrice } from "@/lib/utils";
import { Button } from "./ui/button";

interface ModifyPriceProps {
  triggerLabel: string;
  price: number;
  onChange: (price: number) => void;
  title: string;
}

export const ModifyPrice = ({
  price,
  onChange,
  triggerLabel,
  title,
}: ModifyPriceProps) => {
  const [open, setOpen] = useState(false);
  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger>
        <div className="flex items-center gap-2 text-sm">
          <p className="text-muted-foreground">{triggerLabel}:</p>
          <p>{formatPrice(price)}</p>
        </div>
      </PopoverTrigger>
      <PopoverContent align="start" className="flex flex-col gap-3">
        <h3 className="text-sm font-semibold">{title}</h3>
        <input
          placeholder="Total"
          value={price}
          onChange={(e) => onChange(parseFloat(e.target.value) || 0)}
          className="h-9 rounded-md border bg-background px-3 text-sm placeholder:text-sm hover:bg-background/90"
        />
        <Button
          onClick={() => setOpen(false)}
          variant="default"
          size="sm"
          className="ml-auto"
        >
          Save
        </Button>
      </PopoverContent>
    </Popover>
  );
};
