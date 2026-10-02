import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/Navbar";

export const metadata: Metadata = {
  title: "Rewardly Test Hub & Release Portal",
  description:
    "Dedicated Mobile QA Portal, APK Distribution Hub, and Automated Test Reporting Dashboard for Rewardly Customer & Vendor Flutter Apps.",
  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark scroll-smooth">
      <body className="min-h-screen bg-slate-900 text-slate-100 antialiased selection:bg-emerald-500 selection:text-slate-950 flex flex-col justify-between">
        <div>
          <Navbar />
          <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
            {children}
          </main>
        </div>

        <footer className="mt-16 border-t border-slate-800 bg-slate-950/80 py-8 text-center text-xs text-slate-500">
          <div className="mx-auto max-w-7xl px-4 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <span className="font-semibold text-slate-300">Rewardly Test Hub</span>
              <span>•</span>
              <span>Automated QA & Artifact Delivery Platform</span>
            </div>
            <div className="text-slate-500 text-[11px]">
              Flutter 3.29.0 • Android 17 (API 34) • Next.js 15
            </div>
          </div>
        </footer>
      </body>
    </html>
  );
}
