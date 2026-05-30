"use client";

import { useState, useRef } from "react";
import { VibexHeader } from "@/components/vibex/VibexHeader";
import { useVibex } from "@/lib/vibex-context";
import { MOCK_STORIES } from "@/lib/vibex-data";
import type { Story } from "@/lib/vibex-types";
import { Plus, X, Eye, ChevronLeft, ChevronRight, Camera, Send, Image } from "lucide-react";
import Link from "next/link";

function StoryViewer({ story, onClose, onNext, onPrev, hasNext, hasPrev }: {
  story: Story; onClose: () => void; onNext: () => void; onPrev: () => void; hasNext: boolean; hasPrev: boolean;
}) {
  const [reacted, setReacted] = useState<string | null>(null);
  const progressPct = 100;

  return (
    <div className="fixed inset-0 z-[200] bg-black flex items-center justify-center">
      {/* Progress bar */}
      <div className="absolute top-0 left-0 right-0 z-30 px-3 pt-2">
        <div className="h-0.5 rounded-full bg-white/20 overflow-hidden">
          <div className="h-full bg-white/80 rounded-full transition-all" style={{ width: `${progressPct}%` }} />
        </div>
      </div>

      {/* Header */}
      <div className="absolute top-3 left-0 right-0 z-30 flex items-center justify-between px-4">
        <div className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-white/20 text-lg">{story.user.avatar}</div>
          <div>
            <div className="text-xs font-bold text-white">{story.user.displayName}</div>
            <div className="text-[9px] text-white/60">
              {new Date(story.createdAt).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
            </div>
          </div>
        </div>
        <button onClick={onClose} className="flex h-8 w-8 items-center justify-center rounded-full bg-white/10">
          <X size={16} className="text-white" />
        </button>
      </div>

      {/* Navigation areas */}
      {hasPrev && (
        <button onClick={onPrev} className="absolute left-0 top-0 bottom-0 w-1/4 z-20">
          <ChevronLeft size={24} className="absolute left-2 top-1/2 text-white/30" />
        </button>
      )}
      {hasNext && (
        <button onClick={onNext} className="absolute right-0 top-0 bottom-0 w-1/4 z-20">
          <ChevronRight size={24} className="absolute right-2 top-1/2 text-white/30" />
        </button>
      )}

      {/* Story content */}
      <div className={`absolute inset-0 bg-gradient-to-b ${story.backgroundColor || "from-purple-900 to-indigo-900"} flex items-center justify-center p-8`}>
        <div className="text-center max-w-xs">
          {story.text && (
            <p className="text-2xl font-black text-white leading-tight drop-shadow-lg">{story.text}</p>
          )}
          {story.filterName && (
            <Link
              href={`/vibex/filters/${story.filterId}`}
              className="mt-4 inline-flex items-center gap-1.5 rounded-full bg-white/20 px-3 py-1.5 text-xs text-white font-semibold"
            >
              <Camera size={12} />
              {story.filterName}
            </Link>
          )}
        </div>
      </div>

      {/* Viewers + Reactions */}
      <div className="absolute bottom-0 left-0 right-0 z-30 bg-gradient-to-t from-black/80 to-transparent px-4 pb-6 pt-12">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-1.5 text-xs text-white/60">
            <Eye size={12} />
            {story.viewers.length} viewers
          </div>
          <div className="flex gap-2">
            {(["fire", "skull", "rocket", "clap"] as const).map((type) => {
              const emojis = { fire: "🔥", skull: "💀", rocket: "🚀", clap: "👏" };
              return (
                <button
                  key={type}
                  onClick={() => setReacted(type)}
                  className={`rounded-full px-2 py-1 text-xs transition-all ${
                    reacted === type ? "bg-white/20 scale-110" : "bg-white/10 hover:bg-white/15"
                  }`}
                >
                  {emojis[type]}{story.reactions[type]}
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

export default function StoriesPage() {
  const { isLoggedIn, user } = useVibex();
  const [viewingIdx, setViewingIdx] = useState<number | null>(null);
  const [creating, setCreating] = useState(false);
  const [storyText, setStoryText] = useState("");
  const [bgIdx, setBgIdx] = useState(0);
  const [posted, setPosted] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const backgrounds = [
    "from-purple-600 to-indigo-800",
    "from-orange-500 to-red-600",
    "from-cyan-500 to-blue-600",
    "from-green-500 to-emerald-600",
    "from-pink-500 to-rose-600",
    "from-yellow-600 to-orange-700",
    "from-violet-600 to-purple-800",
    "from-teal-500 to-cyan-700",
  ];

  const stories = MOCK_STORIES;
  const grouped = new Map<string, Story[]>();
  stories.forEach((s) => {
    const key = s.user.id;
    if (!grouped.has(key)) grouped.set(key, []);
    grouped.get(key)!.push(s);
  });
  const userStories = Array.from(grouped.entries());

  if (!isLoggedIn) {
    return (
      <>
        <VibexHeader />
        <div className="flex flex-col items-center justify-center p-8 pt-32 text-center">
          <Image size={48} className="mb-4 text-zinc-700" />
          <p className="mb-4 text-zinc-500">Sign up to post stories</p>
          <Link href="/vibex/signup" className="rounded-full bg-gradient-to-r from-[#00f0ff] to-[#7b61ff] px-6 py-2.5 text-sm font-bold text-black">
            Join VibeX
          </Link>
        </div>
      </>
    );
  }

  // Story viewer
  if (viewingIdx !== null) {
    const flatStories = stories;
    return (
      <StoryViewer
        story={flatStories[viewingIdx]}
        onClose={() => setViewingIdx(null)}
        onNext={() => setViewingIdx(Math.min(flatStories.length - 1, viewingIdx + 1))}
        onPrev={() => setViewingIdx(Math.max(0, viewingIdx - 1))}
        hasNext={viewingIdx < flatStories.length - 1}
        hasPrev={viewingIdx > 0}
      />
    );
  }

  // Create story
  if (creating) {
    return (
      <>
        <VibexHeader />
        <div className="p-4 space-y-4">
          <div className="flex items-center justify-between">
            <button onClick={() => { setCreating(false); setPosted(false); }} className="text-xs text-zinc-500">Cancel</button>
            <h2 className="text-sm font-bold">Create Story</h2>
            <div />
          </div>

          {posted ? (
            <div className="text-center py-12 space-y-3">
              <div className="text-5xl">🎉</div>
              <h3 className="text-xl font-black">Story Posted!</h3>
              <p className="text-sm text-zinc-500">Your story is live for 24 hours</p>
              <button onClick={() => { setCreating(false); setPosted(false); }} className="rounded-full bg-gradient-to-r from-[#00f0ff] to-[#7b61ff] px-6 py-2 text-sm font-bold text-black">
                Done
              </button>
            </div>
          ) : (
            <>
              {/* Preview */}
              <div className={`relative rounded-2xl bg-gradient-to-b ${backgrounds[bgIdx]} h-80 flex items-center justify-center p-6 overflow-hidden`}>
                {storyText ? (
                  <p className="text-2xl font-black text-white text-center leading-tight drop-shadow-lg">{storyText}</p>
                ) : (
                  <p className="text-sm text-white/40">Type your story...</p>
                )}
                <div className="absolute bottom-2 left-2 flex items-center gap-1 text-xs text-white/40">
                  <div className="flex h-6 w-6 items-center justify-center rounded-full bg-white/10 text-sm">{user?.avatar}</div>
                  @{user?.username}
                </div>
              </div>

              {/* Text input */}
              <textarea
                value={storyText}
                onChange={(e) => setStoryText(e.target.value.slice(0, 200))}
                placeholder="What's on your mind? 🔥"
                rows={2}
                className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white placeholder:text-zinc-600 focus:border-[#00f0ff]/50 focus:outline-none resize-none"
              />
              <div className="text-right text-[10px] text-zinc-600">{storyText.length}/200</div>

              {/* Background colors */}
              <div>
                <label className="mb-2 block text-xs font-bold text-zinc-400">Background</label>
                <div className="flex gap-2">
                  {backgrounds.map((bg, i) => (
                    <button
                      key={i}
                      onClick={() => setBgIdx(i)}
                      className={`h-8 w-8 rounded-full bg-gradient-to-br ${bg} transition-all ${bgIdx === i ? "ring-2 ring-white scale-110" : "hover:scale-105"}`}
                    />
                  ))}
                </div>
              </div>

              {/* Upload image option */}
              <input ref={fileInputRef} type="file" accept="image/*,video/*" className="hidden" />
              <button
                onClick={() => fileInputRef.current?.click()}
                className="w-full flex items-center justify-center gap-2 rounded-xl border border-white/10 bg-white/5 py-3 text-sm text-zinc-400 hover:bg-white/10"
              >
                <Camera size={16} /> Upload Photo/Video
              </button>

              {/* Post */}
              <button
                onClick={() => setPosted(true)}
                disabled={!storyText.trim()}
                className="w-full flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-[#ff00e5] to-[#7b61ff] py-3 text-sm font-bold text-white disabled:opacity-40 hover:scale-[1.02] transition-all"
              >
                <Send size={16} /> Post Story
              </button>
            </>
          )}
        </div>
      </>
    );
  }

  return (
    <>
      <VibexHeader />
      <div className="p-4 space-y-4">
        <h1 className="text-xl font-black flex items-center gap-2">
          <Image size={20} className="text-[#ff00e5]" />
          Stories
        </h1>

        {/* Story circles */}
        <div className="flex gap-3 overflow-x-auto pb-2" style={{ scrollbarWidth: "none" }}>
          {/* Your story */}
          <button
            onClick={() => setCreating(true)}
            className="flex-shrink-0 flex flex-col items-center gap-1"
          >
            <div className="relative flex h-16 w-16 items-center justify-center rounded-full bg-white/10 text-2xl border-2 border-dashed border-[#00f0ff]/50">
              {user?.avatar}
              <div className="absolute -bottom-0.5 -right-0.5 flex h-5 w-5 items-center justify-center rounded-full bg-[#00f0ff] text-black">
                <Plus size={12} strokeWidth={3} />
              </div>
            </div>
            <span className="text-[10px] text-zinc-400 font-medium">Your story</span>
          </button>

          {/* Other stories */}
          {userStories.map(([userId, storyList], groupIdx) => {
            const storyUser = storyList[0].user;
            const startIdx = stories.findIndex((s) => s.id === storyList[0].id);
            return (
              <button
                key={userId}
                onClick={() => setViewingIdx(startIdx)}
                className="flex-shrink-0 flex flex-col items-center gap-1"
              >
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-white/10 text-2xl ring-2 ring-[#ff00e5] ring-offset-2 ring-offset-[#0a0a0f]">
                  {storyUser.avatar}
                </div>
                <span className="text-[10px] text-zinc-400 font-medium">{storyUser.username.slice(0, 8)}</span>
              </button>
            );
          })}
        </div>

        {/* Recent stories list */}
        <div>
          <h3 className="mb-2 text-xs font-bold text-zinc-400">Recent Stories</h3>
          <div className="space-y-2">
            {stories.map((story, idx) => (
              <button
                key={story.id}
                onClick={() => setViewingIdx(idx)}
                className="w-full flex items-center gap-3 rounded-xl border border-white/5 bg-white/[0.02] p-3 hover:bg-white/5 transition-all text-left"
              >
                <div className={`flex h-14 w-14 items-center justify-center rounded-xl bg-gradient-to-br ${story.backgroundColor || "from-purple-600 to-indigo-800"} text-sm font-bold text-white`}>
                  {story.text ? story.text.slice(0, 3) : "📸"}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <span className="text-sm">{story.user.avatar}</span>
                    <span className="text-sm font-bold">{story.user.displayName}</span>
                  </div>
                  <p className="text-xs text-zinc-500 truncate">{story.text || "Shared a photo"}</p>
                  <div className="flex items-center gap-2 mt-0.5 text-[10px] text-zinc-600">
                    <span><Eye size={9} className="inline" /> {story.viewers.length}</span>
                    <span>🔥{story.reactions.fire}</span>
                    <span>{new Date(story.createdAt).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}</span>
                  </div>
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
