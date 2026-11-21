import React from 'react';
import Link from 'next/link';
import { CreditCard, ArrowRight, Sparkle } from '@phosphor-icons/react/dist/ssr';

export default function NotFound() {
  return (
    <div className="relative min-h-[70vh] flex items-center justify-center py-20 px-4">
      {/* Background Soft Peach Ambient Glow Mesh matching Hero */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[450px] pointer-events-none -z-10 opacity-70"
        style={{
          background:
            'radial-gradient(circle, rgba(254, 215, 170, 0.45) 0%, rgba(251, 146, 60, 0.15) 50%, transparent 70%)',
        }}
      />

      <div className="max-w-md w-full text-center space-y-6 bg-white p-8 sm:p-10 rounded-3xl shadow-2xl shadow-black/10">
        <div className="w-16 h-16 rounded-2xl bg-[#0B0F17] text-white mx-auto flex items-center justify-center shadow-md">
          <CreditCard size={32} weight="bold" />
        </div>
        
        <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-[#FDE4CE] text-[#9A3412] text-xs font-bold uppercase tracking-wider shadow-sm">
          <Sparkle size={13} weight="fill" />
          <span>Error 404</span>
        </div>

        <h1 className="text-2xl sm:text-3xl font-extrabold text-[#0B0F17] tracking-tight">
          Page or Card Not Found
        </h1>

        <p className="text-xs sm:text-sm text-slate-500 leading-relaxed">
          The credit card or page you are looking for may have been archived, renamed, or temporarily relocated.
        </p>

        <div className="pt-2">
          <Link
            href="/cards"
            className="rounded-full bg-[#0B0F17] text-white hover:bg-[#1E293B] active:scale-95 transition-all inline-flex items-center gap-2 font-bold px-7 py-3 text-sm shadow-xl shadow-black/10"
          >
            <span>Browse Active Cards</span>
            <ArrowRight size={16} weight="bold" />
          </Link>
        </div>
      </div>
    </div>
  );
}
