"use client";

import { useState, useRef, useCallback } from "react";
import { VibexHeader } from "@/components/vibex/VibexHeader";
import { useVibex } from "@/lib/vibex-context";
import { SPIN_REWARDS } from "@/lib/vibex-data";
import { RotateCw, Coins, Sparkles, Gift, Lock } from "lucide-react";
import Link from "next/link";

function weightedRandom() {
  const rand = Math.random();
  let cumulative = 0;
  for (let i = 0; i < SPIN_REWARDS.length; i++) {
    cumulative += SPIN_REWARDS[i].probability;
    if (rand <= cumulative) return i;
  }
  return 0;
}

export default function SpinPage() {
  const { isLoggedIn, todaySpun, addCoins, markSpun } = useVibex();
  const [spinning, setSpinning] = useState(false);
  const [resultIndex, setResultIndex] = useState<number | null>(null);
  const [rotation, setRotation] = useState(0);
  const wheelRef = useRef<HTMLDivElement>(null);

  const spin = useCallback(() => {
    if (spinning || todaySpun || !isLoggedIn) return;
    setSpinning(true);
    setResultIndex(null);

    const winIndex = weightedRandom();
    const segmentAngle = 360 / SPIN_REWARDS.length;
    const targetAngle = 360 - (winIndex * segmentAngle + segmentAngle / 2);
    const totalRotation = rotation + 1440 + targetAngle;

    setRotation(totalRotation);

    setTimeout(() => {
      setSpinning(false);
      setResultIndex(winIndex);
      const reward = SPIN_REWARDS[winIndex];
      addCoins(reward.coins, `Daily Spin: ${reward.coins} coins!`, "spin");
      markSpun();
    }, 4000);
  }, [spinning, todaySpun, isLoggedIn, rotation, addCoins, markSpun]);

  const segmentAngle = 360 / SPIN_REWARDS.length;

  return (
    <>
      <VibexHeader />
      <div className="flex flex-col items-center p-6 space-y-6">
        <div className="text-center">
          <h1 className="text-2xl font-black flex items-center gap-2 justify-center">
            <Sparkles size={24} className="text-yellow-400" />
            Daily Spin
          </h1>
          <p className="mt-1 text-sm text-zinc-500">Spin once every day for free coins</p>
        </div>

        {/* Wheel */}
        <div className="relative">
          {/* Pointer */}
          <div className="absolute -top-2 left-1/2 z-20 -translate-x-1/2">
            <div className="h-0 w-0 border-l-[12px] border-r-[12px] border-t-[20px] border-l-transparent border-r-transparent border-t-[#00f0ff] drop-shadow-[0_0_10px_rgba(0,240,255,0.5)]" />
          </div>

          {/* Wheel container */}
          <div
            ref={wheelRef}
            className="relative h-72 w-72 rounded-full border-4 border-white/20 shadow-[0_0_40px_rgba(0,240,255,0.15)]"
            style={{
              transform: `rotate(${rotation}deg)`,
              transition: spinning ? "transform 4s cubic-bezier(0.17, 0.67, 0.12, 0.99)" : "none",
            }}
          >
            {SPIN_REWARDS.map((reward, i) => {
              const startAngle = i * segmentAngle;
              const midAngle = startAngle + segmentAngle / 2;
              const rad = (midAngle * Math.PI) / 180;
              const x = 50 + 32 * Math.sin(rad);
              const y = 50 - 32 * Math.cos(rad);

              return (
                <div key={reward.id}>
                  {/* Segment background using conic gradient */}
                  <div
                    className="absolute inset-0 rounded-full"
                    style={{
                      background: `conic-gradient(from ${startAngle}deg, ${reward.color}30 0deg, ${reward.color}15 ${segmentAngle}deg, transparent ${segmentAngle}deg)`,
                    }}
                  />
                  {/* Label */}
                  <div
                    className="absolute text-sm font-black"
                    style={{
                      left: `${x}%`,
                      top: `${y}%`,
                      transform: "translate(-50%, -50%)",
                      color: reward.color,
                      textShadow: `0 0 10px ${reward.color}80`,
                    }}
                  >
                    {reward.label}
                  </div>
                  {/* Divider line */}
                  <div
                    className="absolute top-1/2 left-1/2 h-[1px] w-1/2 origin-left"
                    style={{
                      transform: `rotate(${startAngle}deg)`,
                      background: "rgba(255,255,255,0.1)",
                    }}
                  />
                </div>
              );
            })}
            {/* Center circle */}
            <div className="absolute inset-0 m-auto h-16 w-16 rounded-full bg-[#0a0a0f] border-2 border-white/20 flex items-center justify-center">
              <Coins size={24} className="text-yellow-400" />
            </div>
          </div>

          {/* Glow ring */}
          <div className="absolute inset-0 rounded-full border border-[#00f0ff]/20 animate-pulse" />
        </div>

        {/* Spin button */}
        {isLoggedIn ? (
          todaySpun && resultIndex === null ? (
            <div className="text-center space-y-2">
              <div className="flex items-center gap-2 justify-center text-zinc-500">
                <Lock size={16} />
                <span className="text-sm font-semibold">Come back tomorrow!</span>
              </div>
              <p className="text-xs text-zinc-600">Daily spin resets at midnight</p>
            </div>
          ) : (
            <button
              onClick={spin}
              disabled={spinning || todaySpun}
              className={`flex items-center gap-2 rounded-full px-8 py-3.5 text-base font-bold transition-all ${
                spinning
                  ? "bg-zinc-800 text-zinc-500 cursor-wait"
                  : "bg-gradient-to-r from-[#00f0ff] to-[#7b61ff] text-black hover:scale-105 hover:shadow-[0_0_30px_rgba(0,240,255,0.3)] active:scale-95"
              }`}
            >
              <RotateCw size={20} className={spinning ? "animate-spin" : ""} />
              {spinning ? "Spinning..." : "SPIN"}
            </button>
          )
        ) : (
          <Link
            href="/vibex/signup"
            className="flex items-center gap-2 rounded-full bg-gradient-to-r from-[#00f0ff] to-[#7b61ff] px-8 py-3.5 text-base font-bold text-black transition-all hover:scale-105"
          >
            Sign up to Spin
          </Link>
        )}

        {/* Result */}
        {resultIndex !== null && (
          <div className="rounded-2xl border border-green-500/30 bg-green-500/10 p-6 text-center animate-bounce">
            <Gift size={32} className="mx-auto mb-2 text-green-400" />
            <div className="text-2xl font-black text-green-400">
              +{SPIN_REWARDS[resultIndex].coins} Coins!
            </div>
            <p className="mt-1 text-xs text-zinc-400">Added to your wallet</p>
          </div>
        )}

        {/* Reward tiers */}
        <div className="w-full">
          <h3 className="mb-3 text-sm font-bold text-zinc-400">Reward Tiers</h3>
          <div className="grid grid-cols-4 gap-2">
            {SPIN_REWARDS.map((r) => (
              <div key={r.id} className="rounded-xl border border-white/10 bg-white/5 p-2 text-center">
                <div className="text-sm font-black" style={{ color: r.color }}>{r.label}</div>
                <div className="text-[10px] text-zinc-500">{(r.probability * 100).toFixed(0)}%</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
