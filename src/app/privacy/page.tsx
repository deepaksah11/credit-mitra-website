import React from 'react';
import { Sparkle } from '@phosphor-icons/react/dist/ssr';

export const metadata = {
  title: 'Privacy Policy — How We Protect Your Data | Credit Mitra',
  description:
    'Read our privacy policy detailing how Credit Mitra handles anonymized analytics and user privacy.',
};

export default function PrivacyPolicyPage() {
  return (
    <div className="relative min-h-screen pb-20">
      {/* Background Soft Peach Ambient Glow Mesh matching Hero */}
      <div
        className="absolute -top-24 right-0 w-[600px] h-[500px] pointer-events-none -z-10"
        style={{
          background:
            'radial-gradient(circle at 70% 30%, rgba(254, 215, 170, 0.4) 0%, rgba(251, 146, 60, 0.15) 50%, transparent 70%)',
        }}
      />

      <div className="max-w-4xl mx-auto px-4 py-8 md:py-16 space-y-8">
        <div className="space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#FDE4CE] text-[#9A3412] text-xs font-bold shadow-sm">
            <Sparkle size={13} weight="fill" className="text-[#9A3412]" />
            <span>Privacy &amp; Security</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-[#0B0F17] tracking-tight">
            Privacy Policy
          </h1>
          <p className="text-xs sm:text-sm text-slate-500">
            Effective date: November 2026
          </p>
        </div>

        <div className="rounded-3xl bg-white p-6 sm:p-10 space-y-6 text-xs sm:text-sm text-slate-700 leading-relaxed shadow-xl shadow-black/[0.03]">
          <section className="space-y-2">
            <h2 className="text-base sm:text-lg font-bold text-[#0B0F17]">1. Information We Do Not Collect</h2>
            <p>
              Credit Mitra does not collect, process, or store sensitive financial data, bank account passwords, Credit Information Reports (CIR), Aadhaar numbers, or Permanent Account Numbers (PAN).
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-base sm:text-lg font-bold text-[#0F172A]">2. Technical and Analytics Data</h2>
            <p>
              When you navigate our website or click an outbound referral link (`/go/:slug`), our servers collect standard server log data:
            </p>
            <ul className="list-disc pl-5 space-y-1.5">
              <li>Anonymized IP address and general device classification (mobile, tablet, or desktop)</li>
              <li>Browser user agent string</li>
              <li>Referring URL or referral campaign parameters (e.g. `utm_source`)</li>
              <li>Timestamp of your visit or link click</li>
            </ul>
            <p>
              This data is aggregated exclusively to analyze aggregate platform popularity, monitor fraudulent bot clicks, and improve user interface performance.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-base sm:text-lg font-bold text-[#0F172A]">3. Third-Party Links</h2>
            <p>
              Our website contains links to bank portals and affiliate networks. Once you leave Credit Mitra, the privacy policies and security procedures of the destination bank govern your interaction.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-base sm:text-lg font-bold text-[#0F172A]">4. Contact Us</h2>
            <p>
              For privacy inquiries, email privacy@creditmitra.com.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
