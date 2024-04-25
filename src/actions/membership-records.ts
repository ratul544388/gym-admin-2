"use server";

import db from "@/lib/db";

export const getMembershipRecords = async (memberId: string) => {
  try {
    const records = await db.membershipRecord.findMany({
      where: {
        memberId,
      },
    });

    return { records };
  } catch (error) {
    console.log(error);
    return { error: "Error while fetching Membership records" };
  }
};
