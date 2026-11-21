import React from 'react';
import { getCards } from '@/lib/api';
import HeroSection from '@/components/HeroSection';
import TrustBar from '@/components/TrustBar';
import PopularProducts from '@/components/PopularProducts';
import CategoryPills from '@/components/CategoryPills';
import TaglineReveal from '@/components/TaglineReveal';
import Link from 'next/link';
import {
  ShieldCheck,
  Percent,
  Scales,
  ArrowRight,
  Check,
} from '@phosphor-icons/react/dist/ssr';

export const dynamic = 'force-dynamic';
export const revalidate = 0; // Disable caching so admin changes appear immediately

export default async function HomePage() {
  // 1. Fetch fresh active cards from API
  const allCardsResponse = await getCards({ limit: 50 });
  const allCards = allCardsResponse.data || [];

  // Hero cards: include cards specifically marked for hero slider, plus any featured cards
  const heroSpecific = allCards
    .filter((c) => c.isHeroFeatured)
    .sort((a, b) => (a.heroOrder || 0) - (b.heroOrder || 0));

  const otherFeatured = allCards
    .filter((c) => c.isFeatured && !c.isHeroFeatured)
    .sort((a, b) => new Date(b.createdAt || 0).getTime() - new Date(a.createdAt || 0).getTime());

  let heroCards = [...heroSpecific, ...otherFeatured];

  // If still empty, fallback to first active cards so slider is never blank
  if (heroCards.length === 0) {
    heroCards = allCards.slice(0, 4);
  }

  return (
    <div className="space-y-6 md:space-y-10 pb-20">
      
      {/* 1. Hero Section matching reference image with Slide Option */}
      <HeroSection heroCards={heroCards} />

      {/* 2. Trust / Stats Bar matching reference image */}
      <TrustBar />

      {/* 3. Popular Products / Find the Right Card for You matching reference image */}
      <PopularProducts />

      {/* 4. Category Navigation Strip */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-10">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight">
              Browse by Reward Category
            </h3>
            <p className="text-xs sm:text-sm text-slate-500">
              Filter cards tailored to your spending priorities
            </p>
          </div>
          <Link
            href="/cards"
            className="text-xs sm:text-sm font-semibold text-[#1A56DB] hover:text-blue-700 hover:underline flex items-center gap-1"
          >
            <span>View all categories</span>
            <ArrowRight size={14} weight="bold" />
          </Link>
        </div>
        <React.Suspense fallback={<div className="h-10" />}>
          <CategoryPills />
        </React.Suspense>
      </section>

      {/* 5. Tagline Reveal Section */}
      <TaglineReveal phrase="Compare honest card benefits without wading through hidden rules. Apply directly through verified bank links." />

      {/* 6. Problem to Solution: Why Credit-Mitra */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 pt-4">
        <div className="rounded-3xl border border-slate-200/80 bg-white p-8 md:p-12 shadow-sm">
          <div className="text-center max-w-[640px] mx-auto mb-10">
            <span className="text-xs font-bold uppercase tracking-wider text-[#1A56DB] block mb-2">
              The Difference
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 mb-3 tracking-tight">
              Why Traditional Card Searching Breaks Down
            </h2>
            <p className="text-sm sm:text-base text-slate-500">
              Bank websites bury terms in 40-page PDF booklets. Plain links shared on WhatsApp lack clarity. Credit-Mitra makes terms 100% transparent.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-6 rounded-2xl border border-rose-100 bg-rose-50/40 space-y-3">
              <h3 className="text-base sm:text-lg font-bold text-rose-900">Applying Without Guidance</h3>
              <ul className="space-y-2.5 text-sm text-slate-600">
                <li className="flex items-start gap-2.5">
                  <span className="text-rose-500 font-bold">✕</span>
                  <span>Surprise annual renewal charges billed after the first statement</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <span className="text-rose-500 font-bold">✕</span>
                  <span>Unannounced spending caps that silently eliminate cashback benefits</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <span className="text-rose-500 font-bold">✕</span>
                  <span>Complex reward points that expire or carry hefty redemption fees</span>
                </li>
              </ul>
            </div>

            <div className="p-6 rounded-2xl border border-blue-200 bg-blue-50/50 space-y-3">
              <h3 className="text-base sm:text-lg font-bold text-blue-900">Applying with Credit-Mitra</h3>
              <ul className="space-y-2.5 text-sm text-slate-700">
                <li className="flex items-start gap-2.5">
                  <Check size={18} weight="bold" className="text-[#1A56DB] flex-shrink-0" />
                  <span>Exact joining and annual renewal fees stated clearly upfront</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <Check size={18} weight="bold" className="text-[#1A56DB] flex-shrink-0" />
                  <span>Transparent fee waiver rules and spending milestones explained</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <Check size={18} weight="bold" className="text-[#1A56DB] flex-shrink-0" />
                  <span>Side-by-side comparison tool to evaluate cards on one screen</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* 7. Key Benefits Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-[640px] mx-auto mb-10">
          <span className="text-xs font-bold uppercase tracking-wider text-[#1A56DB] block mb-2">
            Key Benefits
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 mb-3 tracking-tight">
            Designed for Financial Product Transparency
          </h2>
          <p className="text-sm sm:text-base text-slate-500">
            We do not sell cards or push arbitrary rankings. We help you choose the best product for your spending profile.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-6 rounded-2xl border border-slate-200/80 bg-white space-y-3 shadow-sm hover:border-blue-200 transition-colors">
            <div className="w-10 h-10 rounded-xl bg-blue-50 text-[#1A56DB] flex items-center justify-center">
              <Percent size={22} weight="bold" />
            </div>
            <h3 className="text-lg font-bold text-slate-900">
              Clear Fee Breakdowns
            </h3>
            <p className="text-sm text-slate-600 leading-relaxed">
              Know exactly how much you pay upfront, annual renewal conditions, and spend waivers before submitting an application.
            </p>
          </div>

          <div className="p-6 rounded-2xl border border-slate-200/80 bg-white space-y-3 shadow-sm hover:border-blue-200 transition-colors">
            <div className="w-10 h-10 rounded-xl bg-blue-50 text-[#1A56DB] flex items-center justify-center">
              <Scales size={22} weight="bold" />
            </div>
            <h3 className="text-lg font-bold text-slate-900">
              Side-by-Side Comparison
            </h3>
            <p className="text-sm text-slate-600 leading-relaxed">
              Pick cards and evaluate welcome bonuses, lounge access limits, reward rates, and eligibility criteria on a single screen.
            </p>
          </div>

          <div className="p-6 rounded-2xl border border-slate-200/80 bg-white space-y-3 shadow-sm hover:border-blue-200 transition-colors">
            <div className="w-10 h-10 rounded-xl bg-blue-50 text-[#1A56DB] flex items-center justify-center">
              <ShieldCheck size={22} weight="bold" />
            </div>
            <h3 className="text-lg font-bold text-slate-900">
              Direct Bank Applications
            </h3>
            <p className="text-sm text-slate-600 leading-relaxed">
              Never share personal documents with intermediaries. Every referral button directs you to the issuing bank's secure portal.
            </p>
          </div>
        </div>
      </section>

      {/* 8. Simple Process (3 Steps) */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="text-center max-w-[640px] mx-auto mb-10">
          <span className="text-xs font-bold uppercase tracking-wider text-[#1A56DB] block mb-2">
            Simple Process
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 mb-3 tracking-tight">
            How to Apply in Three Steps
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
          <div className="space-y-3 text-center md:text-left bg-white p-6 rounded-2xl border border-slate-100 shadow-sm">
            <span className="w-9 h-9 rounded-full bg-[#1A56DB] text-white font-bold inline-flex items-center justify-center text-sm shadow-md shadow-blue-500/20">
              1
            </span>
            <h3 className="text-lg font-bold text-slate-900">Select Your Category</h3>
            <p className="text-sm text-slate-600 leading-relaxed">
              Filter cards by spending priorities such as online shopping, fuel, domestic flights, or zero annual charge cards.
            </p>
          </div>

          <div className="space-y-3 text-center md:text-left bg-white p-6 rounded-2xl border border-slate-100 shadow-sm">
            <span className="w-9 h-9 rounded-full bg-[#1A56DB] text-white font-bold inline-flex items-center justify-center text-sm shadow-md shadow-blue-500/20">
              2
            </span>
            <h3 className="text-lg font-bold text-slate-900">Review Pros and Cons</h3>
            <p className="text-sm text-slate-600 leading-relaxed">
              Read honest pros and cons, waiver criteria, and minimum income requirements before choosing.
            </p>
          </div>

          <div className="space-y-3 text-center md:text-left bg-white p-6 rounded-2xl border border-slate-100 shadow-sm">
            <span className="w-9 h-9 rounded-full bg-[#1A56DB] text-white font-bold inline-flex items-center justify-center text-sm shadow-md shadow-blue-500/20">
              3
            </span>
            <h3 className="text-lg font-bold text-slate-900">Complete Application</h3>
            <p className="text-sm text-slate-600 leading-relaxed">
              Click Apply Now to navigate to the official bank application page and complete your KYC with the bank.
            </p>
          </div>
        </div>
      </section>

      {/* 9. Final Call to Action */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6">
        <div className="p-8 md:p-12 rounded-3xl bg-gradient-to-br from-blue-700 via-blue-800 to-indigo-900 text-white text-center space-y-5 shadow-xl shadow-blue-900/20">
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white max-w-[620px] mx-auto tracking-tight">
            Ready to find your next credit card?
          </h2>
          <p className="text-base sm:text-lg text-blue-100 max-w-[520px] mx-auto leading-relaxed">
            Explore our curated card collection, compare benefits, and submit your application on official bank servers.
          </p>
          <div className="pt-2">
            <Link
              href="/cards"
              className="rounded-full bg-white text-blue-700 hover:bg-blue-50 active:scale-[0.98] transition-all inline-flex items-center gap-2 font-bold px-8 py-3.5 shadow-md"
            >
              <span>Browse all cards now</span>
              <ArrowRight size={18} weight="bold" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
