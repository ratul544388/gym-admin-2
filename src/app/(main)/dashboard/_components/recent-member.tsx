"use client";

import { useModalStore } from "@/hooks/use-modal-store";
import { formatPrice } from "@/lib/utils";
import { MemberType } from "@/types";

interface RecentMemberProps {
  member: MemberType;
}

export const RecentMember = ({ member }: RecentMemberProps) => {
  const { onOpen } = useModalStore();
  return (
    <li className="flex items-center gap-3 text-sm font-medium text-muted-foreground">
      <h4
        onClick={() => onOpen("profileModal", { member })}
        className="line-clamp-1 hover:underline"
        role="button"
      >
        {member.name}
      </h4>
      <div className="whitespace-nowrap rounded-full bg-background px-3 py-0.5 text-xs font-medium shadow-xl">
        {member.membershipPlan}
      </div>
      <p className="font-semibold text-primary">
        +{formatPrice(member.revenue)}
      </p>
    </li>
  );
};
