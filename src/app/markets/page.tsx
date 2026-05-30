"use client";

import { useState, useMemo } from "react";
import MarketCard from "@/components/markets/MarketCard";
import { markets, categoryConfig } from "@/lib/mock-data";
import { MarketCategory } from "@/lib/types";
import { cn } from "@/lib/utils";
import {
  Search,
  SlidersHorizontal,
  LayoutGrid,
  List,
  TrendingUp,
  Clock,
  BarChart2,
  Flame,
} from "lucide-react";

type SortOption = "trending" | "volume" | "newest" | "ending-soon";
type ViewMode = "grid" | "list";

export default function MarketsPage() {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState<MarketCategory | "all">("all");
  const [sort, setSort] = useState<SortOption>("trending");
  const [view, setView] = useState<ViewMode>("grid");

  const filteredMarkets = useMemo(() => {
    let result = markets;

    if (category !== "all") {
      result = result.filter((m) => m.category === category);
    }

    if (search) {
      const q = search.toLowerCase();
      result = result.filter(
        (m) =>
          m.title.toLowerCase().includes(q) ||
          m.description.toLowerCase().includes(q) ||
          m.tags.some((t) => t.toLowerCase().includes(q))
      );
    }

    switch (sort) {
      case "volume":
        result = [...result].sort((a, b) => b.volume24h - a.volume24h);
        break;
      case "newest":
        result = [...result].sort(
          (a, b) =>
            new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        );
        break;
      case "ending-soon":
        result = [...result].sort(
          (a, b) =>
            new Date(a.expiresAt).getTime() - new Date(b.expiresAt).getTime()
        );
        break;
      default:
        result = [...result].sort((a, b) => b.volume24h - a.volume24h);
    }

    return result;
  }, [search, category, sort]);

  const sortOptions: { value: SortOption; label: string; icon: typeof TrendingUp }[] = [
    { value: "trending", label: "Trending", icon: Flame },
    { value: "volume", label: "Volume", icon: BarChart2 },
    { value: "newest", label: "Newest", icon: TrendingUp },
    { value: "ending-soon", label: "Ending Soon", icon: Clock },
  ];

  return (
    <div className="mx-auto max-w-6xl px-6 py-8">
      <div className="mb-8">
        <h1 className="text-2xl font-bold">Markets</h1>
        <p className="mt-1 text-sm text-muted-foreground">
          Browse and trade on {markets.length}+ event contracts
        </p>
      </div>

      {/* Search & Filters */}
      <div className="mb-6 space-y-4">
        <div className="flex items-center gap-3">
          <div className="flex flex-1 items-center gap-2 rounded-lg border border-border bg-card px-3 py-2.5">
            <Search className="h-4 w-4 text-muted-foreground" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search markets by name, tag, or keyword..."
              className="flex-1 bg-transparent text-sm outline-none placeholder:text-muted-foreground"
            />
          </div>
          <div className="flex items-center rounded-lg border border-border bg-card">
            <button
              onClick={() => setView("grid")}
              className={cn(
                "rounded-l-lg p-2.5 transition-colors",
                view === "grid"
                  ? "bg-secondary text-foreground"
                  : "text-muted-foreground hover:text-foreground"
              )}
            >
              <LayoutGrid className="h-4 w-4" />
            </button>
            <button
              onClick={() => setView("list")}
              className={cn(
                "rounded-r-lg p-2.5 transition-colors",
                view === "list"
                  ? "bg-secondary text-foreground"
                  : "text-muted-foreground hover:text-foreground"
              )}
            >
              <List className="h-4 w-4" />
            </button>
          </div>
        </div>

        {/* Category Tabs */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1">
          <button
            onClick={() => setCategory("all")}
            className={cn(
              "whitespace-nowrap rounded-lg px-3 py-1.5 text-sm font-medium transition-colors",
              category === "all"
                ? "bg-primary text-white"
                : "bg-secondary text-muted-foreground hover:text-foreground"
            )}
          >
            All Markets
          </button>
          {Object.entries(categoryConfig).map(([key, config]) => (
            <button
              key={key}
              onClick={() => setCategory(key as MarketCategory)}
              className={cn(
                "whitespace-nowrap rounded-lg px-3 py-1.5 text-sm font-medium transition-colors",
                category === key
                  ? "bg-primary text-white"
                  : "bg-secondary text-muted-foreground hover:text-foreground"
              )}
            >
              {config.label}
            </button>
          ))}
        </div>

        {/* Sort Options */}
        <div className="flex items-center gap-2">
          <SlidersHorizontal className="h-4 w-4 text-muted-foreground" />
          <span className="text-xs text-muted-foreground">Sort:</span>
          {sortOptions.map((option) => (
            <button
              key={option.value}
              onClick={() => setSort(option.value)}
              className={cn(
                "flex items-center gap-1 rounded-md px-2.5 py-1 text-xs font-medium transition-colors",
                sort === option.value
                  ? "bg-secondary text-foreground"
                  : "text-muted-foreground hover:text-foreground"
              )}
            >
              <option.icon className="h-3 w-3" />
              {option.label}
            </button>
          ))}
        </div>
      </div>

      {/* Markets Grid/List */}
      {filteredMarkets.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-20 text-center">
          <Search className="h-12 w-12 text-muted-foreground mb-4" />
          <h3 className="text-lg font-semibold">No markets found</h3>
          <p className="text-sm text-muted-foreground">
            Try adjusting your search or filter criteria
          </p>
        </div>
      ) : view === "grid" ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredMarkets.map((market) => (
            <MarketCard key={market.id} market={market} />
          ))}
        </div>
      ) : (
        <div className="space-y-3">
          {filteredMarkets.map((market) => (
            <MarketCard key={market.id} market={market} compact />
          ))}
        </div>
      )}
    </div>
  );
}
