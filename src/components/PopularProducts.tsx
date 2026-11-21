import React from 'react';
import Link from 'next/link';
import { ArrowRight, Gift, Tag, ShoppingCart } from '@phosphor-icons/react/dist/ssr';
import { HdfcBankLogo, SbiCardLogo, IciciBankLogo, AxisBankLogo } from './BankLogos';
import MiniCardMockup from './MiniCardMockup';

interface PopularCardItem {
  id: string;
  slug: string;
  title: string;
  subtitle: string;
  badge: {
    text: string;
    icon: React.ReactNode;
    colorClass: string;
  };
  bankLogo: React.ReactNode;
  mockupType: 'hdfc-millennia' | 'sbi-simplysave' | 'amazon-pay-icici' | 'axis-flipkart';
}

export default function PopularProducts() {
  const cards: PopularCardItem[] = [
    {
      id: 'hdfc-millennia',
      slug: 'hdfc-bank-regalia-gold-credit-card',
      title: 'HDFC Millennia Card',
      subtitle: 'Great rewards on shopping & dining',
      badge: {
        text: 'Up to 5X Rewards',
        icon: <Gift size={13} weight="fill" className="text-blue-600" />,
        colorClass: 'bg-[#EFF6FF] text-[#1E40AF]',
      },
      bankLogo: <HdfcBankLogo />,
      mockupType: 'hdfc-millennia',
    },
    {
      id: 'sbi-simplysave',
      slug: 'cashback-sbi-card',
      title: 'SBI SimplySAVE',
      subtitle: 'Save more on everyday spends',
      badge: {
        text: 'Lifetime Free',
        icon: <Gift size={13} weight="fill" className="text-blue-600" />,
        colorClass: 'bg-[#EFF6FF] text-[#1E40AF]',
      },
      bankLogo: <SbiCardLogo />,
      mockupType: 'sbi-simplysave',
    },
    {
      id: 'icici-amazon-pay',
      slug: 'amazon-pay-icici-bank-credit-card',
      title: 'ICICI Amazon Pay Card',
      subtitle: 'Get 5% cashback on Amazon',
      badge: {
        text: '5% Cashback',
        icon: <Tag size={13} weight="fill" className="text-amber-600" />,
        colorClass: 'bg-[#FEF3C7] text-[#92400E]',
      },
      bankLogo: <IciciBankLogo />,
      mockupType: 'amazon-pay-icici',
    },
    {
      id: 'axis-flipkart',
      slug: 'flipkart-axis-bank-credit-card',
      title: 'Axis Flipkart Card',
      subtitle: 'Extra rewards on Flipkart',
      badge: {
        text: '10X Rewards',
        icon: <ShoppingCart size={13} weight="fill" className="text-blue-600" />,
        colorClass: 'bg-[#EFF6FF] text-[#1E40AF]',
      },
      bankLogo: <AxisBankLogo />,
      mockupType: 'axis-flipkart',
    },
  ];

  return (
    <section className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-2 md:pt-4">
      {/* Section Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-7 gap-3">
        <div>
          {/* Subtitle Dash + Text matching Heybank style */}
          <div className="flex items-center gap-2.5 mb-2">
            <span className="w-8 h-0.5 bg-[#0B0F17] rounded-full" />
            <span className="text-xs sm:text-sm font-extrabold text-[#0B0F17] tracking-wider uppercase">
              Popular Products
            </span>
          </div>
          {/* Main Title */}
          <h2 className="text-2xl sm:text-[32px] font-black text-[#0B0F17] tracking-tight">
            Find the Right Card for You
          </h2>
        </div>

        {/* View All Link with Black Accent */}
        <Link
          href="/cards"
          className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-bold text-[#0B0F17] hover:text-[#1A56DB] transition-colors group self-start sm:self-auto"
        >
          <span>View All Cards</span>
          <ArrowRight size={15} weight="bold" className="group-hover:translate-x-1 transition-transform" />
        </Link>
      </div>

      {/* 4 Cards Grid - NO BORDERS, Elevated Surfaces with Soft Shadows */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {cards.map((card) => (
          <div
            key={card.id}
            className="group relative bg-white rounded-3xl p-5 sm:p-6 shadow-xl shadow-black/[0.03] hover:shadow-2xl hover:shadow-black/10 hover:-translate-y-1.5 transition-all duration-500 flex flex-col justify-between"
          >
            {/* Top Bank Logo */}
            <div className="mb-4 flex items-center justify-between">
              {card.bankLogo}
            </div>

            {/* Middle: Mini Card Preview + Details */}
            <div className="flex items-center gap-3.5 mb-5">
              {/* Realistic Mini Card Mockup */}
              <MiniCardMockup type={card.mockupType} />

              {/* Title & Subtitle */}
              <div className="min-w-0 flex-1">
                <Link
                  href={`/cards/${card.slug}`}
                  className="font-bold text-[14px] text-[#0B0F17] group-hover:text-[#1A56DB] transition-colors line-clamp-1 block leading-snug"
                >
                  {card.title}
                </Link>
                <p className="text-[12px] text-slate-500 mt-1 line-clamp-2 leading-relaxed font-normal">
                  {card.subtitle}
                </p>
              </div>
            </div>

            {/* Bottom Row: Highlight Badge & Circular Black Arrow Button */}
            <div className="flex items-center justify-between pt-1">
              {/* Badge Pill (NO BORDERS) */}
              <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-bold ${card.badge.colorClass}`}>
                {card.badge.icon}
                <span>{card.badge.text}</span>
              </span>

              {/* Black Circular Arrow Button matching Hero */}
              <Link
                href={`/cards/${card.slug}`}
                aria-label={`View ${card.title} details`}
                className="w-8 h-8 rounded-full bg-[#0B0F17] hover:bg-black text-white flex items-center justify-center shadow-md group-hover:scale-110 active:scale-95 transition-all flex-shrink-0"
              >
                <ArrowRight size={13} weight="bold" />
              </Link>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
