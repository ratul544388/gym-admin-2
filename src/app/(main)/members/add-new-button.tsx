"use client";

import { Button } from "@/components/ui/button";
import { useModalStore } from "@/hooks/use-modal-store";
import { PlusCircle } from "lucide-react";

export const AddNewButton = () => {
  const { onOpen } = useModalStore();
  return (
    <Button onClick={() => onOpen("createMember")} size="sm">
      Add new
      <PlusCircle className="size-4" />
    </Button>
  );
};
