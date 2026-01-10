'use client';

import Image from 'next/image';
import { useLanguage } from '../context/LanguageContext';

export default function About() {
  const { t } = useLanguage();

  return (
    <section className="relative w-full h-screen bg-gradient-to-br from-[#ebe9e3] via-[#e0ddd5] to-[#d5d1c7] flex items-center overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute top-1/4 right-1/4 w-[600px] h-[600px] bg-[#c9b896]/15 rounded-full blur-3xl animate-pulse" />
      <div className="absolute bottom-1/4 left-1/4 w-[600px] h-[600px] bg-[#3a3a35]/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
      
      {/* Decorative grid pattern */}
      <div className="absolute inset-0 opacity-[0.03]" style={{ 
        backgroundImage: 'radial-gradient(circle, #3a3a35 1px, transparent 1px)',
        backgroundSize: '50px 50px'
      }} />

      <div className="container mx-auto px-6 h-full py-12 flex flex-col justify-center relative z-10">
        {/* Grid Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 h-[85vh]">
          {/* Left Image Card with enhanced effects */}
          <div className="group relative rounded-[2rem] overflow-hidden shadow-[0_20px_60px_-15px_rgba(0,0,0,0.3)]">
            <div className="absolute inset-0 bg-gradient-to-b from-black/5 via-transparent to-black/70 z-10" />
            
            {/* Decorative corner elements */}
            <div className="absolute top-0 left-0 w-24 h-24 border-t-2 border-l-2 border-[#c9b896]/40 rounded-tl-[2rem] z-20" />
            <div className="absolute bottom-0 right-0 w-24 h-24 border-b-2 border-r-2 border-[#c9b896]/40 rounded-br-[2rem] z-20" />
            
            <Image
              src="/images/hero/second.png"
              alt="Yoga pose"
              fill
              className="object-cover grayscale group-hover:grayscale-0 group-hover:scale-110 transition-all duration-1000 ease-out"
            />
            
            {/* Animated accent line */}
            <div className="absolute top-8 left-8 w-0 h-1 bg-gradient-to-r from-[#c9b896] to-transparent group-hover:w-24 transition-all duration-700 z-20" />
          </div>

          {/* Middle Column - Text Card with enhanced styling */}
          <div className="flex flex-col justify-center gap-12 relative">
            {/* Background card effect */}
            <div className="absolute inset-0 bg-gradient-to-br from-white/40 to-white/10 backdrop-blur-sm rounded-[2rem] shadow-lg" />
            
            <div className="relative z-10 px-8">
              {/* Title with decorative elements */}
              <div className="mb-12">
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-12 h-px bg-gradient-to-r from-[#c9b896] to-transparent" />
                  <svg className="w-6 h-6 text-[#c9b896]" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12,2C11.5,2 11,2.19 10.59,2.59L2.59,10.59C1.8,11.37 1.8,12.63 2.59,13.41L10.59,21.41C11.37,22.2 12.63,22.2 13.41,21.41L21.41,13.41C22.2,12.63 22.2,11.37 21.41,10.59L13.41,2.59C13,2.19 12.5,2 12,2Z" />
                  </svg>
                </div>
                <h2 className="text-4xl lg:text-5xl font-serif text-[#3a3a35] tracking-wide leading-tight">
                  {t.about.title}
                </h2>
              </div>

              {/* Text blocks with enhanced design */}
              <div className="space-y-10">
                <div className="relative group/text">
                  <div className="absolute -left-8 top-0 w-0.5 h-full bg-gradient-to-b from-[#c9b896] to-transparent opacity-60" />
                  <div className="absolute -left-8 top-0 w-0.5 h-0 bg-[#c9b896] group-hover/text:h-full transition-all duration-700" />
                  <div className="w-16 h-px bg-[#c9b896] mb-4" />
                  <p className="text-lg text-[#3a3a35]/90 font-light leading-relaxed">
                    {t.about.leftDescription}
                  </p>
                </div>

                <div className="relative group/text">
                  <div className="absolute -left-8 top-0 w-0.5 h-full bg-gradient-to-b from-transparent via-[#c9b896]/40 to-[#c9b896] opacity-60" />
                  <div className="absolute -left-8 bottom-0 w-0.5 h-0 bg-[#c9b896] group-hover/text:h-full transition-all duration-700" />
                  <div className="w-16 h-px bg-[#c9b896] mb-4" />
                  <p className="text-lg text-[#3a3a35]/90 font-light leading-relaxed">
                    {t.about.rightDescription}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Image Card with enhanced effects */}
          <div className="group relative rounded-[2rem] overflow-hidden shadow-[0_20px_60px_-15px_rgba(0,0,0,0.3)]">
            <div className="absolute inset-0 bg-gradient-to-b from-black/5 via-transparent to-black/70 z-10" />
            
            {/* Decorative corner elements */}
            <div className="absolute top-0 right-0 w-24 h-24 border-t-2 border-r-2 border-[#c9b896]/40 rounded-tr-[2rem] z-20" />
            <div className="absolute bottom-0 left-0 w-24 h-24 border-b-2 border-l-2 border-[#c9b896]/40 rounded-bl-[2rem] z-20" />
            
            <Image
              src="/images/hero/three.jpg"
              alt="Yoga meditation"
              fill
              className="object-cover grayscale group-hover:grayscale-0 group-hover:scale-110 transition-all duration-1000 ease-out"
            />
            
            {/* Animated accent line */}
            <div className="absolute bottom-8 right-8 w-0 h-1 bg-gradient-to-l from-[#c9b896] to-transparent group-hover:w-24 transition-all duration-700 z-20" />
          </div>
        </div>
      </div>
    </section>
  );
}
