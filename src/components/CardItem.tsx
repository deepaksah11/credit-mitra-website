'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Card } from '@/types/card';
import { useCompare } from '@/context/CompareContext';
import { formatCurrency, getWhatsAppShareUrl } from '@/lib/utils';
import { API_BASE_URL } from '@/lib/api';
import {
  Check,
  Scales,
  WhatsappLogo,
  ArrowSquareOut,
  Sparkle,
  ArrowRight,
} from '@phosphor-icons/react';

interface CardItemProps {
  card: Card;
}

export default function CardItem({ card }: CardItemProps) {
  const { isInCompare, addToCompare, removeFromCompare } = useCompare();
  const compared = isInCompare(card._id);

  const handleCompareClick = () => {
    if (compared) {
      removeFromCompare(card._id);
    } else {
      addToCompare(card);
    }
  };

  const applyUrl = `${API_BASE_URL}/go/${card.slug}`;
  const whatsappUrl = getWhatsAppShareUrl(card.title, card.slug);

  return (
    <div className="group relative rounded-3xl bg-white p-6 shadow-xl shadow-black/[0.03] hover:shadow-2xl hover:shadow-black/10 hover:-translate-y-1.5 transition-all duration-500 flex flex-col justify-between overflow-hidden">
      
      {/* Card Body */}
      <div>
        {/* Top Badges (NO BORDERS) */}
        <div className="flex items-center justify-between gap-2 mb-4 flex-wrap">
          <span className="text-xs font-bold text-slate-800 bg-[#F5F2EB] px-3 py-1 rounded-full">
            {card.bankName}
          </span>
          <div className="flex items-center gap-1.5 flex-wrap">
            {card.isFeatured && (
              <span className="text-xs font-bold text-amber-900 bg-[#FEF3C7] px-3 py-1 rounded-full flex items-center gap-1 shadow-xs">
                <Sparkle size={12} weight="fill" className="text-amber-500" />
                <span>Featured</span>
              </span>
            )}
            <span className="text-xs font-bold text-[#1A56DB] bg-[#EFF6FF] px-3 py-1 rounded-full">
              {card.category}
            </span>
          </div>
        </div>

        {/* Card Mockup Image & Title */}
        <div className="flex gap-4 items-center mb-5">
          <div className="relative w-24 h-16 sm:w-28 sm:h-18 rounded-2xl overflow-hidden bg-gradient-to-br from-slate-900 to-slate-800 flex-shrink-0 shadow-md group-hover:scale-105 transition-transform duration-500">
            <Image
              src={card.imageUrl}
              alt={card.title}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 112px, 128px"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/25 via-transparent to-transparent pointer-events-none" />
          </div>
          <div className="min-w-0 flex-1">
            <Link
              href={`/cards/${card.slug}`}
              className="text-base font-extrabold text-[#0B0F17] group-hover:text-[#1A56DB] transition-colors line-clamp-2 leading-snug tracking-tight"
            >
              {card.title}
            </Link>
            <p className="text-xs text-slate-500 mt-1 font-medium">
              Annual Fee: <span className="font-bold text-slate-800">{formatCurrency(card.annualFee)}</span>
            </p>
          </div>
        </div>

        {/* Fee Breakdown Box on Warm Sand Tint (NO BORDERS) */}
        <div className="grid grid-cols-2 gap-2 p-3.5 rounded-2xl bg-[#FAF7F2] mb-5 text-center">
          <div className="pr-1">
            <span className="text-[11px] font-medium text-slate-500 block">Joining Fee</span>
            <span className="text-sm font-black text-[#0B0F17] mt-0.5 block">
              {formatCurrency(card.joiningFee)}
            </span>
          </div>
          <div className="pl-1">
            <span className="text-[11px] font-medium text-slate-500 block">Renewal Fee</span>
            <span className="text-sm font-black text-[#0B0F17] mt-0.5 block">
              {formatCurrency(card.annualFee)}
            </span>
          </div>
        </div>

        {/* Benefits Preview */}
        <div className="space-y-2 mb-6">
          {card.benefits.slice(0, 2).map((benefit, i) => (
            <div key={i} className="flex items-start gap-2.5 text-xs text-slate-600 font-medium">
              <div className="w-4 h-4 rounded-full bg-blue-50 text-[#1A56DB] flex items-center justify-center flex-shrink-0 mt-0.5">
                <Check size={10} weight="bold" />
              </div>
              <span className="line-clamp-2 leading-snug">{benefit}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Action Footer (NO BORDERS) */}
      <div className="pt-3 flex flex-col gap-3">
        <div className="flex items-center gap-2">
          {/* Apply Now Primary CTA - Black Pill matching Hero */}
          <a
            href={applyUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 rounded-full bg-[#0B0F17] hover:bg-black active:scale-95 text-white py-3 px-4 text-xs font-bold tracking-wider shadow-lg hover:shadow-xl transition-all flex items-center justify-center gap-1.5 uppercase group/btn"
          >
            <span>Apply Now</span>
            <ArrowSquareOut size={15} weight="bold" className="group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5 transition-transform" />
          </a>

          {/* WhatsApp Share Button */}
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Share card on WhatsApp"
            className="w-11 h-11 rounded-full bg-[#ECFDF5] text-emerald-700 hover:bg-emerald-100 active:scale-95 transition-all flex items-center justify-center flex-shrink-0 shadow-sm"
          >
            <WhatsappLogo size={19} weight="fill" />
          </a>
        </div>

        <div className="flex items-center justify-between text-xs pt-1">
          {/* Card Details Link */}
          <Link
            href={`/cards/${card.slug}`}
            className="font-bold text-slate-700 hover:text-black transition-colors flex items-center gap-1 group/link"
          >
            <span>View full perks</span>
            <ArrowRight size={12} weight="bold" className="group-hover/link:translate-x-0.5 transition-transform" />
          </Link>

          {/* Compare Toggle Pill (NO BORDERS) */}
          <button
            type="button"
            onClick={handleCompareClick}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs transition-all font-bold ${
              compared
                ? 'bg-blue-100 text-[#1A56DB] shadow-xs'
                : 'bg-[#FAF7F2] text-slate-700 hover:bg-[#F0EBE0] hover:text-black shadow-xs'
            }`}
          >
            <Scales size={13} weight={compared ? 'fill' : 'bold'} />
            <span>{compared ? 'In Compare' : 'Compare'}</span>
          </button>
        </div>
      </div>
    </div>
  );
}
