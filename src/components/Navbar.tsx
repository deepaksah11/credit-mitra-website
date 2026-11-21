'use client';

import React, { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { CaretDown, List, X, CreditCard, Bank, Money, Gift, ArrowRight, Sparkle, ShieldCheck } from '@phosphor-icons/react';
import BrandLogo from './BrandLogo';

export default function Navbar() {
  const pathname = usePathname();
  const isCreditCardsPage = pathname === '/credit-cards';

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const navRef = useRef<HTMLDivElement>(null);

  // Close dropdown on outside click
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (navRef.current && !navRef.current.contains(event.target as Node)) {
        setActiveDropdown(null);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const creditCardMenu = [
    { label: 'All Credit Cards', href: '/cards' },
    { label: 'Cashback Cards', href: '/cards?category=Cashback' },
    { label: 'Lifetime Free Cards', href: '/cards?category=Lifetime+Free' },
    { label: 'Travel & Lounge Cards', href: '/cards?category=Travel' },
    { label: 'Shopping & Rewards', href: '/cards?category=Shopping' },
  ];

  // ========================================================
  // COMPACT HEADER FOR /credit-cards ROUTE (Reference Design)
  // ========================================================
  if (isCreditCardsPage) {
    return (
      <header className="hidden sm:block w-full relative z-50 transition-all bg-[#FAF7F2]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 sm:h-24 flex items-center justify-between">
          {/* Left: Clean Brand Logo and Tagline (No duplication) */}
          <Link href="/" className="inline-flex items-center gap-2.5 group">
            <div className="w-8 h-8 flex items-center justify-center flex-shrink-0 transition-transform group-hover:scale-105">
              <svg viewBox="0 0 40 40" className="w-full h-full" fill="none" xmlns="http://www.w3.org/2000/svg">
                <defs>
                  <linearGradient id="cmGradHeader1" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#06B6D4" />
                    <stop offset="60%" stopColor="#2563EB" />
                    <stop offset="100%" stopColor="#1E40AF" />
                  </linearGradient>
                  <linearGradient id="cmGradHeader2" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#38BDF8" />
                    <stop offset="100%" stopColor="#1D4ED8" />
                  </linearGradient>
                </defs>
                <path
                  d="M 28 8 A 14 14 0 1 0 28 32 C 32 30 33 26 31 23 C 29 20 25 21 23 23 C 20 26 15 25 13 21 C 11 17 13 12 18 10 C 22 8 26 9 28 8 Z"
                  fill="url(#cmGradHeader1)"
                />
                <path
                  d="M 26 14 A 8 8 0 0 0 16 20 C 16 24 19 26 23 25"
                  stroke="url(#cmGradHeader2)"
                  strokeWidth="3.5"
                  strokeLinecap="round"
                />
                <rect x="33.5" y="11" width="3.5" height="18" rx="1.75" fill="#1D4ED8" />
              </svg>
            </div>
            <div className="flex flex-col leading-none">
              <span className="text-xl sm:text-2xl font-black tracking-tight text-[#0B0F17]">
                Credit-Mitra<span className="text-[#1A56DB]">.</span>
              </span>
              <span className="text-[11px] font-semibold text-slate-500 tracking-wide mt-0.5">
                Smart Card. Better Life.
              </span>
            </div>
          </Link>

          {/* Right: 100% Secure Badge & Navigation Links */}
          <div className="flex items-center gap-3 sm:gap-5">
            <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-emerald-50 text-emerald-700 text-xs font-bold shadow-xs">
              <ShieldCheck size={16} weight="fill" className="text-emerald-600" />
              <span>100% Secure</span>
            </div>

            <nav aria-label="Compact Navigation" className="flex items-center gap-3 sm:gap-4">
              <Link
                href="/compare"
                className="text-xs sm:text-sm font-bold text-slate-700 hover:text-[#1A56DB] transition-colors hidden xs:inline-block"
              >
                Compare
              </Link>
              <Link
                href="/"
                className="p-2 rounded-full hover:bg-slate-200 text-slate-700 transition-colors"
                title="Home"
              >
                <List size={22} weight="bold" />
              </Link>
            </nav>
          </div>
        </div>
      </header>
    );
  }

  return (
    <header className="w-full relative z-50 transition-all bg-[#FAF7F2]">
      <div
        ref={navRef}
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 sm:h-24 flex items-center justify-between"
      >
        {/* Left: Brand Logo matching "Heybank." style in reference */}
        <Link href="/" className="inline-flex items-center gap-1 group">
          <span className="text-2xl sm:text-[26px] font-black tracking-tight text-[#0B0F17]">
            Credit-Mitra<span className="text-[#1A56DB]">.</span>
          </span>
        </Link>

        {/* Center: Navigation Links matching image */}
        <nav aria-label="Main Navigation" className="hidden md:flex items-center gap-7 lg:gap-10">
          <Link
            href="/"
            className="text-[14px] sm:text-[15px] font-semibold text-slate-800 hover:text-black transition-colors"
          >
            Home
          </Link>

          {/* Banking / Cards Dropdown */}
          <div className="relative">
            <button
              type="button"
              onClick={() => setActiveDropdown(activeDropdown === 'banking' ? null : 'banking')}
              onMouseEnter={() => setActiveDropdown('banking')}
              className="flex items-center gap-1 text-[14px] sm:text-[15px] font-semibold text-slate-800 hover:text-black transition-colors py-2"
            >
              <span>Banking</span>
              <CaretDown
                size={13}
                weight="bold"
                className={`transition-transform duration-200 ${
                  activeDropdown === 'banking' ? 'rotate-180 text-black' : 'text-slate-600'
                }`}
              />
            </button>

            {activeDropdown === 'banking' && (
              <div
                onMouseLeave={() => setActiveDropdown(null)}
                className="absolute top-full left-0 mt-1 w-64 bg-white rounded-2xl shadow-2xl py-3 px-2 z-50 animate-in fade-in slide-in-from-top-1 duration-150"
              >
                <div className="px-3 py-1.5 text-xs font-bold text-slate-400 uppercase tracking-wider">
                  Banking &amp; Cards
                </div>
                {creditCardMenu.map((item) => (
                  <Link
                    key={item.label}
                    href={item.href}
                    onClick={() => setActiveDropdown(null)}
                    className="flex items-center gap-2 px-3 py-2 text-sm text-slate-700 hover:text-[#1A56DB] hover:bg-blue-50/70 rounded-xl transition-colors font-medium"
                  >
                    <CreditCard size={16} className="text-[#1A56DB]" />
                    <span>{item.label}</span>
                  </Link>
                ))}
              </div>
            )}
          </div>

          <Link
            href="/compare"
            className="text-[14px] sm:text-[15px] font-semibold text-slate-800 hover:text-black transition-colors"
          >
            Customers
          </Link>

          <Link
            href="/about"
            className="text-[14px] sm:text-[15px] font-semibold text-slate-800 hover:text-black transition-colors"
          >
            Partners
          </Link>
        </nav>

        {/* Right: LOGIN & GET STARTED matching reference image */}
        <div className="hidden md:flex items-center gap-6">
          <Link
            href="/admin/login"
            className="text-[13px] sm:text-[14px] font-extrabold uppercase tracking-wider text-[#0B0F17] hover:text-[#1A56DB] transition-colors"
          >
            LOGIN
          </Link>

          <Link
            href="/cards"
            className="rounded-full bg-[#0B0F17] hover:bg-black active:scale-95 text-white font-bold text-xs tracking-widest px-6 py-2.5 shadow-md hover:shadow-lg transition-all uppercase"
          >
            GET STARTED
          </Link>
        </div>

        {/* Mobile Hamburger Button */}
        <div className="flex md:hidden items-center">
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle navigation menu"
            className="p-2.5 rounded-xl text-slate-800 hover:bg-black/5 transition-colors"
          >
            {mobileMenuOpen ? <X size={26} weight="bold" /> : <List size={26} weight="bold" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white px-6 py-6 space-y-4 shadow-2xl animate-in fade-in slide-in-from-top-2 duration-200">
          <div className="space-y-1">
            <Link
              href="/"
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center gap-2.5 px-3 py-3 rounded-xl text-slate-800 font-semibold hover:bg-slate-50 transition-colors"
            >
              <span>Home</span>
            </Link>
            <Link
              href="/cards"
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center gap-2.5 px-3 py-3 rounded-xl text-slate-800 font-semibold hover:bg-slate-50 transition-colors"
            >
              <CreditCard size={18} className="text-[#1A56DB]" />
              <span>Banking &amp; Cards</span>
            </Link>
            <Link
              href="/compare"
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center gap-2.5 px-3 py-3 rounded-xl text-slate-800 font-semibold hover:bg-slate-50 transition-colors"
            >
              <span>Customers / Comparison</span>
            </Link>
            <Link
              href="/about"
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center gap-2.5 px-3 py-3 rounded-xl text-slate-800 font-semibold hover:bg-slate-50 transition-colors"
            >
              <span>Partners / About</span>
            </Link>
          </div>

          <div className="pt-3 border-t border-slate-100 flex flex-col gap-2.5">
            <Link
              href="/cards"
              onClick={() => setMobileMenuOpen(false)}
              className="w-full text-center rounded-full bg-[#0B0F17] text-white font-bold py-3 text-xs tracking-widest uppercase shadow-md"
            >
              GET STARTED
            </Link>
            <Link
              href="/admin/login"
              onClick={() => setMobileMenuOpen(false)}
              className="w-full text-center text-xs font-bold tracking-wider text-slate-600 py-2 uppercase hover:text-black"
            >
              LOGIN
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
