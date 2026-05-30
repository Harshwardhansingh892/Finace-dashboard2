export type MarketCategory =
  | "sports"
  | "finance"
  | "politics"
  | "technology"
  | "entertainment"
  | "weather"
  | "science";

export type MarketStatus = "active" | "closed" | "resolved" | "suspended";
export type OrderSide = "yes" | "no";
export type OrderType = "market" | "limit" | "stop";

export interface Market {
  id: string;
  title: string;
  description: string;
  category: MarketCategory;
  subcategory: string;
  yesPrice: number;
  noPrice: number;
  volume24h: number;
  totalVolume: number;
  openInterest: number;
  liquidity: number;
  status: MarketStatus;
  expiresAt: string;
  createdAt: string;
  resolvedAt?: string;
  resolution?: "yes" | "no";
  imageUrl?: string;
  tags: string[];
  priceHistory: PricePoint[];
  orderBook: OrderBookEntry[];
  comments: Comment[];
}

export interface PricePoint {
  time: string;
  yesPrice: number;
  volume: number;
}

export interface OrderBookEntry {
  price: number;
  quantity: number;
  side: OrderSide;
}

export interface Position {
  id: string;
  marketId: string;
  marketTitle: string;
  side: OrderSide;
  quantity: number;
  avgPrice: number;
  currentPrice: number;
  pnl: number;
  pnlPercent: number;
  createdAt: string;
}

export interface Transaction {
  id: string;
  type: "deposit" | "withdrawal" | "trade" | "fee" | "reward";
  amount: number;
  status: "completed" | "pending" | "failed";
  method?: string;
  description: string;
  createdAt: string;
}

export interface User {
  id: string;
  username: string;
  avatar: string;
  bio: string;
  winRate: number;
  roi: number;
  totalTrades: number;
  rank: number;
  predictionScore: number;
  followers: number;
  following: number;
  joinedAt: string;
}

export interface Comment {
  id: string;
  userId: string;
  username: string;
  avatar: string;
  content: string;
  likes: number;
  createdAt: string;
}

export interface WalletBalance {
  total: number;
  available: number;
  locked: number;
  margin: number;
}

export interface Notification {
  id: string;
  type: "order_filled" | "market_resolved" | "funds_added" | "price_alert";
  title: string;
  message: string;
  read: boolean;
  createdAt: string;
}
