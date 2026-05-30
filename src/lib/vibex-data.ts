import { VibexUser, FlashPrediction, VibeBattle, FeedPost, SpinReward, LeaderboardEntry, Transaction, CameraFilter, FilterOverlay, FilterPost, Reel } from "./vibex-types";

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

export const FILTER_OVERLAYS: FilterOverlay[] = [
  { id: "ov1", kind: "mustache", emoji: "🥸", label: "Classic Stache", position: { x: 50, y: 65 }, scale: 1, rotation: 0 },
  { id: "ov2", kind: "glasses", emoji: "🕶️", label: "Cool Shades", position: { x: 50, y: 45 }, scale: 1, rotation: 0 },
  { id: "ov3", kind: "hat", emoji: "🎩", label: "Top Hat", position: { x: 50, y: 15 }, scale: 1.2, rotation: 0 },
  { id: "ov4", kind: "crown", emoji: "👑", label: "Crown", position: { x: 50, y: 10 }, scale: 1.1, rotation: 0 },
  { id: "ov5", kind: "ears", emoji: "🐱", label: "Cat Ears", position: { x: 50, y: 8 }, scale: 1, rotation: 0 },
  { id: "ov6", kind: "facepaint", emoji: "🎨", label: "Face Paint", position: { x: 50, y: 50 }, scale: 1.5, rotation: 0 },
  { id: "ov7", kind: "mask", emoji: "🦊", label: "Fox Mask", position: { x: 50, y: 40 }, scale: 1.3, rotation: 0 },
  { id: "ov8", kind: "text", emoji: "💬", label: "Caption", position: { x: 50, y: 85 }, scale: 1, rotation: 0 },
  { id: "ov9", kind: "sticker", emoji: "⭐", label: "Star Sparkle", position: { x: 30, y: 25 }, scale: 0.8, rotation: 15 },
  { id: "ov10", kind: "frame", emoji: "🖼️", label: "Neon Frame", position: { x: 50, y: 50 }, scale: 1, rotation: 0 },
  { id: "ov11", kind: "hat", emoji: "🧢", label: "Snapback", position: { x: 50, y: 12 }, scale: 1.1, rotation: -10 },
  { id: "ov12", kind: "glasses", emoji: "👓", label: "Nerdy Glasses", position: { x: 50, y: 45 }, scale: 1, rotation: 0 },
  { id: "ov13", kind: "mustache", emoji: "🧔", label: "Full Beard", position: { x: 50, y: 70 }, scale: 1.2, rotation: 0 },
  { id: "ov14", kind: "sticker", emoji: "🔥", label: "Fire Effect", position: { x: 70, y: 30 }, scale: 0.9, rotation: 0 },
  { id: "ov15", kind: "sticker", emoji: "💎", label: "Diamond Bling", position: { x: 50, y: 35 }, scale: 0.7, rotation: 0 },
  { id: "ov16", kind: "ears", emoji: "🐰", label: "Bunny Ears", position: { x: 50, y: 5 }, scale: 1.1, rotation: 0 },
];

export const TRENDING_SONGS = [
  { id: "song1", title: "Unholy", artist: "Sam Smith", duration: "3:36", bpm: 131 },
  { id: "song2", title: "Calm Down", artist: "Rema", duration: "3:59", bpm: 107 },
  { id: "song3", title: "Flowers", artist: "Miley Cyrus", duration: "3:20", bpm: 118 },
  { id: "song4", title: "Ojitos Lindos", artist: "Bad Bunny", duration: "4:18", bpm: 92 },
  { id: "song5", title: "Last Last", artist: "Burna Boy", duration: "3:27", bpm: 107 },
  { id: "song6", title: "Essence", artist: "Wizkid ft Tems", duration: "4:09", bpm: 107 },
  { id: "song7", title: "Pepas", artist: "Farruko", duration: "4:46", bpm: 130 },
  { id: "song8", title: "SOS", artist: "SZA", duration: "4:10", bpm: 98 },
];

export const MOCK_FILTERS: CameraFilter[] = [
  {
    id: "cf1", name: "Lagos Drip 🇳🇬", creator: MOCK_USERS[0], type: "camera",
    thumbnail: "🔥", overlays: [FILTER_OVERLAYS[1], FILTER_OVERLAYS[3], FILTER_OVERLAYS[14]],
    downloads: 12400, uses: 8900, posts: 3200,
    createdAt: "2026-05-25T10:00:00Z", tags: ["drip", "nigeria", "cool"], status: "published",
  },
  {
    id: "cf2", name: "Havana Nights ✨", creator: MOCK_USERS[3], type: "camera",
    thumbnail: "💎", overlays: [FILTER_OVERLAYS[2], FILTER_OVERLAYS[5], FILTER_OVERLAYS[9]],
    downloads: 9800, uses: 6500, posts: 2100,
    createdAt: "2026-05-22T14:00:00Z", tags: ["havana", "cuban", "vibes"], status: "published",
  },
  {
    id: "cf3", name: "Manila Glow 🌊", creator: MOCK_USERS[5], type: "camera",
    thumbnail: "🌊", overlays: [FILTER_OVERLAYS[4], FILTER_OVERLAYS[8], FILTER_OVERLAYS[11]],
    downloads: 7200, uses: 4800, posts: 1600,
    createdAt: "2026-05-20T08:00:00Z", tags: ["manila", "glow", "cute"], status: "published",
  },
  {
    id: "cf4", name: "Bogotá Beast Mode 🐆", creator: MOCK_USERS[6], type: "camera",
    thumbnail: "🐆", overlays: [FILTER_OVERLAYS[0], FILTER_OVERLAYS[1], FILTER_OVERLAYS[13]],
    downloads: 5400, uses: 3200, posts: 980,
    createdAt: "2026-05-18T16:00:00Z", tags: ["bogota", "beast", "fire"], status: "published",
  },
  {
    id: "vf1", name: "Calm Down Dance", creator: MOCK_USERS[0], type: "video",
    thumbnail: "💃", overlays: [FILTER_OVERLAYS[9], FILTER_OVERLAYS[14]],
    songId: "song2", songTitle: "Calm Down", songArtist: "Rema",
    downloads: 18500, uses: 14200, posts: 6800,
    createdAt: "2026-05-26T12:00:00Z", tags: ["dance", "rema", "afrobeats"], status: "published",
  },
  {
    id: "vf2", name: "Ojitos Challenge", creator: MOCK_USERS[1], type: "video",
    thumbnail: "🎵", overlays: [FILTER_OVERLAYS[3], FILTER_OVERLAYS[8]],
    songId: "song4", songTitle: "Ojitos Lindos", songArtist: "Bad Bunny",
    downloads: 15200, uses: 11800, posts: 5400,
    createdAt: "2026-05-24T18:00:00Z", tags: ["badbunny", "latin", "challenge"], status: "published",
  },
  {
    id: "vf3", name: "Last Last Vibes", creator: MOCK_USERS[4], type: "video",
    thumbnail: "🔥", overlays: [FILTER_OVERLAYS[13], FILTER_OVERLAYS[7]],
    songId: "song5", songTitle: "Last Last", songArtist: "Burna Boy",
    downloads: 11300, uses: 8400, posts: 3900,
    createdAt: "2026-05-23T09:00:00Z", tags: ["burnaboy", "afrobeats", "vibes"], status: "published",
  },
];

export const MOCK_FILTER_POSTS: FilterPost[] = [
  {
    id: "fp_1", user: MOCK_USERS[4], filter: MOCK_FILTERS[0],
    mediaType: "photo", caption: "Lagos drip different 🔥🇳🇬",
    reactions: { fire: 234, skull: 12, rocket: 89, clap: 156 },
    createdAt: "2026-05-30T08:00:00Z",
  },
  {
    id: "fp_2", user: MOCK_USERS[2], filter: MOCK_FILTERS[4],
    mediaType: "video", caption: "My Calm Down dance 💃",
    reactions: { fire: 456, skull: 23, rocket: 178, clap: 312 },
    createdAt: "2026-05-30T06:00:00Z",
  },
  {
    id: "fp_3", user: MOCK_USERS[7], filter: MOCK_FILTERS[1],
    mediaType: "photo", caption: "Havana vibes all day ✨",
    reactions: { fire: 189, skull: 5, rocket: 67, clap: 98 },
    createdAt: "2026-05-29T22:00:00Z",
  },
];

export const MOCK_REELS: Reel[] = [
  {
    id: "r1", user: MOCK_USERS[0], mediaType: "video",
    caption: "Lagos drip check with the new filter 🔥🇳🇬 #lagosdrip #vibes",
    songTitle: "Calm Down", songArtist: "Rema",
    filterId: "cf1", filterName: "Lagos Drip 🇳🇬", filterCreator: "blazeking",
    thumbnail: "🔥", duration: "0:15",
    views: 45200, reactions: { fire: 1230, skull: 45, rocket: 890, clap: 567 },
    comments: 234, shares: 189, createdAt: "2026-05-30T10:00:00Z",
  },
  {
    id: "r2", user: MOCK_USERS[2], mediaType: "video",
    caption: "My Calm Down dance 💃 using the viral filter",
    songTitle: "Calm Down", songArtist: "Rema",
    filterId: "vf1", filterName: "Calm Down Dance", filterCreator: "blazeking",
    thumbnail: "💃", duration: "0:22",
    views: 89400, reactions: { fire: 3450, skull: 120, rocket: 2100, clap: 1890 },
    comments: 567, shares: 412, createdAt: "2026-05-30T08:30:00Z",
  },
  {
    id: "r3", user: MOCK_USERS[7], mediaType: "video",
    caption: "Havana nights filter is everything ✨ #cuba #vibes",
    songTitle: "Ojitos Lindos", songArtist: "Bad Bunny",
    filterId: "cf2", filterName: "Havana Nights ✨", filterCreator: "cubanflash",
    thumbnail: "✨", duration: "0:18",
    views: 34500, reactions: { fire: 890, skull: 23, rocket: 456, clap: 678 },
    comments: 145, shares: 98, createdAt: "2026-05-30T07:00:00Z",
  },
  {
    id: "r4", user: MOCK_USERS[1], mediaType: "video",
    caption: "Ojitos Challenge accepted 👀 #badbunny #latin",
    songTitle: "Ojitos Lindos", songArtist: "Bad Bunny",
    filterId: "vf2", filterName: "Ojitos Challenge", filterCreator: "viperqueen",
    thumbnail: "🎵", duration: "0:25",
    views: 67800, reactions: { fire: 2340, skull: 89, rocket: 1560, clap: 1230 },
    comments: 389, shares: 278, createdAt: "2026-05-29T22:00:00Z",
  },
  {
    id: "r5", user: MOCK_USERS[4], mediaType: "video",
    caption: "Last Last vibes hit different 🔥 Burna Boy forever",
    songTitle: "Last Last", songArtist: "Burna Boy",
    filterId: "vf3", filterName: "Last Last Vibes", filterCreator: "lagosphantom",
    thumbnail: "🎶", duration: "0:20",
    views: 52100, reactions: { fire: 1890, skull: 67, rocket: 1230, clap: 945 },
    comments: 278, shares: 198, createdAt: "2026-05-29T20:00:00Z",
  },
  {
    id: "r6", user: MOCK_USERS[5], mediaType: "video",
    caption: "Manila Glow filter on point 🌊 #philippines #glow",
    filterId: "cf3", filterName: "Manila Glow 🌊", filterCreator: "manilawave",
    thumbnail: "🌊", duration: "0:12",
    views: 28900, reactions: { fire: 780, skull: 15, rocket: 345, clap: 456 },
    comments: 112, shares: 67, createdAt: "2026-05-29T18:00:00Z",
  },
  {
    id: "r7", user: MOCK_USERS[6], mediaType: "image",
    caption: "Beast mode activated 🐆💪 Bogotá filter goes hard",
    filterId: "cf4", filterName: "Bogotá Beast Mode 🐆", filterCreator: "bogotabeast",
    thumbnail: "🐆", views: 19400,
    reactions: { fire: 560, skull: 34, rocket: 234, clap: 345 },
    comments: 89, shares: 45, createdAt: "2026-05-29T16:00:00Z",
  },
  {
    id: "r8", user: MOCK_USERS[3], mediaType: "video",
    caption: "20-day streak celebration 🔥 Crown filter only for legends",
    songTitle: "Pepas", songArtist: "Farruko",
    filterId: "cf2", filterName: "Havana Nights ✨", filterCreator: "cubanflash",
    thumbnail: "👑", duration: "0:30",
    views: 41200, reactions: { fire: 1560, skull: 56, rocket: 890, clap: 1120 },
    comments: 198, shares: 156, createdAt: "2026-05-29T14:00:00Z",
  },
  {
    id: "r9", user: MOCK_USERS[0], mediaType: "video",
    caption: "Won 2400 coins on Bitcoin prediction! 🚀 Celebrating with this fire filter",
    songTitle: "Essence", songArtist: "Wizkid ft Tems",
    filterId: "cf1", filterName: "Lagos Drip 🇳🇬", filterCreator: "blazeking",
    thumbnail: "💰", duration: "0:14",
    views: 38700, reactions: { fire: 1340, skull: 78, rocket: 890, clap: 567 },
    comments: 167, shares: 123, createdAt: "2026-05-29T12:00:00Z",
  },
  {
    id: "r10", user: MOCK_USERS[5], mediaType: "video",
    caption: "SOS vibes with the Manila Glow ✨ this filter is everything",
    songTitle: "SOS", songArtist: "SZA",
    filterId: "cf3", filterName: "Manila Glow 🌊", filterCreator: "manilawave",
    thumbnail: "🌟", duration: "0:19",
    views: 31500, reactions: { fire: 920, skull: 28, rocket: 567, clap: 678 },
    comments: 134, shares: 89, createdAt: "2026-05-29T10:00:00Z",
  },
];

export { AVATARS };
