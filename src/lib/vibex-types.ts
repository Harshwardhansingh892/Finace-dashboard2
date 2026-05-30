export interface VibexUser {
  id: string;
  username: string;
  displayName: string;
  avatar: string;
  country: "CU" | "CO" | "NG" | "PH";
  coins: number;
  streak: number;
  longestStreak: number;
  level: number;
  xp: number;
  badges: Badge[];
  joinedAt: string;
  lastActive: string;
  wins: number;
  losses: number;
  totalBets: number;
}

export interface Badge {
  id: string;
  name: string;
  icon: string;
  description: string;
  earnedAt: string;
}

export interface FlashPrediction {
  id: string;
  question: string;
  category: "sports" | "music" | "trending" | "crypto" | "entertainment" | "politics";
  optionA: string;
  optionB: string;
  poolA: number;
  poolB: number;
  totalBets: number;
  expiresAt: string;
  status: "live" | "settled" | "expired";
  result?: "A" | "B";
  countryTags: string[];
  createdBy?: string;
}

export interface VibeBattle {
  id: string;
  challenger: VibexUser;
  opponent?: VibexUser;
  question: string;
  stake: number;
  challengerPick: "A" | "B";
  opponentPick?: "A" | "B";
  optionA: string;
  optionB: string;
  status: "open" | "active" | "settled";
  winner?: string;
  createdAt: string;
  settlesAt: string;
}

export interface FeedPost {
  id: string;
  user: VibexUser;
  type: "prediction_win" | "battle_result" | "streak" | "achievement" | "challenge" | "media_post";
  content: string;
  coins?: number;
  timestamp: string;
  reactions: { fire: number; skull: number; rocket: number; clap: number };
  comments: number;
  media?: {
    type: "image" | "video";
    url: string;
    thumbnail?: string;
  };
  filterId?: string;
  filterName?: string;
}

export interface Reel {
  id: string;
  user: VibexUser;
  mediaType: "video" | "image";
  caption: string;
  songTitle?: string;
  songArtist?: string;
  filterId?: string;
  filterName?: string;
  filterCreator?: string;
  thumbnail: string;
  duration?: string;
  views: number;
  reactions: { fire: number; skull: number; rocket: number; clap: number };
  comments: number;
  shares: number;
  createdAt: string;
}

export interface SpinReward {
  id: string;
  label: string;
  coins: number;
  color: string;
  probability: number;
}

export interface LeaderboardEntry {
  rank: number;
  user: VibexUser;
  score: number;
  change: number;
}

export interface Transaction {
  id: string;
  type: "win" | "loss" | "spin" | "streak_bonus" | "signup_bonus" | "battle_win" | "battle_loss";
  amount: number;
  description: string;
  timestamp: string;
}

export interface CameraFilter {
  id: string;
  name: string;
  creator: VibexUser;
  type: "camera" | "video";
  thumbnail: string;
  overlays: FilterOverlay[];
  songId?: string;
  songTitle?: string;
  songArtist?: string;
  downloads: number;
  uses: number;
  posts: number;
  createdAt: string;
  tags: string[];
  status: "draft" | "published";
}

export interface FilterOverlay {
  id: string;
  kind: "mustache" | "glasses" | "hat" | "facepaint" | "ears" | "crown" | "mask" | "text" | "sticker" | "frame";
  emoji: string;
  label: string;
  position: { x: number; y: number };
  scale: number;
  rotation: number;
}

export interface FilterPost {
  id: string;
  user: VibexUser;
  filter: CameraFilter;
  mediaType: "photo" | "video";
  caption: string;
  reactions: { fire: number; skull: number; rocket: number; clap: number };
  createdAt: string;
}

export type CountryCode = "CU" | "CO" | "NG" | "PH";

export const COUNTRY_INFO: Record<CountryCode, { name: string; flag: string; currency: string }> = {
  CU: { name: "Cuba", flag: "🇨🇺", currency: "CUP" },
  CO: { name: "Colombia", flag: "🇨🇴", currency: "COP" },
  NG: { name: "Nigeria", flag: "🇳🇬", currency: "NGN" },
  PH: { name: "Philippines", flag: "🇵🇭", currency: "PHP" },
};
