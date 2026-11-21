'use client';

import React, { Suspense } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';

const CATEGORIES = [
  { label: 'All Cards', value: '' },
  { label: 'Cashback', value: 'Cashback' },
  { label: 'Lifetime Free', value: 'Lifetime Free' },
  { label: 'Travel & Lounge', value: 'Travel' },
  { label: 'Online Shopping', value: 'Shopping' },
  { label: 'Rewards', value: 'Rewards' },
];

function CategoryPillsContent() {
  const searchParams = useSearchParams();
  const currentCategory = searchParams.get('category') || '';

  return (
    <div className="flex items-center gap-2 overflow-x-auto py-2 no-scrollbar">
      {CATEGORIES.map((cat) => {
        const isActive = currentCategory.toLowerCase() === cat.value.toLowerCase();
        const href = cat.value ? `/cards?category=${encodeURIComponent(cat.value)}` : '/cards';

        return (
          <Link
            key={cat.label}
            href={href}
            className={`whitespace-nowrap px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all duration-300 ${
              isActive
                ? 'bg-teal-800 text-white shadow-sm'
                : 'bg-white text-neutral-600 border border-neutral-200/80 hover:border-neutral-300 hover:text-neutral-900'
            }`}
          >
            {cat.label}
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
        <div className="flex items-center gap-2 overflow-x-auto py-2">
          {CATEGORIES.map((cat) => (
            <div
              key={cat.label}
              className="px-3.5 py-1.5 rounded-full text-xs bg-neutral-100 text-neutral-400"
            >
              {cat.label}
            </div>
          ))}
        </div>
      }
    >
      <CategoryPillsContent />
    </Suspense>
  );
}
