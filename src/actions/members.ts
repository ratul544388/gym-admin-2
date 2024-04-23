"use server";

import { admissionFee } from "@/constants";
import db from "@/lib/db";
import { calculateRevenue, getMembershipPlanByLabel } from "@/lib/utils";
import { MemberSchema } from "@/validation";
import { Member } from "@prisma/client";
import { endOfDay, endOfMonth, startOfDay, startOfMonth } from "date-fns";
import { revalidatePath } from "next/cache";
import * as z from "zod";

export const createMember = async ({
  values,
  modifiedCost,
}: {
  values: z.infer<typeof MemberSchema>;
  modifiedCost?: number;
}) => {
  try {
    const validatedFields = MemberSchema.safeParse(values);
    if (!validatedFields.success) {
      return { error: "Invalid fields" };
    }

    const membershipPlan = getMembershipPlanByLabel(values.membershipPlan);

    const endDate = new Date(values.startDate);
    endDate.setMonth(endDate.getMonth() + membershipPlan.duration);

    const revenue =
      modifiedCost || modifiedCost === 0
        ? modifiedCost
        : admissionFee + membershipPlan.price;

    const memberId = await db.member.count() + 1;

    await db.member.create({
      data: {
        ...values,
        memberId,
        endDate,
        revenue,
      },
    });

    revalidatePath("/members");
    return { success: "Member added" };
  } catch (error) {
    console.error(error);
    return { error: "Something went wrong: ID or Phone might exist already" };
  }
};

export const updateMember = async ({
  values,
  memberId,
}: {
  values: z.infer<typeof MemberSchema>;
  memberId: string;
}) => {
  try {
    const validatedFields = MemberSchema.safeParse(values);
    if (!validatedFields.success) {
      return { error: "Invalid fields" };
    }

    const membershipPlan = getMembershipPlanByLabel(values.membershipPlan);

    const endDate = new Date(values.startDate);
    endDate.setMonth(endDate.getMonth() + membershipPlan.duration);

    await db.member.update({
      where: {
        id: memberId,
      },
      data: {
        ...values,
        endDate,
      },
    });

    revalidatePath("/members");
    return { success: "Member updated" };
  } catch (error) {
    console.error(error);
    return { error: "Something went wrong: ID or Phone might exist already" };
  }
};

export const deleteMember = async (memberId: string) => {
  try {
    await db.member.delete({
      where: {
        id: memberId,
      },
    });

    revalidatePath("/members");
    return { success: "Member Deleted" };
  } catch (error) {
    console.error(error);
    return { error: "Something went wrong: ID or Phone might exist already" };
  }
};

export const renewMember = async ({
  member,
  membershipPlan,
  cost,
  startDate,
}: {
  member: Member;
  membershipPlan: string;
  cost: number;
  startDate: Date;
}) => {
  try {
    const { label, duration } = getMembershipPlanByLabel(membershipPlan);

    const endDate = new Date(startDate);
    endDate.setMonth(endDate.getMonth() + duration);

    await db.member.update({
      where: {
        id: member.id,
      },
      data: {
        membershipPlan: label,
        renews: {
          create: {
            membershipPlan: label,
            startDate,
            endDate,
            revenue: cost,
          },
        },
      },
    });

    revalidatePath("/members");
    return { success: "Member Renewed" };
  } catch (error) {
    console.error(error);
    return { error: "Something went wrong: ID or Phone might exist already" };
  }
};

