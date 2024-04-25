"use client";

import { cn } from "@/lib/utils";

interface ListProps {
  items: {
    label: string;
    value?: string | number | null;
    labelClassName?: string;
    valueClassName?: string;
    onClick?: () => void;
  }[];
  className?: string;
}

export const List = ({ items, className }: ListProps) => {
  return (
    <ul className={cn("flex flex-col gap-2.5 text-sm", className)}>
      {items.map(
        ({ label, value, labelClassName, valueClassName, onClick }) => (
          <li
            onClick={() => onClick?.()}
            key={label}
            className="flex items-center gap-2"
          >
            <p className={cn("text-muted-foreground", labelClassName)}>
              {label}:
            </p>
            <p className={cn(valueClassName)}>{value || "Not given"}</p>
          </li>
        ),
      )}
    </ul>
  );
};
