"use client";

import { X } from "lucide-react";
import { ReactNode } from "react";
import { Button } from "../ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "../ui/dialog";
import { useModalStore } from "@/hooks/use-modal-store";
import { cn } from "@/lib/utils";

interface ModalProps {
  open: boolean;
  title: string;
  description?: string;
  children: ReactNode;
  disabled?: boolean;
  className?: string;
}

export const Modal = ({
  open,
  title,
  description,
  children,
  disabled,
  className,
}: ModalProps) => {
  const { onClose } = useModalStore();

  const handleClose = () => {
    if (disabled) return;
    onClose();
  };

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent
        className={cn("max-h-[100dvh] gap-0 overflow-y-auto p-0", className)}
      >
        <DialogHeader className="sticky top-0 z-10 bg-background p-5">
          <DialogTitle className="">{title}</DialogTitle>
          <DialogDescription>{description}</DialogDescription>
          <Button
            disabled={disabled}
            onClick={onClose}
            className="absolute right-2 top-1"
            size="icon"
            variant="ghost"
          >
            <X className="size-6" />
          </Button>
        </DialogHeader>
        {children}
      </DialogContent>
    </Dialog>
  );
};
