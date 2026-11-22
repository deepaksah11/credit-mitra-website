'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import {
  ArrowRight,
  Sparkle,
  ArrowSquareOut,
  CaretLeft,
  CaretRight,
  Check,
} from '@phosphor-icons/react';
import { Card } from '@/types/card';
import { formatCurrency } from '@/lib/utils';
import { API_BASE_URL } from '@/lib/api';

interface HeroSectionProps {
  heroCards?: Card[];
}

export default function HeroSection({ heroCards = [] }: HeroSectionProps) {
  const [currentSlide, setCurrentSlide] = useState(0);

  // Total slides: Slide 0 is the Flagship Reference Design, followed by any admin-featured hero cards
  const totalSlides = 1 + heroCards.length;
  const activeCard: Card | null = currentSlide > 0 ? heroCards[currentSlide - 1] : null;

  return (
    <section
      className="relative overflow-hidden pt-4 pb-4 md:pt-8 md:pb-6 select-none bg-[#FAF7F2] group/hero"
      aria-label="Hero Section"
    >
      {/* ======================================================== */}
      {/* 1. SOFT AMBIENT GRADIENT GLOWS */}
      {/* ======================================================== */}
      {/* Soft peach blush glow on bottom-left */}
      <div
        className="absolute -bottom-10 -left-10 w-[500px] h-[500px] pointer-events-none -z-10 opacity-70"
        style={{
          background:
            'radial-gradient(circle at 20% 80%, rgba(254, 215, 226, 0.6) 0%, rgba(254, 226, 226, 0.2) 50%, transparent 70%)',
        }}
      />
      {/* Warm champagne golden peach glow in top-right */}
      <div
        className="absolute -top-20 right-0 w-[650px] h-[650px] pointer-events-none -z-10 opacity-75"
        style={{
          background:
            'radial-gradient(circle at 75% 25%, rgba(254, 240, 138, 0.5) 0%, rgba(253, 230, 138, 0.25) 45%, transparent 70%)',
        }}
      />
      {/* Soft rose ambient tint behind cards */}
      <div
        className="absolute top-1/4 right-[10%] w-[450px] h-[450px] pointer-events-none -z-10 opacity-60"
        style={{
          background:
            'radial-gradient(circle at 50% 50%, rgba(254, 215, 215, 0.5) 0%, transparent 65%)',
        }}
      />

      {/* ======================================================== */}
      {/* 2. MAIN HERO CONTAINER (Restricted to max-w-7xl so it stays centered on Ultrawide screens) */}
      {/* ======================================================== */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* ======================================================== */}
        {/* PARABOLIC GOLDEN RIBBON: Positioned inside container so it NEVER drifts on wide monitors */}
        {/* ======================================================== */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden -z-0">
          <svg
            viewBox="0 0 1280 760"
            className="w-full h-full object-cover"
            fill="none"
            preserveAspectRatio="xMidYMid meet"
          >
            <defs>
              <linearGradient id="ribbonParabolicGrad" x1="40%" y1="0%" x2="90%" y2="100%">
                <stop offset="0%" stopColor="#FEF08A" stopOpacity="0.85" />
                <stop offset="35%" stopColor="#FDE68A" stopOpacity="0.8" />
                <stop offset="70%" stopColor="#FDBA74" stopOpacity="0.7" />
                <stop offset="100%" stopColor="#FED7AA" stopOpacity="0.5" />
              </linearGradient>
              <filter id="ribbonGlowFilter" x="-20%" y="-20%" width="140%" height="140%">
                <feDropShadow dx="0" dy="16" stdDeviation="22" floodColor="#F59E0B" floodOpacity="0.22" />
              </filter>
            </defs>

            {/* Graceful parabolic ribbon swooping directly behind 3D cards towards bottom-right stamp */}
            <path
              d="M 720 -50 C 640 60, 560 180, 610 320 C 660 460, 800 520, 930 450 C 1070 380, 1120 220, 1020 120 C 910 20, 770 100, 810 260 C 850 420, 980 540, 1040 760"
              stroke="url(#ribbonParabolicGrad)"
              strokeWidth="76"
              strokeLinecap="round"
              filter="url(#ribbonGlowFilter)"
              className="opacity-75"
            />
          </svg>
        </div>

        {/* ======================================================== */}
        {/* TOP SECTION: Headline (Left) & 3D Stacked Cards (Right) */}
        {/* ======================================================== */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center min-h-[440px] sm:min-h-[480px]">
          
          {/* LEFT: 100% Secured + Headline + Get Started Now Button + Star */}
          <div className="lg:col-span-6 space-y-6 text-left flex flex-col justify-center relative z-10">
            {currentSlide === 0 ? (
              /* SLIDE 0: EXACT REFERENCE FINTECH DESIGN */
              <div className="space-y-6 animate-in fade-in duration-300">
                {/* 100% SECURED Pill Badge (No Borders) */}
                <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white text-[11px] font-bold tracking-widest text-[#0B0F17] uppercase shadow-sm">
                  <span>100% SECURED</span>
                </div>

                {/* Main Headline matching reference typography */}
                <h1 className="text-4xl sm:text-5xl lg:text-[62px] xl:text-[68px] font-black tracking-tight leading-[1.08] text-[#0B0F17]">
                  Digital banking
                  <br />
                  made for{' '}
                  {/* Colorful Soft Gradient Pill inside headline */}
                  <span className="inline-flex items-center align-middle relative mx-2 w-24 sm:w-28 h-8 sm:h-11 rounded-full overflow-hidden shadow-sm bg-gradient-to-r from-[#38BDF8] via-[#F59E0B] to-[#EA580C] p-0.5">
                    <span className="w-full h-full rounded-full bg-gradient-to-r from-[#38BDF8]/90 via-[#FB923C] to-[#F97316] blur-[2px]" />
                  </span>
                  <br />
                  Digital works.
                </h1>

                {/* Black GET STARTED NOW Pill Button */}
                <div className="pt-2">
                  <Link
                    href="/cards"
                    className="inline-flex items-center justify-center rounded-full bg-[#0B0F17] hover:bg-black active:scale-95 text-white font-bold text-xs sm:text-sm tracking-widest px-8 sm:px-9 py-4 shadow-xl hover:shadow-2xl transition-all uppercase"
                  >
                    <span>GET STARTED NOW</span>
                  </Link>
                </div>

                {/* Black 4-Point Star Sparkle matching reference */}
                <div className="pt-1">
                  <svg viewBox="0 0 32 32" className="w-8 h-8 fill-[#0B0F17] drop-shadow-sm">
                    <path d="M16 0 C16 9 23 16 32 16 C23 16 16 23 16 32 C16 23 9 16 0 16 C9 16 16 9 16 0 Z" />
                  </svg>
                </div>
              </div>
            ) : activeCard ? (
              /* SLIDE 1..N: ADMIN FEATURED PRODUCT SLIDE */
              <div className="space-y-5 animate-in fade-in duration-300">
                <div className="flex items-center gap-2.5 flex-wrap">
                  <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#FDE4CE] text-[#9A3412] text-xs sm:text-sm font-bold shadow-sm">
                    <Sparkle size={15} weight="fill" className="text-[#9A3412] flex-shrink-0" />
                    <span>{activeCard.heroTag || '⚡ Featured Card'}</span>
                  </div>
                  <span className="px-3 py-1 rounded-full text-xs font-semibold bg-white text-slate-800 shadow-sm">
                    {activeCard.bankName}
                  </span>
                </div>

                <h2 className="text-3xl sm:text-4xl lg:text-[48px] font-black tracking-tight leading-[1.12] text-[#0B0F17]">
                  {activeCard.title}
                </h2>

                <p className="text-xs sm:text-sm text-slate-600 font-medium">
                  Joining Fee: {formatCurrency(activeCard.joiningFee)} • Annual Fee: {formatCurrency(activeCard.annualFee)}
                </p>

                <div className="p-4 sm:p-5 rounded-2xl bg-white shadow-xl shadow-black/[0.03] space-y-2 max-w-xl">
                  {(activeCard.heroSpecialFeatures && activeCard.heroSpecialFeatures.length > 0
                    ? activeCard.heroSpecialFeatures
                    : activeCard.benefits.slice(0, 3)
                  ).map((feature, idx) => (
                    <div key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-700 font-medium">
                      <div className="w-4 h-4 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center flex-shrink-0 mt-0.5">
                        <Check size={11} weight="bold" />
                      </div>
                      <span className="leading-snug">{feature}</span>
                    </div>
                  ))}
                </div>

                <div className="flex flex-wrap items-center gap-3 pt-2">
                  <a
                    href={activeCard.referralUrl || '#'}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="rounded-full bg-[#0B0F17] hover:bg-black active:scale-95 text-white font-bold px-8 py-3.5 text-xs sm:text-sm tracking-wider uppercase shadow-xl transition-all inline-flex items-center gap-2"
                  >
                    <span>Apply Now</span>
                    <ArrowSquareOut size={16} weight="bold" />
                  </a>
                  <Link
                    href={`/cards/${activeCard.slug}`}
                    className="rounded-full bg-white hover:bg-[#F5F2EB] text-[#0B0F17] px-6 py-3.5 text-xs sm:text-sm font-bold transition-all shadow-md hover:shadow-lg"
                  >
                    View Details
                  </Link>
                </div>
              </div>
            ) : null}
          </div>

          {/* RIGHT: 3D Stacked Credit Cards */}
          <div className="lg:col-span-6 relative flex items-center justify-center min-h-[420px] sm:min-h-[480px] z-10">
            <div className="relative w-[320px] sm:w-[380px] md:w-[420px] h-[240px] sm:h-[270px] flex items-center justify-center">
              
              {/* BACK CARD: Crimson Red (No Border) */}
              <div
                className="absolute w-[290px] sm:w-[340px] md:w-[370px] h-[180px] sm:h-[210px] md:h-[225px] rounded-2xl bg-gradient-to-br from-[#E11D48] via-[#BE123C] to-[#4C0519] overflow-hidden text-white/95 p-4 flex flex-col justify-between"
                style={{
                  transform: 'rotate(-16deg) translate(-22px, -18px)',
                  transformOrigin: 'center center',
                  boxShadow: '0 25px 45px -10px rgba(76, 5, 25, 0.45)',
                }}
              >
                <div className="absolute inset-0 bg-gradient-to-b from-white/15 via-transparent to-transparent pointer-events-none" />

                <div className="flex justify-between items-center z-10">
                  <span className="text-[10px] font-bold tracking-wider text-rose-200">WORLD ELITE</span>
                </div>

                <div className="flex justify-between items-end z-10">
                  <span className="text-[10px] font-mono tracking-widest text-rose-200">KARTIK BANSAL</span>
                  <div className="flex items-center -space-x-2">
                    <div className="w-6 h-6 rounded-full bg-[#EB001B] opacity-90 shadow-sm" />
                    <div className="w-6 h-6 rounded-full bg-[#F79E1B] opacity-90 shadow-sm" />
                  </div>
                </div>
              </div>

              {/* FRONT CARD: Aurora Gradient Mesh (No Border) */}
              <div
                className="relative w-[305px] sm:w-[355px] md:w-[385px] h-[190px] sm:h-[220px] md:h-[235px] rounded-2xl overflow-hidden p-5 flex flex-col justify-between text-white group/front hover:scale-105 transition-all duration-500"
                style={{
                  transform: 'rotate(-4deg) translate(8px, 6px)',
                  transformOrigin: 'center center',
                  background:
                    'radial-gradient(circle at 10% 20%, #6366F1 0%, transparent 45%), radial-gradient(circle at 90% 15%, #38BDF8 0%, transparent 55%), radial-gradient(circle at 85% 85%, #34D399 0%, transparent 45%), radial-gradient(circle at 20% 90%, #A855F7 0%, transparent 50%), linear-gradient(135deg, #2563EB 0%, #1D4ED8 50%, #0284C7 100%)',
                  boxShadow:
                    '0 30px 60px -15px rgba(37, 99, 235, 0.45), 0 20px 35px -10px rgba(0, 0, 0, 0.28)',
                }}
              >
                <div className="absolute -top-1/2 -left-1/2 w-[200%] h-[200%] bg-gradient-to-b from-white/20 via-transparent to-transparent rotate-45 pointer-events-none" />

                {/* Top Row: VISA Wordmark + Waves */}
                <div className="flex items-center justify-between z-10">
                  <span className="text-xl sm:text-2xl font-black italic tracking-tighter text-white drop-shadow-md">
                    VISA
                  </span>
                  <div className="flex items-center text-white/90 pr-1">
                    <svg viewBox="0 0 24 24" className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round">
                      <path d="M8.5 16.5a5 5 0 0 1 0-9" />
                      <path d="M12 19a8.5 8.5 0 0 0 0-14" />
                      <path d="M15.5 21.5a12 12 0 0 0 0-19" />
                    </svg>
                  </div>
                </div>

                {/* Middle Row: Spaced Card Number */}
                <div className="z-10 my-auto text-center sm:text-left">
                  <span className="font-mono text-sm sm:text-base md:text-lg font-bold tracking-[0.2em] text-white/95 drop-shadow">
                    1234  5678  9000  0000
                  </span>
                </div>

                {/* Bottom Row: Name + Expiry + Circles */}
                <div className="flex items-end justify-between z-10">
                  <div className="flex items-center gap-3 text-white/95">
                    <span className="text-[10px] sm:text-xs font-bold tracking-widest uppercase">
                      KARTIK BANSAL
                    </span>
                    <span className="text-[10px] sm:text-xs font-medium text-white/80">
                      05 / 24
                    </span>
                  </div>

                  <div className="flex items-center -space-x-2">
                    <div className="w-6 h-6 rounded-full bg-white opacity-95 shadow-sm" />
                    <div className="w-6 h-6 rounded-full bg-white/50 shadow-sm" />
                  </div>
                </div>
              </div>

            </div>
          </div>

        </div>

        {/* ======================================================== */}
        {/* BOTTOM ROW: Manifesto (Left) + 232K+ Box (Center) + Rotating Stamp (Right) */}
        {/* NO BORDERS, NO HORIZONTAL LINE: Matches reference image completely */}
        {/* ======================================================== */}
        <div className="mt-8 sm:mt-12 pt-4 grid grid-cols-1 md:grid-cols-12 gap-8 items-end relative z-10">
          
          {/* Left: Manifesto Copy */}
          <div className="md:col-span-5 max-w-sm space-y-3">
            <div className="w-12 h-[3px] bg-[#0B0F17] rounded-full" />
            <p className="text-xs sm:text-sm text-slate-700 font-medium leading-relaxed">
              Money should be easy. It&apos;s time to say goodbye to banks &amp; financial services companies that don&apos;t work for you.
            </p>
          </div>

          {/* Center: "232K+ Customers" Biscuit Box */}
          <div className="md:col-span-4 flex justify-start md:justify-center">
            <div className="rounded-3xl bg-[#FDE4CE] p-6 sm:p-7 shadow-xl shadow-orange-950/[0.04] space-y-3 w-full sm:w-auto min-w-[240px]">
              <div>
                <span className="text-3xl sm:text-4xl font-black text-[#0B0F17]">232</span>
                <span className="text-3xl sm:text-4xl font-black text-[#1A56DB]">K+</span>
                <p className="text-sm sm:text-base font-bold text-slate-800 mt-0.5">Customers</p>
              </div>

              {/* Overlapping Avatars */}
              <div className="flex items-center -space-x-2.5 pt-1">
                <div className="w-9 h-9 rounded-full ring-2 ring-white overflow-hidden bg-slate-300 relative shadow-sm">
                  <Image
                    src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=120&h=120&q=80"
                    alt="Customer 1"
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="w-9 h-9 rounded-full ring-2 ring-white overflow-hidden bg-slate-400 relative shadow-sm">
                  <Image
                    src="https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=120&h=120&q=80"
                    alt="Customer 2"
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="w-9 h-9 rounded-full ring-2 ring-white overflow-hidden bg-slate-500 relative shadow-sm">
                  <Image
                    src="https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&w=120&h=120&q=80"
                    alt="Customer 3"
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="w-9 h-9 rounded-full ring-2 ring-white overflow-hidden bg-slate-600 relative shadow-sm">
                  <Image
                    src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=120&h=120&q=80"
                    alt="Customer 4"
                    fill
                    className="object-cover"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Right: Circular Rotating Stamp */}
          <div className="md:col-span-3 flex justify-start md:justify-end items-center">
            <Link
              href="/cards"
              aria-label="Get Started Now"
              className="relative w-28 h-28 sm:w-32 sm:h-32 flex items-center justify-center group/stamp cursor-pointer transition-transform hover:scale-105 active:scale-95"
            >
              {/* Rotating Circular Text SVG */}
              <svg viewBox="0 0 120 120" className="w-28 h-28 sm:w-32 sm:h-32 animate-spin-slow">
                <defs>
                  <path
                    id="circlePathHero"
                    d="M 60, 60 m -46, 0 a 46,46 0 1,1 92,0 a 46,46 0 1,1 -92,0"
                  />
                </defs>
                <text className="text-[10.5px] font-black uppercase tracking-[0.24em] fill-[#0B0F17]">
                  <textPath href="#circlePathHero" startOffset="0%">
                    • GET STARTED NOW • GET STARTED NOW
                  </textPath>
                </text>
              </svg>

              {/* Center Clean Arrow */}
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                <ArrowRight size={22} weight="bold" className="text-[#0B0F17] group-hover/stamp:translate-x-1 transition-transform" />
              </div>
            </Link>
          </div>

        </div>

        {/* Carousel slide controls (clean & subtle on top-right if extra slides exist) */}
        {totalSlides > 1 && (
          <div className="absolute top-0 right-4 sm:right-6 flex items-center gap-2 opacity-0 group-hover/hero:opacity-100 transition-opacity duration-300">
            <button
              onClick={() => setCurrentSlide((prev) => (prev - 1 + totalSlides) % totalSlides)}
              aria-label="Previous slide"
              className="w-7 h-7 rounded-full bg-white hover:bg-slate-100 shadow-md flex items-center justify-center text-slate-700 transition-all"
            >
              <CaretLeft size={13} weight="bold" />
            </button>
            <span className="text-[11px] font-bold text-slate-600 bg-white/80 px-2 py-0.5 rounded-full shadow-xs">
              {currentSlide + 1}/{totalSlides}
            </span>
            <button
              onClick={() => setCurrentSlide((prev) => (prev + 1) % totalSlides)}
              aria-label="Next slide"
              className="w-7 h-7 rounded-full bg-white hover:bg-slate-100 shadow-md flex items-center justify-center text-slate-700 transition-all"
            >
              <CaretRight size={13} weight="bold" />
            </button>
          </div>
        )}

      </div>
    </section>
  );
}
