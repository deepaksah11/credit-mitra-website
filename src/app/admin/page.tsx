'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import {
  getAdminMe,
  getAdminCards,
  getAdminAnalytics,
  toggleAdminCardStatus,
  deleteAdminCard,
} from '@/lib/api';
import { Card, AnalyticsData } from '@/types/card';
import { formatCurrency } from '@/lib/utils';
import {
  Eye,
  CursorClick,
  CreditCard,
  Plus,
  PencilSimple,
  Trash,
  SignOut,
  Sparkle,
  DeviceMobile,
  Desktop,
  DeviceTablet,
  Check,
  X,
} from '@phosphor-icons/react';

export default function AdminDashboardPage() {
  const router = useRouter();
  const [token, setToken] = useState<string | null>(null);
  const [adminUser, setAdminUser] = useState<any>(null);
  const [analytics, setAnalytics] = useState<AnalyticsData | null>(null);
  const [cards, setCards] = useState<Card[]>([]);
  const [loading, setLoading] = useState(true);
  const [filterBank, setFilterBank] = useState('');
  const [statusMessage, setStatusMessage] = useState('');

  useEffect(() => {
    const storedToken = localStorage.getItem('credit_mitra_admin_token');
    if (!storedToken) {
      router.push('/admin/login');
      return;
    }
    setToken(storedToken);

    loadDashboard(storedToken);
  }, [router]);

  const loadDashboard = async (authToken: string) => {
    setLoading(true);
    try {
      const [adminData, analyticsData, cardsData] = await Promise.all([
        getAdminMe(authToken).catch(() => null),
        getAdminAnalytics(authToken).catch(() => null),
        getAdminCards(authToken, { limit: '50' }).catch(() => ({ data: [] })),
      ]);

      if (!adminData) {
        localStorage.removeItem('credit_mitra_admin_token');
        router.push('/admin/login');
        return;
      }

      setAdminUser(adminData);
      setAnalytics(analyticsData);
      setCards(cardsData.data || []);
    } catch (error) {
      console.error('Failed to load admin dashboard:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleToggle = async (cardId: string, action: 'active' | 'featured' | 'hero') => {
    if (!token) return;
    try {
      const updatedCard = await toggleAdminCardStatus(token, cardId, action);
      setCards((prev) =>
        prev.map((c) => (c._id === cardId ? { ...c, ...updatedCard } : c))
      );
      let actionLabel = 'visibility';
      if (action === 'featured') actionLabel = 'featured status';
      if (action === 'hero') actionLabel = 'hero slider status';
      setStatusMessage(`Card ${actionLabel} updated`);
      setTimeout(() => setStatusMessage(''), 3000);
    } catch (error: any) {
      alert(error.message || 'Failed to update status');
    }
  };

  const handleDelete = async (cardId: string, title: string) => {
    if (!token) return;
    if (!confirm(`Are you sure you want to permanently delete "${title}"?`)) {
      return;
    }

    try {
      await deleteAdminCard(token, cardId);
      setCards((prev) => prev.filter((c) => c._id !== cardId));
      setStatusMessage(`Deleted card "${title}"`);
      setTimeout(() => setStatusMessage(''), 3000);
    } catch (error: any) {
      alert(error.message || 'Failed to delete card');
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('credit_mitra_admin_token');
    localStorage.removeItem('credit_mitra_admin_user');
    router.push('/admin/login');
  };

  if (loading) {
    return (
      <div className="max-w-6xl mx-auto px-4 py-24 text-center">
        <p className="title-3 font-semibold text-neutral-600">Loading admin dashboard...</p>
      </div>
    );
  }

  const filteredCards = filterBank
    ? cards.filter((c) => c.bankName.toLowerCase() === filterBank.toLowerCase())
    : cards;

  return (
    <div className="max-w-6xl mx-auto px-4 py-8 md:py-12 space-y-8">
      {/* Admin Top Bar */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 p-5 rounded-2xl bg-white border border-neutral-200 shadow-sm">
        <div>
          <span className="caption-3 font-semibold uppercase tracking-wider text-teal-800 bg-teal-50 px-2 py-0.5 rounded">
            Authenticated Admin
          </span>
          <h1 className="title-1 font-bold text-neutral-900 mt-1">
            Dashboard & Card Management
          </h1>
          <p className="caption-2 text-neutral-500">
            Logged in as {adminUser?.name || 'Admin'} ({adminUser?.email})
          </p>
        </div>

        <div className="flex items-center gap-3">
          <Link
            href="/admin/cards/new"
            className="button-sm rounded-xl bg-teal-800 text-white font-semibold hover:bg-teal-900 flex items-center gap-1.5 shadow-sm"
          >
            <Plus size={16} weight="bold" />
            <span>Add New Card</span>
          </Link>
          <button
            onClick={handleLogout}
            className="button-sm rounded-xl border border-neutral-200 text-neutral-600 hover:bg-neutral-50 flex items-center gap-1.5 font-medium"
          >
            <SignOut size={16} />
            <span>Sign Out</span>
          </button>
        </div>
      </div>

      {statusMessage && (
        <div className="p-3 rounded-xl bg-teal-50 border border-teal-200 text-xs text-teal-900 font-semibold">
          {statusMessage}
        </div>
      )}

      {/* Analytics KPI Overview Cards */}
      {analytics?.overview && (
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
          <div className="p-4 rounded-xl border border-neutral-200 bg-white shadow-sm">
            <span className="caption-5 text-neutral-500 block">Total Cards</span>
            <span className="title-1 font-bold text-neutral-900">
              {analytics.overview.totalCards}
            </span>
            <span className="caption-5 text-neutral-400 block mt-0.5">
              {analytics.overview.activeCards} active, {analytics.overview.hiddenCards} hidden
            </span>
          </div>

          <div className="p-4 rounded-xl border border-neutral-200 bg-white shadow-sm">
            <span className="caption-5 text-neutral-500 block">Featured Cards</span>
            <span className="title-1 font-bold text-amber-700">
              {analytics.overview.featuredCards}
            </span>
            <span className="caption-5 text-neutral-400 block mt-0.5">Pinned at top</span>
          </div>

          <div className="p-4 rounded-xl border border-blue-200 bg-blue-50/40 shadow-sm">
            <span className="caption-5 text-blue-700 block font-semibold">Hero Slider Cards</span>
            <span className="title-1 font-bold text-blue-800">
              {cards.filter((c) => c.isHeroFeatured).length}
            </span>
            <span className="caption-5 text-blue-600/70 block mt-0.5">Active in hero slider</span>
          </div>

          <div className="p-4 rounded-xl border border-neutral-200 bg-white shadow-sm">
            <span className="caption-5 text-neutral-500 block">Total Page Views</span>
            <span className="title-1 font-bold text-neutral-900 flex items-center gap-1">
              <Eye size={20} className="text-neutral-400" />
              {analytics.overview.totalViews}
            </span>
            <span className="caption-5 text-neutral-400 block mt-0.5">Catalog & details</span>
          </div>

          <div className="p-4 rounded-xl border border-neutral-200 bg-white shadow-sm">
            <span className="caption-5 text-neutral-500 block">Total Apply Clicks</span>
            <span className="title-1 font-bold text-teal-800 flex items-center gap-1">
              <CursorClick size={20} className="text-teal-700" />
              {analytics.overview.totalClicks}
            </span>
            <span className="caption-5 text-neutral-400 block mt-0.5">Referral redirects</span>
          </div>

          <div className="p-4 rounded-xl border border-neutral-200 bg-white shadow-sm">
            <span className="caption-5 text-neutral-500 block">Overall CTR</span>
            <span className="title-1 font-bold text-teal-700">
              {analytics.overview.overallCtr}%
            </span>
            <span className="caption-5 text-neutral-400 block mt-0.5">Click-through rate</span>
          </div>

          <div className="p-4 rounded-xl border border-neutral-200 bg-white shadow-sm">
            <span className="caption-5 text-neutral-500 block">Device Mix</span>
            <div className="flex items-center gap-2 mt-1 text-xs text-neutral-600">
              {analytics.deviceBreakdown.map((d) => (
                <span key={d.device} className="capitalize">
                  {d.device}: {d.count}
                </span>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Card Management Section */}
      <div className="rounded-2xl border border-neutral-200 bg-white p-6 shadow-sm space-y-4">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
          <div>
            <h2 className="title-2 font-bold text-neutral-900">Credit Card Catalog</h2>
            <p className="caption-2 text-neutral-500">
              Manage product visibility, feature pinning, and destination affiliate URLs.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <select
              value={filterBank}
              onChange={(e) => setFilterBank(e.target.value)}
              className="px-3 py-1.5 rounded-lg border border-neutral-200 text-xs bg-white text-neutral-700"
            >
              <option value="">All Banks</option>
              {Array.from(new Set(cards.map((c) => c.bankName))).map((b) => (
                <option key={b} value={b}>
                  {b}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Card Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm border-collapse">
            <thead>
              <tr className="border-b border-neutral-200 bg-neutral-50/70 text-xs font-semibold uppercase text-neutral-500">
                <th className="p-3">Card</th>
                <th className="p-3">Bank & Category</th>
                <th className="p-3">Annual Fee</th>
                <th className="p-3 text-center">Views</th>
                <th className="p-3 text-center">Clicks</th>
                <th className="p-3 text-center">Active</th>
                <th className="p-3 text-center">Featured</th>
                <th className="p-3 text-center">Hero Slide</th>
                <th className="p-3 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-neutral-100">
              {filteredCards.map((card) => (
                <tr key={card._id} className="hover:bg-neutral-50/60 transition-colors">
                  {/* Card Title & Image */}
                  <td className="p-3">
                    <div className="flex items-center gap-3">
                      <div className="relative w-12 h-8 rounded-lg overflow-hidden bg-neutral-100 border border-neutral-200 flex-shrink-0">
                        <Image src={card.imageUrl} alt={card.title} fill className="object-cover" />
                      </div>
                      <div>
                        <Link
                          href={`/cards/${card.slug}`}
                          target="_blank"
                          className="font-semibold text-neutral-900 hover:text-teal-800 transition-colors line-clamp-1"
                        >
                          {card.title}
                        </Link>
                        <span className="caption-5 text-neutral-400 block font-mono">
                          /go/{card.slug}
                        </span>
                      </div>
                    </div>
                  </td>

                  {/* Bank & Category */}
                  <td className="p-3">
                    <span className="font-medium text-neutral-700 block">{card.bankName}</span>
                    <span className="caption-5 text-teal-800 bg-teal-50 px-1.5 py-0.5 rounded inline-block mt-0.5">
                      {card.category}
                    </span>
                  </td>

                  {/* Annual Fee */}
                  <td className="p-3 font-semibold text-neutral-800">
                    {formatCurrency(card.annualFee)}
                  </td>

                  {/* Views */}
                  <td className="p-3 text-center font-medium text-neutral-600">
                    {card.viewsCount}
                  </td>

                  {/* Clicks */}
                  <td className="p-3 text-center font-bold text-teal-800">
                    {card.clicksCount}
                  </td>

                  {/* Active Toggle Switch */}
                  <td className="p-3 text-center">
                    <button
                      onClick={() => handleToggle(card._id, 'active')}
                      className={`px-2.5 py-1 rounded-full text-xs font-semibold transition-colors ${
                        card.isActive
                          ? 'bg-emerald-100 text-emerald-800 hover:bg-emerald-200'
                          : 'bg-neutral-200 text-neutral-600 hover:bg-neutral-300'
                      }`}
                    >
                      {card.isActive ? 'Active' : 'Hidden'}
                    </button>
                  </td>

                  {/* Featured Toggle Switch */}
                  <td className="p-3 text-center">
                    <button
                      onClick={() => handleToggle(card._id, 'featured')}
                      className={`px-2.5 py-1 rounded-full text-xs font-semibold transition-colors ${
                        card.isFeatured
                          ? 'bg-amber-100 text-amber-800 hover:bg-amber-200'
                          : 'bg-neutral-100 text-neutral-400 hover:bg-neutral-200'
                      }`}
                    >
                      {card.isFeatured ? '★ Featured' : 'Normal'}
                    </button>
                  </td>

                  {/* Hero Slider Toggle Switch */}
                  <td className="p-3 text-center">
                    <button
                      onClick={() => handleToggle(card._id, 'hero')}
                      className={`px-2.5 py-1 rounded-full text-xs font-semibold transition-colors flex items-center gap-1 mx-auto ${
                        card.isHeroFeatured
                          ? 'bg-blue-100 text-blue-800 hover:bg-blue-200 border border-blue-200'
                          : 'bg-neutral-100 text-neutral-400 hover:bg-neutral-200'
                      }`}
                    >
                      <Sparkle size={12} weight={card.isHeroFeatured ? 'fill' : 'regular'} />
                      <span>{card.isHeroFeatured ? 'In Hero' : 'Off'}</span>
                    </button>
                  </td>

                  {/* Actions */}
                  <td className="p-3 text-right">
                    <div className="flex items-center justify-end gap-1.5">
                      <Link
                        href={`/admin/cards/${card._id}`}
                        className="p-1.5 rounded-lg border border-neutral-200 text-neutral-600 hover:text-teal-800 hover:bg-neutral-100 transition-colors"
                        title="Edit Card"
                      >
                        <PencilSimple size={16} />
                      </Link>
                      <button
                        onClick={() => handleDelete(card._id, card.title)}
                        className="p-1.5 rounded-lg border border-neutral-200 text-neutral-400 hover:text-red-600 hover:bg-red-50 transition-colors"
                        title="Delete Card"
                      >
                        <Trash size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
