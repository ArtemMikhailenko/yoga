'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useLanguage } from '../context/LanguageContext';

interface Retreat {
  _id: string;
  title: {
    ru: string;
    en: string;
  };
  subtitle: {
    ru: string;
    en: string;
  };
  dates: string;
  duration: string;
  location: {
    ru: string;
    en: string;
  };
  price: string;
  earlyBirdPrice?: string;
  earlyBirdDeadline?: string;
  description: {
    ru: string;
    en: string;
  };
  highlights: {
    ru: string[];
    en: string[];
  };
  included: {
    ru: string[];
    en: string[];
  };
  notIncluded: {
    ru: string[];
    en: string[];
  };
  imageUrl: string;
  maxParticipants?: number;
}

export default function RetreatsPage() {
  const { t, language } = useLanguage();
  const [retreats, setRetreats] = useState<Retreat[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchRetreats();
  }, []);

  const fetchRetreats = async () => {
    try {
      const response = await fetch('/api/retreats');
      const data = await response.json();
      if (data.success) {
        setRetreats(data.data);
      }
    } catch (error) {
      console.error('Error fetching retreats:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#e8e6e0] flex items-center justify-center">
        <div className="text-2xl text-[#3a3a35] font-light">{t.retreatsPage?.loading || 'Загрузка...'}</div>
      </div>
    );
  }

  return (
    <div className="bg-[#e8e6e0]">
      {/* Hero Section */}
      <section className="relative min-h-[50vh] sm:min-h-[60vh] lg:min-h-[70vh] flex items-center justify-center px-4 sm:px-6 py-20 sm:py-24">
        <div className="absolute inset-0">
          <Image
            src="/images/retrite/IMG_6149.JPG"
            alt="Yoga Retreat"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[#3a3a35]/60 via-[#3a3a35]/40 to-[#e8e6e0]" />
        </div>
        <div className="relative max-w-4xl mx-auto text-center z-10">
          <span className="text-xs sm:text-sm uppercase tracking-widest text-white/90 mb-3 sm:mb-4 block">
            {t.retreatsPage?.subtitle || 'Йога Ретриты'}
          </span>
          <h1 className="text-3xl sm:text-5xl lg:text-7xl font-light text-white mb-4 sm:mb-6">
            {t.retreatsPage?.title || 'Наши Ретриты'}
          </h1>
          <p className="text-sm sm:text-lg lg:text-xl text-white/90 font-light max-w-2xl mx-auto leading-relaxed px-4">
            {t.retreatsPage?.description || 'Погрузитесь в трансформирующий опыт йоги в священных местах'}
          </p>
        </div>
      </section>

      {/* Retreats Grid */}
      <section className="px-4 sm:px-6 py-8 sm:py-12 pb-16 sm:pb-24">
        <div className="max-w-7xl mx-auto">
          {retreats.length === 0 ? (
            <div className="text-center py-12 sm:py-20">
              <p className="text-lg sm:text-xl text-[#3a3a35]/60 font-light">
                {t.retreatsPage?.noRetreats || 'Скоро здесь появятся новые ретриты'}
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 lg:gap-12">
              {retreats.map((retreat, index) => (
                <div
                  key={retreat._id}
                  className="group relative bg-white/40 backdrop-blur-sm border border-[#3a3a35]/10 overflow-hidden hover:border-[#c9b896] transition-all duration-500"
                >
                  {/* Image */}
                  <div className="relative aspect-[4/3] sm:aspect-square overflow-hidden">
                    <Image
                      src={retreat.imageUrl}
                      alt={retreat.title[language]}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#3a3a35]/80 via-[#3a3a35]/20 to-transparent" />
                    
                    {/* Price Badge */}
                    <div className="absolute top-4 right-4 sm:top-6 sm:right-6 bg-[#c9b896] text-[#3a3a35] px-4 py-2 sm:px-6 sm:py-3">
                      <div className="text-xs sm:text-sm font-light">{t.retreatsPage?.from || 'от'}</div>
                      <div className="text-lg sm:text-2xl font-light">{retreat.price}</div>
                    </div>

                    {/* Dates */}
                    <div className="absolute bottom-4 left-4 right-4 sm:bottom-6 sm:left-6 sm:right-6">
                      <div className="flex items-center gap-2 text-white/90 mb-1 sm:mb-2">
                        <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                        <span className="text-xs sm:text-sm font-light">{retreat.dates}</span>
                      </div>
                      <div className="flex items-center gap-2 text-white/90">
                        <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                        </svg>
                        <span className="text-xs sm:text-sm font-light">{retreat.location[language]}</span>
                      </div>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-5 sm:p-8 lg:p-10">
                    <h3 className="text-xl sm:text-2xl lg:text-3xl font-light text-[#3a3a35] mb-2 sm:mb-3">
                      {retreat.title[language]}
                    </h3>
                    <p className="text-sm sm:text-base text-[#3a3a35]/60 font-light mb-3 sm:mb-4">
                      {retreat.subtitle[language]}
                    </p>
                    
                    <p className="text-sm sm:text-base text-[#3a3a35]/70 font-light leading-relaxed mb-4 sm:mb-6 line-clamp-3">
                      {retreat.description[language]}
                    </p>

                    {/* Early Bird */}
                    {retreat.earlyBirdPrice && retreat.earlyBirdDeadline && (
                      <div className="bg-[#c9b896]/10 border border-[#c9b896]/20 p-3 sm:p-4 mb-4 sm:mb-6">
                        <div className="flex items-center justify-between">
                          <div>
                            <div className="text-[10px] sm:text-xs uppercase tracking-wider text-[#3a3a35]/60 mb-0.5 sm:mb-1">
                              {t.retreatsPage?.earlyBird || 'Ранняя регистрация'}
                            </div>
                            <div className="text-lg sm:text-xl font-light text-[#3a3a35]">{retreat.earlyBirdPrice}</div>
                          </div>
                          <div className="text-right">
                            <div className="text-[10px] sm:text-xs text-[#3a3a35]/60">{t.retreatsPage?.until || 'до'}</div>
                            <div className="text-xs sm:text-sm font-light text-[#3a3a35]">{retreat.earlyBirdDeadline}</div>
                          </div>
                        </div>
                      </div>
                    )}

                    {/* Highlights Preview */}
                    {retreat.highlights[language] && retreat.highlights[language].length > 0 && (
                      <div className="mb-4 sm:mb-6">
                        <ul className="space-y-1.5 sm:space-y-2">
                          {retreat.highlights[language].slice(0, 3).map((highlight, i) => (
                            <li key={i} className="flex items-start gap-2 sm:gap-3 text-xs sm:text-sm text-[#3a3a35]/70 font-light">
                              <svg className="w-4 h-4 sm:w-5 sm:h-5 text-[#c9b896] flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                              </svg>
                              {highlight}
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}

                    {/* CTA */}
                    <Link
                      href={`/retreats/${retreat._id}`}
                      className="inline-flex items-center gap-2 sm:gap-3 px-5 sm:px-8 py-3 sm:py-4 bg-[#3a3a35] text-white hover:bg-[#c9b896] hover:text-[#3a3a35] transition-all duration-300 font-light tracking-wider text-xs sm:text-sm group"
                    >
                      {t.retreatsPage?.learnMore || 'Подробнее'}
                      <svg className="w-3 h-3 sm:w-4 sm:h-4 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 5l7 7-7 7" />
                      </svg>
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* CTA Section */}
      <section className="px-4 sm:px-6 py-16 sm:py-24 bg-gradient-to-b from-transparent to-[#3a3a35]/5">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-light text-[#3a3a35] mb-4 sm:mb-6">
            {t.retreatsPage?.ctaTitle || 'Готовы к Трансформации?'}
          </h2>
          <p className="text-sm sm:text-lg text-[#3a3a35]/70 font-light mb-6 sm:mb-8 max-w-2xl mx-auto px-4">
            {t.retreatsPage?.ctaDescription || 'Свяжитесь с нами для получения дополнительной информации и бронирования места'}
          </p>
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 sm:gap-3 px-6 sm:px-10 py-3 sm:py-4 bg-[#c9b896] text-[#3a3a35] hover:bg-[#3a3a35] hover:text-white transition-all duration-300 font-light tracking-wider text-xs sm:text-sm"
          >
            {t.retreatsPage?.ctaButton || 'Связаться'}
            <svg className="w-3 h-3 sm:w-4 sm:h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
          </Link>
        </div>
      </section>
    </div>
  );
}
