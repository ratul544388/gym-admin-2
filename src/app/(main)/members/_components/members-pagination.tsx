import { Pagination } from "@/components/pagination";
import db from "@/lib/db";

interface MembersPaginationProps {
  page: number;
  where: any;
  take: number;
}

export const MembersPagination = async ({
  page,
  where,
  take,
}: MembersPaginationProps) => {
  const members = await db.member.count({
    where,
  });

  const maxPages = Math.ceil(members / take);

  return <Pagination maxPages={maxPages} />;
};
