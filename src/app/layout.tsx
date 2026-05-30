import type { Metadata } from "next";
import "./globals.css";
import Sidebar from "@/components/layout/Sidebar";
import Header from "@/components/layout/Header";

export const metadata: Metadata = {
  title: "ProboX - India's Prediction Market Exchange",
  description:
    "Trade on the outcomes of real-world events. Sports, finance, politics, technology, and more.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">
        <Sidebar />
        <div className="pl-60">
          <Header />
          <main className="min-h-[calc(100vh-4rem)]">{children}</main>
        </div>
      </body>
    </html>
  );
}
