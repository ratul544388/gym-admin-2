import { BreadCrumbs } from "@/components/bread-crumbs";
import { Container } from "@/components/container";
import { DataTable } from "@/components/data-table";
import { columns } from "@/components/data-table/columns";
import { Pagination } from "@/components/pagination";
import { ResetFilterButton } from "@/components/reset-filter-button";
import { SearchInput } from "@/components/search-input";
import { Separator } from "@/components/ui/separator";
import db from "@/lib/db";
import { Gender } from "@prisma/client";
import { AddNewButton } from "./add-new-button";

type OrderBy = "asc" | "desc";

export async function generateMetadata() {
  return {
    title: "Members"
  }
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

  const take = 10;

  const skip = (page - 1) * take;

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

  const totalMembersData = db.member.count({
    where,
  });

  const membersData = db.member.findMany({
    include: {
      renews: {
        take: 1,
        orderBy: {
          createdAt: "desc",
        },
      },
    },
    where,
    orderBy: [
      { ...(orderBy ? { endDate: orderBy } : { createdAt: "desc" }) },
      { ...(q ? { id: "asc" } : {}) },
    ],
    take,
    skip,
  });

  const [members, totalMembers] = await Promise.all([
    membersData,
    totalMembersData,
  ]);

  const maxPages = Math.ceil(totalMembers / take);

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
      <DataTable columns={columns} data={members} />
      <Pagination maxPages={maxPages} />
    </Container>
  );
};

export default MembersPage;
