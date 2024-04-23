import { Member, Renew } from "@prisma/client";

export type MemberType = Member & {
  renews: Renew[];
};
