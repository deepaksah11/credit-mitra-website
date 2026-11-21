import React from 'react';
import Link from 'next/link';
import { CreditCard, ArrowRight } from '@phosphor-icons/react/dist/ssr';

export default function NotFound() {
  return (
    <div className="max-w-md mx-auto px-4 py-24 text-center space-y-6">
      <div className="w-16 h-16 rounded-2xl bg-teal-50 text-teal-800 mx-auto flex items-center justify-center">
        <CreditCard size={32} weight="bold" />
      </div>
      <span className="caption-3 font-semibold uppercase tracking-wider text-teal-800 bg-teal-50 px-3 py-1 rounded-full inline-block">
        Error 404
      </span>
      <h1 className="heading-3 font-bold text-neutral-900">
        Page or Card Not Found
      </h1>
      <p className="body-4 text-neutral-500">
        The credit card or page you are looking for may have been archived, renamed, or temporarily hidden.
      </p>
      <div className="pt-2">
        <Link
          href="/cards"
          className="button-md rounded-xl bg-teal-800 text-white font-semibold hover:bg-teal-900 active:scale-[0.98] transition-all inline-flex items-center gap-2"
        >
          <span>Browse Active Cards</span>
          <ArrowRight size={16} weight="bold" />
        </Link>
      </div>
    </div>
  );
}
