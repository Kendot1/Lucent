import { Header } from "@/components/shared/Header";
import Link from "next/link";

export default function LegalLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="relative w-full min-h-screen bg-[#09090b] selection:bg-[#6C5CE7]/30">
      <Header />
      
      {/* Background Glow */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-[#6C5CE7]/5 via-transparent to-transparent pointer-events-none" />

      <main className="relative z-10 max-w-4xl mx-auto px-6 pt-32 pb-24">
        {children}
      </main>

      {/* Simple Footer */}
      <footer className="relative z-10 border-t border-white/5 py-8 text-center bg-[#09090b]/80 backdrop-blur-xl">
        <p className="text-xs text-white/20">
          &copy; {new Date().getFullYear()} Lucent. All rights reserved.
        </p>
        <div className="flex justify-center gap-4 mt-4">
          <Link href="/legal/privacy" className="text-xs text-white/30 hover:text-white transition-colors">Privacy</Link>
          <Link href="/legal/terms" className="text-xs text-white/30 hover:text-white transition-colors">Terms</Link>
          <Link href="/legal/cookies" className="text-xs text-white/30 hover:text-white transition-colors">Cookies</Link>
        </div>
      </footer>
    </div>
  );
}
