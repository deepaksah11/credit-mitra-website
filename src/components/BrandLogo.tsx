import React from 'react';
import Link from 'next/link';

interface BrandLogoProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg';
}

export default function BrandLogo({ className = '', size = 'md' }: BrandLogoProps) {
  const iconSizes = {
    sm: 'w-7 h-7',
    md: 'w-9 h-9',
    lg: 'w-11 h-11',
  };

  const textSizes = {
    sm: 'text-lg',
    md: 'text-xl',
    lg: 'text-2xl',
  };

  return (
    <Link href="/" className={`inline-flex items-center gap-2.5 group ${className}`}>
      {/* Dual Arc / Swirl Gradient Icon */}
      <div className={`relative ${iconSizes[size]} flex items-center justify-center flex-shrink-0 transition-transform group-hover:scale-105`}>
        <svg viewBox="0 0 40 40" className="w-full h-full" fill="none" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <linearGradient id="cmGrad1" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#06B6D4" />
              <stop offset="60%" stopColor="#2563EB" />
              <stop offset="100%" stopColor="#1E40AF" />
            </linearGradient>
            <linearGradient id="cmGrad2" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#38BDF8" />
              <stop offset="100%" stopColor="#1D4ED8" />
            </linearGradient>
          </defs>
          {/* Outer Curved Swirl / "C" Shape */}
          <path
            d="M 28 8 A 14 14 0 1 0 28 32 C 32 30 33 26 31 23 C 29 20 25 21 23 23 C 20 26 15 25 13 21 C 11 17 13 12 18 10 C 22 8 26 9 28 8 Z"
            fill="url(#cmGrad1)"
          />
          {/* Inner Accent Ring Arc */}
          <path
            d="M 26 14 A 8 8 0 0 0 16 20 C 16 24 19 26 23 25"
            stroke="url(#cmGrad2)"
            strokeWidth="3.5"
            strokeLinecap="round"
          />
          {/* Center Vertical Energy Pill / Bar */}
          <rect x="33.5" y="11" width="3.5" height="18" rx="1.75" fill="#1D4ED8" />
        </svg>
      </div>

      {/* Brand Typography */}
      <span className={`${textSizes[size]} font-bold tracking-tight text-[#0F172A] group-hover:text-blue-600 transition-colors`}>
        Credit-Mitra
      </span>
    </Link>
  );
}
