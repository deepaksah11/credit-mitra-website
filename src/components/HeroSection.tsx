'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import {
  Lightning,
  ArrowRight,
  Play,
  Pause,
  Gift,
  ShieldCheck,
  CurrencyInr,
  X,
  CaretLeft,
  CaretRight,
  Check,
  Sparkle,
  ArrowSquareOut,
} from '@phosphor-icons/react';
import { Card } from '@/types/card';
import { formatCurrency } from '@/lib/utils';
import { API_BASE_URL } from '@/lib/api';

interface HeroSectionProps {
  heroCards?: Card[];
}

const SLIDE_DURATION = 4200; // 4.2 seconds per slide for a brisk, engaging auto-slide

export default function HeroSection({ heroCards = [] }: HeroSectionProps) {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const [isHovered, setIsHovered] = useState(false);
  const [direction, setDirection] = useState<'next' | 'prev'>('next');
  const [videoModalOpen, setVideoModalOpen] = useState(false);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  // Total slides: Slide 0 is Flagship Brand Slide, followed by any admin-featured hero cards
  const totalSlides = 1 + heroCards.length;

  // Auto-slide effect
  useEffect(() => {
    if (totalSlides <= 1 || !isAutoPlaying || isHovered) {
      if (timerRef.current) clearInterval(timerRef.current);
      return;
    }

    timerRef.current = setInterval(() => {
      setDirection('next');
      setCurrentSlide((prev) => (prev + 1) % totalSlides);
    }, SLIDE_DURATION);

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [totalSlides, isAutoPlaying, isHovered, currentSlide]);

  const goToPrevSlide = () => {
    setDirection('prev');
    setCurrentSlide((prev) => (prev - 1 + totalSlides) % totalSlides);
  };

  const goToNextSlide = () => {
    setDirection('next');
    setCurrentSlide((prev) => (prev + 1) % totalSlides);
  };

  const selectSlide = (index: number) => {
    setDirection(index > currentSlide ? 'next' : 'prev');
    setCurrentSlide(index);
  };

  // Currently active card if not on Slide 0
  const activeCard: Card | null = currentSlide > 0 ? heroCards[currentSlide - 1] : null;

  return (
    <section
      className="relative overflow-hidden pt-4 pb-12 md:pt-8 md:pb-20 select-none group/hero"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Background Soft Blue & Cyan Ambient Glow Mesh */}
      <div
        className="absolute -top-24 right-0 w-[650px] lg:w-[850px] h-[650px] pointer-events-none -z-10"
        style={{
          background:
            'radial-gradient(circle at 70% 30%, rgba(147, 197, 253, 0.4) 0%, rgba(191, 219, 254, 0.2) 45%, transparent 70%)',
        }}
      />
      <div
        className="absolute top-12 left-0 w-[450px] h-[450px] pointer-events-none -z-10 opacity-60"
        style={{
          background:
            'radial-gradient(circle at 20% 25%, rgba(224, 242, 254, 0.6) 0%, transparent 65%)',
        }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-8 items-center min-h-[440px]">
          
          {/* ======================================================== */}
          {/* LEFT COLUMN: Slide Content (Headline / Special Features / CTA) */}
          {/* ======================================================== */}
          <div className="lg:col-span-7 space-y-5 text-left z-10 min-h-[380px] flex flex-col justify-center">
            
            {/* Dynamic key triggers a smooth horizontal slide transition */}
            <div
              key={`slide-content-${currentSlide}`}
              className={`space-y-5 transition-all duration-500 ease-out ${
                direction === 'next'
                  ? 'animate-in fade-in slide-in-from-right-8 duration-500'
                  : 'animate-in fade-in slide-in-from-left-8 duration-500'
              }`}
            >
              {/* SLIDE 0: Platform Flagship Overview */}
              {currentSlide === 0 ? (
                <div className="space-y-6">
                  {/* Tag / Pill Badge */}
                  <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-100/70 border border-blue-200/50 text-blue-600 text-xs sm:text-sm font-semibold shadow-sm">
                    <Lightning size={16} weight="fill" className="text-blue-600 flex-shrink-0" />
                    <span>Compare • Apply • Earn Rewards</span>
                  </div>

                  {/* Main Headline */}
                  <h1 className="text-4xl sm:text-5xl lg:text-[52px] font-extrabold tracking-tight leading-[1.14] text-[#0A192F]">
                    <span>Credit-Mitra</span>
                    <br />
                    <span className="font-bold text-[#0F172A]">Your Trusted Guide for</span>
                    <br />
                    <span className="text-[#1E40AF]">Credit &amp; Financial Products</span>
                  </h1>

                  {/* Subtitle */}
                  <p className="text-slate-600 text-base sm:text-lg max-w-xl font-normal leading-relaxed">
                    Find the best credit cards, loans and more — all in one place, with expert guidance and exclusive rewards.
                  </p>

                  {/* Action Buttons */}
                  <div className="flex flex-wrap items-center gap-4 pt-2">
                    <Link
                      href="/cards"
                      className="rounded-full bg-[#1A56DB] hover:bg-blue-700 active:scale-[0.98] text-white font-medium px-7 py-3.5 text-sm sm:text-base flex items-center gap-2 shadow-lg shadow-blue-600/25 transition-all group"
                    >
                      <span>Explore Credit Cards</span>
                      <ArrowRight size={18} weight="bold" className="group-hover:translate-x-1 transition-transform" />
                    </Link>

                    <button
                      type="button"
                      onClick={() => setVideoModalOpen(true)}
                      className="rounded-full border border-[#1A56DB] text-[#1A56DB] hover:bg-blue-50/70 active:scale-[0.98] font-medium px-6 py-3.5 text-sm sm:text-base flex items-center gap-2.5 transition-all bg-white shadow-sm"
                    >
                      <div className="w-5 h-5 rounded-full bg-[#1A56DB] text-white flex items-center justify-center flex-shrink-0">
                        <Play size={10} weight="fill" className="ml-0.5" />
                      </div>
                      <span>Watch Video</span>
                    </button>
                  </div>
                </div>
              ) : activeCard ? (
                /* SLIDE 1..N: Admin Configured Hero Product Slide */
                <div className="space-y-5">
                  {/* Hero Badge Tag */}
                  <div className="flex items-center gap-2.5 flex-wrap">
                    <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-100/90 border border-blue-200 text-[#1A56DB] text-xs sm:text-sm font-bold shadow-sm">
                      <Sparkle size={15} weight="fill" className="text-blue-600 flex-shrink-0" />
                      <span>{activeCard.heroTag || '⚡ Featured Hero Product'}</span>
                    </div>
                    <span className="px-2.5 py-1 rounded-full text-xs font-semibold bg-slate-100 text-slate-700 border border-slate-200/60">
                      {activeCard.bankName}
                    </span>
                    <span className="px-2.5 py-1 rounded-full text-xs font-semibold bg-blue-50 text-blue-700 border border-blue-100">
                      {activeCard.category}
                    </span>
                  </div>

                  {/* Card Title */}
                  <div>
                    <h2 className="text-3xl sm:text-4xl lg:text-[44px] font-extrabold tracking-tight leading-[1.15] text-[#0A192F]">
                      {activeCard.title}
                    </h2>
                    <p className="text-xs sm:text-sm text-slate-500 mt-1 font-medium">
                      Joining Fee: {formatCurrency(activeCard.joiningFee)} • Annual Fee: {formatCurrency(activeCard.annualFee)}
                      {activeCard.feeWaiver ? ` (${activeCard.feeWaiver})` : ''}
                    </p>
                  </div>

                  {/* Special Features (bullet points configured by admin) */}
                  <div className="p-4 sm:p-5 rounded-2xl bg-white/95 backdrop-blur-sm border border-blue-100 shadow-sm space-y-2.5 max-w-xl">
                    <div className="flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-[#1A56DB]" />
                      <span className="text-xs font-bold uppercase tracking-wider text-slate-800">
                        Special Features &amp; Benefits
                      </span>
                    </div>
                    <div className="space-y-2">
                      {(activeCard.heroSpecialFeatures && activeCard.heroSpecialFeatures.length > 0
                        ? activeCard.heroSpecialFeatures
                        : activeCard.benefits.slice(0, 3)
                      ).map((feature, idx) => (
                        <div key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-700 font-medium">
                          <div className="w-4 h-4 rounded-full bg-blue-100 text-[#1A56DB] flex items-center justify-center flex-shrink-0 mt-0.5">
                            <Check size={11} weight="bold" />
                          </div>
                          <span className="leading-snug">{feature}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Action Buttons: Apply Now & Card Details */}
                  <div className="flex flex-wrap items-center gap-4 pt-2">
                    {/* Official Apply Now Link */}
                    <a
                      href={`${API_BASE_URL}/go/${activeCard.slug}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="rounded-full bg-[#1A56DB] hover:bg-blue-700 active:scale-[0.98] text-white font-bold px-8 py-3.5 text-sm sm:text-base flex items-center gap-2 shadow-lg shadow-blue-600/30 transition-all group"
                    >
                      <span>Apply Now</span>
                      <ArrowSquareOut size={18} weight="bold" className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                    </a>

                    {/* View Details Secondary Button */}
                    <Link
                      href={`/cards/${activeCard.slug}`}
                      className="rounded-full border border-slate-300 hover:border-[#1A56DB] text-slate-700 hover:text-[#1A56DB] hover:bg-blue-50/50 active:scale-[0.98] font-semibold px-6 py-3.5 text-sm sm:text-base flex items-center gap-2 transition-all bg-white shadow-sm"
                    >
                      <span>View Card Details</span>
                      <ArrowRight size={16} weight="bold" />
                    </Link>
                  </div>
                </div>
              ) : null}
            </div>
          </div>

          {/* ======================================================== */}
          {/* RIGHT COLUMN: 3D Visual with Orbital Ring & Badges */}
          {/* ======================================================== */}
          <div className="lg:col-span-5 relative flex items-center justify-center min-h-[420px] sm:min-h-[480px]">
            
            {/* 3D Smooth Ambient Fluid Wave in Background */}
            <div className="absolute -top-10 -right-8 w-[420px] sm:w-[500px] h-[420px] sm:h-[500px] pointer-events-none -z-10 flex items-center justify-center opacity-85">
              <svg viewBox="0 0 500 500" className="w-full h-full overflow-visible" fill="none">
                <defs>
                  <linearGradient id="fluidBlueGrad" x1="20%" y1="0%" x2="80%" y2="100%">
                    <stop offset="0%" stopColor="#38BDF8" stopOpacity="0.8" />
                    <stop offset="45%" stopColor="#2563EB" stopOpacity="0.65" />
                    <stop offset="85%" stopColor="#1E40AF" stopOpacity="0.9" />
                    <stop offset="100%" stopColor="#60A5FA" stopOpacity="0.5" />
                  </linearGradient>
                  <filter id="softGlow" x="-20%" y="-20%" width="140%" height="140%">
                    <feGaussianBlur stdDeviation="30" result="blur" />
                    <feComposite in="SourceGraphic" in2="blur" operator="over" />
                  </filter>
                </defs>
                <path
                  d="M 280 40 C 400 30, 480 120, 470 240 C 460 360, 360 460, 240 450 C 140 440, 200 320, 260 260 C 330 190, 180 80, 280 40 Z"
                  fill="url(#fluidBlueGrad)"
                  filter="url(#softGlow)"
                  className="opacity-60"
                />
              </svg>
            </div>

            {/* Back Half of 3D Orbital Cyan Light Ring */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-0">
              <svg viewBox="0 0 560 320" className="w-[125%] max-w-[620px] h-auto overflow-visible">
                <defs>
                  <linearGradient id="orbitCyan" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#00F0FF" stopOpacity="0.2" />
                    <stop offset="50%" stopColor="#38BDF8" stopOpacity="0.9" />
                    <stop offset="100%" stopColor="#0284C7" stopOpacity="0.3" />
                  </linearGradient>
                  <filter id="neonHalo" x="-40%" y="-40%" width="180%" height="180%">
                    <feGaussianBlur stdDeviation="7" result="blur" />
                    <feMerge>
                      <feMergeNode in="blur" />
                      <feMergeNode in="SourceGraphic" />
                    </feMerge>
                  </filter>
                </defs>
                <ellipse
                  cx="280"
                  cy="165"
                  rx="240"
                  ry="72"
                  transform="rotate(-18 280 165)"
                  stroke="url(#orbitCyan)"
                  strokeWidth="3.5"
                  fill="none"
                  filter="url(#neonHalo)"
                  className="opacity-70"
                />
              </svg>
            </div>

            {/* 3D Stacked Floating Credit Cards */}
            <div className="relative w-[310px] sm:w-[360px] h-[210px] sm:h-[240px] flex items-center justify-center z-10">
              
              {/* Card 3: Back Card (Bright Royal Blue) */}
              <div
                className="absolute w-[275px] sm:w-[325px] h-[168px] sm:h-[198px] rounded-2xl bg-gradient-to-br from-[#2563EB] via-[#1D4ED8] to-[#1E40AF] shadow-2xl border border-blue-300/30 overflow-hidden"
                style={{
                  transform: 'rotate(2deg) translate(28px, -22px)',
                  transformOrigin: 'center center',
                  boxShadow: '0 20px 40px -10px rgba(30, 64, 175, 0.35)',
                }}
              >
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-white/20 via-transparent to-transparent pointer-events-none" />
                <div className="p-4 flex flex-col justify-between h-full text-white/90">
                  <div className="flex justify-between items-center">
                    <span className="text-[10px] font-bold tracking-wider">PREMIUM REWARDS</span>
                    <span className="text-[12px] font-black italic">VISA</span>
                  </div>
                </div>
              </div>

              {/* Card 2: Middle Card (Rich Violet / Purple) */}
              <div
                className="absolute w-[280px] sm:w-[330px] h-[172px] sm:h-[202px] rounded-2xl bg-gradient-to-br from-[#7C3AED] via-[#6D28D9] to-[#4C1D95] shadow-2xl border border-purple-400/30 overflow-hidden"
                style={{
                  transform: 'rotate(-5deg) translate(14px, -12px)',
                  transformOrigin: 'center center',
                  boxShadow: '0 25px 45px -10px rgba(109, 40, 217, 0.4)',
                }}
              >
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,_var(--tw-gradient-stops))] from-purple-300/25 via-transparent to-transparent pointer-events-none" />
                <div className="p-4 flex flex-col justify-between h-full text-white/90">
                  <div className="flex justify-between items-center">
                    <div className="w-7 h-5 rounded-sm bg-amber-400/80" />
                    <span className="text-[12px] font-black italic">VISA</span>
                  </div>
                </div>
              </div>

              {/* Card 1: Front Card (Dynamic: Displays Brand card or Admin-selected Card Image) */}
              <div
                key={`front-card-${currentSlide}`}
                className={`relative w-[295px] sm:w-[345px] h-[182px] sm:h-[212px] rounded-2xl shadow-2xl border border-blue-500/30 overflow-hidden group hover:scale-[1.02] transition-all duration-500 ${
                  direction === 'next'
                    ? 'animate-in fade-in slide-in-from-right-12 duration-500'
                    : 'animate-in fade-in slide-in-from-left-12 duration-500'
                }`}
                style={{
                  transform: 'rotate(-13deg) translate(-10px, 0px)',
                  transformOrigin: 'center center',
                  boxShadow: '0 30px 60px -15px rgba(2, 6, 23, 0.6), 0 0 35px rgba(56, 189, 248, 0.25)',
                }}
              >
                {activeCard && activeCard.imageUrl ? (
                  /* Admin-selected Card Real Image */
                  <div className="relative w-full h-full bg-[#0F172A]">
                    <Image
                      src={activeCard.imageUrl}
                      alt={activeCard.title}
                      fill
                      className="object-cover"
                      sizes="350px"
                      priority
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent pointer-events-none" />
                  </div>
                ) : (
                  /* Flagship Obsidian Credit-Mitra Card */
                  <div className="w-full h-full bg-gradient-to-br from-[#0F172A] via-[#09101E] to-[#030712] p-5 flex flex-col justify-between text-white">
                    {/* Surface Sheen */}
                    <div className="absolute -top-1/2 -left-1/2 w-[200%] h-[200%] bg-gradient-to-b from-white/10 via-transparent to-transparent rotate-45 pointer-events-none" />

                    {/* Top Row: Gold EMV Chip & Contactless Waves */}
                    <div className="flex items-center justify-between z-10">
                      <div className="w-10 h-7 rounded bg-gradient-to-br from-amber-200 via-amber-400 to-amber-600 border border-amber-600/50 p-1 flex flex-col justify-between shadow-inner">
                        <div className="w-full h-0.5 bg-amber-800/40" />
                        <div className="w-full h-0.5 bg-amber-800/40" />
                      </div>
                      <div className="flex items-center text-white/80 pr-1">
                        <svg viewBox="0 0 24 24" className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round">
                          <path d="M8.5 16.5a5 5 0 0 1 0-9" />
                          <path d="M12 19a8.5 8.5 0 0 0 0-14" />
                          <path d="M15.5 21.5a12 12 0 0 0 0-19" />
                        </svg>
                      </div>
                    </div>

                    {/* Center: Credit-Mitra Emblem + Typography */}
                    <div className="z-10 flex flex-col items-center justify-center my-auto">
                      <div className="flex items-center gap-2.5">
                        <svg viewBox="0 0 36 36" className="w-9 h-9" fill="none">
                          <defs>
                            <linearGradient id="heroCardLogoGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                              <stop offset="0%" stopColor="#00F0FF" />
                              <stop offset="50%" stopColor="#38BDF8" />
                              <stop offset="100%" stopColor="#2563EB" />
                            </linearGradient>
                          </defs>
                          <path
                            d="M 26 7 A 13 13 0 1 0 26 29 C 30 27 31 23 29 20 C 27 17 23 18 21 20 C 18 23 13 22 11 18 C 9 14 11 10 16 8 C 20 6 24 7 26 7 Z"
                            fill="url(#heroCardLogoGrad)"
                          />
                        </svg>
                        <span className="text-xl sm:text-2xl font-bold tracking-tight text-white drop-shadow-md">
                          Credit-Mitra
                        </span>
                      </div>
                    </div>

                    {/* Bottom Row */}
                    <div className="flex items-end justify-between z-10 text-white/90">
                      <span className="font-mono text-xs text-slate-400 tracking-widest">
                        •••• 8820
                      </span>
                      <span className="text-sm font-black italic tracking-tighter text-white">
                        VISA
                      </span>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Front Arc of Glowing Cyan Orbital Ring */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-20">
              <svg viewBox="0 0 560 320" className="w-[125%] max-w-[620px] h-auto overflow-visible">
                <defs>
                  <linearGradient id="orbitCyanFront" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="25%" stopColor="#00F0FF" stopOpacity="1" />
                    <stop offset="65%" stopColor="#38BDF8" stopOpacity="0.95" />
                    <stop offset="100%" stopColor="#60A5FA" stopOpacity="0.4" />
                  </linearGradient>
                </defs>
                <path
                  d="M 80 190 C 120 270, 360 260, 480 150"
                  stroke="url(#orbitCyanFront)"
                  strokeWidth="3.5"
                  fill="none"
                  className="opacity-95"
                  filter="drop-shadow(0 0 10px #00F0FF)"
                />
              </svg>
            </div>

            {/* Floating Badge 1: Top Left - "Earn Rewards" (2 Lines) */}
            <div
              className="absolute -top-1 left-0 sm:left-2 z-30 bg-white rounded-2xl px-4 py-2.5 shadow-xl border border-slate-100 flex items-center gap-3 hover:scale-105 transition-transform"
            >
              <div className="w-8 h-8 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center flex-shrink-0">
                <Gift size={18} weight="fill" />
              </div>
              <div className="text-left font-bold text-blue-600 text-xs sm:text-sm leading-tight">
                <div>Earn</div>
                <div>Rewards</div>
              </div>
            </div>

            {/* Floating Badge 2: Top Right - "100% Secure & Trusted" (2 Lines) */}
            <div
              className="absolute top-4 right-0 sm:right-2 z-30 bg-white rounded-2xl px-4 py-2.5 shadow-xl border border-slate-100 flex items-center gap-3 hover:scale-105 transition-transform"
            >
              <div className="w-8 h-8 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center flex-shrink-0">
                <ShieldCheck size={20} weight="fill" />
              </div>
              <div className="text-left font-bold text-slate-800 text-xs sm:text-sm leading-tight">
                <div>100% Secure</div>
                <div>&amp; Trusted</div>
              </div>
            </div>

            {/* Floating Badge 3: Bottom Right - "Get the Best Offers" (2 Lines) */}
            <div
              className="absolute bottom-4 right-0 sm:right-2 z-30 bg-white rounded-2xl px-4 py-2.5 shadow-xl border border-slate-100 flex items-center gap-3 hover:scale-105 transition-transform"
            >
              <div className="w-8 h-8 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold text-base flex-shrink-0">
                <CurrencyInr size={16} weight="bold" />
              </div>
              <div className="text-left font-bold text-slate-800 text-xs sm:text-sm leading-tight">
                <div>Get the</div>
                <div>Best Offers</div>
              </div>
            </div>

          </div>
        </div>

        {/* ======================================================== */}
        {/* AUTO-SLIDE CONTROLS (Slide Progress, Pause/Play, Arrows) */}
        {/* ======================================================== */}
        {totalSlides > 1 && (
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mt-8 pt-4 border-t border-slate-200/50">
            {/* Left: Animated Slide Indicators with Progress Bar */}
            <div className="flex items-center gap-2 flex-wrap">
              {Array.from({ length: totalSlides }).map((_, idx) => {
                const isActive = currentSlide === idx;
                return (
                  <button
                    key={idx}
                    onClick={() => selectSlide(idx)}
                    aria-label={`Go to slide ${idx + 1}`}
                    className={`relative h-2.5 rounded-full overflow-hidden transition-all duration-300 ${
                      isActive ? 'w-12 bg-blue-100' : 'w-2.5 bg-slate-300 hover:bg-slate-400'
                    }`}
                  >
                    {isActive && (
                      <span
                        key={`progress-${currentSlide}-${isAutoPlaying}`}
                        className={`absolute inset-0 bg-[#1A56DB] rounded-full ${
                          isAutoPlaying ? 'animate-progress-fill' : 'w-full'
                        }`}
                        style={{
                          animationDuration: `${SLIDE_DURATION}ms`,
                          animationTimingFunction: 'linear',
                          animationFillMode: 'forwards',
                          animationPlayState: isAutoPlaying && !isHovered ? 'running' : 'paused',
                        }}
                      />
                    )}
                  </button>
                );
              })}
              
              <span className="text-xs font-semibold text-slate-500 ml-2">
                Slide {currentSlide + 1} of {totalSlides}:{' '}
                <span className="font-bold text-slate-700">
                  {activeCard ? activeCard.title : 'Platform Overview'}
                </span>
              </span>
            </div>

            {/* Right: Auto-play Toggle & Navigation Buttons */}
            <div className="flex items-center gap-2">
              {/* Play/Pause Auto-Slide Toggle */}
              <button
                type="button"
                onClick={() => setIsAutoPlaying(!isAutoPlaying)}
                aria-label={isAutoPlaying ? 'Pause auto-slide' : 'Resume auto-slide'}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold bg-white border border-slate-200 text-slate-600 hover:text-[#1A56DB] hover:bg-blue-50/50 shadow-sm transition-all"
              >
                {isAutoPlaying ? (
                  <>
                    <Pause size={13} weight="fill" className="text-blue-600" />
                    <span>{isHovered ? 'Hover Paused' : 'Auto-sliding'}</span>
                  </>
                ) : (
                  <>
                    <Play size={13} weight="fill" className="text-slate-500" />
                    <span>Paused</span>
                  </>
                )}
              </button>

              {/* Prev / Next Arrows */}
              <button
                type="button"
                onClick={goToPrevSlide}
                aria-label="Previous slide"
                className="w-9 h-9 rounded-full bg-white hover:bg-blue-50 text-slate-700 hover:text-[#1A56DB] border border-slate-200 shadow-sm flex items-center justify-center transition-all active:scale-95"
              >
                <CaretLeft size={16} weight="bold" />
              </button>
              <button
                type="button"
                onClick={goToNextSlide}
                aria-label="Next slide"
                className="w-9 h-9 rounded-full bg-white hover:bg-blue-50 text-slate-700 hover:text-[#1A56DB] border border-slate-200 shadow-sm flex items-center justify-center transition-all active:scale-95"
              >
                <CaretRight size={16} weight="bold" />
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Video Modal Explainer */}
      {videoModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 animate-in fade-in duration-200">
          <div className="relative w-full max-w-2xl bg-white rounded-3xl p-6 sm:p-8 shadow-2xl border border-slate-100">
            <button
              onClick={() => setVideoModalOpen(false)}
              className="absolute top-4 right-4 p-2 rounded-full text-slate-400 hover:text-slate-800 hover:bg-slate-100 transition-colors"
              aria-label="Close video modal"
            >
              <X size={20} weight="bold" />
            </button>
            <div className="space-y-4">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-full bg-blue-600 text-white flex items-center justify-center">
                  <Play size={14} weight="fill" />
                </div>
                <h3 className="text-xl font-bold text-[#0F172A]">
                  Welcome to Credit-Mitra
                </h3>
              </div>
              <p className="text-sm text-slate-600 leading-relaxed">
                Watch how Credit-Mitra helps you discover, compare, and apply for the right credit card and financial products with 100% verified bank direct portals and transparent terms.
              </p>
              <div className="aspect-video w-full rounded-2xl bg-slate-900 flex flex-col items-center justify-center text-white p-6 text-center space-y-3">
                <div className="w-16 h-16 rounded-full bg-blue-600/90 text-white flex items-center justify-center shadow-lg">
                  <Play size={28} weight="fill" className="ml-1" />
                </div>
                <div>
                  <p className="font-semibold text-base">Credit-Mitra Platform Overview</p>
                  <p className="text-xs text-slate-400">Discover transparent credit guidance in under 2 minutes</p>
                </div>
              </div>
              <div className="flex justify-end pt-2">
                <Link
                  href="/cards"
                  onClick={() => setVideoModalOpen(false)}
                  className="rounded-full bg-blue-600 text-white font-semibold text-sm px-6 py-2.5 hover:bg-blue-700 transition-colors"
                >
                  Explore Cards Now
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
