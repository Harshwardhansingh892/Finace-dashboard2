"use client";

import { use } from "react";
import { markets, categoryConfig } from "@/lib/mock-data";
import { formatNumber, formatCurrency } from "@/lib/utils";
import { cn } from "@/lib/utils";
import PriceChart from "@/components/charts/PriceChart";
import OrderBook from "@/components/trading/OrderBook";
import TradingPanel from "@/components/trading/TradingPanel";
import Link from "next/link";
import {
  ArrowLeft,
  BarChart2,
  Clock,
  ExternalLink,
  MessageSquare,
  Share2,
  Star,
  ThumbsUp,
  Users,
  Activity,
  TrendingUp,
} from "lucide-react";

export default function MarketDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);
  const market = markets.find((m) => m.id === id);

  if (!market) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center">
        <div className="text-center">
          <h2 className="text-xl font-bold">Market Not Found</h2>
          <p className="mt-2 text-sm text-muted-foreground">
            The market you&apos;re looking for doesn&apos;t exist.
          </p>
          <Link
            href="/markets"
            className="mt-4 inline-flex items-center gap-1 text-sm text-primary hover:underline"
          >
            <ArrowLeft className="h-3.5 w-3.5" />
            Back to Markets
          </Link>
        </div>
      </div>
    );
  }

  const config = categoryConfig[market.category];
  const expiresDate = new Date(market.expiresAt);
  const daysLeft = Math.ceil(
    (expiresDate.getTime() - Date.now()) / (1000 * 60 * 60 * 24)
  );

  return (
    <div className="mx-auto max-w-7xl px-6 py-6">
      {/* Breadcrumb */}
      <div className="mb-4 flex items-center gap-2 text-sm">
        <Link
          href="/markets"
          className="flex items-center gap-1 text-muted-foreground hover:text-foreground transition-colors"
        >
          <ArrowLeft className="h-3.5 w-3.5" />
          Markets
        </Link>
        <span className="text-muted-foreground">/</span>
        <span className={cn("rounded px-1.5 py-0.5 text-xs border", config.color)}>
          {config.label}
        </span>
      </div>

      {/* Title Section */}
      <div className="mb-6">
        <div className="flex items-start justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold">{market.title}</h1>
            <p className="mt-1 text-sm text-muted-foreground max-w-2xl">
              {market.description}
            </p>
          </div>
          <div className="flex items-center gap-2">
            <button className="rounded-lg p-2 text-muted-foreground hover:bg-secondary hover:text-foreground transition-colors">
              <Star className="h-4 w-4" />
            </button>
            <button className="rounded-lg p-2 text-muted-foreground hover:bg-secondary hover:text-foreground transition-colors">
              <Share2 className="h-4 w-4" />
            </button>
          </div>
        </div>

        {/* Key Stats Row */}
        <div className="mt-4 flex flex-wrap items-center gap-6">
          <div className="flex items-center gap-4">
            <div>
              <p className="text-3xl font-bold text-success">{market.yesPrice}¢</p>
              <p className="text-xs text-muted-foreground">YES Price</p>
            </div>
            <div>
              <p className="text-3xl font-bold text-danger">{market.noPrice}¢</p>
              <p className="text-xs text-muted-foreground">NO Price</p>
            </div>
          </div>
          <div className="h-10 w-px bg-border hidden md:block" />
          <div className="flex flex-wrap gap-4 text-xs text-muted-foreground">
            <span className="flex items-center gap-1">
              <BarChart2 className="h-3.5 w-3.5" />
              24h Vol: {formatCurrency(market.volume24h)}
            </span>
            <span className="flex items-center gap-1">
              <Activity className="h-3.5 w-3.5" />
              Total: {formatCurrency(market.totalVolume)}
            </span>
            <span className="flex items-center gap-1">
              <Users className="h-3.5 w-3.5" />
              OI: {formatNumber(market.openInterest)}
            </span>
            <span className="flex items-center gap-1">
              <Clock className="h-3.5 w-3.5" />
              {daysLeft > 0 ? `${daysLeft} days left` : "Expired"}
            </span>
          </div>
        </div>

        {/* Probability Bar */}
        <div className="mt-4">
          <div className="flex items-center justify-between text-xs mb-1">
            <span className="text-success font-medium">YES {market.yesPrice}%</span>
            <span className="text-danger font-medium">NO {market.noPrice}%</span>
          </div>
          <div className="h-2 rounded-full bg-danger/20 overflow-hidden">
            <div
              className="h-full rounded-full bg-gradient-to-r from-success to-success/80 transition-all"
              style={{ width: `${market.yesPrice}%` }}
            />
          </div>
        </div>
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column - Chart + Order Book + Comments */}
        <div className="lg:col-span-2 space-y-6">
          {/* Price Chart */}
          <div className="rounded-xl border border-border bg-card p-5">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-sm font-semibold flex items-center gap-2">
                <TrendingUp className="h-4 w-4 text-primary" />
                Price History
              </h3>
            </div>
            <PriceChart data={market.priceHistory} height={350} />
          </div>

          {/* Market Stats */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {[
              { label: "24h Volume", value: formatCurrency(market.volume24h) },
              { label: "Total Volume", value: formatCurrency(market.totalVolume) },
              { label: "Open Interest", value: formatNumber(market.openInterest) },
              { label: "Liquidity", value: formatCurrency(market.liquidity) },
            ].map((stat) => (
              <div
                key={stat.label}
                className="rounded-lg border border-border bg-card p-3"
              >
                <p className="text-xs text-muted-foreground">{stat.label}</p>
                <p className="text-sm font-bold mt-0.5">{stat.value}</p>
              </div>
            ))}
          </div>

          {/* Order Book */}
          <OrderBook entries={market.orderBook} />

          {/* Comments */}
          <div className="rounded-xl border border-border bg-card">
            <div className="border-b border-border px-4 py-3 flex items-center justify-between">
              <h3 className="text-sm font-semibold flex items-center gap-2">
                <MessageSquare className="h-4 w-4" />
                Discussion ({market.comments.length})
              </h3>
            </div>
            <div className="p-4 space-y-4">
              {market.comments.length > 0 ? (
                market.comments.map((comment) => (
                  <div key={comment.id} className="flex gap-3">
                    <div className="h-8 w-8 shrink-0 rounded-full bg-gradient-to-br from-primary to-purple-500 flex items-center justify-center text-xs font-bold text-white">
                      {comment.username[0]}
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-medium">
                          {comment.username}
                        </span>
                        <span className="text-[10px] text-muted-foreground">
                          {new Date(comment.createdAt).toLocaleDateString()}
                        </span>
                      </div>
                      <p className="mt-1 text-sm text-muted-foreground">
                        {comment.content}
                      </p>
                      <button className="mt-1 flex items-center gap-1 text-[10px] text-muted-foreground hover:text-foreground transition-colors">
                        <ThumbsUp className="h-3 w-3" />
                        {comment.likes}
                      </button>
                    </div>
                  </div>
                ))
              ) : (
                <p className="text-center text-sm text-muted-foreground py-4">
                  No comments yet. Be the first to share your analysis.
                </p>
              )}

              <div className="pt-2 border-t border-border">
                <textarea
                  placeholder="Share your analysis..."
                  rows={2}
                  className="w-full rounded-lg border border-border bg-secondary px-3 py-2 text-sm outline-none focus:border-primary transition-colors resize-none"
                />
                <div className="mt-2 flex justify-end">
                  <button className="rounded-lg bg-primary px-4 py-1.5 text-xs font-medium text-white hover:bg-primary/90 transition-colors">
                    Post Comment
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column - Trading Panel */}
        <div className="space-y-6">
          <TradingPanel
            yesPrice={market.yesPrice}
            noPrice={market.noPrice}
            marketTitle={market.title}
          />

          {/* Market Info */}
          <div className="rounded-xl border border-border bg-card p-4">
            <h3 className="text-sm font-semibold mb-3">Market Details</h3>
            <div className="space-y-2.5">
              {[
                { label: "Category", value: config.label },
                { label: "Status", value: market.status.toUpperCase() },
                {
                  label: "Created",
                  value: new Date(market.createdAt).toLocaleDateString("en-IN"),
                },
                {
                  label: "Expires",
                  value: expiresDate.toLocaleDateString("en-IN"),
                },
                { label: "Resolution", value: "Committee + Oracle" },
              ].map((item) => (
                <div
                  key={item.label}
                  className="flex justify-between text-xs"
                >
                  <span className="text-muted-foreground">{item.label}</span>
                  <span className="font-medium">{item.value}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Tags */}
          <div className="rounded-xl border border-border bg-card p-4">
            <h3 className="text-sm font-semibold mb-3">Tags</h3>
            <div className="flex flex-wrap gap-1.5">
              {market.tags.map((tag) => (
                <span
                  key={tag}
                  className="rounded-md bg-secondary px-2 py-1 text-xs text-muted-foreground"
                >
                  #{tag}
                </span>
              ))}
            </div>
          </div>

          {/* Related Markets */}
          <div className="rounded-xl border border-border bg-card p-4">
            <h3 className="text-sm font-semibold mb-3">Related Markets</h3>
            <div className="space-y-2">
              {markets
                .filter(
                  (m) =>
                    m.category === market.category && m.id !== market.id
                )
                .slice(0, 3)
                .map((m) => (
                  <Link
                    key={m.id}
                    href={`/markets/${m.id}`}
                    className="flex items-center justify-between rounded-lg p-2 hover:bg-secondary transition-colors"
                  >
                    <span className="text-xs truncate max-w-[180px]">
                      {m.title}
                    </span>
                    <span className="text-xs font-bold text-success ml-2">
                      {m.yesPrice}¢
                    </span>
                  </Link>
                ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
