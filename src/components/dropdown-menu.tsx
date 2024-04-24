"use client";

import { Check, LucideIcon } from "lucide-react";
import { ReactNode, useState } from "react";
import { Button } from "./ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import { IconType } from "react-icons/lib";

interface DropdownMenuProps {
  trigger: ReactNode;
  items: {
    label: string;
    icon?: LucideIcon | IconType
    disabled?: boolean;
    onClick: () => void;
  }[];
  value?: string | null;
  align?: "center" | "start" | "end";
}

export const DropdownMenu = ({
  trigger,
  items,
  align,
  value,
}: DropdownMenuProps) => {
  const [open, setOpen] = useState(false);
  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>{trigger}</PopoverTrigger>
      <PopoverContent className="flex w-fit flex-col p-0 py-2" align={align}>
        {items.map(({ label, icon: Icon, onClick }) => (
          <Button
            onClick={() => {
              onClick();
              setOpen(false);
            }}
            variant="ghost"
            key={label}
            className="min-w-28 justify-start"
          >
            {Icon && <Icon className="size-4" />}
            {label}
            {value?.toLowerCase() === label.toLowerCase() && (
              <Check className="ml-auto size-4" />
            )}
          </Button>
        ))}
      </PopoverContent>
    </Popover>
  );
};
