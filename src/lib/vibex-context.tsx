"use client";

import { createContext, useContext, useState, useCallback, useSyncExternalStore, type ReactNode } from "react";
import type { VibexUser, Transaction, CountryCode, Message } from "./vibex-types";
import { AVATARS } from "./vibex-data";

interface SocialState {
  following: string[];
  followers: string[];
  friends: string[];
  isPublic: boolean;
  bio: string;
  conversations: { id: string; recipientId: string; messages: Message[]; unreadCount: number }[];
}

interface VibexState {
  user: VibexUser | null;
  transactions: Transaction[];
  isLoggedIn: boolean;
  todaySpun: boolean;
  social: SocialState;
  login: (username: string, displayName: string, avatar: string, country: CountryCode) => void;
  logout: () => void;
  addCoins: (amount: number, description: string, type: Transaction["type"]) => void;
  removeCoins: (amount: number, description: string, type: Transaction["type"]) => void;
  markSpun: () => void;
  incrementStreak: () => void;
  toggleFollow: (userId: string) => void;
  addFriend: (userId: string) => void;
  removeFriend: (userId: string) => void;
  togglePrivacy: () => void;
  updateBio: (bio: string) => void;
  sendMessage: (recipientId: string, text: string) => void;
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
const SOCIAL_KEY = "vibex_social";

const DEFAULT_SOCIAL: SocialState = {
  following: [],
  followers: [],
  friends: [],
  isPublic: true,
  bio: "",
  conversations: [],
};

function loadSocial(): SocialState {
  try {
    const saved = localStorage.getItem(SOCIAL_KEY);
    return saved ? { ...DEFAULT_SOCIAL, ...JSON.parse(saved) } : DEFAULT_SOCIAL;
  } catch {
    return DEFAULT_SOCIAL;
  }
}

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
  const [social, setSocial] = useState<SocialState>(() => (typeof window !== "undefined" ? loadSocial() : DEFAULT_SOCIAL));

  const persistSocial = useCallback((s: SocialState) => {
    localStorage.setItem(SOCIAL_KEY, JSON.stringify(s));
  }, []);

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
    setSocial(DEFAULT_SOCIAL);
    localStorage.removeItem(STORAGE_KEY);
    localStorage.removeItem(TX_KEY);
    localStorage.removeItem(SPIN_KEY);
    localStorage.removeItem(STREAK_KEY);
    localStorage.removeItem(SOCIAL_KEY);
  }, []);

  const toggleFollow = useCallback((userId: string) => {
    setSocial((prev) => {
      const isFollowing = prev.following.includes(userId);
      const updated = {
        ...prev,
        following: isFollowing ? prev.following.filter((id) => id !== userId) : [...prev.following, userId],
      };
      persistSocial(updated);
      return updated;
    });
  }, [persistSocial]);

  const addFriend = useCallback((userId: string) => {
    setSocial((prev) => {
      if (prev.friends.includes(userId)) return prev;
      const updated = {
        ...prev,
        friends: [...prev.friends, userId],
        following: prev.following.includes(userId) ? prev.following : [...prev.following, userId],
      };
      persistSocial(updated);
      return updated;
    });
  }, [persistSocial]);

  const removeFriend = useCallback((userId: string) => {
    setSocial((prev) => {
      const updated = {
        ...prev,
        friends: prev.friends.filter((id) => id !== userId),
      };
      persistSocial(updated);
      return updated;
    });
  }, [persistSocial]);

  const togglePrivacy = useCallback(() => {
    setSocial((prev) => {
      const updated = { ...prev, isPublic: !prev.isPublic };
      persistSocial(updated);
      return updated;
    });
  }, [persistSocial]);

  const updateBio = useCallback((bio: string) => {
    setSocial((prev) => {
      const updated = { ...prev, bio };
      persistSocial(updated);
      return updated;
    });
  }, [persistSocial]);

  const sendMessage = useCallback((recipientId: string, text: string) => {
    if (!user) return;
    setSocial((prev) => {
      const msg: Message = {
        id: `m_${crypto.randomUUID()}`,
        senderId: user.id,
        text,
        timestamp: new Date().toISOString(),
        read: true,
      };
      const convIdx = prev.conversations.findIndex((c) => c.recipientId === recipientId);
      let updated: SocialState;
      if (convIdx >= 0) {
        const convs = [...prev.conversations];
        convs[convIdx] = { ...convs[convIdx], messages: [...convs[convIdx].messages, msg] };
        updated = { ...prev, conversations: convs };
      } else {
        updated = { ...prev, conversations: [...prev.conversations, { id: `c_${crypto.randomUUID()}`, recipientId, messages: [msg], unreadCount: 0 }] };
      }
      persistSocial(updated);
      return updated;
    });
  }, [user, persistSocial]);

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
    <VibexContext.Provider value={{ user, transactions, isLoggedIn: !!user, todaySpun, social, login, logout, addCoins, removeCoins, markSpun, incrementStreak, toggleFollow, addFriend, removeFriend, togglePrivacy, updateBio, sendMessage }}>
      {children}
    </VibexContext.Provider>
  );
}
