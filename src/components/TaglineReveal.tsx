'use client';

import React, { useEffect, useRef, useState } from 'react';

interface TaglineRevealProps {
  phrase?: string;
  className?: string;
}

export default function TaglineReveal({
  phrase = 'Compare honest card benefits without wading through hidden rules. Apply directly through verified bank links.',
  className = '',
}: TaglineRevealProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeWordIndex, setActiveWordIndex] = useState<number>(-1);
  const words = phrase.split(' ');

  useEffect(() => {
    // Check for user preference for reduced motion
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    if (mediaQuery.matches) {
      setActiveWordIndex(words.length);
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            // Animate words progressively into place
            words.forEach((_, idx) => {
              setTimeout(() => {
                setActiveWordIndex((prev) => Math.max(prev, idx));
              }, idx * 60);
            });
          }
        });
      },
      { threshold: 0.3 }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => observer.disconnect();
  }, [words.length]);

  return (
    <section className={`py-16 md:py-24 px-4 text-center ${className}`}>
      <div
        ref={containerRef}
        className="max-w-[680px] mx-auto text-center"
        aria-label={phrase}
      >
        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-100/70 border border-blue-200 text-[#1A56DB] text-xs font-bold uppercase tracking-wider mb-4 shadow-sm">
          Core Commitment
        </span>
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold tracking-tight text-[#0F172A] leading-snug">
          {words.map((word, index) => {
            const isActive = index <= activeWordIndex;
            return (
              <span
                key={index}
                className={`inline-block mr-2 transition-colors duration-500 ease-brand-base ${
                  isActive ? 'text-[#0F172A]' : 'text-slate-300'
                }`}
              >
                {word}
              </span>
            );
          })}
        </h2>
      </div>
    </section>
  );
}
