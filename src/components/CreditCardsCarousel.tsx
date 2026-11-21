'use client';

import React, { useState, useEffect, useRef, useCallback, useMemo } from 'react';
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
  IdfcBankLogo,
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
  Crown,
  Target,
  ShoppingBag,
  Scales,
  ShieldCheck,
  ArrowRight,
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
    return <HdfcBankLogo className="h-4 sm:h-5" />;
  }
  if (lower.includes('sbi')) {
    return <SbiCardLogo className="h-4 sm:h-5" />;
  }
  if (lower.includes('icici')) {
    return <IciciBankLogo className="h-4 sm:h-5" />;
  }
  if (lower.includes('axis')) {
    return <AxisBankLogo className="h-4 sm:h-5" />;
  }
  if (lower.includes('idfc')) {
    return <IdfcBankLogo className="h-4 sm:h-5" />;
  }
  return (
    <div className="flex items-center gap-1 font-extrabold text-[#0B0F17] text-[11px] sm:text-xs">
      <Bank size={14} weight="fill" className="text-[#1A56DB]" />
      <span className="truncate max-w-[100px]">{bankName}</span>
    </div>
  );
}

// Benefit Icon Helper
function BenefitItem({ text }: { text: string }) {
  const lower = text.toLowerCase();

  let icon = <Check size={13} weight="bold" className="text-[#1A56DB]" />;
  if (lower.includes('lounge') || lower.includes('airport') || lower.includes('flight') || lower.includes('travel')) {
    icon = <AirplaneTilt size={13} weight="fill" className="text-[#1A56DB]" />;
  } else if (lower.includes('reward') || lower.includes('point') || lower.includes('voucher') || lower.includes('gift')) {
    icon = <Gift size={13} weight="fill" className="text-amber-500" />;
  } else if (lower.includes('dining') || lower.includes('food') || lower.includes('swiggy') || lower.includes('zomato')) {
    icon = <ForkKnife size={13} weight="fill" className="text-rose-500" />;
  } else if (lower.includes('cashback') || lower.includes('%') || lower.includes('discount')) {
    icon = <Percent size={13} weight="bold" className="text-emerald-600" />;
  }

  return (
    <li className="flex items-center gap-1.5 text-[10px] sm:text-xs text-slate-700 font-medium leading-tight">
      <span className="flex-shrink-0">{icon}</span>
      <span className="truncate">{text}</span>
    </li>
  );
}

export default function CreditCardsCarousel({
  cards = [],
  autoplayInterval = 5000,
  initialAutoplay = true,
}: CreditCardsCarouselProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [dragStartX, setDragStartX] = useState(0);
  const [dragCurrentX, setDragCurrentX] = useState(0);
  const [reducedMotion, setReducedMotion] = useState(false);

  // Category filter tabs
  const categoryTabs = [
    { label: 'All Cards', value: 'All', icon: <CardIcon size={14} weight="fill" /> },
    { label: 'Lifetime Free', value: 'Lifetime Free', icon: <Crown size={14} weight="fill" className="text-amber-500" /> },
    { label: 'Cashback', value: 'Cashback', icon: <Target size={14} weight="bold" className="text-blue-500" /> },
    { label: 'Travel', value: 'Travel', icon: <AirplaneTilt size={14} weight="fill" className="text-indigo-500" /> },
    { label: 'Rewards', value: 'Rewards', icon: <Gift size={14} weight="fill" className="text-rose-500" /> },
    { label: 'Shopping', value: 'Shopping', icon: <ShoppingBag size={14} weight="fill" className="text-purple-500" /> },
  ];

  // Filtered card list based on selected category
  const filteredCards = useMemo(() => {
    if (selectedCategory === 'All') return cards;
    const cat = selectedCategory.toLowerCase();
    const result = cards.filter((c) => (c.category || '').toLowerCase() === cat);
    return result.length > 0 ? result : cards;
  }, [cards, selectedCategory]);

  const totalCards = filteredCards.length;
  const isPlaying = initialAutoplay && totalCards > 1;

  // Handle category change: reset index to 0
  const handleSelectCategory = (cat: string) => {
    setSelectedCategory(cat);
    setCurrentIndex(0);
  };

  // Check prefers-reduced-motion
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
      setReducedMotion(mediaQuery.matches);
      const handleChange = (e: MediaQueryListEvent) => {
        setReducedMotion(e.matches);
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
    if (diff > 40) {
      goToNext();
    } else if (diff < -40) {
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
    if (diff > 40) {
      goToNext();
    } else if (diff < -40) {
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
      <div className="w-full max-w-sm mx-auto p-6 text-center rounded-2xl bg-white shadow-md">
        <CardIcon size={36} className="mx-auto text-slate-300 mb-2" />
        <h3 className="text-sm font-bold text-[#0B0F17]">No Credit Cards Found</h3>
        <p className="text-xs text-slate-500 mt-1">Check back soon for available offers.</p>
      </div>
    );
  }

  // Safe active card lookup
  const safeIndex = currentIndex >= totalCards ? 0 : currentIndex;
  const currentCard = filteredCards[safeIndex];

  // Peeking indices
  const prevIndex = (safeIndex - 1 + totalCards) % totalCards;
  const nextIndex = (safeIndex + 1) % totalCards;
  const prevCard = filteredCards[prevIndex];
  const nextCard = filteredCards[nextIndex];

  return (
    <div
      className="w-full max-w-xl mx-auto flex flex-col justify-between select-none"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
    >
      {/* ======================================================== */}
      {/* 1. ANIMATED CAROUSEL VIEWPORT (Compact 2-Column Card) */}
      {/* ======================================================== */}
      <div
        className="relative flex items-center justify-center my-0.5"
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
      >
        {/* ======================================================== */}
        {/* PREVIOUS CARD PEEK (Desktop side background) */}
        {/* ======================================================== */}
        {totalCards > 1 && (
          <div
            onClick={goToPrev}
            className="hidden md:block absolute left-0 w-[300px] -translate-x-[75%] scale-[0.88] opacity-30 hover:opacity-50 transition-all duration-300 z-0 cursor-pointer pointer-events-auto filter blur-[0.5px]"
            title={`Previous: ${prevCard.title}`}
          >
            <div className="rounded-2xl bg-white p-3.5 shadow-lg flex flex-col justify-between h-[200px] pointer-events-none">
              <BankLogoBadge bankName={prevCard.bankName} />
              <div className="relative w-full h-24 rounded-lg overflow-hidden my-auto">
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
        {/* CENTER ACTIVE CARD (Ultra-compact, Pixel-perfect Layout) */}
        {/* ======================================================== */}
        <div className="relative z-10 w-full rounded-[22px] sm:rounded-[26px] bg-white p-3 sm:p-4 shadow-xl shadow-indigo-950/[0.06] transition-all duration-300 ease-out">
          
          {/* Top Bar: Bank Logo (Left) & Most Popular / Top Choice Badge (Right) */}
          <div className="flex items-center justify-between gap-2 mb-2 sm:mb-2.5">
            <div className="px-2 py-1 rounded-lg bg-[#FAF7F2] inline-flex items-center shadow-2xs">
              <BankLogoBadge bankName={currentCard.bankName} />
            </div>

            <div className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-[#FEF3C7] text-[#92400E] text-[10px] sm:text-[11px] font-bold shadow-2xs">
              <Star size={11} weight="fill" className="text-amber-500" />
              <span>{currentCard.heroTag || (currentCard.isFeatured ? 'Most Popular' : 'Top Choice')}</span>
            </div>
          </div>

          {/* Middle Row: 2-Column Side-by-Side (Card Image on Left, Details on Right) */}
          <div className="grid grid-cols-[115px_1fr] xs:grid-cols-[130px_1fr] sm:grid-cols-[165px_1fr] gap-2.5 sm:gap-3.5 items-center">
            
            {/* Left Column: Credit Card Visual with Soft Glow */}
            <div className="relative w-full aspect-[1.586] rounded-xl overflow-hidden shadow-md shadow-black/15 group/card flex-shrink-0">
              {currentCard.imageUrl ? (
                <Image
                  src={currentCard.imageUrl}
                  alt={currentCard.title}
                  fill
                  priority
                  className="object-cover"
                  sizes="(max-width: 640px) 130px, 165px"
                />
              ) : (
                <div className="w-full h-full bg-gradient-to-br from-slate-900 to-indigo-950 text-white p-2 flex flex-col justify-between">
                  <span className="text-[8px] font-bold uppercase tracking-widest">{currentCard.bankName}</span>
                  <span className="text-[10px] font-bold truncate">{currentCard.title}</span>
                </div>
              )}
            </div>

            {/* Right Column: Title, Fee Boxes & Benefits */}
            <div className="flex flex-col justify-center min-w-0 space-y-1 sm:space-y-1.5 text-left">
              {/* Card Title */}
              <h2 className="text-xs sm:text-[14px] font-black text-[#0B0F17] tracking-tight leading-tight line-clamp-1">
                {currentCard.title}
              </h2>

              {/* Side-by-Side Fee Boxes */}
              <div className="grid grid-cols-2 gap-1.5">
                <div className="p-1 sm:p-1.5 rounded-lg bg-[#FAF7F2] text-center">
                  <span className="text-[8px] sm:text-[9px] font-bold text-slate-400 block uppercase leading-none">
                    Joining
                  </span>
                  <div className="text-[11px] sm:text-xs font-black text-[#0B0F17] mt-0.5 leading-none">
                    {formatCurrency(currentCard.joiningFee)}
                  </div>
                </div>

                <div className="p-1 sm:p-1.5 rounded-lg bg-[#FAF7F2] text-center">
                  <span className="text-[8px] sm:text-[9px] font-bold text-slate-400 block uppercase leading-none">
                    Annual
                  </span>
                  <div className="text-[11px] sm:text-xs font-black text-[#0B0F17] mt-0.5 leading-none">
                    {formatCurrency(currentCard.annualFee)}
                  </div>
                </div>
              </div>

              {/* Key Benefits (2 benefits on mobile to keep single screen fit) */}
              <ul className="space-y-0.5 pt-0.5">
                {currentCard.benefits && currentCard.benefits.length > 0 ? (
                  currentCard.benefits.slice(0, 2).map((benefit, bIdx) => (
                    <BenefitItem key={bIdx} text={benefit} />
                  ))
                ) : (
                  <>
                    <BenefitItem text="Reward points on all online retail" />
                    <BenefitItem text="Complimentary airport lounge access" />
                  </>
                )}
              </ul>
            </div>
          </div>

          {/* Bottom Actions Row: VIEW DETAILS & APPLY NOW */}
          <div className="mt-2.5 pt-2 border-t border-slate-100 grid grid-cols-2 gap-2">
            <Link
              href={`/cards/${currentCard.slug}`}
              className="py-2 px-2.5 rounded-xl bg-[#FAF7F2] hover:bg-[#EFEAE1] text-[#0B0F17] font-bold text-xs flex items-center justify-center gap-1.5 transition-all active:scale-95"
            >
              <Eye size={14} weight="bold" className="text-slate-600" />
              <span>View Details</span>
            </Link>

            <a
              href={`${API_BASE_URL}/go/${currentCard.slug}`}
              target="_blank"
              rel="noopener noreferrer"
              className="py-2 px-2.5 rounded-xl bg-gradient-to-r from-[#1A56DB] via-[#4F46E5] to-[#7C3AED] hover:from-[#1E40AF] hover:to-[#6D28D9] text-white font-extrabold text-xs flex items-center justify-center gap-1.5 shadow-md shadow-indigo-500/20 active:scale-95 transition-all group/apply"
            >
              <Lightning size={14} weight="fill" className="text-amber-300 group-hover/apply:scale-110 transition-transform" />
              <span>Apply Now</span>
            </a>
          </div>
        </div>

        {/* ======================================================== */}
        {/* NEXT CARD PEEK (Desktop side background) */}
        {/* ======================================================== */}
        {totalCards > 1 && (
          <div
            onClick={goToNext}
            className="hidden md:block absolute right-0 w-[300px] translate-x-[75%] scale-[0.88] opacity-30 hover:opacity-50 transition-all duration-300 z-0 cursor-pointer pointer-events-auto filter blur-[0.5px]"
            title={`Next: ${nextCard.title}`}
          >
            <div className="rounded-2xl bg-white p-3.5 shadow-lg flex flex-col justify-between h-[200px] pointer-events-none">
              <BankLogoBadge bankName={nextCard.bankName} />
              <div className="relative w-full h-24 rounded-lg overflow-hidden my-auto">
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
        {/* FLOATING NAVIGATION ARROWS (Vertically Centered on Active Card) */}
        {/* ======================================================== */}
        {totalCards > 1 && (
          <>
            <button
              type="button"
              onClick={goToPrev}
              aria-label="Previous credit card"
              className="absolute -left-2.5 sm:-left-4 top-1/2 -translate-y-1/2 z-30 w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-white shadow-md shadow-black/10 hover:bg-[#0B0F17] hover:text-white flex items-center justify-center text-slate-800 transition-all active:scale-90"
            >
              <CaretLeft size={16} weight="bold" />
            </button>

            <button
              type="button"
              onClick={goToNext}
              aria-label="Next credit card"
              className="absolute -right-2.5 sm:-right-4 top-1/2 -translate-y-1/2 z-30 w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-white shadow-md shadow-black/10 hover:bg-[#0B0F17] hover:text-white flex items-center justify-center text-slate-800 transition-all active:scale-90"
            >
              <CaretRight size={16} weight="bold" />
            </button>
          </>
        )}
      </div>

      {/* ======================================================== */}
      {/* 2. PAGINATION DOTS */}
      {/* ======================================================== */}
      {totalCards > 1 && (
        <div className="mt-2 flex items-center justify-center gap-1.5">
          {filteredCards.slice(0, 6).map((_, i) => (
            <button
              key={i}
              type="button"
              onClick={() => goToSlide(i)}
              aria-label={`Go to card ${i + 1}`}
              className={`rounded-full transition-all duration-300 ${
                i === safeIndex
                  ? 'w-5 h-1.5 bg-[#1A56DB]'
                  : 'w-1.5 h-1.5 bg-slate-300 hover:bg-slate-400'
              }`}
            />
          ))}
        </div>
      )}

      {/* ======================================================== */}
      {/* 3. CATEGORY PILLS BAR (Exact Reference Image Style) */}
      {/* ======================================================== */}
      <div className="mt-2.5 sm:mt-3 flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none justify-start sm:justify-center px-1">
        {categoryTabs.map((tab) => {
          const isActive = selectedCategory === tab.value;
          return (
            <button
              key={tab.value}
              type="button"
              onClick={() => handleSelectCategory(tab.value)}
              className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold whitespace-nowrap transition-all duration-200 active:scale-95 ${
                isActive
                  ? 'bg-[#1A56DB] text-white shadow-xs'
                  : 'bg-white text-slate-700 hover:bg-slate-100 shadow-2xs'
              }`}
            >
              <span>{tab.icon}</span>
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* ======================================================== */}
      {/* 4. COMPARE CARDS BANNER (Exact Reference Image Style) */}
      {/* ======================================================== */}
      <div className="mt-2.5 sm:mt-3 p-2.5 sm:p-3 rounded-2xl bg-white shadow-md shadow-indigo-950/[0.03] flex items-center justify-between gap-3 transition-transform hover:-translate-y-0.5">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-xl bg-indigo-50 flex items-center justify-center flex-shrink-0 text-[#1A56DB]">
            <Scales size={18} weight="duotone" />
          </div>
          <div>
            <h3 className="text-xs sm:text-sm font-extrabold text-[#0B0F17] tracking-tight">
              Compare Cards
            </h3>
            <p className="text-[10px] text-slate-500 font-medium">
              Find the best match for your needs
            </p>
          </div>
        </div>

        <Link
          href="/compare"
          className="whitespace-nowrap py-1.5 px-3 rounded-full bg-[#FAF7F2] hover:bg-[#EFEAE1] text-[#0B0F17] font-bold text-xs flex items-center gap-1 transition-all active:scale-95"
        >
          <span>Compare Now</span>
          <ArrowRight size={13} weight="bold" />
        </Link>
      </div>

      {/* ======================================================== */}
      {/* 5. TRUST & LEGAL FOOTER (Exact Reference Image Style) */}
      {/* ======================================================== */}
      <div className="mt-2 sm:mt-2.5 text-center space-y-1 text-[10px] text-slate-500 pb-1">
        <div className="inline-flex items-center justify-center gap-1.5 font-bold text-slate-600">
          <ShieldCheck size={13} weight="fill" className="text-emerald-600" />
          <span>Trusted by Millions</span>
          <span className="text-slate-300">|</span>
          <span>100% Secure &amp; Transparent</span>
        </div>

        <div className="flex items-center justify-center gap-2 font-semibold text-slate-400">
          <Link href="/privacy" className="hover:text-[#1A56DB] transition-colors">
            Privacy Policy
          </Link>
          <span className="text-slate-300">|</span>
          <Link href="/affiliate-disclosure" className="hover:text-[#1A56DB] transition-colors">
            Terms &amp; Conditions
          </Link>
        </div>
      </div>
    </div>
  );
}
