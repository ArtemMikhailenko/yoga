'use client';

import { useState } from 'react';
import Image from 'next/image';
import { useLanguage } from '../context/LanguageContext';

export default function Contact() {
  const { t } = useLanguage();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission
    console.log('Form submitted:', formData);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <section className="relative w-full h-screen bg-[#e8e6e0] py-12 px-6 lg:px-20 flex items-center">
      {/* Decorative background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 right-20 w-96 h-96 bg-[#c9b896]/10 rounded-full blur-3xl" />
        <div className="absolute bottom-20 left-20 w-96 h-96 bg-[#c9b896]/10 rounded-full blur-3xl" />
      </div>

      <div className="max-w-7xl mx-auto relative z-10 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
          {/* Left Side - Contact Information */}
          <div className="lg:col-span-5 space-y-6">
            <div>
              <h2 className="text-4xl lg:text-5xl font-light text-[#3a3a35] mb-4 leading-tight">
                {t.contact.title}
              </h2>
              <p className="text-sm text-[#3a3a35]/60 font-light leading-relaxed">
                {t.contact.description}
              </p>
            </div>

            {/* Contact Cards */}
            <div className="space-y-4">
              {/* Phone Card */}
              <div className="group bg-white/60 backdrop-blur-sm border border-[#3a3a35]/10 p-4 hover:border-[#c9b896] transition-all duration-300">
                <div className="flex items-start gap-3">
                  <div className="flex-shrink-0 w-10 h-10 rounded-full bg-[#c9b896]/20 flex items-center justify-center group-hover:bg-[#c9b896]/30 transition-colors">
                    <svg className="w-5 h-5 text-[#3a3a35]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                  </div>
                  <div className="flex-1">
                    <h3 className="text-[10px] text-[#3a3a35]/50 font-light uppercase tracking-wider mb-1">
                      {t.contact.phoneLabel}
                    </h3>
                    <a
                      href="tel:+436776277095 4"
                      className="text-base text-[#3a3a35] hover:text-[#c9b896] transition-colors font-light block"
                    >
                      +43 677 62770954
                    </a>
                    <p className="text-[10px] text-[#3a3a35]/50 font-light mt-0.5">
                      {t.contact.whatsappOnly}
                    </p>
                  </div>
                </div>
              </div>

              {/* Email Card */}
              <div className="group bg-white/60 backdrop-blur-sm border border-[#3a3a35]/10 p-4 hover:border-[#c9b896] transition-all duration-300">
                <div className="flex items-start gap-3">
                  <div className="flex-shrink-0 w-10 h-10 rounded-full bg-[#c9b896]/20 flex items-center justify-center group-hover:bg-[#c9b896]/30 transition-colors">
                    <svg className="w-5 h-5 text-[#3a3a35]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <div className="flex-1">
                    <h3 className="text-[10px] text-[#3a3a35]/50 font-light uppercase tracking-wider mb-1">
                      Email
                    </h3>
                    <a
                      href="mailto:vladybookings@gmail.com"
                      className="text-base text-[#3a3a35] hover:text-[#c9b896] transition-colors font-light block break-all"
                    >
                      vladybookings@gmail.com
                    </a>
                  </div>
                </div>
              </div>

              {/* Social Media Card */}
              <div className="group bg-white/60 backdrop-blur-sm border border-[#3a3a35]/10 p-4 hover:border-[#c9b896] transition-all duration-300">
                <div className="flex items-start gap-3">
                  <div className="flex-shrink-0 w-10 h-10 rounded-full bg-[#c9b896]/20 flex items-center justify-center group-hover:bg-[#c9b896]/30 transition-colors">
                    <svg className="w-5 h-5 text-[#3a3a35]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 8h2a2 2 0 012 2v6a2 2 0 01-2 2h-2v4l-4-4H9a1.994 1.994 0 01-1.414-.586m0 0L11 14h4a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2v4l.586-.586z" />
                    </svg>
                  </div>
                  <div className="flex-1">
                    <h3 className="text-[10px] text-[#3a3a35]/50 font-light uppercase tracking-wider mb-1">
                      {t.contact.social}
                    </h3>
                    <div className="space-y-0.5">
                      <a
                        href="https://t.me/yoga_with_vlady"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-sm text-[#3a3a35] hover:text-[#c9b896] transition-colors font-light block"
                      >
                        Telegram: @yoga_with_vlady
                      </a>
                      <a
                        href="https://instagram.com/yoga_s_vladislavom"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-sm text-[#3a3a35] hover:text-[#c9b896] transition-colors font-light block"
                      >
                        Instagram: @yoga_s_vladislavom
                      </a>
                      <a
                        href="https://instagram.com/vlady_yoga"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-sm text-[#3a3a35] hover:text-[#c9b896] transition-colors font-light block"
                      >
                        Instagram: @vlady_yoga
                      </a>
                    </div>
                  </div>
                </div>
              </div>

              {/* Address Card */}
              <div className="group bg-white/60 backdrop-blur-sm border border-[#3a3a35]/10 p-4 hover:border-[#c9b896] transition-all duration-300">
                <div className="flex items-start gap-3">
                  <div className="flex-shrink-0 w-10 h-10 rounded-full bg-[#c9b896]/20 flex items-center justify-center group-hover:bg-[#c9b896]/30 transition-colors">
                    <svg className="w-5 h-5 text-[#3a3a35]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                  </div>
                  <div className="flex-1">
                    <h3 className="text-[10px] text-[#3a3a35]/50 font-light uppercase tracking-wider mb-1">
                      {t.contact.addressLabel}
                    </h3>
                    <p className="text-base text-[#3a3a35] font-light leading-relaxed">
                      Pfeilgasse 14, 1080,<br />
                      Vienna, Austria
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Side - Contact Form */}
          <div className="lg:col-span-7">
            <div className="relative bg-gradient-to-br from-white/70 to-white/50 backdrop-blur-sm border border-[#3a3a35]/10 p-6 lg:p-8 overflow-hidden">
              {/* Background Image */}
              <div className="absolute inset-0 opacity-5">
                <Image
                  src="/images/form.jpg"
                  alt=""
                  fill
                  className="object-cover"
                />
              </div>

              {/* Form Content */}
              <div className="relative z-10">
                <h3 className="text-2xl lg:text-3xl font-light text-[#3a3a35] mb-2">
                  {t.contact.formTitle}
                </h3>
                <p className="text-xs text-[#3a3a35]/60 font-light mb-5">
                  Fill out the form and we'll get back to you soon
                </p>

                <form onSubmit={handleSubmit} className="space-y-3">
                  {/* Name */}
                  <div className="group">
                    <label
                      htmlFor="name"
                      className="block text-[10px] text-[#3a3a35]/70 font-light mb-1.5 uppercase tracking-wider"
                    >
                      {t.contact.nameLabel} *
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-2.5 bg-white/80 backdrop-blur-sm border border-[#3a3a35]/20 text-[#3a3a35] font-light focus:outline-none focus:border-[#c9b896] focus:bg-white transition-all"
                      placeholder={t.contact.namePlaceholder}
                    />
                  </div>

                  {/* Email */}
                  <div className="group">
                    <label
                      htmlFor="email"
                      className="block text-[10px] text-[#3a3a35]/70 font-light mb-1.5 uppercase tracking-wider"
                    >
                      Email *
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-2.5 bg-white/80 backdrop-blur-sm border border-[#3a3a35]/20 text-[#3a3a35] font-light focus:outline-none focus:border-[#c9b896] focus:bg-white transition-all"
                      placeholder={t.contact.emailPlaceholder}
                    />
                  </div>

                  {/* Phone */}
                  <div className="group">
                    <label
                      htmlFor="phone"
                      className="block text-[10px] text-[#3a3a35]/70 font-light mb-1.5 uppercase tracking-wider"
                    >
                      {t.contact.phoneLabel}
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      className="w-full px-4 py-2.5 bg-white/80 backdrop-blur-sm border border-[#3a3a35]/20 text-[#3a3a35] font-light focus:outline-none focus:border-[#c9b896] focus:bg-white transition-all"
                      placeholder={t.contact.phonePlaceholder}
                    />
                  </div>

                  {/* Message */}
                  <div className="group">
                    <label
                      htmlFor="message"
                      className="block text-[10px] text-[#3a3a35]/70 font-light mb-1.5 uppercase tracking-wider"
                    >
                      {t.contact.messageLabel} *
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      required
                      rows={3}
                      className="w-full px-4 py-2.5 bg-white/80 backdrop-blur-sm border border-[#3a3a35]/20 text-[#3a3a35] font-light focus:outline-none focus:border-[#c9b896] focus:bg-white transition-all resize-none"
                      placeholder={t.contact.messagePlaceholder}
                    />
                  </div>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    className="w-full py-3 bg-[#3a3a35] text-white font-light text-sm tracking-wide hover:bg-[#c9b896] transition-all duration-300 group relative overflow-hidden"
                  >
                    <span className="relative z-10">{t.contact.submitButton}</span>
                    <div className="absolute inset-0 bg-[#c9b896] transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-300" />
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
