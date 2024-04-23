"use client";

import { cn } from "@/lib/utils";
import Image from "next/image";

interface PhotoProps {
  src: string;
  alt?: string;
  className?: string;
}

export const Photo = ({ src, alt = "Image", className }: PhotoProps) => {
  return (
    <div
      className={cn(
        "relative size-9 overflow-hidden rounded-full bg-white/5",
        className,
      )}
    >
      <Image src={src} alt={alt} fill className="object-cover" />
    </div>
  );
};
