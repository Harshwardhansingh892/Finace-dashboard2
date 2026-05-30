"use client";

import { useVibex } from "@/lib/vibex-context";
import { CoinBadge } from "./CoinBadge";
import { StreakBadge } from "./StreakBadge";
import Link from "next/link";
import { LogIn } from "lucide-react";

export function VibexHeader() {
  const { user, isLoggedIn } = useVibex();

  return (
    <header className="sticky top-0 z-40 flex items-center justify-between border-b border-white/5 bg-[#0a0a0f]/90 px-4 py-3 backdrop-blur-xl">
      <Link href="/vibex" className="flex items-center gap-2">
        <div className="relative">
          <span className="text-2xl font-black tracking-tighter bg-gradient-to-r from-[#00f0ff] via-[#7b61ff] to-[#ff00e5] bg-clip-text text-transparent">
            VibeX
          </span>
          <div className="absolute -inset-1 -z-10 rounded-lg bg-gradient-to-r from-[#00f0ff]/20 via-[#7b61ff]/20 to-[#ff00e5]/20 blur-lg" />
        </div>
      </Link>
      <div className="flex items-center gap-2">
        {isLoggedIn ? (
          <>
            <StreakBadge />
            <CoinBadge />
            <Link href="/vibex/profile" className="flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-br from-[#7b61ff] to-[#00f0ff] text-lg">
              {user?.avatar}
            </Link>
          </>
        ) : (
          <Link
            href="/vibex/signup"
            className="flex items-center gap-1.5 rounded-full bg-gradient-to-r from-[#00f0ff] to-[#7b61ff] px-4 py-1.5 text-sm font-bold text-black transition-all hover:scale-105"
          >
            <LogIn size={14} />
            Join
          </Link>
        )}
      </div>
    </header>
  );
}
