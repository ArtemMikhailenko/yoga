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
      <div className="bg-[#e8e6e0]">
        {/* Hero Image */}
        <section className="relative h-[60vh]">
          <Image
            src={retreat.imageUrl}
            alt={retreat.title[language]}
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#3a3a35]/80 to-transparent" />
          
          {/* Back Button */}
          <div className="absolute top-24 left-6 z-10">
            <Link
              href="/retreats"
              className="inline-flex items-center gap-2 px-4 py-2 bg-white/20 backdrop-blur-sm text-white hover:bg-white/30 transition-colors"
            >
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 19l-7-7 7-7" />
              </svg>
              {t.retreatsPage?.backToRetreats || 'Назад'}
            </Link>
          </div>
        </section>

        {/* Content */}
        <section className="px-6 py-12">
          <div className="max-w-5xl mx-auto">
            {/* Title & Subtitle */}
            <div className="mb-12">
              <h1 className="text-4xl lg:text-5xl font-light text-[#3a3a35] mb-4">
                {retreat.title[language]}
              </h1>
              <p className="text-xl text-[#3a3a35]/60 font-light">
                {retreat.subtitle[language]}
              </p>
            </div>

            {/* Info Grid */}
            <div className="grid md:grid-cols-4 gap-6 mb-12">
              <div className="p-6 bg-white/40 backdrop-blur-sm border border-[#3a3a35]/10">
                <div className="flex items-center gap-3 mb-2">
                  <svg className="w-6 h-6 text-[#c9b896]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                  <span className="text-xs uppercase tracking-wider text-[#3a3a35]/60">
                    {t.retreatsPage?.dates || 'Даты'}
                  </span>
                </div>
                <p className="text-[#3a3a35] font-light">{retreat.dates}</p>
              </div>

              <div className="p-6 bg-white/40 backdrop-blur-sm border border-[#3a3a35]/10">
                <div className="flex items-center gap-3 mb-2">
                  <svg className="w-6 h-6 text-[#c9b896]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span className="text-xs uppercase tracking-wider text-[#3a3a35]/60">
                    {t.retreatsPage?.duration || 'Продолжительность'}
                  </span>
                </div>
                <p className="text-[#3a3a35] font-light">{retreat.duration}</p>
              </div>

              <div className="p-6 bg-white/40 backdrop-blur-sm border border-[#3a3a35]/10">
                <div className="flex items-center gap-3 mb-2">
                  <svg className="w-6 h-6 text-[#c9b896]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  <span className="text-xs uppercase tracking-wider text-[#3a3a35]/60">
                    {t.retreatsPage?.location || 'Место'}
                  </span>
                </div>
                <p className="text-[#3a3a35] font-light">{retreat.location[language]}</p>
              </div>

              {retreat.maxParticipants && (
                <div className="p-6 bg-white/40 backdrop-blur-sm border border-[#3a3a35]/10">
                  <div className="flex items-center gap-3 mb-2">
                    <svg className="w-6 h-6 text-[#c9b896]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                    </svg>
                    <span className="text-xs uppercase tracking-wider text-[#3a3a35]/60">
                      {t.retreatsPage?.maxParticipants || 'Макс. участников'}
                    </span>
                  </div>
                  <p className="text-[#3a3a35] font-light">{retreat.maxParticipants}</p>
                </div>
              )}
            </div>

            {/* Pricing */}
            <div className="mb-12 p-8 bg-white/60 backdrop-blur-sm border border-[#3a3a35]/10">
              <h2 className="text-2xl font-light text-[#3a3a35] mb-6">{t.retreatsPage?.pricing || 'Стоимость'}</h2>
              <div className="text-4xl font-light text-[#3a3a35] mb-6">{retreat.price}</div>
              
              {retreat.pricingTiers && retreat.pricingTiers.length > 0 && (
                <div className="space-y-3">
                  {retreat.pricingTiers.map((tier, index) => (
                    <div key={index} className="flex justify-between items-center py-3 border-t border-[#3a3a35]/10">
                      <span className="text-[#3a3a35]/70">{tier.deadline}</span>
                      <span className="text-xl font-light text-[#3a3a35]">{tier.price}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Description */}
            <div className="mb-12">
              <p className="text-lg text-[#3a3a35]/80 font-light leading-relaxed">
                {retreat.description[language]}
              </p>
            </div>

            {/* Two Column Layout */}
            <div className="grid lg:grid-cols-2 gap-12 mb-12">
              {/* Highlights */}
              {retreat.highlights[language].length > 0 && (
                <div className="p-8 bg-white/40 backdrop-blur-sm border border-[#3a3a35]/10">
                  <h3 className="text-2xl font-light text-[#3a3a35] mb-6">
                    {t.retreatsPage?.highlights || 'Основные Моменты'}
                  </h3>
                  <ul className="space-y-3">
                    {retreat.highlights[language].map((item, index) => (
                      <li key={index} className="flex items-start gap-3">
                        <svg className="w-5 h-5 text-[#c9b896] flex-shrink-0 mt-1" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                        </svg>
                        <span className="text-[#3a3a35]/80 font-light">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Included */}
              {retreat.included[language].length > 0 && (
                <div className="p-8 bg-white/40 backdrop-blur-sm border border-[#3a3a35]/10">
                  <h3 className="text-2xl font-light text-[#3a3a35] mb-6">
                    {t.retreatsPage?.whatIncluded || 'Что Включено'}
                  </h3>
                  <ul className="space-y-3">
                    {retreat.included[language].map((item, index) => (
                      <li key={index} className="flex items-start gap-3">
                        <svg className="w-5 h-5 text-green-600 flex-shrink-0 mt-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                        <span className="text-[#3a3a35]/80 font-light">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>

            {/* Not Included */}
            {retreat.notIncluded[language].length > 0 && (
              <div className="mb-12 p-8 bg-white/40 backdrop-blur-sm border border-[#3a3a35]/10">
                <h3 className="text-2xl font-light text-[#3a3a35] mb-6">
                  {t.retreatsPage?.whatNotIncluded || 'Что Не Включено'}
                </h3>
                <ul className="space-y-3">
                  {retreat.notIncluded[language].map((item, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <svg className="w-5 h-5 text-red-500 flex-shrink-0 mt-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                      </svg>
                      <span className="text-[#3a3a35]/80 font-light">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* CTA */}
            <div className="text-center p-12 bg-gradient-to-br from-white/60 to-white/30 backdrop-blur-sm border border-[#3a3a35]/10">
              <h3 className="text-3xl font-light text-[#3a3a35] mb-4">
                {t.retreatsPage?.ctaTitle || 'Готовы к Трансформации?'}
              </h3>
              <p className="text-lg text-[#3a3a35]/70 font-light mb-8 max-w-2xl mx-auto">
                {t.retreatsPage?.ctaDescription || 'Свяжитесь с нами для получения дополнительной информации и бронирования места'}
              </p>
              <Link
                href="/contact"
                className="inline-flex items-center gap-3 px-10 py-4 bg-[#c9b896] text-[#3a3a35] hover:bg-[#3a3a35] hover:text-white transition-all duration-300 font-light tracking-wider text-sm"
              >
                {t.retreatsPage?.bookNow || 'Забронировать'}
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
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
