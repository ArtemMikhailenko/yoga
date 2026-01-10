'use client';

import Link from 'next/link';
import { useLanguage } from '../context/LanguageContext';

export default function Course() {
  const { t } = useLanguage();

  return (
    <section className="relative w-full min-h-screen bg-[#e8e6e0] py-20 flex items-center">
      <div className="container mx-auto px-6">
        <div className="max-w-4xl mx-auto">
          {/* Content */}
          <div className="flex flex-col items-center text-center">
            <h2 className="text-[80px] sm:text-[100px] lg:text-[140px] font-thin text-[#5c5c54] leading-none mb-8 tracking-[0.15em]">
              {t.course.title}
            </h2>
            <p className="text-xl sm:text-2xl text-[#5c5c54] mb-12 leading-relaxed max-w-2xl font-light">
              {t.course.description}<br />
              {t.course.subtitle}
            </p>

            {/* Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 w-full max-w-2xl">
              <Link
                href="#program"
                className="flex-1 px-8 py-4 bg-transparent border-2 border-[#5c5c54] text-[#5c5c54] text-center hover:bg-[#5c5c54] hover:text-white transition-all duration-300 font-light tracking-wide text-lg"
              >
                {t.course.program}
              </Link>
              <Link
                href="#trial"
                className="flex-1 px-8 py-4 bg-[#5c5c54] text-white text-center hover:bg-[#4a4a43] transition-all duration-300 font-light tracking-wide text-lg"
              >
                {t.course.trial}
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
