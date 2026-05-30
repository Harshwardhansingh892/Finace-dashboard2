"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useVibex } from "@/lib/vibex-context";
import { AVATARS } from "@/lib/vibex-data";
import { COUNTRY_INFO, type CountryCode } from "@/lib/vibex-types";
import { Zap, ArrowRight, Coins, Flame, Trophy } from "lucide-react";
import Link from "next/link";

export default function SignupPage() {
  const router = useRouter();
  const { login, isLoggedIn } = useVibex();
  const [step, setStep] = useState(0);
  const [username, setUsername] = useState("");
  const [displayName, setDisplayName] = useState("");
  const [avatar, setAvatar] = useState("");
  const [country, setCountry] = useState<CountryCode | "">("");
  const [error, setError] = useState("");

  if (isLoggedIn) {
    router.push("/vibex");
    return null;
  }

  const handleNext = () => {
    if (step === 0) {
      if (!username.trim() || username.length < 3) {
        setError("Username must be at least 3 characters");
        return;
      }
      if (/[^a-zA-Z0-9_]/.test(username)) {
        setError("Only letters, numbers, and underscores");
        return;
      }
      setError("");
      setStep(1);
    } else if (step === 1) {
      if (!displayName.trim()) {
        setError("Enter a display name");
        return;
      }
      setError("");
      setStep(2);
    } else if (step === 2) {
      if (!avatar) {
        setError("Pick your avatar");
        return;
      }
      setError("");
      setStep(3);
    } else if (step === 3) {
      if (!country) {
        setError("Select your country");
        return;
      }
      login(username.toLowerCase(), displayName, avatar, country);
      router.push("/vibex");
    }
  };

  return (
    <div className="flex min-h-screen flex-col items-center justify-center p-6">
      <div className="w-full max-w-sm">
        {/* Logo */}
        <div className="mb-8 text-center">
          <h1 className="text-4xl font-black tracking-tighter">
            <span className="bg-gradient-to-r from-[#00f0ff] via-[#7b61ff] to-[#ff00e5] bg-clip-text text-transparent">
              VibeX
            </span>
          </h1>
          <p className="mt-1 text-sm text-zinc-500">Predict. Battle. Win.</p>
        </div>

        {/* Progress */}
        <div className="mb-8 flex items-center gap-2">
          {[0, 1, 2, 3].map((s) => (
            <div
              key={s}
              className={`h-1 flex-1 rounded-full transition-all ${
                s <= step ? "bg-gradient-to-r from-[#00f0ff] to-[#7b61ff]" : "bg-white/10"
              }`}
            />
          ))}
        </div>

        {/* Step 0: Username */}
        {step === 0 && (
          <div className="space-y-4">
            <div>
              <label className="mb-2 block text-sm font-semibold text-zinc-400">Choose your username</label>
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="blazeking"
                maxLength={20}
                className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-lg font-medium outline-none transition-all focus:border-[#00f0ff]/50 focus:ring-2 focus:ring-[#00f0ff]/20"
                autoFocus
                onKeyDown={(e) => e.key === "Enter" && handleNext()}
              />
            </div>
            <p className="text-xs text-zinc-600">This is how others will find you</p>
          </div>
        )}

        {/* Step 1: Display Name */}
        {step === 1 && (
          <div className="space-y-4">
            <div>
              <label className="mb-2 block text-sm font-semibold text-zinc-400">Your display name</label>
              <input
                type="text"
                value={displayName}
                onChange={(e) => setDisplayName(e.target.value)}
                placeholder="BlazeKing"
                maxLength={30}
                className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-lg font-medium outline-none transition-all focus:border-[#00f0ff]/50 focus:ring-2 focus:ring-[#00f0ff]/20"
                autoFocus
                onKeyDown={(e) => e.key === "Enter" && handleNext()}
              />
            </div>
          </div>
        )}

        {/* Step 2: Avatar */}
        {step === 2 && (
          <div className="space-y-4">
            <label className="block text-sm font-semibold text-zinc-400">Pick your avatar</label>
            <div className="grid grid-cols-4 gap-3">
              {AVATARS.map((a) => (
                <button
                  key={a}
                  onClick={() => setAvatar(a)}
                  className={`flex h-16 w-full items-center justify-center rounded-2xl border text-3xl transition-all ${
                    avatar === a
                      ? "border-[#00f0ff] bg-[#00f0ff]/20 scale-110 shadow-[0_0_20px_rgba(0,240,255,0.3)]"
                      : "border-white/10 bg-white/5 hover:border-white/20 hover:scale-105"
                  }`}
                >
                  {a}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Step 3: Country */}
        {step === 3 && (
          <div className="space-y-4">
            <label className="block text-sm font-semibold text-zinc-400">Where are you from?</label>
            <div className="grid grid-cols-2 gap-3">
              {(Object.entries(COUNTRY_INFO) as [CountryCode, typeof COUNTRY_INFO[CountryCode]][]).map(([code, info]) => (
                <button
                  key={code}
                  onClick={() => setCountry(code)}
                  className={`flex flex-col items-center gap-2 rounded-2xl border p-4 transition-all ${
                    country === code
                      ? "border-[#00f0ff] bg-[#00f0ff]/20 scale-105 shadow-[0_0_20px_rgba(0,240,255,0.3)]"
                      : "border-white/10 bg-white/5 hover:border-white/20"
                  }`}
                >
                  <span className="text-3xl">{info.flag}</span>
                  <span className="text-sm font-semibold">{info.name}</span>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Error */}
        {error && (
          <p className="mt-3 text-sm text-red-400">{error}</p>
        )}

        {/* Next Button */}
        <button
          onClick={handleNext}
          className="mt-6 flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-[#00f0ff] to-[#7b61ff] py-3.5 text-sm font-bold text-black transition-all hover:scale-[1.02] hover:shadow-[0_0_30px_rgba(0,240,255,0.3)] active:scale-95"
        >
          {step === 3 ? (
            <>
              <Zap size={18} />
              Start Vibing — Get 5,000 Coins
            </>
          ) : (
            <>
              Next <ArrowRight size={16} />
            </>
          )}
        </button>

        {/* Login link */}
        <p className="mt-4 text-center text-xs text-zinc-500">
          Already have an account?{" "}
          <Link href="/vibex/login" className="text-[#00f0ff] hover:underline">
            Log in
          </Link>
        </p>

        {/* Perks */}
        {step === 0 && (
          <div className="mt-8 space-y-3">
            <div className="flex items-center gap-3 rounded-xl border border-white/5 bg-white/[0.02] p-3">
              <Coins size={20} className="text-yellow-400" />
              <span className="text-xs text-zinc-400">5,000 free coins on signup</span>
            </div>
            <div className="flex items-center gap-3 rounded-xl border border-white/5 bg-white/[0.02] p-3">
              <Flame size={20} className="text-orange-400" />
              <span className="text-xs text-zinc-400">Daily streaks multiply your rewards</span>
            </div>
            <div className="flex items-center gap-3 rounded-xl border border-white/5 bg-white/[0.02] p-3">
              <Trophy size={20} className="text-purple-400" />
              <span className="text-xs text-zinc-400">Compete with players from your country</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
