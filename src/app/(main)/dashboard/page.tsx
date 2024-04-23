import { getGraphData } from "@/actions/graph-data";
import { Overview } from "@/app/(main)/dashboard/_components/overview";
import { RecentAdmissions } from "@/app/(main)/dashboard/_components/recent-admissions";
import { Container } from "@/components/container";
import db from "@/lib/db";
import { calculateRevenue, formatPrice } from "@/lib/utils";
import { endOfDay, endOfMonth, startOfDay, startOfMonth } from "date-fns";
import {
  BarChart2,
  CalendarDays,
  CandlestickChart,
  Gem,
  Users2,
  WalletMinimal,
} from "lucide-react";
import { Suspense } from "react";

const dashboardData = async () => {
  const today = new Date();

  const todayJoinedMembersData = db.member.findMany({
    where: {
      OR: [
        {
          startDate: {
            gte: startOfDay(today),
            lte: endOfDay(today),
          },
        },
        {
          renews: {
            some: {
              startDate: {
                gte: startOfDay(today),
                lte: endOfDay(today),
              },
            },
          },
        },
      ],
    },
    select: {
      revenue: true,
      renews: {
        select: {
          revenue: true,
        },
      },
    },
  });

  const thisMonthJoinedMembersData = db.member.findMany({
    where: {
      OR: [
        {
          startDate: {
            gte: startOfMonth(today),
            lte: endOfMonth(today),
          },
        },
        {
          renews: {
            some: {
              startDate: {
                gte: startOfMonth(today),
                lte: endOfMonth(today),
              },
            },
          },
        },
      ],
    },
    select: {
      revenue: true,
      renews: {
        select: {
          revenue: true,
        },
      },
    },
  });

  const totalMembersData = db.member.findMany({
    select: {
      gender: true,
      revenue: true,
      renews: {
        select: {
          revenue: true,
        },
      },
    },
  });

  const todayRenewedMembersData = db.member.findMany({
    where: {
      renews: {
        some: {
          startDate: {
            gte: startOfDay(today),
            lte: endOfDay(today),
          },
        },
      },
    },
  });

  const graphData = getGraphData();

  const [
    todayJoinedMembers,
    thisMonthJoinedMembers,
    totalMembers,
    todayRenewedMembers,
    graphRevenue,
  ] = await Promise.all([
    todayJoinedMembersData,
    thisMonthJoinedMembersData,
    totalMembersData,
    todayRenewedMembersData,
    graphData,
  ]);

  return {
    todayJoinedMemberCount: todayJoinedMembers.length,
    todaysRevenue: calculateRevenue(todayJoinedMembers),
    thisMonthRevenue: calculateRevenue(thisMonthJoinedMembers),
    totalRevenue: calculateRevenue(totalMembers),
    totalMemberCount: totalMembers.length,
    todaysRenewCount: todayRenewedMembers.length,
    graphRevenue,

    totalMembers,
  };
};

const DashboardPage = async () => {
  const {
    thisMonthRevenue,
    todayJoinedMemberCount,
    todaysRenewCount,
    todaysRevenue,
    totalRevenue,
    totalMemberCount,
    graphRevenue,
    totalMembers,
  } = await dashboardData();

  const revenueCards = [
    {
      label: "Total Revenue",
      count: formatPrice(totalRevenue),
      icon: BarChart2,
    },
    {
      label: "This Month",
      count: formatPrice(thisMonthRevenue),
      icon: WalletMinimal,
    },
    {
      label: "Today's Revenue",
      count: formatPrice(todaysRevenue),
      icon: Gem,
    },
    {
      label: "Members",
      count: `${totalMemberCount}+`,
      icon: CandlestickChart,
    },
    {
      label: "Today Joined",
      count: `${todayJoinedMemberCount}+`,
      icon: Users2,
    },
    {
      label: "Today's Renewals",
      count: `${todaysRenewCount}+`,
      icon: CalendarDays,
    },
  ];

  return (
    <Container className="flex flex-col pt-2">
      <h1 className="text-3xl font-bold">Admin Dashboard</h1>
      <span className="mb-4 mt-3 block w-full border-[1.2px] border-dashed" />
      <section className="xs:grid-cols-2 grid gap-6 md:grid-cols-3 xl:grid-cols-4">
        {revenueCards.map(({ label, count, icon: Icon }, index) => (
          <div
            key={index}
            className="relative space-y-1 overflow-hidden rounded-lg border bg-background_2 p-4 shadow-xl"
          >
            <h4 className="font-semibold">{label}</h4>
            <h3 className="text-2xl font-bold text-primary">{count}</h3>
            <Icon className="absolute -right-10 -top-12 size-28 text-muted-foreground opacity-20" />
          </div>
        ))}
      </section>
      <Overview data={graphRevenue} />
      <Suspense fallback="Loading admissions...">
        <RecentAdmissions />
      </Suspense>
    </Container>
  );
};

export default DashboardPage;
