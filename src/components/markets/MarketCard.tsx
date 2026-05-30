"use client";

import Link from "next/link";
import { Market } from "@/lib/types";
import { formatCurrency, formatNumber, cn } from "@/lib/utils";
import { categoryConfig } from "@/lib/mock-data";
import {
  TrendingUp,
  TrendingDown,
  Clock,
  BarChart2,
  Users,
} from "lucide-react";

interface MarketCardProps {
  market: Market;
  compact?: boolean;
}

export default function MarketCard({ market, compact }: MarketCardProps) {
  const config = categoryConfig[market.category];
  const priceChange =
    market.priceHistory.length > 1
      ? market.yesPrice -
        market.priceHistory[market.priceHistory.length - 2].yesPrice
      : 0;
  const isUp = priceChange >= 0;

  const expiresDate = new Date(market.expiresAt);
  const daysLeft = Math.ceil(
    (expiresDate.getTime() - Date.now()) / (1000 * 60 * 60 * 24)
  );

  if (compact) {
    return (
      <Link
        href={`/markets/${market.id}`}
        className="flex items-center justify-between rounded-lg border border-border bg-card p-3 hover:border-primary/30 hover:bg-card/80 transition-all"
      >
        <div className="min-w-0 flex-1">
          <p className="truncate text-sm font-medium">{market.title}</p>
          <div className="mt-1 flex items-center gap-2">
            <span
              className={cn(
                "rounded px-1.5 py-0.5 text-[10px] font-medium border",
                config.color
              )}
            >
              {config.label}
            </span>
            <span className="text-xs text-muted-foreground">
              Vol: {formatNumber(market.volume24h)}
            </span>
          </div>
        </div>
        <div className="ml-4 flex items-center gap-3">
          <div className="text-right">
            <p className="text-lg font-bold text-success">
              {market.yesPrice}¢
            </p>
            <p className="text-[10px] text-muted-foreground">YES</p>
          </div>
          <div className="text-right">
            <p className="text-lg font-bold text-danger">{market.noPrice}¢</p>
            <p className="text-[10px] text-muted-foreground">NO</p>
          </div>
        </div>
      </Link>
    );
  }

  return (
    <Link
      href={`/markets/${market.id}`}
      className="group flex flex-col rounded-xl border border-border bg-card overflow-hidden hover:border-primary/30 hover:shadow-lg hover:shadow-primary/5 transition-all duration-300"
    >
      <div className="p-5">
        <div className="flex items-start justify-between gap-3">
          <div className="min-w-0 flex-1">
            <div className="flex items-center gap-2 mb-2">
              <span
                className={cn(
                  "rounded-md px-2 py-0.5 text-xs font-medium border",
                  config.color
                )}
              >
                {config.label}
              </span>
              {market.status === "active" && (
                <span className="flex items-center gap-1 text-[10px] text-success">
                  <span className="h-1.5 w-1.5 rounded-full bg-success animate-pulse" />
                  Live
                </span>
              )}
            </div>
            <h3 className="text-base font-semibold leading-tight group-hover:text-primary transition-colors">
              {market.title}
            </h3>
          </div>
        </div>

        <p className="mt-2 text-xs text-muted-foreground line-clamp-2">
          {market.description}
        </p>

        <div className="mt-4 flex items-center gap-4">
          <div className="flex-1 rounded-lg bg-success/10 p-3 text-center">
            <p className="text-2xl font-bold text-success">
              {market.yesPrice}¢
            </p>
            <p className="text-xs text-success/70 mt-0.5">YES</p>
          </div>
          <div className="flex-1 rounded-lg bg-danger/10 p-3 text-center">
            <p className="text-2xl font-bold text-danger">{market.noPrice}¢</p>
            <p className="text-xs text-danger/70 mt-0.5">NO</p>
          </div>
        </div>
      </div>

      <div className="mt-auto flex items-center justify-between border-t border-border bg-muted/30 px-5 py-3">
        <div className="flex items-center gap-3 text-xs text-muted-foreground">
          <span className="flex items-center gap-1">
            <BarChart2 className="h-3 w-3" />
            {formatNumber(market.volume24h)}
          </span>
          <span className="flex items-center gap-1">
            <Users className="h-3 w-3" />
            {formatNumber(market.openInterest)}
          </span>
        </div>
        <div className="flex items-center gap-1.5">
          {isUp ? (
            <TrendingUp className="h-3 w-3 text-success" />
          ) : (
            <TrendingDown className="h-3 w-3 text-danger" />
          )}
          <span
            className={cn(
              "text-xs font-medium",
              isUp ? "text-success" : "text-danger"
            )}
          >
            {isUp ? "+" : ""}
            {priceChange.toFixed(1)}¢
          </span>
          <span className="mx-1 text-border">|</span>
          <Clock className="h-3 w-3 text-muted-foreground" />
          <span className="text-xs text-muted-foreground">
            {daysLeft > 0 ? `${daysLeft}d` : "Expired"}
          </span>
        </div>
      </div>
    </Link>
  );
}
