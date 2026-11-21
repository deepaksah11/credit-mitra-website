import React from 'react';
import type { Metadata } from 'next';
import { getCards } from '@/lib/api';
import CreditCardsCarousel from '@/components/CreditCardsCarousel';

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
    <main className="relative min-h-[calc(100dvh-3.5rem)] bg-[#FAF7F2] overflow-x-hidden flex flex-col justify-between py-1 sm:py-2">
      
      {/* Soft fluid ambient background glows */}
      <div
        className="absolute -top-32 left-1/2 -translate-x-1/2 w-[700px] h-[350px] pointer-events-none -z-10 opacity-70"
        style={{
          background:
            'radial-gradient(ellipse at 50% 30%, rgba(224, 231, 255, 0.6) 0%, rgba(254, 215, 226, 0.3) 45%, rgba(254, 240, 138, 0.15) 70%, transparent 100%)',
        }}
      />

      <div className="w-full max-w-4xl mx-auto px-3 sm:px-6 flex flex-col justify-between flex-1 space-y-1.5 sm:space-y-3">
        
        {/* ======================================================== */}
        {/* HEADING SECTION (Compact, Single-Screen Mobile Typography) */}
        {/* ======================================================== */}
        <section aria-label="Hero Title" className="text-center max-w-md mx-auto space-y-0.5 pt-0.5">
          <h1 className="text-xl sm:text-2xl md:text-3xl font-black text-[#0B0F17] tracking-tight leading-tight">
            Find the Right{' '}
            <span className="bg-gradient-to-r from-[#1A56DB] via-[#4F46E5] to-[#7C3AED] bg-clip-text text-transparent">
              Credit Card
            </span>{' '}
            for You
          </h1>

          <p className="text-[11px] sm:text-xs text-slate-600 font-medium leading-normal max-w-xs mx-auto">
            Explore credit cards, compare fees and benefits, and apply directly.
          </p>
        </section>

        {/* ======================================================== */}
        {/* ANIMATED CAROUSEL + CATEGORY PILLS + COMPARE BANNER + FOOTER */}
        {/* ======================================================== */}
        <CreditCardsCarousel
          cards={cards}
          autoplayInterval={autoplayInterval}
          initialAutoplay={initialAutoplay}
        />
      </div>
    </main>
  );
}
