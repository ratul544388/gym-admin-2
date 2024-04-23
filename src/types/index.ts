import { Member, Renew } from "@prisma/client";

export type MemberType = Member & {
  renews: Renew[];
};

export type OrderBy = "asc" | "desc"
