import React from 'react';
import Link from 'next/link';
import { ShieldCheck, CheckCircle } from '@phosphor-icons/react/dist/ssr';
import BrandLogo from './BrandLogo';

export default function Footer() {
  return (
    <footer className="mt-20 bg-[#FAF7F2] text-slate-600 pt-6">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
          {/* Brand Info */}
          <div className="space-y-4 md:col-span-1">
            <BrandLogo size="md" />
            <p className="text-xs sm:text-sm text-slate-500 leading-relaxed pt-1">
              Clear card fees, honest pros and cons, and direct bank application links for smart Indian credit seekers.
            </p>
            <div className="space-y-2 pt-1 text-xs text-slate-600 font-medium">
              <div className="flex items-center gap-2">
                <ShieldCheck size={16} weight="fill" className="text-[#0B0F17] flex-shrink-0" />
                <span>100% verified official bank links</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle size={16} weight="fill" className="text-emerald-600 flex-shrink-0" />
                <span>Zero documentation or OTP requests</span>
              </div>
            </div>
          </div>

          {/* Popular Categories */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold text-[#0B0F17] uppercase tracking-wider">
              Browse Categories
            </h4>
            <ul className="space-y-2.5 text-xs sm:text-sm font-medium">
              <li>
                <Link href="/cards?category=Cashback" className="hover:text-[#0B0F17] transition-colors">
                  Cashback Cards
                </Link>
              </li>
              <li>
                <Link href="/cards?category=Lifetime+Free" className="hover:text-[#0B0F17] transition-colors">
                  Lifetime Free Cards
                </Link>
              </li>
              <li>
                <Link href="/cards?category=Travel" className="hover:text-[#0B0F17] transition-colors">
                  Travel &amp; Lounge Cards
                </Link>
              </li>
              <li>
                <Link href="/cards?category=Shopping" className="hover:text-[#0B0F17] transition-colors">
                  Shopping &amp; Rewards
                </Link>
              </li>
            </ul>
          </div>

          {/* Platform Tools */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold text-[#0B0F17] uppercase tracking-wider">
              Products &amp; Tools
            </h4>
            <ul className="space-y-2.5 text-xs sm:text-sm font-medium">
              <li>
                <Link href="/cards" className="hover:text-[#0B0F17] transition-colors">
                  All Credit Cards
                </Link>
              </li>
              <li>
                <Link href="/compare" className="hover:text-[#0B0F17] transition-colors">
                  Side-by-Side Comparison
                </Link>
              </li>
              <li>
                <Link href="/about" className="hover:text-[#0B0F17] transition-colors">
                  About Credit-Mitra
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-[#0B0F17] transition-colors">
                  Contact &amp; Support
                </Link>
              </li>
            </ul>
          </div>

          {/* Legal & Trust */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold text-[#0B0F17] uppercase tracking-wider">
              Trust &amp; Legal
            </h4>
            <ul className="space-y-2.5 text-xs sm:text-sm font-medium">
              <li>
                <Link href="/affiliate-disclosure" className="text-[#0B0F17] hover:underline transition-colors font-semibold">
                  Affiliate Disclosure
                </Link>
              </li>
              <li>
                <Link href="/privacy" className="hover:text-[#0B0F17] transition-colors">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/admin/login" className="hover:text-[#0B0F17] transition-colors text-xs text-slate-400">
                  Partner Admin Portal
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom copyright */}
        <div className="pt-8 mt-10 border-t border-slate-200/50 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-400 gap-2">
          <span>&copy; {new Date().getFullYear()} Credit-Mitra. All rights reserved.</span>
          <span>Designed with high financial transparency for Indian credit seekers.</span>
        </div>
      </div>
    </footer>
  );
}
