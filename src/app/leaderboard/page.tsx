"use client";

import { leaderboard } from "@/lib/mock-data";
import { cn } from "@/lib/utils";
import {
  Trophy,
  Medal,
  TrendingUp,
  Target,
  Users,
  Crown,
} from "lucide-react";

export default function LeaderboardPage() {
  const top3 = leaderboard.slice(0, 3);
  const rest = leaderboard.slice(3);

  return (
    <div className="mx-auto max-w-5xl px-6 py-8">
      <div className="mb-8">
        <h1 className="text-2xl font-bold">Leaderboard</h1>
        <p className="mt-1 text-sm text-muted-foreground">
          Top predictors ranked by accuracy, ROI, and prediction score
        </p>
      </div>

      {/* Top 3 Podium */}
      <div className="mb-8 grid grid-cols-1 md:grid-cols-3 gap-4">
        {top3.map((user, i) => (
          <div
            key={user.id}
            className={cn(
              "relative rounded-xl border bg-card p-6 text-center transition-all",
              i === 0
                ? "border-amber-500/30 bg-gradient-to-b from-amber-500/5 to-transparent md:order-2 md:-mt-4"
                : i === 1
                  ? "border-gray-400/30 md:order-1"
                  : "border-amber-700/30 md:order-3"
            )}
          >
            <div className="absolute -top-3 left-1/2 -translate-x-1/2">
              {i === 0 ? (
                <Crown className="h-6 w-6 text-amber-400" />
              ) : (
                <Medal
                  className={cn(
                    "h-5 w-5",
                    i === 1 ? "text-gray-400" : "text-amber-700"
                  )}
                />
              )}
            </div>

            <div className="mx-auto mb-3 flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br from-primary to-purple-500 text-xl font-bold text-white">
              {user.username[0]}
            </div>

            <h3 className="text-base font-bold">{user.username}</h3>
            <p className="text-xs text-muted-foreground mt-1">{user.bio}</p>

            <div className="mt-4 grid grid-cols-3 gap-2">
              <div>
                <p className="text-lg font-bold text-success">
                  {user.winRate}%
                </p>
                <p className="text-[10px] text-muted-foreground">Win Rate</p>
              </div>
              <div>
                <p className="text-lg font-bold text-primary">
                  {user.roi}%
                </p>
                <p className="text-[10px] text-muted-foreground">ROI</p>
              </div>
              <div>
                <p className="text-lg font-bold text-amber-400">
                  {user.predictionScore}
                </p>
                <p className="text-[10px] text-muted-foreground">Score</p>
              </div>
            </div>

            <div className="mt-3 flex items-center justify-center gap-3 text-xs text-muted-foreground">
              <span>{user.totalTrades} trades</span>
              <span>|</span>
              <span>{(user.followers / 1000).toFixed(1)}K followers</span>
            </div>

            <button className="mt-4 w-full rounded-lg border border-primary/30 bg-primary/5 py-2 text-xs font-medium text-primary hover:bg-primary/10 transition-colors">
              Follow
            </button>
          </div>
        ))}
      </div>

      {/* Leaderboard Table */}
      <div className="rounded-xl border border-border bg-card">
        <div className="border-b border-border px-5 py-4">
          <h3 className="text-sm font-semibold">Full Rankings</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-border text-xs text-muted-foreground">
                <th className="px-5 py-3 text-left font-medium">Rank</th>
                <th className="px-3 py-3 text-left font-medium">Trader</th>
                <th className="px-3 py-3 text-right font-medium">Win Rate</th>
                <th className="px-3 py-3 text-right font-medium">ROI</th>
                <th className="px-3 py-3 text-right font-medium">Trades</th>
                <th className="px-3 py-3 text-right font-medium">Score</th>
                <th className="px-3 py-3 text-right font-medium">Followers</th>
              </tr>
            </thead>
            <tbody>
              {leaderboard.map((user) => (
                <tr
                  key={user.id}
                  className="border-b border-border last:border-0 hover:bg-secondary/30 transition-colors"
                >
                  <td className="px-5 py-3">
                    <span
                      className={cn(
                        "flex h-7 w-7 items-center justify-center rounded-full text-xs font-bold",
                        user.rank === 1
                          ? "bg-amber-500/10 text-amber-400"
                          : user.rank === 2
                            ? "bg-gray-400/10 text-gray-400"
                            : user.rank === 3
                              ? "bg-amber-700/10 text-amber-700"
                              : "bg-secondary text-muted-foreground"
                      )}
                    >
                      {user.rank}
                    </span>
                  </td>
                  <td className="px-3 py-3">
                    <div className="flex items-center gap-3">
                      <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-br from-primary to-purple-500 text-xs font-bold text-white">
                        {user.username[0]}
                      </div>
                      <div>
                        <p className="text-sm font-medium">{user.username}</p>
                        <p className="text-[10px] text-muted-foreground truncate max-w-[200px]">
                          {user.bio}
                        </p>
                      </div>
                    </div>
                  </td>
                  <td className="px-3 py-3 text-right">
                    <span className="text-sm font-mono text-success">
                      {user.winRate}%
                    </span>
                  </td>
                  <td className="px-3 py-3 text-right">
                    <span className="text-sm font-mono text-primary">
                      {user.roi}%
                    </span>
                  </td>
                  <td className="px-3 py-3 text-right text-sm font-mono text-muted-foreground">
                    {user.totalTrades.toLocaleString()}
                  </td>
                  <td className="px-3 py-3 text-right">
                    <span className="text-sm font-mono font-bold text-amber-400">
                      {user.predictionScore}
                    </span>
                  </td>
                  <td className="px-3 py-3 text-right text-sm text-muted-foreground">
                    {(user.followers / 1000).toFixed(1)}K
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
