import React from 'react';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import type { Metadata } from 'next';
import { getCardBySlug, API_BASE_URL } from '@/lib/api';
import { formatCurrency, getWhatsAppShareUrl } from '@/lib/utils';
import {
  CheckCircle,
  XCircle,
  ShieldCheck,
  WhatsappLogo,
  ArrowSquareOut,
  Sparkle,
  ArrowLeft,
  IdentificationBadge,
} from '@phosphor-icons/react/dist/ssr';

interface CardDetailPageProps {
  params: {
    slug: string;
  };
}

export async function generateMetadata({ params }: CardDetailPageProps): Promise<Metadata> {
  const card = await getCardBySlug(params.slug);
  if (!card) {
    return {
      title: 'Card Not Found | Credit Mitra',
    };
  }

  return {
    title: `${card.title} — Review, Annual Fees & Benefits | Credit Mitra`,
    description: `Complete review of ${card.title} from ${card.bankName}. Annual fee: ${formatCurrency(
      card.annualFee
    )}. Top benefits: ${card.benefits.slice(0, 2).join(', ')}.`,
    openGraph: {
      title: `${card.title} — Benefits, Fees & Apply Online`,
      description: `Compare ${card.title} fees, lounge access, and rewards. Direct application on official bank portal.`,
      images: [
        {
          url: card.imageUrl,
          alt: card.title,
        },
      ],
    },
  };
}

export default async function CardDetailPage({ params }: CardDetailPageProps) {
  const card = await getCardBySlug(params.slug);

  if (!card) {
    notFound();
  }

  const applyUrl = `${API_BASE_URL}/go/${card.slug}`;
  const whatsappUrl = getWhatsAppShareUrl(card.title, card.slug);

  return (
    <div className="max-w-4xl mx-auto px-4 py-8 md:py-12 space-y-8">
      {/* Back to Catalog Breadcrumb */}
      <div>
        <Link
          href="/cards"
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-neutral-500 hover:text-teal-800 transition-colors"
        >
          <ArrowLeft size={16} weight="bold" />
          <span>Back to card directory</span>
        </Link>
      </div>

      {/* Main Card Hero Block */}
      <div className="rounded-2xl border border-neutral-200 bg-white p-6 md:p-8 shadow-sm">
        <div className="flex flex-col md:flex-row gap-6 items-start justify-between">
          <div className="space-y-3 flex-1">
            <div className="flex flex-wrap items-center gap-2">
              <span className="caption-3 font-semibold text-neutral-700 bg-neutral-100 px-2.5 py-1 rounded-md">
                {card.bankName}
              </span>
              <span className="caption-3 font-semibold text-teal-800 bg-teal-50 px-2.5 py-1 rounded-md">
                {card.category}
              </span>
              {card.isFeatured && (
                <span className="caption-3 font-semibold text-amber-800 bg-amber-50 border border-amber-200 px-2.5 py-1 rounded-md flex items-center gap-1">
                  <Sparkle size={12} weight="fill" className="text-amber-600" />
                  Featured Card
                </span>
              )}
            </div>

            <h1 className="heading-4 md:heading-3 font-bold text-neutral-900">
              {card.title}
            </h1>

            <p className="body-5 text-neutral-500">
              Official partner referral link provided directly by {card.bankName}.
            </p>
          </div>

          {/* Product Image */}
          <div className="relative w-44 h-28 rounded-2xl overflow-hidden bg-neutral-100 border border-neutral-200 shadow-sm flex-shrink-0">
            <Image
              src={card.imageUrl}
              alt={card.title}
              fill
              className="object-cover"
              priority
              sizes="(max-width: 768px) 176px, 200px"
            />
          </div>
        </div>

        {/* Fee Breakdown Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 p-4 rounded-xl bg-neutral-50 border border-neutral-100 mt-6">
          <div>
            <span className="caption-5 text-neutral-500 block">Joining Fee</span>
            <span className="title-3 font-bold text-neutral-900">
              {formatCurrency(card.joiningFee)}
            </span>
          </div>
          <div>
            <span className="caption-5 text-neutral-500 block">Annual Renewal Fee</span>
            <span className="title-3 font-bold text-neutral-900">
              {formatCurrency(card.annualFee)}
            </span>
          </div>
          <div>
            <span className="caption-5 text-neutral-500 block">Fee Waiver Term</span>
            <span className="body-6 text-neutral-700 font-medium block">
              {card.feeWaiver || 'Standard terms apply'}
            </span>
          </div>
        </div>

        {/* CTA Button Row */}
        <div className="mt-6 flex flex-col sm:flex-row items-center gap-3">
          <a
            href={applyUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full sm:flex-1 button-md text-center rounded-xl bg-teal-800 text-white hover:bg-teal-900 active:scale-[0.98] transition-all flex items-center justify-center gap-2 font-semibold shadow-md"
          >
            <span>Apply Now on {card.bankName} Portal</span>
            <ArrowSquareOut size={18} weight="bold" />
          </a>

          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full sm:w-auto button-md rounded-xl border border-neutral-200 text-emerald-700 hover:bg-emerald-50 active:scale-[0.98] transition-colors flex items-center justify-center gap-2 font-medium"
          >
            <WhatsappLogo size={20} weight="fill" />
            <span>Share on WhatsApp</span>
          </a>

          <Link
            href="/compare"
            className="w-full sm:w-auto button-md rounded-xl border border-neutral-200 text-neutral-700 hover:bg-neutral-50 active:scale-[0.98] transition-colors text-center font-medium"
          >
            Compare With Others
          </Link>
        </div>
      </div>

      {/* Detailed Benefits Section */}
      <div className="rounded-2xl border border-neutral-200 bg-white p-6 md:p-8 shadow-sm space-y-4">
        <h2 className="title-2 font-bold text-neutral-900">Key Features & Reward Highlights</h2>
        <div className="space-y-3">
          {card.benefits.map((benefit, i) => (
            <div key={i} className="flex items-start gap-3">
              <CheckCircle size={20} weight="fill" className="text-teal-700 flex-shrink-0 mt-0.5" />
              <p className="body-4 text-neutral-700">{benefit}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Pros & Cons Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Pros */}
        <div className="rounded-2xl border border-teal-200 bg-teal-50/40 p-6 space-y-3 shadow-sm">
          <h2 className="title-3 font-bold text-teal-900 flex items-center gap-2">
            <CheckCircle size={22} weight="fill" className="text-teal-700" />
            <span>What we like (Pros)</span>
          </h2>
          <ul className="space-y-2">
            {card.pros.map((pro, i) => (
              <li key={i} className="text-sm text-neutral-700 flex items-start gap-2">
                <span className="text-teal-700 font-bold">•</span>
                <span>{pro}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Cons */}
        <div className="rounded-2xl border border-rose-200 bg-rose-50/40 p-6 space-y-3 shadow-sm">
          <h2 className="title-3 font-bold text-rose-900 flex items-center gap-2">
            <XCircle size={22} weight="fill" className="text-rose-600" />
            <span>Points to consider (Cons)</span>
          </h2>
          <ul className="space-y-2">
            {card.cons.map((con, i) => (
              <li key={i} className="text-sm text-neutral-700 flex items-start gap-2">
                <span className="text-rose-500 font-bold">•</span>
                <span>{con}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Eligibility Criteria */}
      <div className="rounded-2xl border border-neutral-200 bg-white p-6 md:p-8 shadow-sm space-y-4">
        <h2 className="title-2 font-bold text-neutral-900 flex items-center gap-2">
          <IdentificationBadge size={24} weight="bold" className="text-teal-800" />
          <span>Eligibility Criteria</span>
        </h2>
        <div className="space-y-2 text-sm text-neutral-700">
          {card.eligibility.length > 0 ? (
            card.eligibility.map((el, i) => (
              <div key={i} className="flex items-start gap-2">
                <span className="text-neutral-400 font-bold">✓</span>
                <span>{el}</span>
              </div>
            ))
          ) : (
            <p className="text-neutral-500">
              Standard bank requirements apply: Indian resident, minimum age 21 years with verified monthly income.
            </p>
          )}
        </div>
      </div>

      {/* Trust & Application Notice */}
      <div className="p-4 rounded-xl border border-neutral-200 bg-neutral-50 text-xs text-neutral-500 flex items-start gap-3">
        <ShieldCheck size={24} weight="fill" className="text-teal-700 flex-shrink-0" />
        <p>
          <strong className="text-neutral-700">Security Guarantee:</strong> Clicking Apply Now opens the official encrypted bank application portal. We never ask for OTPs, bank credentials, or government ID uploads.
        </p>
      </div>
    </div>
  );
}
