"use client";

import { useState, useRef } from "react";
import { VibexHeader } from "@/components/vibex/VibexHeader";
import { useVibex } from "@/lib/vibex-context";
import { MOCK_FILTERS, TRENDING_SONGS } from "@/lib/vibex-data";
import {
  Camera, Video, Image, Check, ArrowLeft, Music, Send, Sparkles,
} from "lucide-react";
import Link from "next/link";

type PostStep = "media" | "filter" | "details" | "done";

export default function CreateReelPage() {
  const { isLoggedIn, user } = useVibex();
  const [step, setStep] = useState<PostStep>("media");
  const [mediaType, setMediaType] = useState<"image" | "video" | null>(null);
  const [uploadedMedia, setUploadedMedia] = useState<string | null>(null);
  const [uploadedFileName, setUploadedFileName] = useState("");
  const [selectedFilter, setSelectedFilter] = useState<string | null>(null);
  const [selectedSong, setSelectedSong] = useState<string | null>(null);
  const [caption, setCaption] = useState("");
  const [posting, setPosting] = useState(false);
  const [posted, setPosted] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploadedFileName(file.name);
    setMediaType(file.type.startsWith("video/") ? "video" : "image");
    const reader = new FileReader();
    reader.onload = (ev) => {
      setUploadedMedia(ev.target?.result as string);
      setStep("filter");
    };
    reader.readAsDataURL(file);
  };

  const handlePost = () => {
    setPosting(true);
    setTimeout(() => {
      setPosting(false);
      setPosted(true);
      setStep("done");
    }, 1500);
  };

  if (!isLoggedIn) {
    return (
      <>
        <VibexHeader />
        <div className="flex flex-col items-center justify-center p-8 pt-32 text-center">
          <Video size={48} className="mb-4 text-zinc-700" />
          <p className="mb-4 text-zinc-500">Sign up to post reels</p>
          <Link href="/vibex/signup" className="rounded-full bg-gradient-to-r from-[#ff00e5] to-[#7b61ff] px-6 py-2.5 text-sm font-bold text-white">
            Get Started
          </Link>
        </div>
      </>
    );
  }

  if (posted) {
    return (
      <>
        <VibexHeader />
        <div className="flex flex-col items-center justify-center p-8 pt-20 text-center space-y-4">
          <div className="flex h-20 w-20 items-center justify-center rounded-full bg-green-500/20 text-4xl animate-bounce">
            <Check size={40} className="text-green-400" />
          </div>
          <h2 className="text-2xl font-black">Posted!</h2>
          <p className="text-sm text-zinc-400">Your reel is now live on the feed</p>
          <div className="flex flex-col gap-2 w-full max-w-xs">
            <Link href="/vibex/reels" className="flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-[#ff00e5] to-[#7b61ff] py-3 text-sm font-bold text-white">
              <Video size={16} /> View Reels
            </Link>
            <Link href="/vibex/reels/create" className="flex items-center justify-center gap-2 rounded-xl border border-white/10 py-3 text-sm text-zinc-400 hover:bg-white/5">
              <Camera size={16} /> Post Another
            </Link>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <VibexHeader />
      <div className="p-4 space-y-4">
        {/* Header */}
        <div className="flex items-center gap-3">
          {step !== "media" && (
            <button
              onClick={() => {
                if (step === "filter") setStep("media");
                else if (step === "details") setStep("filter");
              }}
              className="flex h-8 w-8 items-center justify-center rounded-full bg-white/10 hover:bg-white/20"
            >
              <ArrowLeft size={16} />
            </button>
          )}
          <div>
            <h1 className="text-xl font-black flex items-center gap-2">
              <Sparkles size={20} className="text-[#00f0ff]" />
              Create Post
            </h1>
            <p className="text-xs text-zinc-500">
              {step === "media" && "Upload a video or image"}
              {step === "filter" && "Choose a filter (optional)"}
              {step === "details" && "Add caption & song"}
            </p>
          </div>
        </div>

        {/* Progress */}
        <div className="flex gap-1">
          {(["media", "filter", "details"] as PostStep[]).map((s, i) => (
            <div
              key={s}
              className={`h-1 flex-1 rounded-full transition-all ${
                (["media", "filter", "details"] as PostStep[]).indexOf(step) >= i
                  ? "bg-gradient-to-r from-[#00f0ff] to-[#7b61ff]"
                  : "bg-white/10"
              }`}
            />
          ))}
        </div>

        {/* Step: Upload media */}
        {step === "media" && (
          <div className="space-y-4">
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*,video/*"
              onChange={handleFileUpload}
              className="hidden"
            />

            {/* Record / Upload options */}
            <div className="grid grid-cols-2 gap-3">
              <button
                onClick={() => fileInputRef.current?.click()}
                className="rounded-2xl border border-white/10 bg-gradient-to-br from-[#ff00e5]/10 to-transparent p-6 text-center hover:border-[#ff00e5]/50 transition-all group"
              >
                <div className="flex h-14 w-14 mx-auto items-center justify-center rounded-2xl bg-[#ff00e5]/20 group-hover:scale-110 transition-transform">
                  <Video size={28} className="text-[#ff00e5]" />
                </div>
                <p className="mt-2 text-sm font-bold">Upload Video</p>
                <p className="text-[10px] text-zinc-500 mt-0.5">MP4, MOV, WebM</p>
              </button>

              <button
                onClick={() => fileInputRef.current?.click()}
                className="rounded-2xl border border-white/10 bg-gradient-to-br from-[#7b61ff]/10 to-transparent p-6 text-center hover:border-[#7b61ff]/50 transition-all group"
              >
                <div className="flex h-14 w-14 mx-auto items-center justify-center rounded-2xl bg-[#7b61ff]/20 group-hover:scale-110 transition-transform">
                  <Image size={28} className="text-[#7b61ff]" />
                </div>
                <p className="mt-2 text-sm font-bold">Upload Image</p>
                <p className="text-[10px] text-zinc-500 mt-0.5">PNG, JPG, GIF</p>
              </button>
            </div>

            <div className="text-center text-xs text-zinc-600">
              Your post will appear in the Reels feed for everyone to scroll and react to
            </div>
          </div>
        )}

        {/* Step: Choose filter */}
        {step === "filter" && (
          <div className="space-y-4">
            {/* Uploaded preview */}
            <div className="flex items-center gap-3 rounded-xl border border-white/10 bg-white/5 p-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-green-500/10">
                {mediaType === "video" ? <Video size={20} className="text-green-400" /> : <Image size={20} className="text-green-400" />}
              </div>
              <div className="flex-1">
                <p className="text-sm font-bold text-green-400">{mediaType === "video" ? "Video" : "Image"} uploaded</p>
                <p className="text-xs text-zinc-500 truncate">{uploadedFileName}</p>
              </div>
              <Check size={16} className="text-green-400" />
            </div>

            {/* Filter selection */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <h3 className="text-sm font-bold">Apply a Filter</h3>
                <button
                  onClick={() => { setSelectedFilter(null); setStep("details"); }}
                  className="text-xs text-zinc-500 hover:text-white"
                >
                  Skip
                </button>
              </div>
              <div className="grid grid-cols-3 gap-2">
                {MOCK_FILTERS.map((filter) => (
                  <button
                    key={filter.id}
                    onClick={() => setSelectedFilter(filter.id)}
                    className={`rounded-xl border p-3 text-center transition-all ${
                      selectedFilter === filter.id
                        ? "border-[#ff00e5]/50 bg-[#ff00e5]/10 scale-105"
                        : "border-white/10 bg-white/[0.02] hover:border-white/20"
                    }`}
                  >
                    <div className="text-2xl mb-1">{filter.thumbnail}</div>
                    <p className="text-[10px] font-semibold truncate">{filter.name}</p>
                    <p className="text-[9px] text-zinc-600">@{filter.creator.username}</p>
                  </button>
                ))}
              </div>
            </div>

            <button
              onClick={() => setStep("details")}
              className="w-full rounded-xl bg-gradient-to-r from-[#00f0ff] to-[#7b61ff] py-3 text-sm font-bold text-black hover:scale-[1.02] transition-all"
            >
              {selectedFilter ? "Continue with Filter" : "Continue without Filter"}
            </button>
          </div>
        )}

        {/* Step: Caption & details */}
        {step === "details" && (
          <div className="space-y-4">
            {/* Preview card */}
            <div className="rounded-xl border border-white/10 bg-white/5 p-3 space-y-2">
              <div className="flex items-center gap-2">
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-white/10 text-lg">
                  {user?.avatar || "🎭"}
                </div>
                <span className="text-sm font-bold">@{user?.username}</span>
              </div>
              <div className="flex items-center gap-2 text-xs text-zinc-500">
                {mediaType === "video" ? <Video size={12} /> : <Image size={12} />}
                <span>{uploadedFileName}</span>
                {selectedFilter && (
                  <span className="flex items-center gap-1 text-[#ff00e5]">
                    <Camera size={10} />
                    {MOCK_FILTERS.find((f) => f.id === selectedFilter)?.name}
                  </span>
                )}
              </div>
            </div>

            {/* Caption */}
            <div>
              <label className="mb-1 block text-xs font-bold text-zinc-400">Caption</label>
              <textarea
                value={caption}
                onChange={(e) => setCaption(e.target.value)}
                placeholder="Write something fire... 🔥"
                rows={3}
                className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white placeholder:text-zinc-600 focus:border-[#00f0ff]/50 focus:outline-none resize-none"
              />
              <div className="mt-1 text-right text-[10px] text-zinc-600">{caption.length}/300</div>
            </div>

            {/* Song picker */}
            {mediaType === "video" && (
              <div>
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-sm font-bold flex items-center gap-1.5">
                    <Music size={14} className="text-[#7b61ff]" />
                    Add Song
                  </h3>
                  {selectedSong && (
                    <button onClick={() => setSelectedSong(null)} className="text-xs text-zinc-500 hover:text-white">
                      Remove
                    </button>
                  )}
                </div>
                <div className="space-y-1.5 max-h-36 overflow-y-auto" style={{ scrollbarWidth: "thin" }}>
                  {TRENDING_SONGS.map((song) => (
                    <button
                      key={song.id}
                      onClick={() => setSelectedSong(selectedSong === song.id ? null : song.id)}
                      className={`w-full flex items-center gap-3 rounded-xl p-2 text-left transition-all ${
                        selectedSong === song.id
                          ? "bg-[#7b61ff]/20 border border-[#7b61ff]/50"
                          : "bg-white/[0.02] border border-white/5 hover:bg-white/5"
                      }`}
                    >
                      <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-white/10 text-sm">🎵</div>
                      <div className="flex-1">
                        <div className="text-xs font-bold">{song.title}</div>
                        <div className="text-[10px] text-zinc-500">{song.artist}</div>
                      </div>
                      {selectedSong === song.id && <Check size={14} className="text-[#7b61ff]" />}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Post button */}
            <button
              onClick={handlePost}
              disabled={!caption.trim() || posting}
              className={`w-full flex items-center justify-center gap-2 rounded-xl py-3 text-sm font-bold transition-all ${
                posting
                  ? "bg-zinc-800 text-zinc-500 cursor-wait"
                  : "bg-gradient-to-r from-[#ff00e5] to-[#7b61ff] text-white hover:scale-[1.02] disabled:opacity-40 disabled:hover:scale-100"
              }`}
            >
              {posting ? (
                <><Sparkles size={16} className="animate-spin" /> Posting...</>
              ) : (
                <><Send size={16} /> Post to Reels</>
              )}
            </button>
          </div>
        )}
      </div>
    </>
  );
}
