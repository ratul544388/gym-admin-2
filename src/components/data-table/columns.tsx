"use client";

import { membershipPlans } from "@/constants";
import {
  capitalize,
  cn,
  formatDate,
  formatPhone,
  getMemberStatus,
} from "@/lib/utils";
import { MemberType } from "@/types";
import { Gender } from "@prisma/client";
import { ColumnDef } from "@tanstack/react-table";
import { Photo } from "../photo";
import { Badge } from "../ui/badge";
import { CellAction } from "./cell-action";
import { CellHeader } from "./cell-header";
import {BsGenderFemale, BsGenderMale} from 'react-icons/bs'
import { ArrowDownNarrowWide, ArrowUpNarrowWide, Award, Gem, Shield } from "lucide-react";

export const columns: ColumnDef<MemberType>[] = [
  {
    accessorKey: "memberId",
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
          icons={[BsGenderMale, BsGenderFemale]}
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
          icons={[Shield, Award, Gem]}
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
          icons={[ArrowUpNarrowWide, ArrowDownNarrowWide]}
        />
      );
    },
    cell: ({ row }) => {
      const { startDate, endDate, renews } = row.original;

      const { status, message } = getMemberStatus({
        endDate: renews[0]?.endDate || endDate,
        startDate: startDate > new Date() ? startDate : undefined,
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
          {message}
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
