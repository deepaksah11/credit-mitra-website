import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatCurrency(amount: number): string {
  if (amount === 0) return 'Free';
  return `₹${amount.toLocaleString('en-IN')}`;
}

export function getWhatsAppShareUrl(cardTitle: string, cardSlug: string): string {
  const currentOrigin =
    typeof window !== 'undefined'
      ? window.location.origin
      : 'https://creditmitra.com';

  const cardUrl = `${currentOrigin}/cards/${cardSlug}`;
  const message = `Check out this credit card: ${cardTitle}\nFull benefits and direct application:\n${cardUrl}`;
  return `https://api.whatsapp.com/send?text=${encodeURIComponent(message)}`;
}
