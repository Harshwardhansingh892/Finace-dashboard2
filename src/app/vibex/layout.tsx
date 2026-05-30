import type { Metadata } from "next";
import { VibexProvider } from "@/lib/vibex-context";
import { BottomNav } from "@/components/vibex/BottomNav";
import { VibexShell } from "@/components/vibex/VibexShell";

export const metadata: Metadata = {
  title: "VibeX — Predict. Battle. Win.",
  description: "The world's first social prediction arena. Bet coins on flash predictions, challenge friends to vibe battles, and climb the leaderboard.",
};

export default function VibexLayout({ children }: { children: React.ReactNode }) {
  return (
    <VibexProvider>
      <VibexShell>
        <div className="mx-auto max-w-md md:max-w-2xl">
          {children}
        </div>
        <BottomNav />
      </VibexShell>
    </VibexProvider>
  );
}
