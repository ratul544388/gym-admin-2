import { Gender } from "@prisma/client";
import * as z from "zod";

export const MemberSchema = z.object({
  id: z.coerce.number().optional(),
  name: z.string().min(1, "Name is required"),
  phone: z
    .string()
    .optional()
    .refine(
      (value) =>
        (value?.length === 11 && value.startsWith("01")) ||
        (value?.length === 10 && value.startsWith("1")) ||
        !value?.length,
      "Please Enter a valid phone number",
    ),
  address: z.string().optional(),
  age: z.string().optional(),
  gender: z.nativeEnum(Gender, { required_error: "Gender is required" }),
  startDate: z.date({ required_error: "Date is required" }),
  membershipPlan: z.string({ required_error: "Membership Plan is required" }),
  image: z.string().optional(),
});
