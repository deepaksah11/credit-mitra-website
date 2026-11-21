'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { loginAdmin } from '@/lib/api';
import { LockSimple, Envelope, CreditCard, ArrowLeft } from '@phosphor-icons/react';

export default function AdminLoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const data = await loginAdmin(email, password);
      // Store token and admin info in localStorage
      localStorage.setItem('credit_mitra_admin_token', data.token);
      localStorage.setItem('credit_mitra_admin_user', JSON.stringify(data.admin));
      router.push('/admin');
    } catch (err: any) {
      setError(err.message || 'Invalid email or password credentials');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[75vh] flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-md rounded-2xl border border-neutral-200 bg-white p-8 shadow-sm space-y-6">
        <div>
          <Link
            href="/"
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-neutral-500 hover:text-neutral-800 mb-4"
          >
            <ArrowLeft size={14} />
            <span>Back to public site</span>
          </Link>
          <div className="w-10 h-10 rounded-xl bg-teal-800 text-white flex items-center justify-center mb-3">
            <CreditCard size={22} weight="bold" />
          </div>
          <h1 className="title-1 font-bold text-neutral-900">Admin Portal Login</h1>
          <p className="caption-1 text-neutral-500 mt-1">
            Sign in to manage credit card listings, referral links, and view performance analytics.
          </p>
        </div>

        {error && (
          <div className="p-3 rounded-xl bg-rose-50 border border-rose-200 text-xs text-rose-700">
            {error}
          </div>
        )}

        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className="caption-3 font-semibold text-neutral-700 block mb-1">
              Admin Email
            </label>
            <div className="relative">
              <Envelope size={18} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-neutral-400" />
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="admin@creditmitra.com"
                className="w-full pl-10 pr-3.5 py-2.5 rounded-xl border border-neutral-200 text-sm focus:outline-none focus:ring-2 focus:ring-teal-700"
              />
            </div>
          </div>

          <div>
            <label className="caption-3 font-semibold text-neutral-700 block mb-1">
              Password
            </label>
            <div className="relative">
              <LockSimple size={18} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-neutral-400" />
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full pl-10 pr-3.5 py-2.5 rounded-xl border border-neutral-200 text-sm focus:outline-none focus:ring-2 focus:ring-teal-700"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full button-md rounded-xl bg-teal-800 text-white font-semibold hover:bg-teal-900 active:scale-[0.98] transition-all disabled:opacity-50"
          >
            {loading ? 'Authenticating...' : 'Sign In'}
          </button>
        </form>

        <div className="pt-2 border-t border-neutral-100 text-center">
          <p className="caption-5 text-neutral-400">
            Default credentials for local setup: admin@creditmitra.com / Admin@123456
          </p>
        </div>
      </div>
    </div>
  );
}
