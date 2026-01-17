'use client';

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import Header from '@/app/components/Header';
import Footer from '@/app/components/Footer';
import { useLanguage } from '@/app/context/LanguageContext';

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
  pricingTiers?: Array<{
    deadline: string;
    price: string;
  }>;
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

export default function RetreatDetail() {
  const params = useParams();
  const { t, language } = useLanguage();
  const [retreat, setRetreat] = useState<Retreat | null>(null);
  const [loading, setLoading] = useState(true);
  const id = params.id as string;

  useEffect(() => {
    fetchRetreat();
  }, [id]);

  const fetchRetreat = async () => {
    try {
      const response = await fetch(`/api/retreats/${id}`);
      const data = await response.json();
      if (data.success) {
        setRetreat(data.data);
      }
    } catch (error) {
      console.error('Error fetching retreat:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <>
        <Header />
        <div className="min-h-screen bg-[#e8e6e0] flex items-center justify-center">
          <div className="text-2xl text-[#3a3a35] font-light">{t.retreatsPage?.loading || 'Загрузка...'}</div>
        </div>
        <Footer />
      </>
    );
  }

  if (!retreat) {
    return (
      <>
        <Header />
        <div className="min-h-screen bg-[#e8e6e0] flex items-center justify-center">
          <div className="text-center">
            <p className="text-2xl text-[#3a3a35] font-light mb-4">Retreat not found</p>
            <Link href="/retreats" className="text-[#c9b896] hover:text-[#3a3a35]">
              {t.retreatsPage?.backToRetreats || 'Вернуться к ретритам'}
            </Link>
          </div>
        </div>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Header />
      <div className="bg-[#e8e6e0] pt-20">
        {/* Hero Section - Modern Split Layout */}
        <section className="relative w-full py-4 sm:py-8 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            {/* Back Button */}
            <div className="mb-4 sm:mb-6">
              <Link
                href="/retreats"
                className="inline-flex items-center gap-2 px-3 sm:px-4 py-2 sm:py-2.5 bg-white hover:bg-[#c9b896] hover:text-[#3a3a35] text-[#3a3a35] rounded-full transition-all duration-300 shadow-md hover:shadow-lg"
              >
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M15 19l-7-7 7-7" />
                </svg>
                <span className="text-xs sm:text-sm font-medium">{t.retreatsPage?.backToRetreats || 'Назад'}</span>
              </Link>
            </div>

            {/* Main Hero Card */}
            <div className="bg-white rounded-2xl sm:rounded-3xl shadow-xl sm:shadow-2xl overflow-hidden">
              <div className="grid lg:grid-cols-2 gap-0">
                {/* Image Section */}
                <div className="relative bg-white p-4 sm:p-6 lg:p-8 flex items-center justify-center">
                  <div className="relative w-full aspect-[4/3] sm:aspect-[4/4] rounded-xl sm:rounded-2xl overflow-hidden shadow-lg sm:shadow-xl border-2 sm:border-4 border-[#e8e6e0]">
                    <Image
                      src={retreat.imageUrl}
                      alt={retreat.title[language]}
                      fill
                      className="object-cover"
                      priority
                    />
                  </div>
                </div>

                {/* Content Section */}
                <div className="p-5 sm:p-8 lg:p-12 flex flex-col justify-center bg-gradient-to-br from-white to-[#e8e6e0]/30">
                  {/* Subtitle Badge */}
                  <div className="mb-3 sm:mb-4">
                    <span className="inline-block px-3 sm:px-4 py-1 sm:py-1.5 bg-[#c9b896] text-[#3a3a35] text-xs sm:text-sm font-medium rounded-full">
                      {retreat.subtitle[language]}
                    </span>
                  </div>

                  {/* Title */}
                  <h1 className="text-2xl sm:text-3xl lg:text-5xl font-light text-[#3a3a35] mb-4 sm:mb-6 leading-tight">
                    {retreat.title[language]}
                  </h1>

                  {/* Description Preview */}
                  <p className="text-sm sm:text-base text-[#3a3a35]/70 font-light leading-relaxed mb-6 sm:mb-8">
                    {retreat.description[language].substring(0, 150)}...
                  </p>

                  {/* Info Grid */}
                  <div className="grid grid-cols-1 gap-3 sm:gap-4 mb-6 sm:mb-8">
                    <div className="flex items-center gap-3 p-3 sm:p-4 bg-white rounded-lg sm:rounded-xl shadow-sm border border-[#e8e6e0]">
                      <div className="flex-shrink-0 w-8 h-8 sm:w-10 sm:h-10 bg-[#c9b896] rounded-full flex items-center justify-center">
                        <svg className="w-4 h-4 sm:w-5 sm:h-5 text-[#3a3a35]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                      </div>
                      <div>
                        <p className="text-[10px] sm:text-xs text-[#3a3a35]/60 font-medium uppercase tracking-wider">{t.retreatsPage?.dates || 'Даты'}</p>
                        <p className="text-xs sm:text-sm font-medium text-[#3a3a35]">{retreat.dates}</p>
                      </div>
                    </div>

                    <div className="flex items-center gap-3 p-3 sm:p-4 bg-white rounded-lg sm:rounded-xl shadow-sm border border-[#e8e6e0]">
                      <div className="flex-shrink-0 w-8 h-8 sm:w-10 sm:h-10 bg-[#c9b896] rounded-full flex items-center justify-center">
                        <svg className="w-4 h-4 sm:w-5 sm:h-5 text-[#3a3a35]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                        </svg>
                      </div>
                      <div>
                        <p className="text-[10px] sm:text-xs text-[#3a3a35]/60 font-medium uppercase tracking-wider">{t.retreatsPage?.location || 'Место'}</p>
                        <p className="text-xs sm:text-sm font-medium text-[#3a3a35]">{retreat.location[language]}</p>
                      </div>
                    </div>

                    <div className="flex items-center gap-3 p-3 sm:p-4 bg-[#c9b896] rounded-lg sm:rounded-xl shadow-sm">
                      <div className="flex-shrink-0 w-8 h-8 sm:w-10 sm:h-10 bg-[#3a3a35] rounded-full flex items-center justify-center">
                        <svg className="w-4 h-4 sm:w-5 sm:h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                      </div>
                      <div>
                        <p className="text-[10px] sm:text-xs text-[#3a3a35]/80 font-medium uppercase tracking-wider">{language === 'ru' ? 'Цена' : 'Price'}</p>
                        <p className="text-lg sm:text-xl font-bold text-[#3a3a35]">{retreat.price}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Full Description Below */}
              <div className="px-5 sm:px-8 lg:px-12 pb-6 sm:pb-10 pt-4 border-t border-[#e8e6e0]">
                <h2 className="text-lg sm:text-xl font-light text-[#3a3a35] mb-3 sm:mb-4">{t.retreatsPage?.description || 'Описание'}</h2>
                <p className="text-sm sm:text-base text-[#3a3a35]/80 font-light leading-relaxed">
                  {retreat.description[language]}
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Additional Content */}
        <section className="px-4 sm:px-6 py-8 sm:py-12">
          <div className="max-w-5xl mx-auto">
            {/* Info Grid */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-6 mb-8 sm:mb-12">
              <div className="p-4 sm:p-6 bg-white/40 backdrop-blur-sm border border-[#3a3a35]/10">
                <div className="flex items-center gap-2 sm:gap-3 mb-2">
                  <svg className="w-5 h-5 sm:w-6 sm:h-6 text-[#c9b896]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                  <span className="text-[10px] sm:text-xs uppercase tracking-wider text-[#3a3a35]/60">
                    {t.retreatsPage?.dates || 'Даты'}
                  </span>
                </div>
                <p className="text-xs sm:text-sm text-[#3a3a35] font-light">{retreat.dates}</p>
              </div>

              <div className="p-4 sm:p-6 bg-white/40 backdrop-blur-sm border border-[#3a3a35]/10">
                <div className="flex items-center gap-2 sm:gap-3 mb-2">
                  <svg className="w-5 h-5 sm:w-6 sm:h-6 text-[#c9b896]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span className="text-[10px] sm:text-xs uppercase tracking-wider text-[#3a3a35]/60">
                    {t.retreatsPage?.duration || 'Длит.'}
                  </span>
                </div>
                <p className="text-xs sm:text-sm text-[#3a3a35] font-light">{retreat.duration}</p>
              </div>

              <div className="p-4 sm:p-6 bg-white/40 backdrop-blur-sm border border-[#3a3a35]/10">
                <div className="flex items-center gap-2 sm:gap-3 mb-2">
                  <svg className="w-5 h-5 sm:w-6 sm:h-6 text-[#c9b896]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  <span className="text-[10px] sm:text-xs uppercase tracking-wider text-[#3a3a35]/60">
                    {t.retreatsPage?.location || 'Место'}
                  </span>
                </div>
                <p className="text-xs sm:text-sm text-[#3a3a35] font-light">{retreat.location[language]}</p>
              </div>

              {retreat.maxParticipants && (
                <div className="p-4 sm:p-6 bg-white/40 backdrop-blur-sm border border-[#3a3a35]/10">
                  <div className="flex items-center gap-2 sm:gap-3 mb-2">
                    <svg className="w-5 h-5 sm:w-6 sm:h-6 text-[#c9b896]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                    </svg>
                    <span className="text-[10px] sm:text-xs uppercase tracking-wider text-[#3a3a35]/60">
                      {t.retreatsPage?.maxParticipants || 'Макс.'}
                    </span>
                  </div>
                  <p className="text-xs sm:text-sm text-[#3a3a35] font-light">{retreat.maxParticipants}</p>
                </div>
              )}
            </div>

            {/* Pricing */}
            <div className="mb-8 sm:mb-12 p-5 sm:p-8 bg-white/60 backdrop-blur-sm border border-[#3a3a35]/10">
              <h2 className="text-xl sm:text-2xl font-light text-[#3a3a35] mb-4 sm:mb-6">{t.retreatsPage?.pricing || 'Стоимость'}</h2>
              <div className="text-3xl sm:text-4xl font-light text-[#3a3a35] mb-4 sm:mb-6">{retreat.price}</div>
              
              {retreat.pricingTiers && retreat.pricingTiers.length > 0 && (
                <div className="space-y-2 sm:space-y-3">
                  {retreat.pricingTiers.map((tier, index) => (
                    <div key={index} className="flex justify-between items-center py-2 sm:py-3 border-t border-[#3a3a35]/10">
                      <span className="text-xs sm:text-sm text-[#3a3a35]/70">{tier.deadline}</span>
                      <span className="text-base sm:text-xl font-light text-[#3a3a35]">{tier.price}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Description */}
            <div className="mb-8 sm:mb-12">
              <p className="text-sm sm:text-lg text-[#3a3a35]/80 font-light leading-relaxed">
                {retreat.description[language]}
              </p>
            </div>

            {/* Two Column Layout */}
            <div className="grid lg:grid-cols-2 gap-6 sm:gap-12 mb-8 sm:mb-12">
              {/* Highlights */}
              {retreat.highlights[language].length > 0 && (
                <div className="p-5 sm:p-8 bg-white/40 backdrop-blur-sm border border-[#3a3a35]/10">
                  <h3 className="text-xl sm:text-2xl font-light text-[#3a3a35] mb-4 sm:mb-6">
                    {t.retreatsPage?.highlights || 'Основные Моменты'}
                  </h3>
                  <ul className="space-y-2 sm:space-y-3">
                    {retreat.highlights[language].map((item, index) => (
                      <li key={index} className="flex items-start gap-2 sm:gap-3">
                        <svg className="w-4 h-4 sm:w-5 sm:h-5 text-[#c9b896] flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                        </svg>
                        <span className="text-xs sm:text-sm text-[#3a3a35]/80 font-light">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Included */}
              {retreat.included[language].length > 0 && (
                <div className="p-5 sm:p-8 bg-white/40 backdrop-blur-sm border border-[#3a3a35]/10">
                  <h3 className="text-xl sm:text-2xl font-light text-[#3a3a35] mb-4 sm:mb-6">
                    {t.retreatsPage?.whatIncluded || 'Что Включено'}
                  </h3>
                  <ul className="space-y-2 sm:space-y-3">
                    {retreat.included[language].map((item, index) => (
                      <li key={index} className="flex items-start gap-2 sm:gap-3">
                        <svg className="w-4 h-4 sm:w-5 sm:h-5 text-green-600 flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                        <span className="text-xs sm:text-sm text-[#3a3a35]/80 font-light">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>

            {/* Not Included */}
            {retreat.notIncluded[language].length > 0 && (
              <div className="mb-8 sm:mb-12 p-5 sm:p-8 bg-white/40 backdrop-blur-sm border border-[#3a3a35]/10">
                <h3 className="text-xl sm:text-2xl font-light text-[#3a3a35] mb-4 sm:mb-6">
                  {t.retreatsPage?.whatNotIncluded || 'Что Не Включено'}
                </h3>
                <ul className="space-y-2 sm:space-y-3">
                  {retreat.notIncluded[language].map((item, index) => (
                    <li key={index} className="flex items-start gap-2 sm:gap-3">
                      <svg className="w-4 h-4 sm:w-5 sm:h-5 text-red-500 flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                      </svg>
                      <span className="text-xs sm:text-sm text-[#3a3a35]/80 font-light">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* CTA */}
            <div className="text-center p-6 sm:p-12 bg-gradient-to-br from-white/60 to-white/30 backdrop-blur-sm border border-[#3a3a35]/10">
              <h3 className="text-2xl sm:text-3xl font-light text-[#3a3a35] mb-3 sm:mb-4">
                {t.retreatsPage?.ctaTitle || 'Готовы к Трансформации?'}
              </h3>
              <p className="text-sm sm:text-lg text-[#3a3a35]/70 font-light mb-6 sm:mb-8 max-w-2xl mx-auto">
                {t.retreatsPage?.ctaDescription || 'Свяжитесь с нами для получения дополнительной информации и бронирования места'}
              </p>
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 sm:gap-3 px-6 sm:px-10 py-3 sm:py-4 bg-[#c9b896] text-[#3a3a35] hover:bg-[#3a3a35] hover:text-white transition-all duration-300 font-light tracking-wider text-xs sm:text-sm"
              >
                {t.retreatsPage?.bookNow || 'Забронировать'}
                <svg className="w-3 h-3 sm:w-4 sm:h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </Link>
            </div>
          </div>
        </section>
      </div>
      <Footer />
    </>
  );
}
