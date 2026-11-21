'use client';

import React from 'react';
import {
  Sparkle,
  ArrowRight,
  Scales,
  ShieldCheck,
  CurrencyInr,
  Gift,
  Check,
} from '@phosphor-icons/react';

export default function HowCreditMitraWorks() {
  return (
    <section
      aria-label="How Credit-Mitra Works"
      className="relative overflow-hidden py-14 sm:py-20 lg:py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 select-none"
    >
      {/* ======================================================== */}
      {/* 1. AMBIENT BACKGROUND GLOWS (Lavender, Electric Blue, Mint) */}
      {/* ======================================================== */}
      <div
        className="absolute top-1/4 -left-20 w-80 h-80 pointer-events-none -z-10 opacity-50"
        style={{
          background:
            'radial-gradient(circle, rgba(221, 214, 254, 0.6) 0%, rgba(245, 243, 255, 0.2) 50%, transparent 70%)',
        }}
      />
      <div
        className="absolute top-1/3 left-1/2 -translate-x-1/2 w-96 h-96 pointer-events-none -z-10 opacity-40"
        style={{
          background:
            'radial-gradient(circle, rgba(191, 219, 254, 0.5) 0%, rgba(224, 242, 254, 0.2) 50%, transparent 70%)',
        }}
      />
      <div
        className="absolute bottom-10 -right-20 w-80 h-80 pointer-events-none -z-10 opacity-50"
        style={{
          background:
            'radial-gradient(circle, rgba(167, 243, 208, 0.5) 0%, rgba(236, 253, 245, 0.2) 50%, transparent 70%)',
        }}
      />

      {/* ======================================================== */}
      {/* 2. SECTION HEADER */}
      {/* ======================================================== */}
      <div className="text-center max-w-2xl mx-auto mb-14 sm:mb-18 lg:mb-20 space-y-3.5">
        {/* Tri-color Pill Badge (NO BORDERS) */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/95 backdrop-blur-md shadow-md shadow-black/[0.04] text-xs sm:text-sm font-bold text-slate-800">
          <div className="flex items-center -space-x-1">
            <span className="w-2.5 h-2.5 rounded-full bg-[#8B5CF6] ring-2 ring-white" />
            <span className="w-2.5 h-2.5 rounded-full bg-[#1A56DB] ring-2 ring-white" />
            <span className="w-2.5 h-2.5 rounded-full bg-[#10B981] ring-2 ring-white" />
          </div>
          <span className="tracking-wide">How Credit-Mitra Works</span>
        </div>

        {/* Mandatory Heading */}
        <h2 className="text-3xl sm:text-4xl lg:text-[46px] font-black text-[#0B0F17] tracking-tight leading-[1.14]">
          Your journey to a smarter credit choice
        </h2>

        {/* Mandatory Subheading */}
        <p className="text-base sm:text-lg text-slate-500 font-medium max-w-xl mx-auto leading-relaxed">
          Three simple steps. Better financial decisions.
        </p>
      </div>

      {/* ======================================================== */}
      {/* 3. 3-STEP CARDS WITH CONNECTORS (NO BORDERS) */}
      {/* ======================================================== */}
      <div className="relative">
        
        {/* Desktop Curved Dotted Progression Connector Trail */}
        <div className="hidden lg:block absolute top-[140px] left-[16%] right-[16%] h-12 pointer-events-none z-0">
          <svg className="w-full h-full overflow-visible" viewBox="0 0 800 50" fill="none">
            <defs>
              <linearGradient id="connectorGradient2" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#A78BFA" />
                <stop offset="50%" stopColor="#38BDF8" />
                <stop offset="100%" stopColor="#34D399" />
              </linearGradient>
            </defs>
            <path
              d="M 50 25 C 220 5, 280 45, 400 25 C 520 5, 580 45, 750 25"
              stroke="url(#connectorGradient2)"
              strokeWidth="2.5"
              strokeDasharray="6 6"
              strokeLinecap="round"
              className="opacity-80"
            />
            <circle cx="225" cy="18" r="4" fill="#8B5CF6" className="animate-pulse" />
            <circle cx="400" cy="25" r="5" fill="#1A56DB" className="animate-pulse" />
            <circle cx="575" cy="32" r="4" fill="#10B981" className="animate-pulse" />
          </svg>
        </div>

        {/* Grid Container - 3 Columns on Desktop, Vertically Stacked on Mobile/Tablet */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-7 relative z-10">

          {/* ======================================================== */}
          {/* STEP 1: DISCOVER (Lavender) - NO BORDERS */}
          {/* ======================================================== */}
          <div className="group relative rounded-3xl bg-white p-6 sm:p-7 shadow-xl shadow-purple-900/[0.04] hover:shadow-2xl hover:shadow-purple-500/10 transition-all duration-500 hover:-translate-y-2 flex flex-col justify-between overflow-hidden">
            
            {/* Background Watermark Step Number */}
            <span className="absolute -top-3 -right-2 text-7xl sm:text-8xl font-black text-purple-100/50 select-none pointer-events-none transition-transform duration-500 group-hover:scale-105">
              01
            </span>

            {/* Small Floating Shapes */}
            <div className="absolute top-4 right-16 w-2.5 h-2.5 rounded-full bg-purple-300/50 pointer-events-none" />
            <div className="absolute top-12 right-6 w-3 h-3 rounded-full bg-purple-200/50 pointer-events-none" />

            <div>
              {/* Header Pill & Step Number (NO BORDERS) */}
              <div className="flex items-center justify-between mb-5 relative z-10">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-purple-50 text-[#7C3AED] text-xs font-bold uppercase tracking-wider">
                  <Sparkle size={13} weight="fill" className="text-[#8B5CF6]" />
                  <span>Step 01 • Discover</span>
                </span>
                <span className="w-9 h-9 rounded-2xl bg-[#8B5CF6] text-white font-black flex items-center justify-center text-sm shadow-md shadow-purple-500/30">
                  01
                </span>
              </div>

              {/* Visual Illustration (~50% card height, NO BORDERS) */}
              <div className="relative w-full h-52 sm:h-56 rounded-2xl bg-gradient-to-b from-[#F5F3FF] via-[#EDE9FE]/70 to-[#F5F3FF] p-4 flex items-center justify-center overflow-hidden mb-6 group-hover:bg-[#F3E8FF]/60 transition-colors duration-500">
                
                <div className="absolute w-40 h-40 rounded-full bg-purple-200/60 blur-xl pointer-events-none" />

                {/* Floating 3D Credit Cards */}
                <div className="relative w-48 h-32 flex items-center justify-center">
                  
                  {/* Back Card: Soft Lilac */}
                  <div
                    className="absolute w-36 h-22 rounded-xl bg-gradient-to-br from-[#DDD6FE] via-[#C4B5FD] to-[#8B5CF6] shadow-md p-2.5 flex flex-col justify-between text-white/90 transform rotate-12 translate-x-4 -translate-y-2 transition-transform duration-500 group-hover:rotate-16 group-hover:translate-x-6"
                    style={{
                      boxShadow: '0 10px 25px -5px rgba(139, 92, 246, 0.25)',
                    }}
                  >
                    <div className="flex justify-between items-center">
                      <div className="w-5 h-3.5 rounded bg-amber-300/80" />
                      <span className="text-[9px] font-black italic">VISA</span>
                    </div>
                    <span className="text-[8px] font-mono tracking-widest text-white/80">•••• 4120</span>
                  </div>

                  {/* Front Card: Deep Obsidian Violet */}
                  <div
                    className="relative w-40 h-24 rounded-xl bg-gradient-to-br from-[#1E1B4B] via-[#2E1065] to-[#4C1D95] shadow-xl p-3 flex flex-col justify-between text-white transform -rotate-6 -translate-x-2 transition-transform duration-500 group-hover:-rotate-8 group-hover:-translate-x-3"
                    style={{
                      boxShadow: '0 15px 30px -8px rgba(46, 16, 101, 0.45)',
                    }}
                  >
                    <div className="flex justify-between items-center">
                      <div className="w-6 h-4 rounded bg-gradient-to-br from-amber-200 to-amber-500 p-0.5 flex flex-col justify-around">
                        <div className="w-full h-px bg-amber-800/40" />
                        <div className="w-full h-px bg-amber-800/40" />
                      </div>
                      <span className="text-[9px] font-bold tracking-wider text-purple-200">REWARDS</span>
                    </div>
                    <div className="flex justify-between items-end">
                      <span className="text-[9px] font-mono tracking-wider text-purple-200">•••• 9842</span>
                      <span className="text-[10px] font-black italic text-white">VISA</span>
                    </div>
                  </div>

                  {/* 3D Magnifying Glass */}
                  <div className="absolute -bottom-2 -right-1 z-20 transition-transform duration-500 group-hover:scale-110 group-hover:rotate-6">
                    <div className="relative w-20 h-20 flex items-center justify-center">
                      <div className="absolute inset-2 rounded-full bg-purple-400/20 blur-md pointer-events-none" />
                      
                      <svg viewBox="0 0 80 80" className="w-20 h-20 drop-shadow-xl overflow-visible">
                        <defs>
                          <linearGradient id="lensGlass2" x1="0%" y1="0%" x2="100%" y2="100%">
                            <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.8" />
                            <stop offset="50%" stopColor="#C4B5FD" stopOpacity="0.3" />
                            <stop offset="100%" stopColor="#8B5CF6" stopOpacity="0.6" />
                          </linearGradient>
                          <linearGradient id="rimMetal2" x1="0%" y1="0%" x2="100%" y2="100%">
                            <stop offset="0%" stopColor="#E9D5FF" />
                            <stop offset="50%" stopColor="#A855F7" />
                            <stop offset="100%" stopColor="#6B21A8" />
                          </linearGradient>
                        </defs>
                        <circle cx="34" cy="34" r="22" fill="url(#lensGlass2)" stroke="url(#rimMetal2)" strokeWidth="3.5" />
                        <path d="M 22 22 A 16 16 0 0 1 44 20" stroke="#FFFFFF" strokeWidth="2.5" strokeLinecap="round" fill="none" opacity="0.85" />
                        <rect x="48" y="48" width="8" height="24" rx="4" transform="rotate(-45 48 48)" fill="#581C87" />
                        <circle cx="34" cy="34" r="5" fill="#8B5CF6" opacity="0.9" />
                        <path d="M 34 26 L 34 42 M 26 34 L 42 34" stroke="#FFFFFF" strokeWidth="1.5" strokeLinecap="round" />
                      </svg>

                      {/* Focused Feature Chip */}
                      <span className="absolute -top-1 right-2 px-2.5 py-0.5 rounded-full bg-white text-[10px] font-bold text-[#6D28D9] shadow-md whitespace-nowrap">
                        5% Cashback
                      </span>
                    </div>
                  </div>

                </div>

                <span className="absolute bottom-3 left-4 text-purple-400 font-bold text-xs animate-bounce">✦</span>
                <span className="absolute top-3 left-6 text-purple-300 font-bold text-sm">✦</span>
              </div>

              {/* Title & Description */}
              <div className="space-y-2">
                <h3 className="text-xl sm:text-[22px] font-black text-[#0B0F17] tracking-tight group-hover:text-[#7C3AED] transition-colors">
                  Find what fits you.
                </h3>
                <p className="text-sm text-slate-600 leading-relaxed font-normal">
                  Explore credit cards and financial products designed around your needs and lifestyle.
                </p>
              </div>
            </div>

            {/* Bottom Subtle Indicator Link */}
            <div className="pt-5 mt-4 flex items-center justify-between text-xs font-bold text-[#7C3AED]">
              <span className="uppercase tracking-wider">Explore Options</span>
              <div className="w-8 h-8 rounded-full bg-purple-50 group-hover:bg-[#8B5CF6] group-hover:text-white flex items-center justify-center transition-colors shadow-xs">
                <ArrowRight size={13} weight="bold" />
              </div>
            </div>
          </div>

          {/* ======================================================== */}
          {/* STEP 2: COMPARE (Electric Blue) - NO BORDERS */}
          {/* ======================================================== */}
          <div className="group relative rounded-3xl bg-white p-6 sm:p-7 shadow-xl shadow-blue-900/[0.04] hover:shadow-2xl hover:shadow-blue-500/10 transition-all duration-500 hover:-translate-y-2 flex flex-col justify-between overflow-hidden">
            
            {/* Background Watermark Step Number */}
            <span className="absolute -top-3 -right-2 text-7xl sm:text-8xl font-black text-blue-100/50 select-none pointer-events-none transition-transform duration-500 group-hover:scale-105">
              02
            </span>

            {/* Small Floating Shapes */}
            <div className="absolute top-4 right-16 w-2.5 h-2.5 rounded-full bg-blue-300/50 pointer-events-none" />
            <div className="absolute top-12 right-6 w-3 h-3 rounded-full bg-blue-200/50 pointer-events-none" />

            <div>
              {/* Header Pill & Step Number (NO BORDERS) */}
              <div className="flex items-center justify-between mb-5 relative z-10">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-50 text-[#1A56DB] text-xs font-bold uppercase tracking-wider">
                  <Scales size={13} weight="bold" className="text-[#1A56DB]" />
                  <span>Step 02 • Compare</span>
                </span>
                <span className="w-9 h-9 rounded-2xl bg-[#1A56DB] text-white font-black flex items-center justify-center text-sm shadow-md shadow-blue-500/30">
                  02
                </span>
              </div>

              {/* Visual Illustration (~50% card height, NO BORDERS) */}
              <div className="relative w-full h-52 sm:h-56 rounded-2xl bg-gradient-to-b from-[#EFF6FF] via-[#DBEAFE]/60 to-[#EFF6FF] p-4 flex items-center justify-center overflow-hidden mb-6 group-hover:bg-[#DBEAFE]/50 transition-colors duration-500">
                
                <div className="absolute w-44 h-44 rounded-full bg-blue-200/60 blur-xl pointer-events-none" />

                {/* Two Credit Cards Side-by-Side */}
                <div className="relative w-52 h-32 flex items-center justify-center">
                  
                  {/* Left Card: Royal Blue */}
                  <div
                    className="absolute w-28 sm:w-30 h-20 rounded-xl bg-gradient-to-br from-[#1E40AF] via-[#1D4ED8] to-[#2563EB] shadow-md p-2 flex flex-col justify-between text-white/95 transform -translate-x-12 -rotate-3 transition-transform duration-500 group-hover:-translate-x-14 group-hover:-rotate-6"
                    style={{
                      boxShadow: '0 12px 24px -6px rgba(30, 64, 175, 0.35)',
                    }}
                  >
                    <div className="flex justify-between items-center">
                      <div className="w-4 h-3 rounded bg-amber-300/80" />
                      <span className="text-[8px] font-black italic">VISA</span>
                    </div>
                    <div>
                      <span className="text-[8px] font-bold block text-blue-100">MILLENNIA</span>
                      <span className="text-[7.5px] font-mono text-blue-200">₹0 Renewal</span>
                    </div>
                  </div>

                  {/* Right Card: Electric Cyan/Blue */}
                  <div
                    className="absolute w-28 sm:w-30 h-20 rounded-xl bg-gradient-to-br from-[#0284C7] via-[#0EA5E9] to-[#00F0FF] shadow-md p-2 flex flex-col justify-between text-white transform translate-x-12 rotate-3 transition-transform duration-500 group-hover:translate-x-14 group-hover:rotate-6"
                    style={{
                      boxShadow: '0 12px 24px -6px rgba(2, 132, 199, 0.35)',
                    }}
                  >
                    <div className="flex justify-between items-center">
                      <div className="w-4 h-3 rounded bg-amber-300/80" />
                      <span className="text-[8px] font-black italic">RUPAY</span>
                    </div>
                    <div>
                      <span className="text-[8px] font-bold block text-white drop-shadow">SIMPLYSAVE</span>
                      <span className="text-[7.5px] font-mono text-cyan-100">10X Rewards</span>
                    </div>
                  </div>

                  {/* Center Floating "VS" Comparison Pill */}
                  <div className="relative z-20 w-11 h-11 rounded-full bg-white text-[#1A56DB] font-black text-xs flex items-center justify-center shadow-xl group-hover:scale-110 transition-transform duration-500">
                    <span>VS</span>
                  </div>

                  {/* Floating Comparison Metric Chips */}
                  <div className="absolute -top-1 left-2 z-20 px-2.5 py-0.5 rounded-full bg-white text-[9.5px] font-bold text-blue-700 shadow-md flex items-center gap-1">
                    <Gift size={11} weight="fill" className="text-blue-600" />
                    <span>Lounge Perks</span>
                  </div>

                  <div className="absolute -bottom-2 right-2 z-20 px-2.5 py-0.5 rounded-full bg-white text-[9.5px] font-bold text-blue-700 shadow-md flex items-center gap-1">
                    <CurrencyInr size={11} weight="bold" className="text-blue-600" />
                    <span>₹0 Fees</span>
                  </div>

                </div>

                <span className="absolute top-3 right-6 text-cyan-500 font-bold text-xs animate-pulse">✦</span>
                <span className="absolute bottom-3 left-6 text-blue-400 font-bold text-sm">✦</span>
              </div>

              {/* Title & Description */}
              <div className="space-y-2">
                <h3 className="text-xl sm:text-[22px] font-black text-[#0B0F17] tracking-tight group-hover:text-[#1A56DB] transition-colors">
                  Make the smarter choice.
                </h3>
                <p className="text-sm text-slate-600 leading-relaxed font-normal">
                  Compare rewards, fees, benefits, and features in one place.
                </p>
              </div>
            </div>

            {/* Bottom Subtle Indicator Link */}
            <div className="pt-5 mt-4 flex items-center justify-between text-xs font-bold text-[#1A56DB]">
              <span className="uppercase tracking-wider">Side-by-Side Review</span>
              <div className="w-8 h-8 rounded-full bg-blue-50 group-hover:bg-[#1A56DB] group-hover:text-white flex items-center justify-center transition-colors shadow-xs">
                <ArrowRight size={13} weight="bold" />
              </div>
            </div>
          </div>

          {/* ======================================================== */}
          {/* STEP 3: APPLY (Mint Green) - NO BORDERS */}
          {/* ======================================================== */}
          <div className="group relative rounded-3xl bg-white p-6 sm:p-7 shadow-xl shadow-emerald-900/[0.04] hover:shadow-2xl hover:shadow-emerald-500/10 transition-all duration-500 hover:-translate-y-2 flex flex-col justify-between overflow-hidden">
            
            {/* Background Watermark Step Number */}
            <span className="absolute -top-3 -right-2 text-7xl sm:text-8xl font-black text-emerald-100/50 select-none pointer-events-none transition-transform duration-500 group-hover:scale-105">
              03
            </span>

            {/* Small Floating Shapes */}
            <div className="absolute top-4 right-16 w-2.5 h-2.5 rounded-full bg-emerald-300/50 pointer-events-none" />
            <div className="absolute top-12 right-6 w-3 h-3 rounded-full bg-emerald-200/50 pointer-events-none" />

            <div>
              {/* Header Pill & Step Number (NO BORDERS) */}
              <div className="flex items-center justify-between mb-5 relative z-10">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 text-[#059669] text-xs font-bold uppercase tracking-wider">
                  <ShieldCheck size={14} weight="fill" className="text-[#10B981]" />
                  <span>Step 03 • Apply</span>
                </span>
                <span className="w-9 h-9 rounded-2xl bg-[#10B981] text-white font-black flex items-center justify-center text-sm shadow-md shadow-emerald-500/30">
                  03
                </span>
              </div>

              {/* Visual Illustration (~50% card height, NO BORDERS) */}
              <div className="relative w-full h-52 sm:h-56 rounded-2xl bg-gradient-to-b from-[#ECFDF5] via-[#D1FAE5]/60 to-[#ECFDF5] p-4 flex items-center justify-center overflow-hidden mb-6 group-hover:bg-[#A7F3D0]/40 transition-colors duration-500">
                
                <div className="absolute w-44 h-44 rounded-full bg-emerald-200/60 blur-xl pointer-events-none" />

                {/* Smartphone + 3D Checkmark */}
                <div className="relative w-48 h-36 flex items-center justify-center">
                  
                  {/* Smartphone Mockup */}
                  <div
                    className="relative w-32 h-44 rounded-[22px] bg-slate-900 shadow-2xl p-1.5 flex flex-col justify-between overflow-hidden transform -rotate-3 transition-transform duration-500 group-hover:rotate-0"
                    style={{
                      boxShadow: '0 20px 35px -8px rgba(15, 23, 42, 0.35)',
                    }}
                  >
                    <div className="w-10 h-2.5 rounded-full bg-slate-800 mx-auto mt-0.5 flex items-center justify-center">
                      <div className="w-1.5 h-1.5 rounded-full bg-slate-700" />
                    </div>

                    <div className="w-full flex-1 bg-white rounded-[16px] p-2 flex flex-col justify-between mt-1 text-slate-800">
                      <div className="flex items-center justify-between pb-1">
                        <span className="text-[7.5px] font-bold text-slate-600">Bank KYC Portal</span>
                        <div className="w-2 h-2 rounded-full bg-emerald-500" />
                      </div>

                      <div className="w-full h-11 rounded-lg bg-gradient-to-r from-emerald-600 to-teal-700 p-1 flex flex-col justify-between text-white shadow-sm my-0.5">
                        <span className="text-[6.5px] font-bold">PRE-APPROVED</span>
                        <span className="text-[6.5px] font-mono">•••• 8820</span>
                      </div>

                      <div className="space-y-1">
                        <div className="flex justify-between text-[7px] font-bold text-emerald-700">
                          <span>KYC Verified</span>
                          <span>100%</span>
                        </div>
                        <div className="w-full h-1.5 rounded-full bg-emerald-100 overflow-hidden">
                          <div className="w-full h-full bg-emerald-500 rounded-full" />
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* 3D Floating Mint Checkmark Badge */}
                  <div
                    className="absolute -bottom-2 -right-1 z-20 w-14 h-14 rounded-2xl bg-gradient-to-br from-[#34D399] via-[#10B981] to-[#059669] text-white flex items-center justify-center transition-transform duration-500 group-hover:scale-115 group-hover:-translate-y-1"
                    style={{
                      boxShadow: '0 12px 25px -4px rgba(16, 185, 129, 0.45)',
                    }}
                  >
                    <Check size={26} weight="bold" className="drop-shadow" />
                  </div>

                  {/* Floating Security Pill */}
                  <div className="absolute -top-1 -left-2 z-20 px-2.5 py-1 rounded-full bg-white text-[9.5px] font-bold text-emerald-800 shadow-md flex items-center gap-1">
                    <ShieldCheck size={12} weight="fill" className="text-emerald-600" />
                    <span>Official Portal</span>
                  </div>

                </div>

                <span className="absolute bottom-3 right-5 text-emerald-500 font-bold text-xs animate-bounce">✦</span>
                <span className="absolute top-3 left-5 text-emerald-400 font-bold text-sm">✦</span>
              </div>

              {/* Title & Description */}
              <div className="space-y-2">
                <h3 className="text-xl sm:text-[22px] font-black text-[#0B0F17] tracking-tight group-hover:text-[#059669] transition-colors">
                  You&apos;re one step closer.
                </h3>
                <p className="text-sm text-slate-600 leading-relaxed font-normal">
                  Choose your preferred product and continue to the provider&apos;s application process.
                </p>
              </div>
            </div>

            {/* Bottom Subtle Indicator Link */}
            <div className="pt-5 mt-4 flex items-center justify-between text-xs font-bold text-[#059669]">
              <span className="uppercase tracking-wider">Fast Direct KYC</span>
              <div className="w-8 h-8 rounded-full bg-emerald-50 group-hover:bg-[#10B981] group-hover:text-white flex items-center justify-center transition-colors shadow-xs">
                <ArrowRight size={13} weight="bold" />
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* ======================================================== */}
      {/* 4. BOTTOM TRUST REASSURANCE STRIP (NO BORDERS) */}
      {/* ======================================================== */}
      <div className="mt-12 sm:mt-16 text-center">
        <div className="inline-flex flex-wrap items-center justify-center gap-6 sm:gap-10 py-4 px-8 rounded-2xl bg-white/95 backdrop-blur-md shadow-lg shadow-black/[0.03] text-xs sm:text-sm text-slate-700 font-bold">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-[#8B5CF6]" />
            <span>Zero document upload on Credit-Mitra</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-[#1A56DB]" />
            <span>Side-by-side transparent fee evaluation</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-[#10B981]" />
            <span>Official 256-bit encrypted bank portals</span>
          </div>
        </div>
      </div>
    </section>
  );
}
