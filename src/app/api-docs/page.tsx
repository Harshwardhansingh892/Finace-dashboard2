"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";
import {
  BookOpen,
  Code,
  Key,
  Zap,
  Globe,
  Lock,
  Copy,
  Check,
} from "lucide-react";

const endpoints = [
  {
    method: "GET",
    path: "/api/v1/markets",
    description: "List all active markets with pagination and filters",
    params: ["category", "status", "sort", "limit", "offset"],
  },
  {
    method: "GET",
    path: "/api/v1/markets/{id}",
    description: "Get detailed market data including order book and price history",
    params: ["id"],
  },
  {
    method: "POST",
    path: "/api/v1/orders",
    description: "Place a new order (market or limit)",
    params: ["market_id", "side", "type", "quantity", "price"],
  },
  {
    method: "DELETE",
    path: "/api/v1/orders/{id}",
    description: "Cancel an open order",
    params: ["id"],
  },
  {
    method: "GET",
    path: "/api/v1/portfolio",
    description: "Get user's current positions and P&L",
    params: [],
  },
  {
    method: "GET",
    path: "/api/v1/wallet/balance",
    description: "Get wallet balance breakdown",
    params: [],
  },
  {
    method: "POST",
    path: "/api/v1/wallet/deposit",
    description: "Initiate a deposit via UPI, net banking, or card",
    params: ["amount", "method"],
  },
  {
    method: "WS",
    path: "/ws/v1/markets/{id}",
    description: "Real-time market data stream (prices, order book, trades)",
    params: ["id"],
  },
  {
    method: "WS",
    path: "/ws/v1/portfolio",
    description: "Real-time portfolio updates (positions, fills, P&L)",
    params: [],
  },
  {
    method: "GET",
    path: "/api/v1/markets/{id}/history",
    description: "Get historical price data with configurable intervals",
    params: ["id", "interval", "from", "to"],
  },
];

const methodColors: Record<string, string> = {
  GET: "bg-success/10 text-success",
  POST: "bg-primary/10 text-primary",
  PUT: "bg-amber-500/10 text-amber-400",
  DELETE: "bg-danger/10 text-danger",
  WS: "bg-purple-500/10 text-purple-400",
};

export default function ApiDocsPage() {
  const [copiedCode, setCopiedCode] = useState(false);

  const sampleCode = `import { ProboXClient } from '@probox/sdk';

const client = new ProboXClient({
  apiKey: 'your_api_key',
  sandbox: true,
});

// Get all cricket markets
const markets = await client.markets.list({
  category: 'sports',
  subcategory: 'cricket',
  status: 'active',
});

// Place a YES order
const order = await client.orders.create({
  marketId: 'mkt-001',
  side: 'yes',
  type: 'limit',
  quantity: 100,
  price: 62,
});

// Stream real-time prices
client.subscribe('mkt-001', (update) => {
  console.log('Price:', update.yesPrice);
  console.log('Volume:', update.volume);
});`;

  const copyCode = () => {
    navigator.clipboard.writeText(sampleCode);
    setCopiedCode(true);
    setTimeout(() => setCopiedCode(false), 2000);
  };

  return (
    <div className="mx-auto max-w-5xl px-6 py-8">
      <div className="mb-8">
        <h1 className="text-2xl font-bold flex items-center gap-2">
          <BookOpen className="h-6 w-6 text-primary" />
          API Documentation
        </h1>
        <p className="mt-1 text-sm text-muted-foreground">
          Build trading bots, analytics tools, and integrations with our REST & WebSocket APIs
        </p>
      </div>

      {/* Quick Start Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        {[
          { icon: Key, title: "Authentication", desc: "API key + HMAC signature for secure requests" },
          { icon: Zap, title: "Rate Limits", desc: "100 req/sec REST, unlimited WebSocket" },
          { icon: Globe, title: "Base URL", desc: "https://api.probox.in/v1" },
        ].map((card) => (
          <div key={card.title} className="rounded-xl border border-border bg-card p-4">
            <card.icon className="h-5 w-5 text-primary mb-2" />
            <h3 className="text-sm font-semibold">{card.title}</h3>
            <p className="text-xs text-muted-foreground mt-1">{card.desc}</p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
        {/* Endpoints List */}
        <div className="lg:col-span-3">
          <div className="rounded-xl border border-border bg-card">
            <div className="border-b border-border px-5 py-4">
              <h3 className="text-sm font-semibold">API Endpoints</h3>
            </div>
            <div className="divide-y divide-border">
              {endpoints.map((ep, i) => (
                <div
                  key={i}
                  className="px-5 py-3 hover:bg-secondary/20 transition-colors"
                >
                  <div className="flex items-center gap-3 mb-1">
                    <span
                      className={cn(
                        "rounded px-2 py-0.5 text-[10px] font-bold",
                        methodColors[ep.method]
                      )}
                    >
                      {ep.method}
                    </span>
                    <code className="text-sm font-mono text-foreground">
                      {ep.path}
                    </code>
                  </div>
                  <p className="text-xs text-muted-foreground ml-14">
                    {ep.description}
                  </p>
                  {ep.params.length > 0 && (
                    <div className="ml-14 mt-1 flex flex-wrap gap-1">
                      {ep.params.map((param) => (
                        <span
                          key={param}
                          className="rounded bg-muted px-1.5 py-0.5 text-[10px] font-mono text-muted-foreground"
                        >
                          {param}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Code Example */}
        <div className="lg:col-span-2">
          <div className="rounded-xl border border-border bg-card sticky top-20">
            <div className="border-b border-border px-4 py-3 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Code className="h-4 w-4 text-primary" />
                <span className="text-sm font-semibold">Quick Start</span>
              </div>
              <button
                onClick={copyCode}
                className="flex items-center gap-1 rounded px-2 py-1 text-xs text-muted-foreground hover:text-foreground transition-colors"
              >
                {copiedCode ? (
                  <Check className="h-3 w-3 text-success" />
                ) : (
                  <Copy className="h-3 w-3" />
                )}
                {copiedCode ? "Copied" : "Copy"}
              </button>
            </div>
            <pre className="p-4 overflow-x-auto text-xs font-mono leading-relaxed text-muted-foreground">
              <code>{sampleCode}</code>
            </pre>
          </div>

          {/* SDK Info */}
          <div className="mt-4 rounded-xl border border-border bg-card p-4">
            <h3 className="text-sm font-semibold mb-3">Official SDKs</h3>
            <div className="space-y-2">
              {[
                { lang: "TypeScript/JS", pkg: "@probox/sdk" },
                { lang: "Python", pkg: "probox-python" },
                { lang: "Rust", pkg: "probox-rs" },
                { lang: "Go", pkg: "go-probox" },
              ].map((sdk) => (
                <div
                  key={sdk.lang}
                  className="flex items-center justify-between rounded-lg bg-muted/30 px-3 py-2"
                >
                  <span className="text-xs font-medium">{sdk.lang}</span>
                  <code className="text-[10px] font-mono text-muted-foreground">
                    {sdk.pkg}
                  </code>
                </div>
              ))}
            </div>
          </div>

          {/* Rate Limits */}
          <div className="mt-4 rounded-xl border border-border bg-card p-4">
            <h3 className="text-sm font-semibold mb-3">API Tiers</h3>
            <div className="space-y-2">
              {[
                { tier: "Free", limit: "10 req/sec", price: "Free" },
                { tier: "Pro", limit: "100 req/sec", price: "₹999/mo" },
                { tier: "Enterprise", limit: "Unlimited", price: "Custom" },
              ].map((t) => (
                <div
                  key={t.tier}
                  className="flex items-center justify-between text-xs"
                >
                  <span className="font-medium">{t.tier}</span>
                  <div className="flex items-center gap-3">
                    <span className="text-muted-foreground">{t.limit}</span>
                    <span className="font-mono text-primary">{t.price}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
