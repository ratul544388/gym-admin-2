"use client";

import { useModalStore } from "@/hooks/use-modal-store";
import { Modal } from "./modal";
import { Photo } from "../photo";
import { capitalize, formatDate } from "@/lib/utils";
import { Separator } from "../ui/separator";

export const ProfileModal = () => {
  const { isOpen, type, data } = useModalStore();
  const { member } = data;

  if (!member) return;

  const {
    name,
    address,
    age,
    createdAt,
    endDate,
    gender,
    id,
    image,
    membershipPlan,
    phone,
    revenue,
    startDate,
  } = member;

  const userInfoList = [
    {
      label: "ID",
      value: id,
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
      value: formatDate(createdAt),
    },
    {
      label: "Membership Starts",
      value: formatDate(startDate),
    },
    {
      label: "Expire Date",
      value: formatDate(endDate),
    },
  ];

  return (
    <Modal open={isOpen && type === "profileModal"} title={`${name} Profile`}>
      <div className="w-full p-5 pt-2">
        <div className="xs:flex-flex-col flex w-full flex-row gap-5">
          <Photo
            src={image || "/placeholder.jpg"}
            alt={name}
            className="size-36 rounded-md"
          />
          <ul className="space-y-2.5">
            {membershipInfoList.map(({ label, value }) => (
              <li key={label}>
                {label}:{" "}
                <span className="font-medium text-muted-foreground">
                  {value || "Not Given"}
                </span>
              </li>
            ))}
          </ul>
        </div>
        <Separator className="mt-4" />
        <h2 className="mt-3 font-bold">User Info</h2>
        <span className="mt-2 block w-full border border-dashed" />
        <ul className="mt-2 space-y-2.5">
          {userInfoList.map(({ label, value }) => (
            <li key={label}>
              {label}:{" "}
              <span className="font-medium text-muted-foreground">
                {value || "Not Given"}
              </span>
            </li>
          ))}
        </ul>
        <Separator className="my-3"/>
        <h2 className="font-bold text-center">Status</h2>
        <span className="mt-2 block w-full border border-dashed" />
      </div>
    </Modal>
  );
};
