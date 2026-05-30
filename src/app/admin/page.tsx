"use client";

import { markets } from "@/lib/mock-data";
import { formatCurrency, formatNumber, cn } from "@/lib/utils";
import {
  Shield,
  Users,
  BarChart2,
  AlertTriangle,
  CheckCircle2,
  Clock,
  TrendingUp,
  FileText,
  Settings,
  Eye,
  Ban,
  Activity,
} from "lucide-react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
} from "recharts";

const revenueData = Array.from({ length: 14 }, (_, i) => ({
  day: `May ${i + 16}`,
  revenue: Math.floor(Math.random() * 500000) + 200000,
  users: Math.floor(Math.random() * 2000) + 500,
}));

const kycQueue = [
  { id: "KYC-001", name: "Rahul Sharma", status: "pending", submitted: "2 min ago" },
  { id: "KYC-002", name: "Priya Patel", status: "pending", submitted: "15 min ago" },
  { id: "KYC-003", name: "Amit Kumar", status: "review", submitted: "1 hr ago" },
  { id: "KYC-004", name: "Sneha Gupta", status: "pending", submitted: "2 hr ago" },
  { id: "KYC-005", name: "Vikram Singh", status: "flagged", submitted: "3 hr ago" },
];

const alerts = [
  {
    type: "fraud",
    message: "Unusual trading pattern detected for user ID U-4521",
    severity: "high",
    time: "5 min ago",
  },
  {
    type: "system",
    message: "Order matching latency spike: p99 = 12ms (threshold: 5ms)",
    severity: "medium",
    time: "18 min ago",
  },
  {
    type: "compliance",
    message: "3 users hit daily deposit limit (₹10L) - auto-blocked",
    severity: "low",
    time: "1 hr ago",
  },
];

export default function AdminPage() {
  const adminStats = [
    { label: "Total Users", value: "1.2L", change: "+2.4%", icon: Users, color: "text-primary" },
    { label: "24h Revenue", value: "₹12.4L", change: "+8.1%", icon: TrendingUp, color: "text-success" },
    { label: "Active Markets", value: markets.length.toString(), change: "+3", icon: BarChart2, color: "text-purple-400" },
    { label: "Open Alerts", value: "7", change: "-2", icon: AlertTriangle, color: "text-amber-400" },
  ];

  return (
    <div className="mx-auto max-w-6xl px-6 py-8">
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold flex items-center gap-2">
            <Shield className="h-6 w-6 text-primary" />
            Admin Dashboard
          </h1>
          <p className="mt-1 text-sm text-muted-foreground">
            Platform operations, compliance, and monitoring
          </p>
        </div>
        <button className="flex items-center gap-2 rounded-lg bg-secondary px-4 py-2 text-sm hover:bg-secondary/80 transition-colors">
          <Settings className="h-4 w-4" />
          Settings
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {adminStats.map((stat) => (
          <div key={stat.label} className="rounded-xl border border-border bg-card p-4">
            <div className="flex items-center justify-between mb-2">
              <stat.icon className={cn("h-5 w-5", stat.color)} />
              <span className="text-[10px] font-medium text-success">{stat.change}</span>
            </div>
            <p className="text-xl font-bold">{stat.value}</p>
            <p className="text-xs text-muted-foreground">{stat.label}</p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        {/* Revenue Chart */}
        <div className="rounded-xl border border-border bg-card p-5">
          <h3 className="text-sm font-semibold mb-4">Revenue (14 days)</h3>
          <ResponsiveContainer width="100%" height={220}>
            <BarChart data={revenueData}>
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
                tickFormatter={(v) => `₹${(v / 100000).toFixed(0)}L`}
              />
              <Tooltip
                contentStyle={{
                  backgroundColor: "#111113",
                  border: "1px solid #27272a",
                  borderRadius: "8px",
                  fontSize: "12px",
                }}
                formatter={(value) => [formatCurrency(Number(value)), "Revenue"]}
              />
              <Bar dataKey="revenue" fill="#6366f1" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* User Signups */}
        <div className="rounded-xl border border-border bg-card p-5">
          <h3 className="text-sm font-semibold mb-4">User Signups (14 days)</h3>
          <ResponsiveContainer width="100%" height={220}>
            <AreaChart data={revenueData}>
              <defs>
                <linearGradient id="userGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#a855f7" stopOpacity={0.3} />
                  <stop offset="100%" stopColor="#a855f7" stopOpacity={0} />
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
              />
              <Tooltip
                contentStyle={{
                  backgroundColor: "#111113",
                  border: "1px solid #27272a",
                  borderRadius: "8px",
                  fontSize: "12px",
                }}
              />
              <Area
                type="monotone"
                dataKey="users"
                stroke="#a855f7"
                strokeWidth={2}
                fill="url(#userGradient)"
                dot={false}
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* KYC Queue */}
        <div className="rounded-xl border border-border bg-card">
          <div className="border-b border-border px-5 py-4 flex items-center justify-between">
            <h3 className="text-sm font-semibold flex items-center gap-2">
              <FileText className="h-4 w-4" />
              KYC Review Queue
            </h3>
            <span className="text-xs text-muted-foreground">
              {kycQueue.length} pending
            </span>
          </div>
          <div className="divide-y divide-border">
            {kycQueue.map((item) => (
              <div
                key={item.id}
                className="flex items-center justify-between px-5 py-3 hover:bg-secondary/20 transition-colors"
              >
                <div className="flex items-center gap-3">
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-secondary text-xs font-bold">
                    {item.name[0]}
                  </div>
                  <div>
                    <p className="text-sm font-medium">{item.name}</p>
                    <p className="text-[10px] text-muted-foreground">
                      {item.id} • {item.submitted}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <span
                    className={cn(
                      "rounded px-2 py-0.5 text-[10px] font-medium",
                      item.status === "pending"
                        ? "bg-amber-500/10 text-amber-400"
                        : item.status === "flagged"
                          ? "bg-danger/10 text-danger"
                          : "bg-primary/10 text-primary"
                    )}
                  >
                    {item.status}
                  </span>
                  <button className="rounded p-1.5 text-muted-foreground hover:bg-secondary hover:text-foreground transition-colors">
                    <Eye className="h-3.5 w-3.5" />
                  </button>
                  <button className="rounded p-1.5 text-muted-foreground hover:bg-success/10 hover:text-success transition-colors">
                    <CheckCircle2 className="h-3.5 w-3.5" />
                  </button>
                  <button className="rounded p-1.5 text-muted-foreground hover:bg-danger/10 hover:text-danger transition-colors">
                    <Ban className="h-3.5 w-3.5" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Alerts */}
        <div className="rounded-xl border border-border bg-card">
          <div className="border-b border-border px-5 py-4 flex items-center justify-between">
            <h3 className="text-sm font-semibold flex items-center gap-2">
              <AlertTriangle className="h-4 w-4 text-amber-400" />
              System Alerts
            </h3>
            <button className="text-xs text-primary hover:underline">
              View All
            </button>
          </div>
          <div className="divide-y divide-border">
            {alerts.map((alert, i) => (
              <div
                key={i}
                className="px-5 py-3 hover:bg-secondary/20 transition-colors"
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-start gap-2">
                    <div
                      className={cn(
                        "mt-0.5 h-2 w-2 rounded-full shrink-0",
                        alert.severity === "high"
                          ? "bg-danger"
                          : alert.severity === "medium"
                            ? "bg-amber-400"
                            : "bg-blue-400"
                      )}
                    />
                    <div>
                      <p className="text-sm">{alert.message}</p>
                      <div className="mt-1 flex items-center gap-2">
                        <span className="text-[10px] text-muted-foreground">
                          {alert.time}
                        </span>
                        <span
                          className={cn(
                            "rounded px-1.5 py-0.5 text-[10px] font-medium",
                            alert.type === "fraud"
                              ? "bg-danger/10 text-danger"
                              : alert.type === "system"
                                ? "bg-amber-500/10 text-amber-400"
                                : "bg-blue-500/10 text-blue-400"
                          )}
                        >
                          {alert.type}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Quick System Status */}
          <div className="border-t border-border p-5">
            <h4 className="text-xs font-semibold mb-3">System Status</h4>
            <div className="space-y-2">
              {[
                { name: "Matching Engine", status: "operational", latency: "0.8ms" },
                { name: "Payment Gateway", status: "operational", latency: "120ms" },
                { name: "KYC Service", status: "degraded", latency: "2.4s" },
                { name: "WebSocket Server", status: "operational", latency: "5ms" },
              ].map((service) => (
                <div key={service.name} className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div
                      className={cn(
                        "h-1.5 w-1.5 rounded-full",
                        service.status === "operational"
                          ? "bg-success"
                          : "bg-amber-400 animate-pulse"
                      )}
                    />
                    <span className="text-xs">{service.name}</span>
                  </div>
                  <span className="text-[10px] font-mono text-muted-foreground">
                    {service.latency}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
