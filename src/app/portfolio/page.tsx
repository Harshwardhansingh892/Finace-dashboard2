"use client";

import { positions } from "@/lib/mock-data";
import { formatCurrency, formatPercentage, cn } from "@/lib/utils";
import {
  TrendingUp,
  TrendingDown,
  Briefcase,
  BarChart2,
  PieChart,
  Activity,
  ArrowUpRight,
  ArrowDownRight,
} from "lucide-react";
import Link from "next/link";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  PieChart as RechartsPie,
  Pie,
  Cell,
} from "recharts";

const performanceData = Array.from({ length: 30 }, (_, i) => ({
  day: `Day ${i + 1}`,
  value: 200000 + Math.random() * 50000 + i * 1500,
}));

const categoryAllocation = [
  { name: "Sports", value: 35, color: "#22c55e" },
  { name: "Finance", value: 40, color: "#6366f1" },
  { name: "Politics", value: 15, color: "#a855f7" },
  { name: "Science", value: 10, color: "#f59e0b" },
];

export default function PortfolioPage() {
  const totalPnl = positions.reduce((sum, p) => sum + p.pnl, 0);
  const totalValue = positions.reduce(
    (sum, p) => sum + (p.currentPrice * p.quantity) / 100,
    0
  );
  const totalCost = positions.reduce(
    (sum, p) => sum + (p.avgPrice * p.quantity) / 100,
    0
  );
  const overallPnlPercent = totalCost > 0 ? (totalPnl / totalCost) * 100 : 0;

  const statsCards = [
    {
      label: "Portfolio Value",
      value: formatCurrency(totalValue),
      icon: Briefcase,
      color: "text-primary",
    },
    {
      label: "Total P&L",
      value: formatCurrency(totalPnl),
      icon: totalPnl >= 0 ? TrendingUp : TrendingDown,
      color: totalPnl >= 0 ? "text-success" : "text-danger",
      subtitle: formatPercentage(overallPnlPercent),
    },
    {
      label: "Active Positions",
      value: positions.length.toString(),
      icon: Activity,
      color: "text-purple-400",
    },
    {
      label: "Win Rate",
      value: "68%",
      icon: BarChart2,
      color: "text-amber-400",
    },
  ];

  return (
    <div className="mx-auto max-w-6xl px-6 py-8">
      <div className="mb-8">
        <h1 className="text-2xl font-bold">Portfolio</h1>
        <p className="mt-1 text-sm text-muted-foreground">
          Track your positions, performance, and analytics
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {statsCards.map((card) => (
          <div
            key={card.label}
            className="rounded-xl border border-border bg-card p-4"
          >
            <div className="flex items-center justify-between mb-2">
              <card.icon className={cn("h-5 w-5", card.color)} />
              {card.subtitle && (
                <span
                  className={cn(
                    "text-xs font-medium px-1.5 py-0.5 rounded",
                    totalPnl >= 0
                      ? "bg-success/10 text-success"
                      : "bg-danger/10 text-danger"
                  )}
                >
                  {card.subtitle}
                </span>
              )}
            </div>
            <p className="text-xl font-bold">{card.value}</p>
            <p className="text-xs text-muted-foreground">{card.label}</p>
          </div>
        ))}
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        {/* Performance Chart */}
        <div className="lg:col-span-2 rounded-xl border border-border bg-card p-5">
          <h3 className="text-sm font-semibold mb-4">Portfolio Performance</h3>
          <ResponsiveContainer width="100%" height={250}>
            <AreaChart data={performanceData}>
              <defs>
                <linearGradient id="perfGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#22c55e" stopOpacity={0.3} />
                  <stop offset="100%" stopColor="#22c55e" stopOpacity={0} />
                </linearGradient>
              </defs>
              <XAxis
                dataKey="day"
                tick={{ fill: "#71717a", fontSize: 10 }}
                axisLine={{ stroke: "#27272a" }}
                tickLine={false}
              />
              <YAxis
                tick={{ fill: "#71717a", fontSize: 10 }}
                axisLine={{ stroke: "#27272a" }}
                tickLine={false}
                tickFormatter={(v) => `₹${(v / 1000).toFixed(0)}K`}
              />
              <Tooltip
                contentStyle={{
                  backgroundColor: "#111113",
                  border: "1px solid #27272a",
                  borderRadius: "8px",
                  fontSize: "12px",
                }}
                formatter={(value) => [formatCurrency(Number(value)), "Value"]}
              />
              <Area
                type="monotone"
                dataKey="value"
                stroke="#22c55e"
                strokeWidth={2}
                fill="url(#perfGradient)"
                dot={false}
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        {/* Category Allocation */}
        <div className="rounded-xl border border-border bg-card p-5">
          <h3 className="text-sm font-semibold mb-4">Category Allocation</h3>
          <ResponsiveContainer width="100%" height={160}>
            <RechartsPie>
              <Pie
                data={categoryAllocation}
                cx="50%"
                cy="50%"
                innerRadius={45}
                outerRadius={70}
                paddingAngle={4}
                dataKey="value"
              >
                {categoryAllocation.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
            </RechartsPie>
          </ResponsiveContainer>
          <div className="space-y-2 mt-2">
            {categoryAllocation.map((cat) => (
              <div key={cat.name} className="flex items-center justify-between text-xs">
                <div className="flex items-center gap-2">
                  <div
                    className="h-2.5 w-2.5 rounded-full"
                    style={{ backgroundColor: cat.color }}
                  />
                  <span className="text-muted-foreground">{cat.name}</span>
                </div>
                <span className="font-medium">{cat.value}%</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Positions Table */}
      <div className="rounded-xl border border-border bg-card">
        <div className="border-b border-border px-5 py-4 flex items-center justify-between">
          <h3 className="text-sm font-semibold">Active Positions</h3>
          <span className="text-xs text-muted-foreground">
            {positions.length} positions
          </span>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-border text-xs text-muted-foreground">
                <th className="px-5 py-3 text-left font-medium">Market</th>
                <th className="px-3 py-3 text-center font-medium">Side</th>
                <th className="px-3 py-3 text-right font-medium">Qty</th>
                <th className="px-3 py-3 text-right font-medium">Avg Price</th>
                <th className="px-3 py-3 text-right font-medium">Current</th>
                <th className="px-3 py-3 text-right font-medium">P&L</th>
                <th className="px-3 py-3 text-right font-medium">Action</th>
              </tr>
            </thead>
            <tbody>
              {positions.map((pos) => (
                <tr
                  key={pos.id}
                  className="border-b border-border last:border-0 hover:bg-secondary/30 transition-colors"
                >
                  <td className="px-5 py-3">
                    <Link
                      href={`/markets/${pos.marketId}`}
                      className="text-sm font-medium hover:text-primary transition-colors max-w-[300px] truncate block"
                    >
                      {pos.marketTitle}
                    </Link>
                  </td>
                  <td className="px-3 py-3 text-center">
                    <span
                      className={cn(
                        "rounded-md px-2 py-0.5 text-xs font-bold",
                        pos.side === "yes"
                          ? "bg-success/10 text-success"
                          : "bg-danger/10 text-danger"
                      )}
                    >
                      {pos.side.toUpperCase()}
                    </span>
                  </td>
                  <td className="px-3 py-3 text-right text-sm font-mono">
                    {pos.quantity}
                  </td>
                  <td className="px-3 py-3 text-right text-sm font-mono">
                    {pos.avgPrice}¢
                  </td>
                  <td className="px-3 py-3 text-right text-sm font-mono">
                    {pos.currentPrice}¢
                  </td>
                  <td className="px-3 py-3 text-right">
                    <div className="flex items-center justify-end gap-1">
                      {pos.pnl >= 0 ? (
                        <ArrowUpRight className="h-3 w-3 text-success" />
                      ) : (
                        <ArrowDownRight className="h-3 w-3 text-danger" />
                      )}
                      <span
                        className={cn(
                          "text-sm font-mono font-medium",
                          pos.pnl >= 0 ? "text-success" : "text-danger"
                        )}
                      >
                        {formatCurrency(Math.abs(pos.pnl))}
                      </span>
                      <span
                        className={cn(
                          "text-[10px]",
                          pos.pnl >= 0 ? "text-success" : "text-danger"
                        )}
                      >
                        ({formatPercentage(pos.pnlPercent)})
                      </span>
                    </div>
                  </td>
                  <td className="px-3 py-3 text-right">
                    <button className="rounded-md bg-secondary px-2.5 py-1 text-xs font-medium hover:bg-secondary/80 transition-colors">
                      Close
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
