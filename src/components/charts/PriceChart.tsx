"use client";

import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";
import { PricePoint } from "@/lib/types";
import { useState } from "react";
import { cn } from "@/lib/utils";

interface PriceChartProps {
  data: PricePoint[];
  height?: number;
}

const timeframes = ["1D", "1W", "1M", "3M", "All"];

export default function PriceChart({ data, height = 300 }: PriceChartProps) {
  const [activeTimeframe, setActiveTimeframe] = useState("1M");

  const filteredData = data.map((point) => ({
    ...point,
    time: new Date(point.time).toLocaleDateString("en-IN", {
      month: "short",
      day: "numeric",
    }),
  }));

  return (
    <div>
      <div className="mb-4 flex items-center gap-1">
        {timeframes.map((tf) => (
          <button
            key={tf}
            onClick={() => setActiveTimeframe(tf)}
            className={cn(
              "rounded-md px-3 py-1 text-xs font-medium transition-colors",
              activeTimeframe === tf
                ? "bg-primary text-white"
                : "text-muted-foreground hover:bg-secondary hover:text-foreground"
            )}
          >
            {tf}
          </button>
        ))}
      </div>
      <ResponsiveContainer width="100%" height={height}>
        <AreaChart data={filteredData}>
          <defs>
            <linearGradient id="yesGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#6366f1" stopOpacity={0.3} />
              <stop offset="100%" stopColor="#6366f1" stopOpacity={0} />
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" stroke="#27272a" />
          <XAxis
            dataKey="time"
            tick={{ fill: "#71717a", fontSize: 11 }}
            axisLine={{ stroke: "#27272a" }}
            tickLine={false}
          />
          <YAxis
            domain={[0, 100]}
            tick={{ fill: "#71717a", fontSize: 11 }}
            axisLine={{ stroke: "#27272a" }}
            tickLine={false}
            tickFormatter={(v) => `${v}¢`}
          />
          <Tooltip
            contentStyle={{
              backgroundColor: "#111113",
              border: "1px solid #27272a",
              borderRadius: "8px",
              fontSize: "12px",
            }}
            labelStyle={{ color: "#a1a1aa" }}
            formatter={(value) => [`${value}¢`, "YES Price"]}
          />
          <Area
            type="monotone"
            dataKey="yesPrice"
            stroke="#6366f1"
            strokeWidth={2}
            fill="url(#yesGradient)"
            dot={false}
            activeDot={{ r: 4, fill: "#6366f1", stroke: "#fff", strokeWidth: 2 }}
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}
