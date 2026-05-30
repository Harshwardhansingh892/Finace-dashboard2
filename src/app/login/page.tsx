"use client";

import { useState } from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import {
  BarChart3,
  Mail,
  Smartphone,
  Lock,
  Eye,
  EyeOff,
  ArrowRight,
  Fingerprint,
} from "lucide-react";

type LoginMethod = "email" | "mobile" | "google";

export default function LoginPage() {
  const [method, setMethod] = useState<LoginMethod>("email");
  const [showPassword, setShowPassword] = useState(false);
  const [otpSent, setOtpSent] = useState(false);

  return (
    <div className="flex min-h-[calc(100vh-4rem)] items-center justify-center px-4">
      <div className="w-full max-w-md">
        <div className="rounded-2xl border border-border bg-card p-8">
          {/* Logo */}
          <div className="flex items-center justify-center gap-2 mb-6">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary">
              <BarChart3 className="h-6 w-6 text-white" />
            </div>
            <span className="text-2xl font-bold gradient-text">ProboX</span>
          </div>

          <h1 className="text-center text-xl font-bold mb-1">Welcome back</h1>
          <p className="text-center text-sm text-muted-foreground mb-6">
            Sign in to trade on prediction markets
          </p>

          {/* Login Method Tabs */}
          <div className="flex gap-1 rounded-lg bg-secondary p-1 mb-6">
            {(
              [
                { value: "email", label: "Email", icon: Mail },
                { value: "mobile", label: "Mobile", icon: Smartphone },
              ] as const
            ).map((tab) => (
              <button
                key={tab.value}
                onClick={() => {
                  setMethod(tab.value);
                  setOtpSent(false);
                }}
                className={cn(
                  "flex flex-1 items-center justify-center gap-1.5 rounded-md py-2 text-xs font-medium transition-colors",
                  method === tab.value
                    ? "bg-card text-foreground shadow-sm"
                    : "text-muted-foreground hover:text-foreground"
                )}
              >
                <tab.icon className="h-3.5 w-3.5" />
                {tab.label}
              </button>
            ))}
          </div>

          {/* Login Form */}
          <div className="space-y-4">
            {method === "email" && (
              <>
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
                    Password
                  </label>
                  <div className="relative">
                    <input
                      type={showPassword ? "text" : "password"}
                      placeholder="Enter password"
                      className="w-full rounded-lg border border-border bg-secondary px-3 py-2.5 pr-10 text-sm outline-none focus:border-primary transition-colors"
                    />
                    <button
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground"
                    >
                      {showPassword ? (
                        <EyeOff className="h-4 w-4" />
                      ) : (
                        <Eye className="h-4 w-4" />
                      )}
                    </button>
                  </div>
                  <div className="mt-1 text-right">
                    <button className="text-xs text-primary hover:underline">
                      Forgot password?
                    </button>
                  </div>
                </div>
              </>
            )}

            {method === "mobile" && (
              <>
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
                {otpSent && (
                  <div>
                    <label className="block text-xs text-muted-foreground mb-1.5">
                      Enter OTP
                    </label>
                    <div className="flex gap-2">
                      {Array.from({ length: 6 }).map((_, i) => (
                        <input
                          key={i}
                          type="text"
                          maxLength={1}
                          className="h-11 w-11 rounded-lg border border-border bg-secondary text-center text-lg font-mono outline-none focus:border-primary transition-colors"
                        />
                      ))}
                    </div>
                    <div className="mt-2 text-right">
                      <button className="text-xs text-primary hover:underline">
                        Resend OTP
                      </button>
                    </div>
                  </div>
                )}
              </>
            )}

            <button
              onClick={() => method === "mobile" && !otpSent && setOtpSent(true)}
              className="w-full rounded-lg bg-primary py-2.5 text-sm font-semibold text-white hover:bg-primary/90 transition-colors flex items-center justify-center gap-2"
            >
              {method === "mobile" && !otpSent ? "Send OTP" : "Sign In"}
              <ArrowRight className="h-4 w-4" />
            </button>
          </div>

          {/* Divider */}
          <div className="my-6 flex items-center gap-3">
            <div className="flex-1 h-px bg-border" />
            <span className="text-xs text-muted-foreground">OR</span>
            <div className="flex-1 h-px bg-border" />
          </div>

          {/* Social Login */}
          <div className="space-y-3">
            <button className="flex w-full items-center justify-center gap-2 rounded-lg border border-border py-2.5 text-sm font-medium hover:bg-secondary transition-colors">
              <svg className="h-4 w-4" viewBox="0 0 24 24">
                <path
                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z"
                  fill="#4285F4"
                />
                <path
                  d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                  fill="#34A853"
                />
                <path
                  d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                  fill="#FBBC05"
                />
                <path
                  d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                  fill="#EA4335"
                />
              </svg>
              Continue with Google
            </button>
            <button className="flex w-full items-center justify-center gap-2 rounded-lg border border-border py-2.5 text-sm font-medium hover:bg-secondary transition-colors">
              <Fingerprint className="h-4 w-4" />
              Sign in with Passkey
            </button>
          </div>

          {/* Sign up link */}
          <p className="mt-6 text-center text-sm text-muted-foreground">
            Don&apos;t have an account?{" "}
            <Link href="/signup" className="text-primary hover:underline font-medium">
              Create one
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
