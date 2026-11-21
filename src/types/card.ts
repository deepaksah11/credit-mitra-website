export interface Card {
  _id: string;
  title: string;
  slug: string;
  bankName: string;
  category: string;
  imageUrl: string;
  imagePublicId?: string;
  joiningFee: number;
  annualFee: number;
  feeWaiver?: string;
  benefits: string[];
  pros: string[];
  cons: string[];
  eligibility: string[];
  referralUrl: string;
  isActive: boolean;
  isFeatured: boolean;
  isHeroFeatured?: boolean;
  heroTag?: string;
  heroSpecialFeatures?: string[];
  heroOrder?: number;
  viewsCount: number;
  clicksCount: number;
  createdAt: string;
  updatedAt: string;
}

export interface Admin {
  id: string;
  name: string;
  email: string;
  lastLogin?: string;
  createdAt?: string;
}

export interface AnalyticsOverview {
  totalCards: number;
  activeCards: number;
  hiddenCards: number;
  featuredCards: number;
  totalViews: number;
  totalClicks: number;
  overallCtr: number;
}

export interface TopCard {
  _id: string;
  title: string;
  slug: string;
  bankName: string;
  category: string;
  clicksCount: number;
  viewsCount: number;
  isFeatured: boolean;
  isActive: boolean;
  ctr?: number;
}

export interface DeviceBreakdown {
  device: string;
  count: number;
}

export interface ClicksTrend {
  date: string;
  clicks: number;
}

export interface BankDistribution {
  bankName: string;
  totalCards: number;
  totalClicks: number;
  totalViews: number;
}

export interface RecentClick {
  id: string;
  cardTitle: string;
  bankName: string;
  cardSlug: string;
  deviceType: string;
  referrerSource: string;
  clickedAt: string;
}

export interface AnalyticsData {
  overview: AnalyticsOverview;
  topCards: {
    byClicks: TopCard[];
    byViews: TopCard[];
  };
  deviceBreakdown: DeviceBreakdown[];
  clicksTrend: ClicksTrend[];
  bankDistribution: BankDistribution[];
  recentClicks: RecentClick[];
}
