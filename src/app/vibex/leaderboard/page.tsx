"use client";

import { useState } from "react";
import { VibexHeader } from "@/components/vibex/VibexHeader";
import { useVibex } from "@/lib/vibex-context";
import { getLeaderboard } from "@/lib/vibex-data";
import { COUNTRY_INFO } from "@/lib/vibex-types";
import { Trophy, TrendingUp, TrendingDown, Minus, Crown, Medal, Flame } from "lucide-react";

const TABS = [
  { id: "global", label: "Global", icon: "🌍" },
  { id: "CU", label: "Cuba", icon: "🇨🇺" },
  { id: "CO", label: "Colombia", icon: "🇨🇴" },
  { id: "NG", label: "Nigeria", icon: "🇳🇬" },
  { id: "PH", label: "Philippines", icon: "🇵🇭" },
] as const;

export default function LeaderboardPage() {
  const { user } = useVibex();
  const [tab, setTab] = useState<string>(user?.country || "global");
  const entries = getLeaderboard(tab === "global" ? undefined : tab);

  return (
    <>
      <VibexHeader />
      <div className="p-4 space-y-4">
        <div className="flex items-center gap-2">
          <Trophy size={20} className="text-yellow-400" />
          <h1 className="text-xl font-black">Leaderboard</h1>
        </div>

        {/* Tabs */}
        <div className="flex gap-2 overflow-x-auto pb-1" style={{ scrollbarWidth: "none" }}>
          {TABS.map((t) => (
            <button
              key={t.id}
              onClick={() => setTab(t.id)}
              className={`flex-shrink-0 flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-semibold transition-all ${
                tab === t.id
                  ? "bg-yellow-500/20 border border-yellow-500/50 text-yellow-400"
                  : "bg-white/5 border border-white/10 text-zinc-400 hover:bg-white/10"
              }`}
            >
              <span>{t.icon}</span>
              <span>{t.label}</span>
            </button>
          ))}
        </div>

        {/* Top 3 podium */}
        {entries.length >= 3 && (
          <div className="flex items-end justify-center gap-3 pt-4 pb-2">
            {/* 2nd place */}
            <div className="flex flex-col items-center">
              <div className="mb-2 flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-br from-zinc-400/20 to-zinc-500/10 border-2 border-zinc-400/30 text-2xl">
                {entries[1].user.avatar}
              </div>
              <div className="rounded-t-xl bg-zinc-400/10 border border-zinc-400/20 border-b-0 px-4 pt-3 pb-1 text-center w-24">
                <Medal size={14} className="mx-auto text-zinc-400 mb-1" />
                <div className="text-xs font-bold truncate">{entries[1].user.displayName}</div>
                <div className="text-[10px] text-zinc-500">{entries[1].score.toLocaleString()}</div>
              </div>
              <div className="h-16 w-24 bg-zinc-400/5 border border-t-0 border-zinc-400/20 rounded-b-xl" />
            </div>

            {/* 1st place */}
            <div className="flex flex-col items-center -mt-4">
              <Crown size={24} className="mb-1 text-yellow-400 drop-shadow-[0_0_8px_rgba(234,179,8,0.5)]" />
              <div className="mb-2 flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br from-yellow-400/30 to-amber-500/10 border-2 border-yellow-400/50 text-3xl shadow-[0_0_20px_rgba(234,179,8,0.2)]">
                {entries[0].user.avatar}
              </div>
              <div className="rounded-t-xl bg-yellow-400/10 border border-yellow-400/30 border-b-0 px-4 pt-3 pb-1 text-center w-28">
                <div className="text-sm font-bold truncate">{entries[0].user.displayName}</div>
                <div className="text-xs text-yellow-400 font-bold">{entries[0].score.toLocaleString()}</div>
              </div>
              <div className="h-24 w-28 bg-yellow-400/5 border border-t-0 border-yellow-400/30 rounded-b-xl" />
            </div>

            {/* 3rd place */}
            <div className="flex flex-col items-center">
              <div className="mb-2 flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-br from-amber-700/20 to-amber-800/10 border-2 border-amber-700/30 text-2xl">
                {entries[2].user.avatar}
              </div>
              <div className="rounded-t-xl bg-amber-700/10 border border-amber-700/20 border-b-0 px-4 pt-3 pb-1 text-center w-24">
                <Medal size={14} className="mx-auto text-amber-700 mb-1" />
                <div className="text-xs font-bold truncate">{entries[2].user.displayName}</div>
                <div className="text-[10px] text-zinc-500">{entries[2].score.toLocaleString()}</div>
              </div>
              <div className="h-12 w-24 bg-amber-700/5 border border-t-0 border-amber-700/20 rounded-b-xl" />
            </div>
          </div>
        )}

        {/* Full list */}
        <div className="space-y-2">
          {entries.slice(3).map((entry) => (
            <div key={entry.user.id} className="flex items-center gap-3 rounded-xl border border-white/5 bg-white/[0.02] p-3 transition-all hover:bg-white/[0.04]">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-white/5 text-sm font-black text-zinc-500">
                {entry.rank}
              </div>
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-xl">
                {entry.user.avatar}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <span className="text-sm font-bold truncate">{entry.user.displayName}</span>
                  <span className="text-xs">{COUNTRY_INFO[entry.user.country].flag}</span>
                </div>
                <div className="flex items-center gap-2 text-[10px] text-zinc-500">
                  <span>Lv.{entry.user.level}</span>
                  <span>·</span>
                  <Flame size={10} className="text-orange-400" />
                  <span>{entry.user.streak}</span>
                </div>
              </div>
              <div className="text-right">
                <div className="text-sm font-bold text-yellow-400">{entry.score.toLocaleString()}</div>
                <div className="flex items-center justify-end gap-0.5 text-[10px]">
                  {entry.change > 0 ? (
                    <><TrendingUp size={10} className="text-green-400" /><span className="text-green-400">+{entry.change}</span></>
                  ) : entry.change < 0 ? (
                    <><TrendingDown size={10} className="text-red-400" /><span className="text-red-400">{entry.change}</span></>
                  ) : (
                    <><Minus size={10} className="text-zinc-600" /><span className="text-zinc-600">0</span></>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
