import React from 'react';
import Link from 'next/link';
import { ShieldCheck, Target, Handshake, ArrowRight } from '@phosphor-icons/react/dist/ssr';

export const metadata = {
  title: 'About Credit Mitra — Bringing Clarity to Credit Cards in India',
  description:
    'Credit Mitra is an independent financial referral and card comparison platform committed to transparent fee disclosures and honest pros and cons.',
};

export default function AboutPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-8 md:py-16 space-y-12">
      {/* Hero Header */}
      <div className="text-center space-y-4">
        <span className="caption-3 font-semibold uppercase tracking-wider text-teal-800 bg-teal-50 px-3 py-1 rounded-full inline-block">
          Our Mission
        </span>
        <h1 className="heading-3 md:heading-2 font-bold text-neutral-900">
          Simplifying credit card decisions for India
        </h1>
        <p className="body-2 text-neutral-600 max-w-2xl mx-auto">
          We built Credit Mitra because bank websites obscure real renewal fees and reward caps inside complex documents. We present the facts clearly so you make informed financial choices.
        </p>
      </div>

      {/* Core Principles */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="p-6 rounded-2xl border border-neutral-200 bg-white space-y-3 shadow-sm">
          <div className="w-10 h-10 rounded-xl bg-teal-50 text-teal-800 flex items-center justify-center">
            <ShieldCheck size={22} weight="bold" />
          </div>
          <h2 className="title-3 font-bold text-neutral-900">Honest Disclosures</h2>
          <p className="body-5 text-neutral-600">
            Every card listing shows exact annual renewal charges, spend waiver thresholds, and exclusions without promotional exaggeration.
          </p>
        </div>

        <div className="p-6 rounded-2xl border border-neutral-200 bg-white space-y-3 shadow-sm">
          <div className="w-10 h-10 rounded-xl bg-teal-50 text-teal-800 flex items-center justify-center">
            <Target size={22} weight="bold" />
          </div>
          <h2 className="title-3 font-bold text-neutral-900">Zero Middlemen</h2>
          <p className="body-5 text-neutral-600">
            We never ask for your identity documents, income slips, or Aadhaar. Every application button sends you directly to the official bank website.
          </p>
        </div>

        <div className="p-6 rounded-2xl border border-neutral-200 bg-white space-y-3 shadow-sm">
          <div className="w-10 h-10 rounded-xl bg-teal-50 text-teal-800 flex items-center justify-center">
            <Handshake size={22} weight="bold" />
          </div>
          <h2 className="title-3 font-bold text-neutral-900">Transparent Funding</h2>
          <p className="body-5 text-neutral-600">
            We are funded via affiliate referral partnerships with banks. We never charge visitors a single rupee for using our comparison platform.
          </p>
        </div>
      </div>

      {/* Narrative Section */}
      <div className="p-8 rounded-2xl border border-neutral-200 bg-white space-y-4 shadow-sm text-neutral-700 leading-relaxed text-sm md:text-base">
        <h2 className="title-2 font-bold text-neutral-900">Why We Started</h2>
        <p>
          First-time credit card applicants in India face an overwhelming maze of bank marketing slogans. A card advertised as "Free" often turns out to be free only for the first year, with steep automatic renewal charges thereafter. Similarly, promised "5% cashback" frequently carries narrow merchant exclusions or low monthly rupee limits.
        </p>
        <p>
          Credit Mitra analyzes official bank schedule of charges, cuts through misleading jargon, and presents side-by-side comparisons so you can pick a card tailored to your real lifestyle.
        </p>
      </div>

      {/* CTA Box */}
      <div className="p-8 rounded-2xl bg-teal-800 text-white text-center space-y-4">
        <h3 className="heading-4 font-bold text-white">Find a card that fits your needs</h3>
        <p className="body-4 text-teal-100 max-w-md mx-auto">
          Explore cashback, travel, and lifetime free credit cards from top Indian banks.
        </p>
        <Link
          href="/cards"
          className="button-md rounded-xl bg-white text-teal-900 font-semibold hover:bg-neutral-100 inline-flex items-center gap-2"
        >
          <span>Explore All Cards</span>
          <ArrowRight size={16} weight="bold" />
        </Link>
      </div>
    </div>
  );
}
