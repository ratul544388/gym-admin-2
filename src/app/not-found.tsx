import { buttonVariants } from "@/components/ui/button";
import { Container } from "@/components/container";
import { cn } from "@/lib/utils";
import Link from "next/link";

const NotFound = () => {
  return (
    <Container className="flex h-screen flex-col items-center justify-center pb-20 text-slate-100">
      <h1 className="bg-cover text-8xl font-extrabold">Opps!</h1>
      <h2 className="mt-6 text-xl font-bold">404 - PAGE NOT FOUND</h2>
      <p className="mt-3 text-center text-sm text-muted-foreground">
        We couldn&apos;t find the page you requested. It might be unavailable or
        the URL might be incorrect.
      </p>
      <Link
        href="/"
        className={cn(buttonVariants({ variant: "outline" }), "mt-5")}
      >
        GO TO HOMEPAGE
      </Link>
    </Container>
  );
};

export default NotFound;
