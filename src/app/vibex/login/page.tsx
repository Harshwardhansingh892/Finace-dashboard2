"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useVibex } from "@/lib/vibex-context";
import Link from "next/link";

export default function LoginPage() {
  const router = useRouter();
  const { isLoggedIn } = useVibex();
  const [username, setUsername] = useState("");

  if (isLoggedIn) {
    router.push("/vibex");
    return null;
  }

  const handleLogin = () => {
    const saved = localStorage.getItem("vibex_user");
    if (saved) {
      const user = JSON.parse(saved);
      if (user.username === username.toLowerCase()) {
        router.push("/vibex");
        return;
      }
    }
    alert("Account not found. Sign up first!");
  };

  return (
    <div className="flex min-h-screen flex-col items-center justify-center p-6">
      <div className="w-full max-w-sm">
        <div className="mb-8 text-center">
          <h1 className="text-4xl font-black tracking-tighter">
            <span className="bg-gradient-to-r from-[#00f0ff] via-[#7b61ff] to-[#ff00e5] bg-clip-text text-transparent">
              VibeX
            </span>
          </h1>
          <p className="mt-2 text-sm text-zinc-500">Welcome back</p>
        </div>

        <div className="space-y-4">
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Username"
            className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-lg font-medium outline-none transition-all focus:border-[#00f0ff]/50 focus:ring-2 focus:ring-[#00f0ff]/20"
            autoFocus
            onKeyDown={(e) => e.key === "Enter" && handleLogin()}
          />
          <button
            onClick={handleLogin}
            className="flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-[#00f0ff] to-[#7b61ff] py-3.5 text-sm font-bold text-black transition-all hover:scale-[1.02] hover:shadow-[0_0_30px_rgba(0,240,255,0.3)]"
          >
            Log In
          </button>
        </div>

        <p className="mt-4 text-center text-xs text-zinc-500">
          New here?{" "}
          <Link href="/vibex/signup" className="text-[#00f0ff] hover:underline">
            Create account
          </Link>
        </p>
      </div>
    </div>
  );
}
