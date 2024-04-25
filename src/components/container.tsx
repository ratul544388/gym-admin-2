import { cn } from "@/lib/utils";
import { ReactNode } from "react";

interface ContainerProps {
  children: ReactNode;
  className?: string;
  element?: "section" | "div";
}

export const Container = ({
  children,
  className,
  element = "div",
}: ContainerProps) => {
  const classNames = cn("mx-auto px-4 xs:px-6 w-full max-w-screen-2xl", className);
  return element === "section" ? (
    <section className={classNames}>{children}</section>
  ) : (
    <div className={classNames}>{children}</div>
  );
};