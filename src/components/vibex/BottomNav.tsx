"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Flame, Swords, RotateCw, Trophy, User } from "lucide-react";

const NAV_ITEMS = [
  { href: "/vibex", icon: Flame, label: "Feed" },
  { href: "/vibex/arena", icon: Swords, label: "Arena" },
  { href: "/vibex/spin", icon: RotateCw, label: "Spin" },
  { href: "/vibex/leaderboard", icon: Trophy, label: "Ranks" },
  { href: "/vibex/profile", icon: User, label: "Me" },
];

export function BottomNav() {
  const pathname = usePathname();

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 border-t border-white/10 bg-[#0a0a0f]/95 backdrop-blur-xl md:hidden">
      <div className="mx-auto flex max-w-md items-center justify-around py-2">
        {NAV_ITEMS.map((item) => {
          const isActive = pathname === item.href || (item.href !== "/vibex" && pathname.startsWith(item.href));
          const Icon = item.icon;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex flex-col items-center gap-0.5 px-3 py-1 transition-all ${
                isActive
                  ? "text-[#00f0ff] scale-110"
                  : "text-zinc-500 hover:text-zinc-300"
              }`}
            >
              <Icon size={22} strokeWidth={isActive ? 2.5 : 1.5} />
              <span className="text-[10px] font-medium">{item.label}</span>
              {isActive && (
                <div className="absolute -top-0.5 h-0.5 w-8 rounded-full bg-[#00f0ff] shadow-[0_0_10px_#00f0ff]" />
              )}
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
