import { cn } from "@/lib/utils";

export const Loader = ({ className }: { className?: string }) => {
  return <span className={cn("loader", className)} />;
};
