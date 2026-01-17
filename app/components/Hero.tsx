'use client';

import Link from 'next/link';
import { useLanguage } from '../context/LanguageContext';

export default function Hero() {
  const { t } = useLanguage();

  return (
    <section className="relative w-full h-screen overflow-hidden">
      {/* Video Background */}
      <video
        autoPlay
        loop
        muted
        playsInline
        className="absolute top-0 left-0 w-full h-full object-cover"
      >
        <source src="/video/bg.mp4" type="video/mp4" />
      </video>

      {/* Overlay */}
      <div className="absolute top-0 left-0 w-full h-full bg-black/40" />

      {/* Content */}
      <div className="relative z-10 w-full h-full flex items-center justify-center">
        <div className="container mx-auto px-6">
          <div className="flex flex-col items-center justify-center text-center space-y-8">
            {/* Subtitle */}
            <p className="text-lg sm:text-xl font-light text-white/90 tracking-widest uppercase">
              {t.hero.subtitle}
            </p>
            
            {/* Main Title - Large Text */}
            <h1 className="text-[60px] sm:text-[100px] md:text-[150px] lg:text-[200px] xl:text-[250px] font-thin text-white/95 leading-none tracking-[0.1em] sm:tracking-[0.2em]">
              {t.hero.title}
            </h1>
            
            {/* Author Name */}
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-serif text-white/95 tracking-wide">
              {t.hero.author}
            </h2>
            
            {/* Description */}
            <p className="text-sm sm:text-base lg:text-xl text-white/80 leading-relaxed font-light max-w-3xl px-4 sm:px-0">
              {t.hero.description}
            </p>
            
            {/* CTA Button */}
            <div className="pt-4 sm:pt-6">
              <Link
                href="#program"
                className="group inline-flex items-center gap-2 sm:gap-3 px-6 sm:px-12 py-3 sm:py-3.5 border border-white/60 text-white hover:bg-white hover:text-black transition-all duration-500 font-light tracking-[0.1em] sm:tracking-[0.2em] text-xs sm:text-sm backdrop-blur-sm"
              >
                {t.hero.cta}
                <svg
                  className="w-4 h-4 transform group-hover:translate-x-1 transition-transform duration-300"
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

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20">
        <div className="w-6 h-10 border-2 border-white/50 rounded-full flex items-start justify-center p-2">
          <div className="w-1 h-2 bg-white/50 rounded-full animate-bounce" />
        </div>
      </div>
    </section>
  );
}
