import React from 'react';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import type { Metadata } from 'next';
import { getCardBySlug, API_BASE_URL } from '@/lib/api';
import { formatCurrency, getWhatsAppShareUrl } from '@/lib/utils';
import {
  Check,
  X,
  ShieldCheck,
  WhatsappLogo,
  ArrowSquareOut,
  Sparkle,
  ArrowLeft,
  IdentificationBadge,
  Gift,
  Scales,
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
    <div className="relative min-h-screen pb-20">
      {/* Background Soft Peach Ambient Glow Mesh matching Hero */}
      <div
        className="absolute -top-24 right-0 w-[650px] h-[550px] pointer-events-none -z-10"
        style={{
          background:
            'radial-gradient(circle at 75% 25%, rgba(254, 215, 170, 0.4) 0%, rgba(251, 146, 60, 0.15) 50%, transparent 70%)',
        }}
      />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pt-6 sm:pt-10 space-y-8">
        {/* Back to Catalog Breadcrumb */}
        <div>
          <Link
            href="/cards"
            className="inline-flex items-center gap-2 text-xs sm:text-sm font-bold text-slate-500 hover:text-[#0B0F17] transition-colors group"
          >
            <ArrowLeft size={16} weight="bold" className="group-hover:-translate-x-1 transition-transform" />
            <span>Back to credit card catalog</span>
          </Link>
        </div>

        {/* Main Card Hero Block with 3D/Hero Aesthetic - No Borders */}
        <div className="rounded-3xl bg-white p-6 sm:p-10 shadow-xl shadow-black/[0.03] relative overflow-hidden">
          <div className="flex flex-col lg:flex-row gap-8 items-center justify-between">
            
            {/* Card Information */}
            <div className="space-y-4 flex-1">
              {/* Badges */}
              <div className="flex flex-wrap items-center gap-2">
                <span className="text-xs font-semibold text-slate-700 bg-[#FAF7F2] px-3.5 py-1 rounded-full shadow-sm">
                  {card.bankName}
                </span>
                <span className="text-xs font-semibold text-[#9A3412] bg-[#FDE4CE] px-3.5 py-1 rounded-full shadow-sm">
                  {card.category}
                </span>
                {card.isFeatured && (
                  <span className="text-xs font-bold text-white bg-[#0B0F17] px-3.5 py-1 rounded-full flex items-center gap-1.5 shadow-md">
                    <Sparkle size={13} weight="fill" className="text-amber-400" />
                    <span>Featured Card</span>
                  </span>
                )}
              </div>

              {/* Title */}
              <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-[#0B0F17] tracking-tight leading-tight">
                {card.title}
              </h1>

              <p className="text-xs sm:text-sm text-slate-500 leading-relaxed font-normal">
                Verified card referral program with encrypted redirect directly to {card.bankName}&apos;s KYC portal.
              </p>
            </div>

            {/* Product Card Image with Hero Frame */}
            <div className="relative w-56 h-36 sm:w-64 sm:h-40 rounded-2xl overflow-hidden bg-gradient-to-br from-slate-900 to-slate-800 shadow-2xl shadow-black/15 flex-shrink-0 group hover:scale-105 transition-all duration-500">
              <Image
                src={card.imageUrl}
                alt={card.title}
                fill
                className="object-cover"
                priority
                sizes="(max-width: 768px) 224px, 256px"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent pointer-events-none" />
            </div>
          </div>

          {/* Fee Breakdown Biscuit Box matching Heybank 232K+ Box */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 p-5 sm:p-6 rounded-2xl bg-[#FDE4CE] mt-8 text-center sm:text-left shadow-sm">
            <div className="p-2 sm:pr-4">
              <span className="text-xs font-semibold text-[#92400E] block">Joining Fee</span>
              <span className="text-2xl font-black text-[#0B0F17] mt-1 block">
                {formatCurrency(card.joiningFee)}
              </span>
            </div>
            <div className="p-2 sm:px-4">
              <span className="text-xs font-semibold text-[#92400E] block">Annual Renewal Fee</span>
              <span className="text-2xl font-black text-[#0B0F17] mt-1 block">
                {formatCurrency(card.annualFee)}
              </span>
            </div>
            <div className="p-2 sm:pl-4">
              <span className="text-xs font-semibold text-[#92400E] block">Fee Waiver Milestone</span>
              <span className="text-xs sm:text-sm font-bold text-[#0B0F17] mt-1 block leading-snug">
                {card.feeWaiver || 'Standard terms apply'}
              </span>
            </div>
          </div>

          {/* CTA Action Row with Black Pill Button */}
          <div className="mt-8 flex flex-col sm:flex-row items-center gap-3">
            <a
              href={applyUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:flex-1 rounded-full bg-[#0B0F17] hover:bg-[#1E293B] active:scale-[0.98] text-white py-4 px-8 text-sm sm:text-base font-bold shadow-xl shadow-black/10 transition-all flex items-center justify-center gap-2 group"
            >
              <span>Apply Now on {card.bankName} Portal</span>
              <ArrowSquareOut size={18} weight="bold" className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </a>

            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto rounded-full bg-[#25D366] text-white hover:bg-[#20bd5a] active:scale-[0.98] transition-all px-6 py-4 text-sm font-bold flex items-center justify-center gap-2 shadow-md"
            >
              <WhatsappLogo size={20} weight="fill" />
              <span>Share on WhatsApp</span>
            </a>

            <Link
              href="/compare"
              className="w-full sm:w-auto rounded-full bg-white text-[#0B0F17] hover:bg-[#FAF7F2] active:scale-[0.98] transition-all px-6 py-4 text-sm font-bold text-center shadow-md flex items-center justify-center gap-1.5"
            >
              <Scales size={18} weight="bold" />
              <span>Compare Card</span>
            </Link>
          </div>
        </div>

        {/* Detailed Benefits Section */}
        <div className="rounded-3xl bg-white p-6 sm:p-8 shadow-xl shadow-black/[0.03] space-y-4">
          <div className="flex items-center gap-2 mb-2">
            <div className="w-8 h-8 rounded-full bg-[#0B0F17] text-white flex items-center justify-center shadow-sm">
              <Gift size={18} weight="fill" />
            </div>
            <h2 className="text-xl sm:text-2xl font-extrabold text-[#0B0F17]">
              Key Features &amp; Reward Highlights
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-2">
            {card.benefits.map((benefit, i) => (
              <div
                key={i}
                className="flex items-start gap-3 p-4 rounded-2xl bg-[#FAF7F2] hover:bg-[#F5F2EB] shadow-sm transition-colors"
              >
                <div className="w-5 h-5 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <Check size={12} weight="bold" />
                </div>
                <p className="text-xs sm:text-sm text-slate-800 font-medium leading-relaxed">{benefit}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Pros & Cons Section matching Hero contrast */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Pros */}
          <div className="rounded-3xl bg-white p-6 sm:p-7 space-y-4 shadow-xl shadow-black/[0.03]">
            <div className="flex items-center gap-2 text-emerald-800 font-bold text-base sm:text-lg">
              <div className="w-6 h-6 rounded-full bg-emerald-600 text-white flex items-center justify-center text-xs font-bold">
                <Check size={14} weight="bold" />
              </div>
              <h3>What We Like (Pros)</h3>
            </div>
            <ul className="space-y-2.5 text-xs sm:text-sm text-slate-800 font-medium">
              {card.pros.map((pro, i) => (
                <li key={i} className="flex items-start gap-2.5">
                  <span className="text-emerald-600 font-bold">•</span>
                  <span>{pro}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Cons */}
          <div className="rounded-3xl bg-white p-6 sm:p-7 space-y-4 shadow-xl shadow-black/[0.03]">
            <div className="flex items-center gap-2 text-rose-800 font-bold text-base sm:text-lg">
              <div className="w-6 h-6 rounded-full bg-rose-200 text-rose-700 flex items-center justify-center text-xs font-black">
                <X size={14} weight="bold" />
              </div>
              <h3>Points to Consider (Cons)</h3>
            </div>
            <ul className="space-y-2.5 text-xs sm:text-sm text-slate-700">
              {card.cons.map((con, i) => (
                <li key={i} className="flex items-start gap-2.5">
                  <span className="text-rose-500 font-bold">•</span>
                  <span>{con}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Eligibility Criteria */}
        <div className="rounded-3xl bg-white p-6 sm:p-8 shadow-xl shadow-black/[0.03] space-y-4">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-[#0B0F17] text-white flex items-center justify-center shadow-sm">
              <IdentificationBadge size={18} weight="bold" />
            </div>
            <h2 className="text-xl sm:text-2xl font-extrabold text-[#0B0F17]">
              Eligibility Criteria
            </h2>
          </div>
          <div className="space-y-2.5 text-xs sm:text-sm text-slate-700 pt-1">
            {card.eligibility.length > 0 ? (
              card.eligibility.map((el, i) => (
                <div key={i} className="flex items-start gap-2.5 p-3.5 rounded-xl bg-[#FAF7F2] shadow-sm">
                  <div className="w-4 h-4 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <Check size={10} weight="bold" />
                  </div>
                  <span className="font-medium text-slate-800">{el}</span>
                </div>
              ))
            ) : (
              <p className="text-slate-500">
                Standard bank requirements apply: Indian resident, minimum age 21 years with verified monthly income.
              </p>
            )}
          </div>
        </div>

        {/* Trust & Application Notice */}
        <div className="p-5 rounded-2xl bg-[#F5F2EB] text-xs sm:text-sm text-slate-700 flex items-start gap-3 shadow-sm">
          <ShieldCheck size={26} weight="fill" className="text-[#0B0F17] flex-shrink-0 mt-0.5" />
          <p>
            <strong className="text-[#0B0F17] font-bold">100% Secure Direct Bank Referral:</strong> Clicking Apply Now opens the official encrypted application page hosted on {card.bankName}&apos;s secure servers. Credit Mitra never collects Aadhaar, OTPs, or financial login credentials.
          </p>
        </div>
      </div>
    </div>
  );
}
