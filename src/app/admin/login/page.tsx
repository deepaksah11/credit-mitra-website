'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { loginAdmin } from '@/lib/api';
import { LockSimple, Envelope, CreditCard, ArrowLeft, Sparkle } from '@phosphor-icons/react';

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
    <div className="min-h-[75vh] flex items-center justify-center px-4 py-12 relative">
      {/* Background Soft Blue Ambient Glow Mesh matching Hero */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[450px] pointer-events-none -z-10 opacity-70"
        style={{
          background:
            'radial-gradient(circle, rgba(147, 197, 253, 0.45) 0%, rgba(191, 219, 254, 0.15) 50%, transparent 70%)',
        }}
      />

      <div className="w-full max-w-md rounded-3xl border border-slate-200/90 bg-white/95 backdrop-blur-md p-8 sm:p-10 shadow-xl shadow-blue-900/5 space-y-6">
        <div>
          <Link
            href="/"
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-500 hover:text-[#1A56DB] mb-4 transition-colors"
          >
            <ArrowLeft size={14} weight="bold" />
            <span>Back to public site</span>
          </Link>
          <div className="w-12 h-12 rounded-2xl bg-blue-50 text-[#1A56DB] flex items-center justify-center mb-3 border border-blue-100 shadow-sm">
            <CreditCard size={24} weight="bold" />
          </div>
          <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-blue-100/70 text-[#1A56DB] text-[11px] font-bold uppercase tracking-wider mb-2">
            <Sparkle size={12} weight="fill" />
            <span>Admin Console</span>
          </div>
          <h1 className="text-2xl font-extrabold text-[#0F172A] tracking-tight">Admin Portal Login</h1>
          <p className="text-xs text-slate-500 mt-1 leading-relaxed">
            Sign in to manage credit card listings, referral links, and view performance analytics.
          </p>
        </div>

        {error && (
          <div className="p-3.5 rounded-2xl bg-rose-50 border border-rose-200 text-xs text-rose-700 font-medium">
            {error}
          </div>
        )}

        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className="text-xs font-bold text-slate-700 block mb-1.5">
              Admin Email
            </label>
            <div className="relative">
              <Envelope size={18} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="admin@creditmitra.com"
                className="w-full pl-10 pr-4 py-2.5 rounded-2xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-[#1A56DB] transition-all"
              />
            </div>
          </div>

          <div>
            <label className="text-xs font-bold text-slate-700 block mb-1.5">
              Password
            </label>
            <div className="relative">
              <LockSimple size={18} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full pl-10 pr-4 py-2.5 rounded-2xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-[#1A56DB] transition-all"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-full bg-[#1A56DB] text-white font-bold py-3 text-sm hover:bg-blue-700 active:scale-[0.98] transition-all shadow-md shadow-blue-600/25 disabled:opacity-50"
          >
            {loading ? 'Authenticating...' : 'Sign In'}
          </button>
        </form>

        <div className="pt-2 border-t border-slate-100 text-center">
          <p className="text-[11px] text-slate-400">
            Default credentials for local setup: admin@creditmitra.com / Admin@123456
          </p>
        </div>
      </div>
    </div>
  );
}
