"use client";

import { useVibex } from "@/lib/vibex-context";
import { Coins } from "lucide-react";
import Link from "next/link";

export function CoinBadge() {
  const { user } = useVibex();
  if (!user) return null;

  return (
    <Link
      href="/vibex/wallet"
      className="flex items-center gap-1.5 rounded-full bg-gradient-to-r from-yellow-500/20 to-amber-500/20 border border-yellow-500/30 px-3 py-1.5 text-sm font-bold text-yellow-400 transition-all hover:scale-105 hover:shadow-[0_0_15px_rgba(234,179,8,0.3)]"
    >
      <Coins size={16} className="text-yellow-400" />
      <span>{user.coins.toLocaleString()}</span>
    </Link>
  );
}
