import React from 'react';
import Link from 'next/link';
import { ShieldCheck, Target, Handshake, ArrowRight, Sparkle } from '@phosphor-icons/react/dist/ssr';

export const metadata = {
  title: 'About Credit Mitra — Bringing Clarity to Credit Cards in India',
  description:
    'Credit Mitra is an independent financial referral and card comparison platform committed to transparent fee disclosures and honest pros and cons.',
};

export default function AboutPage() {
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

      <div className="max-w-4xl mx-auto px-4 py-8 md:py-16 space-y-12">
        {/* Hero Header */}
        <div className="text-center space-y-4">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#FDE4CE] text-[#9A3412] text-xs font-bold shadow-sm">
            <Sparkle size={13} weight="fill" className="text-[#9A3412]" />
            <span>Our Mission</span>
          </div>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-[#0B0F17] tracking-tight">
            Simplifying Credit Card Decisions for India
          </h1>
          <p className="text-base sm:text-lg text-slate-600 max-w-2xl mx-auto leading-relaxed">
            We built Credit Mitra because bank websites obscure real renewal fees and reward caps inside complex documents. We present the facts clearly so you make informed financial choices.
          </p>
        </div>

        {/* Core Principles Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-7 rounded-3xl bg-white space-y-3.5 shadow-xl shadow-black/[0.03] hover:shadow-2xl hover:shadow-black/10 hover:-translate-y-1.5 transition-all duration-300">
            <div className="w-12 h-12 rounded-2xl bg-[#0B0F17] text-white flex items-center justify-center shadow-md">
              <ShieldCheck size={24} weight="bold" />
            </div>
            <h2 className="text-lg font-bold text-[#0B0F17]">Honest Disclosures</h2>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              Every card listing shows exact annual renewal charges, spend waiver thresholds, and exclusions without promotional exaggeration.
            </p>
          </div>

          <div className="p-7 rounded-3xl bg-white space-y-3.5 shadow-xl shadow-black/[0.03] hover:shadow-2xl hover:shadow-black/10 hover:-translate-y-1.5 transition-all duration-300">
            <div className="w-12 h-12 rounded-2xl bg-[#0B0F17] text-white flex items-center justify-center shadow-md">
              <Target size={24} weight="bold" />
            </div>
            <h2 className="text-lg font-bold text-[#0B0F17]">Zero Middlemen</h2>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              We never ask for your identity documents, income slips, or Aadhaar. Every application button sends you directly to the official bank website.
            </p>
          </div>

          <div className="p-7 rounded-3xl bg-white space-y-3.5 shadow-xl shadow-black/[0.03] hover:shadow-2xl hover:shadow-black/10 hover:-translate-y-1.5 transition-all duration-300">
            <div className="w-12 h-12 rounded-2xl bg-[#0B0F17] text-white flex items-center justify-center shadow-md">
              <Handshake size={24} weight="bold" />
            </div>
            <h2 className="text-lg font-bold text-[#0B0F17]">Transparent Funding</h2>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              We are funded via affiliate referral partnerships with banks. We never charge visitors a single rupee for using our comparison platform.
            </p>
          </div>
        </div>

        {/* Narrative Section */}
        <div className="p-8 md:p-10 rounded-3xl bg-white space-y-4 shadow-xl shadow-black/[0.03] text-slate-700 leading-relaxed text-sm md:text-base">
          <h2 className="text-xl sm:text-2xl font-extrabold text-[#0B0F17]">Why We Started</h2>
          <p>
            First-time credit card applicants in India face an overwhelming maze of bank marketing slogans. A card advertised as &quot;Free&quot; often turns out to be free only for the first year, with steep automatic renewal charges thereafter. Similarly, promised &quot;5% cashback&quot; frequently carries narrow merchant exclusions or low monthly rupee limits.
          </p>
          <p>
            Credit Mitra analyzes official bank schedule of charges, cuts through misleading jargon, and presents side-by-side comparisons so you can pick a card tailored to your real lifestyle.
          </p>
        </div>

        {/* CTA Box with Cosmic Black/Slate styling */}
        <div className="p-8 sm:p-10 rounded-3xl bg-gradient-to-br from-[#0B0F17] via-[#1E293B] to-[#0B0F17] text-white text-center space-y-4 shadow-2xl shadow-black/20">
          <h3 className="text-2xl sm:text-3xl font-extrabold text-white">Find a card that fits your needs</h3>
          <p className="text-sm sm:text-base text-slate-300 max-w-md mx-auto">
            Explore cashback, travel, and lifetime free credit cards from top Indian banks.
          </p>
          <div className="pt-2">
            <Link
              href="/cards"
              className="rounded-full bg-white text-[#0B0F17] font-bold px-8 py-3.5 text-sm hover:bg-[#FAF7F2] active:scale-95 transition-all inline-flex items-center gap-2 shadow-xl"
            >
              <span>Explore All Cards</span>
              <ArrowRight size={16} weight="bold" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
