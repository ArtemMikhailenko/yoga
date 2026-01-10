'use client';

import { useEffect, useRef } from 'react';

export default function AsanaMarquee() {
  const marqueeRef1 = useRef<HTMLDivElement>(null);
  const marqueeRef2 = useRef<HTMLDivElement>(null);

  const asanas = [
    'Virasana',
    'Kakasana', 
    'Bhujangasana',
    'Halasana',
    'Padmasana',
    'Sarvangasana',
    'Mudra',
    'Shavasana',
    'Trikonasana',
    'Vrikshasana',
  ];

  useEffect(() => {
    const animate1 = () => {
      if (marqueeRef1.current) {
        const currentTransform = marqueeRef1.current.style.transform;
        const currentX = currentTransform ? parseFloat(currentTransform.replace('translateX(', '').replace('%)', '')) : 0;
        const newX = currentX <= -33.333 ? 0 : currentX - 0.02;
        marqueeRef1.current.style.transform = `translateX(${newX}%)`;
      }
      requestAnimationFrame(animate1);
    };

    const animate2 = () => {
      if (marqueeRef2.current) {
        const currentTransform = marqueeRef2.current.style.transform;
        const currentX = currentTransform ? parseFloat(currentTransform.replace('translateX(', '').replace('%)', '')) : -33.333;
        const newX = currentX >= 0 ? -33.333 : currentX + 0.02;
        marqueeRef2.current.style.transform = `translateX(${newX}%)`;
      }
      requestAnimationFrame(animate2);
    };

    const anim1 = requestAnimationFrame(animate1);
    const anim2 = requestAnimationFrame(animate2);

    return () => {
      cancelAnimationFrame(anim1);
      cancelAnimationFrame(anim2);
    };
  }, []);

  return (
    <section className="relative bg-gradient-to-br from-[#2a2a25] via-[#1a1a18] to-[#2a2a25] py-20 overflow-hidden">
      {/* Ambient glow effects */}
      <div className="absolute top-1/2 left-1/4 w-96 h-96 bg-[#c9b896]/5 rounded-full blur-3xl" />
      <div className="absolute top-1/2 right-1/4 w-96 h-96 bg-[#c9b896]/5 rounded-full blur-3xl" />
      
      {/* Top border with gradient */}
      <div className="absolute top-0 left-0 w-full h-px">
        <div className="w-full h-full bg-gradient-to-r from-transparent via-[#c9b896]/50 to-transparent" />
      </div>
      
      {/* First marquee - moving right */}
      <div className="relative mb-12 overflow-hidden">
        <div 
          ref={marqueeRef1}
          className="flex will-change-transform"
          style={{ transform: 'translateX(0%)' }}
        >
          {[...Array(3)].map((_, groupIndex) => (
            <div key={groupIndex} className="flex items-center shrink-0">
              {asanas.map((asana, index) => (
                <div key={`${groupIndex}-${index}`} className="flex items-center group">
                  <span className="text-4xl sm:text-5xl lg:text-6xl font-serif text-[#c9b896]/80 whitespace-nowrap tracking-[0.15em] mx-12 transition-all duration-300 group-hover:text-[#c9b896] group-hover:scale-110">
                    {asana}
                  </span>
                  {/* Diamond separator */}
                  <div className="relative mx-12">
                    <svg className="w-3 h-3 text-[#c9b896]/30 rotate-45" viewBox="0 0 10 10" fill="currentColor">
                      <rect width="10" height="10" />
                    </svg>
                  </div>
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>

      {/* Second marquee - moving left */}
      <div className="relative overflow-hidden">
        <div 
          ref={marqueeRef2}
          className="flex will-change-transform"
          style={{ transform: 'translateX(-33.333%)' }}
        >
          {[...Array(3)].map((_, groupIndex) => (
            <div key={groupIndex} className="flex items-center shrink-0">
              {asanas.slice().reverse().map((asana, index) => (
                <div key={`${groupIndex}-${index}`} className="flex items-center group">
                  <span className="text-4xl sm:text-5xl lg:text-6xl font-light text-white/70 whitespace-nowrap tracking-[0.25em] mx-12 transition-all duration-300 group-hover:text-white group-hover:scale-110">
                    {asana}
                  </span>
                  {/* Leaf separator */}
                  <div className="relative mx-12">
                    <svg className="w-6 h-6 text-[#c9b896]/20" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M17,8C8,10 5.9,16.17 3.82,21.34L5.71,22L6.66,19.7C7.14,19.87 7.64,20 8,20C19,20 22,3 22,3C21,5 14,5.25 9,6.25C4,7.25 2,11.5 2,13.5C2,15.5 3.75,17.25 3.75,17.25C7,8 17,8 17,8Z" />
                    </svg>
                  </div>
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>

      {/* Bottom border with gradient */}
      <div className="absolute bottom-0 left-0 w-full h-px">
        <div className="w-full h-full bg-gradient-to-r from-transparent via-[#c9b896]/50 to-transparent" />
      </div>

      {/* Side fade overlays */}
      <div className="absolute top-0 left-0 w-48 h-full bg-gradient-to-r from-[#2a2a25] via-[#2a2a25]/80 to-transparent pointer-events-none z-10" />
      <div className="absolute top-0 right-0 w-48 h-full bg-gradient-to-l from-[#2a2a25] via-[#2a2a25]/80 to-transparent pointer-events-none z-10" />
    </section>
  );
}
