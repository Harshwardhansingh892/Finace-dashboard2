"use client";

import MarketCard from "@/components/markets/MarketCard";
import { markets, categoryConfig } from "@/lib/mock-data";
import { formatNumber, formatCurrency } from "@/lib/utils";
import {
  TrendingUp,
  Users,
  BarChart2,
  Zap,
  ArrowRight,
  Trophy,
  Flame,
  Clock,
  Shield,
  Smartphone,
  Globe,
  Cpu,
} from "lucide-react";
import Link from "next/link";

const stats = [
  { label: "Total Markets", value: "2,400+", icon: BarChart2, color: "text-primary" },
  { label: "24h Volume", value: "₹42Cr", icon: TrendingUp, color: "text-success" },
  { label: "Active Traders", value: "1.2L", icon: Users, color: "text-purple-400" },
  { label: "Avg Resolution", value: "< 1hr", icon: Zap, color: "text-amber-400" },
];

const features = [
  {
    icon: Shield,
    title: "Aadhaar KYC",
    desc: "Instant verification via DigiLocker & Aadhaar. PAN-linked for compliance.",
  },
  {
    icon: Smartphone,
    title: "UPI Payments",
    desc: "Instant deposits via UPI, net banking, IMPS. Withdraw to bank in minutes.",
  },
  {
    icon: Globe,
    title: "Real-time Trading",
    desc: "Central Limit Order Book with microsecond matching. Live order book & charts.",
  },
  {
    icon: Cpu,
    title: "AI Insights",
    desc: "AI-powered market analysis, trend detection, and smart trading suggestions.",
  },
];

export default function HomePage() {
  const trendingMarkets = markets.slice(0, 3);
  const topVolume = [...markets].sort((a, b) => b.volume24h - a.volume24h).slice(0, 4);
  const categories = Object.entries(categoryConfig);

  return (
    <div className="space-y-0">
      {/* Hero */}
      <section className="relative overflow-hidden border-b border-border">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-background to-purple-500/5" />
        <div className="absolute top-20 left-1/4 h-64 w-64 rounded-full bg-primary/5 blur-3xl" />
        <div className="absolute bottom-10 right-1/4 h-48 w-48 rounded-full bg-purple-500/5 blur-3xl" />
        <div className="relative mx-auto max-w-6xl px-6 py-16">
          <div className="flex flex-col items-center text-center">
            <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/5 px-4 py-1.5">
              <Flame className="h-3.5 w-3.5 text-primary" />
              <span className="text-xs font-medium text-primary">
                India&apos;s First Prediction Market Exchange
              </span>
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight">
              Trade on{" "}
              <span className="gradient-text">What Happens Next</span>
            </h1>
            <p className="mt-4 max-w-2xl text-lg text-muted-foreground">
              Buy and sell contracts on real-world events. Cricket, NIFTY,
              elections, weather, movies — the crowd sets the price.
            </p>
            <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
              <Link
                href="/markets"
                className="inline-flex items-center gap-2 rounded-lg bg-primary px-6 py-3 text-sm font-semibold text-white hover:bg-primary/90 transition-colors shadow-lg shadow-primary/25"
              >
                Explore Markets
                <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                href="/signup"
                className="inline-flex items-center gap-2 rounded-lg border border-border px-6 py-3 text-sm font-semibold hover:bg-secondary transition-colors"
              >
                Create Account
              </Link>
            </div>
          </div>

          <div className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-4">
            {stats.map((stat) => (
              <div
                key={stat.label}
                className="rounded-xl border border-border bg-card/50 p-4 text-center"
              >
                <stat.icon className={`h-5 w-5 mx-auto mb-2 ${stat.color}`} />
                <p className="text-2xl font-bold">{stat.value}</p>
                <p className="text-xs text-muted-foreground">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Trending Markets */}
      <section className="mx-auto max-w-6xl px-6 py-12">
        <div className="mb-6 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Flame className="h-5 w-5 text-orange-400" />
            <h2 className="text-xl font-bold">Trending Markets</h2>
          </div>
          <Link
            href="/markets"
            className="flex items-center gap-1 text-sm text-primary hover:underline"
          >
            View All <ArrowRight className="h-3.5 w-3.5" />
          </Link>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {trendingMarkets.map((market) => (
            <MarketCard key={market.id} market={market} />
          ))}
        </div>
      </section>

      {/* Categories */}
      <section className="border-y border-border bg-card/30">
        <div className="mx-auto max-w-6xl px-6 py-12">
          <h2 className="text-xl font-bold mb-6">Browse by Category</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-7 gap-3">
            {categories.map(([key, config]) => (
              <Link
                key={key}
                href={`/markets?category=${key}`}
                className="flex flex-col items-center gap-2 rounded-xl border border-border bg-card p-4 hover:border-primary/30 hover:bg-card/80 transition-all"
              >
                <div className={`rounded-lg p-2 ${config.color}`}>
                  <BarChart2 className="h-5 w-5" />
                </div>
                <span className="text-xs font-medium">{config.label}</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Top Volume */}
      <section className="mx-auto max-w-6xl px-6 py-12">
        <div className="mb-6 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Trophy className="h-5 w-5 text-amber-400" />
            <h2 className="text-xl font-bold">Highest Volume</h2>
          </div>
          <Link
            href="/markets"
            className="flex items-center gap-1 text-sm text-primary hover:underline"
          >
            View All <ArrowRight className="h-3.5 w-3.5" />
          </Link>
        </div>
        <div className="space-y-3">
          {topVolume.map((market) => (
            <MarketCard key={market.id} market={market} compact />
          ))}
        </div>
      </section>

      {/* Features */}
      <section className="border-t border-border bg-card/30">
        <div className="mx-auto max-w-6xl px-6 py-12">
          <h2 className="text-xl font-bold mb-2">Built for India</h2>
          <p className="text-sm text-muted-foreground mb-8">
            Every feature designed for Indian users, regulations, and payment
            systems.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {features.map((feature) => (
              <div
                key={feature.title}
                className="rounded-xl border border-border bg-card p-5"
              >
                <feature.icon className="h-8 w-8 text-primary mb-3" />
                <h3 className="text-sm font-semibold mb-1">{feature.title}</h3>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  {feature.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border bg-card">
        <div className="mx-auto max-w-6xl px-6 py-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-primary">
                <BarChart2 className="h-4 w-4 text-white" />
              </div>
              <span className="text-sm font-bold">ProboX</span>
            </div>
            <p className="text-xs text-muted-foreground">
              Disclaimer: This is a demo/prototype. Real-money prediction markets require
              regulatory approval in India. Not for actual trading.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
