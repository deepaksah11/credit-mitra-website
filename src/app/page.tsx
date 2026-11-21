import React from 'react';
import { getCards } from '@/lib/api';
import HeroSection from '@/components/HeroSection';
import TrustBar from '@/components/TrustBar';
import CategoryPills from '@/components/CategoryPills';
import TaglineReveal from '@/components/TaglineReveal';
import CardItem from '@/components/CardItem';
import HowCreditMitraWorks from '@/components/HowCreditMitraWorks';
import Link from 'next/link';
import {
    ShieldCheck,
    Percent,
    Scales,
    ArrowRight,
    Check,
    Sparkle,
    LockSimple,
    CreditCard,
    Lightning,
} from '@phosphor-icons/react/dist/ssr';

export const dynamic = 'force-dynamic';
export const revalidate = 0; // Disable caching so admin changes appear immediately

export default async function HomePage() {
    // 1. Fetch fresh active cards from API
    const allCardsResponse = await getCards({ limit: 50 });
    const allCards = allCardsResponse.data || [];

    // Hero cards: cards marked for hero slider, plus any featured cards
    const heroSpecific = allCards
        .filter((c) => c.isHeroFeatured)
        .sort((a, b) => (a.heroOrder || 0) - (b.heroOrder || 0));

    const otherFeatured = allCards
        .filter((c) => c.isFeatured && !c.isHeroFeatured)
        .sort((a, b) => new Date(b.createdAt || 0).getTime() - new Date(a.createdAt || 0).getTime());

    let heroCards = [...heroSpecific, ...otherFeatured];

    if (heroCards.length === 0) {
        heroCards = allCards.slice(0, 4);
    }

    // Cards for the homepage featured showcase (top 6 cards)
    const showcaseCards = allCards.slice(0, 6);

    return (
        <div className="pb-24 relative overflow-hidden">

            {/* 1. Hero Section matching reference image with Slide Option */}
            <HeroSection heroCards={heroCards} />

            {/* 2. Trust / Stats Bar with tuned top and bottom margins */}
            <div className="my-3 sm:my-5">
                <TrustBar />
            </div>

            <div className="space-y-10 md:space-y-16">
                {/* 3. Category Navigation Strip */}
            <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-4">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-4 gap-2">
                    <div>
                        <div className="flex items-center gap-2 mb-1">
                            <span className="w-5 h-0.5 bg-[#0B0F17] rounded-full" />
                            <span className="text-xs sm:text-sm font-bold text-slate-800 tracking-wide">
                                Filter by Benefits
                            </span>
                        </div>
                        <h3 className="text-xl sm:text-2xl font-extrabold text-[#0B0F17] tracking-tight">
                            Browse by Reward Category
                        </h3>
                    </div>
                    <Link
                        href="/cards"
                        className="text-xs sm:text-sm font-semibold text-[#0B0F17] hover:text-[#1A56DB] flex items-center gap-1.5 self-start sm:self-auto group transition-colors"
                    >
                        <span>View all {allCards.length} cards</span>
                        <ArrowRight size={14} weight="bold" className="group-hover:translate-x-0.5 transition-transform" />
                    </Link>
                </div>
                <React.Suspense fallback={<div className="h-10" />}>
                    <CategoryPills />
                </React.Suspense>
            </section>

            {/* 5. Featured Cards Showcase Grid */}
            {showcaseCards.length > 0 && (
                <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 gap-3">
                        <div>
                            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#FDE4CE] text-[#9A3412] text-xs font-bold mb-2 shadow-sm">
                                <Sparkle size={13} weight="fill" className="text-[#9A3412]" />
                                <span>Editor's Curated Picks</span>
                            </div>
                            <h2 className="text-2xl sm:text-3xl font-extrabold text-[#0B0F17] tracking-tight">
                                Recommended Cards This Month
                            </h2>
                            <p className="text-xs sm:text-sm text-slate-500 mt-1 max-w-xl">
                                Compare joining perks, lounge access allowances, and exact annual renewal fees upfront before applying.
                            </p>
                        </div>

                        <Link
                            href="/cards"
                            className="inline-flex items-center gap-2 rounded-full bg-white hover:bg-[#F5F2EB] text-[#0B0F17] px-5 py-2.5 text-xs sm:text-sm font-bold shadow-md hover:shadow-lg transition-all self-start sm:self-auto"
                        >
                            <span>Explore All Cards</span>
                            <ArrowRight size={14} weight="bold" />
                        </Link>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {showcaseCards.map((card) => (
                            <CardItem key={card._id} card={card} />
                        ))}
                    </div>
                </section>
            )}

            {/* 6. Tagline Reveal Section */}
            <TaglineReveal phrase="Compare honest card benefits without wading through hidden rules. Apply directly through verified bank links." />

            {/* 7. Problem to Solution: Why Credit-Mitra */}
            <section className="max-w-6xl mx-auto px-4 sm:px-6 pt-2">
                <div className="rounded-3xl bg-white p-8 md:p-12 shadow-xl shadow-black/[0.03] relative overflow-hidden">
                    {/* Subtle Ambient Mesh */}
                    <div
                        className="absolute -top-16 -right-16 w-80 h-80 pointer-events-none -z-0 opacity-40"
                        style={{
                            background:
                                'radial-gradient(circle, rgba(254, 215, 170, 0.45) 0%, transparent 70%)',
                        }}
                    />

                    <div className="text-center max-w-[640px] mx-auto mb-10 relative z-10">
                        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#FDE4CE] text-[#9A3412] text-xs font-bold mb-3 shadow-sm uppercase tracking-wider">
                            The Difference
                        </span>
                        <h2 className="text-2xl sm:text-3xl font-extrabold text-[#0B0F17] mb-3 tracking-tight">
                            Why Traditional Card Searching Breaks Down
                        </h2>
                        <p className="text-sm sm:text-base text-slate-500">
                            Bank websites bury critical renewal terms in 40-page PDF booklets. Plain referral links shared on WhatsApp lack fee clarity. Credit-Mitra makes every rule 100% transparent.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 relative z-10">
                        {/* The Old Way */}
                        <div className="p-6 sm:p-7 rounded-2xl bg-[#FFF1F2] space-y-4 shadow-sm">
                            <div className="flex items-center gap-2 text-rose-800 font-bold text-base sm:text-lg">
                                <span className="w-6 h-6 rounded-full bg-rose-200 text-rose-700 flex items-center justify-center text-xs font-black">
                                    ✕
                                </span>
                                <h3>Applying Without Guidance</h3>
                            </div>
                            <ul className="space-y-3 text-xs sm:text-sm text-slate-700">
                                <li className="flex items-start gap-2.5">
                                    <span className="text-rose-500 font-bold flex-shrink-0 mt-0.5">✕</span>
                                    <span>Surprise annual renewal charges billed after the first statement year</span>
                                </li>
                                <li className="flex items-start gap-2.5">
                                    <span className="text-rose-500 font-bold flex-shrink-0 mt-0.5">✕</span>
                                    <span>Unannounced spending category caps that silently cancel cashback</span>
                                </li>
                                <li className="flex items-start gap-2.5">
                                    <span className="text-rose-500 font-bold flex-shrink-0 mt-0.5">✕</span>
                                    <span>Complex reward points that expire or carry hefty redemption fees</span>
                                </li>
                            </ul>
                        </div>

                        {/* The Credit-Mitra Way */}
                        <div className="p-6 sm:p-7 rounded-2xl bg-[#F0FDF4] space-y-4 shadow-sm">
                            <div className="flex items-center gap-2 text-emerald-800 font-bold text-base sm:text-lg">
                                <div className="w-6 h-6 rounded-full bg-emerald-600 text-white flex items-center justify-center text-xs font-bold">
                                    <Check size={14} weight="bold" />
                                </div>
                                <h3>Applying with Credit-Mitra</h3>
                            </div>
                            <ul className="space-y-3 text-xs sm:text-sm text-slate-800 font-medium">
                                <li className="flex items-start gap-2.5">
                                    <div className="w-4 h-4 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center flex-shrink-0 mt-0.5">
                                        <Check size={11} weight="bold" />
                                    </div>
                                    <span>Exact joining and annual renewal fees stated clearly upfront</span>
                                </li>
                                <li className="flex items-start gap-2.5">
                                    <div className="w-4 h-4 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center flex-shrink-0 mt-0.5">
                                        <Check size={11} weight="bold" />
                                    </div>
                                    <span>Transparent fee waiver rules and spending milestones explained</span>
                                </li>
                                <li className="flex items-start gap-2.5">
                                    <div className="w-4 h-4 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center flex-shrink-0 mt-0.5">
                                        <Check size={11} weight="bold" />
                                    </div>
                                    <span>Direct official bank application links with 100% encrypted KYC</span>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </section>

            {/* 8. Key Benefits Section */}
            <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center max-w-[640px] mx-auto mb-10">
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#FDE4CE] text-[#9A3412] text-xs font-bold mb-3 shadow-sm uppercase tracking-wider">
                        Key Benefits
                    </span>
                    <h2 className="text-2xl sm:text-3xl font-extrabold text-[#0B0F17] mb-3 tracking-tight">
                        Designed for Financial Product Transparency
                    </h2>
                    <p className="text-sm sm:text-base text-slate-500">
                        We do not sell cards or push arbitrary sponsored rankings. We empower you to discover the ideal product for your lifestyle.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="p-7 rounded-3xl bg-white space-y-4 shadow-xl shadow-black/[0.03] hover:shadow-2xl hover:shadow-black/10 hover:-translate-y-1.5 transition-all duration-300 group">
                        <div className="w-12 h-12 rounded-2xl bg-[#0B0F17] text-white flex items-center justify-center shadow-md group-hover:scale-110 transition-transform">
                            <Percent size={24} weight="bold" />
                        </div>
                        <h3 className="text-lg font-bold text-[#0B0F17]">
                            Clear Fee Breakdowns
                        </h3>
                        <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                            Know exactly how much you pay upfront, annual renewal conditions, and spend waivers before submitting an application.
                        </p>
                    </div>

                    <div className="p-7 rounded-3xl bg-white space-y-4 shadow-xl shadow-black/[0.03] hover:shadow-2xl hover:shadow-black/10 hover:-translate-y-1.5 transition-all duration-300 group">
                        <div className="w-12 h-12 rounded-2xl bg-[#0B0F17] text-white flex items-center justify-center shadow-md group-hover:scale-110 transition-transform">
                            <Scales size={24} weight="bold" />
                        </div>
                        <h3 className="text-lg font-bold text-[#0B0F17]">
                            Side-by-Side Comparison
                        </h3>
                        <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                            Pick cards and evaluate welcome bonuses, lounge access limits, reward rates, and eligibility criteria on a single screen.
                        </p>
                    </div>

                    <div className="p-7 rounded-3xl bg-white space-y-4 shadow-xl shadow-black/[0.03] hover:shadow-2xl hover:shadow-black/10 hover:-translate-y-1.5 transition-all duration-300 group">
                        <div className="w-12 h-12 rounded-2xl bg-[#0B0F17] text-white flex items-center justify-center shadow-md group-hover:scale-110 transition-transform">
                            <ShieldCheck size={24} weight="bold" />
                        </div>
                        <h3 className="text-lg font-bold text-[#0B0F17]">
                            Direct Bank Applications
                        </h3>
                        <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                            Never share personal documents with intermediaries. Every referral button directs you straight to the issuing bank's secure portal.
                        </p>
                    </div>
                </div>
            </section>

            {/* 9. Premium "How Credit-Mitra Works" (Lavender, Electric Blue, Mint Green) */}
            <HowCreditMitraWorks />

            {/* 10. Final Call to Action with Hero-matching Cosmic Blue styling */}
            <section className="max-w-6xl mx-auto px-4 sm:px-6">
                <div className="relative overflow-hidden p-8 md:p-14 rounded-3xl bg-gradient-to-br from-[#0B0F17] via-[#1E293B] to-[#0B0F17] text-white text-center space-y-6 shadow-2xl shadow-black/20">
                    {/* Ambient Background Glow Circles without borders */}
                    <div className="absolute -right-20 -bottom-20 w-80 h-80 rounded-full bg-white/5 pointer-events-none" />
                    <div className="absolute -left-20 -top-20 w-80 h-80 rounded-full bg-white/5 pointer-events-none" />

                    <div className="relative z-10 space-y-4 max-w-2xl mx-auto">
                        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 backdrop-blur-md text-white text-xs sm:text-sm font-semibold shadow-inner">
                            <Sparkle size={15} weight="fill" />
                            <span>Smart Credit Decisions for India</span>
                        </div>

                        <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight leading-tight">
                            Ready to find your next credit card?
                        </h2>
                        <p className="text-sm sm:text-base text-slate-300 max-w-xl mx-auto leading-relaxed">
                            Explore our curated card collection, compare benefits side-by-side, and submit your application safely on official bank portals.
                        </p>

                        <div className="pt-4 flex flex-wrap items-center justify-center gap-4">
                            <Link
                                href="/cards"
                                className="rounded-full bg-white text-[#0B0F17] hover:bg-[#FAF7F2] active:scale-[0.98] transition-all inline-flex items-center gap-2 font-bold px-8 py-3.5 text-sm sm:text-base shadow-xl"
                            >
                                <span>Browse All Cards</span>
                                <ArrowRight size={18} weight="bold" />
                            </Link>
                            <Link
                                href="/compare"
                                className="rounded-full bg-white/10 hover:bg-white/20 active:scale-[0.98] transition-all inline-flex items-center gap-2 font-semibold px-6 py-3.5 text-sm sm:text-base text-white shadow-sm"
                            >
                                <span>Compare Cards</span>
                            </Link>
                        </div>
                    </div>
                </div>
            </section>
            </div>
        </div>
    );
}
