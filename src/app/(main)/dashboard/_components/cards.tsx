import { getGraphData } from "@/actions/graph-data";
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

export const Cards = async () => {
  const getCardData = async () => {
    const today = new Date();

    const todayJoinedMembersData = db.member.findMany({
      where: {
        membershipRecoreds: {
          some: {
            startDate: {
              gte: startOfDay(today),
              lte: endOfDay(today),
            },
          },
        },
      },
      select: {
        revenue: true,
      },
    });

    const thisMonthJoinedMembersData = db.member.findMany({
      where: {
        membershipRecoreds: {
          some: {
            startDate: {
              gte: startOfMonth(today),
              lte: endOfMonth(today),
            },
          },
        },
      },
      select: {
        revenue: true,
      },
    });

    const totalMembersData = db.member.findMany({
      select: {
        revenue: true,
      },
    });

    const todayRenewedMembersData = db.member.findMany({
      where: {
        membershipRecoreds: {
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
      todaysRevenue: calculateRevenue(
        todayJoinedMembers.map(({ revenue }) => revenue),
      ),
      thisMonthRevenue: calculateRevenue(
        thisMonthJoinedMembers.map(({ revenue }) => revenue),
      ),
      totalRevenue: calculateRevenue(
        totalMembers.map(({ revenue }) => revenue),
      ),
      totalMemberCount: totalMembers.length,
      todaysRenewCount: todayRenewedMembers.length,
      graphRevenue,
      totalMembers,
    };
  };

  const {
    thisMonthRevenue,
    todayJoinedMemberCount,
    todaysRenewCount,
    todaysRevenue,
    totalRevenue,
    totalMemberCount,
  } = await getCardData();

  const cards = [
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
    <section className="grid gap-6 xs:grid-cols-2 lg:grid-cols-3">
      {cards.map(({ label, count, icon: Icon }, index) => (
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
  );
};
