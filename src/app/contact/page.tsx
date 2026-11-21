'use client';

import React, { useState } from 'react';
import { EnvelopeSimple, ChatCircleDots, CheckCircle, Sparkle } from '@phosphor-icons/react';

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) {
      alert('Please fill out all required fields.');
      return;
    }
    setSubmitted(true);
  };

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

      <div className="max-w-4xl mx-auto px-4 py-8 md:py-16 space-y-10">
        <div className="text-center space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#FDE4CE] text-[#9A3412] text-xs font-bold shadow-sm">
            <Sparkle size={13} weight="fill" className="text-[#9A3412]" />
            <span>Support &amp; Inquiries</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-[#0B0F17] tracking-tight">
            Contact the Credit Mitra Team
          </h1>
          <p className="text-sm sm:text-base text-slate-500 max-w-lg mx-auto">
            Have questions about card fees, suggestions for new listings, or partnership enquiries? Send us a message below.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          <div className="p-6 rounded-3xl bg-white space-y-2 shadow-xl shadow-black/[0.03] text-center hover:shadow-2xl hover:shadow-black/10 hover:-translate-y-1 transition-all duration-300">
            <div className="w-10 h-10 rounded-2xl bg-[#0B0F17] text-white flex items-center justify-center mx-auto mb-2 shadow-sm">
              <EnvelopeSimple size={22} weight="bold" />
            </div>
            <h3 className="text-sm font-bold text-[#0B0F17]">Email Support</h3>
            <p className="text-xs text-slate-500">support@creditmitra.com</p>
          </div>
          <div className="p-6 rounded-3xl bg-white space-y-2 shadow-xl shadow-black/[0.03] text-center hover:shadow-2xl hover:shadow-black/10 hover:-translate-y-1 transition-all duration-300">
            <div className="w-10 h-10 rounded-2xl bg-[#0B0F17] text-white flex items-center justify-center mx-auto mb-2 shadow-sm">
              <ChatCircleDots size={22} weight="bold" />
            </div>
            <h3 className="text-sm font-bold text-[#0B0F17]">Partnerships</h3>
            <p className="text-xs text-slate-500">partners@creditmitra.com</p>
          </div>
          <div className="p-6 rounded-3xl bg-white space-y-2 shadow-xl shadow-black/[0.03] text-center hover:shadow-2xl hover:shadow-black/10 hover:-translate-y-1 transition-all duration-300">
            <div className="w-10 h-10 rounded-2xl bg-[#0B0F17] text-white flex items-center justify-center mx-auto mb-2 shadow-sm">
              <CheckCircle size={22} weight="bold" />
            </div>
            <h3 className="text-sm font-bold text-[#0B0F17]">Response Time</h3>
            <p className="text-xs text-slate-500">Within 24 business hours</p>
          </div>
        </div>

        <div className="rounded-3xl bg-white p-6 sm:p-10 shadow-xl shadow-black/[0.03]">
          {submitted ? (
            <div className="p-8 text-center space-y-3">
              <div className="w-14 h-14 rounded-full bg-emerald-100 text-emerald-700 mx-auto flex items-center justify-center">
                <CheckCircle size={36} weight="fill" />
              </div>
              <h3 className="text-xl font-bold text-[#0B0F17]">Message Received</h3>
              <p className="text-sm text-slate-600 max-w-md mx-auto">
                Thank you for reaching out, {formData.name}. Our editorial team will review your message and reply via email within 24 hours.
              </p>
              <button
                onClick={() => {
                  setSubmitted(false);
                  setFormData({ name: '', email: '', subject: '', message: '' });
                }}
                className="rounded-full bg-[#FAF7F2] hover:bg-[#F5F2EB] text-slate-800 px-5 py-2 text-xs font-semibold mt-4 shadow-sm transition-all"
              >
                Send Another Note
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-bold text-slate-700 block mb-1.5">
                    Your Full Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="e.g. Rahul Sharma"
                    className="w-full px-4 py-3 rounded-2xl bg-[#FAF7F2] text-sm focus:outline-none focus:ring-2 focus:ring-[#0B0F17] transition-all font-medium"
                  />
                </div>
                <div>
                  <label className="text-xs font-bold text-slate-700 block mb-1.5">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="rahul@example.com"
                    className="w-full px-4 py-3 rounded-2xl bg-[#FAF7F2] text-sm focus:outline-none focus:ring-2 focus:ring-[#0B0F17] transition-all font-medium"
                  />
                </div>
              </div>

              <div>
                <label className="text-xs font-bold text-slate-700 block mb-1.5">
                  Subject
                </label>
                <input
                  type="text"
                  value={formData.subject}
                  onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                  placeholder="Card recommendation, fee correction, or feedback"
                  className="w-full px-4 py-3 rounded-2xl bg-[#FAF7F2] text-sm focus:outline-none focus:ring-2 focus:ring-[#0B0F17] transition-all font-medium"
                />
              </div>

              <div>
                <label className="text-xs font-bold text-slate-700 block mb-1.5">
                  Message *
                </label>
                <textarea
                  required
                  rows={5}
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  placeholder="Tell us what you need assistance with..."
                  className="w-full px-4 py-3 rounded-2xl bg-[#FAF7F2] text-sm focus:outline-none focus:ring-2 focus:ring-[#0B0F17] resize-none transition-all font-medium"
                />
              </div>

              <button
                type="submit"
                className="w-full rounded-full bg-[#0B0F17] text-white font-bold py-3.5 text-sm sm:text-base hover:bg-[#1E293B] active:scale-[0.98] transition-all shadow-xl shadow-black/10"
              >
                Submit Message
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
