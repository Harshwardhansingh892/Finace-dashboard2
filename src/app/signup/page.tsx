"use client";

import { useState } from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import {
  BarChart3,
  ArrowRight,
  ArrowLeft,
  CheckCircle2,
  Upload,
  Shield,
  User,
  Smartphone,
  CreditCard,
  Fingerprint,
} from "lucide-react";

type Step = "account" | "kyc" | "complete";

export default function SignupPage() {
  const [step, setStep] = useState<Step>("account");

  const steps = [
    { id: "account", label: "Account", icon: User },
    { id: "kyc", label: "KYC Verification", icon: Shield },
    { id: "complete", label: "Complete", icon: CheckCircle2 },
  ];

  return (
    <div className="flex min-h-[calc(100vh-4rem)] items-center justify-center px-4 py-8">
      <div className="w-full max-w-lg">
        <div className="rounded-2xl border border-border bg-card p-8">
          {/* Logo */}
          <div className="flex items-center justify-center gap-2 mb-6">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary">
              <BarChart3 className="h-6 w-6 text-white" />
            </div>
            <span className="text-2xl font-bold gradient-text">ProboX</span>
          </div>

          {/* Progress Steps */}
          <div className="flex items-center justify-center gap-2 mb-8">
            {steps.map((s, i) => (
              <div key={s.id} className="flex items-center gap-2">
                <div
                  className={cn(
                    "flex h-8 w-8 items-center justify-center rounded-full text-xs font-bold transition-all",
                    step === s.id
                      ? "bg-primary text-white"
                      : steps.indexOf(steps.find((x) => x.id === step)!) > i
                        ? "bg-success text-white"
                        : "bg-secondary text-muted-foreground"
                  )}
                >
                  {steps.indexOf(steps.find((x) => x.id === step)!) > i ? (
                    <CheckCircle2 className="h-4 w-4" />
                  ) : (
                    i + 1
                  )}
                </div>
                {i < steps.length - 1 && (
                  <div
                    className={cn(
                      "h-px w-8",
                      steps.indexOf(steps.find((x) => x.id === step)!) > i
                        ? "bg-success"
                        : "bg-border"
                    )}
                  />
                )}
              </div>
            ))}
          </div>

          {/* Step: Account */}
          {step === "account" && (
            <div className="space-y-4">
              <h2 className="text-lg font-bold text-center">Create Account</h2>
              <p className="text-center text-sm text-muted-foreground mb-4">
                Start trading in minutes
              </p>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs text-muted-foreground mb-1.5">
                    First Name
                  </label>
                  <input
                    type="text"
                    placeholder="First name"
                    className="w-full rounded-lg border border-border bg-secondary px-3 py-2.5 text-sm outline-none focus:border-primary transition-colors"
                  />
                </div>
                <div>
                  <label className="block text-xs text-muted-foreground mb-1.5">
                    Last Name
                  </label>
                  <input
                    type="text"
                    placeholder="Last name"
                    className="w-full rounded-lg border border-border bg-secondary px-3 py-2.5 text-sm outline-none focus:border-primary transition-colors"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs text-muted-foreground mb-1.5">
                  Email Address
                </label>
                <input
                  type="email"
                  placeholder="you@example.com"
                  className="w-full rounded-lg border border-border bg-secondary px-3 py-2.5 text-sm outline-none focus:border-primary transition-colors"
                />
              </div>

              <div>
                <label className="block text-xs text-muted-foreground mb-1.5">
                  Mobile Number
                </label>
                <div className="flex gap-2">
                  <div className="flex items-center rounded-lg border border-border bg-secondary px-3 text-sm text-muted-foreground">
                    +91
                  </div>
                  <input
                    type="tel"
                    placeholder="9876543210"
                    className="flex-1 rounded-lg border border-border bg-secondary px-3 py-2.5 text-sm outline-none focus:border-primary transition-colors"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs text-muted-foreground mb-1.5">
                  Username
                </label>
                <input
                  type="text"
                  placeholder="Choose a username"
                  className="w-full rounded-lg border border-border bg-secondary px-3 py-2.5 text-sm outline-none focus:border-primary transition-colors"
                />
              </div>

              <div>
                <label className="block text-xs text-muted-foreground mb-1.5">
                  Password
                </label>
                <input
                  type="password"
                  placeholder="Min 8 characters"
                  className="w-full rounded-lg border border-border bg-secondary px-3 py-2.5 text-sm outline-none focus:border-primary transition-colors"
                />
              </div>

              <div className="flex items-start gap-2">
                <input type="checkbox" className="mt-1 rounded" />
                <p className="text-xs text-muted-foreground">
                  I agree to the{" "}
                  <span className="text-primary">Terms of Service</span> and{" "}
                  <span className="text-primary">Privacy Policy</span>. I
                  understand this platform involves financial risk.
                </p>
              </div>

              <button
                onClick={() => setStep("kyc")}
                className="w-full rounded-lg bg-primary py-2.5 text-sm font-semibold text-white hover:bg-primary/90 transition-colors flex items-center justify-center gap-2"
              >
                Continue to KYC
                <ArrowRight className="h-4 w-4" />
              </button>

              <p className="text-center text-xs text-muted-foreground">
                Already have an account?{" "}
                <Link href="/login" className="text-primary hover:underline">
                  Sign in
                </Link>
              </p>
            </div>
          )}

          {/* Step: KYC */}
          {step === "kyc" && (
            <div className="space-y-4">
              <h2 className="text-lg font-bold text-center">
                KYC Verification
              </h2>
              <p className="text-center text-sm text-muted-foreground mb-4">
                Required for trading. Verified via Aadhaar & PAN.
              </p>

              <div className="rounded-lg bg-primary/5 border border-primary/20 p-3 mb-4">
                <div className="flex items-center gap-2 text-xs text-primary">
                  <Shield className="h-4 w-4" />
                  <span className="font-medium">
                    DigiLocker integration available for instant verification
                  </span>
                </div>
              </div>

              <div>
                <label className="block text-xs text-muted-foreground mb-1.5">
                  Aadhaar Number
                </label>
                <input
                  type="text"
                  placeholder="XXXX XXXX XXXX"
                  className="w-full rounded-lg border border-border bg-secondary px-3 py-2.5 text-sm outline-none focus:border-primary transition-colors font-mono"
                />
              </div>

              <div>
                <label className="block text-xs text-muted-foreground mb-1.5">
                  PAN Number
                </label>
                <input
                  type="text"
                  placeholder="ABCDE1234F"
                  className="w-full rounded-lg border border-border bg-secondary px-3 py-2.5 text-sm outline-none focus:border-primary transition-colors font-mono uppercase"
                />
              </div>

              <div>
                <label className="block text-xs text-muted-foreground mb-1.5">
                  Date of Birth
                </label>
                <input
                  type="date"
                  className="w-full rounded-lg border border-border bg-secondary px-3 py-2.5 text-sm outline-none focus:border-primary transition-colors"
                />
              </div>

              <div>
                <label className="block text-xs text-muted-foreground mb-2">
                  Face Verification
                </label>
                <div className="flex items-center justify-center rounded-xl border-2 border-dashed border-border bg-muted/30 p-8 cursor-pointer hover:border-primary/30 transition-colors">
                  <div className="text-center">
                    <Fingerprint className="h-10 w-10 text-muted-foreground mx-auto mb-2" />
                    <p className="text-sm text-muted-foreground">
                      Click to start face verification
                    </p>
                    <p className="text-[10px] text-muted-foreground mt-1">
                      Includes liveness detection
                    </p>
                  </div>
                </div>
              </div>

              <div className="flex gap-3">
                <button
                  onClick={() => setStep("account")}
                  className="flex-1 rounded-lg border border-border py-2.5 text-sm font-medium hover:bg-secondary transition-colors flex items-center justify-center gap-2"
                >
                  <ArrowLeft className="h-4 w-4" />
                  Back
                </button>
                <button
                  onClick={() => setStep("complete")}
                  className="flex-1 rounded-lg bg-primary py-2.5 text-sm font-semibold text-white hover:bg-primary/90 transition-colors flex items-center justify-center gap-2"
                >
                  Verify & Continue
                  <ArrowRight className="h-4 w-4" />
                </button>
              </div>
            </div>
          )}

          {/* Step: Complete */}
          {step === "complete" && (
            <div className="text-center space-y-4">
              <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-success/10">
                <CheckCircle2 className="h-8 w-8 text-success" />
              </div>
              <h2 className="text-lg font-bold">Account Created!</h2>
              <p className="text-sm text-muted-foreground">
                Your KYC verification is being processed. You&apos;ll be notified
                once approved (usually within 5 minutes).
              </p>
              <div className="rounded-lg bg-muted/50 p-4 text-left space-y-2">
                <div className="flex items-center justify-between text-xs">
                  <span className="text-muted-foreground">KYC Status</span>
                  <span className="flex items-center gap-1 text-amber-400">
                    <span className="h-1.5 w-1.5 rounded-full bg-amber-400 animate-pulse" />
                    Processing
                  </span>
                </div>
                <div className="flex items-center justify-between text-xs">
                  <span className="text-muted-foreground">Aadhaar</span>
                  <span className="text-success">Verified</span>
                </div>
                <div className="flex items-center justify-between text-xs">
                  <span className="text-muted-foreground">PAN</span>
                  <span className="text-success">Verified</span>
                </div>
                <div className="flex items-center justify-between text-xs">
                  <span className="text-muted-foreground">Face Verification</span>
                  <span className="text-success">Passed</span>
                </div>
              </div>
              <Link
                href="/markets"
                className="inline-flex items-center gap-2 rounded-lg bg-primary px-6 py-2.5 text-sm font-semibold text-white hover:bg-primary/90 transition-colors"
              >
                Start Trading
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
