'use client';

import React, { Suspense } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import {
  Sparkle,
  Gift,
  AirplaneTilt,
  ShoppingCart,
  Percent,
  Cards,
} from '@phosphor-icons/react';

const CATEGORIES = [
  { label: 'All Cards', value: '', icon: Cards },
  { label: 'Cashback', value: 'Cashback', icon: Percent },
  { label: 'Lifetime Free', value: 'Lifetime Free', icon: Gift },
  { label: 'Travel & Lounge', value: 'Travel', icon: AirplaneTilt },
  { label: 'Online Shopping', value: 'Shopping', icon: ShoppingCart },
  { label: 'Rewards', value: 'Rewards', icon: Sparkle },
];

function CategoryPillsContent() {
  const searchParams = useSearchParams();
  const currentCategory = searchParams.get('category') || '';

  return (
    <div className="flex items-center gap-2.5 overflow-x-auto py-3 no-scrollbar scroll-smooth">
      {CATEGORIES.map((cat) => {
        const isActive = currentCategory.toLowerCase() === cat.value.toLowerCase();
        const href = cat.value ? `/cards?category=${encodeURIComponent(cat.value)}` : '/cards';
        const IconComponent = cat.icon;

        return (
          <Link
            key={cat.label}
            href={href}
            className={`inline-flex items-center gap-2 whitespace-nowrap px-4 py-2 rounded-full text-xs sm:text-sm font-bold transition-all duration-300 active:scale-95 ${
              isActive
                ? 'bg-[#0B0F17] text-white shadow-xl shadow-black/25'
                : 'bg-white text-slate-800 shadow-md shadow-black/[0.03] hover:shadow-lg hover:text-black hover:bg-slate-50'
            }`}
          >
            <IconComponent
              size={15}
              weight={isActive ? 'fill' : 'bold'}
              className={isActive ? 'text-white' : 'text-slate-500'}
            />
            <span>{cat.label}</span>
          </Link>
        );
      })}
    </div>
  );
}

export default function CategoryPills() {
  return (
    <Suspense
      fallback={
        <div className="flex items-center gap-2.5 overflow-x-auto py-3">
          {CATEGORIES.map((cat) => (
            <div
              key={cat.label}
              className="px-4 py-2 rounded-full text-xs sm:text-sm bg-white text-slate-400 shadow-sm flex items-center gap-1.5"
            >
              <span>{cat.label}</span>
            </div>
          ))}
        </div>
      }
    >
      <CategoryPillsContent />
    </Suspense>
  );
}
