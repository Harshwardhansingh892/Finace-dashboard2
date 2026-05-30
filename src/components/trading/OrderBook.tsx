"use client";

import { OrderBookEntry } from "@/lib/types";
import { cn } from "@/lib/utils";

interface OrderBookProps {
  entries: OrderBookEntry[];
}

export default function OrderBook({ entries }: OrderBookProps) {
  const bids = entries
    .filter((e) => e.side === "yes")
    .sort((a, b) => b.price - a.price)
    .slice(0, 8);
  const asks = entries
    .filter((e) => e.side === "no")
    .sort((a, b) => a.price - b.price)
    .slice(0, 8);

  const maxQty = Math.max(...entries.map((e) => e.quantity));

  return (
    <div className="rounded-xl border border-border bg-card">
      <div className="border-b border-border px-4 py-3">
        <h3 className="text-sm font-semibold">Order Book</h3>
      </div>
      <div className="p-4">
        <div className="mb-2 grid grid-cols-3 text-[10px] font-medium uppercase text-muted-foreground">
          <span>Price</span>
          <span className="text-center">Qty</span>
          <span className="text-right">Total</span>
        </div>

        <div className="space-y-0.5">
          {asks.reverse().map((entry, i) => (
            <div key={`ask-${i}`} className="relative grid grid-cols-3 py-1 text-xs">
              <div
                className="absolute inset-0 rounded bg-danger/10"
                style={{ width: `${(entry.quantity / maxQty) * 100}%` }}
              />
              <span className="relative font-mono text-danger">
                {entry.price.toFixed(1)}¢
              </span>
              <span className="relative text-center font-mono text-muted-foreground">
                {entry.quantity.toLocaleString()}
              </span>
              <span className="relative text-right font-mono text-muted-foreground">
                {((entry.price * entry.quantity) / 100).toFixed(0)}
              </span>
            </div>
          ))}
        </div>

        <div className="my-2 flex items-center justify-center gap-2 border-y border-border py-2">
          <span className="text-lg font-bold text-success">62.0¢</span>
          <span className="text-xs text-muted-foreground">Spread: 1.2¢</span>
        </div>

        <div className="space-y-0.5">
          {bids.map((entry, i) => (
            <div key={`bid-${i}`} className="relative grid grid-cols-3 py-1 text-xs">
              <div
                className="absolute inset-0 rounded bg-success/10"
                style={{ width: `${(entry.quantity / maxQty) * 100}%` }}
              />
              <span className="relative font-mono text-success">
                {entry.price.toFixed(1)}¢
              </span>
              <span className="relative text-center font-mono text-muted-foreground">
                {entry.quantity.toLocaleString()}
              </span>
              <span className="relative text-right font-mono text-muted-foreground">
                {((entry.price * entry.quantity) / 100).toFixed(0)}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
