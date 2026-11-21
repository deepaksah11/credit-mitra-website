import { Card, AnalyticsData } from '@/types/card';

export const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_URL ||
  (process.env.NODE_ENV === 'production'
    ? 'https://credit-mitra-backend.onrender.com'
    : 'http://localhost:5000');

export interface CardFilters {
  search?: string;
  bank?: string;
  category?: string;
  featured?: boolean;
  hero?: boolean;
  minFee?: number;
  maxFee?: number;
  sort?: string;
  page?: number;
  limit?: number;
}

export interface PaginatedCardsResponse {
  success: boolean;
  message: string;
  data: Card[];
  pagination: {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
    hasPrevPage: boolean;
    hasNextPage: boolean;
    activeCount?: number;
    inactiveCount?: number;
  };
}

// Clean live card catalog used for local pre-rendering fallback
export const FALLBACK_CARDS: Card[] = [
  {
    _id: 'live-card-1',
    title: 'HDFC Bank Regalia Gold Credit Card',
    slug: 'hdfc-bank-regalia-gold-credit-card',
    bankName: 'HDFC Bank',
    category: 'Travel',
    imageUrl: 'https://res.cloudinary.com/dmxsitplq/image/upload/v1795185037/credit-mitra/cards/hdfc-bank-regalia-gold-credit-card.webp',
    joiningFee: 2500,
    annualFee: 2500,
    feeWaiver: 'Waived on spending ₹4,00,000 or more in an anniversary year',
    benefits: [
      'Complimentary Club Vistara Silver Tier and MMT Black Elite membership',
      '4 Reward Points for every ₹150 retail spend (excluding fuel, rent, and government transactions)',
      '12 complimentary domestic airport lounge visits annually across India',
      '6 complimentary international airport lounge access visits via Priority Pass',
      'Flight and hotel gift vouchers worth ₹5,000 on achieving annual spend milestones',
    ],
    pros: [
      'Extensive domestic and international airport lounge network access',
      'High conversion value of reward points for airline and hotel bookings (1 point = ₹0.50)',
      'Low foreign currency markup fee of 2.0% for international spending',
    ],
    cons: [
      'Relatively high annual spend threshold of ₹4,00,000 to waive renewal fee',
      'Monthly reward points capped on groceries and utility payments',
    ],
    eligibility: [
      'Salaried Indian national aged 21 to 60 with net monthly income > ₹1,00,000',
      'Self-employed professional aged 21 to 65 with annual ITR > ₹12,00,000',
    ],
    referralUrl: 'https://applyonline.hdfcbank.com/cards/credit-cards.html',
    isActive: true,
    isFeatured: true,
    isHeroFeatured: true,
    heroTag: '⚡ Exclusive Welcome Offer',
    heroSpecialFeatures: [
      '12 Complimentary Domestic & 6 International Lounge visits',
      'Complimentary Club Vistara Silver Tier & MMT Black Elite status',
      'Flight & hotel gift vouchers worth ₹5,000 on annual spend milestone',
      'Low 2.0% foreign currency markup for international spending'
    ],
    heroOrder: 1,
    viewsCount: 0,
    clicksCount: 0,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    _id: 'live-card-2',
    title: 'Cashback SBI Card',
    slug: 'cashback-sbi-card',
    bankName: 'SBI Card',
    category: 'Cashback',
    imageUrl: 'https://res.cloudinary.com/dmxsitplq/image/upload/v1795185038/credit-mitra/cards/cashback-sbi-card.png',
    joiningFee: 999,
    annualFee: 999,
    feeWaiver: 'Renewal fee reversed on annual retail spends of ₹2,00,000',
    benefits: [
      '5% flat cashback on online purchases across all merchant websites without merchant restriction',
      '1% flat cashback on offline in-store purchases',
      'Automatic auto-credit of cashback directly to the statement balance within 2 days of generation',
      '1% fuel surcharge waiver up to ₹100 per statement across petrol pumps in India',
    ],
    pros: [
      'Highest flat 5% cashback on virtually all e-commerce platforms (Amazon, Flipkart, Myntra, etc.)',
      'Zero complexity of tracking or redeeming reward points',
      'Low annual fee easily recovered within the first two months of typical shopping',
    ],
    cons: [
      'No complimentary airport lounge access included',
      'Excluded categories include wallet loads, rent payments, educational fees, and jewellery',
    ],
    eligibility: [
      'Indian resident aged between 21 and 65 years',
      'Minimum monthly income of ₹30,000 for salaried employees / regular self-employed ITR',
    ],
    referralUrl: 'https://www.sbicard.com/sbi-card-en/assets/docs/apply-now.html',
    isActive: true,
    isFeatured: true,
    isHeroFeatured: true,
    heroTag: '🔥 Flat 5% Unlimited Cashback',
    heroSpecialFeatures: [
      'Flat 5% cashback on online purchases across all merchant websites',
      'Zero conversion hassle — credited directly to monthly statement bill',
      '1% fuel surcharge waiver up to ₹100 per statement across India',
      'Annual fee reversal on ₹2,00,000 yearly retail spend'
    ],
    heroOrder: 2,
    viewsCount: 0,
    clicksCount: 0,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    _id: 'live-card-3',
    title: 'Amazon Pay ICICI Bank Credit Card',
    slug: 'amazon-pay-icici-bank-credit-card',
    bankName: 'ICICI Bank',
    category: 'Lifetime Free',
    imageUrl: 'https://res.cloudinary.com/dmxsitplq/image/upload/v1795185038/credit-mitra/cards/amazon-pay-icici-bank-credit-card.svg',
    joiningFee: 0,
    annualFee: 0,
    feeWaiver: 'Completely Lifetime Free with zero joining fee and zero annual renewal fee forever',
    benefits: [
      '5% unlimited cashback on Amazon.in for active Amazon Prime members',
      '3% unlimited cashback on Amazon.in for non-Prime members',
      '2% unlimited cashback on 100+ partner merchants and bill payments on Amazon Pay (Flight, Food, Mobile)',
      '1% unlimited cashback on all other domestic and international retail transactions',
    ],
    pros: [
      '100% Lifetime Free with zero hidden conditions or maintenance fees',
      'No upper ceiling or expiration date on earned cashback earnings',
      'Automatic direct monthly deposit into your Amazon Pay gift card balance',
    ],
    cons: [
      'Lacks complimentary domestic or international airport lounge visits',
      'Top 5% cashback rate requires an ongoing paid Amazon Prime membership',
    ],
    eligibility: [
      'Indian resident aged 18 to 60 years',
      'Active Amazon.in customer account with verified delivery address and PAN card',
    ],
    referralUrl: 'https://www.amazon.in/cbcc/marketpage',
    isActive: true,
    isFeatured: true,
    isHeroFeatured: true,
    heroTag: '🎁 100% Lifetime Free Card',
    heroSpecialFeatures: [
      'Completely Lifetime Free with zero joining & renewal fee forever',
      'Unlimited 5% cashback on Amazon.in for Prime members',
      '2% cashback on 100+ partner merchants & utility bill payments',
      'Cashback auto-credited monthly with zero expiration'
    ],
    heroOrder: 3,
    viewsCount: 0,
    clicksCount: 0,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    _id: 'live-card-4',
    title: 'Airtel Axis Bank Credit Card',
    slug: 'airtel-axis-bank-credit-card',
    bankName: 'Axis Bank',
    category: 'Cashback',
    imageUrl: 'https://res.cloudinary.com/dmxsitplq/image/upload/v1795185123/credit-mitra/cards/airtel-axis-bank-credit-card.svg',
    joiningFee: 500,
    annualFee: 500,
    feeWaiver: 'Waived on achieving annual retail spends of ₹2,00,000 in preceding year',
    benefits: [
      '25% cashback on Airtel Mobile, Broadband, WiFi, and DTH recharges via Airtel Thanks app',
      '10% cashback on utility bill payments (Electricity, Water, Piped Gas) via Airtel Thanks app',
      '10% cashback on preferred online food and grocery partners: Swiggy, Zomato, and BigBasket',
      '4 complimentary domestic airport lounge access visits per calendar year',
    ],
    pros: [
      'Unmatched 25% savings on monthly telecom and home broadband bills',
      'Very affordable ₹500 annual fee that pays for itself with single recharge cycle',
      'Complimentary airport lounge access included at a low price point',
    ],
    cons: [
      'Monthly cashback caps apply (₹250 per month on Airtel recharges, ₹300 on utilities)',
      'Full discount rates require routing transactions through the Airtel Thanks mobile app',
    ],
    eligibility: [
      'Age between 18 and 70 years',
      'Salaried or self-employed with minimum annual income of ₹3,00,000',
    ],
    referralUrl: 'https://www.axisbank.com/retail/cards/credit-card/airtel-axis-bank-credit-card',
    isActive: true,
    isFeatured: false,
    viewsCount: 0,
    clicksCount: 0,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    _id: 'live-card-5',
    title: 'Flipkart Axis Bank Credit Card',
    slug: 'flipkart-axis-bank-credit-card',
    bankName: 'Axis Bank',
    category: 'Shopping',
    imageUrl: 'https://res.cloudinary.com/dmxsitplq/image/upload/v1795185128/credit-mitra/cards/flipkart-axis-bank-credit-card.svg',
    joiningFee: 500,
    annualFee: 500,
    feeWaiver: 'Waived on achieving annual spends of ₹3,50,000 in a subscription year',
    benefits: [
      '5% unlimited cashback on Flipkart and Myntra purchases',
      '4% unlimited cashback on preferred partners: Cleartrip, PVR, Swiggy, and Uber',
      '1.5% unlimited cashback on all other personal retail transactions',
      '4 complimentary domestic lounge visits per year across participating airports',
    ],
    pros: [
      'Unlimited 5% cashback on Flipkart without any monthly maximum cap',
      'Solid 4% reward tier on daily commute (Uber) and food orders (Swiggy)',
      'Direct monthly statement adjustment of earned cashback',
    ],
    cons: [
      'Fuel, gift card purchases, wallet loads, and EMI conversions excluded from cashback',
      'Higher threshold of ₹3,50,000 for annual renewal waiver',
    ],
    eligibility: [
      'Indian citizen aged 18 to 70 years',
      'Minimum monthly income of ₹25,000 for salaried applicants',
    ],
    referralUrl: 'https://www.axisbank.com/retail/cards/credit-card/flipkart-axis-bank-credit-card',
    isActive: true,
    isFeatured: true,
    viewsCount: 0,
    clicksCount: 0,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    _id: 'live-card-6',
    title: 'SBI SimplyCLICK Credit Card',
    slug: 'sbi-simplyclick-credit-card',
    bankName: 'SBI Card',
    category: 'Shopping',
    imageUrl: 'https://res.cloudinary.com/dmxsitplq/image/upload/v1795185046/credit-mitra/cards/sbi-simplyclick-credit-card.svg',
    joiningFee: 499,
    annualFee: 499,
    feeWaiver: 'Reversal of annual renewal fee on annual retail spends of ₹1,00,000',
    benefits: [
      '₹500 Amazon gift voucher as welcome gift upon annual fee payment',
      '10X Reward Points on online spends with exclusive partners: Amazon, BookMyShow, Cleartrip, Lenskart, Netmeds',
      '5X Reward Points on all other online shopping portals',
      'E-voucher worth ₹2,00,000 annual spend milestone',
    ],
    pros: [
      'Welcome gift voucher completely offsets the first-year joining fee',
      'Easily achievable fee waiver milestone of ₹1,00,000 per year',
      'Accelerated reward accumulation for active e-commerce and movie ticket buyers',
    ],
    cons: [
      'Standard 1 Reward Point per ₹100 on offline purchases',
      'Lacks airport lounge access perks',
    ],
    eligibility: [
      'Age between 21 and 65 years',
      'Stable salaried employment or declared business income',
    ],
    referralUrl: 'https://www.sbicard.com/sbi-card-en/assets/docs/apply-now.html',
    isActive: true,
    isFeatured: false,
    viewsCount: 0,
    clicksCount: 0,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    _id: 'live-card-7',
    title: 'Tata Neu Infinity HDFC Bank Credit Card',
    slug: 'tata-neu-infinity-hdfc-bank-credit-card',
    bankName: 'HDFC Bank',
    category: 'Rewards',
    imageUrl: 'https://res.cloudinary.com/dmxsitplq/image/upload/v1795185049/credit-mitra/cards/tata-neu-infinity-hdfc-bank-credit-card.svg',
    joiningFee: 1499,
    annualFee: 1499,
    feeWaiver: 'Waived on spending ₹3,00,000 or more in an anniversary year',
    benefits: [
      '10% NeuCoins on Tata Neu and partner brands (BigBasket, 1mg, Croma, Air India, Tata CLiQ)',
      '1.5% NeuCoins on all RuPay UPI payments via Tata Neu app',
      '8 complimentary domestic lounge visits per year (2 per quarter)',
      '4 complimentary international lounge visits per calendar year via Priority Pass',
    ],
    pros: [
      'Industry-leading reward rate on UPI transactions via RuPay network',
      'High savings across the comprehensive Tata consumer brand ecosystem',
      'Both domestic and international airport lounge benefits included',
    ],
    cons: [
      'NeuCoins must be redeemed within the Tata ecosystem or on Tata Neu portal',
      'Higher joining and annual fee compared to entry-level cards',
    ],
    eligibility: [
      'Salaried Indian national aged 21 to 60 with net monthly income > ₹1,00,000',
      'Self-employed aged 21 to 65 with annual ITR > ₹12,00,000',
    ],
    referralUrl: 'https://applyonline.hdfcbank.com/cards/credit-cards.html',
    isActive: true,
    isFeatured: false,
    viewsCount: 0,
    clicksCount: 0,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    _id: 'live-card-8',
    title: 'IDFC FIRST Millennia Credit Card',
    slug: 'idfc-first-millennia-credit-card',
    bankName: 'IDFC FIRST Bank',
    category: 'Lifetime Free',
    imageUrl: 'https://res.cloudinary.com/dmxsitplq/image/upload/v1795185053/credit-mitra/cards/idfc-first-millennia-credit-card.svg',
    joiningFee: 0,
    annualFee: 0,
    feeWaiver: 'Guaranteed Lifetime Free with zero joining fee and zero renewal charges forever',
    benefits: [
      '10X Reward Points on incremental monthly spends above ₹20,000',
      '6X Reward Points on online shopping spends up to ₹20,000 per month',
      '3X Reward Points on offline purchases',
      'Reward points never expire and carry zero redemption fee',
      'Low dynamic interest rate starting from 9% up to 36% per annum',
      'Complimentary railway lounge access (4 visits per quarter)',
    ],
    pros: [
      '100% Lifetime Free card with no spending conditions attached',
      'Non-expiring reward points that can be redeemed for statement credit directly',
      'Interest-free cash withdrawals from ATMs until the payment due date',
    ],
    cons: [
      'Airport lounge access requires achieving minimum monthly spend of ₹20,000',
      'Highest 10X reward tier applies only on spends exceeding ₹20,000 threshold',
    ],
    eligibility: [
      'Indian resident aged 21 to 65 years',
      'Net monthly income of ₹25,000 or credit history with existing card',
    ],
    referralUrl: 'https://www.idfcfirstbank.com/credit-card',
    isActive: true,
    isFeatured: true,
    viewsCount: 0,
    clicksCount: 0,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
];

/**
 * Fetch cards from public API with filtering and search
 */
export async function getCards(filters: CardFilters = {}): Promise<PaginatedCardsResponse> {
  const query = new URLSearchParams();
  if (filters.search) query.set('search', filters.search);
  if (filters.bank) query.set('bank', filters.bank);
  if (filters.category) query.set('category', filters.category);
  if (filters.featured !== undefined) query.set('featured', String(filters.featured));
  if (filters.hero !== undefined) query.set('hero', String(filters.hero));
  if (filters.minFee !== undefined) query.set('minFee', String(filters.minFee));
  if (filters.maxFee !== undefined) query.set('maxFee', String(filters.maxFee));
  if (filters.sort) query.set('sort', filters.sort);
  if (filters.page) query.set('page', String(filters.page));
  if (filters.limit) query.set('limit', String(filters.limit));

  try {
    const res = await fetch(`${API_BASE_URL}/api/cards?${query.toString()}`, {
      cache: 'no-store',
    });

    if (!res.ok) {
      throw new Error(`Failed to fetch cards: ${res.statusText}`);
    }

    return await res.json();
  } catch (error) {
    console.warn('[API Warning] Using live fallback cards data:', error);
    let filtered = [...FALLBACK_CARDS];
    if (filters.search) {
      const q = filters.search.toLowerCase();
      filtered = filtered.filter(
        (c) =>
          c.title.toLowerCase().includes(q) ||
          c.bankName.toLowerCase().includes(q) ||
          c.category.toLowerCase().includes(q)
      );
    }
    if (filters.bank) {
      filtered = filtered.filter((c) => c.bankName.toLowerCase() === filters.bank?.toLowerCase());
    }
    if (filters.category) {
      filtered = filtered.filter((c) => c.category.toLowerCase() === filters.category?.toLowerCase());
    }
    if (filters.featured !== undefined) {
      filtered = filtered.filter((c) => Boolean(c.isFeatured) === filters.featured);
    }
    if (filters.hero !== undefined) {
      filtered = filtered.filter((c) => Boolean(c.isHeroFeatured) === filters.hero);
    }
    if (filters.maxFee !== undefined) {
      filtered = filtered.filter((c) => c.annualFee <= (filters.maxFee as number));
    }
    return {
      success: true,
      message: 'Live fallback catalog',
      data: filtered,
      pagination: {
        total: filtered.length,
        page: 1,
        limit: 12,
        totalPages: 1,
        hasPrevPage: false,
        hasNextPage: false,
      },
    };
  }
}

/**
 * Fetch a single card by slug
 */
export async function getCardBySlug(slug: string): Promise<Card | null> {
  try {
    const res = await fetch(`${API_BASE_URL}/api/cards/${slug}`, {
      cache: 'no-store',
    });

    if (!res.ok) {
      if (res.status === 404) return null;
      throw new Error(`Failed to fetch card: ${res.statusText}`);
    }

    const json = await res.json();
    return json.data;
  } catch (error) {
    console.warn('[API Warning] Using live fallback card data:', error);
    const found = FALLBACK_CARDS.find((c) => c.slug === slug);
    return found || null;
  }
}

/**
 * Admin Login
 */
export async function loginAdmin(email: string, password: string) {
  const res = await fetch(`${API_BASE_URL}/api/admin/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password }),
  });

  const json = await res.json();
  if (!res.ok) {
    throw new Error(json.message || 'Login failed');
  }
  return json.data;
}

/**
 * Get current Admin profile
 */
export async function getAdminMe(token: string) {
  const res = await fetch(`${API_BASE_URL}/api/admin/me`, {
    headers: { Authorization: `Bearer ${token}` },
  });

  const json = await res.json();
  if (!res.ok) {
    throw new Error(json.message || 'Unauthorized');
  }
  return json.data;
}

/**
 * Admin: Get all cards (including inactive)
 */
export async function getAdminCards(token: string, queryParams: Record<string, string> = {}) {
  const query = new URLSearchParams(queryParams).toString();
  const res = await fetch(`${API_BASE_URL}/api/admin/cards?${query}`, {
    headers: { Authorization: `Bearer ${token}` },
    cache: 'no-store',
  });

  const json = await res.json();
  if (!res.ok) {
    throw new Error(json.message || 'Failed to fetch admin cards');
  }
  return json;
}

/**
 * Admin: Get single card by ID
 */
export async function getAdminCardById(token: string, id: string): Promise<Card> {
  const res = await fetch(`${API_BASE_URL}/api/admin/cards/${id}`, {
    headers: { Authorization: `Bearer ${token}` },
    cache: 'no-store',
  });

  const json = await res.json();
  if (!res.ok) {
    throw new Error(json.message || 'Card not found');
  }
  return json.data;
}

/**
 * Admin: Create Card
 */
export async function createAdminCard(token: string, formData: FormData | Record<string, any>) {
  const isFormData = formData instanceof FormData;
  const headers: Record<string, string> = {
    Authorization: `Bearer ${token}`,
  };

  if (!isFormData) {
    headers['Content-Type'] = 'application/json';
  }

  const res = await fetch(`${API_BASE_URL}/api/admin/cards`, {
    method: 'POST',
    headers,
    body: isFormData ? formData : JSON.stringify(formData),
  });

  const json = await res.json();
  if (!res.ok) {
    throw new Error(json.message || 'Failed to create card');
  }
  return json.data;
}

/**
 * Admin: Update Card
 */
export async function updateAdminCard(token: string, id: string, formData: FormData | Record<string, any>) {
  const isFormData = formData instanceof FormData;
  const headers: Record<string, string> = {
    Authorization: `Bearer ${token}`,
  };

  if (!isFormData) {
    headers['Content-Type'] = 'application/json';
  }

  const res = await fetch(`${API_BASE_URL}/api/admin/cards/${id}`, {
    method: 'PUT',
    headers,
    body: isFormData ? formData : JSON.stringify(formData),
  });

  const json = await res.json();
  if (!res.ok) {
    throw new Error(json.message || 'Failed to update card');
  }
  return json.data;
}

/**
 * Admin: Delete Card
 */
export async function deleteAdminCard(token: string, id: string) {
  const res = await fetch(`${API_BASE_URL}/api/admin/cards/${id}`, {
    method: 'DELETE',
    headers: { Authorization: `Bearer ${token}` },
  });

  const json = await res.json();
  if (!res.ok) {
    throw new Error(json.message || 'Failed to delete card');
  }
  return json.data;
}

/**
 * Admin: Toggle Card Status
 */
export async function toggleAdminCardStatus(
  token: string,
  id: string,
  action: 'active' | 'featured' | 'hero'
) {
  const res = await fetch(`${API_BASE_URL}/api/admin/cards/${id}/toggle-status`, {
    method: 'PATCH',
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ action }),
  });

  const json = await res.json();
  if (!res.ok) {
    throw new Error(json.message || 'Failed to toggle status');
  }
  return json.data;
}

/**
 * Admin: Upload image
 */
export async function uploadImageToCloudinary(token: string, file: File) {
  const formData = new FormData();
  formData.append('image', file);

  const res = await fetch(`${API_BASE_URL}/api/admin/upload`, {
    method: 'POST',
    headers: { Authorization: `Bearer ${token}` },
    body: formData,
  });

  const json = await res.json();
  if (!res.ok) {
    throw new Error(json.message || 'Failed to upload image');
  }
  return json.data;
}

/**
 * Admin: Get Analytics Data
 */
export async function getAdminAnalytics(token: string, days = 30): Promise<AnalyticsData> {
  const res = await fetch(`${API_BASE_URL}/api/admin/analytics?days=${days}`, {
    headers: { Authorization: `Bearer ${token}` },
    cache: 'no-store',
  });

  const json = await res.json();
  if (!res.ok) {
    throw new Error(json.message || 'Failed to fetch analytics');
  }
  return json.data;
}
