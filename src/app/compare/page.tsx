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
  CreditCard,
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
    <div className="max-w-6xl mx-auto px-4 py-8 md:py-12 space-y-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-teal-50 text-teal-800 text-xs font-semibold mb-2">
            <Scales size={16} weight="bold" />
            <span>Comparison Tool</span>
          </div>
          <h1 className="heading-3 md:heading-2 font-bold text-neutral-900">
            Side-by-Side Card Comparison
          </h1>
          <p className="body-4 text-neutral-500 mt-1">
            Compare joining fees, annual charges, pros, and cons across 2 to 3 credit cards.
          </p>
        </div>

        {selectedCards.length > 0 && (
          <div className="flex items-center gap-3">
            {selectedCards.length < 3 && (
              <button
                onClick={() => setPickerOpen(true)}
                className="button-sm rounded-xl border border-teal-800 text-teal-800 hover:bg-teal-50 transition-colors flex items-center gap-1.5 font-semibold"
              >
                <PlusCircle size={18} weight="bold" />
                <span>Add Card ({3 - selectedCards.length} left)</span>
              </button>
            )}
            <button
              onClick={clearCompare}
              className="button-sm rounded-xl border border-neutral-200 text-neutral-600 hover:bg-neutral-50 transition-colors flex items-center gap-1.5 font-medium"
            >
              <Trash size={16} />
              <span>Clear All</span>
            </button>
          </div>
        )}
      </div>

      {/* Comparison Grid */}
      {selectedCards.length === 0 ? (
        <div className="p-12 text-center rounded-2xl border border-dashed border-neutral-200 bg-white space-y-4">
          <div className="w-12 h-12 rounded-2xl bg-teal-50 text-teal-800 mx-auto flex items-center justify-center">
            <Scales size={28} weight="bold" />
          </div>
          <h2 className="title-2 font-bold text-neutral-900">No cards selected for comparison</h2>
          <p className="body-5 text-neutral-500 max-w-md mx-auto">
            Choose 2 to 3 cards from our catalog to compare annual fees, reward benefits, and eligibility side by side.
          </p>
          <div className="pt-2 flex justify-center gap-3">
            <Link
              href="/cards"
              className="button-md rounded-xl bg-teal-800 text-white font-semibold hover:bg-teal-900 transition-colors"
            >
              Browse Card Catalog
            </Link>
            <button
              onClick={() => setPickerOpen(true)}
              className="button-md rounded-xl border border-neutral-200 text-neutral-700 hover:bg-neutral-50 font-semibold"
            >
              Quick Add From List
            </button>
          </div>
        </div>
      ) : (
        <div className="overflow-x-auto pb-4">
          <div className="min-w-[700px] rounded-2xl border border-neutral-200 bg-white shadow-sm overflow-hidden">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-neutral-200 bg-neutral-50/70">
                  <th className="p-4 w-1/4 text-xs font-semibold uppercase text-neutral-400">
                    Product Details
                  </th>
                  {selectedCards.map((card) => (
                    <th key={card._id} className="p-4 w-1/4 align-top">
                      <div className="flex items-start justify-between gap-2">
                        <div className="space-y-1">
                          <span className="caption-3 font-semibold text-neutral-600 bg-neutral-200/60 px-2 py-0.5 rounded">
                            {card.bankName}
                          </span>
                          <h3 className="title-3 font-bold text-neutral-900 line-clamp-2">
                            {card.title}
                          </h3>
                        </div>
                        <button
                          onClick={() => removeFromCompare(card._id)}
                          aria-label="Remove card"
                          className="p-1 rounded-lg text-neutral-400 hover:text-red-600 hover:bg-red-50 transition-colors"
                        >
                          <Trash size={16} />
                        </button>
                      </div>
                      <div className="relative w-full h-24 rounded-xl overflow-hidden mt-3 bg-neutral-100 border border-neutral-200">
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
                        className="mt-3 button-sm w-full rounded-xl bg-teal-800 text-white text-center font-semibold hover:bg-teal-900 flex items-center justify-center gap-1 shadow-sm"
                      >
                        <span>Apply Now</span>
                        <ArrowSquareOut size={14} weight="bold" />
                      </a>
                    </th>
                  ))}
                  {selectedCards.length < 3 && (
                    <th className="p-4 w-1/4 align-middle text-center bg-neutral-50/40 border-l border-neutral-100">
                      <button
                        onClick={() => setPickerOpen(true)}
                        className="p-4 rounded-xl border border-dashed border-teal-800/40 text-teal-800 hover:bg-teal-50/50 transition-colors inline-flex flex-col items-center gap-1 text-xs font-semibold"
                      >
                        <PlusCircle size={24} weight="bold" />
                        <span>Add another card</span>
                      </button>
                    </th>
                  )}
                </tr>
              </thead>
              <tbody className="divide-y divide-neutral-100 text-sm">
                {/* Category */}
                <tr>
                  <td className="p-4 font-semibold text-neutral-600 bg-neutral-50/30">Category</td>
                  {selectedCards.map((card) => (
                    <td key={card._id} className="p-4 text-neutral-800 font-medium">
                      {card.category}
                    </td>
                  ))}
                  {selectedCards.length < 3 && <td className="p-4 bg-neutral-50/20" />}
                </tr>

                {/* Joining Fee */}
                <tr>
                  <td className="p-4 font-semibold text-neutral-600 bg-neutral-50/30">Joining Fee</td>
                  {selectedCards.map((card) => (
                    <td key={card._id} className="p-4 text-neutral-900 font-bold">
                      {formatCurrency(card.joiningFee)}
                    </td>
                  ))}
                  {selectedCards.length < 3 && <td className="p-4 bg-neutral-50/20" />}
                </tr>

                {/* Annual Fee */}
                <tr>
                  <td className="p-4 font-semibold text-neutral-600 bg-neutral-50/30">Annual Renewal Fee</td>
                  {selectedCards.map((card) => (
                    <td key={card._id} className="p-4 text-neutral-900 font-bold">
                      {formatCurrency(card.annualFee)}
                    </td>
                  ))}
                  {selectedCards.length < 3 && <td className="p-4 bg-neutral-50/20" />}
                </tr>

                {/* Fee Waiver Condition */}
                <tr>
                  <td className="p-4 font-semibold text-neutral-600 bg-neutral-50/30">Spend Waiver Rule</td>
                  {selectedCards.map((card) => (
                    <td key={card._id} className="p-4 text-xs text-neutral-700">
                      {card.feeWaiver || 'Standard terms apply'}
                    </td>
                  ))}
                  {selectedCards.length < 3 && <td className="p-4 bg-neutral-50/20" />}
                </tr>

                {/* Benefits */}
                <tr>
                  <td className="p-4 font-semibold text-neutral-600 bg-neutral-50/30 align-top">
                    Key Features
                  </td>
                  {selectedCards.map((card) => (
                    <td key={card._id} className="p-4 align-top">
                      <ul className="space-y-1.5 text-xs text-neutral-600">
                        {card.benefits.map((b, i) => (
                          <li key={i} className="flex items-start gap-1.5">
                            <Check size={14} weight="bold" className="text-teal-700 flex-shrink-0 mt-0.5" />
                            <span>{b}</span>
                          </li>
                        ))}
                      </ul>
                    </td>
                  ))}
                  {selectedCards.length < 3 && <td className="p-4 bg-neutral-50/20" />}
                </tr>

                {/* Pros */}
                <tr>
                  <td className="p-4 font-semibold text-neutral-600 bg-neutral-50/30 align-top">Pros</td>
                  {selectedCards.map((card) => (
                    <td key={card._id} className="p-4 align-top">
                      <ul className="space-y-1 text-xs text-teal-800">
                        {card.pros.map((p, i) => (
                          <li key={i}>• {p}</li>
                        ))}
                      </ul>
                    </td>
                  ))}
                  {selectedCards.length < 3 && <td className="p-4 bg-neutral-50/20" />}
                </tr>

                {/* Cons */}
                <tr>
                  <td className="p-4 font-semibold text-neutral-600 bg-neutral-50/30 align-top">Cons</td>
                  {selectedCards.map((card) => (
                    <td key={card._id} className="p-4 align-top">
                      <ul className="space-y-1 text-xs text-rose-700">
                        {card.cons.map((c, i) => (
                          <li key={i}>• {c}</li>
                        ))}
                      </ul>
                    </td>
                  ))}
                  {selectedCards.length < 3 && <td className="p-4 bg-neutral-50/20" />}
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Card Picker Modal */}
      {pickerOpen && (
        <div className="fixed inset-0 z-50 bg-neutral-900/40 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="w-full max-w-lg rounded-2xl bg-white border border-neutral-200 p-6 shadow-2xl space-y-4 max-h-[85vh] flex flex-col">
            <div className="flex items-center justify-between pb-3 border-b border-neutral-100">
              <h3 className="title-2 font-bold text-neutral-900">Choose a Card to Compare</h3>
              <button
                onClick={() => setPickerOpen(false)}
                className="p-1 rounded-lg text-neutral-400 hover:text-neutral-800"
              >
                <X size={20} />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto space-y-2 pr-1">
              {availableCards
                .filter((c) => !selectedCards.some((sc) => sc._id === c._id))
                .map((card) => (
                  <div
                    key={card._id}
                    className="p-3 rounded-xl border border-neutral-200 hover:border-teal-700 hover:bg-neutral-50 transition-all flex items-center justify-between gap-3"
                  >
                    <div className="flex items-center gap-3">
                      <div className="relative w-12 h-8 rounded-lg overflow-hidden bg-neutral-100 flex-shrink-0">
                        <Image src={card.imageUrl} alt={card.title} fill className="object-cover" />
                      </div>
                      <div>
                        <p className="title-4 font-semibold text-neutral-900">{card.title}</p>
                        <p className="caption-4 text-neutral-500">
                          {card.bankName} • {card.category} • {formatCurrency(card.annualFee)}
                        </p>
                      </div>
                    </div>
                    <button
                      onClick={() => {
                        addToCompare(card);
                        setPickerOpen(false);
                      }}
                      className="button-sm rounded-lg bg-teal-800 text-white font-semibold"
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
  );
}
