import Link from "next/link";

const navLinks = [
  { label: "Products", href: "/#products" },
  { label: "Features", href: "/#features" },
  { label: "Services", href: "/#services" },
  { label: "About", href: "/#about" },
  { label: "Contact", href: "/#contact" },
];

export function Header() {
  return (
    <nav className="absolute top-0 w-full z-50 flex items-center justify-between px-6 md:px-12 py-5">
      <Link href="/" className="flex items-center gap-2.5">
        <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-[#6C5CE7] to-[#A896FF] flex items-center justify-center shadow-[0_0_20px_rgba(108,92,231,0.4)]">
          <span className="font-bold text-white text-sm">L</span>
        </div>
        <span className="font-bold text-xl tracking-tight text-white">Lucent</span>
      </Link>

      {/* Desktop Nav */}
      <div className="hidden md:flex items-center gap-8">
        {navLinks.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className="text-sm font-medium text-white/50 hover:text-white transition-colors"
          >
            {link.label}
          </Link>
        ))}
      </div>

      <div className="flex items-center gap-4">
        <Link href="/login" className="text-sm font-medium text-white/60 hover:text-white transition-colors hidden sm:block">
          Sign In
        </Link>
        <Link
          href="/dashboard"
          className="text-sm font-medium text-white bg-white/10 backdrop-blur-md border border-white/10 px-5 py-2.5 rounded-full hover:bg-white/20 transition-all"
        >
          Dashboard
        </Link>
      </div>
    </nav>
  );
}
