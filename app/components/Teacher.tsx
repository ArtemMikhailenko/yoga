'use client';

import Link from 'next/link';
import { useLanguage } from '../context/LanguageContext';

export default function Teacher() {
  const { t } = useLanguage();

  return (
    <section className="relative w-full min-h-screen lg:h-screen overflow-hidden bg-[#e8e6e0]">
      <div className="grid grid-cols-1 lg:grid-cols-2 h-full">
        {/* Left Side - Video */}
        <div className="relative h-[40vh] sm:h-[50vh] lg:h-full w-full">
          <video
            autoPlay
            loop
            muted
            playsInline
            className="absolute top-0 left-0 w-full h-full object-cover grayscale"
          >
            <source src="/video/block.mp4" type="video/mp4" />
          </video>
        </div>

        {/* Right Side - Content */}
        <div className="relative flex items-center justify-center px-6 sm:px-12 lg:px-20 py-10 lg:py-0">
          <div className="max-w-2xl w-full">
            {/* Small labels */}
            <div className="flex items-center gap-4 mb-8 opacity-60">
              <span className="text-xs uppercase tracking-[0.3em] text-[#3a3a35]">
                {t.teacher.subtitle1}
              </span>
              <span className="text-xs uppercase tracking-[0.3em] text-[#3a3a35]">
                {t.teacher.subtitle2}
              </span>
            </div>

            {/* Title */}
            <h2 className="text-3xl sm:text-5xl lg:text-6xl xl:text-7xl font-light text-[#2a2a25] leading-tight mb-2 sm:mb-4">
              {t.teacher.title1}
            </h2>
            <h2 className="text-3xl sm:text-5xl lg:text-6xl xl:text-7xl font-serif italic text-[#2a2a25] leading-tight mb-6 sm:mb-10">
              {t.teacher.title2}
            </h2>
            
            {/* Description */}
            <div className="border-l border-[#c9b896]/40 pl-4 sm:pl-6 mb-6 sm:mb-10">
              <p className="text-sm sm:text-base text-[#5c5c54] leading-relaxed font-light">
                {t.teacher.description}
              </p>
            </div>
            
            {/* CTA Button */}
            <Link
              href="/courses#booking"
              className="inline-flex items-center gap-2 sm:gap-3 px-6 sm:px-10 py-3 sm:py-3.5 bg-[#2a2a25] text-white hover:bg-[#3a3a35] transition-colors duration-300 font-light tracking-[0.1em] sm:tracking-[0.15em] text-xs sm:text-sm"
            >
              {t.teacher.cta}
              <svg
                className="w-4 h-4"
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

            {/* Bottom label */}
            <div className="mt-8 sm:mt-16 flex items-center gap-3 opacity-50">
              <svg className="w-4 h-4 sm:w-5 sm:h-5 text-[#c9b896]" viewBox="0 0 24 24" fill="currentColor">
                <path d="M17,8C8,10 5.9,16.17 3.82,21.34L5.71,22L6.66,19.7C7.14,19.87 7.64,20 8,20C19,20 22,3 22,3C21,5 14,5.25 9,6.25C4,7.25 2,11.5 2,13.5C2,15.5 3.75,17.25 3.75,17.25C7,8 17,8 17,8Z" />
              </svg>
              <span className="text-xs uppercase tracking-[0.2em] sm:tracking-[0.25em] text-[#5c5c54]">
                Yoga Practice
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
