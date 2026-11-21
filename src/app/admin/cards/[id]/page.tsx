'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { getAdminCardById, updateAdminCard, uploadImageToCloudinary } from '@/lib/api';
import { ArrowLeft, Plus, Trash, Check, Sparkle, UploadSimple } from '@phosphor-icons/react';

interface EditCardPageProps {
  params: {
    id: string;
  };
}

export default function EditCardPage({ params }: EditCardPageProps) {
  const router = useRouter();
  const [token, setToken] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');

  // Form State
  const [title, setTitle] = useState('');
  const [slug, setSlug] = useState('');
  const [bankName, setBankName] = useState('');
  const [category, setCategory] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [imagePublicId, setImagePublicId] = useState('');
  const [imagePreview, setImagePreview] = useState<string>('');
  const [uploadingImage, setUploadingImage] = useState(false);
  const [joiningFee, setJoiningFee] = useState<number>(0);
  const [annualFee, setAnnualFee] = useState<number>(0);
  const [feeWaiver, setFeeWaiver] = useState('');
  const [referralUrl, setReferralUrl] = useState('');
  const [isActive, setIsActive] = useState(true);
  const [isFeatured, setIsFeatured] = useState(false);
  const [isHeroFeatured, setIsHeroFeatured] = useState(false);
  const [heroTag, setHeroTag] = useState('');
  const [heroSpecialFeatures, setHeroSpecialFeatures] = useState<string[]>(['']);
  const [heroOrder, setHeroOrder] = useState(0);

  // Array fields
  const [benefits, setBenefits] = useState<string[]>([]);
  const [pros, setPros] = useState<string[]>([]);
  const [cons, setCons] = useState<string[]>([]);
  const [eligibility, setEligibility] = useState<string[]>([]);

  useEffect(() => {
    const storedToken = localStorage.getItem('credit_mitra_admin_token');
    if (!storedToken) {
      router.push('/admin/login');
      return;
    }
    setToken(storedToken);

    getAdminCardById(storedToken, params.id)
      .then((card) => {
        setTitle(card.title || '');
        setSlug(card.slug || '');
        setBankName(card.bankName || 'HDFC Bank');
        setCategory(card.category || 'Cashback');
        setImageUrl(card.imageUrl || '');
        setImagePublicId(card.imagePublicId || '');
        setImagePreview(card.imageUrl || '');
        setJoiningFee(card.joiningFee || 0);
        setAnnualFee(card.annualFee || 0);
        setFeeWaiver(card.feeWaiver || '');
        setReferralUrl(card.referralUrl || '');
        setIsActive(card.isActive !== undefined ? card.isActive : true);
        setIsFeatured(card.isFeatured !== undefined ? card.isFeatured : false);
        setIsHeroFeatured(card.isHeroFeatured !== undefined ? card.isHeroFeatured : false);
        setHeroTag(card.heroTag || '');
        setHeroSpecialFeatures(
          card.heroSpecialFeatures && card.heroSpecialFeatures.length > 0
            ? card.heroSpecialFeatures
            : ['']
        );
        setHeroOrder(card.heroOrder || 0);
        setBenefits(card.benefits || []);
        setPros(card.pros || []);
        setCons(card.cons || []);
        setEligibility(card.eligibility || []);
      })
      .catch((err) => {
        setError(err.message || 'Failed to fetch card details');
      })
      .finally(() => setLoading(false));
  }, [params.id, router]);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0] && token) {
      const file = e.target.files[0];
      const localUrl = URL.createObjectURL(file);
      setImagePreview(localUrl);

      setUploadingImage(true);
      try {
        const uploadRes = await uploadImageToCloudinary(token, file);
        setImageUrl(uploadRes.url);
        setImagePublicId(uploadRes.publicId);
      } catch (err: any) {
        setError(err.message || 'Image upload failed. You can provide an image URL directly.');
      } finally {
        setUploadingImage(false);
      }
    }
  };

  const handleArrayChange = (setter: React.Dispatch<React.SetStateAction<string[]>>, index: number, value: string) => {
    setter((prev) => {
      const updated = [...prev];
      updated[index] = value;
      return updated;
    });
  };

  const handleArrayAdd = (setter: React.Dispatch<React.SetStateAction<string[]>>) => {
    setter((prev) => [...prev, '']);
  };

  const handleArrayRemove = (setter: React.Dispatch<React.SetStateAction<string[]>>, index: number) => {
    setter((prev) => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!token) return;

    setSubmitting(true);
    setError('');

    try {
      const payload = {
        title,
        slug,
        bankName,
        category,
        imageUrl,
        imagePublicId,
        joiningFee,
        annualFee,
        feeWaiver,
        referralUrl,
        benefits: benefits.filter(Boolean),
        pros: pros.filter(Boolean),
        cons: cons.filter(Boolean),
        eligibility: eligibility.filter(Boolean),
        isActive,
        isFeatured,
        isHeroFeatured,
        heroTag,
        heroSpecialFeatures: heroSpecialFeatures.filter(Boolean),
        heroOrder,
      };

      await updateAdminCard(token, params.id, payload);
      router.push('/admin');
    } catch (err: any) {
      setError(err.message || 'Failed to update credit card.');
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-24 text-center">
        <p className="title-3 font-semibold text-neutral-600">Loading card details...</p>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-8 md:py-12 space-y-6">
      <div className="flex items-center justify-between">
        <Link
          href="/admin"
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-neutral-500 hover:text-neutral-900"
        >
          <ArrowLeft size={16} />
          <span>Back to dashboard</span>
        </Link>
        <span className="caption-3 text-neutral-400">Card ID: {params.id}</span>
      </div>

      <div className="rounded-2xl border border-neutral-200 bg-white p-6 md:p-8 shadow-sm space-y-6">
        <div>
          <h1 className="heading-4 font-bold text-neutral-900">Edit Credit Card</h1>
          <p className="caption-2 text-neutral-500">
            Update card benefits, fees, images, and visibility state.
          </p>
        </div>

        {error && (
          <div className="p-3 rounded-xl bg-rose-50 border border-rose-200 text-xs text-rose-700 font-medium">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="caption-3 font-semibold text-neutral-700 block mb-1">
                Card Title *
              </label>
              <input
                type="text"
                required
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl border border-neutral-200 text-sm focus:outline-none focus:ring-2 focus:ring-#1A56DB"
              />
            </div>

            <div>
              <label className="caption-3 font-semibold text-neutral-700 block mb-1">
                URL Slug
              </label>
              <input
                type="text"
                value={slug}
                onChange={(e) => setSlug(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl border border-neutral-200 text-sm focus:outline-none focus:ring-2 focus:ring-#1A56DB"
              />
            </div>

            <div>
              <label className="caption-3 font-semibold text-neutral-700 block mb-1">
                Issuing Bank Name *
              </label>
              <select
                value={bankName}
                onChange={(e) => setBankName(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl border border-neutral-200 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-#1A56DB"
              >
                <option value="HDFC Bank">HDFC Bank</option>
                <option value="SBI Card">SBI Card</option>
                <option value="Axis Bank">Axis Bank</option>
                <option value="ICICI Bank">ICICI Bank</option>
                <option value="Kotak Mahindra Bank">Kotak Mahindra Bank</option>
                <option value="IDFC FIRST Bank">IDFC FIRST Bank</option>
                <option value="American Express">American Express</option>
              </select>
            </div>

            <div>
              <label className="caption-3 font-semibold text-neutral-700 block mb-1">
                Reward Category *
              </label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl border border-neutral-200 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-#1A56DB"
              >
                <option value="Cashback">Cashback</option>
                <option value="Lifetime Free">Lifetime Free</option>
                <option value="Travel">Travel & Lounge</option>
                <option value="Shopping">Shopping & Rewards</option>
                <option value="Fuel">Fuel</option>
              </select>
            </div>
          </div>

          {/* Image Upload and Preview */}
          <div className="p-4 rounded-xl border border-neutral-200 bg-neutral-50/50 space-y-3">
            <label className="caption-3 font-semibold text-neutral-700 block">
              Card Image (Upload new image to replace on Cloudinary)
            </label>
            <div className="flex flex-col sm:flex-row gap-4 items-center">
              <div className="flex-1 w-full">
                <input
                  type="file"
                  accept="image/png,image/jpeg,image/webp"
                  onChange={handleFileChange}
                  className="w-full text-xs text-neutral-600 file:mr-3 file:py-2 file:px-4 file:rounded-xl file:border-0 file:text-xs file:font-semibold file:bg-#1A56DB file:text-white hover:file:bg-blue-700 cursor-pointer"
                />
                {uploadingImage && (
                  <p className="caption-4 text-#1A56DB mt-1">Uploading replacement to Cloudinary...</p>
                )}
              </div>

              <div className="flex-1 w-full">
                <input
                  type="url"
                  value={imageUrl}
                  onChange={(e) => {
                    setImageUrl(e.target.value);
                    setImagePreview(e.target.value);
                  }}
                  placeholder="Or direct image URL"
                  className="w-full px-3.5 py-2 rounded-xl border border-neutral-200 text-xs bg-white focus:outline-none focus:ring-2 focus:ring-#1A56DB"
                />
              </div>

              <div className="relative w-28 h-16 rounded-xl overflow-hidden bg-neutral-200 border border-neutral-300 flex-shrink-0">
                {imagePreview || imageUrl ? (
                  <Image
                    src={imagePreview || imageUrl}
                    alt="Card Preview"
                    fill
                    className="object-cover"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-xs text-neutral-400">
                    No image
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Fees */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="caption-3 font-semibold text-neutral-700 block mb-1">
                Joining Fee (₹)
              </label>
              <input
                type="number"
                min="0"
                value={joiningFee}
                onChange={(e) => setJoiningFee(Number(e.target.value))}
                className="w-full px-3.5 py-2.5 rounded-xl border border-neutral-200 text-sm focus:outline-none focus:ring-2 focus:ring-#1A56DB"
              />
            </div>

            <div>
              <label className="caption-3 font-semibold text-neutral-700 block mb-1">
                Annual Renewal Fee (₹)
              </label>
              <input
                type="number"
                min="0"
                value={annualFee}
                onChange={(e) => setAnnualFee(Number(e.target.value))}
                className="w-full px-3.5 py-2.5 rounded-xl border border-neutral-200 text-sm focus:outline-none focus:ring-2 focus:ring-#1A56DB"
              />
            </div>

            <div>
              <label className="caption-3 font-semibold text-neutral-700 block mb-1">
                Fee Waiver Rule
              </label>
              <input
                type="text"
                value={feeWaiver}
                onChange={(e) => setFeeWaiver(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl border border-neutral-200 text-sm focus:outline-none focus:ring-2 focus:ring-#1A56DB"
              />
            </div>
          </div>

          {/* Referral URL */}
          <div>
            <label className="caption-3 font-semibold text-neutral-700 block mb-1">
              Referral Destination URL *
            </label>
            <input
              type="url"
              required
              value={referralUrl}
              onChange={(e) => setReferralUrl(e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-xl border border-neutral-200 text-sm focus:outline-none focus:ring-2 focus:ring-#1A56DB"
            />
          </div>

          {/* Benefits */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <label className="caption-3 font-semibold text-neutral-700">Benefits & Perks</label>
              <button
                type="button"
                onClick={() => handleArrayAdd(setBenefits)}
                className="caption-4 font-semibold text-#1A56DB hover:underline flex items-center gap-1"
              >
                <Plus size={14} /> Add Perk
              </button>
            </div>
            {benefits.map((b, i) => (
              <div key={i} className="flex items-center gap-2">
                <input
                  type="text"
                  value={b}
                  onChange={(e) => handleArrayChange(setBenefits, i, e.target.value)}
                  className="flex-1 px-3 py-2 rounded-xl border border-neutral-200 text-xs"
                />
                <button
                  type="button"
                  onClick={() => handleArrayRemove(setBenefits, i)}
                  className="p-2 text-neutral-400 hover:text-red-600"
                >
                  <Trash size={16} />
                </button>
              </div>
            ))}
          </div>

          {/* Pros & Cons */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <label className="caption-3 font-semibold text-#1A56DB">Pros</label>
                <button
                  type="button"
                  onClick={() => handleArrayAdd(setPros)}
                  className="caption-4 font-semibold text-#1A56DB hover:underline flex items-center gap-1"
                >
                  <Plus size={14} /> Add
                </button>
              </div>
              {pros.map((p, i) => (
                <div key={i} className="flex items-center gap-2">
                  <input
                    type="text"
                    value={p}
                    onChange={(e) => handleArrayChange(setPros, i, e.target.value)}
                    className="flex-1 px-3 py-2 rounded-xl border border-neutral-200 text-xs"
                  />
                  <button
                    type="button"
                    onClick={() => handleArrayRemove(setPros, i)}
                    className="text-neutral-400 hover:text-red-600"
                  >
                    <Trash size={16} />
                  </button>
                </div>
              ))}
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <label className="caption-3 font-semibold text-rose-800">Cons</label>
                <button
                  type="button"
                  onClick={() => handleArrayAdd(setCons)}
                  className="caption-4 font-semibold text-rose-800 hover:underline flex items-center gap-1"
                >
                  <Plus size={14} /> Add
                </button>
              </div>
              {cons.map((c, i) => (
                <div key={i} className="flex items-center gap-2">
                  <input
                    type="text"
                    value={c}
                    onChange={(e) => handleArrayChange(setCons, i, e.target.value)}
                    className="flex-1 px-3 py-2 rounded-xl border border-neutral-200 text-xs"
                  />
                  <button
                    type="button"
                    onClick={() => handleArrayRemove(setCons, i)}
                    className="text-neutral-400 hover:text-red-600"
                  >
                    <Trash size={16} />
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Hero Section Slider Settings */}
          <div className="p-5 rounded-2xl bg-blue-50/70 border border-blue-200 space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <div>
                <h3 className="title-3 font-bold text-blue-900 flex items-center gap-2">
                  <Sparkle size={18} weight="fill" className="text-blue-600" />
                  <span>Hero Section Slider Settings</span>
                </h3>
                <p className="caption-2 text-blue-700/80">
                  Feature this card as a slide in the homepage Hero section with its card image on the right, special features on the left, and an Apply Now button.
                </p>
              </div>
              <label className="flex items-center gap-2 text-xs sm:text-sm font-bold text-blue-900 cursor-pointer bg-white px-3 py-1.5 rounded-xl border border-blue-200 shadow-sm self-start sm:self-auto">
                <input
                  type="checkbox"
                  checked={isHeroFeatured}
                  onChange={(e) => setIsHeroFeatured(e.target.checked)}
                  className="w-4 h-4 text-blue-600 rounded focus:ring-blue-500"
                />
                <span>Feature in Hero Slider</span>
              </label>
            </div>

            {isHeroFeatured && (
              <div className="space-y-4 pt-3 border-t border-blue-200/60">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="caption-3 font-semibold text-blue-950 block mb-1">
                      Hero Badge / Pill Tag
                    </label>
                    <input
                      type="text"
                      value={heroTag}
                      onChange={(e) => setHeroTag(e.target.value)}
                      placeholder="e.g. ⚡ Exclusive Welcome Offer or 🔥 5% Cashback"
                      className="w-full px-3 py-2 rounded-xl border border-blue-200 bg-white text-xs text-slate-800 focus:outline-none focus:ring-1 focus:ring-blue-500"
                    />
                  </div>
                  <div>
                    <label className="caption-3 font-semibold text-blue-950 block mb-1">
                      Slide Order Priority (1, 2, 3...)
                    </label>
                    <input
                      type="number"
                      value={heroOrder}
                      onChange={(e) => setHeroOrder(Number(e.target.value) || 0)}
                      className="w-full px-3 py-2 rounded-xl border border-blue-200 bg-white text-xs text-slate-800 focus:outline-none focus:ring-1 focus:ring-blue-500"
                    />
                  </div>
                </div>

                {/* Hero Special Features List */}
                <div>
                  <div className="flex items-center justify-between mb-1.5">
                    <label className="caption-3 font-semibold text-blue-950 block">
                      Special Features (bullet points displayed on the left side of the hero slide)
                    </label>
                    <button
                      type="button"
                      onClick={() => handleArrayAdd(setHeroSpecialFeatures)}
                      className="text-xs font-bold text-blue-600 hover:text-blue-800 flex items-center gap-1"
                    >
                      <Plus size={14} /> Add Feature
                    </button>
                  </div>
                  <div className="space-y-2">
                    {heroSpecialFeatures.map((feat, idx) => (
                      <div key={idx} className="flex items-center gap-2">
                        <input
                          type="text"
                          value={feat}
                          onChange={(e) => handleArrayChange(setHeroSpecialFeatures, idx, e.target.value)}
                          placeholder={`Special feature ${idx + 1} (e.g. 12 domestic lounge visits)`}
                          className="flex-1 px-3 py-2 rounded-xl border border-blue-200 bg-white text-xs text-slate-800 focus:outline-none focus:ring-1 focus:ring-blue-500"
                        />
                        {heroSpecialFeatures.length > 1 && (
                          <button
                            type="button"
                            onClick={() => handleArrayRemove(setHeroSpecialFeatures, idx)}
                            className="text-neutral-400 hover:text-red-600 p-1"
                          >
                            <Trash size={16} />
                          </button>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Visibility Toggles */}
          <div className="flex items-center gap-6 pt-3 border-t border-neutral-100">
            <label className="flex items-center gap-2 text-sm font-medium text-neutral-700 cursor-pointer">
              <input
                type="checkbox"
                checked={isActive}
                onChange={(e) => setIsActive(e.target.checked)}
                className="w-4 h-4 text-#1A56DB rounded focus:ring-#1A56DB"
              />
              <span>Card Active & Visible on Website</span>
            </label>

            <label className="flex items-center gap-2 text-sm font-medium text-neutral-700 cursor-pointer">
              <input
                type="checkbox"
                checked={isFeatured}
                onChange={(e) => setIsFeatured(e.target.checked)}
                className="w-4 h-4 text-#1A56DB rounded focus:ring-#1A56DB"
              />
              <span>Feature on Top of Homepage</span>
            </label>
          </div>

          {/* Submit */}
          <div className="pt-4 flex items-center justify-end gap-3">
            <Link
              href="/admin"
              className="button-md rounded-xl border border-neutral-200 text-neutral-600 hover:bg-neutral-50 font-medium"
            >
              Cancel
            </Link>
            <button
              type="submit"
              disabled={submitting || uploadingImage}
              className="button-md rounded-xl bg-#1A56DB text-white font-semibold hover:bg-blue-700 active:scale-[0.98] transition-all disabled:opacity-50"
            >
              {submitting ? 'Saving Changes...' : 'Update Card'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
