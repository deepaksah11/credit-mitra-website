import React from 'react';
import { getCards } from '@/lib/api';
import CardItem from '@/components/CardItem';
import Link from 'next/link';
import { MagnifyingGlass, ArrowCounterClockwise, Sparkle, Funnel } from '@phosphor-icons/react/dist/ssr';

interface CardsPageProps {
  searchParams: {
    search?: string;
    bank?: string;
    category?: string;
    maxFee?: string;
    sort?: string;
    page?: string;
  };
}

export const metadata = {
  title: 'Credit Card Catalog — Compare Fees and Benefits | Credit Mitra',
  description:
    'Browse our comprehensive catalog of verified credit cards in India. Filter by bank, cashback rate, zero annual fee, and lounge perks.',
};

export default async function CardsPage({ searchParams }: CardsPageProps) {
  const page = parseInt(searchParams.page || '1', 10);
  const maxFee = searchParams.maxFee !== undefined ? Number(searchParams.maxFee) : undefined;

  const response = await getCards({
    search: searchParams.search,
    bank: searchParams.bank,
    category: searchParams.category,
    maxFee,
    sort: searchParams.sort || 'featured',
    page,
    limit: 12,
  });

  const cards = response.data || [];
  const pagination = response.pagination;

  const banks = ['HDFC Bank', 'SBI Card', 'Axis Bank', 'ICICI Bank'];
  const categories = ['Cashback', 'Travel', 'Lifetime Free', 'Shopping', 'Rewards'];

  return (
    <div className="relative min-h-screen pb-20">
      {/* Background Soft Peach Ambient Glow Mesh matching Hero */}
      <div
        className="absolute -top-24 right-0 w-[600px] h-[500px] pointer-events-none -z-10"
        style={{
          background:
            'radial-gradient(circle at 70% 30%, rgba(254, 215, 170, 0.4) 0%, rgba(251, 146, 60, 0.15) 50%, transparent 70%)',
        }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6 sm:pt-10 space-y-8">
        {/* Page Header */}
        <div className="space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#FDE4CE] text-[#9A3412] text-xs font-bold shadow-sm">
            <Sparkle size={13} weight="fill" className="text-[#9A3412]" />
            <span>Complete Card Directory</span>
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-[42px] font-extrabold text-[#0B0F17] tracking-tight leading-tight">
            Discover &amp; Compare Credit Cards
          </h1>
          <p className="text-sm sm:text-base text-slate-500 max-w-2xl font-normal leading-relaxed">
            Filter cards by cashback rate, reward points, annual charges, and airport lounge perks. Every card links directly to the bank's secure application portal.
          </p>
        </div>

        {/* Filter and Search Bar with Hero Styling */}
        <div className="p-5 sm:p-7 rounded-3xl bg-white shadow-xl shadow-black/[0.03] space-y-5">
          {/* Search Input Form */}
          <form method="GET" action="/cards" className="flex flex-col lg:flex-row gap-3">
            <div className="relative flex-1">
              <MagnifyingGlass
                size={18}
                weight="bold"
                className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
              />
              <input
                type="text"
                name="search"
                defaultValue={searchParams.search || ''}
                placeholder="Search by card name, bank, or perk (e.g., Lounge, Swiggy, Amazon)..."
                className="w-full pl-11 pr-4 py-3 rounded-full bg-[#FAF7F2] text-sm focus:outline-none focus:ring-2 focus:ring-[#0B0F17] transition-all placeholder:text-slate-400 font-medium"
              />
            </div>

            {/* Bank Dropdown */}
            <select
              name="bank"
              defaultValue={searchParams.bank || ''}
              className="px-4 py-3 rounded-full bg-[#FAF7F2] text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#0B0F17] transition-all font-medium cursor-pointer"
            >
              <option value="">All Banks</option>
              {banks.map((b) => (
                <option key={b} value={b}>
                  {b}
                </option>
              ))}
            </select>

            {/* Category Dropdown */}
            <select
              name="category"
              defaultValue={searchParams.category || ''}
              className="px-4 py-3 rounded-full bg-[#FAF7F2] text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#0B0F17] transition-all font-medium cursor-pointer"
            >
              <option value="">All Categories</option>
              {categories.map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
            </select>

            {/* Sort Dropdown */}
            <select
              name="sort"
              defaultValue={searchParams.sort || 'featured'}
              className="px-4 py-3 rounded-full bg-[#FAF7F2] text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#0B0F17] transition-all font-medium cursor-pointer"
            >
              <option value="featured">Featured First</option>
              <option value="fee_asc">Lowest Annual Fee</option>
              <option value="fee_desc">Highest Annual Fee</option>
              <option value="views">Most Viewed</option>
              <option value="clicks">Most Applied</option>
              <option value="newest">Recently Added</option>
            </select>

            <button
              type="submit"
              className="rounded-full bg-[#0B0F17] text-white hover:bg-[#1E293B] active:scale-95 transition-all font-bold px-7 py-3 text-sm shadow-lg shadow-black/10 flex items-center justify-center gap-1.5"
            >
              <Funnel size={16} weight="bold" />
              <span>Apply Filters</span>
            </button>

            {(searchParams.search || searchParams.bank || searchParams.category || searchParams.maxFee) && (
              <Link
                href="/cards"
                className="rounded-full bg-[#FAF7F2] text-slate-700 hover:text-[#0B0F17] hover:bg-slate-200/60 transition-all px-5 py-3 text-sm flex items-center justify-center gap-1.5 font-semibold"
              >
                <ArrowCounterClockwise size={16} weight="bold" />
                <span>Reset</span>
              </Link>
            )}
          </form>

          {/* Quick Fee Filter Badges styled like Hero pills */}
          <div className="flex flex-wrap items-center gap-2 pt-3 border-t border-slate-100 text-xs text-slate-500">
            <span className="font-bold text-slate-700 mr-1">Quick Filters:</span>
            <Link
              href="/cards?maxFee=0"
              className={`px-3.5 py-1.5 rounded-full transition-all font-semibold ${
                searchParams.maxFee === '0'
                  ? 'bg-[#0B0F17] text-white shadow-md'
                  : 'bg-[#FAF7F2] text-slate-700 hover:bg-[#FDE4CE] hover:text-[#9A3412] shadow-sm'
              }`}
            >
              Lifetime Free (₹0 Fee)
            </Link>
            <Link
              href="/cards?category=Cashback"
              className={`px-3.5 py-1.5 rounded-full transition-all font-semibold ${
                searchParams.category === 'Cashback'
                  ? 'bg-[#0B0F17] text-white shadow-md'
                  : 'bg-[#FAF7F2] text-slate-700 hover:bg-[#FDE4CE] hover:text-[#9A3412] shadow-sm'
              }`}
            >
              Top Cashback Cards
            </Link>
            <Link
              href="/cards?category=Travel"
              className={`px-3.5 py-1.5 rounded-full transition-all font-semibold ${
                searchParams.category === 'Travel'
                  ? 'bg-[#0B0F17] text-white shadow-md'
                  : 'bg-[#FAF7F2] text-slate-700 hover:bg-[#FDE4CE] hover:text-[#9A3412] shadow-sm'
              }`}
            >
              Airport Lounge Access
            </Link>
          </div>
        </div>

        {/* Results Count & Badges */}
        <div className="flex items-center justify-between text-xs sm:text-sm text-slate-500 px-1">
          <span className="font-medium">
            Showing <strong className="text-slate-800">{cards.length}</strong> of{' '}
            <strong className="text-slate-800">{pagination.total}</strong> verified credit cards
          </span>
        </div>

        {/* Cards Grid */}
        {cards.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {cards.map((card) => (
              <CardItem key={card._id} card={card} />
            ))}
          </div>
        ) : (
          <div className="p-12 text-center rounded-3xl bg-white space-y-4 shadow-xl shadow-black/[0.03]">
            <div className="w-14 h-14 rounded-2xl bg-[#0B0F17] text-white flex items-center justify-center mx-auto shadow-md">
              <MagnifyingGlass size={28} weight="bold" />
            </div>
            <h3 className="text-lg font-bold text-[#0B0F17]">No matching credit cards found</h3>
            <p className="text-xs sm:text-sm text-slate-500 max-w-sm mx-auto">
              Try adjusting your search keywords, bank filter, or category selections.
            </p>
            <Link
              href="/cards"
              className="rounded-full bg-[#0B0F17] text-white font-bold text-xs sm:text-sm px-6 py-2.5 inline-flex items-center gap-1.5 shadow-lg shadow-black/10 hover:bg-[#1E293B] transition-colors"
            >
              <span>Clear all filters</span>
            </Link>
          </div>
        )}

        {/* Pagination Controls */}
        {pagination.totalPages > 1 && (
          <div className="flex items-center justify-center gap-2 pt-6">
            {pagination.hasPrevPage && (
              <Link
                href={`/cards?page=${pagination.page - 1}`}
                className="rounded-full bg-white px-5 py-2 text-xs sm:text-sm font-semibold text-slate-700 hover:text-[#0B0F17] hover:bg-[#F5F2EB] shadow-md hover:shadow-lg transition-all"
              >
                Previous
              </Link>
            )}
            <span className="text-xs sm:text-sm font-bold text-slate-600 px-3">
              Page {pagination.page} of {pagination.totalPages}
            </span>
            {pagination.hasNextPage && (
              <Link
                href={`/cards?page=${pagination.page + 1}`}
                className="rounded-full bg-white px-5 py-2 text-xs sm:text-sm font-semibold text-slate-700 hover:text-[#0B0F17] hover:bg-[#F5F2EB] shadow-md hover:shadow-lg transition-all"
              >
                Next
              </Link>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
