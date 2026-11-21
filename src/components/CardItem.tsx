'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Card } from '@/types/card';
import { useCompare } from '@/context/CompareContext';
import { formatCurrency, getWhatsAppShareUrl } from '@/lib/utils';
import { API_BASE_URL } from '@/lib/api';
import {
  CheckCircle,
  Scales,
  WhatsappLogo,
  ArrowSquareOut,
  Sparkle,
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
    <div className="group relative rounded-2xl border border-neutral-200 bg-white p-5 shadow-sm hover:shadow-md transition-all duration-300 flex flex-col justify-between">
      {/* Top Header: Bank Badge & Featured Tag */}
      <div>
        <div className="flex items-center justify-between gap-2 mb-3">
          <span className="caption-3 font-semibold text-neutral-600 bg-neutral-100 px-2 py-0.5 rounded-md">
            {card.bankName}
          </span>
          <div className="flex items-center gap-1.5">
            {card.isFeatured && (
              <span className="caption-3 font-semibold text-amber-800 bg-amber-50 border border-amber-200/60 px-2 py-0.5 rounded-md flex items-center gap-1">
                <Sparkle size={12} weight="fill" className="text-amber-600" />
                Featured
              </span>
            )}
            <span className="caption-4 font-medium text-blue-700 bg-blue-50 px-2 py-0.5 rounded-md">
              {card.category}
            </span>
          </div>
        </div>

        {/* Card Image & Title */}
        <div className="flex gap-4 items-center mb-4">
          <div className="relative w-24 h-16 rounded-xl overflow-hidden bg-neutral-100 flex-shrink-0 border border-neutral-200/60">
            <Image
              src={card.imageUrl}
              alt={card.title}
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-500 ease-brand-base"
              sizes="(max-width: 768px) 96px, 120px"
            />
          </div>
          <div>
            <Link
              href={`/cards/${card.slug}`}
              className="title-3 font-semibold text-neutral-900 group-hover:text-blue-600 transition-colors line-clamp-2"
            >
              {card.title}
            </Link>
            <p className="caption-2 text-neutral-500 mt-0.5">
              Annual Fee: {formatCurrency(card.annualFee)}
            </p>
          </div>
        </div>

        {/* Fee Badges */}
        <div className="grid grid-cols-2 gap-2 p-2.5 rounded-xl bg-neutral-50 border border-neutral-100 mb-4 text-center">
          <div>
            <span className="caption-5 text-neutral-500 block">Joining Fee</span>
            <span className="title-4 font-semibold text-neutral-800">
              {formatCurrency(card.joiningFee)}
            </span>
          </div>
          <div>
            <span className="caption-5 text-neutral-500 block">Renewal Fee</span>
            <span className="title-4 font-semibold text-neutral-800">
              {formatCurrency(card.annualFee)}
            </span>
          </div>
        </div>

        {/* Top Benefits */}
        <div className="space-y-1.5 mb-5">
          {card.benefits.slice(0, 2).map((benefit, i) => (
            <div key={i} className="flex items-start gap-2 text-xs text-neutral-600">
              <CheckCircle size={15} weight="fill" className="text-blue-600 flex-shrink-0 mt-0.5" />
              <span className="line-clamp-2">{benefit}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Action Footer */}
      <div className="pt-3 border-t border-neutral-100 flex flex-col gap-2">
        <div className="flex items-center gap-2">
          {/* Apply Now Primary CTA */}
          <a
            href={applyUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 button-md text-center rounded-xl bg-blue-600 text-white hover:bg-blue-700 active:scale-[0.98] transition-all flex items-center justify-center gap-1.5 font-semibold shadow-sm"
          >
            <span>Apply Now</span>
            <ArrowSquareOut size={16} weight="bold" />
          </a>

          {/* WhatsApp Share */}
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Share card on WhatsApp"
            className="p-2.5 rounded-xl border border-neutral-200 text-emerald-600 hover:bg-emerald-50 active:scale-[0.98] transition-colors"
          >
            <WhatsappLogo size={18} weight="fill" />
          </a>
        </div>

        <div className="flex items-center justify-between text-xs pt-1">
          {/* Card Details Link */}
          <Link
            href={`/cards/${card.slug}`}
            className="font-medium text-neutral-600 hover:text-blue-600 hover:underline"
          >
            View full details & perks
          </Link>

          {/* Add to Compare Toggle */}
          <button
            type="button"
            onClick={handleCompareClick}
            className={`flex items-center gap-1 px-2 py-1 rounded-md transition-colors font-medium ${compared
                ? 'bg-blue-50 text-blue-600 font-semibold'
                : 'text-neutral-500 hover:text-neutral-900'
              }`}
          >
            <Scales size={14} weight={compared ? 'fill' : 'regular'} />
            <span>{compared ? 'Comparing' : 'Compare'}</span>
          </button>
        </div>
      </div>
    </div>
  );
}
