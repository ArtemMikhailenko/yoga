'use client';

import { useLanguage } from '../context/LanguageContext';

export default function Benefits() {
  const { t } = useLanguage();

  return (
    <section className="relative w-full h-screen bg-[#e8e6e0] px-6 lg:px-20 flex items-center">
      <div className="max-w-7xl mx-auto w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 items-center h-full">
          {/* Left Side - Content */}
          <div className="lg:col-span-5 space-y-8">
            {/* Mind Calming Block */}
            <div className="flex items-start gap-6">
              {/* Icon */}
              <div className="flex-shrink-0 w-14 h-14 rounded-full bg-[#c9b896] flex items-center justify-center mt-2">
                <svg
                  className="w-7 h-7 text-white"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path d="M12 2C12 2 8 6 8 10C8 12.21 9.79 14 12 14C14.21 14 16 12.21 16 10C16 6 12 2 12 2M12 22C12 22 16 18 16 14C16 11.79 14.21 10 12 10C9.79 10 8 11.79 8 14C8 18 12 22 12 22M2 12C2 12 6 8 10 8C12.21 8 14 9.79 14 12C14 14.21 12.21 16 10 16C6 16 2 12 2 12M22 12C22 12 18 16 14 16C11.79 16 10 14.21 10 12C10 9.79 11.79 8 14 8C18 8 22 12 22 12Z" />
                </svg>
              </div>
              
              <div className="flex-1">
                <h3 className="text-3xl lg:text-4xl font-serif text-[#3a3a35] mb-3 leading-tight">
                  {t.benefits.mindCalming.title}
                </h3>
                <p className="text-sm lg:text-base text-[#3a3a35]/70 leading-relaxed font-light">
                  {t.benefits.mindCalming.description}
                </p>
              </div>
            </div>

            {/* Divider */}
            <div className="w-24 h-px bg-[#c9b896]/40 ml-20" />

            {/* Relaxing Music Block */}
            <div className="flex items-start gap-6">
              {/* Icon */}
              <div className="flex-shrink-0 w-14 h-14 rounded-full bg-[#c9b896] flex items-center justify-center mt-2">
                <svg
                  className="w-7 h-7 text-white"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path d="M12 3V13.55C11.41 13.21 10.73 13 10 13C7.79 13 6 14.79 6 17S7.79 21 10 21 14 19.21 14 17V7H18V3H12Z" />
                </svg>
              </div>
              
              <div className="flex-1">
                <h3 className="text-3xl lg:text-4xl font-serif text-[#3a3a35] mb-3 leading-tight">
                  {t.benefits.relaxingMusic.title}
                </h3>
                <p className="text-sm lg:text-base text-[#3a3a35]/70 leading-relaxed font-light">
                  {t.benefits.relaxingMusic.description}
                </p>
              </div>
            </div>
          </div>

          {/* Right Side - Video */}
          <div className="lg:col-span-7 h-full flex items-center">
            <div className="relative w-full h-[85vh] overflow-hidden">
              <video
                autoPlay
                loop
                muted
                playsInline
                className="w-full h-full object-cover grayscale"
              >
                <source src="/video/block2.mp4" type="video/mp4" />
              </video>
              
              {/* Subtle gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#3a3a35]/15 via-transparent to-transparent" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
