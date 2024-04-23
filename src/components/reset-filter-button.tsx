"use client";

import Link from "next/link";
import { buttonVariants } from "./ui/button";
import { cn } from "@/lib/utils";
import { X } from "lucide-react";
import { useLoadingStore } from "@/hooks/use-loading-store";
import { useRouter } from "next/navigation";

interface ResetFilterButtonProps {
  searchParams: { [key: string]: string | undefined };
}

export const ResetFilterButton = ({ searchParams }: ResetFilterButtonProps) => {
  const { setLoading } = useLoadingStore();
  const router = useRouter();
  const page = Number(searchParams.page);
  return (
    <Link
      onClick={() => {
        setLoading(true);
        router.refresh();
      }}
      href="/members"
      className={cn(
        buttonVariants({ variant: "secondary" }),
        "text-muted-foreground",
        (!Object.keys(searchParams).length || page === 1) && "hidden",
      )}
    >
      Reset
      <X className="size-4" />
    </Link>
  );
};
