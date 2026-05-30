"use client";

import { VibexHeader } from "@/components/vibex/VibexHeader";
import { useVibex } from "@/lib/vibex-context";
import { COUNTRY_INFO } from "@/lib/vibex-types";
import { Trophy, Flame, Target, Swords, Coins, Calendar, LogOut } from "lucide-react";
import Link from "next/link";

const ACHIEVEMENT_TIERS = [
  { name: "Rookie", minLevel: 1, icon: "🌱", color: "text-green-400" },
  { name: "Rising", minLevel: 5, icon: "⚡", color: "text-cyan-400" },
  { name: "Veteran", minLevel: 10, icon: "🔥", color: "text-orange-400" },
  { name: "Elite", minLevel: 15, icon: "💎", color: "text-purple-400" },
  { name: "Legend", minLevel: 20, icon: "👑", color: "text-yellow-400" },
];

export default function ProfilePage() {
  const { user, isLoggedIn, logout } = useVibex();

  if (!isLoggedIn || !user) {
    return (
      <>
        <VibexHeader />
        <div className="flex flex-col items-center justify-center p-8 pt-32 text-center">
          <div className="text-5xl mb-4">👤</div>
          <p className="mb-4 text-zinc-500">Sign up to create your profile</p>
          <Link href="/vibex/signup" className="rounded-full bg-gradient-to-r from-[#00f0ff] to-[#7b61ff] px-6 py-2.5 text-sm font-bold text-black">
            Get Started
          </Link>
        </div>
      </>
    );
  }

  const tier = [...ACHIEVEMENT_TIERS].reverse().find((t) => user.level >= t.minLevel) || ACHIEVEMENT_TIERS[0];
  const winRate = user.totalBets > 0 ? Math.round((user.wins / user.totalBets) * 100) : 0;
  const xpForNext = user.level * 500;
  const xpPct = Math.round((user.xp / xpForNext) * 100);

  return (
    <>
      <VibexHeader />
      <div className="p-4 space-y-5">
        {/* Profile hero */}
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-[#7b61ff]/15 via-[#00f0ff]/10 to-[#ff00e5]/15 border border-white/10 p-6">
          <div className="flex items-start gap-4">
            <div className="flex h-20 w-20 items-center justify-center rounded-2xl bg-gradient-to-br from-[#7b61ff] to-[#00f0ff] text-4xl shadow-[0_0_30px_rgba(123,97,255,0.3)]">
              {user.avatar}
            </div>
            <div className="flex-1">
              <div className="flex items-center gap-2">
                <h1 className="text-xl font-black">{user.displayName}</h1>
                <span>{COUNTRY_INFO[user.country].flag}</span>
              </div>
              <p className="text-sm text-zinc-500">@{user.username}</p>
              <div className="mt-2 flex items-center gap-2">
                <span className={`flex items-center gap-1 rounded-full bg-white/10 px-2.5 py-0.5 text-xs font-bold ${tier.color}`}>
                  {tier.icon} {tier.name}
                </span>
                <span className="text-xs text-zinc-500">Level {user.level}</span>
              </div>
            </div>
          </div>

          {/* XP bar */}
          <div className="mt-4">
            <div className="flex items-center justify-between mb-1">
              <span className="text-xs text-zinc-500">XP to Level {user.level + 1}</span>
              <span className="text-xs font-bold text-[#00f0ff]">{user.xp}/{xpForNext}</span>
            </div>
            <div className="h-2 rounded-full bg-white/10 overflow-hidden">
              <div
                className="h-full rounded-full bg-gradient-to-r from-[#00f0ff] to-[#7b61ff] transition-all"
                style={{ width: `${xpPct}%` }}
              />
            </div>
          </div>
        </div>

        {/* Stats grid */}
        <div className="grid grid-cols-2 gap-3">
          <div className="rounded-xl border border-white/10 bg-white/5 p-4">
            <div className="flex items-center gap-2 mb-2">
              <Coins size={16} className="text-yellow-400" />
              <span className="text-xs text-zinc-500">Balance</span>
            </div>
            <div className="text-lg font-black text-yellow-400">{user.coins.toLocaleString()}</div>
          </div>
          <div className="rounded-xl border border-white/10 bg-white/5 p-4">
            <div className="flex items-center gap-2 mb-2">
              <Flame size={16} className="text-orange-400" />
              <span className="text-xs text-zinc-500">Current Streak</span>
            </div>
            <div className="text-lg font-black text-orange-400">{user.streak} days</div>
          </div>
          <div className="rounded-xl border border-white/10 bg-white/5 p-4">
            <div className="flex items-center gap-2 mb-2">
              <Target size={16} className="text-green-400" />
              <span className="text-xs text-zinc-500">Win Rate</span>
            </div>
            <div className="text-lg font-black text-green-400">{winRate}%</div>
          </div>
          <div className="rounded-xl border border-white/10 bg-white/5 p-4">
            <div className="flex items-center gap-2 mb-2">
              <Swords size={16} className="text-[#ff00e5]" />
              <span className="text-xs text-zinc-500">Total Bets</span>
            </div>
            <div className="text-lg font-black">{user.totalBets}</div>
          </div>
        </div>

        {/* Record */}
        <div className="rounded-xl border border-white/10 bg-white/5 p-4">
          <h3 className="mb-3 text-sm font-bold text-zinc-400">Record</h3>
          <div className="flex items-center gap-4">
            <div className="flex-1 text-center">
              <div className="text-2xl font-black text-green-400">{user.wins}</div>
              <div className="text-xs text-zinc-500">Wins</div>
            </div>
            <div className="h-8 w-px bg-white/10" />
            <div className="flex-1 text-center">
              <div className="text-2xl font-black text-red-400">{user.losses}</div>
              <div className="text-xs text-zinc-500">Losses</div>
            </div>
            <div className="h-8 w-px bg-white/10" />
            <div className="flex-1 text-center">
              <div className="text-2xl font-black text-orange-400">{user.longestStreak}</div>
              <div className="text-xs text-zinc-500">Best Streak</div>
            </div>
          </div>
        </div>

        {/* Badges */}
        <div className="rounded-xl border border-white/10 bg-white/5 p-4">
          <h3 className="mb-3 text-sm font-bold text-zinc-400">Badges</h3>
          {user.badges.length > 0 ? (
            <div className="flex flex-wrap gap-2">
              {user.badges.map((badge) => (
                <div key={badge.id} className="flex items-center gap-1.5 rounded-full bg-white/10 border border-white/10 px-3 py-1.5">
                  <span className="text-lg">{badge.icon}</span>
                  <span className="text-xs font-semibold">{badge.name}</span>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-xs text-zinc-600">Play more to earn badges!</p>
          )}
        </div>

        {/* Quick links */}
        <div className="space-y-2">
          <Link href="/vibex/wallet" className="flex items-center gap-3 rounded-xl border border-white/5 bg-white/[0.02] p-3 hover:bg-white/[0.04] transition-all">
            <Coins size={18} className="text-yellow-400" />
            <span className="text-sm font-medium">Wallet & Transactions</span>
          </Link>
          <Link href="/vibex/leaderboard" className="flex items-center gap-3 rounded-xl border border-white/5 bg-white/[0.02] p-3 hover:bg-white/[0.04] transition-all">
            <Trophy size={18} className="text-yellow-400" />
            <span className="text-sm font-medium">Leaderboard</span>
          </Link>
        </div>

        {/* Member since */}
        <div className="flex items-center justify-between rounded-xl border border-white/5 bg-white/[0.02] p-3">
          <div className="flex items-center gap-2">
            <Calendar size={14} className="text-zinc-500" />
            <span className="text-xs text-zinc-500">
              Member since {new Date(user.joinedAt).toLocaleDateString(undefined, { month: "long", year: "numeric" })}
            </span>
          </div>
        </div>

        {/* Logout */}
        <button
          onClick={logout}
          className="flex w-full items-center justify-center gap-2 rounded-xl border border-red-500/20 bg-red-500/5 py-3 text-sm font-semibold text-red-400 transition-all hover:bg-red-500/10"
        >
          <LogOut size={16} />
          Log Out
        </button>
      </div>
    </>
  );
}
