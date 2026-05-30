"use client";

import { useVibex } from "@/lib/vibex-context";
import { Flame } from "lucide-react";

export function StreakBadge() {
  const { user } = useVibex();
  if (!user || user.streak === 0) return null;

  return (
    <div className="flex items-center gap-1 rounded-full bg-gradient-to-r from-orange-500/20 to-red-500/20 border border-orange-500/30 px-2.5 py-1 text-sm font-bold text-orange-400">
      <Flame size={14} className="text-orange-400" />
      <span>{user.streak}</span>
    </div>
  );
}
