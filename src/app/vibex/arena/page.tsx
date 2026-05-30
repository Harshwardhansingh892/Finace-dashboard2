"use client";

import { useState, useEffect } from "react";
import { VibexHeader } from "@/components/vibex/VibexHeader";
import { useVibex } from "@/lib/vibex-context";
import { FLASH_PREDICTIONS } from "@/lib/vibex-data";
import type { FlashPrediction } from "@/lib/vibex-types";
import { Zap, Users, Timer, TrendingUp } from "lucide-react";

const CATEGORIES = ["all", "sports", "music", "trending", "crypto", "entertainment", "politics"] as const;

function ArenaCard({ prediction }: { prediction: FlashPrediction }) {
  const { isLoggedIn, user, addCoins, removeCoins } = useVibex();
  const [picked, setPicked] = useState<"A" | "B" | null>(null);
  const [betAmount, setBetAmount] = useState(100);
  const [result, setResult] = useState<"win" | "lose" | null>(null);
  const total = prediction.poolA + prediction.poolB;
  const pctA = total > 0 ? Math.round((prediction.poolA / total) * 100) : 50;
  const pctB = 100 - pctA;

  const handleBet = (side: "A" | "B") => {
    if (!isLoggedIn || picked || !user || user.coins < betAmount) return;
    setPicked(side);
    const won = Math.random() > 0.45;
    setTimeout(() => {
      if (won) {
        const multiplier = side === "A" ? (100 / pctA) : (100 / pctB);
        const winnings = Math.round(betAmount * multiplier);
        addCoins(winnings, `Won: ${prediction.question}`, "win");
        setResult("win");
      } else {
        removeCoins(betAmount, `Lost: ${prediction.question}`, "loss");
        setResult("lose");
      }
    }, 2000);
  };

  const [timeLeftStr, setTimeLeftStr] = useState("");
  useEffect(() => {
    function calc() {
      const diff = new Date(prediction.expiresAt).getTime() - Date.now();
      if (diff <= 0) { setTimeLeftStr("Expired"); return; }
      const days = Math.floor(diff / 86400000);
      const hours = Math.floor((diff % 86400000) / 3600000);
      if (days > 0) { setTimeLeftStr(`${days}d ${hours}h`); return; }
      const mins = Math.floor((diff % 3600000) / 60000);
      setTimeLeftStr(`${hours}h ${mins}m`);
    }
    calc();
    const id = setInterval(calc, 60000);
    return () => clearInterval(id);
  }, [prediction.expiresAt]);

  return (
    <div className="rounded-2xl border border-white/10 bg-gradient-to-b from-white/[0.06] to-transparent p-5 transition-all hover:border-white/20">
      <div className="flex items-center justify-between mb-2">
        <span className="rounded-full bg-white/10 px-2.5 py-0.5 text-xs font-semibold capitalize text-zinc-300">
          {prediction.category}
        </span>
        <div className="flex items-center gap-3 text-xs text-zinc-500">
          <span className="flex items-center gap-1"><Users size={12} />{prediction.totalBets} bets</span>
          <span className="flex items-center gap-1"><Timer size={12} />{timeLeftStr}</span>
        </div>
      </div>
      <h3 className="mb-4 text-base font-bold leading-snug">{prediction.question}</h3>

      {/* Pool info */}
      <div className="mb-4 flex items-center gap-2">
        <div className="flex-1 text-center">
          <div className="text-xs text-zinc-500">Pool A</div>
          <div className="text-sm font-bold text-[#00f0ff]">{prediction.poolA.toLocaleString()}</div>
        </div>
        <div className="text-lg font-black text-zinc-600">vs</div>
        <div className="flex-1 text-center">
          <div className="text-xs text-zinc-500">Pool B</div>
          <div className="text-sm font-bold text-[#ff00e5]">{prediction.poolB.toLocaleString()}</div>
        </div>
      </div>

      {/* Bet amount selector */}
      {!picked && isLoggedIn && (
        <div className="mb-3 flex items-center gap-2">
          <span className="text-xs text-zinc-500">Bet:</span>
          {[50, 100, 250, 500].map((amt) => (
            <button
              key={amt}
              onClick={() => setBetAmount(amt)}
              className={`rounded-lg px-2.5 py-1 text-xs font-bold transition-all ${
                betAmount === amt
                  ? "bg-yellow-500/20 border border-yellow-500/50 text-yellow-400"
                  : "bg-white/5 border border-white/10 text-zinc-400 hover:bg-white/10"
              }`}
            >
              {amt}
            </button>
          ))}
        </div>
      )}

      <div className="grid grid-cols-2 gap-3">
        <button
          onClick={() => handleBet("A")}
          disabled={!!picked || !isLoggedIn}
          className={`rounded-xl border p-3 text-center transition-all ${
            picked === "A"
              ? result === "win"
                ? "border-green-500 bg-green-500/20 text-green-400 shadow-[0_0_20px_rgba(34,197,94,0.3)]"
                : result === "lose"
                  ? "border-red-500 bg-red-500/20 text-red-400"
                  : "border-[#00f0ff] bg-[#00f0ff]/20 text-[#00f0ff] animate-pulse"
              : picked === "B"
                ? "border-white/5 bg-white/5 text-zinc-600"
                : "border-[#00f0ff]/30 bg-[#00f0ff]/5 hover:bg-[#00f0ff]/15 hover:border-[#00f0ff]/50"
          }`}
        >
          <div className="text-sm font-bold">{prediction.optionA}</div>
          <div className="mt-1 text-xs text-zinc-400">{pctA}% · {(betAmount * 100 / pctA / 100).toFixed(1)}x</div>
        </button>
        <button
          onClick={() => handleBet("B")}
          disabled={!!picked || !isLoggedIn}
          className={`rounded-xl border p-3 text-center transition-all ${
            picked === "B"
              ? result === "win"
                ? "border-green-500 bg-green-500/20 text-green-400 shadow-[0_0_20px_rgba(34,197,94,0.3)]"
                : result === "lose"
                  ? "border-red-500 bg-red-500/20 text-red-400"
                  : "border-[#ff00e5] bg-[#ff00e5]/20 text-[#ff00e5] animate-pulse"
              : picked === "A"
                ? "border-white/5 bg-white/5 text-zinc-600"
                : "border-[#ff00e5]/30 bg-[#ff00e5]/5 hover:bg-[#ff00e5]/15 hover:border-[#ff00e5]/50"
          }`}
        >
          <div className="text-sm font-bold">{prediction.optionB}</div>
          <div className="mt-1 text-xs text-zinc-400">{pctB}% · {(betAmount * 100 / pctB / 100).toFixed(1)}x</div>
        </button>
      </div>

      {result && (
        <div className={`mt-3 text-center text-sm font-bold ${result === "win" ? "text-green-400" : "text-red-400"}`}>
          {result === "win" ? "🎉 You won!" : "💀 Better luck next time"}
        </div>
      )}
    </div>
  );
}

export default function ArenaPage() {
  const [category, setCategory] = useState<(typeof CATEGORIES)[number]>("all");
  const { user } = useVibex();

  const filtered = category === "all"
    ? FLASH_PREDICTIONS
    : FLASH_PREDICTIONS.filter((p) => p.category === category);

  const sorted = user
    ? [...filtered].sort((a, b) => {
        const aRelevant = a.countryTags.includes(user.country) ? 1 : 0;
        const bRelevant = b.countryTags.includes(user.country) ? 1 : 0;
        return bRelevant - aRelevant;
      })
    : filtered;

  return (
    <>
      <VibexHeader />
      <div className="p-4 space-y-4">
        <div className="flex items-center gap-2">
          <Zap size={20} className="text-[#00f0ff]" />
          <h1 className="text-xl font-black">Flash Arena</h1>
          <span className="ml-auto flex items-center gap-1 rounded-full bg-red-500/20 border border-red-500/30 px-2 py-0.5 text-xs font-bold text-red-400 animate-pulse">
            <span className="h-1.5 w-1.5 rounded-full bg-red-400" />
            {FLASH_PREDICTIONS.length} LIVE
          </span>
        </div>

        {/* Category filter */}
        <div className="flex gap-2 overflow-x-auto pb-1" style={{ scrollbarWidth: "none" }}>
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => setCategory(cat)}
              className={`flex-shrink-0 rounded-full px-3 py-1.5 text-xs font-semibold capitalize transition-all ${
                category === cat
                  ? "bg-[#00f0ff]/20 border border-[#00f0ff]/50 text-[#00f0ff]"
                  : "bg-white/5 border border-white/10 text-zinc-400 hover:bg-white/10"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Stats bar */}
        <div className="flex items-center gap-4 rounded-xl border border-white/10 bg-white/5 p-3">
          <div className="flex items-center gap-2">
            <TrendingUp size={14} className="text-green-400" />
            <span className="text-xs text-zinc-400">Total pool: <span className="font-bold text-white">{FLASH_PREDICTIONS.reduce((s, p) => s + p.poolA + p.poolB, 0).toLocaleString()}</span> coins</span>
          </div>
          <div className="flex items-center gap-2">
            <Users size={14} className="text-blue-400" />
            <span className="text-xs text-zinc-400"><span className="font-bold text-white">{FLASH_PREDICTIONS.reduce((s, p) => s + p.totalBets, 0).toLocaleString()}</span> total bets</span>
          </div>
        </div>

        <div className="space-y-3">
          {sorted.map((p) => (
            <ArenaCard key={p.id} prediction={p} />
          ))}
        </div>
      </div>
    </>
  );
}
