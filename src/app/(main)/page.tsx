import { buttonVariants } from "@/components/ui/button";
import Link from "next/link";

const HomePage = () => {
  return (
    <div className="flex h-[calc(100vh_-_60px)] w-full items-center justify-center">
      <Link href="/dashboard" className={buttonVariants()}>
        Go to Admin Dashboard
      </Link>
    </div>
  );
};

export default HomePage;
