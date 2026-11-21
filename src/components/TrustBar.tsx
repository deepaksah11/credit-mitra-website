import React from 'react';
import {
  ShieldCheck,
  UsersThree,
  Star,
  Headset,
} from '@phosphor-icons/react/dist/ssr';

export default function TrustBar() {
  const items = [
    {
      icon: <ShieldCheck size={20} weight="fill" className="text-[#1A56DB]" />,
      text: '100% Secure & Trusted',
    },
    {
      icon: <UsersThree size={20} weight="fill" className="text-[#1A56DB]" />,
      text: '1M+ Happy Users',
    },
    {
      icon: <Star size={20} weight="fill" className="text-[#F59E0B]" />,
      text: 'Top Rated Platform',
    },
    {
      icon: <Headset size={20} weight="fill" className="text-[#1A56DB]" />,
      text: 'Expert Guidance',
    },
  ];

  return (
    <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-20">
      {/* Floating Borderless Pill Card with Soft Shadow */}
      <div className="bg-white/95 backdrop-blur-xl rounded-2xl md:rounded-full py-4 sm:py-5 px-6 sm:px-12 shadow-xl shadow-black/[0.04]">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 items-center justify-items-center">
          {items.map((item) => (
            <div
              key={item.text}
              className="flex items-center gap-2.5 text-slate-800 font-bold text-xs sm:text-sm"
            >
              {item.icon}
              <span className="tracking-tight whitespace-nowrap">{item.text}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
