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
        colorClass: 'bg-[#EFF6FF] text-[#1E40AF] border border-[#DBEAFE]',
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
        colorClass: 'bg-[#EFF6FF] text-[#1E40AF] border border-[#DBEAFE]',
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
        colorClass: 'bg-[#FEF3C7] text-[#92400E] border border-[#FDE68A]',
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
        colorClass: 'bg-[#EFF6FF] text-[#1E40AF] border border-[#DBEAFE]',
      },
      bankLogo: <AxisBankLogo />,
      mockupType: 'axis-flipkart',
    },
  ];

  return (
    <section className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-10 md:pt-14">
      {/* Section Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-6 gap-3">
        <div>
          {/* Subtitle Dash + Text */}
          <div className="flex items-center gap-2 mb-1.5">
            <span className="w-5 h-0.5 bg-[#1E40AF] rounded-full" />
            <span className="text-xs sm:text-sm font-bold text-slate-800 tracking-wide">
              Popular Products
            </span>
          </div>
          {/* Main Title */}
          <h2 className="text-2xl sm:text-[28px] font-extrabold text-[#0F172A] tracking-tight">
            Find the Right Card for You
          </h2>
        </div>

        {/* View All Link */}
        <Link
          href="/cards"
          className="inline-flex items-center gap-1.5 text-sm font-semibold text-[#1A56DB] hover:text-blue-700 transition-colors group self-start sm:self-auto"
        >
          <span>View All Cards</span>
          <ArrowRight size={15} weight="bold" className="group-hover:translate-x-0.5 transition-transform" />
        </Link>
      </div>

      {/* 4 Cards Grid matching image */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
        {cards.map((card) => (
          <div
            key={card.id}
            className="group relative bg-white rounded-2xl border border-slate-200/80 p-4 sm:p-5 shadow-sm hover:shadow-md hover:border-blue-200 transition-all duration-300 flex flex-col justify-between"
          >
            {/* Top Bank Logo */}
            <div className="mb-3.5 flex items-center justify-between">
              {card.bankLogo}
            </div>

            {/* Middle: Mini Card Preview + Details */}
            <div className="flex items-center gap-3 mb-4">
              {/* Realistic Mini Card Mockup */}
              <MiniCardMockup type={card.mockupType} />

              {/* Title & Subtitle */}
              <div className="min-w-0 flex-1">
                <Link
                  href={`/cards/${card.slug}`}
                  className="font-bold text-[13.5px] sm:text-[14px] text-[#0F172A] group-hover:text-blue-600 transition-colors line-clamp-1 block leading-snug"
                >
                  {card.title}
                </Link>
                <p className="text-[11.5px] text-slate-500 mt-1 line-clamp-2 leading-relaxed">
                  {card.subtitle}
                </p>
              </div>
            </div>

            {/* Bottom Row: Highlight Badge & Circular Blue Arrow Button */}
            <div className="flex items-center justify-between pt-1">
              {/* Badge Pill */}
              <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-semibold ${card.badge.colorClass}`}>
                {card.badge.icon}
                <span>{card.badge.text}</span>
              </span>

              {/* Blue Circular Arrow Button */}
              <Link
                href={`/cards/${card.slug}`}
                aria-label={`View ${card.title} details`}
                className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-[#1A56DB] hover:bg-blue-700 text-white flex items-center justify-center shadow-sm shadow-blue-500/20 group-hover:scale-110 active:scale-95 transition-all flex-shrink-0"
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
