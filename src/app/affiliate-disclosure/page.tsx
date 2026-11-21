import React from 'react';
import Link from 'next/link';
import { Info, Sparkle } from '@phosphor-icons/react/dist/ssr';

export const metadata = {
  title: 'Affiliate Disclosure — Transparent Compensation Policy | Credit Mitra',
  description:
    'Read our complete affiliate disclosure and advertising policy. Learn how Credit Mitra earns commissions without charging visitors.',
};

export default function AffiliateDisclosurePage() {
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
            <span>Transparency Policy</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-[#0B0F17] tracking-tight">
            Affiliate Disclosure Notice
          </h1>
          <p className="text-xs sm:text-sm text-slate-500">
            Last updated: November 2026
          </p>
        </div>

        <div className="p-6 rounded-3xl bg-[#FDE4CE] flex items-start gap-3.5 text-xs sm:text-sm text-[#0B0F17] shadow-sm">
          <div className="w-8 h-8 rounded-full bg-[#0B0F17] text-white flex items-center justify-center flex-shrink-0 mt-0.5 shadow-sm">
            <Info size={18} weight="bold" />
          </div>
          <p className="leading-relaxed font-medium">
            <strong className="text-[#0B0F17] font-extrabold">Summary:</strong> Credit Mitra is a free-to-use financial comparison website. We may receive financial compensation when you click our links and get approved for a credit card. This never costs you anything and does not affect the card fees or terms you receive from the bank.
          </p>
        </div>

        <div className="rounded-3xl bg-white p-6 sm:p-10 space-y-6 text-xs sm:text-sm text-slate-700 leading-relaxed shadow-xl shadow-black/[0.03]">
          <section className="space-y-2">
            <h2 className="text-base sm:text-lg font-bold text-[#0B0F17]">1. Referral Partnerships</h2>
            <p>
              Credit Mitra partners with financial institutions, affiliate networks (such as EarnKaro, CashKaro, and BankSathi), and direct bank partner referral programs. When you click an &quot;Apply Now&quot; button on our website, you are directed through a secure tracking link (`/go/:slug`) to the issuing bank&apos;s application form.
            </p>
            <p>
              If your application is subsequently approved and issued by the bank, Credit Mitra may receive a referral fee or commission from the affiliate network or bank.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-base sm:text-lg font-bold text-[#0B0F17]">2. No Cost to You</h2>
            <p>
              You will never be charged any additional fee, premium, or interest rate for applying through our referral links. The card fees (joining fee, annual fee, APR, and reward structure) remain identical to or better than what the bank offers directly to the general public.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-base sm:text-lg font-bold text-[#0B0F17]">3. Editorial Integrity and Objectivity</h2>
            <p>
              Our opinions, ratings, pros, cons, and comparisons are formed through independent evaluation of published bank product documentation and schedule of charges. We actively feature both cards with which we maintain commercial relationships and cards where we receive zero compensation if they provide superior consumer value.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-base sm:text-lg font-bold text-[#0B0F17]">4. Not a Financial Advisor</h2>
            <p>
              The content provided on Credit Mitra is for informational and educational purposes only and should not be construed as legal, tax, or investment advice. Always review the official Most Important Terms and Conditions (MITC) provided by the bank before completing your card application.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-base sm:text-lg font-bold text-[#0B0F17]">5. Questions &amp; Contact</h2>
            <p>
              If you have any questions regarding our partnerships or disclosures, please reach out via our{' '}
              <Link href="/contact" className="text-[#0B0F17] font-bold underline hover:text-[#9A3412]">
                Contact Page
              </Link>.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
