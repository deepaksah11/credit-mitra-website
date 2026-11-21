'use client';

import React, { useState } from 'react';
import { EnvelopeSimple, ChatCircleDots, CheckCircle } from '@phosphor-icons/react';

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
    // Simulate successful form submission
    setSubmitted(true);
  };

  return (
    <div className="max-w-3xl mx-auto px-4 py-8 md:py-16 space-y-8">
      <div className="text-center space-y-3">
        <span className="caption-3 font-semibold uppercase tracking-wider text-teal-800 bg-teal-50 px-3 py-1 rounded-full inline-block">
          Support & Enquiries
        </span>
        <h1 className="heading-3 md:heading-2 font-bold text-neutral-900">
          Contact the Credit Mitra Team
        </h1>
        <p className="body-3 text-neutral-600 max-w-lg mx-auto">
          Have questions about card fees, suggestions for new listings, or partnership enquiries? Send us a message below.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="p-5 rounded-2xl border border-neutral-200 bg-white space-y-2 shadow-sm text-center">
          <EnvelopeSimple size={24} weight="bold" className="text-teal-800 mx-auto" />
          <h3 className="title-4 font-bold text-neutral-900">Email Support</h3>
          <p className="caption-2 text-neutral-500">support@creditmitra.com</p>
        </div>
        <div className="p-5 rounded-2xl border border-neutral-200 bg-white space-y-2 shadow-sm text-center">
          <ChatCircleDots size={24} weight="bold" className="text-teal-800 mx-auto" />
          <h3 className="title-4 font-bold text-neutral-900">Partnerships</h3>
          <p className="caption-2 text-neutral-500">partners@creditmitra.com</p>
        </div>
        <div className="p-5 rounded-2xl border border-neutral-200 bg-white space-y-2 shadow-sm text-center">
          <CheckCircle size={24} weight="bold" className="text-teal-800 mx-auto" />
          <h3 className="title-4 font-bold text-neutral-900">Response Time</h3>
          <p className="caption-2 text-neutral-500">Within 24 business hours</p>
        </div>
      </div>

      <div className="rounded-2xl border border-neutral-200 bg-white p-6 md:p-8 shadow-sm">
        {submitted ? (
          <div className="p-8 text-center space-y-3">
            <div className="w-12 h-12 rounded-full bg-teal-50 text-teal-800 mx-auto flex items-center justify-center">
              <CheckCircle size={32} weight="fill" />
            </div>
            <h3 className="title-2 font-bold text-neutral-900">Message Received</h3>
            <p className="body-4 text-neutral-600 max-w-md mx-auto">
              Thank you for reaching out, {formData.name}. Our editorial team will review your message and reply via email within 24 hours.
            </p>
            <button
              onClick={() => {
                setSubmitted(false);
                setFormData({ name: '', email: '', subject: '', message: '' });
              }}
              className="button-sm rounded-xl border border-neutral-200 text-neutral-700 hover:bg-neutral-50 mt-4"
            >
              Send Another Note
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="caption-3 font-semibold text-neutral-700 block mb-1.5">
                  Your Full Name *
                </label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="e.g. Rahul Sharma"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-neutral-200 text-sm focus:outline-none focus:ring-2 focus:ring-teal-700"
                />
              </div>
              <div>
                <label className="caption-3 font-semibold text-neutral-700 block mb-1.5">
                  Email Address *
                </label>
                <input
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  placeholder="rahul@example.com"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-neutral-200 text-sm focus:outline-none focus:ring-2 focus:ring-teal-700"
                />
              </div>
            </div>

            <div>
              <label className="caption-3 font-semibold text-neutral-700 block mb-1.5">
                Subject
              </label>
              <input
                type="text"
                value={formData.subject}
                onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                placeholder="Card recommendation, fee correction, or feedback"
                className="w-full px-3.5 py-2.5 rounded-xl border border-neutral-200 text-sm focus:outline-none focus:ring-2 focus:ring-teal-700"
              />
            </div>

            <div>
              <label className="caption-3 font-semibold text-neutral-700 block mb-1.5">
                Message *
              </label>
              <textarea
                required
                rows={5}
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                placeholder="Tell us what you need assistance with..."
                className="w-full px-3.5 py-2.5 rounded-xl border border-neutral-200 text-sm focus:outline-none focus:ring-2 focus:ring-teal-700 resize-none"
              />
            </div>

            <button
              type="submit"
              className="w-full button-md rounded-xl bg-teal-800 text-white font-semibold hover:bg-teal-900 active:scale-[0.98] transition-all shadow-sm"
            >
              Submit Message
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
