'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useLanguage } from '../context/LanguageContext';

export default function AboutPage() {
  const { t } = useLanguage();

  return (
    <div className="bg-[#e8e6e0]">
      {/* Hero Section with Image */}
      <section className="relative w-full h-[70vh] sm:h-screen overflow-hidden">
        <Image
          src="/images/about/IMG_6143.JPG"
          alt="Yoga practice"
          fill
          className="object-cover brightness-75"
        />
        
        {/* Overlay Content */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />
        <div className="relative z-10 container mx-auto px-4 sm:px-6 h-full flex flex-col justify-end pb-12 sm:pb-20">
          <div className="max-w-3xl">
            <div className="flex items-center gap-3 mb-4 sm:mb-6">
              <div className="w-1 h-12 sm:h-20 bg-[#c9b896]" />
              <div>
                <span className="text-[10px] sm:text-xs uppercase tracking-[0.3em] sm:tracking-[0.4em] text-white/60 block mb-1 sm:mb-2">
                  {t.aboutPage.studioName}
                </span>
                <h1 className="text-4xl sm:text-6xl lg:text-7xl font-light text-white leading-tight">
                  {t.about.title}
                </h1>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Two Column Text + Image */}
      <section className="py-12 sm:py-24 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-16 items-center">
            {/* Text Content */}
            <div className="space-y-8 sm:space-y-12 order-2 lg:order-1">
              <div>
                <div className="inline-block px-4 sm:px-6 py-2 border border-[#c9b896] mb-4 sm:mb-6">
                  <span className="text-[10px] sm:text-xs uppercase tracking-[0.2em] sm:tracking-[0.3em] text-[#3a3a35]">{t.aboutPage.philosophyTag}</span>
                </div>
                <h2 className="text-3xl sm:text-4xl lg:text-5xl font-light text-[#3a3a35] mb-6 sm:mb-8 leading-tight">
                  {t.aboutPage.philosophyTitle}
                </h2>
                <p className="text-sm sm:text-lg text-[#3a3a35]/80 font-light leading-relaxed mb-4 sm:mb-6">
                  {t.aboutPage.bio1}
                </p>
                <p className="text-sm sm:text-lg text-[#3a3a35]/80 font-light leading-relaxed mb-4 sm:mb-6">
                  {t.aboutPage.bio2}
                </p>
                <p className="text-sm sm:text-lg text-[#3a3a35]/80 font-light leading-relaxed">
                  {t.aboutPage.bio3}
                </p>
              </div>
            </div>

            {/* Image */}
            <div className="relative order-1 lg:order-2">
              <div className="absolute -top-4 -left-4 sm:-top-8 sm:-left-8 w-full h-full border-2 border-[#c9b896]/30" />
              <div className="relative h-[300px] sm:h-[400px] lg:h-[550px] overflow-hidden">
                <Image
                  src="/images/about/IMG_6150.JPG"
                  alt="Yoga session"
                  fill
                  className="object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Philosophy with Teacher Info */}
      <section className="relative py-12 sm:py-24 bg-[#3a3a35]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 sm:gap-12 items-center">
            {/* Image Side */}
            <div className="lg:col-span-2 order-2 lg:order-1">
              <div className="relative h-[300px] sm:h-[450px] lg:h-[600px] overflow-hidden">
                <Image
                  src="/images/about/IMG_6152.JPG"
                  alt="Vladyslav Changeliya"
                  fill
                  className="object-cover"
                />
                {/* Gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-r from-[#3a3a35] via-transparent to-transparent" />
              </div>
            </div>

            {/* Content Side */}
            <div className="lg:col-span-3 space-y-6 sm:space-y-10 order-1 lg:order-2">
              <div className="flex items-center gap-3 sm:gap-4 flex-wrap">
                <span className="text-[10px] sm:text-xs uppercase tracking-[0.2em] sm:tracking-[0.3em] text-white/50">
                  {t.teacher.subtitle1}
                </span>
                <div className="w-8 sm:w-16 h-px bg-white/30" />
                <span className="text-[10px] sm:text-xs uppercase tracking-[0.2em] sm:tracking-[0.3em] text-white/50">
                  {t.teacher.subtitle2}
                </span>
              </div>

              <div>
                <h2 className="text-3xl sm:text-5xl lg:text-6xl font-light text-white mb-2 sm:mb-4 leading-tight">
                  {t.teacher.title1}
                </h2>
                <h2 className="text-3xl sm:text-5xl lg:text-6xl font-serif italic text-[#c9b896] leading-tight">
                  {t.teacher.title2}
                </h2>
              </div>

              <div className="space-y-4 sm:space-y-6">
                <div className="flex gap-3 sm:gap-4">
                  <div className="w-1 bg-[#c9b896]" />
                  <div className="space-y-4 sm:space-y-6">
                    <p className="text-sm sm:text-base text-white/80 leading-relaxed font-light">
                      {t.aboutPage.bio4}
                    </p>
                    <p className="text-sm sm:text-base text-white/80 leading-relaxed font-light">
                      {t.aboutPage.bio5}
                    </p>
                    <p className="text-sm sm:text-base text-white/80 leading-relaxed font-light">
                      {t.aboutPage.bio6}
                    </p>
                  </div>
                </div>
              </div>

              <div className="pt-4 sm:pt-6">
                <Link
                  href="/contact"
                  className="inline-flex items-center gap-2 sm:gap-3 px-6 sm:px-10 py-3 sm:py-4 border-2 border-white text-white hover:bg-white hover:text-[#3a3a35] transition-all duration-300 font-light tracking-wider text-xs sm:text-sm group"
                >
                  {t.teacher.cta}
                  <svg
                    className="w-4 h-4 group-hover:translate-x-1 transition-transform"
                    fill="none"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="1.5"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-12 sm:py-24 px-4 sm:px-6 bg-[#e8e6e0]">
        <div className="max-w-6xl mx-auto">
          {/* Section Header */}
          <div className="text-center mb-10 sm:mb-16">
            <div className="flex items-center justify-center gap-3 mb-4 sm:mb-6">
              <svg className="w-5 h-5 sm:w-6 sm:h-6 text-[#c9b896]" viewBox="0 0 24 24" fill="currentColor">
                <path d="M17,8C8,10 5.9,16.17 3.82,21.34L5.71,22L6.66,19.7C7.14,19.87 7.64,20 8,20C19,20 22,3 22,3C21,5 14,5.25 9,6.25C4,7.25 2,11.5 2,13.5C2,15.5 3.75,17.25 3.75,17.25C7,8 17,8 17,8Z" />
              </svg>
            </div>
            <h3 className="text-3xl sm:text-4xl lg:text-5xl font-light text-[#3a3a35] mb-3 sm:mb-4">
              {t.aboutPage.missionTitle}
            </h3>
            <p className="text-sm sm:text-lg text-[#3a3a35]/60 font-light max-w-2xl mx-auto">
              {t.aboutPage.missionSubtitle}
            </p>
          </div>

          {/* Grid of Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {/* Card 1 */}
            <div className="group relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-[#c9b896]/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <div className="relative p-5 sm:p-8 border-l-2 border-[#c9b896]">
                <div className="mb-4 sm:mb-6">
                  <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-full border-2 border-[#c9b896] flex items-center justify-center group-hover:bg-[#c9b896] transition-colors">
                    <svg className="w-5 h-5 sm:w-6 sm:h-6 text-[#3a3a35]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                    </svg>
                  </div>
                </div>
                <h4 className="text-xl sm:text-2xl font-light text-[#3a3a35] mb-3 sm:mb-4">{t.aboutPage.mindBalanceTitle}</h4>
                <p className="text-sm sm:text-base text-[#3a3a35]/70 font-light leading-relaxed">
                  {t.aboutPage.mindBalanceText}
                </p>
              </div>
            </div>

            {/* Card 2 */}
            <div className="group relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-[#c9b896]/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <div className="relative p-5 sm:p-8 border-l-2 border-[#c9b896]">
                <div className="mb-4 sm:mb-6">
                  <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-full border-2 border-[#c9b896] flex items-center justify-center group-hover:bg-[#c9b896] transition-colors">
                    <svg className="w-5 h-5 sm:w-6 sm:h-6 text-[#3a3a35]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 10V3L4 14h7v7l9-11h-7z" />
                    </svg>
                  </div>
                </div>
                <h4 className="text-xl sm:text-2xl font-light text-[#3a3a35] mb-3 sm:mb-4">{t.aboutPage.bodyStrengthTitle}</h4>
                <p className="text-sm sm:text-base text-[#3a3a35]/70 font-light leading-relaxed">
                  {t.aboutPage.bodyStrengthText}
                </p>
              </div>
            </div>

            {/* Card 3 */}
            <div className="group relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-[#c9b896]/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <div className="relative p-5 sm:p-8 border-l-2 border-[#c9b896]">
                <div className="mb-4 sm:mb-6">
                  <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-full border-2 border-[#c9b896] flex items-center justify-center group-hover:bg-[#c9b896] transition-colors">
                    <svg className="w-5 h-5 sm:w-6 sm:h-6 text-[#3a3a35]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
                    </svg>
                  </div>
                </div>
                <h4 className="text-xl sm:text-2xl font-light text-[#3a3a35] mb-3 sm:mb-4">{t.aboutPage.spiritGrowthTitle}</h4>
                <p className="text-sm sm:text-base text-[#3a3a35]/70 font-light leading-relaxed">
                  {t.aboutPage.spiritGrowthText}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-12 sm:py-24 px-4 sm:px-6 bg-gradient-to-br from-[#3a3a35] to-[#2a2a25]">
        <div className="max-w-4xl mx-auto text-center">
          <div className="mb-6 sm:mb-8">
            <span className="inline-block px-4 sm:px-6 py-2 border border-white/20 text-[10px] sm:text-xs uppercase tracking-[0.2em] sm:tracking-[0.3em] text-white/60 mb-4 sm:mb-6">
              {t.aboutPage.ctaTag}
            </span>
            <h3 className="text-3xl sm:text-4xl lg:text-6xl font-light text-white mb-4 sm:mb-6 leading-tight">
              {t.aboutPage.ctaTitle}
            </h3>
            <p className="text-sm sm:text-lg text-white/70 font-light max-w-2xl mx-auto px-4">
              {t.aboutPage.ctaSubtitle}
            </p>
          </div>
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center mt-8 sm:mt-12">
            <Link
              href="/contact"
              className="inline-flex items-center justify-center gap-2 sm:gap-3 px-8 sm:px-12 py-4 sm:py-5 bg-[#c9b896] text-[#3a3a35] hover:bg-white transition-all duration-300 font-light tracking-wider text-xs sm:text-sm group"
            >
              {t.aboutPage.ctaButton}
              <svg className="w-3 h-3 sm:w-4 sm:h-4 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
            <Link
              href="/#pricing"
              className="inline-flex items-center justify-center gap-3 px-12 py-5 border-2 border-white text-white hover:bg-white hover:text-[#3a3a35] transition-all duration-300 font-light tracking-wider text-sm"
            >
              {t.aboutPage.ctaPricing}
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
