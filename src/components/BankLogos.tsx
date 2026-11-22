import React from 'react';

/**
 * Bank Logos crafted as clean SVGs matching the image.
 */

export function HdfcBankLogo({ className = 'h-5' }: { className?: string }) {
  return (
    <div className={`flex items-center gap-1.5 ${className}`}>
      {/* HDFC Iconic Square cross logo */}
      <svg viewBox="0 0 32 32" className="w-5 h-5 flex-shrink-0" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect width="32" height="32" rx="4" fill="#004C8F" />
        <rect x="5" y="5" width="22" height="22" fill="#ED1C24" />
        <rect x="11" y="11" width="10" height="10" fill="#FFFFFF" />
        <rect x="13" y="1" width="6" height="30" fill="#004C8F" />
        <rect x="1" y="13" width="30" height="6" fill="#004C8F" />
        <rect x="14" y="6" width="4" height="20" fill="#ED1C24" />
        <rect x="6" y="14" width="20" height="4" fill="#ED1C24" />
        <rect x="13" y="13" width="6" height="6" fill="#FFFFFF" />
      </svg>
      <span className="font-extrabold text-[13px] tracking-wider text-[#004C8F] font-sans">
        HDFC BANK
      </span>
    </div>
  );
}

export function SbiCardLogo({ className = 'h-5' }: { className?: string }) {
  return (
    <div className={`flex items-center gap-1.5 ${className}`}>
      {/* SBI Keyhole Emblem */}
      <svg viewBox="0 0 32 32" className="w-5 h-5 flex-shrink-0" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="16" cy="16" r="15" fill="#00A5DF" />
        <circle cx="16" cy="13" r="5" fill="#FFFFFF" />
        <rect x="14.5" y="13" width="3" height="12" fill="#FFFFFF" />
      </svg>
      <div className="flex items-baseline">
        <span className="font-extrabold text-[14px] text-[#00A5DF] tracking-tight">SBI</span>
        <span className="font-medium text-[13px] text-[#00A5DF] ml-0.5">card</span>
      </div>
    </div>
  );
}

export function IciciBankLogo({ className = 'h-5' }: { className?: string }) {
  return (
    <div className={`flex items-center gap-1.5 ${className}`}>
      {/* ICICI 'i' Emblem */}
      <svg viewBox="0 0 32 32" className="w-5 h-5 flex-shrink-0" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="16" cy="16" r="14" fill="#F37021" />
        <circle cx="16" cy="9.5" r="2.5" fill="#FFFFFF" />
        <path d="M 13 15 L 17 15 L 17 23 L 19 23 L 19 25 L 13 25 L 13 23 L 15 23 L 15 17 L 13 17 Z" fill="#FFFFFF" />
      </svg>
      <span className="font-extrabold text-[13px] text-[#B02A30] tracking-tight italic">
        ICICI <span className="font-bold not-italic text-[#082E6E]">Bank</span>
      </span>
    </div>
  );
}

export function AxisBankLogo({ className = 'h-5' }: { className?: string }) {
  return (
    <div className={`flex items-center gap-1.5 ${className}`}>
      {/* Axis Bank Maroon Triangle Angle */}
      <svg viewBox="0 0 32 32" className="w-5 h-5 flex-shrink-0" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M 4 28 L 16 4 L 28 28 L 20 28 L 16 19 L 16 28 Z" fill="#97144D" />
      </svg>
      <span className="font-extrabold text-[13px] text-[#97144D] tracking-wider font-sans">
        AXIS BANK
      </span>
    </div>
  );
}

export function IdfcBankLogo({ className = 'h-5' }: { className?: string }) {
  return (
    <div className={`flex items-center gap-1.5 ${className}`}>
      {/* IDFC First Bank Maroon Badge */}
      <div className="w-5 h-5 rounded bg-[#9E1B32] flex items-center justify-center flex-shrink-0 text-white font-black text-[10px]">
        1
      </div>
      <div className="flex items-center gap-0.5 font-sans">
        <span className="font-extrabold text-[12px] text-[#9E1B32] tracking-tight">IDFC FIRST</span>
        <span className="font-semibold text-[11px] text-[#0B0F17]">Bank</span>
      </div>
    </div>
  );
}
