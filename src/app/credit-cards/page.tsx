import React from 'react';
import type { Metadata } from 'next';
import { getCards } from '@/lib/api';
import CreditCardsCarousel from '@/components/CreditCardsCarousel';
import CreditCardsExplorer from '@/components/CreditCardsExplorer';
import { Sparkle, ShieldCheck, CheckCircle } from '@phosphor-icons/react/dist/ssr';

export const metadata: Metadata = {
  title: 'Credit Cards — Find the Right Credit Card for You | Credit-Mitra',
  description:
    'Explore credit cards, compare fees and benefits, and apply directly through verified bank partner links on Credit-Mitra.',
  alternates: {
    canonical: '/credit-cards',
  },
  openGraph: {
    title: 'Find the Right Credit Card for You | Credit-Mitra',
    description:
      'Explore credit cards, compare fees and benefits, and apply directly through verified partner links.',
    type: 'website',
  },
};

interface CreditCardsPageProps {
  searchParams?: {
    autoplay?: string;
    interval?: string;
    category?: string;
  };
}

export default async function CreditCardsPage({ searchParams }: CreditCardsPageProps) {
  // Fetch active cards from backend API sorted by admin priority (heroOrder: 1, isFeatured: -1, createdAt: -1)
  const cardsResponse = await getCards({
    sort: 'hero',
    limit: 30,
  });

  const cards = cardsResponse.data || [];

  // Parse optional admin/URL configs for autoplay
  const autoplayInterval = searchParams?.interval ? parseInt(searchParams.interval, 10) : 5000;
  const initialAutoplay = searchParams?.autoplay !== 'false';

  return (
    <div className="relative min-h-screen bg-[#FAF7F2] pb-24 overflow-x-hidden">
      {/* ======================================================== */}
      {/* 1. SOFT AMBIENT PEACH / BLUSH GLOW MESHES */}
      {/* ======================================================== */}
      <div
        className="absolute -top-32 right-0 w-[550px] h-[550px] pointer-events-none -z-10 opacity-70"
        style={{
          background:
            'radial-gradient(circle at 75% 25%, rgba(254, 215, 226, 0.55) 0%, rgba(254, 240, 138, 0.3) 50%, transparent 70%)',
        }}
      />
      <div
        className="absolute top-1/3 -left-32 w-[500px] h-[500px] pointer-events-none -z-10 opacity-60"
        style={{
          background:
            'radial-gradient(circle at 25% 50%, rgba(254, 226, 226, 0.5) 0%, rgba(253, 230, 138, 0.25) 50%, transparent 70%)',
        }}
      />

      {/* ======================================================== */}
      {/* 2. PAGE CONTENT CONTAINER (Mobile-first, Centered) */}
      {/* ======================================================== */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-4 sm:pt-8 space-y-8 sm:space-y-12">
        
        {/* ======================================================== */}
        {/* SECTION 3.B: SHORT INTRODUCTION */}
        {/* ======================================================== */}
        <section aria-label="Page Introduction" className="text-center max-w-2xl mx-auto space-y-3.5">
          {/* Social Media Welcome Badge */}
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-[#EFF6FF] text-[#1A56DB] text-xs font-bold shadow-xs">
            <Sparkle size={13} weight="fill" className="text-[#1A56DB]" />
            <span>Curated Partner Offers • Instant Application</span>
          </div>

          {/* Specified Heading */}
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-[#0B0F17] tracking-tight leading-tight">
            Find the Right Credit Card for You
          </h1>

          {/* Specified Description */}
          <p className="text-sm sm:text-base text-slate-600 font-normal leading-relaxed max-w-xl mx-auto">
            Explore credit cards, compare fees and benefits, and apply directly.
          </p>

          {/* Trust Highlights */}
          <div className="pt-1 flex items-center justify-center gap-4 sm:gap-6 text-[11px] sm:text-xs text-slate-500 font-semibold">
            <span className="flex items-center gap-1">
              <CheckCircle size={14} weight="fill" className="text-emerald-600" />
              100% Free Service
            </span>
            <span>•</span>
            <span className="flex items-center gap-1">
              <ShieldCheck size={14} weight="fill" className="text-emerald-600" />
              Bank Secure Redirection
            </span>
            <span>•</span>
            <span className="flex items-center gap-1">
              <CheckCircle size={14} weight="fill" className="text-emerald-600" />
              No Hidden Charges
            </span>
          </div>
        </section>

        {/* ======================================================== */}
        {/* SECTION 3.C & 3.D: ANIMATED CREDIT CARD CAROUSEL */}
        {/* ======================================================== */}
        <CreditCardsCarousel
          cards={cards}
          autoplayInterval={autoplayInterval}
          initialAutoplay={initialAutoplay}
        />

        {/* ======================================================== */}
        {/* SECTION 3.F: SUPPORTING CATEGORY FILTERS, LIST & COMPLIANCE */}
        {/* ======================================================== */}
        <CreditCardsExplorer cards={cards} />
      </div>
    </div>
  );
}
