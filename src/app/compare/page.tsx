'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useCompare } from '@/context/CompareContext';
import { getCards, API_BASE_URL } from '@/lib/api';
import { Card } from '@/types/card';
import { formatCurrency } from '@/lib/utils';
import {
  Scales,
  Trash,
  PlusCircle,
  ArrowSquareOut,
  Check,
  X,
  Sparkle,
  ArrowRight,
} from '@phosphor-icons/react';

export default function ComparePage() {
  const { selectedCards, removeFromCompare, clearCompare, addToCompare } = useCompare();
  const [availableCards, setAvailableCards] = useState<Card[]>([]);
  const [pickerOpen, setPickerOpen] = useState(false);

  useEffect(() => {
    getCards({ limit: 50 }).then((res) => {
      setAvailableCards(res.data || []);
    });
  }, []);

  return (
    <div className="relative min-h-screen pb-20">
      {/* Background Soft Peach Ambient Glow Mesh matching Hero */}
      <div
        className="absolute -top-24 right-0 w-[650px] h-[550px] pointer-events-none -z-10"
        style={{
          background:
            'radial-gradient(circle at 70% 30%, rgba(254, 215, 170, 0.4) 0%, rgba(251, 146, 60, 0.15) 50%, transparent 70%)',
        }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6 sm:pt-10 space-y-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#FDE4CE] text-[#9A3412] text-xs font-bold shadow-sm">
              <Scales size={15} weight="bold" />
              <span>Smart Comparison Tool</span>
            </div>
            <h1 className="text-3xl sm:text-4xl font-extrabold text-[#0B0F17] tracking-tight">
              Side-by-Side Card Comparison
            </h1>
            <p className="text-sm sm:text-base text-slate-500 max-w-xl">
              Compare joining fees, annual charges, welcome perks, and pros &amp; cons across 2 to 3 credit cards.
            </p>
          </div>

          {selectedCards.length > 0 && (
            <div className="flex items-center gap-3">
              {selectedCards.length < 3 && (
                <button
                  onClick={() => setPickerOpen(true)}
                  className="rounded-full bg-[#0B0F17] text-white hover:bg-[#1E293B] active:scale-95 transition-all px-5 py-2.5 text-xs sm:text-sm font-bold shadow-lg shadow-black/10 flex items-center gap-2"
                >
                  <PlusCircle size={18} weight="bold" />
                  <span>Add Card ({3 - selectedCards.length} slot left)</span>
                </button>
              )}
              <button
                onClick={clearCompare}
                className="rounded-full bg-white text-slate-700 hover:text-rose-600 hover:bg-rose-50 active:scale-95 transition-all px-4 py-2.5 text-xs sm:text-sm font-semibold flex items-center gap-1.5 shadow-md shadow-black/[0.03]"
              >
                <Trash size={16} />
                <span>Clear All</span>
              </button>
            </div>
          )}
        </div>

        {/* Comparison Grid */}
        {selectedCards.length === 0 ? (
          <div className="p-12 sm:p-16 text-center rounded-3xl bg-white space-y-4 shadow-xl shadow-black/[0.03]">
            <div className="w-16 h-16 rounded-2xl bg-[#0B0F17] text-white mx-auto flex items-center justify-center shadow-md">
              <Scales size={32} weight="bold" />
            </div>
            <h2 className="text-xl sm:text-2xl font-extrabold text-[#0B0F17]">
              No cards selected for comparison yet
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 max-w-md mx-auto leading-relaxed">
              Choose 2 or 3 cards from our curated collection to compare annual fees, airport lounge access, and fee waivers side by side.
            </p>
            <div className="pt-2 flex flex-wrap justify-center gap-3">
              <Link
                href="/cards"
                className="rounded-full bg-[#0B0F17] text-white hover:bg-[#1E293B] active:scale-95 transition-all px-7 py-3 text-sm font-bold shadow-lg shadow-black/10 inline-flex items-center gap-2"
              >
                <span>Browse Card Directory</span>
                <ArrowRight size={16} weight="bold" />
              </Link>
              <button
                onClick={() => setPickerOpen(true)}
                className="rounded-full bg-white hover:bg-[#F5F2EB] text-[#0B0F17] px-6 py-3 text-sm font-bold shadow-md transition-all"
              >
                Quick Add From List
              </button>
            </div>
          </div>
        ) : (
          <div className="overflow-x-auto pb-4">
            <div className="min-w-[760px] rounded-3xl bg-white shadow-xl shadow-black/[0.03] overflow-hidden">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-[#FAF7F2]">
                    <th className="p-5 w-1/4 text-xs font-bold uppercase tracking-wider text-slate-400">
                      Product Details
                    </th>
                    {selectedCards.map((card) => (
                      <th key={card._id} className="p-5 w-1/4 align-top">
                        <div className="flex items-start justify-between gap-2">
                          <div className="space-y-1">
                            <span className="text-[11px] font-semibold text-slate-700 bg-white shadow-sm px-2.5 py-0.5 rounded-full">
                              {card.bankName}
                            </span>
                            <h3 className="text-base font-bold text-[#0B0F17] line-clamp-2 leading-snug">
                              {card.title}
                            </h3>
                          </div>
                          <button
                            onClick={() => removeFromCompare(card._id)}
                            aria-label="Remove card"
                            className="p-1.5 rounded-full text-slate-400 hover:text-rose-600 hover:bg-rose-50 transition-colors"
                          >
                            <Trash size={16} />
                          </button>
                        </div>
                        <div className="relative w-full h-28 rounded-xl overflow-hidden mt-3 bg-gradient-to-br from-slate-900 to-slate-800 shadow-md">
                          <Image
                            src={card.imageUrl}
                            alt={card.title}
                            fill
                            className="object-cover"
                          />
                        </div>
                        <a
                          href={`${API_BASE_URL}/go/${card.slug}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="mt-3.5 w-full rounded-full bg-[#0B0F17] hover:bg-[#1E293B] text-white text-center py-2.5 text-xs font-bold shadow-md shadow-black/10 flex items-center justify-center gap-1.5 transition-all"
                        >
                          <span>Apply Now</span>
                          <ArrowSquareOut size={14} weight="bold" />
                        </a>
                      </th>
                    ))}
                    {selectedCards.length < 3 && (
                      <th className="p-5 w-1/4 align-middle text-center bg-[#FAF7F2]/60">
                        <button
                          onClick={() => setPickerOpen(true)}
                          className="p-5 rounded-2xl bg-white hover:bg-[#FDE4CE] text-[#0B0F17] transition-all inline-flex flex-col items-center gap-2 text-xs font-bold shadow-sm"
                        >
                          <PlusCircle size={28} weight="bold" />
                          <span>Add another card</span>
                        </button>
                      </th>
                    )}
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 text-sm">
                  {/* Category */}
                  <tr>
                    <td className="p-4 font-bold text-slate-700 bg-[#FAF7F2]/40">Category</td>
                    {selectedCards.map((card) => (
                      <td key={card._id} className="p-4 text-[#0B0F17] font-semibold">
                        <span className="px-2.5 py-1 rounded-full text-xs font-bold bg-[#FDE4CE] text-[#9A3412]">
                          {card.category}
                        </span>
                      </td>
                    ))}
                    {selectedCards.length < 3 && <td className="p-4 bg-slate-50/20" />}
                  </tr>

                  {/* Joining Fee */}
                  <tr>
                    <td className="p-4 font-bold text-slate-700 bg-[#FAF7F2]/40">Joining Fee</td>
                    {selectedCards.map((card) => (
                      <td key={card._id} className="p-4 text-base font-extrabold text-[#0B0F17]">
                        {formatCurrency(card.joiningFee)}
                      </td>
                    ))}
                    {selectedCards.length < 3 && <td className="p-4 bg-slate-50/20" />}
                  </tr>

                  {/* Annual Renewal Fee */}
                  <tr>
                    <td className="p-4 font-bold text-slate-700 bg-[#FAF7F2]/40">Annual Renewal Fee</td>
                    {selectedCards.map((card) => (
                      <td key={card._id} className="p-4 text-base font-extrabold text-[#0B0F17]">
                        {formatCurrency(card.annualFee)}
                      </td>
                    ))}
                    {selectedCards.length < 3 && <td className="p-4 bg-slate-50/20" />}
                  </tr>

                  {/* Spend Waiver Condition */}
                  <tr>
                    <td className="p-4 font-bold text-slate-700 bg-[#FAF7F2]/40">Spend Waiver Rule</td>
                    {selectedCards.map((card) => (
                      <td key={card._id} className="p-4 text-xs font-medium text-slate-700">
                        {card.feeWaiver || 'Standard terms apply'}
                      </td>
                    ))}
                    {selectedCards.length < 3 && <td className="p-4 bg-slate-50/20" />}
                  </tr>

                  {/* Key Perks */}
                  <tr>
                    <td className="p-4 font-bold text-slate-700 bg-[#FAF7F2]/40 align-top">
                      Key Features &amp; Perks
                    </td>
                    {selectedCards.map((card) => (
                      <td key={card._id} className="p-4 align-top">
                        <ul className="space-y-2 text-xs text-slate-700">
                          {card.benefits.map((b, i) => (
                            <li key={i} className="flex items-start gap-2">
                              <div className="w-4 h-4 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center flex-shrink-0 mt-0.5">
                                <Check size={10} weight="bold" />
                              </div>
                              <span className="font-medium leading-relaxed">{b}</span>
                            </li>
                          ))}
                        </ul>
                      </td>
                    ))}
                    {selectedCards.length < 3 && <td className="p-4 bg-slate-50/20" />}
                  </tr>

                  {/* Pros */}
                  <tr>
                    <td className="p-4 font-bold text-slate-700 bg-[#FAF7F2]/40 align-top">Pros</td>
                    {selectedCards.map((card) => (
                      <td key={card._id} className="p-4 align-top">
                        <ul className="space-y-1.5 text-xs text-emerald-800">
                          {card.pros.map((p, i) => (
                            <li key={i} className="font-medium">• {p}</li>
                          ))}
                        </ul>
                      </td>
                    ))}
                    {selectedCards.length < 3 && <td className="p-4 bg-slate-50/20" />}
                  </tr>

                  {/* Cons */}
                  <tr>
                    <td className="p-4 font-bold text-slate-700 bg-[#FAF7F2]/40 align-top">Cons</td>
                    {selectedCards.map((card) => (
                      <td key={card._id} className="p-4 align-top">
                        <ul className="space-y-1.5 text-xs text-rose-700">
                          {card.cons.map((c, i) => (
                            <li key={i} className="font-medium">• {c}</li>
                          ))}
                        </ul>
                      </td>
                    ))}
                    {selectedCards.length < 3 && <td className="p-4 bg-slate-50/20" />}
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Card Picker Modal with Hero Aesthetics */}
        {pickerOpen && (
          <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 animate-in fade-in duration-200">
            <div className="w-full max-w-lg rounded-3xl bg-white p-6 sm:p-7 shadow-2xl space-y-4 max-h-[85vh] flex flex-col">
              <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                <div className="flex items-center gap-2">
                  <div className="w-7 h-7 rounded-full bg-[#0B0F17] text-white flex items-center justify-center">
                    <PlusCircle size={16} weight="bold" />
                  </div>
                  <h3 className="text-lg font-extrabold text-[#0B0F17]">Choose a Card to Compare</h3>
                </div>
                <button
                  onClick={() => setPickerOpen(false)}
                  className="p-1.5 rounded-full text-slate-400 hover:text-slate-800 hover:bg-slate-100 transition-colors"
                >
                  <X size={20} weight="bold" />
                </button>
              </div>

              <div className="flex-1 overflow-y-auto space-y-2.5 pr-1">
                {availableCards
                  .filter((c) => !selectedCards.some((sc) => sc._id === c._id))
                  .map((card) => (
                    <div
                      key={card._id}
                      className="p-3.5 rounded-2xl bg-[#FAF7F2] hover:bg-[#F5F2EB] shadow-sm transition-all flex items-center justify-between gap-3 group"
                    >
                      <div className="flex items-center gap-3 min-w-0">
                        <div className="relative w-14 h-9 rounded-xl overflow-hidden bg-slate-900 flex-shrink-0 shadow-sm">
                          <Image src={card.imageUrl} alt={card.title} fill className="object-cover" />
                        </div>
                        <div className="min-w-0">
                          <p className="text-sm font-bold text-[#0B0F17] truncate group-hover:text-[#9A3412] transition-colors">{card.title}</p>
                          <p className="text-xs text-slate-500 font-medium">
                            {card.bankName} • {card.category} • {formatCurrency(card.annualFee)}
                          </p>
                        </div>
                      </div>
                      <button
                        onClick={() => {
                          addToCompare(card);
                          setPickerOpen(false);
                        }}
                        className="rounded-full bg-[#0B0F17] hover:bg-[#1E293B] text-white font-bold text-xs px-4 py-2 shadow-sm transition-all flex-shrink-0"
                      >
                        Add
                      </button>
                    </div>
                  ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
