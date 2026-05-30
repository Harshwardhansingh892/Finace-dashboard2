# ProboX — India's Prediction Market Exchange

A world-class prediction market platform inspired by Kalshi, Polymarket, and financial exchanges, designed specifically for the Indian market.

## What is ProboX?

ProboX is a platform where users trade contracts based on future events. Contracts settle as YES or NO, with prices from ₹1 to ₹100 representing crowd probability.

**Example Markets:**
- Will India win the Champions Trophy 2026?
- Will NIFTY close above 25,000 this month?
- Will ISRO launch Gaganyaan before December?
- Will Mumbai receive >500mm rain in July?
- Will Pushpa 3 cross ₹500Cr opening week?

## Features

### Core Trading
- Central Limit Order Book (CLOB) with market, limit, and stop orders
- Real-time price charts with TradingView-style indicators
- Order book visualization with depth charts
- Portfolio management with P&L tracking

### Market Categories
- **Sports** — Cricket, IPL, Football, Olympics, Kabaddi, Chess
- **Finance** — NIFTY, SENSEX, RBI rates, Inflation, GDP
- **Politics** — Elections, State elections, Parliament outcomes
- **Technology** — AI releases, Product launches, Startup funding
- **Entertainment** — Movies, OTT, Box office
- **Weather** — Rainfall, Temperature, Cyclones
- **Science** — Space missions, Research milestones

### Indian-First Design
- Aadhaar + PAN KYC verification via DigiLocker
- UPI, Net Banking, IMPS, NEFT deposits
- INR wallet with instant payouts
- Face verification with liveness detection

### Platform
- Leaderboard and social features
- Admin dashboard with KYC review, fraud detection, system monitoring
- REST and WebSocket API with developer portal
- AI-powered market insights

## Tech Stack

- **Framework:** Next.js 16 (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS v4
- **Charts:** Recharts
- **Icons:** Lucide React
- **UI:** Custom components with Radix UI primitives

## Getting Started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Project Structure

```
src/
├── app/                  # Next.js App Router pages
│   ├── page.tsx          # Home / Landing
│   ├── markets/          # Markets listing + detail
│   ├── portfolio/        # Portfolio management
│   ├── wallet/           # Wallet & transactions
│   ├── leaderboard/      # Top traders
│   ├── admin/            # Admin dashboard
│   ├── login/            # Authentication
│   ├── signup/           # Registration + KYC
│   └── api-docs/         # API documentation
├── components/
│   ├── layout/           # Sidebar, Header
│   ├── markets/          # MarketCard
│   ├── trading/          # OrderBook, TradingPanel
│   └── charts/           # PriceChart
└── lib/
    ├── types.ts          # TypeScript types
    ├── utils.ts          # Utilities
    └── mock-data.ts      # Demo data
```

## Disclaimer

This is a prototype/demo. Real-money prediction markets in India require regulatory approval under securities, derivatives, or gaming frameworks. Consult specialized legal and regulatory advisors before launching real-money markets.
