import React from 'react';
import Link from 'next/link';
import { ShieldCheck } from '@phosphor-icons/react/dist/ssr';
import BrandLogo from './BrandLogo';

export default function Footer() {
  return (
    <footer className="mt-20 border-t border-slate-200 bg-white text-slate-600">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand Info */}
          <div className="space-y-3 md:col-span-1">
            <BrandLogo size="md" />
            <p className="text-xs sm:text-sm text-slate-500 leading-relaxed pt-1">
              Clear card fees, honest pros and cons, and direct bank application links for smart Indian credit seekers.
            </p>
            <div className="flex items-center gap-1.5 text-xs text-slate-500 pt-2 font-medium">
              <ShieldCheck size={16} weight="fill" className="text-blue-600" />
              <span>100% verified official referral links</span>
            </div>
          </div>

          {/* Popular Categories */}
          <div className="space-y-2">
            <h4 className="text-sm font-bold text-slate-900 uppercase tracking-wider">
              Categories
            </h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/cards?category=Cashback" className="hover:text-blue-600 transition-colors">
                  Cashback Cards
                </Link>
              </li>
              <li>
                <Link href="/cards?category=Lifetime+Free" className="hover:text-blue-600 transition-colors">
                  Lifetime Free Cards
                </Link>
              </li>
              <li>
                <Link href="/cards?category=Travel" className="hover:text-blue-600 transition-colors">
                  Travel &amp; Lounge Cards
                </Link>
              </li>
              <li>
                <Link href="/cards?category=Shopping" className="hover:text-blue-600 transition-colors">
                  Shopping &amp; Rewards
                </Link>
              </li>
            </ul>
          </div>

          {/* Platform Tools */}
          <div className="space-y-2">
            <h4 className="text-sm font-bold text-slate-900 uppercase tracking-wider">
              Products &amp; Tools
            </h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/cards" className="hover:text-blue-600 transition-colors">
                  All Credit Cards
                </Link>
              </li>
              <li>
                <Link href="/compare" className="hover:text-blue-600 transition-colors">
                  Card Comparison Tool
                </Link>
              </li>
              <li>
                <Link href="/about" className="hover:text-blue-600 transition-colors">
                  About Credit-Mitra
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-blue-600 transition-colors">
                  Contact &amp; Support
                </Link>
              </li>
            </ul>
          </div>

          {/* Legal & Trust */}
          <div className="space-y-2">
            <h4 className="text-sm font-bold text-slate-900 uppercase tracking-wider">
              Trust &amp; Legal
            </h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/affiliate-disclosure" className="hover:text-blue-600 transition-colors font-medium text-blue-600">
                  Affiliate Disclosure
                </Link>
              </li>
              <li>
                <Link href="/privacy" className="hover:text-blue-600 transition-colors">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/admin/login" className="hover:text-blue-600 transition-colors text-xs text-slate-400">
                  Partner Admin Portal
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom copyright */}
        <div className="pt-8 mt-8 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-400 gap-2">
          <span>&copy; {new Date().getFullYear()} Credit-Mitra. All rights reserved.</span>
          <span>Designed for Indian credit transparency.</span>
        </div>
      </div>
    </footer>
  );
}
