"use client";

import { membershipPlans, today } from "@/constants";
import {
  capitalize,
  cn,
  formatDate,
  formatPhone,
  getMemberStatus,
} from "@/lib/utils";
import { Gender, Member } from "@prisma/client";
import { ColumnDef } from "@tanstack/react-table";
import { Award, Gem, Shield } from "lucide-react";
import { BsGenderFemale, BsGenderMale } from "react-icons/bs";
import { Photo } from "../photo";
import { Badge } from "../ui/badge";
import { CellAction } from "./cell-action";
import { CellHeader } from "./cell-header";
import { StatusDropdownMenu } from "./status-dropdown-menu";

export const columns: ColumnDef<Member>[] = [
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
      return <StatusDropdownMenu />;
    },
    cell: ({ row }) => {
      const { startDate, endDate } = row.original;

      const isPending = startDate > today;

      const { status, message } = getMemberStatus({
        endDate,
        startDate,
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
      const { startDate } = row.original;
      return formatDate({date: startDate});
    },
  },
  {
    accessorKey: "endDate",
    header: "Expire Date",
    cell: ({ row }) => {
      const { endDate } = row.original;
      return formatDate({date: endDate});
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
