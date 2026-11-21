import React from 'react';

interface MiniCardMockupProps {
  type: 'hdfc-millennia' | 'sbi-simplysave' | 'amazon-pay-icici' | 'axis-flipkart';
  className?: string;
}

export default function MiniCardMockup({ type, className = '' }: MiniCardMockupProps) {
  if (type === 'hdfc-millennia') {
    return (
      <div className={`relative w-[96px] h-[62px] sm:w-[104px] sm:h-[66px] rounded-lg overflow-hidden shadow-md flex-shrink-0 bg-gradient-to-br from-[#0B1A30] via-[#09152B] to-[#040914] p-1.5 flex flex-col justify-between select-none ${className}`}>
        {/* Top: EMV Chip & HDFC logo */}
        <div className="flex items-center justify-between z-10">
          <div className="w-4 h-3 rounded-[2px] bg-gradient-to-br from-amber-200 via-amber-400 to-amber-600 shadow-inner" />
          <span className="text-[6.5px] font-bold text-slate-300 tracking-wider">HDFC BANK</span>
        </div>

        {/* Center: Millennia Branding */}
        <div className="z-10 text-center my-auto">
          <span className="text-[7.5px] font-extrabold tracking-[0.16em] text-slate-200 uppercase font-sans">
            MILLENNIA
          </span>
        </div>

        {/* Bottom: Contactless Waves & Visa Logo */}
        <div className="flex items-end justify-between z-10">
          <span className="text-[5px] text-slate-400 font-mono">•••• 9201</span>
          <span className="text-[9px] font-black italic text-white tracking-tighter">
            VISA
          </span>
        </div>
      </div>
    );
  }

  if (type === 'sbi-simplysave') {
    return (
      <div className={`relative w-[96px] h-[62px] sm:w-[104px] sm:h-[66px] rounded-lg overflow-hidden shadow-md flex-shrink-0 bg-gradient-to-br from-[#02315D] via-[#081E36] to-[#011124] p-1.5 flex flex-col justify-between select-none ${className}`}>
        {/* Background wave ripple texture without borders */}
        <div className="absolute -right-4 -bottom-4 w-16 h-16 rounded-full bg-cyan-400/10 pointer-events-none" />

        {/* Top: EMV Chip & SBI Card */}
        <div className="flex items-center justify-between z-10">
          <div className="w-4 h-3 rounded-[2px] bg-gradient-to-br from-amber-200 via-amber-400 to-amber-600 shadow-inner" />
          <div className="flex items-center gap-0.5">
            <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 inline-block" />
            <span className="text-[7px] font-bold text-white tracking-tight">SBI Card</span>
          </div>
        </div>

        {/* Center: SimplySAVE title */}
        <div className="z-10 text-center my-auto">
          <span className="text-[7.5px] font-bold text-cyan-200 tracking-wide">
            SimplySAVE
          </span>
        </div>

        {/* Bottom: Dots & Visa */}
        <div className="flex items-end justify-between z-10">
          <span className="text-[5px] text-cyan-300 font-mono">•••• 8821</span>
          <span className="text-[9px] font-black italic text-white tracking-tighter">
            VISA
          </span>
        </div>
      </div>
    );
  }

  if (type === 'amazon-pay-icici') {
    return (
      <div className={`relative w-[96px] h-[62px] sm:w-[104px] sm:h-[66px] rounded-lg overflow-hidden shadow-md flex-shrink-0 bg-gradient-to-br from-[#1C1C1F] via-[#111113] to-[#0A0A0C] p-1.5 flex flex-col justify-between select-none ${className}`}>
        {/* Top: Chip & ICICI */}
        <div className="flex items-center justify-between z-10">
          <div className="w-4 h-3 rounded-[2px] bg-gradient-to-br from-amber-200 via-amber-400 to-amber-600 shadow-inner" />
          <span className="text-[6.5px] font-bold text-neutral-300">i ICICI Bank</span>
        </div>

        {/* Center: Amazon Smile Arrow */}
        <div className="z-10 flex flex-col items-center justify-center my-auto">
          <span className="text-[8.5px] font-bold text-white tracking-tight">amazon</span>
          <svg viewBox="0 0 40 10" className="w-5 h-1.5 -mt-0.5" fill="none">
            <path
              d="M 2 3 Q 20 11 36 2"
              stroke="#FF9900"
              strokeWidth="2.5"
              strokeLinecap="round"
            />
            <path d="M 33 0 L 37 3 L 34 6 Z" fill="#FF9900" />
          </svg>
        </div>

        {/* Bottom: Contactless wave & VISA */}
        <div className="flex items-end justify-between z-10">
          <span className="text-[5px] text-neutral-400 font-mono">•••• 4092</span>
          <span className="text-[9px] font-black italic text-white tracking-tighter">
            VISA
          </span>
        </div>
      </div>
    );
  }

  // axis-flipkart
  return (
    <div className={`relative w-[96px] h-[62px] sm:w-[104px] sm:h-[66px] rounded-lg overflow-hidden shadow-md flex-shrink-0 bg-gradient-to-br from-[#1055C9] via-[#0B3E94] to-[#052357] p-1.5 flex flex-col justify-between select-none ${className}`}>
      {/* Top: Chip & Axis Bank */}
      <div className="flex items-center justify-between z-10">
        <div className="w-4 h-3 rounded-[2px] bg-gradient-to-br from-amber-200 via-amber-400 to-amber-600 shadow-inner" />
        <span className="text-[6.5px] font-bold text-white/90">AXIS BANK</span>
      </div>

      {/* Center: Flipkart Yellow Bag Emblem */}
      <div className="z-10 flex items-center justify-center gap-1 my-auto">
        <div className="w-3.5 h-3.5 rounded bg-[#FFE11B] flex items-center justify-center text-[#1055C9] font-bold text-[8px] shadow-sm">
          f
        </div>
        <span className="text-[8px] font-bold text-white tracking-tight">
          Flipkart
        </span>
      </div>

      {/* Bottom: Numbers & Visa */}
      <div className="flex items-end justify-between z-10">
        <span className="text-[5px] text-blue-200 font-mono">•••• 3194</span>
        <span className="text-[9px] font-black italic text-white tracking-tighter">
          VISA
        </span>
      </div>
    </div>
  );
}
