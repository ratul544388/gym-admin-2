import { BreadCrumbs } from "@/components/bread-crumbs";
import { Container } from "@/components/container";
import { ResetFilterButton } from "@/components/reset-filter-button";
import { SearchInput } from "@/components/search-input";
import { TableSkeleton } from "@/components/skeletons/table-skeleton";
import { Separator } from "@/components/ui/separator";
import { Gender } from "@prisma/client";
import { Suspense } from "react";
import { AddNewButton } from "./_components/add-new-button";
import { MembersTable } from "./_components/members-table";
import { MembersPagination } from "./_components/members-pagination";
import { PaginationSkeleton } from "@/components/skeletons/pagination-skeleton";

type OrderBy = "asc" | "desc";

export async function generateMetadata() {
  return {
    title: "Members",
  };
}

const MembersPage = async ({
  searchParams,
}: {
  searchParams: { [key: string]: string | undefined };
}) => {
  const page = Number(searchParams.page) || 1;
  const q = searchParams.q;
  const gender = searchParams.gender?.toUpperCase() as Gender;
  const membershipPlan = searchParams.membership_plan;
  const orderBy = searchParams.order_by as OrderBy;

  const TAKE = 1;

  const where: any = {
    ...(q
      ? {
          OR: [
            {
              ...(!isNaN(parseInt(q)) ? { id: Number(q) } : {}),
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
  };

  // const totalMembersData = db.member.count({
  //   where,
  // });

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
      <section className="flex items-center gap-3">
        <SearchInput />
        <ResetFilterButton searchParams={searchParams} />
      </section>
      <Suspense fallback={<TableSkeleton />}>
        <MembersTable orderBy={orderBy} page={page} where={where} take={TAKE} />
      </Suspense>
      <Suspense fallback={<PaginationSkeleton />}>
        <MembersPagination where={where} page={page} take={TAKE} />
      </Suspense>
    </Container>
  );
};

export default MembersPage;
