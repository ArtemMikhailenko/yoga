'use client';

import { useState } from 'react';
import Image from 'next/image';
import { useLanguage } from '../context/LanguageContext';

export default function FAQ() {
  const { t } = useLanguage();
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const faqs = [
    {
      question: t.faq.items[0].question,
      answer: t.faq.items[0].answer,
    },
    {
      question: t.faq.items[1].question,
      answer: t.faq.items[1].answer,
    },
    {
      question: t.faq.items[2].question,
      answer: t.faq.items[2].answer,
    },
    {
      question: t.faq.items[3].question,
      answer: t.faq.items[3].answer,
    },
  ];

  return (
    <section className="relative w-full min-h-screen bg-[#e8e6e0]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-20 py-12 sm:py-20 lg:py-32">
        {/* Top Section - Title and Image */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-16 lg:gap-20 items-start mb-10 sm:mb-16 lg:mb-20">
          {/* Left - Title */}
          <div>
            <h2 className="text-3xl sm:text-5xl lg:text-6xl xl:text-7xl font-light text-[#3a3a35] mb-4 sm:mb-6">
              {t.faq.title}
            </h2>
            <p className="text-sm sm:text-base lg:text-lg text-[#3a3a35]/60 font-light leading-relaxed max-w-lg">
              {t.faq.description}
            </p>
          </div>

          {/* Right - Image */}
          <div className="relative h-[250px] sm:h-[400px] lg:h-[500px] rounded-2xl overflow-hidden">
            <Image
              src="/images/curse/IMG_6144.JPG"
              alt="Yoga Practice"
              fill
              className="object-cover grayscale"
              priority
            />
          </div>
        </div>

        {/* FAQ Items */}
        <div className="max-w-4xl mx-auto space-y-0">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className="border-t border-[#3a3a35]/10 last:border-b"
            >
              <button
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                className="w-full py-5 sm:py-8 lg:py-10 flex items-start justify-between gap-4 sm:gap-8 group transition-all duration-200"
              >
                <div className="flex items-start gap-3 sm:gap-6 lg:gap-8 flex-1 text-left">
                  {/* Circle Number */}
                  <div className="flex-shrink-0 w-10 h-10 sm:w-12 sm:h-12 lg:w-14 lg:h-14 rounded-full border border-[#c9b896] flex items-center justify-center group-hover:bg-[#c9b896] transition-all duration-300">
                    <span className="text-[#3a3a35]/60 group-hover:text-white text-xs sm:text-sm font-light transition-colors duration-300">
                      {String(index + 1).padStart(2, '0')}
                    </span>
                  </div>

                  {/* Content */}
                  <div className="flex-1">
                    <h3 className="text-base sm:text-xl lg:text-2xl xl:text-3xl font-light text-[#3a3a35] mb-2 sm:mb-4 leading-snug">
                      {faq.question}
                    </h3>

                    {/* Answer - Expandable */}
                    <div
                      className={`overflow-hidden transition-all duration-500 ${
                        openIndex === index ? 'max-h-96 opacity-100 mt-4' : 'max-h-0 opacity-0'
                      }`}
                    >
                      <div className="space-y-4 border-l-2 border-[#c9b896]/30 pl-6">
                        {faq.answer.split('\n\n').map((paragraph, idx) => (
                          <p
                            key={idx}
                            className="text-sm lg:text-base text-[#3a3a35]/60 font-light leading-relaxed"
                          >
                            {paragraph}
                          </p>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Plus/Minus Icon */}
                <div className="flex-shrink-0 mt-1 sm:mt-2">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 lg:w-14 lg:h-14 rounded-full border border-[#c9b896] flex items-center justify-center group-hover:bg-[#c9b896] transition-all duration-300">
                    <svg
                      className="w-4 h-4 sm:w-5 sm:h-5 lg:w-6 lg:h-6 text-[#3a3a35]/60 group-hover:text-white transition-all duration-300"
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
        </div>
      </div>
    </section>
  );
}
