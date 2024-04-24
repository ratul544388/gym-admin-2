import { adminIds } from "@/middleware";
import { auth } from "@clerk/nextjs/server";

export async function isAdmin() {
  const { userId } = auth();
  return !!userId && adminIds.includes(userId as string);
}
