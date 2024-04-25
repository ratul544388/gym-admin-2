"use client";

import { membershipPlans } from "@/constants";
import { useModalStore } from "@/hooks/use-modal-store";
import { formatPhone, getMembershipPlanByLabel } from "@/lib/utils";
import { useEffect, useState, useTransition } from "react";
import { DatePicker } from "../date-picker";
import { List } from "../list";
import { LoadingButton } from "../loading-button";
import { ModifyPrice } from "../modify-price";
import { Select } from "../select";
import { Modal } from "./modal";
import { toast } from "sonner";
import { renewMember } from "@/actions/members";

export const RenewModal = () => {
  const { isOpen, type, data, onClose } = useModalStore();

  const [membershipPlan, setMembershipPlan] = useState(
    data.member?.membershipPlan,
  );

  const [price, setPrice] = useState(0);

  const [startDate, setStartDate] = useState<Date | undefined>(
    data.member?.endDate,
  );
  const { member } = data;

  const [isPending, startTransition] = useTransition();

  useEffect(() => {
    setPrice(getMembershipPlanByLabel(membershipPlan as string).price);
  }, [membershipPlan]);

  useEffect(() => {
    if (data.member) {
      setMembershipPlan(data.member?.membershipPlan);
      setStartDate(data.member.endDate);
    }
  }, [data.member]);

  if (!member) return;

  const handleRenew = () => {
    if (!startDate || !membershipPlan) return;
    startTransition(() => {
      renewMember({ member, cost: price, membershipPlan, startDate }).then(
        ({ error, success }) => {
          if (success) {
            toast.success(success);
            onClose();
          } else {
            toast.error(error);
          }
        },
      );
    });
  };

  const { name, memberId, phone, membershipPlan: currentMembershipPlan } = member;

  const list = [
    {
      label: "Id",
      value: memberId,
    },
    {
      label: "Name",
      value: name,
    },
    {
      label: "Phone",
      value: formatPhone(phone),
    },
    {
      label: "Current Membership Plan",
      value: currentMembershipPlan,
    },
    {
      label: "New Membership Plan",
      value: membershipPlan,
    },
  ];

  return (
    <Modal open={isOpen && type === "renewModal"} title={`Renew Member`}>
      <div className="p-5 pt-1">
        <List items={list} />
        <div className="mt-5 flex flex-col gap-6">
          <Select
            label="Renew Membership Plan"
            value={membershipPlan}
            onChange={setMembershipPlan}
            options={membershipPlans.map((plan) => plan.label)}
            disabled={isPending}
          />
          <DatePicker
            label="Renew Start Date"
            value={startDate}
            onChange={setStartDate}
            disabled={isPending}
          />
          <div className="flex items-center gap-5">
            <ModifyPrice
              title="Edit Cost"
              onChange={setPrice}
              price={price}
              triggerLabel="Cost"
            />
            <LoadingButton
              onClick={handleRenew}
              label="Renew"
              className="w-full"
              isLoading={isPending}
            />
          </div>
        </div>
      </div>
    </Modal>
  );
};
