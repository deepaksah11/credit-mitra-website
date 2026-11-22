'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { Card } from '@/types/card';
import { formatCurrency } from '@/lib/utils';
import { API_BASE_URL } from '@/lib/api';
import { useCompare } from '@/context/CompareContext';
import {
  Scales,
  Lightning,
  X,
  ArrowRight,
  ArrowSquareOut,
  Eye,
  Check,
  Star,
  Bank,
  ShareNetwork,
} from '@phosphor-icons/react';
import {
  HdfcBankLogo,
  SbiCardLogo,
  IciciBankLogo,
  AxisBankLogo,
  IdfcBankLogo,
} from './BankLogos';

interface CardDetailStickyActionsProps {
  currentCard: Card;
  otherCards: Card[];
}

function BankBadge({ bankName }: { bankName: string }) {
  const lower = (bankName || '').toLowerCase();
  if (lower.includes('hdfc')) return <HdfcBankLogo className="h-4" />;
  if (lower.includes('sbi')) return <SbiCardLogo className="h-4" />;
  if (lower.includes('icici')) return <IciciBankLogo className="h-4" />;
  if (lower.includes('axis')) return <AxisBankLogo className="h-4" />;
  if (lower.includes('idfc')) return <IdfcBankLogo className="h-4" />;
  return (
    <div className="flex items-center gap-1 font-bold text-[#0B0F17] text-xs">
      <Bank size={14} weight="fill" className="text-[#1A56DB]" />
      <span>{bankName}</span>
    </div>
  );
}

export default function CardDetailStickyActions({
  currentCard,
  otherCards = [],
}: CardDetailStickyActionsProps) {
  const router = useRouter();
  const { addToCompare, clearCompare } = useCompare();
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [copied, setCopied] = useState(false);

  // Handle comparing current card with another selected card
  const handleCompareWith = (otherCard: Card) => {
    clearCompare();
    addToCompare(currentCard);
    addToCompare(otherCard);
    setDrawerOpen(false);
    router.push('/compare');
  };

  // Handle sharing current card link
  const handleShare = async () => {
    const url = typeof window !== 'undefined'
      ? `${window.location.origin}/credit-cards?card=${currentCard.slug}`
      : `https://wegeti.com/credit-cards?card=${currentCard.slug}`;

    if (typeof navigator !== 'undefined' && navigator.share) {
      try {
        await navigator.share({
          title: `${currentCard.title} — Credit-Mitra`,
          text: `Check out ${currentCard.title} on Credit-Mitra!`,
          url: url,
        });
        return;
      } catch {
        // Fallback to clipboard
      }
    }

    if (typeof navigator !== 'undefined' && navigator.clipboard) {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    }
  };

  return (
    <>
      {/* ======================================================== */}
      {/* 1. STICKY BOTTOM ACTIONS BAR (Mobile-First, Always Visible) */}
      {/* ======================================================== */}
      <div className="fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-md border-t border-slate-200/80 shadow-[0_-8px_30px_rgba(0,0,0,0.12)] px-4 py-3 sm:py-4">
        <div className="max-w-xl mx-auto flex items-center gap-2.5 sm:gap-3">
          
          {/* Share Button (Compact icon) */}
          <button
            type="button"
            onClick={handleShare}
            title="Share card"
            className="p-3.5 rounded-full bg-[#FAF7F2] hover:bg-[#EAE4D9] text-slate-700 active:scale-95 transition-all flex items-center justify-center flex-shrink-0 border border-slate-200/80 shadow-2xs"
            aria-label="Share card link"
          >
            <ShareNetwork size={18} weight="bold" />
          </button>

          {/* Compare Button */}
          <button
            type="button"
            onClick={() => setDrawerOpen(true)}
            className="flex-1 py-3.5 px-3 sm:px-5 rounded-full bg-[#FAF7F2] hover:bg-[#EAE4D9] text-[#0B0F17] font-bold text-xs sm:text-sm tracking-wider flex items-center justify-center gap-1.5 sm:gap-2 active:scale-95 transition-all border border-slate-200/80 shadow-2xs uppercase whitespace-nowrap"
          >
            <Scales size={18} weight="bold" className="text-[#0B0F17] flex-shrink-0" />
            <span>Compare</span>
          </button>

          {/* Apply Now Button (Direct Bank Referral, No Backend Dependency) */}
          <a
            href={currentCard.referralUrl || '#'}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 py-3.5 px-3 sm:px-6 rounded-full bg-[#0B0F17] hover:bg-black active:scale-95 text-white font-bold text-xs sm:text-sm tracking-widest flex items-center justify-center gap-2 shadow-xl shadow-black/25 transition-all uppercase whitespace-nowrap"
          >
            <Lightning size={16} weight="fill" className="text-amber-300 flex-shrink-0" />
            <span>Apply Now</span>
          </a>
        </div>

        {/* Share Copied Toast */}
        {copied && (
          <div className="absolute -top-10 left-1/2 -translate-x-1/2 bg-[#0B0F17] text-white text-xs font-bold px-4 py-1.5 rounded-full shadow-lg animate-in fade-in slide-in-from-bottom-2 duration-150">
            Link copied! Ready to share.
          </div>
        )}
      </div>

      {/* ======================================================== */}
      {/* 2. SLIDE-UP COMPARE DRAWER (Mobile-First Sheet) */}
      {/* ======================================================== */}
      {drawerOpen && (
        <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center animate-in fade-in duration-200">
          
          {/* Backdrop */}
          <div
            className="fixed inset-0 bg-black/60 backdrop-blur-xs transition-opacity"
            onClick={() => setDrawerOpen(false)}
          />

          {/* Drawer / Modal Container */}
          <div className="relative z-10 w-full sm:max-w-lg max-h-[85vh] bg-white rounded-t-[32px] sm:rounded-[32px] shadow-2xl flex flex-col overflow-hidden animate-in slide-in-from-bottom duration-300">
            
            {/* Top Handle on Mobile */}
            <div className="pt-3 pb-1 flex justify-center sm:hidden">
              <div className="w-12 h-1.5 rounded-full bg-slate-300" />
            </div>

            {/* Header */}
            <div className="px-5 py-4 border-b border-slate-100 flex items-center justify-between">
              <div>
                <h3 className="text-base sm:text-lg font-black text-[#0B0F17]">
                  Compare Credit Cards
                </h3>
                <p className="text-xs text-slate-500 font-medium">
                  Select a card to compare side-by-side with {currentCard.title}:
                </p>
              </div>
              <button
                type="button"
                onClick={() => setDrawerOpen(false)}
                className="p-2 rounded-full hover:bg-slate-100 text-slate-600 transition-colors"
                aria-label="Close compare drawer"
              >
                <X size={20} weight="bold" />
              </button>
            </div>

            {/* List of Other Cards to Compare With */}
            <div className="p-4 sm:p-5 overflow-y-auto space-y-3 divide-y divide-slate-100/60 max-h-[60vh]">
              {otherCards.map((card) => (
                <div
                  key={card._id}
                  className="pt-3 first:pt-0 flex items-center justify-between gap-3 group"
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <div className="relative w-16 h-10 rounded-lg overflow-hidden shadow-xs flex-shrink-0 bg-slate-900">
                      {card.imageUrl ? (
                        <Image src={card.imageUrl} alt={card.title} fill className="object-cover" sizes="64px" />
                      ) : (
                        <div className="w-full h-full bg-slate-900" />
                      )}
                    </div>
                    <div className="min-w-0">
                      <span className="text-[10px] font-bold text-slate-400 block uppercase leading-none mb-0.5">
                        {card.bankName}
                      </span>
                      <h4 className="text-xs sm:text-sm font-extrabold text-[#0B0F17] truncate leading-tight">
                        {card.title}
                      </h4>
                      <span className="text-[11px] font-semibold text-slate-500 block leading-none mt-1">
                        Fee: {formatCurrency(card.annualFee)}/yr
                      </span>
                    </div>
                  </div>

                  {/* 1-Tap Compare Button (Black Pill Button) */}
                  <button
                    type="button"
                    onClick={() => handleCompareWith(card)}
                    className="whitespace-nowrap px-4 py-2 rounded-full bg-[#0B0F17] hover:bg-black text-white text-xs font-bold tracking-wider flex items-center gap-1.5 shadow-md shadow-black/20 uppercase active:scale-95 transition-all flex-shrink-0"
                  >
                    <span>Compare</span>
                    <ArrowRight size={13} weight="bold" />
                  </button>
                </div>
              ))}
            </div>

            {/* Footer option to go to full comparison page */}
            <div className="p-4 bg-[#FAF7F2] border-t border-slate-100 flex items-center justify-between">
              <span className="text-xs text-slate-500 font-medium">Or view comparison table</span>
              <button
                type="button"
                onClick={() => {
                  addToCompare(currentCard);
                  setDrawerOpen(false);
                  router.push('/compare');
                }}
                className="text-xs font-bold text-[#1A56DB] hover:underline flex items-center gap-1"
              >
                <span>Open Full Comparison Tool</span>
                <ArrowRight size={13} weight="bold" />
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
