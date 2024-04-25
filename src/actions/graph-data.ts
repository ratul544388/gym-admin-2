import db from "@/lib/db";
import { getMonth } from "date-fns";

const graphData = [
  { name: "Jan", total: 0 },
  { name: "Feb", total: 0 },
  { name: "Mar", total: 0 },
  { name: "Apr", total: 0 },
  { name: "May", total: 0 },
  { name: "Jun", total: 0 },
  { name: "Jul", total: 0 },
  { name: "Aug", total: 0 },
  { name: "Sep", total: 0 },
  { name: "Oct", total: 0 },
  { name: "Nov", total: 0 },
  { name: "Dec", total: 0 },
];

export const getGraphData = async () => {
  const members = await db.member.findMany({
    select: {
      revenue: true,
      createdAt: true,
    },
  });

  members.forEach((member) => {
    const month = getMonth(member.createdAt);
    graphData[month].total += member.revenue;
  }, 0);

  return graphData;
};
