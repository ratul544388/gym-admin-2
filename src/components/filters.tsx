"use client";

import { Gender } from "@prisma/client";
import { DropdownMenu } from "./dropdown-menu";
import { SearchInput } from "./search-input";
import { Button } from "./ui/button";
import { useSearchParams } from "next/navigation";
import { ChevronDown } from "lucide-react";
import { capitalize } from "@/lib/utils";
import { useQueryString } from "@/hooks/use-query-string";
import { membershipPlans } from "@/constants";

interface FiltersProps {}

export const Filters = ({}: FiltersProps) => {
  const searchParams = useSearchParams();
  const gender = searchParams.get("gender");
  const membershipPlan = searchParams.get("membership_plan");

  // const { push } = useQueryString();

  // const handleClick = ({
  //   selectedValue,
  //   key,
  // }: {
  //   selectedValue: string;
  //   key: string;
  // }) => {
  //   if (selectedValue === searchParams.get(key)) {
  //     push({ query: { [key]: "" } });
  //   } else {
  //     push({ query: { [key]: selectedValue } });
  //   }
  // };

  // const genderTrigger = (
  //   <Button variant="secondary" className="text-muted-foreground">
  //     Gender
  //     <ChevronDown className="size-4" />
  //     {gender && (
  //       <span className="rounded-sm bg-background px-2 py-0.5 text-xs capitalize">
  //         {gender}
  //       </span>
  //     )}
  //   </Button>
  // );

  // const membershipPlanTrigger = (
  //   <Button variant="secondary" className="text-muted-foreground">
  //     Membership Plan
  //     <ChevronDown className="size-4" />
  //     {membershipPlan && (
  //       <span className="rounded-sm bg-background px-2 py-0.5 text-xs capitalize">
  //         {membershipPlan}
  //       </span>
  //     )}
  //   </Button>
  // );

  return (
    <section className="flex flex-wrap gap-3">
      <SearchInput />
      {/* <DropdownMenu
        items={Object.values(Gender).map((item) => ({
          label: capitalize(item),
          onClick: () =>
            handleClick({ selectedValue: item.toLowerCase(), key: "gender" }),
        }))}
        trigger={genderTrigger}
        value={gender}
      />
      <DropdownMenu
        items={membershipPlans.map(({ label }) => ({
          label: capitalize(label),
          onClick: () =>
            handleClick({
              selectedValue: label.toLowerCase(),
              key: "membership_plan",
            }),
        }))}
        value={membershipPlan}
        trigger={membershipPlanTrigger}
      /> */}
    </section>
  );
};
