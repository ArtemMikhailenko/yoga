'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useState } from 'react';
import { useLanguage } from '../context/LanguageContext';

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { language, setLanguage, t } = useLanguage();

  return (
    <header className="fixed top-0 left-0 w-full z-50 bg-black/20 backdrop-blur-md">
      <div className="container mx-auto px-8 py-3 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="text-white text-xl font-light tracking-[0.3em] hover:opacity-80 transition-opacity">
          <Image
                         src="images/logo.svg"
                         alt="YC Logo"
                         width={90}
                         height={90}
                         className=""
                       />
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-10">
          <Link 
            href="/" 
            className="text-white/80 hover:text-white transition-all text-sm font-light tracking-wide relative group"
          >
            {t.header.nav.home || 'Home'}
            <span className="absolute -bottom-1 left-0 w-0 h-px bg-white transition-all group-hover:w-full"></span>
          </Link>
          <Link 
            href="/courses" 
            className="text-white/80 hover:text-white transition-all text-sm font-light tracking-wide relative group"
          >
            {t.header.nav.program}
            <span className="absolute -bottom-1 left-0 w-0 h-px bg-white transition-all group-hover:w-full"></span>
          </Link>
          <Link 
            href="/about" 
            className="text-white/80 hover:text-white transition-all text-sm font-light tracking-wide relative group"
          >
            {t.header.nav.author}
            <span className="absolute -bottom-1 left-0 w-0 h-px bg-white transition-all group-hover:w-full"></span>
          </Link>
          <Link 
            href="/contact" 
            className="text-white/80 hover:text-white transition-all text-sm font-light tracking-wide relative group"
          >
            {t.header.nav.contacts}
            <span className="absolute -bottom-1 left-0 w-0 h-px bg-white transition-all group-hover:w-full"></span>
          </Link>
          
          {/* Language Switcher */}
          <div className="flex items-center gap-2 ml-4 text-sm">
            <button
              onClick={() => setLanguage('ru')}
              className={`font-light transition-all ${
                language === 'ru' ? 'text-white' : 'text-white/40 hover:text-white/80'
              }`}
            >
              RU
            </button>
            <span className="text-white/30">|</span>
            <button
              onClick={() => setLanguage('en')}
              className={`font-light transition-all ${
                language === 'en' ? 'text-white' : 'text-white/40 hover:text-white/80'
              }`}
            >
              EN
            </button>
          </div>
        </nav>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="md:hidden text-white p-2"
          aria-label="Toggle menu"
        >
          <svg
            className="w-6 h-6"
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            {isMenuOpen ? (
              <path d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </button>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <nav className="md:hidden bg-[#5c5c54] border-t border-white/10">
          <div className="container mx-auto px-6 py-4 flex flex-col gap-4">
            <Link 
              href="/" 
              className="text-white/90 hover:text-white transition-colors text-base font-light"
              onClick={() => setIsMenuOpen(false)}
            >
              {t.header.nav.home || 'Home'}
            </Link>
            <Link 
              href="/courses" 
              className="text-white/90 hover:text-white transition-colors text-base font-light"
              onClick={() => setIsMenuOpen(false)}
            >
              {t.header.nav.program}
            </Link>
            <Link 
              href="/about" 
              className="text-white/90 hover:text-white transition-colors text-base font-light"
              onClick={() => setIsMenuOpen(false)}
            >
              {t.header.nav.author}
            </Link>
            <Link 
              href="/contact" 
              className="text-white/90 hover:text-white transition-colors text-base font-light"
              onClick={() => setIsMenuOpen(false)}
            >
              {t.header.nav.contacts}
            </Link>
            
            {/* Language Switcher Mobile */}
            <div className="flex items-center gap-2 pt-2 border-t border-white/10">
              <button
                onClick={() => setLanguage('ru')}
                className={`text-sm font-light transition-colors ${
                  language === 'ru' ? 'text-white' : 'text-white/50'
                }`}
              >
                RU
              </button>
              <span className="text-white/50">|</span>
              <button
                onClick={() => setLanguage('en')}
                className={`text-sm font-light transition-colors ${
                  language === 'en' ? 'text-white' : 'text-white/50'
                }`}
              >
                EN
              </button>
            </div>
          </div>
        </nav>
      )}
    </header>
  );
}
