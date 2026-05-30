"use client";

import { createContext, useContext, useState, useCallback, useSyncExternalStore, type ReactNode } from "react";
import type { VibexUser, Transaction, CountryCode } from "./vibex-types";
import { AVATARS } from "./vibex-data";

interface VibexState {
  user: VibexUser | null;
  transactions: Transaction[];
  isLoggedIn: boolean;
  todaySpun: boolean;
  login: (username: string, displayName: string, avatar: string, country: CountryCode) => void;
  logout: () => void;
  addCoins: (amount: number, description: string, type: Transaction["type"]) => void;
  removeCoins: (amount: number, description: string, type: Transaction["type"]) => void;
  markSpun: () => void;
  incrementStreak: () => void;
}

const VibexContext = createContext<VibexState | null>(null);

export function useVibex() {
  const ctx = useContext(VibexContext);
  if (!ctx) throw new Error("useVibex must be used within VibexProvider");
  return ctx;
}

const STORAGE_KEY = "vibex_user";
const TX_KEY = "vibex_transactions";
const SPIN_KEY = "vibex_last_spin";
const STREAK_KEY = "vibex_last_streak";

function subscribe(cb: () => void) {
  window.addEventListener("storage", cb);
  return () => window.removeEventListener("storage", cb);
}

function getSnapshot() {
  return true;
}

function getServerSnapshot() {
  return false;
}

function loadUser(): VibexUser | null {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (!saved) return null;
    const u = JSON.parse(saved) as VibexUser;
    const lastStreak = localStorage.getItem(STREAK_KEY);
    if (lastStreak !== new Date().toDateString()) {
      const yesterday = new Date();
      yesterday.setDate(yesterday.getDate() - 1);
      if (lastStreak === yesterday.toDateString()) {
        u.streak += 1;
        if (u.streak > u.longestStreak) u.longestStreak = u.streak;
      } else if (lastStreak) {
        u.streak = 1;
      }
      u.lastActive = new Date().toISOString();
      localStorage.setItem(STREAK_KEY, new Date().toDateString());
      localStorage.setItem(STORAGE_KEY, JSON.stringify(u));
    }
    return u;
  } catch {
    return null;
  }
}

function loadTransactions(): Transaction[] {
  try {
    const saved = localStorage.getItem(TX_KEY);
    return saved ? JSON.parse(saved) : [];
  } catch {
    return [];
  }
}

function loadSpunToday(): boolean {
  try {
    return localStorage.getItem(SPIN_KEY) === new Date().toDateString();
  } catch {
    return false;
  }
}

export function VibexProvider({ children }: { children: ReactNode }) {
  const mounted = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);

  const [user, setUser] = useState<VibexUser | null>(() => (typeof window !== "undefined" ? loadUser() : null));
  const [transactions, setTransactions] = useState<Transaction[]>(() => (typeof window !== "undefined" ? loadTransactions() : []));
  const [todaySpun, setTodaySpun] = useState(() => (typeof window !== "undefined" ? loadSpunToday() : false));

  const persist = useCallback((u: VibexUser, tx: Transaction[]) => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(u));
    localStorage.setItem(TX_KEY, JSON.stringify(tx));
  }, []);

  const login = useCallback((username: string, displayName: string, avatar: string, country: CountryCode) => {
    const now = new Date().toISOString();
    const newUser: VibexUser = {
      id: `u_${crypto.randomUUID()}`,
      username,
      displayName,
      avatar: avatar || AVATARS[Math.floor(Math.random() * AVATARS.length)],
      country,
      coins: 5000,
      streak: 1,
      longestStreak: 1,
      level: 1,
      xp: 0,
      badges: [{ id: "b_welcome", name: "Welcome", icon: "🎉", description: "Joined VibeX!", earnedAt: now }],
      joinedAt: now,
      lastActive: now,
      wins: 0,
      losses: 0,
      totalBets: 0,
    };
    const welcomeTx: Transaction = {
      id: `t_${crypto.randomUUID()}`,
      type: "signup_bonus",
      amount: 5000,
      description: "Welcome bonus! Start vibing 🎉",
      timestamp: now,
    };
    setUser(newUser);
    setTransactions([welcomeTx]);
    localStorage.setItem(STREAK_KEY, new Date().toDateString());
    persist(newUser, [welcomeTx]);
  }, [persist]);

  const logout = useCallback(() => {
    setUser(null);
    setTransactions([]);
    localStorage.removeItem(STORAGE_KEY);
    localStorage.removeItem(TX_KEY);
    localStorage.removeItem(SPIN_KEY);
    localStorage.removeItem(STREAK_KEY);
  }, []);

  const addCoins = useCallback((amount: number, description: string, type: Transaction["type"]) => {
    setUser((prev) => {
      if (!prev) return prev;
      const updated = { ...prev, coins: prev.coins + amount, xp: prev.xp + Math.floor(amount / 10) };
      if (updated.xp >= updated.level * 500) {
        updated.level += 1;
        updated.xp = updated.xp - (updated.level - 1) * 500;
      }
      if (type === "win" || type === "battle_win") updated.wins += 1;
      updated.totalBets += 1;
      const tx: Transaction = { id: `t_${crypto.randomUUID()}`, type, amount, description, timestamp: new Date().toISOString() };
      setTransactions((prevTx) => {
        const newTx = [tx, ...prevTx].slice(0, 50);
        persist(updated, newTx);
        return newTx;
      });
      return updated;
    });
  }, [persist]);

  const removeCoins = useCallback((amount: number, description: string, type: Transaction["type"]) => {
    setUser((prev) => {
      if (!prev) return prev;
      const updated = { ...prev, coins: Math.max(0, prev.coins - amount) };
      if (type === "loss" || type === "battle_loss") updated.losses += 1;
      updated.totalBets += 1;
      const tx: Transaction = { id: `t_${crypto.randomUUID()}`, type, amount: -amount, description, timestamp: new Date().toISOString() };
      setTransactions((prevTx) => {
        const newTx = [tx, ...prevTx].slice(0, 50);
        persist(updated, newTx);
        return newTx;
      });
      return updated;
    });
  }, [persist]);

  const markSpun = useCallback(() => {
    setTodaySpun(true);
    localStorage.setItem(SPIN_KEY, new Date().toDateString());
  }, []);

  const incrementStreak = useCallback(() => {
    setUser((prev) => {
      if (!prev) return prev;
      const updated = { ...prev, streak: prev.streak + 1 };
      if (updated.streak > updated.longestStreak) updated.longestStreak = updated.streak;
      setTransactions((prevTx) => {
        persist(updated, prevTx);
        return prevTx;
      });
      return updated;
    });
  }, [persist]);

  if (!mounted) return null;

  return (
    <VibexContext.Provider value={{ user, transactions, isLoggedIn: !!user, todaySpun, login, logout, addCoins, removeCoins, markSpun, incrementStreak }}>
      {children}
    </VibexContext.Provider>
  );
}
