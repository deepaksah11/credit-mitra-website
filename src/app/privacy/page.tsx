import React from 'react';

export const metadata = {
  title: 'Privacy Policy — How We Protect Your Data | Credit Mitra',
  description:
    'Read our privacy policy detailing how Credit Mitra handles anonymized analytics and user privacy.',
};

export default function PrivacyPolicyPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 py-8 md:py-16 space-y-8">
      <div className="space-y-3">
        <span className="caption-3 font-semibold uppercase tracking-wider text-teal-800 bg-teal-50 px-3 py-1 rounded-full inline-block">
          Legal
        </span>
        <h1 className="heading-3 md:heading-2 font-bold text-neutral-900">
          Privacy Policy
        </h1>
        <p className="body-4 text-neutral-500">
          Effective date: November 2026
        </p>
      </div>

      <div className="rounded-2xl border border-neutral-200 bg-white p-6 md:p-8 space-y-6 text-sm text-neutral-700 leading-relaxed shadow-sm">
        <section className="space-y-2">
          <h2 className="title-3 font-bold text-neutral-900">1. Information We Do Not Collect</h2>
          <p>
            Credit Mitra does not collect, process, or store sensitive financial data, bank account passwords, Credit Information Reports (CIR), Aadhaar numbers, or Permanent Account Numbers (PAN).
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="title-3 font-bold text-neutral-900">2. Technical and Analytics Data</h2>
          <p>
            When you navigate our website or click an outbound referral link (`/go/:slug`), our servers collect standard server log data:
          </p>
          <ul className="list-disc pl-5 space-y-1">
            <li>Anonymized IP address and general device classification (mobile, tablet, or desktop)</li>
            <li>Browser user agent string</li>
            <li>Referring URL or referral campaign parameters (e.g. `utm_source`)</li>
            <li>Timestamp of your visit or link click</li>
          </ul>
          <p>
            This data is aggregated exclusively to analyze aggregate platform popularity, monitor fraudulent bot clicks, and improve user interface performance.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="title-3 font-bold text-neutral-900">3. Third-Party Links</h2>
          <p>
            Our website contains links to bank portals and affiliate networks. Once you leave Credit Mitra, the privacy policies and security procedures of the destination bank govern your interaction.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="title-3 font-bold text-neutral-900">4. Contact Us</h2>
          <p>
            For privacy inquiries, email privacy@creditmitra.com.
          </p>
        </section>
      </div>
    </div>
  );
}
