"use client";

import { cn } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";

interface LogoProps {
  className?: string;
}

export const Logo = ({ className }: LogoProps) => {
  return (
    <Link href="/dashboard" className={cn("flex", className)}>
      <Image src="logo.svg" width={125} height={40} alt="Logo" />
    </Link>
  );
};
