import type { Metadata } from "next";
import { VibexProvider } from "@/lib/vibex-context";
import { BottomNav } from "@/components/vibex/BottomNav";

export const metadata: Metadata = {
  title: "VibeX — Predict. Battle. Win.",
  description: "The world's first social prediction arena. Bet coins on flash predictions, challenge friends to vibe battles, and climb the leaderboard.",
};

export default function VibexLayout({ children }: { children: React.ReactNode }) {
  return (
    <VibexProvider>
      <div className="vibex-app min-h-screen bg-[#0a0a0f] text-white pb-20 md:pb-0">
        <div className="mx-auto max-w-md md:max-w-2xl">
          {children}
        </div>
        <BottomNav />
      </div>
    </VibexProvider>
  );
}
