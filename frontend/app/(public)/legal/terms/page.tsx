import { BookOpen } from "lucide-react";

export default function TermsOfServicePage() {
  return (
    <div className="bg-[#09090b] border border-white/[0.08] rounded-3xl p-8 md:p-12">
      <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-white/10 bg-white/5 text-[#A896FF] text-xs font-semibold uppercase tracking-widest mb-8">
        <BookOpen className="w-3 h-3" />
        Legal Document
      </div>

      <h1 className="text-3xl md:text-5xl font-black text-white tracking-tighter mb-4">
        Terms of Service
      </h1>
      <p className="text-white/40 text-sm md:text-base mb-12">
        Last updated: {new Date().toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" })}
      </p>

      <div className="space-y-10 text-white/60 leading-relaxed font-medium">
        
        <section>
          <h2 className="text-xl font-bold text-white tracking-tight mb-4">1. Acceptance of Terms</h2>
          <p>
            By accessing and using Lucent, you accept and agree to be bound by the terms and provision of this agreement. In addition, when using these particular services, you shall be subject to any posted guidelines or rules applicable to such services.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-white tracking-tight mb-4">2. Description of Service</h2>
          <p>
            Lucent provides users with a platform for logging, analyzing, and reviewing financial market trades. We do not provide financial, investment, or trading advice. The metrics and patterns identified by our software are derived entirely from your input data and are for informational purposes only.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-white tracking-tight mb-4">3. User Conduct</h2>
          <p className="mb-4">
            You agree to use the Service only for lawful purposes. You are solely responsible for the knowledge and adherence to any and all laws, rules, and regulations pertaining to your use of the Services. You agree not to:
          </p>
          <ul className="list-disc pl-5 space-y-2 text-white/50">
            <li>Attempt to bypass any security mechanisms of the platform</li>
            <li>Use the platform to distribute malicious code or spam</li>
            <li>Impersonate any person or entity</li>
          </ul>
        </section>

        <section>
          <h2 className="text-xl font-bold text-white tracking-tight mb-4">4. Disclaimers</h2>
          <p className="p-4 rounded-xl bg-[#6C5CE7]/10 border border-[#6C5CE7]/20 text-white/80">
            <strong>Not Financial Advice:</strong> The information provided on this platform does not constitute investment advice, financial advice, trading advice, or any other sort of advice. You should not treat any of the platform's content as such. Do conduct your own due diligence and consult your financial advisor before making any investment decisions.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-white tracking-tight mb-4">5. Account Termination</h2>
          <p>
            We may terminate or suspend access to our Service immediately, without prior notice or liability, for any reason whatsoever, including without limitation if you breach the Terms.
          </p>
        </section>
      </div>
    </div>
  );
}
