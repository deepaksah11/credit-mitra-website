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
        <span className="text-xs font-semibold uppercase tracking-wider text-teal-800 bg-teal-50 px-2.5 py-1 rounded-full inline-block mb-4">
          Core Commitment
        </span>
        <h2 className="heading-3 md:heading-2 font-semibold tracking-tight text-neutral-900 leading-tight">
          {words.map((word, index) => {
            const isActive = index <= activeWordIndex;
            return (
              <span
                key={index}
                className={`inline-block mr-2 transition-colors duration-500 ease-brand-base ${
                  isActive ? 'text-neutral-900' : 'text-neutral-300'
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
