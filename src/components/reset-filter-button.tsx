"use client";

import { useLoadingStore } from "@/hooks/use-loading-store";
import { cn } from "@/lib/utils";
import { X } from "lucide-react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { buttonVariants } from "./ui/button";

interface ResetFilterButtonProps {
  searchParams: { [key: string]: string | undefined };
}

export const ResetFilterButton = ({ searchParams }: ResetFilterButtonProps) => {
  const { setLoading } = useLoadingStore();
  const pathname = usePathname();
  const router = useRouter();
  const page = Number(searchParams.page);

  const handleClick = () => {
    if (pathname === "/members") return;
    setLoading(true);
    router.refresh();
  };

  return (
    <Link
      onClick={handleClick}
      href="/members"
      className={cn(
        buttonVariants({ variant: "secondary" }),
        "text-muted-foreground",
        !Object.keys(searchParams).length && "hidden",
      )}
    >
      Reset
      <X className="size-4" />
    </Link>
  );
};
