"use client";

import { useModalStore } from "@/hooks/use-modal-store";
import { Member } from "@prisma/client";
import { differenceInDays } from "date-fns";
import { Calendar, Edit, MoreHorizontal, Trash2, User2 } from "lucide-react";
import { useState } from "react";
import { Button } from "../ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";

interface CellActionProps {
  member: Member;
}

export const CellAction = ({ member }: CellActionProps) => {
  const [open, setOpen] = useState(false);
  const { onOpen } = useModalStore();

  const isDisabledRenew = () => {
    return differenceInDays(member.endDate, new Date()) > 15;
  };

  const items = [
    {
      label: "Profile",
      icon: User2,
      onClick: () => onOpen("profileModal", { member }),
    },
    {
      label: "Edit Member",
      icon: Edit,
      onClick: () => onOpen("editMember", { member }),
    },
    {
      label: "Renew Member",
      icon: Calendar,
      onClick: () => onOpen("renewModal", { member }),
      disabled: isDisabledRenew(),
    },
    {
      label: "Delete Member",
      icon: Trash2,
      onClick: () => onOpen("deleteMember", { member }),
    },
  ];

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button variant="ghost" size="icon">
          <MoreHorizontal className="size-4" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="flex w-fit flex-col p-0 py-2" align="end">
        {items.map(({ label, icon: Icon, onClick, disabled }) => (
          <Button
            onClick={() => {
              onClick();
              setOpen(false);
            }}
            disabled={disabled}
            variant="ghost"
            key={label}
            className="justify-start"
          >
            <Icon className="size-4" />
            {label}
          </Button>
        ))}
      </PopoverContent>
    </Popover>
  );
};
