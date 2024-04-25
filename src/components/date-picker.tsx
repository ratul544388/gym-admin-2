"use client";

import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import { useState } from "react";

interface DatePickerProps {
  value?: Date;
  onChange: (value?: Date) => void;
  disabled?: boolean;
  label: string;
}

export function DatePicker({
  value,
  onChange,
  disabled,
  label,
}: DatePickerProps) {
  const [open, setOpen] = useState(false);
  const handleSelect = (selectedDate: Date | undefined) => {
    if (selectedDate) {
      const date = new Date();
      selectedDate.setHours(date.getHours());
      selectedDate.setMinutes(date.getMinutes());
    }
    onChange(selectedDate || value);
    setOpen(false);
  };

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant={"ghost"}
          className={cn(
            "relative h-[3.6rem] w-full bg-background_2 pl-3 pt-3 text-left font-normal",
            !value && "text-muted-foreground",
          )}
          disabled={disabled}
        >
          <motion.span
            variants={{ closed: { y: "-50%" }, open: { top: 12 } }}
            initial="closed"
            animate={open || value ? "open" : "closed"}
            className={cn(
              "absolute left-3 top-1/2 text-sm text-muted-foreground",
              (open || value) && "text-xs",
            )}
          >
            {label}
          </motion.span>
          {value && format(value, "PPP")}
          <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto bg-background p-0" align="start">
        <Calendar
          mode="single"
          selected={value}
          onSelect={handleSelect}
          disabled={disabled}
          initialFocus
        />
      </PopoverContent>
    </Popover>
  );
}
