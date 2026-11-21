'use client';

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Card } from '@/types/card';
import { formatCurrency } from '@/lib/utils';
import { API_BASE_URL } from '@/lib/api';
import {
  Sparkle,
  ArrowSquareOut,
  Eye,
  Scales,
  ShieldCheck,
  Check,
  ArrowRight,
  AirplaneTilt,
  Percent,
  Gift,
  Tag,
  CreditCard as CardIcon,
} from '@phosphor-icons/react';

interface CreditCardsExplorerProps {
  cards: Card[];
}

export default function CreditCardsExplorer({ cards = [] }: CreditCardsExplorerProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const categories = [
    { label: 'All Cards', value: 'All' },
    { label: 'Cashback', value: 'Cashback' },
    { label: 'Travel & Lounge', value: 'Travel' },
    { label: 'Lifetime Free', value: 'Lifetime Free' },
    { label: 'Rewards', value: 'Rewards' },
    { label: 'Shopping', value: 'Shopping' },
  ];

  // Filter cards based on selectedCategory and optional search
  const filteredCards = useMemo(() => {
    return cards.filter((card) => {
      // Category match
      const categoryMatch =
        selectedCategory === 'All' ||
        card.category.toLowerCase() === selectedCategory.toLowerCase();

      // Search match
      const query = searchQuery.trim().toLowerCase();
      const searchMatch =
        !query ||
        card.title.toLowerCase().includes(query) ||
        card.bankName.toLowerCase().includes(query) ||
        card.category.toLowerCase().includes(query) ||
        card.benefits?.some((b) => b.toLowerCase().includes(query));

      return categoryMatch && searchMatch;
    });
  }, [cards, selectedCategory, searchQuery]);

  return (
    <div className="w-full max-w-5xl mx-auto space-y-12">
      {/* ======================================================== */}
      {/* 1. CATEGORY FILTERS & SEARCH */}
      {/* ======================================================== */}
      <div className="space-y-4">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <div>
            <h3 className="text-xl sm:text-2xl font-extrabold text-[#0B0F17] tracking-tight">
              Explore All Cards by Category
            </h3>
            <p className="text-xs sm:text-sm text-slate-500 font-medium">
              Showing {filteredCards.length} verified credit {filteredCards.length === 1 ? 'card' : 'cards'}
            </p>
          </div>

          {/* Quick Search Input */}
          <div className="w-full sm:w-64">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search bank or card name..."
              className="w-full px-4 py-2.5 rounded-full bg-white text-xs sm:text-sm text-slate-800 placeholder:text-slate-400 shadow-md shadow-black/[0.02] focus:outline-none focus:ring-2 focus:ring-[#0B0F17] transition-all font-medium"
            />
          </div>
        </div>

        {/* Category Pill Buttons (Zero borders, soft pill active states) */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
          {categories.map((cat) => {
            const isActive = selectedCategory === cat.value;
            return (
              <button
                key={cat.value}
                type="button"
                onClick={() => setSelectedCategory(cat.value)}
                className={`px-4 py-2 rounded-full text-xs sm:text-sm font-bold whitespace-nowrap transition-all duration-200 active:scale-95 ${
                  isActive
                    ? 'bg-[#0B0F17] text-white shadow-md shadow-black/10'
                    : 'bg-white text-slate-700 hover:bg-slate-100 shadow-sm'
                }`}
              >
                {cat.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* ======================================================== */}
      {/* 2. FILTERED CARDS GRID (Zero Borders, Rounded-3xl, Soft Shadows) */}
      {/* ======================================================== */}
      {filteredCards.length === 0 ? (
        <div className="p-10 text-center rounded-3xl bg-white shadow-xl shadow-black/[0.02]">
          <CardIcon size={40} className="mx-auto text-slate-300 mb-2" />
          <h4 className="text-base font-bold text-[#0B0F17]">No cards match this filter</h4>
          <p className="text-xs text-slate-500 mt-1">
            Try choosing a different category or clearing your search term.
          </p>
          <button
            type="button"
            onClick={() => {
              setSelectedCategory('All');
              setSearchQuery('');
            }}
            className="mt-4 px-4 py-2 rounded-full bg-[#FAF7F2] text-xs font-bold text-[#0B0F17] hover:bg-slate-200 transition-colors"
          >
            Reset Filters
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {filteredCards.map((card) => {
            const applyUrl = `${API_BASE_URL}/go/${card.slug}`;
            const detailUrl = `/cards/${card.slug}`;

            return (
              <div
                key={card._id}
                className="group rounded-3xl bg-white p-5 shadow-xl shadow-black/[0.03] hover:shadow-2xl hover:shadow-black/[0.07] hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between"
              >
                <div className="space-y-4">
                  {/* Top Row: Bank Badge & Category */}
                  <div className="flex items-center justify-between gap-2">
                    <span className="text-[11px] font-bold text-slate-700 bg-[#F5F2EB] px-3 py-1 rounded-full">
                      {card.bankName}
                    </span>
                    <span className="text-[11px] font-bold text-[#1A56DB] bg-[#EFF6FF] px-2.5 py-0.5 rounded-full">
                      {card.category}
                    </span>
                  </div>

                  {/* Card Visual Mockup & Title */}
                  <div className="flex items-center gap-3.5">
                    <div className="relative w-20 h-13 rounded-xl overflow-hidden shadow-md flex-shrink-0 bg-slate-900 group-hover:scale-105 transition-transform duration-300">
                      {card.imageUrl ? (
                        <Image
                          src={card.imageUrl}
                          alt={card.title}
                          fill
                          className="object-cover"
                          sizes="80px"
                        />
                      ) : (
                        <div className="w-full h-full bg-slate-900" />
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="text-sm font-extrabold text-[#0B0F17] line-clamp-2 leading-snug group-hover:text-[#1A56DB] transition-colors">
                        {card.title}
                      </h4>
                    </div>
                  </div>

                  {/* Fee Summary */}
                  <div className="p-3 rounded-2xl bg-[#FAF7F2] flex items-center justify-between text-xs">
                    <div>
                      <span className="text-[10px] font-bold text-slate-400 uppercase block">Joining</span>
                      <span className="font-extrabold text-[#0B0F17]">{formatCurrency(card.joiningFee)}</span>
                    </div>
                    <div className="text-right">
                      <span className="text-[10px] font-bold text-slate-400 uppercase block">Annual</span>
                      <span className="font-extrabold text-[#0B0F17]">{formatCurrency(card.annualFee)}</span>
                    </div>
                  </div>

                  {/* Key Benefit Highlight */}
                  {card.benefits && card.benefits.length > 0 && (
                    <div className="flex items-start gap-2 text-xs text-slate-600 line-clamp-2">
                      <Check size={14} weight="bold" className="text-emerald-600 flex-shrink-0 mt-0.5" />
                      <span>{card.benefits[0]}</span>
                    </div>
                  )}
                </div>

                {/* Actions */}
                <div className="mt-5 pt-4 border-t border-slate-100 flex items-center gap-2">
                  <a
                    href={applyUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 py-2.5 px-4 rounded-full bg-[#0B0F17] hover:bg-[#1A56DB] text-white text-xs font-bold flex items-center justify-center gap-1.5 transition-colors active:scale-95 shadow-sm"
                  >
                    <span>Apply</span>
                    <ArrowSquareOut size={14} weight="bold" />
                  </a>

                  <Link
                    href={detailUrl}
                    className="py-2.5 px-3.5 rounded-full bg-[#FAF7F2] hover:bg-[#F0ECE1] text-[#0B0F17] text-xs font-bold flex items-center justify-center gap-1 transition-colors active:scale-95"
                  >
                    <Eye size={14} weight="bold" />
                    <span>Details</span>
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* ======================================================== */}
      {/* 3. COMPARISON ENTRY POINT CALLOUT */}
      {/* ======================================================== */}
      <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-br from-white via-white to-[#F5F2EB] shadow-xl shadow-black/[0.03] flex flex-col sm:flex-row items-center justify-between gap-6">
        <div className="space-y-2 text-center sm:text-left">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#EFF6FF] text-[#1A56DB] text-xs font-bold">
            <Scales size={14} weight="fill" />
            <span>Interactive Comparison Tool</span>
          </div>
          <h3 className="text-xl sm:text-2xl font-extrabold text-[#0B0F17] tracking-tight">
            Can&apos;t Decide Between Two Cards?
          </h3>
          <p className="text-xs sm:text-sm text-slate-500 max-w-xl font-normal leading-relaxed">
            Evaluate annual charges, spend waiver criteria, airport lounge privileges, and real reward rates side by side before submitting your application.
          </p>
        </div>

        <Link
          href="/compare"
          className="whitespace-nowrap py-3.5 px-7 rounded-full bg-[#0B0F17] hover:bg-[#1A56DB] text-white font-bold text-sm flex items-center gap-2 shadow-lg shadow-black/10 active:scale-95 transition-all"
        >
          <span>Compare Cards Now</span>
          <ArrowRight size={16} weight="bold" />
        </Link>
      </div>

      {/* ======================================================== */}
      {/* 4. AFFILIATE DISCLOSURE & TRUST FOOTER */}
      {/* ======================================================== */}
      <div className="p-6 rounded-3xl bg-white/70 shadow-sm space-y-3 text-center sm:text-left text-xs text-slate-500 leading-relaxed">
        <div className="flex items-center justify-center sm:justify-start gap-2 text-slate-700 font-bold text-xs uppercase tracking-wider">
          <ShieldCheck size={16} weight="fill" className="text-emerald-600" />
          <span>Affiliate &amp; Security Disclosure</span>
        </div>
        <p>
          Credit-Mitra is an independent financial technology directory and comparison service. When you click &ldquo;Apply Now&rdquo;, you are securely redirected to the issuing bank or financial partner portal. We may receive affiliate compensation from card issuers when applications are approved, at zero additional expense to you. We do not collect PAN numbers, bank passwords, or sensitive credit bureau scores.
        </p>
        <div className="pt-2 flex flex-wrap items-center justify-center sm:justify-start gap-4 text-xs font-semibold text-slate-700">
          <Link href="/privacy" className="hover:text-[#1A56DB] transition-colors underline">
            Privacy Policy
          </Link>
          <span>•</span>
          <Link href="/affiliate-disclosure" className="hover:text-[#1A56DB] transition-colors underline">
            Affiliate Disclosure
          </Link>
          <span>•</span>
          <Link href="/contact" className="hover:text-[#1A56DB] transition-colors underline">
            Contact Support
          </Link>
          <span>•</span>
          <Link href="/admin/login" className="hover:text-[#1A56DB] transition-colors text-slate-400">
            Partner Login
          </Link>
        </div>
      </div>
    </div>
  );
}
