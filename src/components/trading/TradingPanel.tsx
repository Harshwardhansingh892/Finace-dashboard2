"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";
import { formatCurrency } from "@/lib/utils";
import { Calculator, Info } from "lucide-react";

interface TradingPanelProps {
  yesPrice: number;
  noPrice: number;
  marketTitle: string;
}

export default function TradingPanel({
  yesPrice,
  noPrice,
  marketTitle,
}: TradingPanelProps) {
  const [side, setSide] = useState<"yes" | "no">("yes");
  const [orderType, setOrderType] = useState<"market" | "limit">("market");
  const [quantity, setQuantity] = useState("");
  const [limitPrice, setLimitPrice] = useState("");

  const price = side === "yes" ? yesPrice : noPrice;
  const qty = parseInt(quantity) || 0;
  const cost = (qty * price) / 100;
  const potentialPayout = qty;
  const potentialProfit = potentialPayout - cost;

  return (
    <div className="rounded-xl border border-border bg-card">
      <div className="border-b border-border px-4 py-3">
        <h3 className="text-sm font-semibold">Place Order</h3>
      </div>
      <div className="p-4 space-y-4">
        <div className="grid grid-cols-2 gap-2">
          <button
            onClick={() => setSide("yes")}
            className={cn(
              "rounded-lg py-3 text-sm font-bold transition-all",
              side === "yes"
                ? "bg-success text-white shadow-lg shadow-success/25"
                : "bg-success/10 text-success hover:bg-success/20"
            )}
          >
            Buy YES {yesPrice}¢
          </button>
          <button
            onClick={() => setSide("no")}
            className={cn(
              "rounded-lg py-3 text-sm font-bold transition-all",
              side === "no"
                ? "bg-danger text-white shadow-lg shadow-danger/25"
                : "bg-danger/10 text-danger hover:bg-danger/20"
            )}
          >
            Buy NO {noPrice}¢
          </button>
        </div>

        <div className="flex gap-2">
          <button
            onClick={() => setOrderType("market")}
            className={cn(
              "flex-1 rounded-md py-1.5 text-xs font-medium transition-colors",
              orderType === "market"
                ? "bg-secondary text-foreground"
                : "text-muted-foreground hover:text-foreground"
            )}
          >
            Market
          </button>
          <button
            onClick={() => setOrderType("limit")}
            className={cn(
              "flex-1 rounded-md py-1.5 text-xs font-medium transition-colors",
              orderType === "limit"
                ? "bg-secondary text-foreground"
                : "text-muted-foreground hover:text-foreground"
            )}
          >
            Limit
          </button>
        </div>

        <div>
          <label className="mb-1.5 block text-xs text-muted-foreground">
            Quantity (contracts)
          </label>
          <input
            type="number"
            value={quantity}
            onChange={(e) => setQuantity(e.target.value)}
            placeholder="0"
            className="w-full rounded-lg border border-border bg-secondary px-3 py-2.5 text-sm font-mono outline-none focus:border-primary transition-colors"
          />
          <div className="mt-1.5 flex gap-2">
            {[10, 50, 100, 500].map((q) => (
              <button
                key={q}
                onClick={() => setQuantity(q.toString())}
                className="flex-1 rounded-md bg-muted py-1 text-xs text-muted-foreground hover:bg-secondary hover:text-foreground transition-colors"
              >
                {q}
              </button>
            ))}
          </div>
        </div>

        {orderType === "limit" && (
          <div>
            <label className="mb-1.5 block text-xs text-muted-foreground">
              Limit Price (¢)
            </label>
            <input
              type="number"
              value={limitPrice}
              onChange={(e) => setLimitPrice(e.target.value)}
              placeholder={price.toString()}
              className="w-full rounded-lg border border-border bg-secondary px-3 py-2.5 text-sm font-mono outline-none focus:border-primary transition-colors"
            />
          </div>
        )}

        <div className="rounded-lg bg-muted/50 p-3 space-y-2">
          <div className="flex justify-between text-xs">
            <span className="text-muted-foreground">Price per contract</span>
            <span className="font-mono">{price}¢</span>
          </div>
          <div className="flex justify-between text-xs">
            <span className="text-muted-foreground">Quantity</span>
            <span className="font-mono">{qty}</span>
          </div>
          <div className="flex justify-between text-xs border-t border-border pt-2">
            <span className="text-muted-foreground">Total Cost</span>
            <span className="font-mono font-bold">
              {formatCurrency(cost)}
            </span>
          </div>
          <div className="flex justify-between text-xs">
            <span className="text-muted-foreground">Potential Payout</span>
            <span className="font-mono text-success">
              {formatCurrency(potentialPayout)}
            </span>
          </div>
          <div className="flex justify-between text-xs">
            <span className="text-muted-foreground">Potential Profit</span>
            <span
              className={cn(
                "font-mono font-bold",
                potentialProfit >= 0 ? "text-success" : "text-danger"
              )}
            >
              {formatCurrency(potentialProfit)}
            </span>
          </div>
        </div>

        <button
          className={cn(
            "w-full rounded-lg py-3 text-sm font-bold transition-all",
            side === "yes"
              ? "bg-success text-white hover:bg-success/90 shadow-lg shadow-success/20"
              : "bg-danger text-white hover:bg-danger/90 shadow-lg shadow-danger/20",
            qty === 0 && "opacity-50 cursor-not-allowed"
          )}
          disabled={qty === 0}
        >
          {side === "yes" ? "Buy YES" : "Buy NO"} — {formatCurrency(cost)}
        </button>

        <div className="flex items-center gap-1.5 text-[10px] text-muted-foreground">
          <Info className="h-3 w-3" />
          <span>
            Trading fees: 2% of profit on winning trades. No fee on losses.
          </span>
        </div>
      </div>
    </div>
  );
}
