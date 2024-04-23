"use client";

import { membershipPlans, statuses } from "@/constants";
import { capitalize, cn, formatDate, formatPhone } from "@/lib/utils";
import { MemberType } from "@/types";
import { Gender } from "@prisma/client";
import { ColumnDef } from "@tanstack/react-table";
import { differenceInDays, format } from "date-fns";
import { Photo } from "../photo";
import { Badge } from "../ui/badge";
import { CellAction } from "./cell-action";
import { CellHeader } from "./cell-header";

export const columns: ColumnDef<MemberType>[] = [
  {
    accessorKey: "id",
    header: "ID",
  },
  {
    accessorKey: "image",
    header: "Image",
    cell: ({ row }) => {
      const { name, image } = row.original;
      return <Photo src={image || "/placeholder.jpg"} alt={name} />;
    },
  },
  {
    accessorKey: "name",
    header: "Name",
  },
  {
    accessorKey: "phone",
    header: "Phone",
    cell: ({ row }) => {
      const { phone } = row.original;

      return (
        <p className={cn(!phone && "text-muted-foreground")}>
          {phone ? formatPhone(phone) : "Not given"}
        </p>
      );
    },
  },
  {
    accessorKey: "gender",
    header: () => {
      return (
        <CellHeader
          items={Object.values(Gender).map((gender) => capitalize(gender))}
          filterKey="gender"
          label="Gender"
        />
      );
    },
    cell: ({ row }) => capitalize(row.original.gender),
  },
  {
    accessorKey: "membershipPlan",
    header: () => {
      return (
        <CellHeader
          items={membershipPlans.map(({ label }) => label)}
          filterKey="membership_plan"
          label="Membership Plan"
        />
      );
    },
  },
  {
    accessorKey: "id",
    header: () => {
      return (
        <CellHeader
          items={["Asc", "Desc"]}
          filterKey="order_by"
          label="Status"
        />
      );
    },
    cell: ({ row }) => {
      const getMembershipStatus = ({
        startDate,
        endDate,
        hasRenews,
      }: {
        startDate: Date;
        endDate: Date;
        hasRenews: boolean;
      }) => {
        const difference = differenceInDays(endDate, new Date());

        const day = [0, -1, 1].includes(difference) ? "Day" : "Days";
        const leftOver = difference < 0 ? "Over" : "Left";

        const today = new Date();
        let status: (typeof statuses)[number];
        if (startDate > today && !hasRenews) {
          status = "Pending";
        } else if (difference >= 0) {
          status = "Active";
        } else if (difference > -30) {
          status = "Expire";
        } else {
          status = "Invalid";
        }

        return { difference: Math.abs(difference), day, leftOver, status };
      };

      const { startDate, endDate, renews } = row.original;

      const start = renews.length ? renews[0].startDate : startDate;
      const end = renews.length ? renews[0].endDate : endDate;

      const { difference, day, leftOver, status } = getMembershipStatus({
        startDate: start,
        endDate: end,
        hasRenews: !!renews.length,
      });

      return (
        <div className="flex flex-col items-center gap-1 text-center">
          <Badge
            className={cn(
              status === "Active" && "bg-green-500 hover:bg-green-500/80",
              status === "Expire" && "bg-destructive hover:bg-destructive/90",
              status === "Invalid" && "bg-neutral-900 hover:bg-neutral-900/80",
              "text-white",
            )}
          >
            {status}
          </Badge>
          {difference} {day} {leftOver}
        </div>
      );
    },
  },
  {
    accessorKey: "startDate",
    header: "Start Date",
    cell: ({ row }) => {
      const { startDate, renews } = row.original;
      const date = renews.length ? renews[0].startDate : startDate;
      return formatDate(date);
    },
  },
  {
    accessorKey: "endDate",
    header: "Expire Date",
    cell: ({ row }) => {
      const { endDate, renews } = row.original;
      const date = renews.length ? renews[0].endDate : endDate;
      return formatDate(date);
    },
  },
  {
    accessorKey: "id",
    header: "Action",
    cell: ({ row }) => {
      return <CellAction member={row.original} />;
    },
  },
];
