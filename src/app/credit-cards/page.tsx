import React from 'react';
import type { Metadata } from 'next';
import { getCards } from '@/lib/api';
import CreditCardsCarousel from '@/components/CreditCardsCarousel';
import CreditCardsExplorer from '@/components/CreditCardsExplorer';

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
  // Fetch active cards from backend API sorted by admin priority
  const cardsResponse = await getCards({
    sort: 'hero',
    limit: 30,
  });

  const cards = cardsResponse.data || [];

  // Parse optional autoplay interval
  const autoplayInterval = searchParams?.interval ? parseInt(searchParams.interval, 10) : 5000;
  const initialAutoplay = searchParams?.autoplay !== 'false';

  return (
    <div className="relative min-h-screen bg-[#FAF7F2] pb-20 overflow-x-hidden">
      
      {/* ======================================================== */}
      {/* SOFT FLUID AMBIENT CURVED WAVES (Fintech Brand Aesthetic) */}
      {/* ======================================================== */}
      <div
        className="absolute -top-40 left-1/2 -translate-x-1/2 w-[1100px] h-[550px] pointer-events-none -z-10 opacity-70"
        style={{
          background:
            'radial-gradient(ellipse at 50% 30%, rgba(224, 231, 255, 0.6) 0%, rgba(254, 215, 226, 0.35) 45%, rgba(254, 240, 138, 0.2) 70%, transparent 100%)',
        }}
      />

      <div
        className="absolute top-1/2 -right-40 w-[600px] h-[600px] pointer-events-none -z-10 opacity-50"
        style={{
          background:
            'radial-gradient(circle at 60% 50%, rgba(254, 215, 226, 0.45) 0%, rgba(253, 230, 138, 0.2) 50%, transparent 70%)',
        }}
      />

      {/* ======================================================== */}
      {/* MAIN CONTAINER */}
      {/* ======================================================== */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-4 sm:pt-6 space-y-7 sm:space-y-9">
        
        {/* ======================================================== */}
        {/* HEADING SECTION (Exact Reference Typography & Hierarchy) */}
        {/* ======================================================== */}
        <section aria-label="Hero Title" className="text-center max-w-2xl mx-auto space-y-2.5 pt-2">
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-[#0B0F17] tracking-tight leading-tight">
            Find the Right{' '}
            <span className="bg-gradient-to-r from-[#1A56DB] via-[#4F46E5] to-[#7C3AED] bg-clip-text text-transparent">
              Credit Card
            </span>{' '}
            for You
          </h1>

          <p className="text-xs sm:text-sm md:text-base text-slate-600 font-medium leading-relaxed max-w-lg mx-auto">
            Explore credit cards, compare fees and benefits, and apply directly.
          </p>
        </section>

        {/* ======================================================== */}
        {/* 3-CARD PEEKING ANIMATED CAROUSEL (Dominant Center Stage) */}
        {/* ======================================================== */}
        <CreditCardsCarousel
          cards={cards}
          autoplayInterval={autoplayInterval}
          initialAutoplay={initialAutoplay}
        />

        {/* ======================================================== */}
        {/* CATEGORY PILLS BAR, COMPARE BANNER & TRUST FOOTER */}
        {/* ======================================================== */}
        <CreditCardsExplorer cards={cards} />
      </div>
    </div>
  );
}
