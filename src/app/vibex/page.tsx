"use client";

import { useState } from "react";
import { VibexHeader } from "@/components/vibex/VibexHeader";
import { useVibex } from "@/lib/vibex-context";
import { FEED_POSTS, FLASH_PREDICTIONS, MOCK_REELS } from "@/lib/vibex-data";
import type { FeedPost, FlashPrediction } from "@/lib/vibex-types";
import { Flame, Zap, Swords, TrendingUp, Clock, ChevronRight, Play, Camera, Eye, Users } from "lucide-react";
import Link from "next/link";

function FlashCard({ prediction }: { prediction: FlashPrediction }) {
  const { isLoggedIn, user, addCoins, removeCoins } = useVibex();
  const [picked, setPicked] = useState<"A" | "B" | null>(null);
  const [betAmount] = useState(100);
  const total = prediction.poolA + prediction.poolB;
  const pctA = total > 0 ? Math.round((prediction.poolA / total) * 100) : 50;
  const pctB = 100 - pctA;

  const handlePick = (side: "A" | "B") => {
    if (!isLoggedIn || picked || !user) return;
    if (user.coins < betAmount) return;
    setPicked(side);
    const won = Math.random() > 0.45;
    if (won) {
      const winnings = Math.round(betAmount * (side === "A" ? (100 / pctA) : (100 / pctB)));
      setTimeout(() => addCoins(winnings, `Won: ${prediction.question}`, "win"), 1500);
    } else {
      setTimeout(() => removeCoins(betAmount, `Lost: ${prediction.question}`, "loss"), 1500);
    }
  };

  const categoryColors: Record<string, string> = {
    sports: "from-green-500/20 to-emerald-500/20 text-green-400 border-green-500/30",
    music: "from-pink-500/20 to-rose-500/20 text-pink-400 border-pink-500/30",
    trending: "from-yellow-500/20 to-amber-500/20 text-yellow-400 border-yellow-500/30",
    crypto: "from-cyan-500/20 to-blue-500/20 text-cyan-400 border-cyan-500/30",
    entertainment: "from-purple-500/20 to-violet-500/20 text-purple-400 border-purple-500/30",
    politics: "from-red-500/20 to-orange-500/20 text-red-400 border-red-500/30",
  };

  return (
    <div className="flex-shrink-0 w-72 rounded-2xl border border-white/10 bg-gradient-to-b from-white/5 to-transparent p-4 snap-start">
      <div className="flex items-center justify-between mb-3">
        <span className={`rounded-full border bg-gradient-to-r px-2.5 py-0.5 text-xs font-semibold ${categoryColors[prediction.category] || "text-zinc-400"}`}>
          {prediction.category}
        </span>
        <div className="flex items-center gap-1 text-xs text-zinc-500">
          <Users size={12} />
          <span>{prediction.totalBets}</span>
        </div>
      </div>
      <p className="mb-4 text-sm font-semibold leading-tight">{prediction.question}</p>
      <div className="space-y-2">
        <button
          onClick={() => handlePick("A")}
          disabled={!!picked || !isLoggedIn}
          className={`w-full rounded-xl border px-3 py-2.5 text-left text-sm font-medium transition-all ${
            picked === "A"
              ? "border-[#00f0ff] bg-[#00f0ff]/20 text-[#00f0ff] shadow-[0_0_15px_rgba(0,240,255,0.2)]"
              : picked === "B"
                ? "border-white/5 bg-white/5 text-zinc-500"
                : "border-white/10 bg-white/5 hover:border-[#00f0ff]/50 hover:bg-[#00f0ff]/10"
          }`}
        >
          <div className="flex items-center justify-between">
            <span>{prediction.optionA}</span>
            <span className="text-xs text-zinc-400">{pctA}%</span>
          </div>
          <div className="mt-1.5 h-1 rounded-full bg-white/10 overflow-hidden">
            <div className="h-full rounded-full bg-[#00f0ff]" style={{ width: `${pctA}%` }} />
          </div>
        </button>
        <button
          onClick={() => handlePick("B")}
          disabled={!!picked || !isLoggedIn}
          className={`w-full rounded-xl border px-3 py-2.5 text-left text-sm font-medium transition-all ${
            picked === "B"
              ? "border-[#ff00e5] bg-[#ff00e5]/20 text-[#ff00e5] shadow-[0_0_15px_rgba(255,0,229,0.2)]"
              : picked === "A"
                ? "border-white/5 bg-white/5 text-zinc-500"
                : "border-white/10 bg-white/5 hover:border-[#ff00e5]/50 hover:bg-[#ff00e5]/10"
          }`}
        >
          <div className="flex items-center justify-between">
            <span>{prediction.optionB}</span>
            <span className="text-xs text-zinc-400">{pctB}%</span>
          </div>
          <div className="mt-1.5 h-1 rounded-full bg-white/10 overflow-hidden">
            <div className="h-full rounded-full bg-[#ff00e5]" style={{ width: `${pctB}%` }} />
          </div>
        </button>
      </div>
      {picked && (
        <div className="mt-3 text-center text-xs text-zinc-400 animate-pulse">
          Settling...
        </div>
      )}
    </div>
  );
}

function PostCard({ post }: { post: FeedPost }) {
  const [reactions, setReactions] = useState(post.reactions);
  const [reacted, setReacted] = useState<string | null>(null);

  const react = (type: keyof typeof reactions) => {
    if (reacted) return;
    setReacted(type);
    setReactions((prev) => ({ ...prev, [type]: prev[type] + 1 }));
  };

  const typeColors = {
    prediction_win: "from-green-500/20 to-emerald-500/20 border-green-500/30",
    battle_result: "from-red-500/20 to-orange-500/20 border-red-500/30",
    streak: "from-orange-500/20 to-amber-500/20 border-orange-500/30",
    achievement: "from-purple-500/20 to-violet-500/20 border-purple-500/30",
    challenge: "from-cyan-500/20 to-blue-500/20 border-cyan-500/30",
    media_post: "from-pink-500/20 to-rose-500/20 border-pink-500/30",
  };

  const typeLabels = {
    prediction_win: "Prediction Win",
    battle_result: "Battle Result",
    streak: "Streak",
    achievement: "Level Up",
    challenge: "Open Challenge",
    media_post: "Post",
  };

  return (
    <div className={`rounded-2xl border bg-gradient-to-b p-4 ${typeColors[post.type]}`}>
      <div className="flex items-center gap-3 mb-3">
        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-xl">
          {post.user.avatar}
        </div>
        <div className="flex-1">
          <div className="flex items-center gap-2">
            <span className="text-sm font-bold">{post.user.displayName}</span>
            <span className="text-xs text-zinc-500">@{post.user.username}</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-[10px] font-semibold uppercase tracking-wide text-zinc-400">
              {typeLabels[post.type]}
            </span>
            {post.coins && post.coins > 0 && (
              <span className="text-[10px] font-bold text-yellow-400">+{post.coins} coins</span>
            )}
          </div>
        </div>
        <span className="text-xs text-zinc-600">
          {new Date(post.timestamp).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
        </span>
      </div>
      <p className="mb-3 text-sm leading-relaxed">{post.content}</p>
      <div className="flex items-center gap-1">
        {(["fire", "skull", "rocket", "clap"] as const).map((type) => {
          const emojis = { fire: "🔥", skull: "💀", rocket: "🚀", clap: "👏" };
          return (
            <button
              key={type}
              onClick={() => react(type)}
              className={`flex items-center gap-1 rounded-full px-2.5 py-1 text-xs transition-all ${
                reacted === type
                  ? "bg-white/20 scale-110"
                  : "bg-white/5 hover:bg-white/10"
              }`}
            >
              <span>{emojis[type]}</span>
              <span className="text-zinc-400">{reactions[type]}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}

export default function VibexHomePage() {
  const { isLoggedIn, user } = useVibex();
  const userCountry = user?.country;
  const relevantPredictions = userCountry
    ? FLASH_PREDICTIONS.filter((p) => p.countryTags.includes(userCountry))
    : FLASH_PREDICTIONS;

  return (
    <>
      <VibexHeader />
      <div className="space-y-6 p-4">
        {/* Hero */}
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-[#00f0ff]/10 via-[#7b61ff]/10 to-[#ff00e5]/10 border border-white/10 p-6">
          <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSA2MCAwIEwgMCAwIDAgNjAiIGZpbGw9Im5vbmUiIHN0cm9rZT0icmdiYSgyNTUsMjU1LDI1NSwwLjAzKSIgc3Ryb2tlLXdpZHRoPSIxIi8+PC9wYXR0ZXJuPjwvZGVmcz48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSJ1cmwoI2dyaWQpIi8+PC9zdmc+')] opacity-50" />
          <div className="relative">
            <h1 className="text-3xl font-black tracking-tight">
              <span className="bg-gradient-to-r from-[#00f0ff] via-[#7b61ff] to-[#ff00e5] bg-clip-text text-transparent">
                Predict. Battle. Win.
              </span>
            </h1>
            <p className="mt-2 text-sm text-zinc-400">
              Bet coins on flash predictions, challenge anyone to 1v1 battles, and climb the ranks.
            </p>
            {!isLoggedIn && (
              <Link
                href="/vibex/signup"
                className="mt-4 inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-[#00f0ff] to-[#7b61ff] px-6 py-2.5 text-sm font-bold text-black transition-all hover:scale-105 hover:shadow-[0_0_30px_rgba(0,240,255,0.3)]"
              >
                <Zap size={16} />
                Get 5,000 Free Coins
              </Link>
            )}
            {isLoggedIn && user && (
              <div className="mt-4 flex items-center gap-4">
                <div className="flex items-center gap-2 rounded-xl bg-white/5 border border-white/10 px-3 py-2">
                  <Flame size={16} className="text-orange-400" />
                  <span className="text-sm"><span className="font-bold text-orange-400">{user.streak}</span> day streak</span>
                </div>
                <div className="flex items-center gap-2 rounded-xl bg-white/5 border border-white/10 px-3 py-2">
                  <TrendingUp size={16} className="text-green-400" />
                  <span className="text-sm"><span className="font-bold text-green-400">Lv.{user.level}</span></span>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Flash Predictions Carousel */}
        <section>
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <Zap size={18} className="text-[#00f0ff]" />
              <h2 className="text-lg font-bold">Flash Predictions</h2>
              <span className="flex items-center gap-1 rounded-full bg-red-500/20 border border-red-500/30 px-2 py-0.5 text-[10px] font-bold text-red-400 animate-pulse">
                <span className="h-1.5 w-1.5 rounded-full bg-red-400" />
                LIVE
              </span>
            </div>
            <Link href="/vibex/arena" className="flex items-center gap-1 text-xs text-[#00f0ff] hover:underline">
              See all <ChevronRight size={14} />
            </Link>
          </div>
          <div className="flex gap-3 overflow-x-auto pb-2 snap-x snap-mandatory scrollbar-hide" style={{ scrollbarWidth: "none" }}>
            {relevantPredictions.slice(0, 5).map((p) => (
              <FlashCard key={p.id} prediction={p} />
            ))}
          </div>
        </section>

        {/* Quick Actions */}
        <div className="grid grid-cols-3 gap-3">
          <Link href="/vibex/arena" className="group flex flex-col items-center gap-2 rounded-2xl border border-white/10 bg-white/5 p-4 transition-all hover:border-[#00f0ff]/30 hover:bg-[#00f0ff]/5">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-[#00f0ff]/20 to-[#00f0ff]/5 text-[#00f0ff] group-hover:scale-110 transition-transform">
              <Zap size={24} />
            </div>
            <span className="text-xs font-semibold">Arena</span>
          </Link>
          <Link href="/vibex/battles" className="group flex flex-col items-center gap-2 rounded-2xl border border-white/10 bg-white/5 p-4 transition-all hover:border-[#ff00e5]/30 hover:bg-[#ff00e5]/5">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-[#ff00e5]/20 to-[#ff00e5]/5 text-[#ff00e5] group-hover:scale-110 transition-transform">
              <Swords size={24} />
            </div>
            <span className="text-xs font-semibold">Battles</span>
          </Link>
          <Link href="/vibex/spin" className="group flex flex-col items-center gap-2 rounded-2xl border border-white/10 bg-white/5 p-4 transition-all hover:border-yellow-500/30 hover:bg-yellow-500/5">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-yellow-500/20 to-yellow-500/5 text-yellow-400 group-hover:scale-110 transition-transform">
              <Clock size={24} />
            </div>
            <span className="text-xs font-semibold">Daily Spin</span>
          </Link>
        </div>

        {/* Trending Reels */}
        <section>
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <Play size={18} className="text-[#ff00e5]" />
              <h2 className="text-lg font-bold">Trending Reels</h2>
            </div>
            <Link href="/vibex/reels" className="flex items-center gap-1 text-xs text-[#ff00e5] hover:underline">
              Watch all <ChevronRight size={14} />
            </Link>
          </div>
          <div className="flex gap-3 overflow-x-auto pb-2" style={{ scrollbarWidth: "none" }}>
            {MOCK_REELS.slice(0, 5).map((reel) => (
              <Link
                key={reel.id}
                href="/vibex/reels"
                className="flex-shrink-0 w-32 rounded-2xl border border-white/10 bg-gradient-to-b from-white/[0.06] to-transparent overflow-hidden hover:border-[#ff00e5]/30 transition-all"
              >
                <div className="relative h-44 bg-gradient-to-br from-purple-900/40 via-indigo-900/30 to-cyan-900/20 flex items-center justify-center">
                  <span className="text-4xl">{reel.thumbnail}</span>
                  {reel.mediaType === "video" && (
                    <div className="absolute top-1.5 right-1.5 flex h-5 w-5 items-center justify-center rounded-full bg-black/50">
                      <Play size={10} className="text-white ml-0.5" />
                    </div>
                  )}
                  <div className="absolute bottom-1.5 left-1.5 flex items-center gap-1 rounded-full bg-black/50 px-1.5 py-0.5">
                    <Eye size={8} className="text-white/60" />
                    <span className="text-[8px] text-white/80">{(reel.views / 1000).toFixed(0)}K</span>
                  </div>
                  {reel.filterName && (
                    <div className="absolute bottom-1.5 right-1.5 flex h-5 w-5 items-center justify-center rounded-full bg-[#ff00e5]/30">
                      <Camera size={8} className="text-[#ff00e5]" />
                    </div>
                  )}
                </div>
                <div className="p-2">
                  <div className="flex items-center gap-1">
                    <span className="text-sm">{reel.user.avatar}</span>
                    <span className="text-[10px] font-bold truncate">@{reel.user.username}</span>
                  </div>
                  <p className="text-[9px] text-zinc-500 truncate mt-0.5">{reel.caption}</p>
                </div>
              </Link>
            ))}
          </div>
        </section>

        {/* Feed */}
        <section>
          <div className="flex items-center gap-2 mb-3">
            <Flame size={18} className="text-orange-400" />
            <h2 className="text-lg font-bold">Vibe Feed</h2>
          </div>
          <div className="space-y-3">
            {FEED_POSTS.map((post) => (
              <PostCard key={post.id} post={post} />
            ))}
          </div>
        </section>
      </div>
    </>
  );
}
