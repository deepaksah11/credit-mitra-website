'use client';

import React, { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import { CaretDown, List, X, CreditCard, Bank, Money, Gift } from '@phosphor-icons/react';
import BrandLogo from './BrandLogo';

export default function Navbar() {
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

  const loansMenu = [
    { label: 'Personal Loans', href: '/cards?category=Cashback' },
    { label: 'Home Loans', href: '/cards?category=Travel' },
    { label: 'Business Loans', href: '/cards' },
  ];

  const bankingMenu = [
    { label: 'High-Yield Savings Accounts', href: '/cards?category=Lifetime+Free' },
    { label: 'Fixed Deposits (FD)', href: '/cards' },
    { label: 'Demat & Investment Accounts', href: '/cards' },
  ];

  return (
    <header className="w-full relative z-50 transition-all bg-transparent">
      <div
        ref={navRef}
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 sm:h-24 flex items-center justify-between"
      >
        {/* Left: Brand Logo exactly as in reference image */}
        <BrandLogo size="md" />

        {/* Center / Right: Navigation Links matching image */}
        <nav aria-label="Main Navigation" className="hidden lg:flex items-center gap-7 xl:gap-9">
          
          {/* Credit Cards Dropdown */}
          <div className="relative">
            <button
              type="button"
              onClick={() => setActiveDropdown(activeDropdown === 'cards' ? null : 'cards')}
              onMouseEnter={() => setActiveDropdown('cards')}
              className="flex items-center gap-1.5 text-[15px] font-semibold text-slate-800 hover:text-blue-600 transition-colors py-2"
            >
              <span>Credit Cards</span>
              <CaretDown
                size={14}
                weight="bold"
                className={`transition-transform duration-200 ${
                  activeDropdown === 'cards' ? 'rotate-180 text-blue-600' : 'text-slate-600'
                }`}
              />
            </button>

            {activeDropdown === 'cards' && (
              <div
                onMouseLeave={() => setActiveDropdown(null)}
                className="absolute top-full left-0 mt-1 w-64 bg-white/95 backdrop-blur-xl rounded-2xl shadow-2xl border border-slate-100 py-3 px-2 z-50 animate-in fade-in slide-in-from-top-1 duration-150"
              >
                <div className="px-3 py-1.5 text-xs font-bold text-slate-400 uppercase tracking-wider">
                  Browse by category
                </div>
                {creditCardMenu.map((item) => (
                  <Link
                    key={item.label}
                    href={item.href}
                    onClick={() => setActiveDropdown(null)}
                    className="flex items-center gap-2 px-3 py-2 text-sm text-slate-700 hover:text-blue-600 hover:bg-blue-50/70 rounded-xl transition-colors font-medium"
                  >
                    <CreditCard size={16} className="text-blue-600" />
                    <span>{item.label}</span>
                  </Link>
                ))}
              </div>
            )}
          </div>

          {/* Loans Dropdown */}
          <div className="relative">
            <button
              type="button"
              onClick={() => setActiveDropdown(activeDropdown === 'loans' ? null : 'loans')}
              onMouseEnter={() => setActiveDropdown('loans')}
              className="flex items-center gap-1.5 text-[15px] font-semibold text-slate-800 hover:text-blue-600 transition-colors py-2"
            >
              <span>Loans</span>
              <CaretDown
                size={14}
                weight="bold"
                className={`transition-transform duration-200 ${
                  activeDropdown === 'loans' ? 'rotate-180 text-blue-600' : 'text-slate-600'
                }`}
              />
            </button>

            {activeDropdown === 'loans' && (
              <div
                onMouseLeave={() => setActiveDropdown(null)}
                className="absolute top-full left-0 mt-1 w-60 bg-white/95 backdrop-blur-xl rounded-2xl shadow-2xl border border-slate-100 py-3 px-2 z-50 animate-in fade-in slide-in-from-top-1 duration-150"
              >
                <div className="px-3 py-1.5 text-xs font-bold text-slate-400 uppercase tracking-wider">
                  Loan Products
                </div>
                {loansMenu.map((item) => (
                  <Link
                    key={item.label}
                    href={item.href}
                    onClick={() => setActiveDropdown(null)}
                    className="flex items-center gap-2 px-3 py-2 text-sm text-slate-700 hover:text-blue-600 hover:bg-blue-50/70 rounded-xl transition-colors font-medium"
                  >
                    <Money size={16} className="text-blue-600" />
                    <span>{item.label}</span>
                  </Link>
                ))}
              </div>
            )}
          </div>

          {/* Banking Products Dropdown */}
          <div className="relative">
            <button
              type="button"
              onClick={() => setActiveDropdown(activeDropdown === 'banking' ? null : 'banking')}
              onMouseEnter={() => setActiveDropdown('banking')}
              className="flex items-center gap-1.5 text-[15px] font-semibold text-slate-800 hover:text-blue-600 transition-colors py-2"
            >
              <span>Banking Products</span>
              <CaretDown
                size={14}
                weight="bold"
                className={`transition-transform duration-200 ${
                  activeDropdown === 'banking' ? 'rotate-180 text-blue-600' : 'text-slate-600'
                }`}
              />
            </button>

            {activeDropdown === 'banking' && (
              <div
                onMouseLeave={() => setActiveDropdown(null)}
                className="absolute top-full left-0 mt-1 w-64 bg-white/95 backdrop-blur-xl rounded-2xl shadow-2xl border border-slate-100 py-3 px-2 z-50 animate-in fade-in slide-in-from-top-1 duration-150"
              >
                <div className="px-3 py-1.5 text-xs font-bold text-slate-400 uppercase tracking-wider">
                  Banking &amp; Savings
                </div>
                {bankingMenu.map((item) => (
                  <Link
                    key={item.label}
                    href={item.href}
                    onClick={() => setActiveDropdown(null)}
                    className="flex items-center gap-2 px-3 py-2 text-sm text-slate-700 hover:text-blue-600 hover:bg-blue-50/70 rounded-xl transition-colors font-medium"
                  >
                    <Bank size={16} className="text-blue-600" />
                    <span>{item.label}</span>
                  </Link>
                ))}
              </div>
            )}
          </div>

          {/* Refer & Earn Link */}
          <Link
            href="/cards"
            className="text-[15px] font-semibold text-slate-800 hover:text-blue-600 transition-colors py-2"
          >
            Refer &amp; Earn
          </Link>

          {/* About Link */}
          <Link
            href="/about"
            className="text-[15px] font-semibold text-slate-800 hover:text-blue-600 transition-colors py-2"
          >
            About
          </Link>
        </nav>

        {/* Mobile Hamburger Button */}
        <div className="flex lg:hidden items-center">
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle navigation menu"
            className="p-2.5 rounded-xl text-slate-700 hover:bg-slate-100/80 transition-colors"
          >
            {mobileMenuOpen ? <X size={26} weight="bold" /> : <List size={26} weight="bold" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-white/95 backdrop-blur-xl border-b border-slate-100 px-6 py-6 space-y-4 shadow-2xl animate-in fade-in slide-in-from-top-2 duration-200">
          <div className="space-y-1">
            <Link
              href="/cards"
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center gap-2.5 px-3 py-3 rounded-xl text-slate-800 font-semibold hover:bg-blue-50 hover:text-blue-600 transition-colors"
            >
              <CreditCard size={18} className="text-blue-600" />
              <span>Credit Cards</span>
            </Link>
            <Link
              href="/cards?category=Cashback"
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center gap-2.5 px-3 py-3 rounded-xl text-slate-800 font-semibold hover:bg-blue-50 hover:text-blue-600 transition-colors"
            >
              <Money size={18} className="text-blue-600" />
              <span>Loans</span>
            </Link>
            <Link
              href="/cards?category=Lifetime+Free"
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center gap-2.5 px-3 py-3 rounded-xl text-slate-800 font-semibold hover:bg-blue-50 hover:text-blue-600 transition-colors"
            >
              <Bank size={18} className="text-blue-600" />
              <span>Banking Products</span>
            </Link>
            <Link
              href="/cards"
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center gap-2.5 px-3 py-3 rounded-xl text-slate-800 font-semibold hover:bg-blue-50 hover:text-blue-600 transition-colors"
            >
              <Gift size={18} className="text-blue-600" />
              <span>Refer &amp; Earn</span>
            </Link>
            <Link
              href="/about"
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center gap-2.5 px-3 py-3 rounded-xl text-slate-800 font-semibold hover:bg-blue-50 hover:text-blue-600 transition-colors"
            >
              <span>About</span>
            </Link>
          </div>

          <div className="pt-3 border-t border-slate-100 flex flex-col gap-2.5">
            <Link
              href="/cards"
              onClick={() => setMobileMenuOpen(false)}
              className="w-full text-center rounded-full bg-blue-600 text-white font-semibold py-3 text-sm shadow-md"
            >
              Explore Credit Cards
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
