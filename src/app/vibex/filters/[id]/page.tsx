"use client";

import { use } from "react";
import { VibexHeader } from "@/components/vibex/VibexHeader";
import { MOCK_FILTERS, MOCK_FILTER_POSTS, MOCK_REELS } from "@/lib/vibex-data";
import { Camera, Video, Download, Users, Image, TrendingUp, ArrowLeft, BarChart2, Play, Eye } from "lucide-react";
import Link from "next/link";

export default function FilterDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const filter = MOCK_FILTERS.find((f) => f.id === id);

  if (!filter) {
    return (
      <>
        <VibexHeader />
        <div className="flex flex-col items-center justify-center p-8 pt-32 text-center">
          <p className="text-zinc-500">Filter not found</p>
          <Link href="/vibex/filters" className="mt-4 text-sm text-[#00f0ff] underline">Back to Filters</Link>
        </div>
      </>
    );
  }

  const relatedPosts = MOCK_FILTER_POSTS.filter((p) => p.filter.id === filter.id);
  const relatedReels = MOCK_REELS.filter((r) => r.filterId === filter.id);

  return (
    <>
      <VibexHeader />
      <div className="p-4 space-y-4">
        {/* Back */}
        <Link href="/vibex/filters" className="flex items-center gap-1.5 text-xs text-zinc-500 hover:text-white">
          <ArrowLeft size={14} /> Back to Filters
        </Link>

        {/* Filter hero */}
        <div className="rounded-2xl border border-white/10 bg-gradient-to-b from-white/[0.06] to-transparent overflow-hidden">
          <div className="relative h-56 bg-gradient-to-br from-[#ff00e5]/20 via-[#7b61ff]/10 to-[#00f0ff]/20 flex items-center justify-center">
            <div className="relative">
              <div className="flex h-24 w-24 items-center justify-center rounded-full bg-white/10 text-6xl shadow-[0_0_30px_rgba(255,0,229,0.2)]">
                {filter.thumbnail}
              </div>
              {filter.overlays.slice(0, 3).map((ov, i) => (
                <span
                  key={ov.id}
                  className="absolute text-3xl"
                  style={{ top: `${10 + i * 25}%`, left: `${65 + i * 15}%` }}
                >
                  {ov.emoji}
                </span>
              ))}
            </div>
            <div className="absolute top-3 left-3 flex items-center gap-1.5 rounded-full bg-black/50 px-2.5 py-1 text-xs">
              {filter.type === "camera" ? <Camera size={12} /> : <Video size={12} />}
              {filter.type === "camera" ? "Camera Filter" : "Video Filter"}
            </div>
            {filter.songTitle && (
              <div className="absolute bottom-3 left-3 right-3 flex items-center gap-2 rounded-xl bg-black/60 px-3 py-2">
                <span className="text-sm">🎵</span>
                <div>
                  <div className="text-xs font-semibold">{filter.songTitle}</div>
                  <div className="text-[10px] text-zinc-500">{filter.songArtist}</div>
                </div>
              </div>
            )}
          </div>

          <div className="p-4">
            <h1 className="text-xl font-black">{filter.name}</h1>
            <div className="mt-1 flex items-center gap-2">
              <div className="flex h-6 w-6 items-center justify-center rounded-full bg-white/10 text-sm">
                {filter.creator.avatar}
              </div>
              <span className="text-sm text-zinc-400">by @{filter.creator.username}</span>
              <span className="text-xs text-zinc-600">· Level {filter.creator.level}</span>
            </div>
            <div className="mt-2 flex flex-wrap gap-1">
              {filter.tags.map((tag) => (
                <span key={tag} className="rounded-full bg-white/5 px-2 py-0.5 text-xs text-zinc-500">#{tag}</span>
              ))}
            </div>
          </div>
        </div>

        {/* Analytics cards */}
        <div>
          <h2 className="mb-3 flex items-center gap-1.5 text-sm font-bold text-zinc-400">
            <BarChart2 size={14} />
            Filter Analytics
          </h2>
          <div className="grid grid-cols-3 gap-3">
            <div className="rounded-xl border border-[#00f0ff]/20 bg-[#00f0ff]/5 p-3 text-center">
              <Download size={16} className="mx-auto mb-1 text-[#00f0ff]" />
              <div className="text-lg font-black text-[#00f0ff]">{(filter.downloads / 1000).toFixed(1)}K</div>
              <div className="text-[10px] text-zinc-500">Downloads</div>
            </div>
            <div className="rounded-xl border border-[#7b61ff]/20 bg-[#7b61ff]/5 p-3 text-center">
              <Users size={16} className="mx-auto mb-1 text-[#7b61ff]" />
              <div className="text-lg font-black text-[#7b61ff]">{(filter.uses / 1000).toFixed(1)}K</div>
              <div className="text-[10px] text-zinc-500">Uses</div>
            </div>
            <div className="rounded-xl border border-[#ff00e5]/20 bg-[#ff00e5]/5 p-3 text-center">
              <Image size={16} className="mx-auto mb-1 text-[#ff00e5]" />
              <div className="text-lg font-black text-[#ff00e5]">{(filter.posts / 1000).toFixed(1)}K</div>
              <div className="text-[10px] text-zinc-500">Posts</div>
            </div>
          </div>
        </div>

        {/* Trend chart placeholder */}
        <div className="rounded-xl border border-white/10 bg-white/5 p-4">
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-xs font-bold text-zinc-400">Usage Trend (7 days)</h3>
            <TrendingUp size={14} className="text-green-400" />
          </div>
          <div className="flex items-end gap-1 h-20">
            {[35, 42, 58, 45, 72, 68, 85].map((h, i) => (
              <div
                key={i}
                className="flex-1 rounded-t-sm bg-gradient-to-t from-[#ff00e5]/30 to-[#7b61ff]/60"
                style={{ height: `${h}%` }}
              />
            ))}
          </div>
          <div className="mt-1 flex justify-between text-[9px] text-zinc-600">
            <span>Mon</span><span>Tue</span><span>Wed</span><span>Thu</span><span>Fri</span><span>Sat</span><span>Sun</span>
          </div>
        </div>

        {/* Overlays used */}
        <div>
          <h3 className="mb-2 text-xs font-bold text-zinc-400">Overlays in this Filter</h3>
          <div className="flex flex-wrap gap-2">
            {filter.overlays.map((ov) => (
              <div key={ov.id} className="flex items-center gap-1.5 rounded-full bg-white/10 border border-white/10 px-3 py-1.5">
                <span className="text-lg">{ov.emoji}</span>
                <span className="text-xs font-semibold">{ov.label}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Reels using this filter */}
        {relatedReels.length > 0 && (
          <div>
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-xs font-bold text-zinc-400 flex items-center gap-1.5">
                <Play size={12} />
                Reels Using This Filter
              </h3>
              <Link href="/vibex/reels" className="text-[10px] text-[#ff00e5] hover:underline">See all</Link>
            </div>
            <div className="flex gap-3 overflow-x-auto pb-2" style={{ scrollbarWidth: "none" }}>
              {relatedReels.map((reel) => (
                <Link
                  key={reel.id}
                  href="/vibex/reels"
                  className="flex-shrink-0 w-28 rounded-xl border border-white/10 bg-white/[0.02] overflow-hidden hover:border-[#ff00e5]/30 transition-all"
                >
                  <div className="relative h-36 bg-gradient-to-br from-purple-900/40 via-indigo-900/30 to-cyan-900/20 flex items-center justify-center">
                    <span className="text-3xl">{reel.thumbnail}</span>
                    {reel.mediaType === "video" && (
                      <div className="absolute top-1 right-1 flex h-4 w-4 items-center justify-center rounded-full bg-black/50">
                        <Play size={8} className="text-white ml-0.5" />
                      </div>
                    )}
                    <div className="absolute bottom-1 left-1 flex items-center gap-0.5 rounded-full bg-black/50 px-1 py-0.5">
                      <Eye size={7} className="text-white/60" />
                      <span className="text-[7px] text-white/80">{(reel.views / 1000).toFixed(0)}K</span>
                    </div>
                  </div>
                  <div className="p-1.5">
                    <div className="flex items-center gap-1">
                      <span className="text-xs">{reel.user.avatar}</span>
                      <span className="text-[9px] font-bold truncate">@{reel.user.username}</span>
                    </div>
                    <p className="text-[8px] text-zinc-500 truncate">{reel.caption}</p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}

        {/* Posts using this filter */}
        {relatedPosts.length > 0 && (
          <div>
            <h3 className="mb-2 text-xs font-bold text-zinc-400">Posts Using This Filter</h3>
            <div className="space-y-2">
              {relatedPosts.map((post) => (
                <div key={post.id} className="flex items-center gap-3 rounded-xl border border-white/5 bg-white/[0.02] p-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/10 text-xl">{post.user.avatar}</div>
                  <div className="flex-1 min-w-0">
                    <div className="text-sm font-bold">{post.user.displayName}</div>
                    <div className="text-xs text-zinc-500 truncate">{post.caption}</div>
                  </div>
                  <div className="flex items-center gap-1 text-xs text-zinc-500">
                    {post.mediaType === "video" ? <Video size={10} /> : <Camera size={10} />}
                    <span>🔥{post.reactions.fire}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Action button */}
        <button className="w-full flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-[#ff00e5] to-[#7b61ff] py-3 text-sm font-bold text-white hover:scale-[1.02] transition-all">
          <Download size={16} /> Use This Filter
        </button>
      </div>
    </>
  );
}
