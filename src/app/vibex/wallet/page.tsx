"use client";

import { VibexHeader } from "@/components/vibex/VibexHeader";
import { useVibex } from "@/lib/vibex-context";
import { getMockTransactions } from "@/lib/vibex-data";
import { Wallet, TrendingUp, TrendingDown, ArrowUpRight, ArrowDownRight, Coins, Zap, Gift, Flame, Swords } from "lucide-react";
import Link from "next/link";

const TYPE_CONFIG = {
  win: { icon: TrendingUp, color: "text-green-400", bg: "bg-green-500/10" },
  loss: { icon: TrendingDown, color: "text-red-400", bg: "bg-red-500/10" },
  spin: { icon: Gift, color: "text-purple-400", bg: "bg-purple-500/10" },
  streak_bonus: { icon: Flame, color: "text-orange-400", bg: "bg-orange-500/10" },
  signup_bonus: { icon: Zap, color: "text-cyan-400", bg: "bg-cyan-500/10" },
  battle_win: { icon: Swords, color: "text-green-400", bg: "bg-green-500/10" },
  battle_loss: { icon: Swords, color: "text-red-400", bg: "bg-red-500/10" },
};

export default function WalletPage() {
  const { user, isLoggedIn, transactions } = useVibex();
  const allTx = transactions.length > 0 ? transactions : getMockTransactions();

  if (!isLoggedIn) {
    return (
      <>
        <VibexHeader />
        <div className="flex flex-col items-center justify-center p-8 pt-32 text-center">
          <Wallet size={48} className="mb-4 text-zinc-700" />
          <p className="mb-4 text-zinc-500">Sign up to get your coin wallet</p>
          <Link href="/vibex/signup" className="rounded-full bg-gradient-to-r from-[#00f0ff] to-[#7b61ff] px-6 py-2.5 text-sm font-bold text-black">
            Get Started
          </Link>
        </div>
      </>
    );
  }

  const totalWins = allTx.filter((t) => t.amount > 0).reduce((s, t) => s + t.amount, 0);
  const totalLosses = Math.abs(allTx.filter((t) => t.amount < 0).reduce((s, t) => s + t.amount, 0));

  return (
    <>
      <VibexHeader />
      <div className="p-4 space-y-5">
        {/* Balance card */}
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-[#7b61ff]/20 via-[#00f0ff]/10 to-[#ff00e5]/20 border border-white/10 p-6">
          <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGNpcmNsZSBjeD0iMjAiIGN5PSIyMCIgcj0iMSIgZmlsbD0icmdiYSgyNTUsMjU1LDI1NSwwLjAzKSIvPjwvc3ZnPg==')] opacity-50" />
          <div className="relative">
            <div className="flex items-center gap-2 mb-1">
              <Coins size={16} className="text-yellow-400" />
              <span className="text-xs font-semibold text-zinc-400 uppercase tracking-wider">Your Balance</span>
            </div>
            <div className="text-4xl font-black text-yellow-400">
              {user?.coins.toLocaleString()}
            </div>
            <div className="text-sm text-zinc-400">VibeCoins</div>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 gap-3">
          <div className="rounded-xl border border-green-500/20 bg-green-500/5 p-4">
            <div className="flex items-center gap-1.5 mb-1">
              <ArrowUpRight size={14} className="text-green-400" />
              <span className="text-xs text-zinc-500">Total Won</span>
            </div>
            <div className="text-lg font-bold text-green-400">+{totalWins.toLocaleString()}</div>
          </div>
          <div className="rounded-xl border border-red-500/20 bg-red-500/5 p-4">
            <div className="flex items-center gap-1.5 mb-1">
              <ArrowDownRight size={14} className="text-red-400" />
              <span className="text-xs text-zinc-500">Total Lost</span>
            </div>
            <div className="text-lg font-bold text-red-400">-{totalLosses.toLocaleString()}</div>
          </div>
        </div>

        {/* Transactions */}
        <div>
          <h2 className="mb-3 text-sm font-bold text-zinc-400 uppercase tracking-wider">Recent Activity</h2>
          <div className="space-y-2">
            {allTx.map((tx) => {
              const config = TYPE_CONFIG[tx.type];
              const Icon = config.icon;
              return (
                <div key={tx.id} className="flex items-center gap-3 rounded-xl border border-white/5 bg-white/[0.02] p-3">
                  <div className={`flex h-9 w-9 items-center justify-center rounded-xl ${config.bg}`}>
                    <Icon size={16} className={config.color} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="text-sm font-medium truncate">{tx.description}</div>
                    <div className="text-[10px] text-zinc-600">
                      {new Date(tx.timestamp).toLocaleDateString(undefined, { month: "short", day: "numeric", hour: "2-digit", minute: "2-digit" })}
                    </div>
                  </div>
                  <div className={`text-sm font-bold ${tx.amount >= 0 ? "text-green-400" : "text-red-400"}`}>
                    {tx.amount >= 0 ? "+" : ""}{tx.amount.toLocaleString()}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
}
