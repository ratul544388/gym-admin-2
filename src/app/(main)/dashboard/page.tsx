import { Container } from "@/components/container";
import { BarChartSkeleton } from "@/components/skeletons/bar-chart-skeleton";
import { DashboardCardsSkeleton } from "@/components/skeletons/dashboard-cards-skeleton";
import { RecentAdmissionSkeleton } from "@/components/skeletons/recent-admission-skeleton";
import { Suspense } from "react";
import { BarChart } from "./_components/bar-chart";
import { Cards } from "./_components/cards";
import { RecentAdmissions } from "./_components/recent-admissions";

const DashboardPage = () => {
  return (
    <Container className="flex flex-col pt-2">
      <h1 className="text-3xl font-bold">Admin Dashboard</h1>
      <span className="mb-4 mt-3 block w-full border-[1.2px] border-dashed" />
      <Suspense fallback={<DashboardCardsSkeleton />}>
        <Cards />
      </Suspense>
      <Suspense fallback={<BarChartSkeleton />}>
        <BarChart />
      </Suspense>
      <Suspense fallback={<RecentAdmissionSkeleton />}>
        <RecentAdmissions />
      </Suspense>
    </Container>
  );
};

export default DashboardPage;
