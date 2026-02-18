'use client';

import { useState, useEffect, useRef, ReactNode } from 'react';
import { useLanguage } from '../context/LanguageContext';

type Category = 'all' | 'spiritual' | 'influence' | 'gratitude';

const categoryIcons: Record<string, ReactNode> = {
  spiritual: (
    <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
    </svg>
  ),
  influence: (
    <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <path strokeLinecap="round" strokeLinejoin="round" d="M15.362 5.214A8.252 8.252 0 0112 21 8.25 8.25 0 016.038 7.048 6.75 6.75 0 0012 3.75a6.75 6.75 0 003.362 1.464z" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 18a3.75 3.75 0 00.495-7.467 5.99 5.99 0 00-1.925 3.546 5.974 5.974 0 01-2.133-1A3.75 3.75 0 0012 18z" />
    </svg>
  ),
  gratitude: (
    <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" />
    </svg>
  ),
};

export default function Testimonials() {
  const { t } = useLanguage();
  const [activeCategory, setActiveCategory] = useState<Category>('all');
  const [visibleItems, setVisibleItems] = useState<Set<number>>(new Set());
  const [isExpanded, setIsExpanded] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const INITIAL_COUNT = 6;

  const items = t.testimonials.items;
  const filtered = activeCategory === 'all'
    ? items
    : items.filter((item: { category: string }) => item.category === activeCategory);

  const displayItems = isExpanded ? filtered : filtered.slice(0, INITIAL_COUNT);
  const hasMore = filtered.length > INITIAL_COUNT;

  // Reset expanded state when category changes
  useEffect(() => {
    setIsExpanded(false);
  }, [activeCategory]);

  // Intersection Observer for staggered reveal
  useEffect(() => {
    setVisibleItems(new Set());
    const timeout = setTimeout(() => {
      displayItems.forEach((_: unknown, i: number) => {
        setTimeout(() => {
          setVisibleItems(prev => new Set([...prev, i]));
        }, i * 80);
      });
    }, 100);
    return () => clearTimeout(timeout);
  }, [activeCategory, displayItems.length]);

  const categories: { key: Category; label: string }[] = [
    { key: 'all', label: activeCategory === 'all' ? '✦' : '✦' },
    { key: 'spiritual', label: t.testimonials.categories.spiritual },
    { key: 'influence', label: t.testimonials.categories.influence },
    { key: 'gratitude', label: t.testimonials.categories.gratitude },
  ];

  // Determine card style based on text length & position for visual variety
  const getCardStyle = (index: number, text: string) => {
    const isLong = text.length > 200;
    const isShort = text.length < 80;

    if (isLong) return 'col-span-1 sm:col-span-2';
    if (isShort && index % 3 === 0) return 'col-span-1';
    return 'col-span-1';
  };

  const getQuoteSize = (text: string) => {
    if (text.length < 80) return 'text-base sm:text-lg';
    if (text.length < 200) return 'text-sm sm:text-base';
    return 'text-sm sm:text-[15px]';
  };

  return (
    <section className="relative py-16 sm:py-28 bg-[#3a3a35] overflow-hidden" id="testimonials">
      {/* Background decorative elements */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-20 left-10 w-72 h-72 rounded-full bg-[#c9b896]/[0.03] blur-3xl" />
        <div className="absolute bottom-20 right-10 w-96 h-96 rounded-full bg-[#c9b896]/[0.03] blur-3xl" />
        {/* Subtle grid pattern */}
        <div className="absolute inset-0 opacity-[0.02]"
          style={{
            backgroundImage: `linear-gradient(rgba(201,184,150,0.3) 1px, transparent 1px),
                              linear-gradient(90deg, rgba(201,184,150,0.3) 1px, transparent 1px)`,
            backgroundSize: '60px 60px',
          }}
        />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6">
        {/* Header */}
        <div className="text-center mb-12 sm:mb-20">
          <div className="inline-flex items-center gap-3 mb-6">
            <div className="w-8 sm:w-12 h-px bg-[#c9b896]/40" />
            <span className="text-[10px] sm:text-xs uppercase tracking-[0.4em] text-[#c9b896]/60">
              {t.testimonials.subtitle}
            </span>
            <div className="w-8 sm:w-12 h-px bg-[#c9b896]/40" />
          </div>
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-light text-white leading-tight">
            {t.testimonials.title}
          </h2>
        </div>

        {/* Category Filters */}
        <div className="flex flex-wrap justify-center gap-2 sm:gap-3 mb-10 sm:mb-16">
          {categories.map(({ key, label }) => (
            <button
              key={key}
              onClick={() => setActiveCategory(key)}
              className={`
                relative px-5 sm:px-7 py-2.5 sm:py-3 text-xs sm:text-sm tracking-wider transition-all duration-500
                ${activeCategory === key
                  ? 'text-[#3a3a35] bg-[#c9b896]'
                  : 'text-white/50 hover:text-white/80 bg-white/[0.04] hover:bg-white/[0.08] border border-white/10'
                }
              `}
            >
              {key === 'all' ? (
                <span className="text-sm">{label}</span>
              ) : (
                <span className="flex items-center gap-2">
                  {categoryIcons[key]}
                  {label}
                </span>
              )}
            </button>
          ))}
        </div>

        {/* Masonry Grid with collapse wrapper */}
        <div className="relative">
          <div
            ref={containerRef}
            className="columns-1 sm:columns-2 lg:columns-3 gap-4 sm:gap-5 space-y-4 sm:space-y-5"
          >
            {displayItems.map((item: { text: string; category: string }, index: number) => {
            const isVisible = visibleItems.has(index);
            const isShort = item.text.length < 80;
            const isLong = item.text.length > 200;

            return (
              <div
                key={`${activeCategory}-${index}`}
                className={`
                  break-inside-avoid
                  transition-all duration-700 ease-out
                  ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}
                `}
              >
                <div className={`
                  group relative
                  ${isShort
                    ? 'bg-gradient-to-br from-[#c9b896]/15 to-[#c9b896]/5 border border-[#c9b896]/20'
                    : 'bg-white/[0.03] border border-white/[0.06]'
                  }
                  p-6 sm:p-8
                  hover:bg-white/[0.06] hover:border-[#c9b896]/30
                  transition-all duration-500
                `}>
                  {/* Quote mark */}
                  <div className={`
                    absolute top-4 right-5 font-serif text-5xl sm:text-6xl leading-none select-none
                    ${isShort ? 'text-[#c9b896]/20' : 'text-white/[0.06]'}
                    group-hover:text-[#c9b896]/25 transition-colors duration-500
                  `}>
                    &ldquo;
                  </div>

                  {/* Category indicator */}
                  <div className="flex items-center gap-2 mb-4 sm:mb-5">
                    <div className={`
                      w-1 h-4
                      ${item.category === 'spiritual' ? 'bg-[#c9b896]' : ''}
                      ${item.category === 'influence' ? 'bg-amber-400/70' : ''}
                      ${item.category === 'gratitude' ? 'bg-rose-400/70' : ''}
                    `} />
                    <span className="text-[10px] uppercase tracking-[0.25em] text-white/30">
                      {t.testimonials.categories[item.category as keyof typeof t.testimonials.categories]}
                    </span>
                  </div>

                  {/* Text */}
                  <p className={`
                    ${getQuoteSize(item.text)}
                    ${isShort ? 'text-[#c9b896] font-light italic' : 'text-white/70 font-light'}
                    leading-relaxed relative z-10
                  `}>
                    {item.text}
                  </p>

                  {/* Bottom accent line */}
                  <div className={`
                    mt-5 sm:mt-6 h-px w-0 group-hover:w-full transition-all duration-700
                    ${item.category === 'spiritual' ? 'bg-[#c9b896]/30' : ''}
                    ${item.category === 'influence' ? 'bg-amber-400/30' : ''}
                    ${item.category === 'gratitude' ? 'bg-rose-400/30' : ''}
                  `} />
                </div>
              </div>
            );
          })}
          </div>

          {/* Gradient fade overlay when collapsed */}
          {!isExpanded && hasMore && (
            <div className="absolute bottom-0 left-0 right-0 h-40 sm:h-52 bg-gradient-to-t from-[#3a3a35] via-[#3a3a35]/80 to-transparent pointer-events-none" />
          )}
        </div>

        {/* Expand / Collapse button */}
        {hasMore && (
          <div className="flex justify-center mt-8 sm:mt-12">
            <button
              onClick={() => setIsExpanded(!isExpanded)}
              className="group relative inline-flex items-center gap-3 px-8 sm:px-10 py-3.5 sm:py-4 border border-[#c9b896]/30 text-[#c9b896]/80 hover:text-[#c9b896] hover:border-[#c9b896]/60 hover:bg-[#c9b896]/5 transition-all duration-500 text-xs sm:text-sm tracking-widest uppercase"
            >
              <span>{isExpanded ? (t.testimonials.showLess || 'Свернуть') : (t.testimonials.showMore || 'Показать все отзывы')}</span>
              <svg
                className={`w-4 h-4 transition-transform duration-500 ${isExpanded ? 'rotate-180' : ''}`}
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={1.5}
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
              </svg>
            </button>
          </div>
        )}

        {/* Bottom decorative */}
        <div className="flex items-center justify-center gap-3 mt-14 sm:mt-20">
          <div className="w-16 sm:w-24 h-px bg-[#c9b896]/20" />
          <svg className="w-5 h-5 text-[#c9b896]/30" viewBox="0 0 24 24" fill="currentColor">
            <path d="M17,8C8,10 5.9,16.17 3.82,21.34L5.71,22L6.66,19.7C7.14,19.87 7.64,20 8,20C19,20 22,3 22,3C21,5 14,5.25 9,6.25C4,7.25 2,11.5 2,13.5C2,15.5 3.75,17.25 3.75,17.25C7,8 17,8 17,8Z" />
          </svg>
          <div className="w-16 sm:w-24 h-px bg-[#c9b896]/20" />
        </div>
      </div>
    </section>
  );
}
