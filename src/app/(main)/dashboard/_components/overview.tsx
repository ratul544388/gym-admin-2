"use client";

import { primaryColor } from "@/constants";
import { formatPrice } from "@/lib/utils";
import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis } from "recharts";

export function Overview({
  data,
}: {
  data: { name: string; total: number }[];
}) {
  return (
    <div className="mt-12 w-full space-y-5 overflow-x-auto rounded-xl border bg-background_2 p-5 pl-0">
      <h3 className="ml-5 text-2xl font-semibold">Overview</h3>
      <ResponsiveContainer
        width="100%"
        minWidth={500}
        height={350}
        className=""
      >
        <BarChart data={data}>
          <XAxis
            dataKey="name"
            stroke={primaryColor}
            fontSize={12}
            tickLine={false}
            axisLine={false}
          />
          <YAxis
            stroke={primaryColor}
            fontSize={12}
            tickLine={false}
            axisLine={false}
            tickFormatter={(value) => formatPrice(parseInt(value))}
          />
          <Bar dataKey="total" fill={primaryColor} radius={[4, 4, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
