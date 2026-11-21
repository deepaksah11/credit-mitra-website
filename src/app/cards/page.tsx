import React from 'react';
import { getCards } from '@/lib/api';
import CardItem from '@/components/CardItem';
import Link from 'next/link';
import { Funnel, MagnifyingGlass, ArrowCounterClockwise } from '@phosphor-icons/react/dist/ssr';

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
    'Browse our comprehensive catalog of verified credit cards. Filter by bank, cashback rate, zero annual fee, and lounge perks.',
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
    <div className="max-w-6xl mx-auto px-4 py-8 md:py-12 space-y-8">
      {/* Page Header */}
      <div>
        <h1 className="heading-3 md:heading-2 font-bold text-neutral-900 mb-2">
          Credit Card Catalog
        </h1>
        <p className="body-4 text-neutral-500 max-w-2xl">
          Compare cards by rewards, annual charges, and bank perks. All cards feature direct links to official bank application portals.
        </p>
      </div>

      {/* Filter and Search Bar */}
      <div className="p-4 rounded-2xl border border-neutral-200 bg-white shadow-sm space-y-4">
        {/* Search Input Form */}
        <form method="GET" action="/cards" className="flex flex-col md:flex-row gap-3">
          <div className="relative flex-1">
            <MagnifyingGlass
              size={18}
              weight="bold"
              className="absolute left-3.5 top-1/2 -translate-y-1/2 text-neutral-400"
            />
            <input
              type="text"
              name="search"
              defaultValue={searchParams.search || ''}
              placeholder="Search by card title, bank, or perk (e.g., Lounge, Swiggy, Amazon)..."
              className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-neutral-200 text-sm focus:outline-none focus:ring-2 focus:ring-teal-700 focus:border-transparent"
            />
          </div>

          {/* Bank Dropdown */}
          <select
            name="bank"
            defaultValue={searchParams.bank || ''}
            className="px-3 py-2.5 rounded-xl border border-neutral-200 text-sm bg-white text-neutral-700 focus:outline-none focus:ring-2 focus:ring-teal-700"
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
            className="px-3 py-2.5 rounded-xl border border-neutral-200 text-sm bg-white text-neutral-700 focus:outline-none focus:ring-2 focus:ring-teal-700"
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
            className="px-3 py-2.5 rounded-xl border border-neutral-200 text-sm bg-white text-neutral-700 focus:outline-none focus:ring-2 focus:ring-teal-700"
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
            className="button-sm rounded-xl bg-teal-800 text-white font-semibold hover:bg-teal-900 transition-colors"
          >
            Filter
          </button>

          {(searchParams.search || searchParams.bank || searchParams.category || searchParams.maxFee) && (
            <Link
              href="/cards"
              className="button-sm rounded-xl border border-neutral-200 text-neutral-600 hover:bg-neutral-50 flex items-center justify-center gap-1"
            >
              <ArrowCounterClockwise size={16} />
              <span>Reset</span>
            </Link>
          )}
        </form>

        {/* Quick Fee Filter Badges */}
        <div className="flex flex-wrap items-center gap-2 pt-2 border-t border-neutral-100 text-xs text-neutral-500">
          <span className="font-semibold text-neutral-700">Quick Filters:</span>
          <Link
            href="/cards?maxFee=0"
            className={`px-2.5 py-1 rounded-lg border transition-colors ${
              searchParams.maxFee === '0'
                ? 'bg-teal-800 text-white border-teal-800 font-semibold'
                : 'border-neutral-200 hover:bg-neutral-50'
            }`}
          >
            Lifetime Free (₹0 Fee)
          </Link>
          <Link
            href="/cards?category=Cashback"
            className={`px-2.5 py-1 rounded-lg border transition-colors ${
              searchParams.category === 'Cashback'
                ? 'bg-teal-800 text-white border-teal-800 font-semibold'
                : 'border-neutral-200 hover:bg-neutral-50'
            }`}
          >
            Top Cashback
          </Link>
          <Link
            href="/cards?category=Travel"
            className={`px-2.5 py-1 rounded-lg border transition-colors ${
              searchParams.category === 'Travel'
                ? 'bg-teal-800 text-white border-teal-800 font-semibold'
                : 'border-neutral-200 hover:bg-neutral-50'
            }`}
          >
            Airport Lounge Access
          </Link>
        </div>
      </div>

      {/* Results Header */}
      <div className="flex items-center justify-between text-sm text-neutral-500">
        <span>Showing {cards.length} of {pagination.total} credit cards</span>
      </div>

      {/* Cards Grid */}
      {cards.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {cards.map((card) => (
            <CardItem key={card._id} card={card} />
          ))}
        </div>
      ) : (
        <div className="p-12 text-center rounded-2xl border border-dashed border-neutral-200 bg-white space-y-3">
          <p className="title-3 font-semibold text-neutral-800">No matching credit cards found</p>
          <p className="body-5 text-neutral-500 max-w-sm mx-auto">
            Try adjusting your search keywords, bank filter, or category selections.
          </p>
          <Link
            href="/cards"
            className="button-sm rounded-xl bg-teal-800 text-white font-semibold inline-block mt-2"
          >
            Clear all filters
          </Link>
        </div>
      )}

      {/* Pagination Controls */}
      {pagination.totalPages > 1 && (
        <div className="flex items-center justify-center gap-2 pt-6">
          {pagination.hasPrevPage && (
            <Link
              href={`/cards?page=${pagination.page - 1}`}
              className="button-sm rounded-lg border border-neutral-200 text-neutral-700 hover:bg-neutral-50"
            >
              Previous
            </Link>
          )}
          <span className="text-sm font-medium text-neutral-600 px-3">
            Page {pagination.page} of {pagination.totalPages}
          </span>
          {pagination.hasNextPage && (
            <Link
              href={`/cards?page=${pagination.page + 1}`}
              className="button-sm rounded-lg border border-neutral-200 text-neutral-700 hover:bg-neutral-50"
            >
              Next
            </Link>
          )}
        </div>
      )}
    </div>
  );
}
