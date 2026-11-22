import React from 'react';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import type { Metadata } from 'next';
import { getCardBySlug, getCards, API_BASE_URL } from '@/lib/api';
import { formatCurrency, getWhatsAppShareUrl } from '@/lib/utils';
import CardDetailStickyActions from '@/components/CardDetailStickyActions';
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
  Eye,
  Lightning,
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
  const [card, allCardsRes] = await Promise.all([
    getCardBySlug(params.slug),
    getCards({ limit: 30 }),
  ]);

  if (!card) {
    notFound();
  }

  const otherCards = (allCardsRes.data || []).filter((c) => c.slug !== params.slug);
  const applyUrl = card.referralUrl || '#';
  const whatsappUrl = getWhatsAppShareUrl(card.title, card.slug);

  return (
    <div className="relative min-h-screen pb-32 sm:pb-36 bg-[#FAF7F2]">
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
        <div className="flex items-center justify-between">
          <Link
            href="/credit-cards"
            className="inline-flex items-center gap-2 text-xs sm:text-sm font-bold text-slate-500 hover:text-[#0B0F17] transition-colors group"
          >
            <ArrowLeft size={16} weight="bold" className="group-hover:-translate-x-1 transition-transform" />
            <span>Back to credit cards</span>
          </Link>
          <span className="text-xs font-semibold text-slate-400">
            {card.bankName}
          </span>
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
                <span className="text-xs font-semibold text-[#1A56DB] bg-[#EFF6FF] px-3.5 py-1 rounded-full shadow-sm">
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
                Verified card referral program with encrypted redirect directly to {card.bankName}&apos;s official KYC portal.
              </p>
            </div>

            {/* Product Card Image with Hero Frame */}
            <div className="relative w-56 h-36 sm:w-64 sm:h-40 rounded-2xl overflow-hidden bg-gradient-to-br from-slate-900 to-slate-800 shadow-2xl shadow-black/15 flex-shrink-0 group hover:scale-105 transition-all duration-500">
              {card.imageUrl ? (
                <Image
                  src={card.imageUrl}
                  alt={card.title}
                  fill
                  className="object-cover"
                  priority
                  sizes="(max-width: 768px) 224px, 256px"
                />
              ) : (
                <div className="w-full h-full bg-slate-900" />
              )}
              <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent pointer-events-none" />
            </div>
          </div>

          {/* Fee Breakdown Box */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 p-5 sm:p-6 rounded-2xl bg-[#FAF7F2] mt-8 text-center sm:text-left shadow-sm">
            <div className="p-2 sm:pr-4">
              <span className="text-xs font-semibold text-slate-500 block uppercase tracking-wider">Joining Fee</span>
              <span className="text-2xl font-black text-[#0B0F17] mt-1 block">
                {formatCurrency(card.joiningFee)}
              </span>
            </div>
            <div className="p-2 sm:px-4">
              <span className="text-xs font-semibold text-slate-500 block uppercase tracking-wider">Annual Renewal Fee</span>
              <span className="text-2xl font-black text-[#0B0F17] mt-1 block">
                {formatCurrency(card.annualFee)}
              </span>
            </div>
            <div className="p-2 sm:pl-4">
              <span className="text-xs font-semibold text-slate-500 block uppercase tracking-wider">Fee Waiver Milestone</span>
              <span className="text-xs sm:text-sm font-bold text-[#0B0F17] mt-1 block leading-snug">
                {card.feeWaiver || 'Standard terms apply'}
              </span>
            </div>
          </div>

          {/* CTA Action Row */}
          <div className="mt-8 flex flex-col sm:flex-row items-center gap-3">
            <a
              href={applyUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:flex-1 rounded-full bg-[#0B0F17] hover:bg-black active:scale-95 text-white py-4 px-8 text-xs sm:text-sm font-bold tracking-widest shadow-xl hover:shadow-2xl transition-all uppercase flex items-center justify-center gap-2 group"
            >
              <span>Apply Now on {card.bankName} Portal</span>
              <ArrowSquareOut size={18} weight="bold" className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </a>

            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto rounded-full bg-[#25D366] text-white hover:bg-[#20bd5a] active:scale-[0.98] transition-all px-6 py-3.5 sm:py-4 text-sm font-bold flex items-center justify-center gap-2 shadow-md"
            >
              <WhatsappLogo size={20} weight="fill" />
              <span>Share on WhatsApp</span>
            </a>
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
        <div className="p-5 rounded-2xl bg-white text-xs sm:text-sm text-slate-700 flex items-start gap-3 shadow-sm border border-slate-200/60">
          <ShieldCheck size={26} weight="fill" className="text-[#1A56DB] flex-shrink-0 mt-0.5" />
          <p>
            <strong className="text-[#0B0F17] font-bold">100% Secure Direct Bank Referral:</strong> Clicking Apply Now opens the official encrypted application page hosted on {card.bankName}&apos;s secure servers. Credit Mitra never collects Aadhaar, OTPs, or financial login credentials.
          </p>
        </div>

        {/* ======================================================== */}
        {/* MORE CREDIT CARDS TO EXPLORE (User Request) */}
        {/* ======================================================== */}
        {otherCards.length > 0 && (
          <section aria-label="More Credit Cards" className="pt-4 space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-lg sm:text-2xl font-black text-[#0B0F17]">
                  More Credit Cards to Explore
                </h2>
                <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
                  Popular alternatives and high-reward cards in India
                </p>
              </div>
              <Link
                href="/credit-cards"
                className="text-xs sm:text-sm font-bold text-[#1A56DB] hover:underline whitespace-nowrap"
              >
                View All &rarr;
              </Link>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {otherCards.slice(0, 6).map((otherCard) => {
                const otherApplyUrl = otherCard.referralUrl || '#';
                const otherDetailUrl = `/cards/${otherCard.slug}`;

                return (
                  <div
                    key={otherCard._id}
                    className="rounded-2xl bg-white p-4 shadow-md hover:shadow-xl transition-all duration-200 flex flex-col justify-between group border border-slate-100"
                  >
                    <div className="space-y-3">
                      <div className="flex items-center justify-between gap-2">
                        <span className="text-[10px] font-bold text-slate-500 bg-[#FAF7F2] px-2 py-0.5 rounded-md">
                          {otherCard.bankName}
                        </span>
                        <span className="text-[10px] font-bold text-[#1A56DB] bg-[#EFF6FF] px-2 py-0.5 rounded-full">
                          {otherCard.category}
                        </span>
                      </div>

                      <div className="flex items-center gap-3">
                        <div className="relative w-16 h-10 rounded-lg overflow-hidden shadow-xs flex-shrink-0 bg-slate-900 group-hover:scale-105 transition-transform">
                          {otherCard.imageUrl ? (
                            <Image
                              src={otherCard.imageUrl}
                              alt={otherCard.title}
                              fill
                              className="object-cover"
                              sizes="64px"
                            />
                          ) : (
                            <div className="w-full h-full bg-slate-900" />
                          )}
                        </div>
                        <div className="min-w-0">
                          <h3 className="text-xs sm:text-sm font-black text-[#0B0F17] truncate group-hover:text-[#1A56DB] transition-colors">
                            {otherCard.title}
                          </h3>
                          <span className="text-[11px] font-semibold text-slate-500 block mt-0.5">
                            Annual: {formatCurrency(otherCard.annualFee)}
                          </span>
                        </div>
                      </div>
                    </div>

                    <div className="mt-3 pt-3 border-t border-slate-100 grid grid-cols-2 gap-2">
                      <Link
                        href={otherDetailUrl}
                        className="py-2.5 px-3 rounded-full bg-[#FAF7F2] hover:bg-[#EAE4D9] text-[#0B0F17] text-xs font-bold tracking-wider flex items-center justify-center gap-1 active:scale-95 transition-all text-center uppercase border border-slate-200/60"
                      >
                        <Eye size={13} weight="bold" />
                        <span>Details</span>
                      </Link>

                      <a
                        href={otherApplyUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="py-2.5 px-3 rounded-full bg-[#0B0F17] hover:bg-black text-white text-xs font-bold tracking-wider flex items-center justify-center gap-1 active:scale-95 transition-all text-center uppercase shadow-md shadow-black/15"
                      >
                        <Lightning size={13} weight="fill" className="text-amber-300" />
                        <span>Apply</span>
                      </a>
                    </div>
                  </div>
                );
              })}
            </div>
          </section>
        )}
      </div>

      {/* ======================================================== */}
      {/* STICKY BOTTOM ACTIONS BAR & COMPARE DRAWER (Mobile-First) */}
      {/* ======================================================== */}
      <CardDetailStickyActions
        currentCard={card}
        otherCards={otherCards}
      />
    </div>
  );
}
