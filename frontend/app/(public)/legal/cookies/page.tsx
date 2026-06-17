import { Cookie } from "lucide-react";

export default function CookiePolicyPage() {
  return (
    <div className="bg-[#09090b] border border-white/[0.08] rounded-3xl p-8 md:p-12">
      <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-white/10 bg-white/5 text-[#A896FF] text-xs font-semibold uppercase tracking-widest mb-8">
        <Cookie className="w-3 h-3" />
        Legal Document
      </div>

      <h1 className="text-3xl md:text-5xl font-black text-white tracking-tighter mb-4">
        Cookie Policy
      </h1>
      <p className="text-white/40 text-sm md:text-base mb-12">
        Last updated: {new Date().toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" })}
      </p>

      <div className="space-y-10 text-white/60 leading-relaxed font-medium">
        
        <section>
          <h2 className="text-xl font-bold text-white tracking-tight mb-4">1. What Are Cookies?</h2>
          <p>
            Cookies are small text files that are placed on your computer or mobile device when you visit a website. They are widely used in order to make websites work, or work more efficiently, as well as to provide information to the owners of the site.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-white tracking-tight mb-4">2. How We Use Cookies</h2>
          <p className="mb-4">
            Lucent uses cookies strictly for essential operational purposes. We do not use third-party advertising cookies or trackers. The cookies we use allow us to:
          </p>
          <ul className="list-disc pl-5 space-y-2 text-white/50">
            <li>Keep you logged in securely (Authentication Cookies via Supabase)</li>
            <li>Remember your UI preferences, such as dark mode or chart layouts</li>
            <li>Protect against Cross-Site Request Forgery (CSRF) attacks</li>
          </ul>
        </section>

        <section>
          <h2 className="text-xl font-bold text-white tracking-tight mb-4">3. Managing Your Cookies</h2>
          <p>
            You can set your browser not to accept cookies. However, in a few cases, some of our core application features may not function as a result, specifically your ability to log in and manage your trading data securely.
          </p>
        </section>

      </div>
    </div>
  );
}
