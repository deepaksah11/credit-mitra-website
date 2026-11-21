import type { Metadata } from 'next';
import { Manrope } from 'next/font/google';
import './globals.css';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { CompareProvider } from '@/context/CompareContext';

const manrope = Manrope({
  subsets: ['latin'],
  variable: '--font-geist',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'Credit Mitra — Transparent Credit Card Comparison and Direct Application',
  description:
    'Explore verified credit cards in India. Compare annual fees, airport lounge access, reward rates, and honest pros and cons. Apply directly through bank partner links.',
  keywords: [
    'credit cards India',
    'lifetime free credit card',
    'cashback credit cards',
    'best travel credit cards',
    'credit card comparison',
    'credit card referral',
  ],
  metadataBase: new URL('https://creditmitra.com'),
  openGraph: {
    title: 'Credit Mitra — Transparent Credit Card Comparison',
    description:
      'Compare annual fees, spend waiver terms, and real benefits across top Indian banks.',
    siteName: 'Credit Mitra',
    type: 'website',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={manrope.variable}>
      <body className="min-h-screen flex flex-col bg-white text-slate-900 antialiased selection:bg-blue-100 selection:text-blue-900">
        <CompareProvider>
          <Navbar />
          <main className="flex-1">{children}</main>
          <Footer />
        </CompareProvider>
      </body>
    </html>
  );
}
