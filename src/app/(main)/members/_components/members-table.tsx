import { DataTable } from "@/components/data-table";
import { columns } from "@/components/data-table/columns";
import db from "@/lib/db";
import { OrderBy } from "@/types";

export const MembersTable = async ({
  where,
  page,
  orderBy,
  take,
}: {
  where: any;
  page: number;
  orderBy: OrderBy
  take: number;
}) => {
  const skip = (page - 1) * take;

  const members = await db.member.findMany({
    include: {
      renews: {
        take: 1,
        orderBy: {
          createdAt: "desc",
        },
      },
    },
    where,
    orderBy: [{ ...(orderBy ? { endDate: orderBy } : { createdAt: "desc" }) }],
    take,
    skip,
  });

  return <DataTable columns={columns} data={members} />;
};
