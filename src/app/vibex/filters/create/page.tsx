"use client";

import { useState, useRef } from "react";
import { VibexHeader } from "@/components/vibex/VibexHeader";
import { useVibex } from "@/lib/vibex-context";
import { FILTER_OVERLAYS, TRENDING_SONGS } from "@/lib/vibex-data";
import type { FilterOverlay } from "@/lib/vibex-types";
import {
  Camera, Video, Upload, Image, X, RotateCw, Plus, Minus,
  Sparkles, Music, Check, ArrowLeft, Eye, Share2, Trash2,
} from "lucide-react";
import Link from "next/link";

type CreatorStep = "type" | "upload" | "overlays" | "details" | "preview";

interface PlacedOverlay extends FilterOverlay {
  instanceId: string;
}

export default function CreateFilterPage() {
  const { isLoggedIn, user } = useVibex();
  const [step, setStep] = useState<CreatorStep>("type");
  const [filterType, setFilterType] = useState<"camera" | "video" | null>(null);
  const [uploadedMedia, setUploadedMedia] = useState<string | null>(null);
  const [uploadedFileName, setUploadedFileName] = useState("");
  const [placedOverlays, setPlacedOverlays] = useState<PlacedOverlay[]>([]);
  const [selectedOverlay, setSelectedOverlay] = useState<string | null>(null);
  const [filterName, setFilterName] = useState("");
  const [filterTags, setFilterTags] = useState("");
  const [selectedSong, setSelectedSong] = useState<string | null>(null);
  const [publishing, setPublishing] = useState(false);
  const [published, setPublished] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploadedFileName(file.name);
    const reader = new FileReader();
    reader.onload = (ev) => {
      setUploadedMedia(ev.target?.result as string);
      setStep("overlays");
    };
    reader.readAsDataURL(file);
  };

  const addOverlay = (overlay: FilterOverlay) => {
    setPlacedOverlays((prev) => [
      ...prev,
      { ...overlay, instanceId: `inst_${crypto.randomUUID()}`, position: { x: 50, y: 50 }, scale: 1, rotation: 0 },
    ]);
  };

  const removeOverlay = (instanceId: string) => {
    setPlacedOverlays((prev) => prev.filter((o) => o.instanceId !== instanceId));
    if (selectedOverlay === instanceId) setSelectedOverlay(null);
  };

  const moveOverlay = (instanceId: string, dx: number, dy: number) => {
    setPlacedOverlays((prev) =>
      prev.map((o) =>
        o.instanceId === instanceId ? { ...o, position: { x: Math.max(0, Math.min(100, o.position.x + dx)), y: Math.max(0, Math.min(100, o.position.y + dy)) } } : o
      )
    );
  };

  const scaleOverlay = (instanceId: string, delta: number) => {
    setPlacedOverlays((prev) =>
      prev.map((o) =>
        o.instanceId === instanceId ? { ...o, scale: Math.max(0.3, Math.min(3, o.scale + delta)) } : o
      )
    );
  };

  const handlePublish = () => {
    setPublishing(true);
    setTimeout(() => {
      setPublishing(false);
      setPublished(true);
    }, 2000);
  };

  if (!isLoggedIn) {
    return (
      <>
        <VibexHeader />
        <div className="flex flex-col items-center justify-center p-8 pt-32 text-center">
          <Camera size={48} className="mb-4 text-zinc-700" />
          <p className="mb-4 text-zinc-500">Sign up to create filters</p>
          <Link href="/vibex/signup" className="rounded-full bg-gradient-to-r from-[#ff00e5] to-[#7b61ff] px-6 py-2.5 text-sm font-bold text-white">
            Get Started
          </Link>
        </div>
      </>
    );
  }

  if (published) {
    return (
      <>
        <VibexHeader />
        <div className="flex flex-col items-center justify-center p-8 pt-20 text-center space-y-4">
          <div className="flex h-20 w-20 items-center justify-center rounded-full bg-green-500/20 text-4xl animate-bounce">
            <Check size={40} className="text-green-400" />
          </div>
          <h2 className="text-2xl font-black">Filter Published!</h2>
          <p className="text-sm text-zinc-400">Your filter &quot;{filterName}&quot; is now live in the gallery</p>
          <div className="flex flex-col gap-2 w-full max-w-xs">
            <Link href="/vibex/filters" className="flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-[#ff00e5] to-[#7b61ff] py-3 text-sm font-bold text-white">
              <Eye size={16} /> View in Gallery
            </Link>
            <Link href="/vibex/filters/create" className="flex items-center justify-center gap-2 rounded-xl border border-white/10 py-3 text-sm text-zinc-400 hover:bg-white/5">
              <Plus size={16} /> Create Another
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
          {step !== "type" && (
            <button
              onClick={() => {
                if (step === "upload") setStep("type");
                else if (step === "overlays") setStep("upload");
                else if (step === "details") setStep("overlays");
                else if (step === "preview") setStep("details");
              }}
              className="flex h-8 w-8 items-center justify-center rounded-full bg-white/10 hover:bg-white/20"
            >
              <ArrowLeft size={16} />
            </button>
          )}
          <div>
            <h1 className="text-xl font-black flex items-center gap-2">
              <Sparkles size={20} className="text-[#ff00e5]" />
              Creator Studio
            </h1>
            <p className="text-xs text-zinc-500">
              {step === "type" && "Choose what to create"}
              {step === "upload" && "Upload your media"}
              {step === "overlays" && "Add overlays & effects"}
              {step === "details" && "Name & tag your filter"}
              {step === "preview" && "Preview & publish"}
            </p>
          </div>
        </div>

        {/* Progress */}
        <div className="flex gap-1">
          {(["type", "upload", "overlays", "details", "preview"] as CreatorStep[]).map((s, i) => (
            <div
              key={s}
              className={`h-1 flex-1 rounded-full transition-all ${
                (["type", "upload", "overlays", "details", "preview"] as CreatorStep[]).indexOf(step) >= i
                  ? "bg-gradient-to-r from-[#ff00e5] to-[#7b61ff]"
                  : "bg-white/10"
              }`}
            />
          ))}
        </div>

        {/* Step: Choose type */}
        {step === "type" && (
          <div className="space-y-3">
            <button
              onClick={() => { setFilterType("camera"); setStep("upload"); }}
              className="w-full rounded-2xl border border-white/10 bg-gradient-to-br from-[#ff00e5]/10 to-transparent p-6 text-left hover:border-[#ff00e5]/50 transition-all group"
            >
              <div className="flex items-center gap-4">
                <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-[#ff00e5]/20 group-hover:scale-110 transition-transform">
                  <Camera size={28} className="text-[#ff00e5]" />
                </div>
                <div>
                  <h3 className="text-base font-bold">Camera Filter</h3>
                  <p className="text-xs text-zinc-400 mt-0.5">Upload an image or selfie — it becomes a camera filter overlay. Others use it on their face!</p>
                </div>
              </div>
              <div className="mt-3 flex flex-wrap gap-1">
                <span className="rounded-full bg-white/5 px-2 py-0.5 text-[10px] text-zinc-500">Mustaches</span>
                <span className="rounded-full bg-white/5 px-2 py-0.5 text-[10px] text-zinc-500">Glasses</span>
                <span className="rounded-full bg-white/5 px-2 py-0.5 text-[10px] text-zinc-500">Hats</span>
                <span className="rounded-full bg-white/5 px-2 py-0.5 text-[10px] text-zinc-500">Face Paint</span>
                <span className="rounded-full bg-white/5 px-2 py-0.5 text-[10px] text-zinc-500">Stickers</span>
              </div>
            </button>

            <button
              onClick={() => { setFilterType("video"); setStep("upload"); }}
              className="w-full rounded-2xl border border-white/10 bg-gradient-to-br from-[#7b61ff]/10 to-transparent p-6 text-left hover:border-[#7b61ff]/50 transition-all group"
            >
              <div className="flex items-center gap-4">
                <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-[#7b61ff]/20 group-hover:scale-110 transition-transform">
                  <Video size={28} className="text-[#7b61ff]" />
                </div>
                <div>
                  <h3 className="text-base font-bold">Video Filter</h3>
                  <p className="text-xs text-zinc-400 mt-0.5">Record or upload a video to a song — it becomes a reusable video template for everyone!</p>
                </div>
              </div>
              <div className="mt-3 flex flex-wrap gap-1">
                <span className="rounded-full bg-white/5 px-2 py-0.5 text-[10px] text-zinc-500">Dance</span>
                <span className="rounded-full bg-white/5 px-2 py-0.5 text-[10px] text-zinc-500">Lip Sync</span>
                <span className="rounded-full bg-white/5 px-2 py-0.5 text-[10px] text-zinc-500">Transitions</span>
                <span className="rounded-full bg-white/5 px-2 py-0.5 text-[10px] text-zinc-500">Effects</span>
              </div>
            </button>

            <button
              onClick={() => { setFilterType("camera"); setStep("upload"); }}
              className="w-full rounded-2xl border border-white/10 bg-gradient-to-br from-[#00f0ff]/10 to-transparent p-6 text-left hover:border-[#00f0ff]/50 transition-all group"
            >
              <div className="flex items-center gap-4">
                <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-[#00f0ff]/20 group-hover:scale-110 transition-transform">
                  <Upload size={28} className="text-[#00f0ff]" />
                </div>
                <div>
                  <h3 className="text-base font-bold">Upload & Convert</h3>
                  <p className="text-xs text-zinc-400 mt-0.5">Upload ANY image or video — the app auto-converts it into a filter that anyone can use!</p>
                </div>
              </div>
            </button>
          </div>
        )}

        {/* Step: Upload media */}
        {step === "upload" && (
          <div className="space-y-4">
            <input
              ref={fileInputRef}
              type="file"
              accept={filterType === "video" ? "video/*,image/*" : "image/*"}
              onChange={handleFileUpload}
              className="hidden"
            />

            {!uploadedMedia ? (
              <button
                onClick={() => fileInputRef.current?.click()}
                className="w-full rounded-2xl border-2 border-dashed border-white/20 bg-white/[0.02] p-12 text-center hover:border-[#ff00e5]/50 transition-all"
              >
                <div className="flex flex-col items-center gap-3">
                  <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-[#ff00e5]/10">
                    <Upload size={32} className="text-[#ff00e5]" />
                  </div>
                  <div>
                    <p className="text-sm font-bold">
                      {filterType === "video" ? "Upload Image or Video" : "Upload Image"}
                    </p>
                    <p className="text-xs text-zinc-500 mt-1">
                      {filterType === "video"
                        ? "Record a dance, lip sync, or upload any video/image"
                        : "Selfie, drawing, photo — anything becomes a filter!"
                      }
                    </p>
                  </div>
                  <div className="flex gap-2 text-[10px] text-zinc-600">
                    <span>PNG</span><span>JPG</span><span>GIF</span>
                    {filterType === "video" && <><span>MP4</span><span>MOV</span></>}
                  </div>
                </div>
              </button>
            ) : (
              <div className="space-y-3">
                <div className="relative rounded-2xl border border-white/10 overflow-hidden">
                  <div className="h-64 bg-gradient-to-br from-[#7b61ff]/20 via-[#00f0ff]/10 to-[#ff00e5]/20 flex items-center justify-center">
                    <div className="text-center">
                      <Image size={48} className="mx-auto mb-2 text-green-400" />
                      <p className="text-sm font-bold text-green-400">Uploaded!</p>
                      <p className="text-xs text-zinc-500 mt-1">{uploadedFileName}</p>
                    </div>
                  </div>
                  <button
                    onClick={() => { setUploadedMedia(null); setUploadedFileName(""); }}
                    className="absolute top-2 right-2 flex h-8 w-8 items-center justify-center rounded-full bg-black/60 hover:bg-red-500/50"
                  >
                    <X size={14} />
                  </button>
                </div>
                <button
                  onClick={() => setStep("overlays")}
                  className="w-full rounded-xl bg-gradient-to-r from-[#ff00e5] to-[#7b61ff] py-3 text-sm font-bold text-white hover:scale-[1.02] transition-all"
                >
                  Continue to Edit
                </button>
              </div>
            )}

            {/* Song picker for video filters */}
            {filterType === "video" && (
              <div>
                <h3 className="mb-2 text-sm font-bold text-zinc-400 flex items-center gap-1.5">
                  <Music size={14} />
                  Pick a Song (optional)
                </h3>
                <div className="space-y-1.5 max-h-48 overflow-y-auto" style={{ scrollbarWidth: "thin" }}>
                  {TRENDING_SONGS.map((song) => (
                    <button
                      key={song.id}
                      onClick={() => setSelectedSong(selectedSong === song.id ? null : song.id)}
                      className={`w-full flex items-center gap-3 rounded-xl p-2.5 text-left transition-all ${
                        selectedSong === song.id
                          ? "bg-[#7b61ff]/20 border border-[#7b61ff]/50"
                          : "bg-white/[0.02] border border-white/5 hover:bg-white/5"
                      }`}
                    >
                      <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-white/10 text-sm">🎵</div>
                      <div className="flex-1">
                        <div className="text-xs font-bold">{song.title}</div>
                        <div className="text-[10px] text-zinc-500">{song.artist} · {song.duration}</div>
                      </div>
                      {selectedSong === song.id && <Check size={14} className="text-[#7b61ff]" />}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}

        {/* Step: Add overlays */}
        {step === "overlays" && (
          <div className="space-y-4">
            {/* Canvas area */}
            <div className="relative rounded-2xl border border-white/10 bg-gradient-to-br from-zinc-900 to-[#0a0a0f] overflow-hidden" style={{ aspectRatio: "3/4" }}>
              {/* Face placeholder */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="relative">
                  <div className="h-32 w-28 rounded-[50%] border-2 border-dashed border-white/20" />
                  <div className="absolute top-8 left-5 flex gap-4">
                    <div className="h-3 w-3 rounded-full border border-white/20" />
                    <div className="h-3 w-3 rounded-full border border-white/20" />
                  </div>
                  <div className="absolute bottom-8 left-1/2 -translate-x-1/2 h-2 w-6 rounded-full border border-white/20" />
                </div>
              </div>

              {/* Placed overlays */}
              {placedOverlays.map((ov) => (
                <button
                  key={ov.instanceId}
                  onClick={() => setSelectedOverlay(selectedOverlay === ov.instanceId ? null : ov.instanceId)}
                  className={`absolute transition-all cursor-move ${selectedOverlay === ov.instanceId ? "ring-2 ring-[#00f0ff] ring-offset-1 ring-offset-transparent rounded-lg" : ""}`}
                  style={{
                    left: `${ov.position.x}%`,
                    top: `${ov.position.y}%`,
                    transform: `translate(-50%, -50%) scale(${ov.scale}) rotate(${ov.rotation}deg)`,
                    fontSize: `${2 * ov.scale}rem`,
                  }}
                >
                  {ov.emoji}
                </button>
              ))}

              {/* Uploaded media indicator */}
              {uploadedMedia && (
                <div className="absolute top-2 left-2 flex items-center gap-1.5 rounded-lg bg-green-500/20 border border-green-500/30 px-2 py-1 text-[10px] text-green-400">
                  <Check size={10} /> Media loaded
                </div>
              )}
            </div>

            {/* Selected overlay controls */}
            {selectedOverlay && (
              <div className="flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 p-2">
                <span className="text-xs text-zinc-400 flex-shrink-0">Selected:</span>
                <div className="flex-1 flex items-center gap-1.5">
                  <button onClick={() => moveOverlay(selectedOverlay, 0, -5)} className="flex h-7 w-7 items-center justify-center rounded-lg bg-white/10 text-xs hover:bg-white/20">↑</button>
                  <button onClick={() => moveOverlay(selectedOverlay, 0, 5)} className="flex h-7 w-7 items-center justify-center rounded-lg bg-white/10 text-xs hover:bg-white/20">↓</button>
                  <button onClick={() => moveOverlay(selectedOverlay, -5, 0)} className="flex h-7 w-7 items-center justify-center rounded-lg bg-white/10 text-xs hover:bg-white/20">←</button>
                  <button onClick={() => moveOverlay(selectedOverlay, 5, 0)} className="flex h-7 w-7 items-center justify-center rounded-lg bg-white/10 text-xs hover:bg-white/20">→</button>
                  <button onClick={() => scaleOverlay(selectedOverlay, 0.2)} className="flex h-7 w-7 items-center justify-center rounded-lg bg-white/10 hover:bg-white/20"><Plus size={12} /></button>
                  <button onClick={() => scaleOverlay(selectedOverlay, -0.2)} className="flex h-7 w-7 items-center justify-center rounded-lg bg-white/10 hover:bg-white/20"><Minus size={12} /></button>
                  <button onClick={() => removeOverlay(selectedOverlay)} className="flex h-7 w-7 items-center justify-center rounded-lg bg-red-500/20 text-red-400 hover:bg-red-500/30"><Trash2 size={12} /></button>
                </div>
              </div>
            )}

            {/* Overlay picker */}
            <div>
              <h3 className="mb-2 text-xs font-bold text-zinc-400 uppercase tracking-wider">Add Overlays</h3>
              <div className="grid grid-cols-4 gap-2">
                {FILTER_OVERLAYS.map((ov) => (
                  <button
                    key={ov.id}
                    onClick={() => addOverlay(ov)}
                    className="flex flex-col items-center gap-1 rounded-xl border border-white/10 bg-white/5 p-2 hover:bg-white/10 hover:border-[#ff00e5]/50 transition-all"
                  >
                    <span className="text-2xl">{ov.emoji}</span>
                    <span className="text-[9px] text-zinc-500 truncate w-full text-center">{ov.label}</span>
                  </button>
                ))}
              </div>
            </div>

            <button
              onClick={() => setStep("details")}
              className="w-full rounded-xl bg-gradient-to-r from-[#ff00e5] to-[#7b61ff] py-3 text-sm font-bold text-white hover:scale-[1.02] transition-all"
            >
              Continue
            </button>
          </div>
        )}

        {/* Step: Details */}
        {step === "details" && (
          <div className="space-y-4">
            <div>
              <label className="mb-1 block text-xs font-bold text-zinc-400">Filter Name</label>
              <input
                type="text"
                value={filterName}
                onChange={(e) => setFilterName(e.target.value)}
                placeholder="e.g. Lagos Drip, Havana Nights..."
                className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white placeholder:text-zinc-600 focus:border-[#ff00e5]/50 focus:outline-none"
              />
            </div>
            <div>
              <label className="mb-1 block text-xs font-bold text-zinc-400">Tags (comma separated)</label>
              <input
                type="text"
                value={filterTags}
                onChange={(e) => setFilterTags(e.target.value)}
                placeholder="e.g. funny, dance, cool, nigeria..."
                className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white placeholder:text-zinc-600 focus:border-[#ff00e5]/50 focus:outline-none"
              />
            </div>

            {/* Preview info */}
            <div className="rounded-xl border border-white/10 bg-white/5 p-4 space-y-2">
              <h3 className="text-xs font-bold text-zinc-400">Summary</h3>
              <div className="flex items-center justify-between text-xs">
                <span className="text-zinc-500">Type</span>
                <span className="flex items-center gap-1 font-semibold">
                  {filterType === "camera" ? <Camera size={12} /> : <Video size={12} />}
                  {filterType === "camera" ? "Camera Filter" : "Video Filter"}
                </span>
              </div>
              <div className="flex items-center justify-between text-xs">
                <span className="text-zinc-500">Overlays</span>
                <span className="font-semibold">{placedOverlays.length} items</span>
              </div>
              <div className="flex items-center justify-between text-xs">
                <span className="text-zinc-500">Media</span>
                <span className="font-semibold text-green-400">{uploadedFileName || "None"}</span>
              </div>
              {selectedSong && (
                <div className="flex items-center justify-between text-xs">
                  <span className="text-zinc-500">Song</span>
                  <span className="font-semibold flex items-center gap-1">🎵 {TRENDING_SONGS.find((s) => s.id === selectedSong)?.title}</span>
                </div>
              )}
            </div>

            <button
              onClick={() => setStep("preview")}
              disabled={!filterName.trim()}
              className="w-full rounded-xl bg-gradient-to-r from-[#ff00e5] to-[#7b61ff] py-3 text-sm font-bold text-white hover:scale-[1.02] transition-all disabled:opacity-40 disabled:hover:scale-100"
            >
              Preview
            </button>
          </div>
        )}

        {/* Step: Preview & Publish */}
        {step === "preview" && (
          <div className="space-y-4">
            {/* Filter preview card */}
            <div className="rounded-2xl border border-white/10 bg-gradient-to-b from-white/[0.06] to-transparent overflow-hidden">
              <div className="relative h-48 bg-gradient-to-br from-[#ff00e5]/20 via-[#7b61ff]/10 to-[#00f0ff]/20 flex items-center justify-center">
                <div className="relative">
                  <div className="flex h-20 w-20 items-center justify-center rounded-full bg-white/10 text-4xl">
                    {user?.avatar || "🎭"}
                  </div>
                  {placedOverlays.slice(0, 3).map((ov, i) => (
                    <span
                      key={ov.instanceId}
                      className="absolute text-xl"
                      style={{ top: `${10 + i * 25}%`, left: `${60 + i * 12}%` }}
                    >
                      {ov.emoji}
                    </span>
                  ))}
                </div>
                <div className="absolute top-2 left-2 flex items-center gap-1 rounded-full bg-black/50 px-2 py-0.5 text-xs">
                  {filterType === "camera" ? <Camera size={10} /> : <Video size={10} />}
                  {filterType === "camera" ? "Camera" : "Video"}
                </div>
              </div>
              <div className="p-4">
                <h3 className="text-lg font-black">{filterName}</h3>
                <p className="text-xs text-zinc-500">by @{user?.username}</p>
                <div className="mt-2 flex flex-wrap gap-1">
                  {filterTags.split(",").filter(Boolean).map((t) => (
                    <span key={t.trim()} className="rounded-full bg-white/5 px-2 py-0.5 text-[10px] text-zinc-500">#{t.trim()}</span>
                  ))}
                </div>
              </div>
            </div>

            <div className="flex gap-2">
              <button
                onClick={handlePublish}
                disabled={publishing}
                className={`flex-1 flex items-center justify-center gap-2 rounded-xl py-3 text-sm font-bold transition-all ${
                  publishing ? "bg-zinc-800 text-zinc-500 cursor-wait" : "bg-gradient-to-r from-[#ff00e5] to-[#7b61ff] text-white hover:scale-[1.02]"
                }`}
              >
                {publishing ? (
                  <><RotateCw size={16} className="animate-spin" /> Converting...</>
                ) : (
                  <><Share2 size={16} /> Publish Filter</>
                )}
              </button>
            </div>

            <p className="text-center text-[10px] text-zinc-600">
              Once published, anyone on VibeX can download and use your filter. You&apos;ll earn coins when your filter goes viral!
            </p>
          </div>
        )}
      </div>
    </>
  );
}
