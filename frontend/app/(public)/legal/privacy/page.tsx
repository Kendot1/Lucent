import { Shield } from "lucide-react";

export default function PrivacyPolicyPage() {
  return (
    <div className="bg-[#09090b] border border-white/[0.08] rounded-3xl p-8 md:p-12">
      <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-white/10 bg-white/5 text-[#A896FF] text-xs font-semibold uppercase tracking-widest mb-8">
        <Shield className="w-3 h-3" />
        Legal Document
      </div>

      <h1 className="text-3xl md:text-5xl font-black text-white tracking-tighter mb-4">
        Privacy Policy
      </h1>
      <p className="text-white/40 text-sm md:text-base mb-12">
        Last updated: {new Date().toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" })}
      </p>

      <div className="space-y-10 text-white/60 leading-relaxed font-medium">
        
        <section>
          <h2 className="text-xl font-bold text-white tracking-tight mb-4">1. Information We Collect</h2>
          <p className="mb-4">
            Lucent ("we," "our," or "us") is committed to protecting your privacy. We collect information you provide directly to us when you create an account, log trades, or communicate with us. This includes:
          </p>
          <ul className="list-disc pl-5 space-y-2 text-white/50">
            <li>Account information (email address, username)</li>
            <li>Trading data (entry/exit points, instruments, P&L, timestamps)</li>
            <li>Journal entries and custom tags</li>
          </ul>
        </section>

        <section>
          <h2 className="text-xl font-bold text-white tracking-tight mb-4">2. How We Use Your Data</h2>
          <p className="mb-4">
            The data you input into Lucent is used exclusively to provide and improve the trading analytics service. We use your information to:
          </p>
          <ul className="list-disc pl-5 space-y-2 text-white/50">
            <li>Generate personalized performance metrics and charts</li>
            <li>Identify behavioral patterns in your trading</li>
            <li>Maintain and secure your account via Supabase</li>
          </ul>
          <p className="mt-4 text-[#A896FF]">
            We do not sell, rent, or trade your personal or financial data to third parties.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-white tracking-tight mb-4">3. Data Security & Storage</h2>
          <p>
            Your trading data is securely stored using Supabase, featuring Row Level Security (RLS) policies. This ensures that your private data is entirely isolated and can only be accessed by your authenticated user session. 
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-white tracking-tight mb-4">4. Your Rights & Data Ownership</h2>
          <p>
            Your data belongs to you. You maintain the right to:
          </p>
          <ul className="list-disc pl-5 space-y-2 text-white/50 mt-4">
            <li>Export all of your trading data at any time via CSV</li>
            <li>Request permanent deletion of your account and associated records</li>
            <li>Update or correct inaccurate information in your profile</li>
          </ul>
        </section>

        <section>
          <h2 className="text-xl font-bold text-white tracking-tight mb-4">5. Contact Us</h2>
          <p>
            If you have any questions about this Privacy Policy, please contact us through the portal on our main page.
          </p>
        </section>
      </div>
    </div>
  );
}
