'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useLanguage } from '../context/LanguageContext';

export default function CoursesPage() {
  const { t } = useLanguage();
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [selectedTime, setSelectedTime] = useState<string>('');
  const [selectedService, setSelectedService] = useState<string>('');

  // Calendar logic
  const today = new Date();
  const [currentMonth, setCurrentMonth] = useState(today.getMonth());
  const [currentYear, setCurrentYear] = useState(today.getFullYear());

  const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
  const firstDayOfMonth = new Date(currentYear, currentMonth, 1).getDay();
  const adjustedFirstDay = firstDayOfMonth === 0 ? 6 : firstDayOfMonth - 1;

  const monthNames = t.coursesPage?.monthNames || [
    'January', 'February', 'March', 'April', 'May', 'June', 
    'July', 'August', 'September', 'October', 'November', 'December'
  ];
  const dayNames = t.coursesPage?.dayNames || ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

  const availableTimes = ['09:00', '10:30', '12:00', '17:00', '18:30', '20:00'];

  const services = [
    { id: 'group', name: t.coursesPage?.groupTitle || 'Group Yoga Classes' },
    { id: 'private', name: t.coursesPage?.privateTitle || '1:1 Yoga Classes' },
    { id: 'coaching', name: t.coursesPage?.coachingTitle || 'Vedic Psychology' },
    { id: 'training', name: t.coursesPage?.trainingTitle || 'Physical Training' },
  ];

  const handlePrevMonth = () => {
    if (currentMonth === 0) {
      setCurrentMonth(11);
      setCurrentYear(currentYear - 1);
    } else {
      setCurrentMonth(currentMonth - 1);
    }
  };

  const handleNextMonth = () => {
    if (currentMonth === 11) {
      setCurrentMonth(0);
      setCurrentYear(currentYear + 1);
    } else {
      setCurrentMonth(currentMonth + 1);
    }
  };

  const handleDateClick = (day: number) => {
    const selected = new Date(currentYear, currentMonth, day);
    setSelectedDate(selected);
  };

  const createGoogleCalendarLink = () => {
    if (!selectedDate || !selectedTime || !selectedService) return '';

    const [hours, minutes] = selectedTime.split(':');
    const startDateTime = new Date(selectedDate);
    startDateTime.setHours(parseInt(hours), parseInt(minutes), 0);
    
    const endDateTime = new Date(startDateTime);
    endDateTime.setHours(startDateTime.getHours() + 1); // 1 hour duration

    const formatDateTime = (date: Date) => {
      return date.toISOString().replace(/[-:]/g, '').split('.')[0] + 'Z';
    };

    const serviceName = services.find(s => s.id === selectedService)?.name || '';
    const title = encodeURIComponent(`${serviceName} - Yoga with Vladyslav`);
    const details = encodeURIComponent(`Yoga session: ${serviceName}\nTeacher: Vladyslav Changeliya\nLocation: Pfeilgasse 14, 1080, Vienna, Austria\nContact: +43 677 62770954`);
    const location = encodeURIComponent('Pfeilgasse 14, 1080, Vienna, Austria');

    const startTime = formatDateTime(startDateTime);
    const endTime = formatDateTime(endDateTime);

    return `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${title}&dates=${startTime}/${endTime}&details=${details}&location=${location}`;
  };

  const handleBooking = () => {
    if (selectedDate && selectedTime && selectedService) {
      const calendarLink = createGoogleCalendarLink();
      window.open(calendarLink, '_blank');
    }
  };

  return (
    <div className="bg-[#e8e6e0]">
      {/* Hero Section */}
      <section className="relative w-full h-[70vh] overflow-hidden">
        <Image
          src="/images/curse/IMG_6154.JPG"
          alt="Yoga classes"
          fill
          className="object-cover brightness-50"
        />
        
        <div className="absolute inset-0 bg-gradient-to-b from-black/50 to-black/30" />
        
        <div className="relative z-10 container mx-auto px-6 h-full flex items-center">
          <div className="max-w-4xl">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-16 h-px bg-[#c9b896]" />
              <span className="text-xs uppercase tracking-[0.4em] text-white/60">
                {t.coursesPage?.subtitle}
              </span>
            </div>
            <h1 className="text-6xl lg:text-8xl font-light text-white mb-8 leading-tight">
              {t.coursesPage?.title}
            </h1>
            <p className="text-xl text-white/80 font-light leading-relaxed max-w-2xl">
              {t.coursesPage?.description}
            </p>
          </div>
        </div>
      </section>

      {/* Courses Grid */}
      <section className="py-24 px-6 relative">
        {/* Background Images */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-0 right-0 w-[40%] h-[500px] opacity-80">
            <Image
              src="/images/curse/IMG_6145.JPG"
              alt=""
              fill
              className="object-cover"
            />
          </div>
          <div className="absolute bottom-0 left-0 w-[40%] h-[500px] opacity-80">
            <Image
              src="/images/curse/IMG_6150.JPG"
              alt=""
              fill
              className="object-cover"
            />
          </div>
        </div>

        <div className="max-w-7xl mx-auto relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Group Classes */}
            <div className="group relative bg-white/20 backdrop-blur-sm border border-[#3a3a35]/10 p-10 hover:border-[#c9b896] transition-all duration-300">
              <div className="absolute top-0 left-0 w-2 h-full bg-[#c9b896] transform scale-y-0 group-hover:scale-y-100 transition-transform origin-top" />
              
              <div className="flex items-start justify-between mb-6">
                <div>
                  <span className="text-sm uppercase tracking-wider text-[#3a3a35]/50 mb-2 block">{t.coursesPage?.groupTag}</span>
                  <h3 className="text-3xl font-light text-[#3a3a35]">{t.coursesPage?.groupTitle}</h3>
                </div>
                <div className="w-14 h-14 rounded-full border-2 border-[#c9b896] flex items-center justify-center group-hover:bg-[#c9b896] transition-colors">
                  <svg className="w-6 h-6 text-[#3a3a35]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                </div>
              </div>

              <p className="text-base text-[#3a3a35]/70 font-light leading-relaxed mb-6">
                {t.coursesPage?.groupDescription}
              </p>

              <div className="border-t border-[#3a3a35]/10 pt-6 space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-[#3a3a35]/60">1 {t.coursesPage?.groupSession}</span>
                  <span className="text-lg font-light text-[#3a3a35]">€25</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-[#3a3a35]/60">4 {t.coursesPage?.groupSessions4}</span>
                  <span className="text-lg font-light text-[#3a3a35]">€80</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-[#3a3a35]/60">8 {t.coursesPage?.groupSessions8}</span>
                  <span className="text-lg font-light text-[#3a3a35]">€130</span>
                </div>
              </div>

              <div className="mt-6 pt-6 border-t border-[#3a3a35]/10">
                <p className="text-sm text-[#3a3a35]/60 whitespace-pre-line">
                  {t.coursesPage?.groupSchedule}
                </p>
              </div>
            </div>

            {/* Private Classes */}
            <div className="group relative bg-white/20 backdrop-blur-sm border border-[#3a3a35]/10 p-10 hover:border-[#c9b896] transition-all duration-300">
              <div className="absolute top-0 left-0 w-2 h-full bg-[#c9b896] transform scale-y-0 group-hover:scale-y-100 transition-transform origin-top" />
              
              <div className="flex items-start justify-between mb-6">
                <div>
                  <span className="text-sm uppercase tracking-wider text-[#3a3a35]/50 mb-2 block">{t.coursesPage?.privateTag}</span>
                  <h3 className="text-3xl font-light text-[#3a3a35]">{t.coursesPage?.privateTitle}</h3>
                </div>
                <div className="w-14 h-14 rounded-full border-2 border-[#c9b896] flex items-center justify-center group-hover:bg-[#c9b896] transition-colors">
                  <svg className="w-6 h-6 text-[#3a3a35]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                </div>
              </div>

              <p className="text-base text-[#3a3a35]/70 font-light leading-relaxed mb-6">
                {t.coursesPage?.privateDescription}
              </p>

              <div className="border-t border-[#3a3a35]/10 pt-6">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-[#3a3a35]/60">{t.coursesPage?.privateSession}</span>
                  <span className="text-2xl font-light text-[#3a3a35]">€150</span>
                </div>
              </div>

              <div className="mt-6 pt-6 border-t border-[#3a3a35]/10">
                <p className="text-sm text-[#3a3a35]/60 whitespace-pre-line">
                  {t.coursesPage?.privateDetails}
                </p>
              </div>
            </div>

            {/* Vedic Coaching */}
            <div className="group relative bg-white/20 backdrop-blur-sm border border-[#3a3a35]/10 p-10 hover:border-[#c9b896] transition-all duration-300">
              <div className="absolute top-0 left-0 w-2 h-full bg-[#c9b896] transform scale-y-0 group-hover:scale-y-100 transition-transform origin-top" />
              
              <div className="flex items-start justify-between mb-6">
                <div>
                  <span className="text-sm uppercase tracking-wider text-[#3a3a35]/50 mb-2 block">{t.coursesPage?.coachingTag}</span>
                  <h3 className="text-3xl font-light text-[#3a3a35]">{t.coursesPage?.coachingTitle}</h3>
                </div>
                <div className="w-14 h-14 rounded-full border-2 border-[#c9b896] flex items-center justify-center group-hover:bg-[#c9b896] transition-colors">
                  <svg className="w-6 h-6 text-[#3a3a35]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                  </svg>
                </div>
              </div>

              <p className="text-base text-[#3a3a35]/70 font-light leading-relaxed mb-6">
                {t.coursesPage?.coachingDescription}
              </p>

              <div className="border-t border-[#3a3a35]/10 pt-6">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-[#3a3a35]/60">{t.coursesPage?.coachingSession}</span>
                  <span className="text-lg font-light text-[#3a3a35]">{t.coursesPage?.coachingPrice}</span>
                </div>
              </div>
            </div>

            {/* Physical Training */}
            <div className="group relative bg-white/20 backdrop-blur-sm border border-[#3a3a35]/10 p-10 hover:border-[#c9b896] transition-all duration-300">
              <div className="absolute top-0 left-0 w-2 h-full bg-[#c9b896] transform scale-y-0 group-hover:scale-y-100 transition-transform origin-top" />
              
              <div className="flex items-start justify-between mb-6">
                <div>
                  <span className="text-sm uppercase tracking-wider text-[#3a3a35]/50 mb-2 block">{t.coursesPage?.trainingTag}</span>
                  <h3 className="text-3xl font-light text-[#3a3a35]">{t.coursesPage?.trainingTitle}</h3>
                </div>
                <div className="w-14 h-14 rounded-full border-2 border-[#c9b896] flex items-center justify-center group-hover:bg-[#c9b896] transition-colors">
                  <svg className="w-6 h-6 text-[#3a3a35]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
              </div>

              <p className="text-base text-[#3a3a35]/70 font-light leading-relaxed mb-6">
                {t.coursesPage?.trainingDescription}
              </p>

              <div className="border-t border-[#3a3a35]/10 pt-6">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-[#3a3a35]/60">{t.coursesPage?.trainingSession}</span>
                  <span className="text-lg font-light text-[#3a3a35]">{t.coursesPage?.trainingPrice}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Booking Calendar Section */}
      <section className="py-24 px-6 bg-gradient-to-br from-[#3a3a35] to-[#2a2a25]">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl lg:text-5xl font-light text-white mb-4">
              {t.coursesPage?.bookingTitle}
            </h2>
            <p className="text-lg text-white/70 font-light">
              {t.coursesPage?.bookingSubtitle}
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
            {/* Calendar */}
            <div className="lg:col-span-3 bg-white/10 backdrop-blur-md border border-white/20 p-8 rounded-2xl">
              {/* Calendar Header */}
              <div className="flex items-center justify-between mb-6">
                <button
                  onClick={handlePrevMonth}
                  className="p-2 hover:bg-white/10 rounded-lg transition-colors"
                >
                  <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                  </svg>
                </button>
                <h3 className="text-xl font-light text-white">
                  {monthNames[currentMonth]} {currentYear}
                </h3>
                <button
                  onClick={handleNextMonth}
                  className="p-2 hover:bg-white/10 rounded-lg transition-colors"
                >
                  <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </button>
              </div>

              {/* Day Names */}
              <div className="grid grid-cols-7 gap-2 mb-2">
                {dayNames.map((day) => (
                  <div key={day} className="text-center text-xs text-white/50 font-light uppercase tracking-wider py-2">
                    {day}
                  </div>
                ))}
              </div>

              {/* Calendar Days */}
              <div className="grid grid-cols-7 gap-2">
                {Array.from({ length: adjustedFirstDay }).map((_, index) => (
                  <div key={`empty-${index}`} className="aspect-square" />
                ))}
                {Array.from({ length: daysInMonth }).map((_, index) => {
                  const day = index + 1;
                  const date = new Date(currentYear, currentMonth, day);
                  const isToday = date.toDateString() === today.toDateString();
                  const isSelected = selectedDate?.toDateString() === date.toDateString();
                  const isPast = date < today && !isToday;

                  return (
                    <button
                      key={day}
                      onClick={() => !isPast && handleDateClick(day)}
                      disabled={isPast}
                      className={`aspect-square flex items-center justify-center rounded-lg text-sm font-light transition-all
                        ${isPast ? 'text-white/20 cursor-not-allowed' : 'text-white hover:bg-white/20 cursor-pointer'}
                        ${isToday ? 'ring-2 ring-[#c9b896]' : ''}
                        ${isSelected ? 'bg-[#c9b896] text-[#3a3a35] font-normal' : ''}
                      `}
                    >
                      {day}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Service and Time Selection */}
            <div className="lg:col-span-2 bg-white/10 backdrop-blur-md border border-white/20 p-8 rounded-2xl space-y-6">
              {/* Service Selection */}
              <div>
                <h4 className="text-lg font-light text-white mb-4">{(t.coursesPage as any)?.selectService || 'Select Service'}</h4>
                <select
                  value={selectedService}
                  onChange={(e) => setSelectedService(e.target.value)}
                  className="w-full py-3 px-4 rounded-lg text-sm font-light bg-white/5 text-white border border-white/20 focus:border-[#c9b896] focus:outline-none transition-all"
                >
                  <option value="" className="bg-[#3a3a35]">{(t.coursesPage as any)?.chooseService || 'Choose service'}</option>
                  {services.map((service) => (
                    <option key={service.id} value={service.id} className="bg-[#3a3a35]">
                      {service.name}
                    </option>
                  ))}
                </select>
              </div>

              {/* Time Selection */}
              <div>
                <h4 className="text-lg font-light text-white mb-4">{t.coursesPage?.availableTimes}</h4>
                
                {selectedDate && selectedService ? (
                  <div className="space-y-2">
                    {availableTimes.map((time) => (
                      <button
                        key={time}
                        onClick={() => setSelectedTime(time)}
                        className={`w-full py-3 px-4 rounded-lg text-sm font-light transition-all
                          ${selectedTime === time 
                            ? 'bg-[#c9b896] text-[#3a3a35]' 
                            : 'bg-white/5 text-white hover:bg-white/10'
                          }
                        `}
                      >
                        {time}
                      </button>
                    ))}

                    {selectedTime && (
                      <button
                        onClick={handleBooking}
                        className="w-full mt-6 py-4 bg-[#c9b896] text-[#3a3a35] rounded-lg font-light hover:bg-white transition-colors"
                      >
                        {(t.coursesPage as any)?.confirmBooking || 'Confirm Booking'}
                      </button>
                    )}
                  </div>
                ) : (
                  <p className="text-white/50 text-sm font-light">
                    {!selectedDate && !selectedService 
                      ? (t.coursesPage as any)?.selectDateAndService || 'Select date and service'
                      : !selectedDate 
                        ? (t.coursesPage as any)?.selectDate || 'Please select a date first'
                        : (t.coursesPage as any)?.selectServiceFirst || 'Please select a service first'
                    }
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA to Retreats */}
      <section className="py-24 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <div className="bg-gradient-to-br from-white/40 to-white/20 backdrop-blur-sm border border-[#3a3a35]/10 p-12 rounded-2xl">
            <div className="w-16 h-16 rounded-full bg-[#c9b896]/20 flex items-center justify-center mx-auto mb-6">
              <svg className="w-8 h-8 text-[#3a3a35]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h3 className="text-3xl lg:text-4xl font-light text-[#3a3a35] mb-4">
              {t.coursesPage?.retreatsCtaTitle}
            </h3>
            <p className="text-lg text-[#3a3a35]/70 font-light mb-8 max-w-2xl mx-auto">
              {t.coursesPage?.retreatsCtaDescription}
            </p>
            <Link
              href="/retreats"
              className="inline-flex items-center gap-3 px-10 py-4 bg-[#3a3a35] text-white hover:bg-[#c9b896] transition-all duration-300 font-light tracking-wider text-sm"
            >
              {t.coursesPage?.retreatsCtaButton}
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
