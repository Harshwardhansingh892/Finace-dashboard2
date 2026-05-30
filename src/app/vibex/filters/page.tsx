"use client";

import { useState } from "react";
import { VibexHeader } from "@/components/vibex/VibexHeader";
import { MOCK_FILTERS, MOCK_FILTER_POSTS } from "@/lib/vibex-data";
import type { CameraFilter } from "@/lib/vibex-types";
import { Camera, Video, Download, Users, Image, TrendingUp, Plus, Search, Eye } from "lucide-react";
import Link from "next/link";

const TABS = ["all", "camera", "video"] as const;
const SORT = ["trending", "newest", "most_used"] as const;

function FilterCard({ filter }: { filter: CameraFilter }) {
  const [downloaded, setDownloaded] = useState(false);

  return (
    <div className="rounded-2xl border border-white/10 bg-gradient-to-b from-white/[0.06] to-transparent overflow-hidden transition-all hover:border-white/20">
      {/* Preview */}
      <div className="relative h-44 bg-gradient-to-br from-[#7b61ff]/20 via-[#00f0ff]/10 to-[#ff00e5]/20 flex items-center justify-center">
        <div className="relative">
          <div className="flex h-20 w-20 items-center justify-center rounded-full bg-white/10 text-5xl">
            {filter.thumbnail}
          </div>
          {/* Overlays preview */}
          <div className="absolute inset-0 flex items-center justify-center">
            {filter.overlays.slice(0, 3).map((ov, i) => (
              <span
                key={ov.id}
                className="absolute text-2xl"
                style={{
                  top: `${15 + i * 20}%`,
                  left: `${60 + i * 15}%`,
                  transform: `rotate(${ov.rotation}deg)`,
                }}
              >
                {ov.emoji}
              </span>
            ))}
          </div>
        </div>
        {/* Type badge */}
        <div className="absolute top-2 left-2 flex items-center gap-1 rounded-full bg-black/50 px-2 py-0.5 text-xs">
          {filter.type === "camera" ? <Camera size={10} /> : <Video size={10} />}
          {filter.type === "camera" ? "Camera" : "Video"}
        </div>
        {filter.songTitle && (
          <div className="absolute bottom-2 left-2 right-2 flex items-center gap-1.5 rounded-lg bg-black/60 px-2 py-1">
            <span className="text-xs">🎵</span>
            <span className="text-xs text-zinc-300 truncate">{filter.songTitle} — {filter.songArtist}</span>
          </div>
        )}
      </div>

      <div className="p-3 space-y-2">
        <div className="flex items-start justify-between gap-2">
          <div>
            <h3 className="text-sm font-bold">{filter.name}</h3>
            <p className="text-xs text-zinc-500">by @{filter.creator.username}</p>
          </div>
          <div className="flex h-6 w-6 items-center justify-center rounded-full bg-white/10 text-sm">
            {filter.creator.avatar}
          </div>
        </div>

        {/* Stats */}
        <div className="flex items-center gap-3 text-[10px] text-zinc-500">
          <span className="flex items-center gap-0.5"><Download size={10} />{(filter.downloads / 1000).toFixed(1)}K</span>
          <span className="flex items-center gap-0.5"><Users size={10} />{(filter.uses / 1000).toFixed(1)}K uses</span>
          <span className="flex items-center gap-0.5"><Image size={10} />{(filter.posts / 1000).toFixed(1)}K posts</span>
        </div>

        {/* Tags */}
        <div className="flex flex-wrap gap-1">
          {filter.tags.map((tag) => (
            <span key={tag} className="rounded-full bg-white/5 px-2 py-0.5 text-[10px] text-zinc-500">#{tag}</span>
          ))}
        </div>

        {/* Actions */}
        <div className="flex gap-2">
          <button
            onClick={() => setDownloaded(true)}
            disabled={downloaded}
            className={`flex-1 flex items-center justify-center gap-1.5 rounded-xl py-2 text-xs font-bold transition-all ${
              downloaded
                ? "bg-green-500/20 text-green-400 border border-green-500/30"
                : "bg-gradient-to-r from-[#00f0ff] to-[#7b61ff] text-black hover:scale-[1.02]"
            }`}
          >
            {downloaded ? (
              <><Eye size={12} /> Using</>
            ) : (
              <><Download size={12} /> Get Filter</>
            )}
          </button>
          <Link
            href={`/vibex/filters/${filter.id}`}
            className="flex items-center justify-center rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-xs hover:bg-white/10"
          >
            <Eye size={12} />
          </Link>
        </div>
      </div>
    </div>
  );
}

export default function FiltersPage() {
  const [tab, setTab] = useState<(typeof TABS)[number]>("all");
  const [sort, setSort] = useState<(typeof SORT)[number]>("trending");
  const [search, setSearch] = useState("");

  let filters = [...MOCK_FILTERS];
  if (tab !== "all") filters = filters.filter((f) => f.type === tab);
  if (search) filters = filters.filter((f) => f.name.toLowerCase().includes(search.toLowerCase()) || f.tags.some((t) => t.includes(search.toLowerCase())));
  if (sort === "newest") filters.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
  else if (sort === "most_used") filters.sort((a, b) => b.uses - a.uses);
  else filters.sort((a, b) => b.downloads - a.downloads);

  return (
    <>
      <VibexHeader />
      <div className="p-4 space-y-4">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Camera size={20} className="text-[#ff00e5]" />
            <h1 className="text-xl font-black">Filters</h1>
          </div>
          <Link
            href="/vibex/filters/create"
            className="flex items-center gap-1.5 rounded-full bg-gradient-to-r from-[#ff00e5] to-[#7b61ff] px-4 py-2 text-xs font-bold text-white hover:scale-105 transition-all"
          >
            <Plus size={14} />
            Create
          </Link>
        </div>

        {/* Search */}
        <div className="relative">
          <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-500" />
          <input
            type="text"
            placeholder="Search filters..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full rounded-xl border border-white/10 bg-white/5 py-2.5 pl-10 pr-4 text-sm text-white placeholder:text-zinc-600 focus:border-[#00f0ff]/50 focus:outline-none"
          />
        </div>

        {/* Tabs */}
        <div className="flex gap-2">
          {TABS.map((t) => (
            <button
              key={t}
              onClick={() => setTab(t)}
              className={`flex items-center gap-1.5 rounded-full px-4 py-1.5 text-xs font-semibold transition-all ${
                tab === t ? "bg-[#ff00e5]/20 border border-[#ff00e5]/50 text-[#ff00e5]" : "bg-white/5 border border-white/10 text-zinc-400 hover:bg-white/10"
              }`}
            >
              {t === "camera" && <Camera size={12} />}
              {t === "video" && <Video size={12} />}
              {t === "all" && <TrendingUp size={12} />}
              {t.charAt(0).toUpperCase() + t.slice(1)}
            </button>
          ))}
        </div>

        {/* Sort */}
        <div className="flex gap-2 overflow-x-auto pb-1" style={{ scrollbarWidth: "none" }}>
          {SORT.map((s) => (
            <button
              key={s}
              onClick={() => setSort(s)}
              className={`flex-shrink-0 rounded-lg px-3 py-1 text-xs transition-all ${
                sort === s ? "bg-white/10 text-white font-semibold" : "text-zinc-500 hover:text-white"
              }`}
            >
              {s === "trending" ? "Trending" : s === "newest" ? "Newest" : "Most Used"}
            </button>
          ))}
        </div>

        {/* Filter grid */}
        <div className="grid grid-cols-2 gap-3">
          {filters.map((filter) => (
            <FilterCard key={filter.id} filter={filter} />
          ))}
        </div>

        {/* Recent posts using filters */}
        <div>
          <h2 className="mb-3 text-sm font-bold text-zinc-400 uppercase tracking-wider">Recent Filter Posts</h2>
          <div className="space-y-2">
            {MOCK_FILTER_POSTS.map((post) => (
              <div key={post.id} className="flex items-center gap-3 rounded-xl border border-white/5 bg-white/[0.02] p-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/10 text-xl">
                  {post.user.avatar}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-1.5">
                    <span className="text-sm font-bold">{post.user.displayName}</span>
                    <span className="text-xs text-zinc-500">used</span>
                    <span className="text-xs font-semibold text-[#ff00e5]">{post.filter.name}</span>
                  </div>
                  <div className="flex items-center gap-2 text-[10px] text-zinc-500 mt-0.5">
                    {post.mediaType === "video" ? <Video size={10} /> : <Camera size={10} />}
                    <span>{post.caption}</span>
                  </div>
                </div>
                <div className="flex items-center gap-1 text-xs text-zinc-500">
                  <span>🔥{post.reactions.fire}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
