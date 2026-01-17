'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useLanguage } from '../context/LanguageContext';

export default function Classes() {
  const { t } = useLanguage();
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const classes = [
    {
      number: '01',
      title: t.classes.group.title,
      description: t.classes.group.description,
    },
    {
      number: '02',
      title: t.classes.private.title,
      description: t.classes.private.description,
    },
    {
      number: '03',
      title: t.classes.coaching.title,
      description: t.classes.coaching.description,
    },
    {
      number: '04',
      title: t.classes.training.title,
      description: t.classes.training.description,
    },
    {
      number: '05',
      title: t.classes.retreats.title,
      description: t.classes.retreats.description,
    },
    {
      number: '06',
      title: t.classes.events.title,
      description: t.classes.events.description,
    },
  ];

  return (
    <section className="relative w-full min-h-screen bg-[#5c5c54] py-12 sm:py-20 px-4 sm:px-6 lg:px-20">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16">
          {/* Left Side - Title and CTA */}
          <div className="lg:col-span-4 flex flex-col justify-between">
            <div>
              <h2 className="text-3xl sm:text-5xl lg:text-6xl xl:text-7xl font-light text-white leading-tight mb-6 sm:mb-8">
                {t.classes.title}
              </h2>
            </div>

            {/* CTA Button */}
            <div className="mt-8 sm:mt-16 hidden lg:block">
              <Link
                href="#booking"
                className="inline-flex items-center justify-center w-36 h-36 sm:w-48 sm:h-48 rounded-full bg-white/90 text-[#5c5c54] hover:bg-white transition-colors duration-300"
              >
                <span className="text-sm sm:text-base font-light tracking-wide text-center px-4">
                  {t.classes.cta}
                </span>
              </Link>
            </div>
          </div>

          {/* Right Side - Accordion List */}
          <div className="lg:col-span-8">
            <div className="space-y-0">
              {classes.map((item, index) => (
                <div key={index} className="border-t border-white/20">
                  <button
                    onClick={() => setOpenIndex(openIndex === index ? null : index)}
                    className="w-full py-5 sm:py-8 flex items-start justify-between group hover:bg-white/5 transition-colors duration-300 px-2 sm:px-4"
                  >
                    <div className="flex items-start gap-4 sm:gap-8 flex-1 text-left">
                      {/* Number */}
                      <span className="text-xs sm:text-sm text-white/40 font-light min-w-[2rem] sm:min-w-[3rem] pt-1">
                        {item.number}
                      </span>
                      
                      {/* Title and Description */}
                      <div className="flex-1">
                        <h3 className="text-lg sm:text-2xl lg:text-3xl xl:text-4xl font-serif text-white mb-2 sm:mb-4 group-hover:text-white/90 transition-colors">
                          {item.title}
                        </h3>
                        
                        {/* Description - Expandable */}
                        <div
                          className={`overflow-hidden transition-all duration-500 ${
                            openIndex === index ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
                          }`}
                        >
                          <p className="text-sm sm:text-base text-white/70 font-light leading-relaxed pr-2 sm:pr-12">
                            {item.description}
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* Plus/Minus Icon */}
                    <div className="ml-2 sm:ml-8 flex-shrink-0">
                      <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full border border-white/30 flex items-center justify-center group-hover:border-white/50 transition-colors">
                        <svg
                          className="w-5 h-5 text-white/70 transition-transform duration-300"
                          style={{
                            transform: openIndex === index ? 'rotate(45deg)' : 'rotate(0deg)',
                          }}
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="1.5"
                        >
                          <path d="M12 5v14M5 12h14" strokeLinecap="round" />
                        </svg>
                      </div>
                    </div>
                  </button>
                </div>
              ))}
              
              {/* Bottom border */}
              <div className="border-t border-white/20" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
