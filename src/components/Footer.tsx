import React from 'react';
import Link from 'next/link';
import { ShieldCheck } from '@phosphor-icons/react/dist/ssr';
import BrandLogo from './BrandLogo';

export default function Footer() {
  return (
    <footer className="mt-8 sm:mt-12 border-t border-slate-200/60 bg-[#FAF7F2] text-slate-600 py-6 sm:py-8">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-4">
        
        {/* Top Row: Brand & Trust Badge */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 text-center sm:text-left">
          <BrandLogo size="sm" />
          <div className="inline-flex items-center gap-1.5 text-[11px] sm:text-xs font-bold text-slate-700 bg-white/90 px-3 py-1 rounded-full border border-slate-200/60 shadow-2xs">
            <ShieldCheck size={14} weight="fill" className="text-emerald-600 flex-shrink-0" />
            <span>100% Secure &amp; Verified Direct Referral</span>
          </div>
        </div>

        {/* Compact Navigation Links (Single Line / Wrap on Mobile) */}
        <nav aria-label="Footer Navigation" className="flex flex-wrap items-center justify-center sm:justify-start gap-x-3 sm:gap-x-4 gap-y-1.5 text-xs font-semibold text-slate-500 pt-1">
          <Link href="/credit-cards" className="hover:text-[#0B0F17] transition-colors">
            Credit Cards
          </Link>
          <span className="text-slate-300">•</span>
          <Link href="/compare" className="hover:text-[#0B0F17] transition-colors">
            Compare
          </Link>
          <span className="text-slate-300">•</span>
          <Link href="/cards?category=Cashback" className="hover:text-[#0B0F17] transition-colors">
            Cashback
          </Link>
          <span className="text-slate-300">•</span>
          <Link href="/cards?category=Lifetime+Free" className="hover:text-[#0B0F17] transition-colors">
            Lifetime Free
          </Link>
          <span className="text-slate-300">•</span>
          <Link href="/about" className="hover:text-[#0B0F17] transition-colors">
            About
          </Link>
          <span className="text-slate-300">•</span>
          <Link href="/affiliate-disclosure" className="hover:text-[#0B0F17] transition-colors">
            Affiliate Disclosure
          </Link>
          <span className="text-slate-300">•</span>
          <Link href="/privacy" className="hover:text-[#0B0F17] transition-colors">
            Privacy Policy
          </Link>
          <span className="text-slate-300">•</span>
          <Link href="/contact" className="hover:text-[#0B0F17] transition-colors">
            Contact
          </Link>
        </nav>

        {/* Bottom Micro Disclosure & Copyright */}
        <div className="pt-3 border-t border-slate-200/50 flex flex-col sm:flex-row items-center justify-between text-[11px] text-slate-400 gap-2 text-center sm:text-left">
          <p className="max-w-xl leading-relaxed">
            Credit-Mitra is an independent credit card discovery platform. Applications are processed directly on official partnered bank KYC portals.
          </p>
          <span className="whitespace-nowrap font-medium text-slate-500">
            &copy; {new Date().getFullYear()} Credit-Mitra. All rights reserved.
          </span>
        </div>
      </div>
    </footer>
  );
}
