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
  GasPump,
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
    <div className="flex items-center gap-1.5 font-extrabold text-[#0B0F17] text-xs">
      <Bank size={15} weight="fill" className="text-[#1A56DB]" />
      <span className="truncate max-w-[120px]">{bankName}</span>
    </div>
  );
}

// Benefit Icon Helper matching reference icons
function BenefitItem({ text }: { text: string }) {
  const lower = text.toLowerCase();

  let icon = <Check size={14} weight="bold" className="text-[#1A56DB]" />;
  if (lower.includes('lounge') || lower.includes('airport') || lower.includes('flight') || lower.includes('travel')) {
    icon = <AirplaneTilt size={14} weight="fill" className="text-[#1A56DB]" />;
  } else if (lower.includes('reward') || lower.includes('point') || lower.includes('voucher') || lower.includes('gift')) {
    icon = <Gift size={14} weight="fill" className="text-amber-500" />;
  } else if (lower.includes('dining') || lower.includes('food') || lower.includes('swiggy') || lower.includes('zomato')) {
    icon = <ForkKnife size={14} weight="fill" className="text-rose-500" />;
  } else if (lower.includes('cashback') || lower.includes('%') || lower.includes('discount')) {
    icon = <Percent size={14} weight="bold" className="text-emerald-600" />;
  } else if (lower.includes('fuel') || lower.includes('petrol') || lower.includes('surcharge')) {
    icon = <GasPump size={14} weight="fill" className="text-orange-500" />;
  }

  return (
    <li className="flex items-center gap-2 text-xs sm:text-sm text-slate-700 font-medium leading-snug">
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
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [dragStartX, setDragStartX] = useState(0);
  const [dragCurrentX, setDragCurrentX] = useState(0);
  const [reducedMotion, setReducedMotion] = useState(false);

  // Category navigation tabs (Section 3.E)
  const categoryTabs = [
    { label: 'All Cards', value: 'All', icon: <CardIcon size={15} weight="fill" /> },
    { label: 'Lifetime Free', value: 'Lifetime Free', icon: <Crown size={15} weight="fill" className="text-amber-500" /> },
    { label: 'Cashback', value: 'Cashback', icon: <Target size={15} weight="bold" className="text-blue-500" /> },
    { label: 'Shopping', value: 'Shopping', icon: <ShoppingBag size={15} weight="fill" className="text-purple-500" /> },
    { label: 'Travel', value: 'Travel', icon: <AirplaneTilt size={15} weight="fill" className="text-indigo-500" /> },
    { label: 'Fuel', value: 'Fuel', icon: <GasPump size={15} weight="fill" className="text-orange-500" /> },
  ];

  // Filter cards based on selected category
  const filteredCards = useMemo(() => {
    if (selectedCategory === 'All') return cards;
    const cat = selectedCategory.toLowerCase();
    
    // First, direct match on category
    let result = cards.filter((c) => (c.category || '').toLowerCase() === cat);
    
    // For Fuel or special categories, check benefits or title if not tagged directly
    if (result.length === 0 && cat === 'fuel') {
      result = cards.filter((c) => {
        const text = `${c.title} ${c.benefits?.join(' ') || ''}`.toLowerCase();
        return text.includes('fuel') || text.includes('petrol') || text.includes('surcharge');
      });
    }

    return result.length > 0 ? result : cards;
  }, [cards, selectedCategory]);

  const totalCards = filteredCards.length;
  const isPlaying = initialAutoplay && totalCards > 1;

  // Handle category change: reset slide index
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

  // Autoplay ticker (5 seconds default, pauses on interaction)
  useEffect(() => {
    if (totalCards <= 1 || !isPlaying || isHovered || isDragging || reducedMotion) {
      return;
    }
    const timer = setInterval(() => {
      goToNext();
    }, autoplayInterval);

    return () => clearInterval(timer);
  }, [totalCards, isPlaying, isHovered, isDragging, reducedMotion, autoplayInterval, goToNext]);

  // Touch Swipe Handlers for mobile
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
    if (diff > 45) {
      goToNext();
    } else if (diff < -45) {
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
    if (diff > 45) {
      goToNext();
    } else if (diff < -45) {
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
      <div className="w-full max-w-md mx-auto p-8 text-center rounded-3xl bg-white shadow-xl shadow-black/[0.03]">
        <CardIcon size={44} className="mx-auto text-slate-300 mb-2" />
        <h3 className="text-base font-bold text-[#0B0F17]">No Credit Cards Configured</h3>
        <p className="text-xs text-slate-500 mt-1">Cards will display here once added by admin.</p>
      </div>
    );
  }

  // Safe active index
  const safeIndex = currentIndex >= totalCards ? 0 : currentIndex;
  const currentCard = filteredCards[safeIndex];

  // Indices for neighboring peeking slides
  const prevIndex = (safeIndex - 1 + totalCards) % totalCards;
  const nextIndex = (safeIndex + 1) % totalCards;
  const prevCard = filteredCards[prevIndex];
  const nextCard = filteredCards[nextIndex];

  return (
    <div
      className="w-full max-w-4xl mx-auto flex flex-col select-none"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
    >
      {/* ======================================================== */}
      {/* 1. ANIMATED CAROUSEL VIEWPORT (3-Card Peeking Layout) */}
      {/* ======================================================== */}
      <div
        className="relative flex items-center justify-center py-2 sm:py-5 overflow-hidden"
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
      >
        {/* ======================================================== */}
        {/* PREVIOUS CARD PEEK (Left side background on wider screens) */}
        {/* ======================================================== */}
        {totalCards > 1 && (
          <div
            onClick={goToPrev}
            className="hidden md:block absolute left-0 w-[420px] -translate-x-[72%] scale-[0.88] opacity-35 hover:opacity-50 transition-all duration-500 z-0 cursor-pointer pointer-events-auto filter blur-[0.5px]"
            title={`Previous: ${prevCard.title}`}
          >
            <div className="rounded-[28px] bg-white p-6 shadow-xl flex flex-col justify-between h-[340px] pointer-events-none">
              <BankLogoBadge bankName={prevCard.bankName} />
              <div className="relative w-full h-40 rounded-xl overflow-hidden my-auto shadow-md">
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
        {/* CENTER ACTIVE CARD (Matching Reference Image Composition) */}
        {/* ======================================================== */}
        <div className="relative z-10 w-full max-w-[680px] mx-auto rounded-[28px] sm:rounded-[32px] bg-white p-4 sm:p-7 shadow-2xl shadow-indigo-950/[0.08] transition-all duration-300 ease-out">
          
          {/* Top Bar: Bank Logo (Left) & Featured / Category Badges (Right) */}
          <div className="flex items-center justify-between gap-2 mb-3.5 sm:mb-5">
            {/* Bank Logo in Soft Container */}
            <div className="px-3 py-1.5 rounded-xl bg-[#FAF7F2] inline-flex items-center shadow-2xs">
              <BankLogoBadge bankName={currentCard.bankName} />
            </div>

            {/* Badges: Category + Most Popular Pill */}
            <div className="flex items-center gap-2">
              <span className="hidden xs:inline-flex items-center px-2.5 py-1 rounded-full bg-[#EFF6FF] text-[#1A56DB] text-[11px] font-bold">
                {currentCard.category}
              </span>
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#FEF3C7] text-[#92400E] text-[11px] sm:text-xs font-bold shadow-2xs">
                <Star size={13} weight="fill" className="text-amber-500" />
                <span>{currentCard.heroTag || (currentCard.isFeatured ? 'Most Popular' : 'Top Choice')}</span>
              </div>
            </div>
          </div>

          {/* Middle Section: Side-by-Side 2 Columns (Card Image on Left, Info on Right) */}
          <div className="grid grid-cols-[130px_1fr] xs:grid-cols-[150px_1fr] sm:grid-cols-[210px_1fr] md:grid-cols-[240px_1fr] gap-3.5 sm:gap-6 items-center">
            
            {/* Left Column: Credit Card Visual with Realistic Shadow and Soft Glow */}
            <div className="relative w-full aspect-[1.586] rounded-xl sm:rounded-2xl overflow-hidden shadow-xl shadow-black/25 flex-shrink-0 group/card">
              {/* Soft Ambient Glow */}
              <div
                className="absolute inset-0 -z-10 rounded-xl blur-xl opacity-35 pointer-events-none"
                style={{
                  background:
                    currentCard.category === 'Travel'
                      ? 'radial-gradient(circle, rgba(59, 130, 246, 0.4) 0%, transparent 70%)'
                      : currentCard.category === 'Cashback'
                      ? 'radial-gradient(circle, rgba(16, 185, 129, 0.4) 0%, transparent 70%)'
                      : 'radial-gradient(circle, rgba(26, 86, 219, 0.4) 0%, transparent 70%)',
                }}
              />
              {currentCard.imageUrl ? (
                <Image
                  src={currentCard.imageUrl}
                  alt={currentCard.title}
                  fill
                  priority
                  className="object-cover transition-transform duration-500 group-hover/card:scale-105"
                  sizes="(max-width: 640px) 150px, 240px"
                />
              ) : (
                <div className="w-full h-full bg-gradient-to-br from-slate-900 to-indigo-950 text-white p-3 flex flex-col justify-between">
                  <span className="text-[9px] font-bold uppercase tracking-wider">{currentCard.bankName}</span>
                  <span className="text-xs font-bold truncate">{currentCard.title}</span>
                </div>
              )}
            </div>

            {/* Right Column: Title, Fee Boxes & Benefits */}
            <div className="flex flex-col justify-center min-w-0 space-y-2 sm:space-y-3.5 text-left">
              {/* Card Title */}
              <div>
                <span className="text-[10px] sm:text-xs font-bold text-slate-400 uppercase tracking-wider block">
                  {currentCard.bankName}
                </span>
                <h2 className="text-xs sm:text-base md:text-lg font-black text-[#0B0F17] tracking-tight leading-snug line-clamp-2">
                  {currentCard.title}
                </h2>
              </div>

              {/* Side-by-Side Fee Boxes */}
              <div className="grid grid-cols-2 gap-2 sm:gap-2.5">
                <div className="p-2 sm:p-2.5 rounded-xl bg-[#FAF7F2] text-center">
                  <span className="text-[9px] sm:text-[10px] font-bold text-slate-400 block uppercase leading-none">
                    Joining Fee
                  </span>
                  <div className="text-xs sm:text-base font-black text-[#0B0F17] mt-1 leading-none">
                    {formatCurrency(currentCard.joiningFee)}
                  </div>
                </div>

                <div className="p-2 sm:p-2.5 rounded-xl bg-[#FAF7F2] text-center">
                  <span className="text-[9px] sm:text-[10px] font-bold text-slate-400 block uppercase leading-none">
                    Annual Fee
                  </span>
                  <div className="text-xs sm:text-base font-black text-[#0B0F17] mt-1 leading-none">
                    {formatCurrency(currentCard.annualFee)}
                  </div>
                </div>
              </div>

              {/* Key Benefits List with Icons */}
              <ul className="space-y-1 sm:space-y-1.5">
                {currentCard.benefits && currentCard.benefits.length > 0 ? (
                  currentCard.benefits.slice(0, 3).map((benefit, bIdx) => (
                    <BenefitItem key={bIdx} text={benefit} />
                  ))
                ) : (
                  <>
                    <BenefitItem text="Reward points on online retail" />
                    <BenefitItem text="Complimentary airport lounge access" />
                    <BenefitItem text="Exclusive dining discounts" />
                  </>
                )}
              </ul>
            </div>
          </div>

          {/* Bottom Actions Row: VIEW DETAILS & APPLY NOW (Single Row, High Contrast) */}
          <div className="mt-4 sm:mt-6 pt-3 sm:pt-4 border-t border-slate-100 grid grid-cols-2 gap-2.5 sm:gap-4">
            {/* View Details Button (Existing Secondary Button Style) */}
            <Link
              href={`/cards/${currentCard.slug}`}
              className="w-full py-2.5 sm:py-3.5 px-3 sm:px-6 rounded-xl sm:rounded-2xl bg-[#FAF7F2] hover:bg-[#EFEAE1] text-[#0B0F17] font-bold text-xs sm:text-sm flex items-center justify-center gap-1.5 sm:gap-2 transition-all active:scale-95 shadow-xs whitespace-nowrap"
            >
              <Eye size={16} weight="bold" className="text-slate-600 flex-shrink-0" />
              <span>View Details</span>
            </Link>

            {/* Apply Now Button (Existing Primary Brand Color Style) */}
            <a
              href={`${API_BASE_URL}/go/${currentCard.slug}`}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full py-2.5 sm:py-3.5 px-3 sm:px-6 rounded-xl sm:rounded-2xl bg-[#1A56DB] hover:bg-[#1E40AF] text-white font-extrabold text-xs sm:text-sm flex items-center justify-center gap-1.5 sm:gap-2 shadow-lg shadow-blue-600/25 active:scale-95 transition-all group/apply whitespace-nowrap"
            >
              <Lightning size={16} weight="fill" className="text-amber-300 group-hover/apply:scale-110 transition-transform flex-shrink-0" />
              <span>Apply Now</span>
            </a>
          </div>
        </div>

        {/* ======================================================== */}
        {/* NEXT CARD PEEK (Right side background on wider screens) */}
        {/* ======================================================== */}
        {totalCards > 1 && (
          <div
            onClick={goToNext}
            className="hidden md:block absolute right-0 w-[420px] translate-x-[72%] scale-[0.88] opacity-35 hover:opacity-50 transition-all duration-500 z-0 cursor-pointer pointer-events-auto filter blur-[0.5px]"
            title={`Next: ${nextCard.title}`}
          >
            <div className="rounded-[28px] bg-white p-6 shadow-xl flex flex-col justify-between h-[340px] pointer-events-none">
              <BankLogoBadge bankName={nextCard.bankName} />
              <div className="relative w-full h-40 rounded-xl overflow-hidden my-auto shadow-md">
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
            <button
              type="button"
              onClick={goToPrev}
              aria-label="Previous credit card"
              className="absolute -left-1 sm:left-2 top-1/2 -translate-y-1/2 z-30 w-9 h-9 sm:w-11 sm:h-11 rounded-full bg-white shadow-lg shadow-black/10 hover:bg-[#0B0F17] hover:text-white flex items-center justify-center text-slate-800 transition-all active:scale-90"
            >
              <CaretLeft size={18} weight="bold" />
            </button>

            <button
              type="button"
              onClick={goToNext}
              aria-label="Next credit card"
              className="absolute -right-1 sm:right-2 top-1/2 -translate-y-1/2 z-30 w-9 h-9 sm:w-11 sm:h-11 rounded-full bg-white shadow-lg shadow-black/10 hover:bg-[#0B0F17] hover:text-white flex items-center justify-center text-slate-800 transition-all active:scale-90"
            >
              <CaretRight size={18} weight="bold" />
            </button>
          </>
        )}
      </div>

      {/* ======================================================== */}
      {/* 2. PAGINATION DOTS (Active pill + soft dots) */}
      {/* ======================================================== */}
      {totalCards > 1 && (
        <div className="mt-3 flex items-center justify-center gap-1.5">
          {filteredCards.slice(0, 6).map((_, i) => (
            <button
              key={i}
              type="button"
              onClick={() => goToSlide(i)}
              aria-label={`Go to card ${i + 1}`}
              className={`rounded-full transition-all duration-300 ${
                i === safeIndex
                  ? 'w-7 h-2 bg-[#1A56DB]'
                  : 'w-2 h-2 bg-slate-300 hover:bg-slate-400'
              }`}
            />
          ))}
        </div>
      )}

      {/* ======================================================== */}
      {/* 3. CATEGORY NAVIGATION (Rounded Chips, Section 3.E) */}
      {/* ======================================================== */}
      <div className="mt-4 sm:mt-6 flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none justify-start sm:justify-center px-1">
        {categoryTabs.map((tab) => {
          const isActive = selectedCategory === tab.value;
          return (
            <button
              key={tab.value}
              type="button"
              onClick={() => handleSelectCategory(tab.value)}
              className={`inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs sm:text-sm font-bold whitespace-nowrap transition-all duration-200 active:scale-95 ${
                isActive
                  ? 'bg-[#1A56DB] text-white shadow-md shadow-blue-600/20'
                  : 'bg-white text-slate-700 hover:bg-slate-100 shadow-sm'
              }`}
            >
              <span>{tab.icon}</span>
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* ======================================================== */}
      {/* 4. COMPARE CARDS SECTION (Section 3.F) */}
      {/* ======================================================== */}
      <div className="mt-4 sm:mt-6 p-4 sm:p-5 rounded-2xl sm:rounded-3xl bg-white shadow-lg shadow-indigo-950/[0.04] flex items-center justify-between gap-3 transition-transform hover:-translate-y-0.5">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-blue-50 flex items-center justify-center flex-shrink-0 text-[#1A56DB]">
            <Scales size={22} weight="duotone" />
          </div>
          <div>
            <h3 className="text-sm sm:text-base font-extrabold text-[#0B0F17] tracking-tight">
              Compare Credit Cards
            </h3>
            <p className="text-xs text-slate-500 font-medium">
              Find the best match for your needs.
            </p>
          </div>
        </div>

        <Link
          href="/compare"
          className="whitespace-nowrap py-2 px-4 rounded-full bg-[#FAF7F2] hover:bg-[#EFEAE1] text-[#0B0F17] font-bold text-xs sm:text-sm flex items-center gap-1.5 transition-all active:scale-95 shadow-2xs"
        >
          <span>Compare Now</span>
          <ArrowRight size={14} weight="bold" />
        </Link>
      </div>

      {/* ======================================================== */}
      {/* 5. TRUST AND FOOTER (Section 3.G) */}
      {/* ======================================================== */}
      <div className="mt-5 sm:mt-7 text-center space-y-2.5 text-xs text-slate-500 pb-4">
        {/* Verified Partner Badge */}
        <div className="inline-flex items-center justify-center gap-1.5 font-bold text-slate-600">
          <ShieldCheck size={15} weight="fill" className="text-emerald-600" />
          <span>Direct Bank Partner Links</span>
          <span className="text-slate-300">•</span>
          <span>100% Free Service</span>
          <span className="text-slate-300">•</span>
          <span>Transparent Terms</span>
        </div>

        {/* Transparent Referral Disclosure */}
        <p className="text-[11px] text-slate-400 max-w-xl mx-auto leading-relaxed">
          Referral Disclosure: When you apply through links on our site, we may receive compensation from bank partners at no additional cost to you. We strive to provide transparent and unbiased information to help you find the right card.
        </p>

        {/* Legal Links */}
        <div className="flex items-center justify-center gap-3 font-semibold text-slate-500 pt-1">
          <Link href="/privacy" className="hover:text-[#1A56DB] transition-colors">
            Privacy Policy
          </Link>
          <span className="text-slate-300">|</span>
          <Link href="/affiliate-disclosure" className="hover:text-[#1A56DB] transition-colors">
            Terms &amp; Conditions
          </Link>
          <span className="text-slate-300">|</span>
          <Link href="/contact" className="hover:text-[#1A56DB] transition-colors">
            Support
          </Link>
        </div>
      </div>
    </div>
  );
}
