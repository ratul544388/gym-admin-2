"use client";

import { getMembershipRecords } from "@/actions/membership-records";
import { useModalStore } from "@/hooks/use-modal-store";
import { capitalize, formatDate, formatPrice } from "@/lib/utils";
import { MembershipRecord } from "@prisma/client";
import { ArrowDown } from "lucide-react";
import { useEffect, useState, useTransition } from "react";
import { toast } from "sonner";
import { List } from "../list";
import { Photo } from "../photo";
import { Separator } from "../ui/separator";
import { Modal } from "./modal";

export const ProfileModal = () => {
  const { isOpen, type, data } = useModalStore();
  const { member } = data;
  const [isPending, startTransition] = useTransition();
  const [membershipRecoreds, setMembershipRecords] = useState<
    MembershipRecord[]
  >([]);

  useEffect(() => {
    if (data.member?.id && type === "profileModal") {
      startTransition(() => {
        getMembershipRecords(data.member?.id as string).then(
          ({ error, records }) => {
            if (records) {
              setMembershipRecords(records);
            } else {
              toast(error);
            }
          },
        );
      });
    }
  }, [data.member?.id, type]);

  if (!member) return;

  const {
    name,
    memberId,
    address,
    age,
    createdAt,
    endDate,
    gender,
    image,
    membershipPlan,
    phone,
    startDate,
    revenue,
  } = member;

  const userInfoList = [
    {
      label: "ID",
      value: memberId,
    },
    {
      label: "Name",
      value: name,
    },
    {
      label: "Phone",
      value: phone,
    },
    {
      label: "Address",
      value: address,
    },
    {
      label: "Gender",
      value: capitalize(gender),
    },
    {
      label: "Age",
      value: age,
    },
  ];

  const membershipInfoList = [
    {
      label: "Membership Plan",
      value: membershipPlan,
    },
    {
      label: "Created At",
      value: formatDate({ date: createdAt, showTime: true }),
    },
    {
      label: "Membership Starts",
      value: formatDate({ date: startDate, showTime: true }),
    },
    {
      label: "Expire Date",
      value: formatDate({ date: endDate, showTime: true }),
    },
  ];

  return (
    <Modal
      open={isOpen && type === "profileModal"}
      title={`"${name}'s" Profile`}
    >
      <div className="w-full p-5 pt-2">
        <div className="xs:flex-flex-col flex w-full flex-row gap-5">
          <Photo
            src={image || "/placeholder.jpg"}
            alt={name}
            className="size-36 rounded-md"
          />
          <List items={membershipInfoList} />
        </div>
        <Separator className="mt-4" />
        <h2 className="mt-3 font-bold">User Info</h2>
        <span className="mt-2 block w-full border border-dashed" />
        <List items={userInfoList} className="mt-3" />
        <Separator className="my-3" />
        <h2 className="text-center font-bold">Status</h2>
        <span className="mt-2 block w-full border border-dashed" />
        <ul className="mt-3 flex flex-col items-center gap-3">
          {membershipRecoreds.map(({ id, createdAt, revenue }, index) => {
            const label =
              index === 0
                ? "Joined"
                : index === 1
                  ? "1st Renew"
                  : index === 2
                    ? "2nd Renew"
                    : index === 3
                      ? "3rd Renew"
                      : `${index}th Renew`;
            return (
              <li
                key={id}
                className="flex flex-col items-center gap-3 text-sm font-medium text-muted-foreground"
              >
                {index > 0 && (
                  <ArrowDown className="size-5 text-muted-foreground" />
                )}
                <div className="flex items-center gap-3">
                  <h5>{label}:</h5>
                  <h5>{formatDate({ date: createdAt })}</h5>
                  <p className="font-semibold text-primary">
                    +{formatPrice(revenue)}
                  </p>
                </div>
              </li>
            );
          })}
        </ul>
        {!!!membershipRecoreds.length && (
          <div className="flex items-center justify-center gap-3 text-sm text-muted-foreground">
            <h5>Joined:</h5>
            <h5>{formatDate({ date: createdAt })}</h5>
            <p className="font-semibold text-primary">
              +{formatPrice(revenue)}
            </p>
          </div>
        )}
      </div>
    </Modal>
  );
};
