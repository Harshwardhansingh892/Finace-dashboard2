import { VibexUser, FlashPrediction, VibeBattle, FeedPost, SpinReward, LeaderboardEntry, Transaction } from "./vibex-types";

const AVATARS = [
  "🦁", "🐯", "🦊", "🐺", "🦅", "🐉", "🦈", "🐆",
  "🔥", "⚡", "💎", "🌊", "🎯", "🚀", "👑", "🎪",
];

export const MOCK_USERS: VibexUser[] = [
  {
    id: "u1", username: "blazeking", displayName: "BlazeKing", avatar: "🔥",
    country: "NG", coins: 24500, streak: 12, longestStreak: 18, level: 15,
    xp: 4200, badges: [{ id: "b1", name: "First Blood", icon: "🩸", description: "Won your first prediction", earnedAt: "2026-05-20" }],
    joinedAt: "2026-04-01", lastActive: "2026-05-30", wins: 89, losses: 34, totalBets: 123,
  },
  {
    id: "u2", username: "viperqueen", displayName: "ViperQueen", avatar: "🐍",
    country: "CO", coins: 31200, streak: 7, longestStreak: 22, level: 18,
    xp: 5800, badges: [], joinedAt: "2026-03-15", lastActive: "2026-05-30",
    wins: 112, losses: 41, totalBets: 153,
  },
  {
    id: "u3", username: "stormrider", displayName: "StormRider", avatar: "⚡",
    country: "PH", coins: 18900, streak: 5, longestStreak: 14, level: 12,
    xp: 3100, badges: [], joinedAt: "2026-04-10", lastActive: "2026-05-29",
    wins: 67, losses: 28, totalBets: 95,
  },
  {
    id: "u4", username: "cubanflash", displayName: "CubanFlash", avatar: "💎",
    country: "CU", coins: 42100, streak: 20, longestStreak: 20, level: 22,
    xp: 7600, badges: [], joinedAt: "2026-02-28", lastActive: "2026-05-30",
    wins: 156, losses: 52, totalBets: 208,
  },
  {
    id: "u5", username: "lagosphantom", displayName: "LagosPhantom", avatar: "👻",
    country: "NG", coins: 15600, streak: 3, longestStreak: 9, level: 10,
    xp: 2400, badges: [], joinedAt: "2026-04-20", lastActive: "2026-05-30",
    wins: 45, losses: 22, totalBets: 67,
  },
  {
    id: "u6", username: "manilawave", displayName: "ManilaWave", avatar: "🌊",
    country: "PH", coins: 28700, streak: 8, longestStreak: 15, level: 16,
    xp: 4800, badges: [], joinedAt: "2026-03-22", lastActive: "2026-05-30",
    wins: 98, losses: 38, totalBets: 136,
  },
  {
    id: "u7", username: "bogotabeast", displayName: "BogotaBeast", avatar: "🐆",
    country: "CO", coins: 19300, streak: 4, longestStreak: 11, level: 11,
    xp: 2900, badges: [], joinedAt: "2026-04-05", lastActive: "2026-05-29",
    wins: 58, losses: 30, totalBets: 88,
  },
  {
    id: "u8", username: "havanasoul", displayName: "HavanaSoul", avatar: "🎪",
    country: "CU", coins: 22800, streak: 6, longestStreak: 13, level: 14,
    xp: 3800, badges: [], joinedAt: "2026-03-30", lastActive: "2026-05-30",
    wins: 76, losses: 35, totalBets: 111,
  },
];

export const FLASH_PREDICTIONS: FlashPrediction[] = [
  {
    id: "fp1", question: "Will Bitcoin hit $120K this week?",
    category: "crypto", optionA: "Yes 🚀", optionB: "No 📉",
    poolA: 8500, poolB: 6200, totalBets: 342,
    expiresAt: "2026-05-31T23:59:00Z", status: "live", countryTags: ["NG", "PH"],
  },
  {
    id: "fp2", question: "Nigeria vs Ghana — Who wins AFCON qualifier?",
    category: "sports", optionA: "Nigeria 🇳🇬", optionB: "Ghana 🇬🇭",
    poolA: 12300, poolB: 4800, totalBets: 567,
    expiresAt: "2026-06-02T20:00:00Z", status: "live", countryTags: ["NG"],
  },
  {
    id: "fp3", question: "Will Bad Bunny drop a new album in June?",
    category: "music", optionA: "Sí 🎵", optionB: "No 😤",
    poolA: 5600, poolB: 7100, totalBets: 289,
    expiresAt: "2026-06-30T23:59:00Z", status: "live", countryTags: ["CU", "CO"],
  },
  {
    id: "fp4", question: "Manny Pacquiao comeback fight confirmed?",
    category: "sports", optionA: "Yes 🥊", optionB: "No way",
    poolA: 9200, poolB: 3400, totalBets: 445,
    expiresAt: "2026-06-15T23:59:00Z", status: "live", countryTags: ["PH"],
  },
  {
    id: "fp5", question: "Will Colombia qualify for 2026 World Cup knockout?",
    category: "sports", optionA: "Claro 🇨🇴", optionB: "Nah",
    poolA: 15200, poolB: 2100, totalBets: 623,
    expiresAt: "2026-06-20T23:59:00Z", status: "live", countryTags: ["CO"],
  },
  {
    id: "fp6", question: "Next viral TikTok trend from Africa?",
    category: "trending", optionA: "Dance 💃", optionB: "Meme 😂",
    poolA: 4300, poolB: 5100, totalBets: 198,
    expiresAt: "2026-06-05T23:59:00Z", status: "live", countryTags: ["NG"],
  },
  {
    id: "fp7", question: "iPhone 18 announced at WWDC?",
    category: "entertainment", optionA: "Yes 📱", optionB: "Not yet",
    poolA: 7800, poolB: 6500, totalBets: 412,
    expiresAt: "2026-06-10T23:59:00Z", status: "live", countryTags: ["CU", "CO", "NG", "PH"],
  },
  {
    id: "fp8", question: "Will Wizkid and Davido collab this year?",
    category: "music", optionA: "Finally 🤝", optionB: "Never 💀",
    poolA: 6700, poolB: 11200, totalBets: 534,
    expiresAt: "2026-12-31T23:59:00Z", status: "live", countryTags: ["NG"],
  },
];

export const VIBE_BATTLES: VibeBattle[] = [
  {
    id: "vb1", challenger: MOCK_USERS[0], opponent: MOCK_USERS[4],
    question: "More goals in Premier League this weekend: Liverpool or Man City?",
    stake: 500, challengerPick: "A", opponentPick: "B",
    optionA: "Liverpool", optionB: "Man City",
    status: "active", createdAt: "2026-05-30T08:00:00Z", settlesAt: "2026-06-01T22:00:00Z",
  },
  {
    id: "vb2", challenger: MOCK_USERS[1],
    question: "Drake or Kendrick — more Spotify streams this week?",
    stake: 1000, challengerPick: "A",
    optionA: "Drake", optionB: "Kendrick",
    status: "open", createdAt: "2026-05-30T10:00:00Z", settlesAt: "2026-06-06T23:59:00Z",
  },
  {
    id: "vb3", challenger: MOCK_USERS[2], opponent: MOCK_USERS[5],
    question: "Philippines vs Thailand — SEA Games basketball?",
    stake: 750, challengerPick: "A", opponentPick: "B",
    optionA: "Gilas 🇵🇭", optionB: "Thailand 🇹🇭",
    status: "active", createdAt: "2026-05-29T14:00:00Z", settlesAt: "2026-06-01T18:00:00Z",
  },
];

export const FEED_POSTS: FeedPost[] = [
  {
    id: "p1", user: MOCK_USERS[0], type: "prediction_win",
    content: "Called it! Bitcoin pumped past $115K 🚀💰",
    coins: 2400, timestamp: "2026-05-30T09:30:00Z",
    reactions: { fire: 45, skull: 3, rocket: 28, clap: 12 }, comments: 8,
  },
  {
    id: "p2", user: MOCK_USERS[3], type: "streak",
    content: "20-DAY STREAK 🔥🔥🔥 Can't stop won't stop",
    timestamp: "2026-05-30T08:00:00Z",
    reactions: { fire: 89, skull: 0, rocket: 34, clap: 56 }, comments: 23,
  },
  {
    id: "p3", user: MOCK_USERS[1], type: "battle_result",
    content: "Just destroyed @stormrider in a Vibe Battle 😈 Easy coins",
    coins: 1500, timestamp: "2026-05-30T07:15:00Z",
    reactions: { fire: 23, skull: 15, rocket: 8, clap: 5 }, comments: 12,
  },
  {
    id: "p4", user: MOCK_USERS[5], type: "achievement",
    content: "Level 16 unlocked! ManilaWave don't sleep 🌊👑",
    timestamp: "2026-05-29T22:00:00Z",
    reactions: { fire: 34, skull: 0, rocket: 19, clap: 41 }, comments: 7,
  },
  {
    id: "p5", user: MOCK_USERS[6], type: "challenge",
    content: "Who wants to battle me on the Colombia game? 500 coins, come at me 🐆",
    coins: 500, timestamp: "2026-05-29T20:30:00Z",
    reactions: { fire: 12, skull: 2, rocket: 6, clap: 3 }, comments: 15,
  },
  {
    id: "p6", user: MOCK_USERS[4], type: "prediction_win",
    content: "Nigeria gonna run AFCON, I see the future 👻🇳🇬",
    coins: 1800, timestamp: "2026-05-29T19:00:00Z",
    reactions: { fire: 56, skull: 8, rocket: 22, clap: 30 }, comments: 19,
  },
];

export const SPIN_REWARDS: SpinReward[] = [
  { id: "s1", label: "50", coins: 50, color: "#6366f1", probability: 0.25 },
  { id: "s2", label: "100", coins: 100, color: "#8b5cf6", probability: 0.20 },
  { id: "s3", label: "250", coins: 250, color: "#a78bfa", probability: 0.18 },
  { id: "s4", label: "500", coins: 500, color: "#22c55e", probability: 0.15 },
  { id: "s5", label: "1K", coins: 1000, color: "#f59e0b", probability: 0.10 },
  { id: "s6", label: "2.5K", coins: 2500, color: "#ef4444", probability: 0.07 },
  { id: "s7", label: "5K", coins: 5000, color: "#ec4899", probability: 0.03 },
  { id: "s8", label: "10K", coins: 10000, color: "#fbbf24", probability: 0.02 },
];

export function getLeaderboard(country?: string): LeaderboardEntry[] {
  let users = [...MOCK_USERS];
  if (country) {
    users = users.filter((u) => u.country === country);
  }
  return users
    .sort((a, b) => b.coins - a.coins)
    .map((user, i) => ({
      rank: i + 1,
      user,
      score: user.coins,
      change: Math.floor(Math.random() * 5) - 2,
    }));
}

export function getMockTransactions(): Transaction[] {
  return [
    { id: "t1", type: "win", amount: 2400, description: "Won: Bitcoin $115K prediction", timestamp: "2026-05-30T09:30:00Z" },
    { id: "t2", type: "battle_win", amount: 1000, description: "Vibe Battle vs LagosPhantom", timestamp: "2026-05-30T07:15:00Z" },
    { id: "t3", type: "spin", amount: 500, description: "Daily Spin reward", timestamp: "2026-05-30T06:00:00Z" },
    { id: "t4", type: "streak_bonus", amount: 200, description: "7-day streak bonus", timestamp: "2026-05-29T00:00:00Z" },
    { id: "t5", type: "loss", amount: -800, description: "Lost: Drake vs Kendrick", timestamp: "2026-05-28T15:00:00Z" },
    { id: "t6", type: "battle_loss", amount: -500, description: "Vibe Battle vs ViperQueen", timestamp: "2026-05-28T12:00:00Z" },
    { id: "t7", type: "win", amount: 1500, description: "Won: AFCON qualifier prediction", timestamp: "2026-05-27T20:00:00Z" },
    { id: "t8", type: "signup_bonus", amount: 5000, description: "Welcome bonus! 🎉", timestamp: "2026-05-20T00:00:00Z" },
  ];
}

export { AVATARS };
