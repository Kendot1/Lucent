import { Logo } from "@/components/shared/Logo";
import { Header } from "@/components/shared/Header";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4 bg-bg-primary">
      <Header />
      {/* Subtle background gradient */}
      <div
        className="fixed inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse at 50% 0%, var(--accent-muted) 0%, transparent 50%)",
        }}
      />

      <div className="relative z-10 w-full max-w-sm space-y-8">
        {/* Logo */}
        <div className="flex justify-center">
          <Logo />
        </div>

        {/* Auth Form */}
        {children}
      </div>
    </div>
  );
}
