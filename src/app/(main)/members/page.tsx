import { BreadCrumbs } from "@/components/bread-crumbs";
import { Container } from "@/components/container";
import { DataTable } from "@/components/data-table";
import { columns } from "@/components/data-table/columns";
import { Pagination } from "@/components/pagination";
import { ResetFilterButton } from "@/components/reset-filter-button";
import { SearchInput } from "@/components/search-input";
import { Separator } from "@/components/ui/separator";
import db from "@/lib/db";
import { Gender, Prisma } from "@prisma/client";
import { Suspense } from "react";
import { AddNewButton } from "./_components/add-new-button";
import { _30DaysLessDate, statuses, today } from "@/constants";
import { subDays } from "date-fns";

type OrderBy = "asc" | "desc";

export async function generateMetadata() {
  return {
    title: "Members",
  };
}

const MembersPage = async ({
  searchParams,
}: {
  searchParams: Record<string, string | undefined>;
}) => {
  const page = Number(searchParams.page) || 1;
  const q = searchParams.q;
  const gender = searchParams.gender?.toUpperCase() as Gender;
  const membershipPlan = searchParams.membership_plan;
  const status = searchParams.status as (typeof statuses)[number]["value"];

  const take = 10;

  // @ts-ignore
  const where: Prisma.MemberWhereInput = {
    ...(q
      ? {
          OR: [
            {
              ...(!isNaN(parseInt(q)) ? { memberId: Number(q) } : {}),
            },
            {
              name: {
                contains: q,
                mode: "insensitive",
              },
            },
            {
              phone: {
                contains: q,
                mode: "insensitive",
              },
            },
          ],
        }
      : {}),
    ...(gender ? { gender } : {}),
    ...(membershipPlan
      ? { membershipPlan: { equals: membershipPlan, mode: "insensitive" } }
      : {}),
    ...(status
      ? {
          ...(status === "active"
            ? {
                startDate: {
                  lte: today,
                },
                endDate: {
                  gt: today,
                },
              }
            : status === "pending"
              ? {
                  startDate: {
                    gt: today,
                  },
                }
              : status === "expire"
                ? {
                    endDate: {
                      lt: today,
                      gt: subDays(today, 30),
                    },
                  }
                : status === "invalid"
                  ? {
                      endDate: {
                        lte: _30DaysLessDate,
                      },
                    }
                  : {}),
        }
      : {}),
  };

  const skip = (page - 1) * take;

  const membersData = db.member.findMany({
    where,
    orderBy: {
      createdAt: "asc",
    },
    take,
    skip,
  });

  const totalMemberCountData = db.member.count();

  const filteredMemberCountData = db.member.count({
    where,
  });

  const [members, totalMemberCount, filteredMemberCount] = await Promise.all([
    membersData,
    totalMemberCountData,
    filteredMemberCountData,
  ]);

  const maxPages = Math.ceil(filteredMemberCount / take);

  return (
    <Container className="flex w-full flex-col gap-4">
      <section className="flex w-full items-center justify-between">
        <BreadCrumbs
          items={[
            {
              label: "Dashbaord",
              href: "/dashboard",
            },
            {
              label: "Members",
            },
          ]}
        />
        <AddNewButton />
      </section>
      <Separator />
      <SearchInput searchParams={searchParams} />
      <Suspense fallback="Loading...">
        <div className="flex items-center gap-2 text-sm font-medium">
          <p>{filteredMemberCount}</p>
          <p className="font-normal text-muted-foreground">members of</p>{" "}
          <p>{totalMemberCount}</p>
        </div>
        <DataTable columns={columns} data={members} />
        <Pagination maxPages={maxPages} />
      </Suspense>
    </Container>
  );
};

export default MembersPage;
