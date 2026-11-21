'use client';

import React, { useState, useEffect, useRef, useCallback } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Card } from '@/types/card';
import { formatCurrency } from '@/lib/utils';
import { API_BASE_URL } from '@/lib/api';
import {
  CaretLeft,
  CaretRight,
  ArrowRight,
  ArrowSquareOut,
  Eye,
  Check,
  Sparkle,
  Pause,
  Play,
  ShieldCheck,
  AirplaneTilt,
  Percent,
  CreditCard as CardIcon,
  Tag,
} from '@phosphor-icons/react';

interface CreditCardsCarouselProps {
  cards: Card[];
  autoplayInterval?: number;
  initialAutoplay?: boolean;
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
  const [progress, setProgress] = useState(0);
  const [reducedMotion, setReducedMotion] = useState(false);

  const containerRef = useRef<HTMLDivElement>(null);
  const progressTimerRef = useRef<NodeJS.Timeout | null>(null);

  const totalCards = cards.length;

  // Check for prefers-reduced-motion
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

  // Navigation handlers
  const goToNext = useCallback(() => {
    if (totalCards <= 1) return;
    setCurrentIndex((prev) => (prev + 1) % totalCards);
    setProgress(0);
  }, [totalCards]);

  const goToPrev = useCallback(() => {
    if (totalCards <= 1) return;
    setCurrentIndex((prev) => (prev - 1 + totalCards) % totalCards);
    setProgress(0);
  }, [totalCards]);

  const goToSlide = (index: number) => {
    if (index === currentIndex) return;
    setCurrentIndex(index);
    setProgress(0);
  };

  // Autoplay and progress bar ticker
  useEffect(() => {
    if (totalCards <= 1 || !isPlaying || isHovered || isDragging || reducedMotion) {
      if (progressTimerRef.current) clearInterval(progressTimerRef.current);
      return;
    }

    const intervalStep = 50; // update progress every 50ms
    const totalSteps = autoplayInterval / intervalStep;

    progressTimerRef.current = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          goToNext();
          return 0;
        }
        return prev + 100 / totalSteps;
      });
    }, intervalStep);

    return () => {
      if (progressTimerRef.current) clearInterval(progressTimerRef.current);
    };
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
    const threshold = 50; // min swipe distance in px

    if (diff > threshold) {
      goToNext();
    } else if (diff < -threshold) {
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
    const threshold = 50;

    if (diff > threshold) {
      goToNext();
    } else if (diff < -threshold) {
      goToPrev();
    }
    setDragStartX(0);
    setDragCurrentX(0);
  };

  const handleMouseLeave = () => {
    if (isDragging) {
      handleMouseUp();
    }
    setIsHovered(false);
  };

  if (!cards || cards.length === 0) {
    return (
      <div className="w-full max-w-4xl mx-auto p-10 text-center rounded-3xl bg-white shadow-xl shadow-black/[0.03]">
        <CardIcon size={48} className="mx-auto text-slate-300 mb-3" />
        <h3 className="text-lg font-bold text-[#0B0F17]">No Credit Cards Available</h3>
        <p className="text-sm text-slate-500 mt-1">
          Active credit cards will appear here once configured by the admin.
        </p>
      </div>
    );
  }

  // Get benefit icon based on text
  const getBenefitIcon = (benefitText: string) => {
    const lower = benefitText.toLowerCase();
    if (lower.includes('lounge') || lower.includes('flight') || lower.includes('travel')) {
      return <AirplaneTilt size={15} weight="fill" className="text-[#1A56DB]" />;
    }
    if (lower.includes('cashback') || lower.includes('%') || lower.includes('discount')) {
      return <Percent size={15} weight="bold" className="text-emerald-600" />;
    }
    if (lower.includes('reward') || lower.includes('point') || lower.includes('voucher')) {
      return <Sparkle size={15} weight="fill" className="text-amber-500" />;
    }
    if (lower.includes('free') || lower.includes('waiver')) {
      return <Tag size={15} weight="fill" className="text-purple-600" />;
    }
    return <Check size={15} weight="bold" className="text-emerald-600" />;
  };

  return (
    <section
      aria-label="Featured Credit Cards Carousel"
      className="w-full max-w-5xl mx-auto relative select-none"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
    >
      {/* Outer Card Carousel Container with Soft Shadows & Zero Borders */}
      <div
        ref={containerRef}
        className="relative overflow-hidden rounded-3xl bg-white shadow-2xl shadow-black/[0.04] p-5 sm:p-8 md:p-10 cursor-grab active:cursor-grabbing transition-shadow duration-300"
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
      >
        {/* Carousel Slider Track */}
        <div
          className={`flex ${reducedMotion ? '' : 'transition-transform duration-500 ease-out'}`}
          style={{
            transform: `translateX(-${currentIndex * 100}%)`,
          }}
        >
          {cards.map((card, idx) => {
            const applyUrl = `${API_BASE_URL}/go/${card.slug}`;
            const detailUrl = `/cards/${card.slug}`;
            const keyBenefits = card.benefits?.slice(0, 3) || [];

            return (
              <div
                key={card._id || idx}
                className="w-full flex-shrink-0"
                aria-hidden={idx !== currentIndex}
              >
                <div className="flex flex-col lg:flex-row items-center gap-6 lg:gap-10">
                  {/* Left Column: Floating Visual Card with 3D Aura Effect */}
                  <div className="w-full lg:w-[45%] flex flex-col items-center justify-center">
                    <div className="relative w-full max-w-[340px] sm:max-w-[380px] aspect-[1.586] rounded-2xl p-1 group">
                      {/* Ambient Glow Aura */}
                      <div
                        className="absolute inset-0 -z-10 rounded-3xl blur-2xl opacity-40 transition-opacity group-hover:opacity-60"
                        style={{
                          background:
                            card.category === 'Travel'
                              ? 'radial-gradient(circle, rgba(59, 130, 246, 0.4) 0%, rgba(99, 102, 241, 0.2) 70%, transparent 100%)'
                              : card.category === 'Cashback'
                              ? 'radial-gradient(circle, rgba(16, 185, 129, 0.4) 0%, rgba(245, 158, 11, 0.2) 70%, transparent 100%)'
                              : 'radial-gradient(circle, rgba(249, 115, 22, 0.4) 0%, rgba(236, 72, 153, 0.2) 70%, transparent 100%)',
                        }}
                      />

                      {/* Floating Card Image */}
                      <div className="relative w-full h-full rounded-2xl overflow-hidden shadow-2xl shadow-black/20 transform lg:-rotate-2 lg:group-hover:rotate-0 transition-transform duration-500 ease-out">
                        {card.imageUrl ? (
                          <Image
                            src={card.imageUrl}
                            alt={card.title}
                            fill
                            priority={idx === 0}
                            className="object-cover"
                            sizes="(max-width: 768px) 340px, 400px"
                          />
                        ) : (
                          <div className="w-full h-full bg-gradient-to-br from-slate-900 via-indigo-950 to-slate-900 text-white p-5 flex flex-col justify-between">
                            <span className="text-xs uppercase tracking-widest text-slate-300 font-bold">
                              {card.bankName}
                            </span>
                            <span className="text-base font-bold line-clamp-1">{card.title}</span>
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Subtle Card Category Pill under card on mobile */}
                    <div className="mt-4 flex items-center gap-2">
                      <span className="px-3 py-1 rounded-full text-xs font-bold text-slate-700 bg-[#F5F2EB]">
                        {card.bankName}
                      </span>
                      <span className="px-3 py-1 rounded-full text-xs font-bold text-[#1A56DB] bg-[#EFF6FF]">
                        {card.category}
                      </span>
                      {card.isFeatured && (
                        <span className="px-3 py-1 rounded-full text-xs font-bold text-amber-900 bg-[#FEF3C7] flex items-center gap-1">
                          <Sparkle size={12} weight="fill" className="text-amber-500" />
                          <span>Featured</span>
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Right Column: Card Information, Fees, Benefits, Actions */}
                  <div className="w-full lg:w-[55%] flex flex-col justify-between space-y-5 text-left">
                    {/* Card Title & Hero Tag */}
                    <div className="space-y-2">
                      {card.heroTag && (
                        <span className="inline-block text-xs font-extrabold text-[#9A3412] bg-[#FDE4CE] px-3 py-1 rounded-full shadow-xs">
                          {card.heroTag}
                        </span>
                      )}
                      <h2 className="text-2xl sm:text-3xl font-extrabold text-[#0B0F17] tracking-tight leading-snug">
                        {card.title}
                      </h2>
                      <p className="text-xs sm:text-sm text-slate-500 font-medium">
                        Issued by <strong className="text-slate-800">{card.bankName}</strong> • Verified Partner Application
                      </p>
                    </div>

                    {/* Fee Summary Cards (Zero Border, Soft Fill) */}
                    <div className="grid grid-cols-2 gap-3 sm:gap-4">
                      {/* Joining Fee Box */}
                      <div className="p-3.5 sm:p-4 rounded-2xl bg-[#FAF7F2] space-y-1">
                        <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">
                          Joining Fee
                        </span>
                        <div className="text-lg sm:text-xl font-extrabold text-[#0B0F17]">
                          {formatCurrency(card.joiningFee)}
                        </div>
                        <span className="text-[11px] text-slate-500 block">One-time setup</span>
                      </div>

                      {/* Annual Fee Box */}
                      <div className="p-3.5 sm:p-4 rounded-2xl bg-[#FAF7F2] space-y-1">
                        <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">
                          Annual Fee
                        </span>
                        <div className="text-lg sm:text-xl font-extrabold text-[#0B0F17]">
                          {formatCurrency(card.annualFee)}
                        </div>
                        <span className="text-[11px] text-emerald-700 font-semibold block truncate" title={card.feeWaiver || 'Yearly renewal'}>
                          {card.feeWaiver ? card.feeWaiver.slice(0, 24) + '...' : 'Yearly renewal'}
                        </span>
                      </div>
                    </div>

                    {/* Key Benefits */}
                    <div className="space-y-2.5">
                      <span className="text-xs font-bold text-slate-700 uppercase tracking-wider">
                        Key Privileges &amp; Rewards:
                      </span>
                      <ul className="space-y-2">
                        {keyBenefits.map((benefit, bIdx) => (
                          <li
                            key={bIdx}
                            className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-700 leading-snug"
                          >
                            <span className="mt-0.5 p-1 rounded-full bg-[#FAF7F2] flex-shrink-0">
                              {getBenefitIcon(benefit)}
                            </span>
                            <span>{benefit}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Action Buttons: VIEW & APPLY NOW */}
                    <div className="pt-2 flex flex-col sm:flex-row items-center gap-3">
                      {/* Apply Now: Redirects through backend referral click tracking */}
                      <a
                        href={applyUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-full sm:flex-1 py-3.5 px-6 rounded-full bg-[#0B0F17] hover:bg-[#1A56DB] text-white font-bold text-sm sm:text-base flex items-center justify-center gap-2 shadow-lg shadow-black/10 active:scale-95 transition-all group/apply"
                      >
                        <span>Apply Now</span>
                        <ArrowSquareOut
                          size={18}
                          weight="bold"
                          className="transition-transform group-hover/apply:translate-x-0.5 group-hover/apply:-translate-y-0.5"
                        />
                      </a>

                      {/* View Details: Navigates to individual card slug page */}
                      <Link
                        href={detailUrl}
                        className="w-full sm:w-auto py-3.5 px-6 rounded-full bg-[#FAF7F2] hover:bg-[#F0ECE1] text-[#0B0F17] font-bold text-sm sm:text-base flex items-center justify-center gap-2 transition-all active:scale-95"
                      >
                        <Eye size={18} weight="bold" />
                        <span>View Details</span>
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Progress Bar (Visual indicator for 5s auto-slide) */}
        {isPlaying && totalCards > 1 && (
          <div className="absolute top-0 left-0 right-0 h-1 bg-slate-100 overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-[#1A56DB] to-[#06B6D4] transition-all duration-75 ease-linear"
              style={{ width: `${progress}%` }}
            />
          </div>
        )}
      </div>

      {/* Carousel Navigation Footer Controls */}
      {totalCards > 1 && (
        <div className="mt-5 flex items-center justify-between px-2 sm:px-4">
          {/* Left: Previous Arrow */}
          <button
            type="button"
            onClick={goToPrev}
            aria-label="Previous credit card"
            className="w-10 h-10 sm:w-11 sm:h-11 rounded-full bg-white shadow-md shadow-black/5 hover:bg-[#0B0F17] hover:text-white flex items-center justify-center text-slate-800 transition-all active:scale-90"
          >
            <CaretLeft size={20} weight="bold" />
          </button>

          {/* Center: Slide Indicators / Dots */}
          <div className="flex items-center gap-2">
            {cards.map((_, i) => (
              <button
                key={i}
                type="button"
                onClick={() => goToSlide(i)}
                aria-label={`Go to slide ${i + 1}`}
                className={`h-2.5 rounded-full transition-all duration-300 ${
                  i === currentIndex
                    ? 'w-8 bg-[#0B0F17]'
                    : 'w-2.5 bg-slate-300 hover:bg-slate-400'
                }`}
              />
            ))}

            {/* Slide Index Text */}
            <span className="ml-2 text-xs font-bold text-slate-400 tabular-nums">
              {String(currentIndex + 1).padStart(2, '0')} / {String(totalCards).padStart(2, '0')}
            </span>

            {/* Pause / Play Button */}
            <button
              type="button"
              onClick={() => setIsPlaying(!isPlaying)}
              aria-label={isPlaying ? 'Pause autoplay' : 'Play autoplay'}
              className="ml-3 p-1.5 rounded-full hover:bg-slate-200 text-slate-400 hover:text-slate-700 transition-colors"
              title={isPlaying ? 'Pause autoplay' : 'Resume autoplay'}
            >
              {isPlaying ? <Pause size={14} weight="fill" /> : <Play size={14} weight="fill" />}
            </button>
          </div>

          {/* Right: Next Arrow */}
          <button
            type="button"
            onClick={goToNext}
            aria-label="Next credit card"
            className="w-10 h-10 sm:w-11 sm:h-11 rounded-full bg-white shadow-md shadow-black/5 hover:bg-[#0B0F17] hover:text-white flex items-center justify-center text-slate-800 transition-all active:scale-90"
          >
            <CaretRight size={20} weight="bold" />
          </button>
        </div>
      )}
    </section>
  );
}
