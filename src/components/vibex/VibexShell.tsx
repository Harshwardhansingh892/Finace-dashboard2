"use client";

import { useEffect } from "react";

export function VibexShell({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    document.body.classList.add("vibex-active");
    return () => {
      document.body.classList.remove("vibex-active");
    };
  }, []);

  return (
    <div className="vibex-app fixed inset-0 z-[100] min-h-screen overflow-y-auto bg-[#0a0a0f] text-white pb-20 md:pb-0">
      {children}
    </div>
  );
}
