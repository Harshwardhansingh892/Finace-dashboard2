"use client";

import { useState } from "react";
import { walletBalance, transactions } from "@/lib/mock-data";
import { formatCurrency, cn } from "@/lib/utils";
import {
  Wallet,
  ArrowUpRight,
  ArrowDownRight,
  Plus,
  Minus,
  Clock,
  CheckCircle2,
  XCircle,
  CreditCard,
  Smartphone,
  Building2,
  IndianRupee,
  Shield,
  Lock,
} from "lucide-react";

type Tab = "overview" | "deposit" | "withdraw";

const depositMethods = [
  { id: "upi", label: "UPI", icon: Smartphone, desc: "Instant • Free" },
  { id: "netbanking", label: "Net Banking", icon: Building2, desc: "1-2 hrs • Free" },
  { id: "debit", label: "Debit Card", icon: CreditCard, desc: "Instant • 1.5% fee" },
  { id: "imps", label: "IMPS/NEFT", icon: IndianRupee, desc: "30 min • Free" },
];

export default function WalletPage() {
  const [tab, setTab] = useState<Tab>("overview");
  const [depositAmount, setDepositAmount] = useState("");
  const [selectedMethod, setSelectedMethod] = useState("upi");

  return (
    <div className="mx-auto max-w-5xl px-6 py-8">
      <div className="mb-8">
        <h1 className="text-2xl font-bold">Wallet</h1>
        <p className="mt-1 text-sm text-muted-foreground">
          Manage your funds, deposits, and withdrawals
        </p>
      </div>

      {/* Balance Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {[
          {
            label: "Total Balance",
            value: walletBalance.total,
            icon: Wallet,
            color: "text-primary",
          },
          {
            label: "Available",
            value: walletBalance.available,
            icon: CheckCircle2,
            color: "text-success",
          },
          {
            label: "Locked in Orders",
            value: walletBalance.locked,
            icon: Lock,
            color: "text-amber-400",
          },
          {
            label: "Margin Used",
            value: walletBalance.margin,
            icon: Shield,
            color: "text-purple-400",
          },
        ].map((card) => (
          <div
            key={card.label}
            className="rounded-xl border border-border bg-card p-4"
          >
            <card.icon className={cn("h-5 w-5 mb-2", card.color)} />
            <p className="text-xl font-bold">{formatCurrency(card.value)}</p>
            <p className="text-xs text-muted-foreground">{card.label}</p>
          </div>
        ))}
      </div>

      {/* Actions + Tabs */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left: Transaction Actions */}
        <div className="space-y-6">
          {/* Quick Actions */}
          <div className="grid grid-cols-2 gap-3">
            <button
              onClick={() => setTab("deposit")}
              className={cn(
                "flex flex-col items-center gap-2 rounded-xl border p-4 transition-all",
                tab === "deposit"
                  ? "border-success bg-success/5 text-success"
                  : "border-border bg-card hover:border-success/30"
              )}
            >
              <Plus className="h-6 w-6" />
              <span className="text-sm font-medium">Deposit</span>
            </button>
            <button
              onClick={() => setTab("withdraw")}
              className={cn(
                "flex flex-col items-center gap-2 rounded-xl border p-4 transition-all",
                tab === "withdraw"
                  ? "border-primary bg-primary/5 text-primary"
                  : "border-border bg-card hover:border-primary/30"
              )}
            >
              <Minus className="h-6 w-6" />
              <span className="text-sm font-medium">Withdraw</span>
            </button>
          </div>

          {/* Deposit/Withdraw Form */}
          {tab !== "overview" && (
            <div className="rounded-xl border border-border bg-card p-5">
              <h3 className="text-sm font-semibold mb-4">
                {tab === "deposit" ? "Add Funds" : "Withdraw Funds"}
              </h3>

              <div className="mb-4">
                <label className="block text-xs text-muted-foreground mb-1.5">
                  Amount (₹)
                </label>
                <input
                  type="number"
                  value={depositAmount}
                  onChange={(e) => setDepositAmount(e.target.value)}
                  placeholder="Enter amount"
                  className="w-full rounded-lg border border-border bg-secondary px-3 py-2.5 text-sm font-mono outline-none focus:border-primary transition-colors"
                />
                <div className="mt-2 flex gap-2">
                  {[1000, 5000, 10000, 50000].map((amt) => (
                    <button
                      key={amt}
                      onClick={() => setDepositAmount(amt.toString())}
                      className="flex-1 rounded-md bg-muted py-1.5 text-xs text-muted-foreground hover:bg-secondary hover:text-foreground transition-colors"
                    >
                      ₹{(amt / 1000).toFixed(0)}K
                    </button>
                  ))}
                </div>
              </div>

              {tab === "deposit" && (
                <div className="mb-4">
                  <label className="block text-xs text-muted-foreground mb-2">
                    Payment Method
                  </label>
                  <div className="space-y-2">
                    {depositMethods.map((method) => (
                      <button
                        key={method.id}
                        onClick={() => setSelectedMethod(method.id)}
                        className={cn(
                          "flex w-full items-center gap-3 rounded-lg border p-3 transition-colors",
                          selectedMethod === method.id
                            ? "border-primary bg-primary/5"
                            : "border-border hover:border-primary/20"
                        )}
                      >
                        <method.icon className="h-5 w-5 text-muted-foreground" />
                        <div className="text-left">
                          <p className="text-sm font-medium">{method.label}</p>
                          <p className="text-[10px] text-muted-foreground">
                            {method.desc}
                          </p>
                        </div>
                      </button>
                    ))}
                  </div>
                </div>
              )}

              <button className="w-full rounded-lg bg-primary py-2.5 text-sm font-semibold text-white hover:bg-primary/90 transition-colors">
                {tab === "deposit" ? "Add Funds" : "Withdraw"}
              </button>
            </div>
          )}
        </div>

        {/* Right: Transaction History */}
        <div className="lg:col-span-2">
          <div className="rounded-xl border border-border bg-card">
            <div className="border-b border-border px-5 py-4">
              <h3 className="text-sm font-semibold">Transaction History</h3>
            </div>
            <div className="divide-y divide-border">
              {transactions.map((txn) => (
                <div
                  key={txn.id}
                  className="flex items-center justify-between px-5 py-3 hover:bg-secondary/20 transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <div
                      className={cn(
                        "flex h-9 w-9 items-center justify-center rounded-lg",
                        txn.type === "deposit"
                          ? "bg-success/10 text-success"
                          : txn.type === "withdrawal"
                            ? "bg-danger/10 text-danger"
                            : txn.type === "reward"
                              ? "bg-amber-500/10 text-amber-400"
                              : txn.type === "fee"
                                ? "bg-muted text-muted-foreground"
                                : "bg-primary/10 text-primary"
                      )}
                    >
                      {txn.type === "deposit" ? (
                        <ArrowDownRight className="h-4 w-4" />
                      ) : txn.type === "withdrawal" ? (
                        <ArrowUpRight className="h-4 w-4" />
                      ) : (
                        <IndianRupee className="h-4 w-4" />
                      )}
                    </div>
                    <div>
                      <p className="text-sm font-medium">{txn.description}</p>
                      <div className="flex items-center gap-2 mt-0.5">
                        <span className="text-[10px] text-muted-foreground">
                          {new Date(txn.createdAt).toLocaleDateString("en-IN")}
                        </span>
                        {txn.method && (
                          <span className="text-[10px] text-muted-foreground">
                            via {txn.method}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <p
                      className={cn(
                        "text-sm font-mono font-medium",
                        txn.amount > 0 ? "text-success" : "text-foreground"
                      )}
                    >
                      {txn.amount > 0 ? "+" : ""}
                      {formatCurrency(txn.amount)}
                    </p>
                    <span
                      className={cn(
                        "text-[10px]",
                        txn.status === "completed"
                          ? "text-success"
                          : txn.status === "pending"
                            ? "text-amber-400"
                            : "text-danger"
                      )}
                    >
                      {txn.status}
                    </span>
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
