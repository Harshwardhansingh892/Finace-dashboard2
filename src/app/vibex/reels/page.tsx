"use client";

import { useState, useRef } from "react";
import { MOCK_REELS } from "@/lib/vibex-data";
import type { Reel } from "@/lib/vibex-types";
import { Heart, MessageCircle, Share2, Music, Eye, Camera, Play, Volume2, VolumeX, ChevronUp, ChevronDown } from "lucide-react";
import Link from "next/link";

function ReelCard({ reel, isActive }: { reel: Reel; isActive: boolean }) {
  const [liked, setLiked] = useState(false);
  const [paused, setPaused] = useState(false);
  const [muted, setMuted] = useState(true);
  const [reactionCounts, setReactionCounts] = useState(reel.reactions);

  const playing = isActive && !paused;

  const handleLike = () => {
    if (!liked) {
      setReactionCounts((prev) => ({ ...prev, fire: prev.fire + 1 }));
    } else {
      setReactionCounts((prev) => ({ ...prev, fire: prev.fire - 1 }));
    }
    setLiked(!liked);
  };

  const gradients = [
    "from-purple-900/90 via-indigo-900/80 to-cyan-900/70",
    "from-pink-900/90 via-purple-900/80 to-blue-900/70",
    "from-emerald-900/90 via-teal-900/80 to-cyan-900/70",
    "from-orange-900/90 via-red-900/80 to-pink-900/70",
    "from-blue-900/90 via-indigo-900/80 to-violet-900/70",
  ];
  const gradientIdx = parseInt(reel.id.replace(/\D/g, ""), 10) % gradients.length;

  return (
    <div className="relative h-full w-full snap-start snap-always flex-shrink-0">
      {/* Background */}
      <div className={`absolute inset-0 bg-gradient-to-b ${gradients[gradientIdx]}`}>
        {/* Animated particles */}
        <div className="absolute inset-0 overflow-hidden">
          {[...Array(6)].map((_, i) => (
            <div
              key={i}
              className="absolute rounded-full bg-white/5 vibex-float"
              style={{
                width: `${20 + i * 15}px`,
                height: `${20 + i * 15}px`,
                left: `${10 + i * 15}%`,
                top: `${20 + i * 12}%`,
                animationDelay: `${i * 0.5}s`,
              }}
            />
          ))}
        </div>

        {/* Center content — filter/media preview */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="relative">
            <div className="flex h-32 w-32 items-center justify-center rounded-full bg-white/10 text-7xl shadow-[0_0_40px_rgba(0,240,255,0.15)]">
              {reel.thumbnail}
            </div>
            {reel.mediaType === "video" && (
              <button
                onClick={() => setPaused(!paused)}
                className="absolute inset-0 flex items-center justify-center rounded-full"
              >
                {!playing && (
                  <div className="flex h-14 w-14 items-center justify-center rounded-full bg-black/40 backdrop-blur-sm">
                    <Play size={24} className="text-white ml-1" />
                  </div>
                )}
              </button>
            )}
            {playing && reel.mediaType === "video" && (
              <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 flex items-center gap-1">
                <div className="h-1 w-1 rounded-full bg-red-500 animate-pulse" />
                <span className="text-[9px] text-red-400 font-bold">PLAYING</span>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Right sidebar — actions */}
      <div className="absolute right-3 bottom-32 flex flex-col items-center gap-5 z-10">
        {/* User avatar */}
        <Link href={`/vibex`} className="relative">
          <div className="flex h-11 w-11 items-center justify-center rounded-full bg-black/40 border-2 border-[#00f0ff] text-xl backdrop-blur-sm">
            {reel.user.avatar}
          </div>
          <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 flex h-5 w-5 items-center justify-center rounded-full bg-[#ff00e5] text-[10px] font-bold text-white">
            +
          </div>
        </Link>

        {/* Like */}
        <button onClick={handleLike} className="flex flex-col items-center gap-0.5">
          <div className={`flex h-10 w-10 items-center justify-center rounded-full transition-all ${liked ? "bg-red-500/30 scale-110" : "bg-black/30 backdrop-blur-sm"}`}>
            <Heart size={22} className={liked ? "text-red-500 fill-red-500" : "text-white"} />
          </div>
          <span className="text-[10px] text-white font-semibold">{(reactionCounts.fire / 1000).toFixed(1)}K</span>
        </button>

        {/* Comments */}
        <button className="flex flex-col items-center gap-0.5">
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-black/30 backdrop-blur-sm">
            <MessageCircle size={22} className="text-white" />
          </div>
          <span className="text-[10px] text-white font-semibold">{reel.comments}</span>
        </button>

        {/* Share */}
        <button className="flex flex-col items-center gap-0.5">
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-black/30 backdrop-blur-sm">
            <Share2 size={22} className="text-white" />
          </div>
          <span className="text-[10px] text-white font-semibold">{reel.shares}</span>
        </button>

        {/* Filter info */}
        {reel.filterName && (
          <Link href={`/vibex/filters/${reel.filterId}`} className="flex flex-col items-center gap-0.5">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#ff00e5]/30 backdrop-blur-sm animate-spin" style={{ animationDuration: "3s" }}>
              <Camera size={18} className="text-[#ff00e5]" />
            </div>
          </Link>
        )}

        {/* Mute */}
        <button onClick={() => setMuted(!muted)} className="flex flex-col items-center gap-0.5">
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-black/30 backdrop-blur-sm">
            {muted ? <VolumeX size={20} className="text-white/60" /> : <Volume2 size={20} className="text-white" />}
          </div>
        </button>
      </div>

      {/* Bottom info */}
      <div className="absolute bottom-16 left-0 right-16 p-4 z-10">
        {/* User info */}
        <div className="flex items-center gap-2 mb-2">
          <span className="text-sm font-black text-white">@{reel.user.username}</span>
          <span className="rounded-full bg-white/10 px-1.5 py-0.5 text-[9px] text-zinc-300">Lv.{reel.user.level}</span>
        </div>

        {/* Caption */}
        <p className="text-sm text-white/90 leading-snug mb-2">{reel.caption}</p>

        {/* Filter used */}
        {reel.filterName && (
          <Link
            href={`/vibex/filters/${reel.filterId}`}
            className="mb-2 inline-flex items-center gap-1.5 rounded-full bg-[#ff00e5]/20 border border-[#ff00e5]/30 px-2.5 py-1 text-[11px] text-[#ff00e5] font-semibold hover:bg-[#ff00e5]/30 transition-all"
          >
            <Camera size={11} />
            {reel.filterName}
            <span className="text-[9px] text-zinc-400">by @{reel.filterCreator}</span>
          </Link>
        )}

        {/* Song */}
        {reel.songTitle && (
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-1.5 overflow-hidden">
              <Music size={12} className="text-white/60 flex-shrink-0" />
              <div className="overflow-hidden whitespace-nowrap">
                <span className="inline-block text-xs text-white/70 animate-marquee">
                  {reel.songTitle} — {reel.songArtist}
                </span>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* View count */}
      <div className="absolute top-4 left-4 flex items-center gap-1.5 rounded-full bg-black/40 backdrop-blur-sm px-2.5 py-1 z-10">
        <Eye size={12} className="text-white/60" />
        <span className="text-[11px] text-white/80 font-semibold">{(reel.views / 1000).toFixed(1)}K views</span>
      </div>

      {/* Duration badge */}
      {reel.duration && (
        <div className="absolute top-4 right-4 rounded-full bg-black/40 backdrop-blur-sm px-2 py-1 z-10">
          <span className="text-[11px] text-white/80">{reel.duration}</span>
        </div>
      )}
    </div>
  );
}

export default function ReelsPage() {
  const [activeIndex, setActiveIndex] = useState(0);
  const scrollRef = useRef<HTMLDivElement>(null);

  const handleScroll = () => {
    if (!scrollRef.current) return;
    const scrollTop = scrollRef.current.scrollTop;
    const height = scrollRef.current.clientHeight;
    const newIndex = Math.round(scrollTop / height);
    if (newIndex !== activeIndex && newIndex >= 0 && newIndex < MOCK_REELS.length) {
      setActiveIndex(newIndex);
    }
  };

  const scrollTo = (direction: "up" | "down") => {
    if (!scrollRef.current) return;
    const height = scrollRef.current.clientHeight;
    const newIndex = direction === "up" ? Math.max(0, activeIndex - 1) : Math.min(MOCK_REELS.length - 1, activeIndex + 1);
    scrollRef.current.scrollTo({ top: newIndex * height, behavior: "smooth" });
  };

  return (
    <div className="fixed inset-0 z-[101] bg-black">
      {/* Header */}
      <div className="absolute top-0 left-0 right-0 z-20 flex items-center justify-between px-4 pt-3 pb-2 bg-gradient-to-b from-black/60 to-transparent">
        <Link href="/vibex" className="text-lg font-black text-white">
          Vibes
        </Link>
        <div className="flex items-center gap-3">
          <span className="text-xs text-zinc-400">{activeIndex + 1}/{MOCK_REELS.length}</span>
          <Link
            href="/vibex/reels/create"
            className="flex items-center gap-1.5 rounded-full bg-[#ff00e5] px-3 py-1.5 text-xs font-bold text-white hover:scale-105 transition-all"
          >
            <Camera size={12} />
            Post
          </Link>
        </div>
      </div>

      {/* Scroll navigation hints */}
      {activeIndex > 0 && (
        <button
          onClick={() => scrollTo("up")}
          className="absolute top-14 left-1/2 -translate-x-1/2 z-20 flex h-8 w-8 items-center justify-center rounded-full bg-white/10 backdrop-blur-sm animate-bounce"
        >
          <ChevronUp size={18} className="text-white/60" />
        </button>
      )}
      {activeIndex < MOCK_REELS.length - 1 && (
        <button
          onClick={() => scrollTo("down")}
          className="absolute bottom-20 left-1/2 -translate-x-1/2 z-20 flex h-8 w-8 items-center justify-center rounded-full bg-white/10 backdrop-blur-sm animate-bounce"
        >
          <ChevronDown size={18} className="text-white/60" />
        </button>
      )}

      {/* Reels container */}
      <div
        ref={scrollRef}
        onScroll={handleScroll}
        className="h-full w-full overflow-y-auto snap-y snap-mandatory"
        style={{ scrollbarWidth: "none" }}
      >
        {MOCK_REELS.map((reel, i) => (
          <div key={reel.id} className="h-full w-full">
            <ReelCard reel={reel} isActive={i === activeIndex} />
          </div>
        ))}
      </div>

      {/* Bottom nav overlay */}
      <div className="absolute bottom-0 left-0 right-0 z-20 bg-gradient-to-t from-black/80 to-transparent pt-6 pb-3 px-4">
        <div className="flex items-center justify-around max-w-md mx-auto">
          <Link href="/vibex" className="flex flex-col items-center gap-0.5 text-zinc-500 text-[10px] font-medium">
            <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M3 12a9 9 0 1 0 18 0a9 9 0 0 0-18 0"/><path d="M12 7v5l3 3"/></svg>
            Feed
          </Link>
          <Link href="/vibex/arena" className="flex flex-col items-center gap-0.5 text-zinc-500 text-[10px] font-medium">
            <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="m14.5 17.5 3-3-3-3"/><path d="m9.5 6.5-3 3 3 3"/></svg>
            Arena
          </Link>
          <div className="flex flex-col items-center gap-0.5 text-[#00f0ff] text-[10px] font-medium scale-110">
            <Play size={22} strokeWidth={2.5} />
            Reels
            <div className="h-0.5 w-8 rounded-full bg-[#00f0ff] shadow-[0_0_10px_#00f0ff]" />
          </div>
          <Link href="/vibex/filters" className="flex flex-col items-center gap-0.5 text-zinc-500 text-[10px] font-medium">
            <Camera size={22} strokeWidth={1.5} />
            Filters
          </Link>
          <Link href="/vibex/profile" className="flex flex-col items-center gap-0.5 text-zinc-500 text-[10px] font-medium">
            <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
            Me
          </Link>
        </div>
      </div>
    </div>
  );
}
