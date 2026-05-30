"use client";

import { useState } from "react";
import { VibexHeader } from "@/components/vibex/VibexHeader";
import { useVibex } from "@/lib/vibex-context";
import { VIBE_BATTLES } from "@/lib/vibex-data";
import type { VibeBattle } from "@/lib/vibex-types";
import { Swords, Plus, Timer, Coins, Crown, X } from "lucide-react";

function BattleCard({ battle }: { battle: VibeBattle }) {
  const { isLoggedIn, user, addCoins, removeCoins } = useVibex();
  const [accepted, setAccepted] = useState(false);
  const [result, setResult] = useState<"win" | "lose" | null>(null);

  const handleAccept = (_pick: "A" | "B") => {
    if (!isLoggedIn || !user || user.coins < battle.stake) return;
    setAccepted(true);
    const won = Math.random() > 0.5;
    setTimeout(() => {
      if (won) {
        addCoins(battle.stake * 2, `Battle win: ${battle.question}`, "battle_win");
        setResult("win");
      } else {
        removeCoins(battle.stake, `Battle loss: ${battle.question}`, "battle_loss");
        setResult("lose");
      }
    }, 2500);
  };

  return (
    <div className="rounded-2xl border border-white/10 bg-gradient-to-b from-white/[0.06] to-transparent overflow-hidden">
      {/* Battle header */}
      <div className="flex items-center justify-between bg-gradient-to-r from-[#ff00e5]/10 to-[#7b61ff]/10 px-4 py-2.5 border-b border-white/5">
        <div className="flex items-center gap-2">
          <Swords size={14} className="text-[#ff00e5]" />
          <span className="text-xs font-bold uppercase tracking-wider text-zinc-400">
            {battle.status === "open" ? "Open Challenge" : "Active Battle"}
          </span>
        </div>
        <div className="flex items-center gap-1.5 rounded-full bg-yellow-500/20 border border-yellow-500/30 px-2 py-0.5">
          <Coins size={12} className="text-yellow-400" />
          <span className="text-xs font-bold text-yellow-400">{battle.stake}</span>
        </div>
      </div>

      <div className="p-4">
        {/* Players */}
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#ff00e5]/20 text-xl border border-[#ff00e5]/30">
              {battle.challenger.avatar}
            </div>
            <div>
              <div className="text-sm font-bold">{battle.challenger.displayName}</div>
              <div className="text-[10px] text-zinc-500">Lv.{battle.challenger.level}</div>
            </div>
          </div>
          <div className="text-lg font-black text-zinc-600">VS</div>
          {battle.opponent ? (
            <div className="flex items-center gap-2">
              <div>
                <div className="text-sm font-bold text-right">{battle.opponent.displayName}</div>
                <div className="text-[10px] text-zinc-500 text-right">Lv.{battle.opponent.level}</div>
              </div>
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#00f0ff]/20 text-xl border border-[#00f0ff]/30">
                {battle.opponent.avatar}
              </div>
            </div>
          ) : (
            <div className="flex h-10 w-10 items-center justify-center rounded-full border-2 border-dashed border-white/20 text-zinc-600 text-sm">
              ?
            </div>
          )}
        </div>

        <h3 className="mb-4 text-sm font-semibold text-center">{battle.question}</h3>

        {battle.status === "open" && !accepted && (
          <div className="grid grid-cols-2 gap-2">
            <button
              onClick={() => handleAccept("A")}
              disabled={!isLoggedIn}
              className="rounded-xl border border-[#00f0ff]/30 bg-[#00f0ff]/5 p-2.5 text-sm font-bold transition-all hover:bg-[#00f0ff]/15 hover:border-[#00f0ff]/50 hover:shadow-[0_0_15px_rgba(0,240,255,0.2)]"
            >
              {battle.optionA}
            </button>
            <button
              onClick={() => handleAccept("B")}
              disabled={!isLoggedIn}
              className="rounded-xl border border-[#ff00e5]/30 bg-[#ff00e5]/5 p-2.5 text-sm font-bold transition-all hover:bg-[#ff00e5]/15 hover:border-[#ff00e5]/50 hover:shadow-[0_0_15px_rgba(255,0,229,0.2)]"
            >
              {battle.optionB}
            </button>
          </div>
        )}

        {accepted && !result && (
          <div className="text-center py-2">
            <div className="inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-2 animate-pulse">
              <Swords size={14} className="text-[#ff00e5]" />
              <span className="text-sm font-bold">Battle in progress...</span>
            </div>
          </div>
        )}

        {result && (
          <div className={`text-center py-2 rounded-xl ${result === "win" ? "bg-green-500/10 border border-green-500/30" : "bg-red-500/10 border border-red-500/30"}`}>
            {result === "win" ? (
              <div className="flex items-center justify-center gap-2">
                <Crown size={18} className="text-yellow-400" />
                <span className="text-sm font-bold text-green-400">You won {battle.stake * 2} coins!</span>
              </div>
            ) : (
              <span className="text-sm font-bold text-red-400">You lost {battle.stake} coins</span>
            )}
          </div>
        )}

        {battle.status === "active" && !accepted && (
          <div className="text-center text-xs text-zinc-500">
            <Timer size={12} className="inline mr-1" />
            Battle in progress between players
          </div>
        )}
      </div>
    </div>
  );
}

function CreateBattleModal({ onClose }: { onClose: () => void }) {
  const { user, removeCoins } = useVibex();
  const [question, setQuestion] = useState("");
  const [optA, setOptA] = useState("");
  const [optB, setOptB] = useState("");
  const [stake, setStake] = useState(100);

  const handleCreate = () => {
    if (!question || !optA || !optB || !user) return;
    removeCoins(stake, `Battle created: ${question}`, "battle_loss");
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-end md:items-center justify-center bg-black/70 backdrop-blur-sm" onClick={onClose}>
      <div className="w-full max-w-md rounded-t-3xl md:rounded-3xl border border-white/10 bg-[#111116] p-6" onClick={(e) => e.stopPropagation()}>
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-lg font-bold flex items-center gap-2">
            <Swords size={18} className="text-[#ff00e5]" />
            Create Battle
          </h2>
          <button onClick={onClose} className="rounded-full p-1 hover:bg-white/10"><X size={18} /></button>
        </div>

        <div className="space-y-4">
          <div>
            <label className="mb-1.5 block text-xs font-semibold text-zinc-400">Question</label>
            <input
              value={question}
              onChange={(e) => setQuestion(e.target.value)}
              placeholder="Who wins the match tonight?"
              className="w-full rounded-xl border border-white/10 bg-white/5 px-3 py-2.5 text-sm outline-none focus:border-[#ff00e5]/50"
            />
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="mb-1.5 block text-xs font-semibold text-zinc-400">Option A</label>
              <input
                value={optA}
                onChange={(e) => setOptA(e.target.value)}
                placeholder="Team A"
                className="w-full rounded-xl border border-white/10 bg-white/5 px-3 py-2.5 text-sm outline-none focus:border-[#00f0ff]/50"
              />
            </div>
            <div>
              <label className="mb-1.5 block text-xs font-semibold text-zinc-400">Option B</label>
              <input
                value={optB}
                onChange={(e) => setOptB(e.target.value)}
                placeholder="Team B"
                className="w-full rounded-xl border border-white/10 bg-white/5 px-3 py-2.5 text-sm outline-none focus:border-[#ff00e5]/50"
              />
            </div>
          </div>
          <div>
            <label className="mb-1.5 block text-xs font-semibold text-zinc-400">Stake (coins)</label>
            <div className="flex gap-2">
              {[100, 250, 500, 1000].map((s) => (
                <button
                  key={s}
                  onClick={() => setStake(s)}
                  className={`flex-1 rounded-lg py-2 text-sm font-bold transition-all ${
                    stake === s
                      ? "bg-yellow-500/20 border border-yellow-500/50 text-yellow-400"
                      : "bg-white/5 border border-white/10 text-zinc-400 hover:bg-white/10"
                  }`}
                >
                  {s}
                </button>
              ))}
            </div>
          </div>
          <button
            onClick={handleCreate}
            disabled={!question || !optA || !optB}
            className="w-full rounded-xl bg-gradient-to-r from-[#ff00e5] to-[#7b61ff] py-3 text-sm font-bold text-white transition-all hover:scale-[1.02] disabled:opacity-40"
          >
            Challenge — Stake {stake} Coins
          </button>
        </div>
      </div>
    </div>
  );
}

export default function BattlesPage() {
  const { isLoggedIn } = useVibex();
  const [showCreate, setShowCreate] = useState(false);

  return (
    <>
      <VibexHeader />
      <div className="p-4 space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Swords size={20} className="text-[#ff00e5]" />
            <h1 className="text-xl font-black">Vibe Battles</h1>
          </div>
          {isLoggedIn && (
            <button
              onClick={() => setShowCreate(true)}
              className="flex items-center gap-1.5 rounded-full bg-gradient-to-r from-[#ff00e5] to-[#7b61ff] px-4 py-2 text-xs font-bold text-white transition-all hover:scale-105"
            >
              <Plus size={14} />
              Create
            </button>
          )}
        </div>

        <div className="rounded-xl border border-white/10 bg-gradient-to-r from-[#ff00e5]/5 to-[#7b61ff]/5 p-4">
          <p className="text-sm text-zinc-400">
            Challenge anyone to a 1v1 prediction duel. Both stake coins, winner takes all.
          </p>
        </div>

        <div className="space-y-3">
          {VIBE_BATTLES.map((b) => (
            <BattleCard key={b.id} battle={b} />
          ))}
        </div>

        {!isLoggedIn && (
          <div className="text-center py-8">
            <Swords size={40} className="mx-auto mb-3 text-zinc-700" />
            <p className="text-sm text-zinc-500">Sign up to create and accept battles</p>
          </div>
        )}
      </div>

      {showCreate && <CreateBattleModal onClose={() => setShowCreate(false)} />}
    </>
  );
}
