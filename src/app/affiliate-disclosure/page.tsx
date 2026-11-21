import React from 'react';
import Link from 'next/link';
import { ShieldCheck, Info } from '@phosphor-icons/react/dist/ssr';

export const metadata = {
  title: 'Affiliate Disclosure — Transparent Compensation Policy | Credit Mitra',
  description:
    'Read our complete affiliate disclosure and advertising policy. Learn how Credit Mitra earns commissions without charging visitors.',
};

export default function AffiliateDisclosurePage() {
  return (
    <div className="max-w-3xl mx-auto px-4 py-8 md:py-16 space-y-8">
      <div className="space-y-3">
        <span className="caption-3 font-semibold uppercase tracking-wider text-teal-800 bg-teal-50 px-3 py-1 rounded-full inline-block">
          Transparency Policy
        </span>
        <h1 className="heading-3 md:heading-2 font-bold text-neutral-900">
          Affiliate Disclosure Notice
        </h1>
        <p className="body-4 text-neutral-500">
          Last updated: November 2026
        </p>
      </div>

      <div className="p-5 rounded-2xl border border-teal-200 bg-teal-50/60 flex items-start gap-3 text-sm text-neutral-800">
        <Info size={24} weight="bold" className="text-teal-800 flex-shrink-0 mt-0.5" />
        <p>
          <strong>Summary:</strong> Credit Mitra is a free-to-use financial comparison website. We may receive financial compensation when you click our links and get approved for a credit card. This never costs you anything and does not affect the card fees or terms you receive from the bank.
        </p>
      </div>

      <div className="rounded-2xl border border-neutral-200 bg-white p-6 md:p-8 space-y-6 text-sm text-neutral-700 leading-relaxed shadow-sm">
        <section className="space-y-2">
          <h2 className="title-3 font-bold text-neutral-900">1. Referral Partnerships</h2>
          <p>
            Credit Mitra partners with financial institutions, affiliate networks (such as EarnKaro, CashKaro, and BankSathi), and direct bank partner referral programs. When you click an "Apply Now" button on our website, you are directed through a secure tracking link (`/go/:slug`) to the issuing bank's application form.
          </p>
          <p>
            If your application is subsequently approved and issued by the bank, Credit Mitra may receive a referral fee or commission from the affiliate network or bank.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="title-3 font-bold text-neutral-900">2. No Cost to You</h2>
          <p>
            You will never be charged any additional fee, premium, or interest rate for applying through our referral links. The card fees (joining fee, annual fee, APR, and reward structure) remain identical to or better than what the bank offers directly to the general public.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="title-3 font-bold text-neutral-900">3. Editorial Integrity and Objectivity</h2>
          <p>
            Our opinions, ratings, pros, cons, and comparisons are formed through independent evaluation of published bank product documentation and schedule of charges. We actively feature both cards with which we maintain commercial relationships and cards where we receive zero compensation if they provide superior consumer value.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="title-3 font-bold text-neutral-900">4. Not a Financial Advisor</h2>
          <p>
            The content provided on Credit Mitra is for informational and educational purposes only and should not be construed as legal, tax, or investment advice. Always review the official Most Important Terms and Conditions (MITC) provided by the bank before completing your card application.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="title-3 font-bold text-neutral-900">5. Questions & Contact</h2>
          <p>
            If you have any questions regarding our partnerships or disclosures, please reach out via our{' '}
            <Link href="/contact" className="text-teal-800 font-semibold underline">
              Contact Page
            </Link>.
          </p>
        </section>
      </div>
    </div>
  );
}
