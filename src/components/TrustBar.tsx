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
      text: 'Expert Support',
    },
  ];

  return (
    <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-2 sm:-mt-4 relative z-20">
      <div className="bg-[#F0F5FE] border border-[#E2EEFC] rounded-2xl md:rounded-full py-4 px-6 sm:px-12 shadow-sm">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-0 items-center justify-items-center">
          {items.map((item, index) => (
            <React.Fragment key={item.text}>
              <div className="flex items-center gap-2.5 text-slate-800 font-semibold text-xs sm:text-sm">
                {item.icon}
                <span className="tracking-tight whitespace-nowrap">{item.text}</span>
              </div>
              {index < items.length - 1 && (
                <div className="hidden md:block h-5 w-px bg-[#CBDCF7]" aria-hidden="true" />
              )}
            </React.Fragment>
          ))}
        </div>
      </div>
    </div>
  );
}
