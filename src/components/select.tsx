"use client";

import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import { useState } from "react";
import {
  Select as CustomSelect,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";

interface SelectProps {
  options: string[];
  value?: string;
  onChange: (value: string) => void;
  disabled?: boolean;
  label: string;
  required?: boolean;
}

export const Select = ({
  label,
  options,
  value,
  onChange,
  disabled,
  required = true,
}: SelectProps) => {
  const [open, setOpen] = useState(false);
  return (
    <CustomSelect
      open={open}
      onOpenChange={setOpen}
      value={value}
      onValueChange={onChange}
      disabled={disabled}
    >
      <SelectTrigger
        className={cn(
          "relative h-[3.6rem] bg-background_2 pt-4 capitalize hover:bg-background_2/90",
        )}
      >
        <SelectValue />
        <motion.span
          variants={{ closed: { y: "-50%" }, open: { top: 12 } }}
          initial="closed"
          animate={open || value ? "open" : "closed"}
          className={cn(
            "absolute top-1/2 font-medium text-muted-foreground",
            (open || value) && "text-xs",
          )}
        >
          {label.toLowerCase()}
          {required && <span className="ml-1 text-red-500">*</span>}
        </motion.span>
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          {options.map((item) => (
            <SelectItem key={item} value={item} className="capitalize">
              {item.toLowerCase()}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </CustomSelect>
  );
};
