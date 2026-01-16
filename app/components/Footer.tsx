'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useLanguage } from '../context/LanguageContext';

export default function Footer() {
  const { t } = useLanguage();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="relative w-full bg-[#e8e6e0] border-t border-[#3a3a35]/10">
      <div className="max-w-7xl mx-auto px-6 lg:px-20 py-12 lg:py-16">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 lg:gap-16">
          {/* Left - Logo and Copyright */}
          <div className="md:col-span-2">
            <div className="mb-6">
              <Image
                src="images/logo.svg"
                alt="YC Logo"
                width={90}
                height={90}
                className=""
              />
            </div>
            <p className="text-sm text-[#3a3a35]/50 font-light">
              © {new Date().getFullYear()}
            </p>
          </div>

          {/* Center - Links Grid */}
          <div className="md:col-span-8 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-8 lg:gap-12">
            {/* Column 1 */}
            <div>
              <ul className="space-y-3">
                <li>
                  <Link
                    href="#about"
                    className="text-sm text-[#3a3a35]/70 hover:text-[#3a3a35] transition-colors font-light"
                  >
                    {t.footer.about}
                  </Link>
                </li>
                <li>
                  <Link
                    href="#results"
                    className="text-sm text-[#3a3a35]/70 hover:text-[#3a3a35] transition-colors font-light"
                  >
                    {t.footer.results}
                  </Link>
                </li>
                <li>
                  <Link
                    href="#program"
                    className="text-sm text-[#3a3a35]/70 hover:text-[#3a3a35] transition-colors font-light"
                  >
                    {t.footer.program}
                  </Link>
                </li>
                <li>
                  <Link
                    href="#format"
                    className="text-sm text-[#3a3a35]/70 hover:text-[#3a3a35] transition-colors font-light"
                  >
                    {t.footer.format}
                  </Link>
                </li>
              </ul>
            </div>

            {/* Column 2 */}
            <div>
              <ul className="space-y-3">
                <li>
                  <Link
                    href="#author"
                    className="text-sm text-[#3a3a35]/70 hover:text-[#3a3a35] transition-colors font-light"
                  >
                    {t.footer.author}
                  </Link>
                </li>
                <li>
                  <Link
                    href="#pricing"
                    className="text-sm text-[#3a3a35]/70 hover:text-[#3a3a35] transition-colors font-light"
                  >
                    {t.footer.pricing}
                  </Link>
                </li>
                <li>
                  <Link
                    href="#reviews"
                    className="text-sm text-[#3a3a35]/70 hover:text-[#3a3a35] transition-colors font-light"
                  >
                    {t.footer.reviews}
                  </Link>
                </li>
                <li>
                  <Link
                    href="#contacts"
                    className="text-sm text-[#3a3a35]/70 hover:text-[#3a3a35] transition-colors font-light"
                  >
                    {t.footer.contacts}
                  </Link>
                </li>
              </ul>
            </div>

            {/* Column 3 - Contacts */}
            <div>
              <ul className="space-y-3">
                <li>
                  <a
                    href="tel:+436776277095 4"
                    className="text-sm text-[#3a3a35]/70 hover:text-[#3a3a35] transition-colors font-light"
                  >
                    {t.footer.phone}
                  </a>
                </li>
                <li>
                  <a
                    href="mailto:vladybookings@gmail.com"
                    className="text-sm text-[#3a3a35]/70 hover:text-[#3a3a35] transition-colors font-light"
                  >
                    {t.footer.email}
                  </a>
                </li>
                <li>
                  <a
                    href="https://t.me/yoga_with_vlady"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-[#3a3a35]/70 hover:text-[#3a3a35] transition-colors font-light"
                  >
                    {t.footer.telegram}
                  </a>
                </li>
                <li>
                  <a
                    href="https://instagram.com/yoga_s_vladislavom"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-[#3a3a35]/70 hover:text-[#3a3a35] transition-colors font-light"
                  >
                    {t.footer.instagram}
                  </a>
                </li>
              </ul>
            </div>

            {/* Column 4 - Legal */}
            <div>
              <ul className="space-y-3">
                <li>
                  <Link
                    href="/privacy"
                    className="text-sm text-[#3a3a35]/70 hover:text-[#3a3a35] transition-colors font-light"
                  >
                    {t.footer.privacy}
                  </Link>
                </li>
                <li>
                  <Link
                    href="/legal"
                    className="text-sm text-[#3a3a35]/70 hover:text-[#3a3a35] transition-colors font-light"
                  >
                    {t.footer.legal}
                  </Link>
                </li>
                <li>
                  <p className="text-sm text-[#3a3a35]/50 font-light">
                    {t.footer.design}
                  </p>
                </li>
              </ul>
            </div>
          </div>

          {/* Right - Scroll to Top Button */}
          <div className="md:col-span-2 flex md:justify-end">
            <button
              onClick={scrollToTop}
              className="w-14 h-14 lg:w-16 lg:h-16 rounded-full bg-[#5c5c54] flex items-center justify-center hover:bg-[#4a4a44] transition-colors duration-300 group"
              aria-label="Scroll to top"
            >
              <svg
                className="w-6 h-6 text-white group-hover:translate-y-[-2px] transition-transform duration-300"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path d="M12 19V5M5 12l7-7 7 7" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}
