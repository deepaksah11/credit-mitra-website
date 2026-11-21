'use client';

import React, { useState, useEffect, useRef, useCallback } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Card } from '@/types/card';
import { formatCurrency } from '@/lib/utils';
import { API_BASE_URL } from '@/lib/api';
import {
  HdfcBankLogo,
  SbiCardLogo,
  IciciBankLogo,
  AxisBankLogo,
} from './BankLogos';
import {
  CaretLeft,
  CaretRight,
  Eye,
  Lightning,
  Sparkle,
  Gift,
  AirplaneTilt,
  ForkKnife,
  Percent,
  Check,
  Star,
  Bank,
  CreditCard as CardIcon,
} from '@phosphor-icons/react';

interface CreditCardsCarouselProps {
  cards: Card[];
  autoplayInterval?: number;
  initialAutoplay?: boolean;
}

// Bank Logo Helper Component matching the reference badge style
function BankLogoBadge({ bankName }: { bankName: string }) {
  const lower = (bankName || '').toLowerCase();
  if (lower.includes('hdfc')) {
    return <HdfcBankLogo className="h-5" />;
  }
  if (lower.includes('sbi')) {
    return <SbiCardLogo className="h-5" />;
  }
  if (lower.includes('icici')) {
    return <IciciBankLogo className="h-5" />;
  }
  if (lower.includes('axis')) {
    return <AxisBankLogo className="h-5" />;
  }
  return (
    <div className="flex items-center gap-1.5 font-extrabold text-[#0B0F17] text-xs">
      <Bank size={16} weight="fill" className="text-[#1A56DB]" />
      <span>{bankName}</span>
    </div>
  );
}

// Benefit Icon Helper matching reference icons
function BenefitItem({ text }: { text: string }) {
  const lower = text.toLowerCase();

  let icon = <Check size={16} weight="bold" className="text-[#1A56DB]" />;
  if (lower.includes('lounge') || lower.includes('airport') || lower.includes('flight') || lower.includes('travel')) {
    icon = <AirplaneTilt size={16} weight="fill" className="text-[#1A56DB]" />;
  } else if (lower.includes('reward') || lower.includes('point') || lower.includes('voucher') || lower.includes('gift')) {
    icon = <Gift size={16} weight="fill" className="text-amber-500" />;
  } else if (lower.includes('dining') || lower.includes('food') || lower.includes('swiggy') || lower.includes('zomato')) {
    icon = <ForkKnife size={16} weight="fill" className="text-rose-500" />;
  } else if (lower.includes('cashback') || lower.includes('%') || lower.includes('discount')) {
    icon = <Percent size={16} weight="bold" className="text-emerald-600" />;
  }

  return (
    <li className="flex items-center gap-2.5 text-xs sm:text-sm text-slate-700 font-medium leading-snug">
      <span className="flex-shrink-0">{icon}</span>
      <span className="line-clamp-1">{text}</span>
    </li>
  );
}

export default function CreditCardsCarousel({
  cards = [],
  autoplayInterval = 5000,
  initialAutoplay = true,
}: CreditCardsCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(initialAutoplay && cards.length > 1);
  const [isHovered, setIsHovered] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [dragStartX, setDragStartX] = useState(0);
  const [dragCurrentX, setDragCurrentX] = useState(0);
  const [reducedMotion, setReducedMotion] = useState(false);

  const totalCards = cards.length;

  // Check prefers-reduced-motion
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
      setReducedMotion(mediaQuery.matches);
      const handleChange = (e: MediaQueryListEvent) => {
        setReducedMotion(e.matches);
        if (e.matches) setIsPlaying(false);
      };
      mediaQuery.addEventListener('change', handleChange);
      return () => mediaQuery.removeEventListener('change', handleChange);
    }
  }, []);

  const goToNext = useCallback(() => {
    if (totalCards <= 1) return;
    setCurrentIndex((prev) => (prev + 1) % totalCards);
  }, [totalCards]);

  const goToPrev = useCallback(() => {
    if (totalCards <= 1) return;
    setCurrentIndex((prev) => (prev - 1 + totalCards) % totalCards);
  }, [totalCards]);

  const goToSlide = (index: number) => {
    if (index === currentIndex) return;
    setCurrentIndex(index);
  };

  // Autoplay ticker
  useEffect(() => {
    if (totalCards <= 1 || !isPlaying || isHovered || isDragging || reducedMotion) {
      return;
    }
    const timer = setInterval(() => {
      goToNext();
    }, autoplayInterval);

    return () => clearInterval(timer);
  }, [totalCards, isPlaying, isHovered, isDragging, reducedMotion, autoplayInterval, goToNext]);

  // Touch Swipe Handlers
  const handleTouchStart = (e: React.TouchEvent) => {
    if (totalCards <= 1) return;
    setIsDragging(true);
    setDragStartX(e.touches[0].clientX);
    setDragCurrentX(e.touches[0].clientX);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!isDragging) return;
    setDragCurrentX(e.touches[0].clientX);
  };

  const handleTouchEnd = () => {
    if (!isDragging) return;
    setIsDragging(false);
    const diff = dragStartX - dragCurrentX;
    if (diff > 50) {
      goToNext();
    } else if (diff < -50) {
      goToPrev();
    }
    setDragStartX(0);
    setDragCurrentX(0);
  };

  // Mouse Drag Handlers
  const handleMouseDown = (e: React.MouseEvent) => {
    if (totalCards <= 1) return;
    setIsDragging(true);
    setDragStartX(e.clientX);
    setDragCurrentX(e.clientX);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return;
    setDragCurrentX(e.clientX);
  };

  const handleMouseUp = () => {
    if (!isDragging) return;
    setIsDragging(false);
    const diff = dragStartX - dragCurrentX;
    if (diff > 50) {
      goToNext();
    } else if (diff < -50) {
      goToPrev();
    }
    setDragStartX(0);
    setDragCurrentX(0);
  };

  const handleMouseLeave = () => {
    if (isDragging) handleMouseUp();
    setIsHovered(false);
  };

  if (totalCards === 0) {
    return (
      <div className="w-full max-w-4xl mx-auto p-12 text-center rounded-3xl bg-white shadow-xl shadow-black/[0.03]">
        <CardIcon size={48} className="mx-auto text-slate-300 mb-3" />
        <h3 className="text-lg font-bold text-[#0B0F17]">No Credit Cards Configured</h3>
        <p className="text-sm text-slate-500 mt-1">Cards will display here once added by admin.</p>
      </div>
    );
  }

  // Indices for the 3-card peeking display (Prev, Current, Next)
  const prevIndex = (currentIndex - 1 + totalCards) % totalCards;
  const nextIndex = (currentIndex + 1) % totalCards;

  const currentCard = cards[currentIndex];
  const prevCard = cards[prevIndex];
  const nextCard = cards[nextIndex];

  return (
    <section
      aria-label="Credit Card Carousel"
      className="w-full max-w-6xl mx-auto relative select-none px-2 sm:px-6 my-2"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
    >
      {/* ======================================================== */}
      {/* 3-CARD PEEKING VIEWPORT CONTAINER */}
      {/* ======================================================== */}
      <div
        className="relative flex items-center justify-center overflow-hidden py-4 sm:py-6"
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
      >
        {/* ======================================================== */}
        {/* PREVIOUS CARD PEEK (Left side background) */}
        {/* ======================================================== */}
        {totalCards > 1 && (
          <div
            onClick={goToPrev}
            className="hidden md:block absolute left-0 w-[420px] lg:w-[480px] -translate-x-[72%] lg:-translate-x-[68%] scale-[0.88] opacity-35 hover:opacity-50 transition-all duration-500 z-0 cursor-pointer pointer-events-auto filter blur-[0.5px]"
            title={`Previous: ${prevCard.title}`}
          >
            <div className="rounded-[28px] bg-white p-6 shadow-xl shadow-black/10 flex flex-col justify-between h-[360px] pointer-events-none">
              <div className="flex items-center justify-between">
                <BankLogoBadge bankName={prevCard.bankName} />
              </div>
              <div className="relative w-full h-44 rounded-xl overflow-hidden shadow-md my-auto">
                {prevCard.imageUrl ? (
                  <Image src={prevCard.imageUrl} alt={prevCard.title} fill className="object-cover" />
                ) : (
                  <div className="w-full h-full bg-slate-800" />
                )}
              </div>
            </div>
          </div>
        )}

        {/* ======================================================== */}
        {/* CENTER ACTIVE CARD (Matching Reference Image Exact Layout) */}
        {/* ======================================================== */}
        <div className="relative z-10 w-full max-w-[760px] mx-auto rounded-[32px] bg-white p-5 sm:p-7 md:p-9 shadow-2xl shadow-indigo-950/[0.08] transition-all duration-500 ease-out">
          
          {/* Top Bar: Bank Logo Badge (Left) & Most Popular / Featured Pill (Right) */}
          <div className="flex items-center justify-between gap-3 mb-5 sm:mb-6">
            {/* Bank Logo in Soft Container */}
            <div className="p-2 sm:px-3 sm:py-1.5 rounded-xl bg-[#FAF7F2] inline-flex items-center shadow-xs">
              <BankLogoBadge bankName={currentCard.bankName} />
            </div>

            {/* Most Popular / Hero Tag Pill */}
            <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-[#FEF3C7] text-[#92400E] text-xs font-bold shadow-xs">
              <Star size={13} weight="fill" className="text-amber-500" />
              <span>{currentCard.heroTag || (currentCard.isFeatured ? 'Most Popular' : 'Top Choice')}</span>
            </div>
          </div>

          {/* Main Card Content: Card Visual (Left) & Details / Fees / Benefits (Right) */}
          <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6 sm:gap-8">
            
            {/* Left: Floating Credit Card Mockup */}
            <div className="w-full sm:w-[45%] flex-shrink-0 flex justify-center">
              <div className="relative w-full max-w-[320px] aspect-[1.586] rounded-2xl p-0.5 group/card">
                {/* Soft ambient radial aura behind card */}
                <div
                  className="absolute inset-0 -z-10 rounded-2xl blur-xl opacity-35"
                  style={{
                    background:
                      currentCard.category === 'Travel'
                        ? 'radial-gradient(circle, rgba(59, 130, 246, 0.4) 0%, transparent 70%)'
                        : currentCard.category === 'Cashback'
                        ? 'radial-gradient(circle, rgba(16, 185, 129, 0.4) 0%, transparent 70%)'
                        : 'radial-gradient(circle, rgba(99, 102, 241, 0.4) 0%, transparent 70%)',
                  }}
                />

                {/* Card Visual with Realistic Shadow */}
                <div className="relative w-full h-full rounded-2xl overflow-hidden shadow-xl shadow-black/20 transform sm:-rotate-1 sm:group-hover/card:rotate-0 transition-transform duration-500">
                  {currentCard.imageUrl ? (
                    <Image
                      src={currentCard.imageUrl}
                      alt={currentCard.title}
                      fill
                      priority
                      className="object-cover"
                      sizes="(max-width: 640px) 300px, 340px"
                    />
                  ) : (
                    <div className="w-full h-full bg-gradient-to-br from-slate-900 to-indigo-950 text-white p-4 flex flex-col justify-between">
                      <span className="text-[10px] font-bold uppercase tracking-widest">{currentCard.bankName}</span>
                      <span className="text-sm font-bold line-clamp-1">{currentCard.title}</span>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Right: Card Title, Fee Pills, Key Benefits */}
            <div className="w-full sm:w-[55%] flex flex-col justify-between space-y-4 sm:space-y-5 text-left">
              
              {/* Card Title */}
              <div>
                <h2 className="text-xl sm:text-2xl font-black text-[#0B0F17] tracking-tight leading-snug">
                  {currentCard.title}
                </h2>
              </div>

              {/* Fee Boxes: Side-by-Side (Exact Reference Layout) */}
              <div className="grid grid-cols-2 gap-3">
                {/* Joining Fee Box */}
                <div className="p-3 sm:p-3.5 rounded-2xl bg-[#FAF7F2] text-center space-y-0.5">
                  <span className="text-[11px] font-bold text-slate-400 block uppercase tracking-wider">
                    Joining Fee
                  </span>
                  <div className="text-lg sm:text-xl font-black text-[#0B0F17]">
                    {formatCurrency(currentCard.joiningFee)}
                  </div>
                </div>

                {/* Annual Fee Box */}
                <div className="p-3 sm:p-3.5 rounded-2xl bg-[#FAF7F2] text-center space-y-0.5">
                  <span className="text-[11px] font-bold text-slate-400 block uppercase tracking-wider">
                    Annual Fee
                  </span>
                  <div className="text-lg sm:text-xl font-black text-[#0B0F17]">
                    {formatCurrency(currentCard.annualFee)}
                  </div>
                </div>
              </div>

              {/* Key Benefits List with Icons (Gift, Lounge, Dining) */}
              <div className="space-y-2 pt-1">
                <ul className="space-y-2">
                  {currentCard.benefits && currentCard.benefits.length > 0 ? (
                    currentCard.benefits.slice(0, 3).map((benefit, bIdx) => (
                      <BenefitItem key={bIdx} text={benefit} />
                    ))
                  ) : (
                    <>
                      <BenefitItem text="Up to 5X accelerated reward points on online retail" />
                      <BenefitItem text="Complimentary domestic airport lounge access" />
                      <BenefitItem text="Exclusive dining and entertainment discounts" />
                    </>
                  )}
                </ul>
              </div>
            </div>
          </div>

          {/* Bottom Actions Row: VIEW DETAILS & APPLY NOW (Side-by-Side) */}
          <div className="mt-6 sm:mt-8 pt-5 border-t border-slate-100 flex flex-col xs:flex-row items-center gap-3">
            {/* View Details Button */}
            <Link
              href={`/cards/${currentCard.slug}`}
              className="w-full xs:flex-1 py-3.5 px-6 rounded-2xl bg-[#FAF7F2] hover:bg-[#EFEAE1] text-[#0B0F17] font-bold text-sm sm:text-base flex items-center justify-center gap-2 transition-all active:scale-95 shadow-xs"
            >
              <Eye size={18} weight="bold" className="text-slate-600" />
              <span>View Details</span>
            </Link>

            {/* Apply Now Button: Vibrant High-Contrast Pill with Lightning Icon */}
            <a
              href={`${API_BASE_URL}/go/${currentCard.slug}`}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full xs:flex-1 py-3.5 px-6 rounded-2xl bg-gradient-to-r from-[#1A56DB] via-[#4F46E5] to-[#7C3AED] hover:from-[#1E40AF] hover:to-[#6D28D9] text-white font-extrabold text-sm sm:text-base flex items-center justify-center gap-2 shadow-lg shadow-indigo-500/25 active:scale-95 transition-all group/apply"
            >
              <Lightning size={18} weight="fill" className="text-amber-300 group-hover/apply:scale-110 transition-transform" />
              <span>Apply Now</span>
            </a>
          </div>
        </div>

        {/* ======================================================== */}
        {/* NEXT CARD PEEK (Right side background) */}
        {/* ======================================================== */}
        {totalCards > 1 && (
          <div
            onClick={goToNext}
            className="hidden md:block absolute right-0 w-[420px] lg:w-[480px] translate-x-[72%] lg:translate-x-[68%] scale-[0.88] opacity-35 hover:opacity-50 transition-all duration-500 z-0 cursor-pointer pointer-events-auto filter blur-[0.5px]"
            title={`Next: ${nextCard.title}`}
          >
            <div className="rounded-[28px] bg-white p-6 shadow-xl shadow-black/10 flex flex-col justify-between h-[360px] pointer-events-none">
              <div className="flex items-center justify-between">
                <BankLogoBadge bankName={nextCard.bankName} />
              </div>
              <div className="relative w-full h-44 rounded-xl overflow-hidden shadow-md my-auto">
                {nextCard.imageUrl ? (
                  <Image src={nextCard.imageUrl} alt={nextCard.title} fill className="object-cover" />
                ) : (
                  <div className="w-full h-full bg-slate-800" />
                )}
              </div>
            </div>
          </div>
        )}

        {/* ======================================================== */}
        {/* FLOATING NAVIGATION ARROWS (Left & Right) */}
        {/* ======================================================== */}
        {totalCards > 1 && (
          <>
            {/* Left Arrow Button */}
            <button
              type="button"
              onClick={goToPrev}
              aria-label="Previous credit card"
              className="absolute left-1 sm:left-4 top-1/2 -translate-y-1/2 z-30 w-11 h-11 sm:w-12 sm:h-12 rounded-full bg-white shadow-xl shadow-black/10 hover:bg-[#0B0F17] hover:text-white flex items-center justify-center text-slate-800 transition-all active:scale-90"
            >
              <CaretLeft size={22} weight="bold" />
            </button>

            {/* Right Arrow Button */}
            <button
              type="button"
              onClick={goToNext}
              aria-label="Next credit card"
              className="absolute right-1 sm:right-4 top-1/2 -translate-y-1/2 z-30 w-11 h-11 sm:w-12 sm:h-12 rounded-full bg-white shadow-xl shadow-black/10 hover:bg-[#0B0F17] hover:text-white flex items-center justify-center text-slate-800 transition-all active:scale-90"
            >
              <CaretRight size={22} weight="bold" />
            </button>
          </>
        )}
      </div>

      {/* ======================================================== */}
      {/* PAGINATION DOTS (Active pill + soft dots) */}
      {/* ======================================================== */}
      {totalCards > 1 && (
        <div className="mt-4 flex items-center justify-center gap-2">
          {cards.map((_, i) => (
            <button
              key={i}
              type="button"
              onClick={() => goToSlide(i)}
              aria-label={`Go to card ${i + 1}`}
              className={`rounded-full transition-all duration-300 ${
                i === currentIndex
                  ? 'w-7 h-2 bg-[#1A56DB]'
                  : 'w-2 h-2 bg-slate-300 hover:bg-slate-400'
              }`}
            />
          ))}
        </div>
      )}
    </section>
  );
}
