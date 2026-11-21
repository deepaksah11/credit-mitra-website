'use client';

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Card } from '@/types/card';
import { formatCurrency } from '@/lib/utils';
import { API_BASE_URL } from '@/lib/api';
import {
  CreditCard as CardIcon,
  Crown,
  Target,
  AirplaneTilt,
  Gift,
  ShoppingBag,
  Scales,
  ShieldCheck,
  Check,
  ArrowRight,
  ArrowSquareOut,
  Eye,
  MagnifyingGlass,
} from '@phosphor-icons/react';

interface CreditCardsExplorerProps {
  cards: Card[];
}

export default function CreditCardsExplorer({ cards = [] }: CreditCardsExplorerProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');

  // Category pills with icons matching reference image
  const categoryTabs = [
    { label: 'All Cards', value: 'All', icon: <CardIcon size={16} weight="fill" /> },
    { label: 'Lifetime Free', value: 'Lifetime Free', icon: <Crown size={16} weight="fill" className="text-amber-500" /> },
    { label: 'Cashback', value: 'Cashback', icon: <Target size={16} weight="bold" className="text-blue-500" /> },
    { label: 'Travel', value: 'Travel', icon: <AirplaneTilt size={16} weight="fill" className="text-indigo-500" /> },
    { label: 'Rewards', value: 'Rewards', icon: <Gift size={16} weight="fill" className="text-rose-500" /> },
    { label: 'Shopping', value: 'Shopping', icon: <ShoppingBag size={16} weight="fill" className="text-purple-500" /> },
  ];

  // Filter cards based on selectedCategory and search
  const filteredCards = useMemo(() => {
    return cards.filter((card) => {
      const categoryMatch =
        selectedCategory === 'All' ||
        card.category.toLowerCase() === selectedCategory.toLowerCase();

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
    <div className="w-full max-w-5xl mx-auto space-y-8 sm:space-y-10 pt-2">
      
      {/* ======================================================== */}
      {/* 1. CATEGORY PILLS BAR (Exact Reference Image Style) */}
      {/* ======================================================== */}
      <div className="space-y-4">
        <div className="flex items-center gap-2.5 overflow-x-auto pb-2 scrollbar-none justify-start sm:justify-center">
          {categoryTabs.map((tab) => {
            const isActive = selectedCategory === tab.value;
            return (
              <button
                key={tab.value}
                type="button"
                onClick={() => setSelectedCategory(tab.value)}
                className={`inline-flex items-center gap-2 px-4 sm:px-5 py-2.5 rounded-full text-xs sm:text-sm font-bold whitespace-nowrap transition-all duration-300 active:scale-95 ${
                  isActive
                    ? 'bg-[#1A56DB] text-white shadow-md shadow-blue-600/20'
                    : 'bg-white text-slate-700 hover:bg-slate-100 shadow-sm shadow-black/[0.03]'
                }`}
              >
                <span>{tab.icon}</span>
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* Quick Search and Filter Results count */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 px-2">
          <p className="text-xs sm:text-sm font-bold text-slate-500">
            Showing <span className="text-[#0B0F17] font-black">{filteredCards.length}</span> cards in{' '}
            <span className="text-[#1A56DB]">{selectedCategory === 'All' ? 'All Categories' : selectedCategory}</span>
          </p>

          <div className="relative w-full sm:w-64">
            <MagnifyingGlass size={16} weight="bold" className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by card or bank..."
              className="w-full pl-9 pr-4 py-2 rounded-full bg-white text-xs text-slate-800 placeholder:text-slate-400 shadow-sm focus:outline-none focus:ring-2 focus:ring-[#1A56DB] transition-all font-medium"
            />
          </div>
        </div>
      </div>

      {/* ======================================================== */}
      {/* 2. CARD DIRECTORY GRID (Zero Borders, Soft Shadows) */}
      {/* ======================================================== */}
      {filteredCards.length === 0 ? (
        <div className="p-10 text-center rounded-3xl bg-white shadow-xl shadow-black/[0.02]">
          <CardIcon size={40} className="mx-auto text-slate-300 mb-2" />
          <h4 className="text-base font-bold text-[#0B0F17]">No cards found in this category</h4>
          <p className="text-xs text-slate-500 mt-1">Try selecting another category above or resetting filters.</p>
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
                <div className="space-y-3.5">
                  {/* Top: Bank & Category */}
                  <div className="flex items-center justify-between gap-2">
                    <span className="text-[11px] font-bold text-slate-700 bg-[#F5F2EB] px-3 py-1 rounded-full">
                      {card.bankName}
                    </span>
                    <span className="text-[11px] font-bold text-[#1A56DB] bg-[#EFF6FF] px-2.5 py-0.5 rounded-full">
                      {card.category}
                    </span>
                  </div>

                  {/* Card Visual & Title */}
                  <div className="flex items-center gap-3.5">
                    <div className="relative w-20 h-13 rounded-xl overflow-hidden shadow-md flex-shrink-0 bg-slate-900 group-hover:scale-105 transition-transform duration-300">
                      {card.imageUrl ? (
                        <Image src={card.imageUrl} alt={card.title} fill className="object-cover" sizes="80px" />
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
                <div className="mt-5 pt-3 border-t border-slate-100 flex items-center gap-2">
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
      {/* 3. COMPARE CARDS BANNER (Exact Reference Image Design) */}
      {/* ======================================================== */}
      <div className="p-5 sm:p-7 rounded-[28px] bg-white shadow-xl shadow-indigo-950/[0.04] flex flex-col sm:flex-row items-center justify-between gap-5 transition-transform hover:-translate-y-0.5">
        <div className="flex items-center gap-4 text-center sm:text-left">
          {/* Scales Icon Container */}
          <div className="w-14 h-14 rounded-2xl bg-indigo-50/80 flex items-center justify-center flex-shrink-0 text-[#1A56DB]">
            <Scales size={28} weight="duotone" />
          </div>
          <div>
            <h3 className="text-lg sm:text-xl font-extrabold text-[#0B0F17] tracking-tight">
              Compare Cards
            </h3>
            <p className="text-xs sm:text-sm text-slate-500 font-medium">
              Find the best match for your needs
            </p>
          </div>
        </div>

        <Link
          href="/compare"
          className="whitespace-nowrap py-3 px-6 rounded-full bg-[#FAF7F2] hover:bg-[#EFEAE1] text-[#0B0F17] font-bold text-xs sm:text-sm flex items-center gap-1.5 transition-all shadow-xs active:scale-95"
        >
          <span>Compare Now</span>
          <ArrowRight size={15} weight="bold" />
        </Link>
      </div>

      {/* ======================================================== */}
      {/* 4. TRUST & LEGAL FOOTER (Exact Reference Image Design) */}
      {/* ======================================================== */}
      <div className="text-center space-y-3 pt-2 text-xs text-slate-500">
        {/* Trusted by Millions Badge */}
        <div className="inline-flex items-center justify-center gap-2 font-bold text-slate-700">
          <ShieldCheck size={16} weight="fill" className="text-emerald-600" />
          <span>Trusted by Millions</span>
          <span className="text-slate-300">|</span>
          <span>100% Secure &amp; Transparent</span>
        </div>

        {/* Legal Links */}
        <div className="flex items-center justify-center gap-3 font-semibold text-slate-500">
          <Link href="/privacy" className="hover:text-[#1A56DB] transition-colors">
            Privacy Policy
          </Link>
          <span className="text-slate-300">|</span>
          <Link href="/affiliate-disclosure" className="hover:text-[#1A56DB] transition-colors">
            Terms &amp; Conditions
          </Link>
          <span className="text-slate-300">|</span>
          <Link href="/contact" className="hover:text-[#1A56DB] transition-colors">
            Support
          </Link>
        </div>
      </div>
    </div>
  );
}
