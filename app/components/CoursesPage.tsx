'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useLanguage } from '../context/LanguageContext';

export default function CoursesPage() {
  const { t, language } = useLanguage();
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [selectedTime, setSelectedTime] = useState<string>('');
  const [selectedService, setSelectedService] = useState<string>('');
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [paymentForm, setPaymentForm] = useState({ name: '', email: '', phone: '' });
  const [paymentLoading, setPaymentLoading] = useState(false);
  const [paymentError, setPaymentError] = useState('');
  
  // Занятые времена из Google Calendar
  const [busyTimes, setBusyTimes] = useState<string[]>([]);
  const [loadingTimes, setLoadingTimes] = useState(false);

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

  const availableTimes = [
    '09:00', '09:30', '10:00', '10:30', '11:00', '11:30',
    '12:00', '12:30', '13:00', '13:30', '14:00', '14:30',
    '15:00', '15:30', '16:00', '16:30', '17:00', '17:30',
    '18:00', '18:30', '19:00', '19:30', '20:00', '20:30', '21:00'
  ];

  const services = [
    { id: 'group', name: t.coursesPage?.groupTitle || 'Group Yoga Classes' },
    { id: 'private', name: t.coursesPage?.privateTitle || '1:1 Yoga Classes' },
    { id: 'coaching', name: t.coursesPage?.coachingTitle || 'Vedic Psychology' },
    { id: 'training', name: t.coursesPage?.trainingTitle || 'Physical Training' },
  ];

  // Загружаем занятые времена при выборе даты
  useEffect(() => {
    if (selectedDate) {
      fetchBusyTimes(selectedDate);
    }
  }, [selectedDate]);

  const fetchBusyTimes = async (date: Date) => {
    setLoadingTimes(true);
    try {
      // Форматируем дату локально, чтобы избежать проблем с часовым поясом
      const year = date.getFullYear();
      const month = String(date.getMonth() + 1).padStart(2, '0');
      const day = String(date.getDate()).padStart(2, '0');
      const dateStr = `${year}-${month}-${day}`;
      
      console.log('Fetching busy times for:', dateStr);
      const response = await fetch(`/api/calendar?date=${dateStr}`);
      const data = await response.json();
      console.log('Busy times response:', data);
      
      if (data.success && data.busyTimes) {
        console.log('Setting busy times:', data.busyTimes);
        setBusyTimes(data.busyTimes);
      } else {
        setBusyTimes([]);
      }
    } catch (error) {
      console.error('Error fetching busy times:', error);
      setBusyTimes([]);
    } finally {
      setLoadingTimes(false);
    }
  };

  // Проверяем, занято ли время
  const isTimeBusy = (time: string): boolean => {
    const isBusy = busyTimes.includes(time);
    if (isBusy) console.log('Time is busy:', time);
    return isBusy;
  };

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
    setSelectedTime(''); // Сбрасываем выбранное время при смене даты
  };

  const handleBooking = () => {
    if (selectedDate && selectedTime && selectedService) {
      setShowPaymentModal(true);
    }
  };

  const getServicePrice = () => {
    // Пакети для групових занять
    if (selectedService === 'group') {
      return 25; // 1 заняття
    }
    // Індивідуальні заняття
    if (selectedService === 'private') {
      return 70; // 1 заняття
    }
    // Ведична психологія
    if (selectedService === 'coaching') {
      return 80; // 1 сесія
    }
    // Фізичні тренування
    if (selectedService === 'training') {
      return 50; // 1 тренування
    }
    return 25; // За замовчуванням
  };

  const handlePaymentSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setPaymentLoading(true);
    setPaymentError('');

    try {
      const serviceName = services.find(s => s.id === selectedService)?.name || '';
      const price = getServicePrice();

      const response = await fetch('/api/fondy/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          clientName: paymentForm.name,
          clientEmail: paymentForm.email,
          clientPhone: paymentForm.phone,
          amount: price,
          currency: 'EUR',
          description: `${serviceName} - ${selectedDate?.toLocaleDateString()} ${selectedTime}`,
          metadata: {
            serviceType: 'class',
            serviceId: selectedService,
            serviceName,
            date: selectedDate?.toISOString(),
            time: selectedTime,
          }
        })
      });

      if (!response.ok) throw new Error('Payment failed');

      const data = await response.json();
      
      // Редирект на Fondy для оплати
      window.location.href = data.data.checkoutUrl;
    } catch (error) {
      console.error('Payment error:', error);
      setPaymentError(language === 'ru'
        ? 'Ошибка при создании платежа. Попробуйте снова.' 
        : 'Payment creation failed. Please try again.');
      setPaymentLoading(false);
    }
  };

  return (
    <div className="bg-[#e8e6e0]">
      {/* Hero Section */}
      <section className="relative w-full h-[50vh] sm:h-[60vh] lg:h-[70vh] overflow-hidden">
        <Image
          src="/images/curse/IMG_6154.JPG"
          alt="Yoga classes"
          fill
          className="object-cover brightness-50"
        />
        
        <div className="absolute inset-0 bg-gradient-to-b from-black/50 to-black/30" />
        
        <div className="relative z-10 container mx-auto px-4 sm:px-6 h-full flex items-center">
          <div className="max-w-4xl">
            <div className="flex items-center gap-3 mb-4 sm:mb-6">
              <div className="w-10 sm:w-16 h-px bg-[#c9b896]" />
              <span className="text-[10px] sm:text-xs uppercase tracking-[0.2em] sm:tracking-[0.4em] text-white/60">
                {t.coursesPage?.subtitle}
              </span>
            </div>
            <h1 className="text-4xl sm:text-6xl lg:text-8xl font-light text-white mb-4 sm:mb-8 leading-tight">
              {t.coursesPage?.title}
            </h1>
            <p className="text-sm sm:text-lg lg:text-xl text-white/80 font-light leading-relaxed max-w-2xl">
              {t.coursesPage?.description}
            </p>
          </div>
        </div>
      </section>

      {/* Courses Grid */}
      <section className="py-12 sm:py-24 px-4 sm:px-6 relative">
        {/* Background Images */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none hidden lg:block">
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
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-12">
            {/* Group Classes */}
            <div className="group relative bg-white/20 backdrop-blur-sm border border-[#3a3a35]/10 p-6 sm:p-10 hover:border-[#c9b896] transition-all duration-300">
              <div className="absolute top-0 left-0 w-2 h-full bg-[#c9b896] transform scale-y-0 group-hover:scale-y-100 transition-transform origin-top" />
              
              <div className="flex items-start justify-between mb-4 sm:mb-6">
                <div>
                  <span className="text-xs sm:text-sm uppercase tracking-wider text-[#3a3a35]/50 mb-2 block">{t.coursesPage?.groupTag}</span>
                  <h3 className="text-2xl sm:text-3xl font-light text-[#3a3a35]">{t.coursesPage?.groupTitle}</h3>
                </div>
                <div className="w-10 h-10 sm:w-14 sm:h-14 rounded-full border-2 border-[#c9b896] flex items-center justify-center group-hover:bg-[#c9b896] transition-colors">
                  <svg className="w-5 h-5 sm:w-6 sm:h-6 text-[#3a3a35]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                </div>
              </div>

              <p className="text-sm sm:text-base text-[#3a3a35]/70 font-light leading-relaxed mb-4 sm:mb-6">
                {t.coursesPage?.groupDescription}
              </p>

              <div className="border-t border-[#3a3a35]/10 pt-4 sm:pt-6 space-y-2 sm:space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-xs sm:text-sm text-[#3a3a35]/60">1 {t.coursesPage?.groupSession}</span>
                  <span className="text-base sm:text-lg font-light text-[#3a3a35]">€25</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-xs sm:text-sm text-[#3a3a35]/60">4 {t.coursesPage?.groupSessions4}</span>
                  <span className="text-base sm:text-lg font-light text-[#3a3a35]">€80</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-xs sm:text-sm text-[#3a3a35]/60">8 {t.coursesPage?.groupSessions8}</span>
                  <span className="text-base sm:text-lg font-light text-[#3a3a35]">€130</span>
                </div>
              </div>

              <div className="mt-4 sm:mt-6 pt-4 sm:pt-6 border-t border-[#3a3a35]/10">
                <p className="text-xs sm:text-sm text-[#3a3a35]/60 whitespace-pre-line">
                  {t.coursesPage?.groupSchedule}
                </p>
              </div>
            </div>

            {/* Private Classes */}
            <div className="group relative bg-white/20 backdrop-blur-sm border border-[#3a3a35]/10 p-6 sm:p-10 hover:border-[#c9b896] transition-all duration-300">
              <div className="absolute top-0 left-0 w-2 h-full bg-[#c9b896] transform scale-y-0 group-hover:scale-y-100 transition-transform origin-top" />
              
              <div className="flex items-start justify-between mb-4 sm:mb-6">
                <div>
                  <span className="text-xs sm:text-sm uppercase tracking-wider text-[#3a3a35]/50 mb-2 block">{t.coursesPage?.privateTag}</span>
                  <h3 className="text-2xl sm:text-3xl font-light text-[#3a3a35]">{t.coursesPage?.privateTitle}</h3>
                </div>
                <div className="w-10 h-10 sm:w-14 sm:h-14 rounded-full border-2 border-[#c9b896] flex items-center justify-center group-hover:bg-[#c9b896] transition-colors">
                  <svg className="w-5 h-5 sm:w-6 sm:h-6 text-[#3a3a35]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                </div>
              </div>

              <p className="text-sm sm:text-base text-[#3a3a35]/70 font-light leading-relaxed mb-4 sm:mb-6">
                {t.coursesPage?.privateDescription}
              </p>

              <div className="border-t border-[#3a3a35]/10 pt-4 sm:pt-6">
                <div className="flex justify-between items-center">
                  <span className="text-xs sm:text-sm text-[#3a3a35]/60">{t.coursesPage?.privateSession}</span>
                  <span className="text-xl sm:text-2xl font-light text-[#3a3a35]">€150</span>
                </div>
              </div>

              <div className="mt-4 sm:mt-6 pt-4 sm:pt-6 border-t border-[#3a3a35]/10">
                <p className="text-xs sm:text-sm text-[#3a3a35]/60 whitespace-pre-line">
                  {t.coursesPage?.privateDetails}
                </p>
              </div>
            </div>

            {/* Vedic Coaching */}
            <div className="group relative bg-white/20 backdrop-blur-sm border border-[#3a3a35]/10 p-6 sm:p-10 hover:border-[#c9b896] transition-all duration-300">
              <div className="absolute top-0 left-0 w-2 h-full bg-[#c9b896] transform scale-y-0 group-hover:scale-y-100 transition-transform origin-top" />
              
              <div className="flex items-start justify-between mb-4 sm:mb-6">
                <div>
                  <span className="text-xs sm:text-sm uppercase tracking-wider text-[#3a3a35]/50 mb-2 block">{t.coursesPage?.coachingTag}</span>
                  <h3 className="text-2xl sm:text-3xl font-light text-[#3a3a35]">{t.coursesPage?.coachingTitle}</h3>
                </div>
                <div className="w-10 h-10 sm:w-14 sm:h-14 rounded-full border-2 border-[#c9b896] flex items-center justify-center group-hover:bg-[#c9b896] transition-colors">
                  <svg className="w-5 h-5 sm:w-6 sm:h-6 text-[#3a3a35]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                  </svg>
                </div>
              </div>

              <p className="text-sm sm:text-base text-[#3a3a35]/70 font-light leading-relaxed mb-4 sm:mb-6">
                {t.coursesPage?.coachingDescription}
              </p>

              <div className="border-t border-[#3a3a35]/10 pt-4 sm:pt-6">
                <div className="flex justify-between items-center">
                  <span className="text-xs sm:text-sm text-[#3a3a35]/60">{t.coursesPage?.coachingSession}</span>
                  <span className="text-base sm:text-lg font-light text-[#3a3a35]">{t.coursesPage?.coachingPrice}</span>
                </div>
              </div>
            </div>

            {/* Physical Training */}
            <div className="group relative bg-white/20 backdrop-blur-sm border border-[#3a3a35]/10 p-6 sm:p-10 hover:border-[#c9b896] transition-all duration-300">
              <div className="absolute top-0 left-0 w-2 h-full bg-[#c9b896] transform scale-y-0 group-hover:scale-y-100 transition-transform origin-top" />
              
              <div className="flex items-start justify-between mb-4 sm:mb-6">
                <div>
                  <span className="text-xs sm:text-sm uppercase tracking-wider text-[#3a3a35]/50 mb-2 block">{t.coursesPage?.trainingTag}</span>
                  <h3 className="text-2xl sm:text-3xl font-light text-[#3a3a35]">{t.coursesPage?.trainingTitle}</h3>
                </div>
                <div className="w-10 h-10 sm:w-14 sm:h-14 rounded-full border-2 border-[#c9b896] flex items-center justify-center group-hover:bg-[#c9b896] transition-colors">
                  <svg className="w-5 h-5 sm:w-6 sm:h-6 text-[#3a3a35]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
              </div>

              <p className="text-sm sm:text-base text-[#3a3a35]/70 font-light leading-relaxed mb-4 sm:mb-6">
                {t.coursesPage?.trainingDescription}
              </p>

              <div className="border-t border-[#3a3a35]/10 pt-4 sm:pt-6">
                <div className="flex justify-between items-center">
                  <span className="text-xs sm:text-sm text-[#3a3a35]/60">{t.coursesPage?.trainingSession}</span>
                  <span className="text-base sm:text-lg font-light text-[#3a3a35]">{t.coursesPage?.trainingPrice}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Booking Calendar Section */}
      <section className="py-12 sm:py-24 px-4 sm:px-6 bg-gradient-to-br from-[#3a3a35] to-[#2a2a25]">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-8 sm:mb-12">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-light text-white mb-3 sm:mb-4">
              {t.coursesPage?.bookingTitle}
            </h2>
            <p className="text-sm sm:text-lg text-white/70 font-light">
              {t.coursesPage?.bookingSubtitle}
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-5 gap-6 sm:gap-8">
            {/* Calendar */}
            <div className="lg:col-span-3 bg-white/10 backdrop-blur-md border border-white/20 p-4 sm:p-8 rounded-xl sm:rounded-2xl">
              {/* Calendar Header */}
              <div className="flex items-center justify-between mb-6">
                <button
                  onClick={handlePrevMonth}
                  className="p-1.5 sm:p-2 hover:bg-white/10 rounded-lg transition-colors"
                >
                  <svg className="w-4 h-4 sm:w-5 sm:h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                  </svg>
                </button>
                <h3 className="text-base sm:text-xl font-light text-white">
                  {monthNames[currentMonth]} {currentYear}
                </h3>
                <button
                  onClick={handleNextMonth}
                  className="p-1.5 sm:p-2 hover:bg-white/10 rounded-lg transition-colors"
                >
                  <svg className="w-4 h-4 sm:w-5 sm:h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </button>
              </div>

              {/* Day Names */}
              <div className="grid grid-cols-7 gap-1 sm:gap-2 mb-2">
                {dayNames.map((day) => (
                  <div key={day} className="text-center text-[10px] sm:text-xs text-white/50 font-light uppercase tracking-wider py-1 sm:py-2">
                    {day}
                  </div>
                ))}
              </div>

              {/* Calendar Days */}
              <div className="grid grid-cols-7 gap-1 sm:gap-2">
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
                      className={`aspect-square flex items-center justify-center rounded-md sm:rounded-lg text-xs sm:text-sm font-light transition-all
                        ${isPast ? 'text-white/20 cursor-not-allowed' : 'text-white hover:bg-white/20 cursor-pointer'}
                        ${isToday ? 'ring-1 sm:ring-2 ring-[#c9b896]' : ''}
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
            <div className="lg:col-span-2 bg-white/10 backdrop-blur-md border border-white/20 p-4 sm:p-8 rounded-xl sm:rounded-2xl space-y-4 sm:space-y-6">
              {/* Service Selection */}
              <div>
                <h4 className="text-base sm:text-lg font-light text-white mb-3 sm:mb-4">{(t.coursesPage as any)?.selectService || 'Select Service'}</h4>
                <select
                  value={selectedService}
                  onChange={(e) => setSelectedService(e.target.value)}
                  className="w-full py-2.5 sm:py-3 px-3 sm:px-4 rounded-lg text-xs sm:text-sm font-light bg-white/5 text-white border border-white/20 focus:border-[#c9b896] focus:outline-none transition-all"
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
                <h4 className="text-base sm:text-lg font-light text-white mb-3 sm:mb-4">{t.coursesPage?.availableTimes}</h4>
                
                {selectedDate && selectedService ? (
                  <div className="space-y-2">
                    {loadingTimes ? (
                      <div className="flex items-center justify-center py-8">
                        <div className="w-6 h-6 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      </div>
                    ) : (
                      <>
                        <div className="max-h-[320px] overflow-y-auto space-y-2 pr-2 scrollbar-thin scrollbar-thumb-white/20 scrollbar-track-transparent">
                          {availableTimes.map((time) => {
                            const busy = isTimeBusy(time);
                            return (
                              <button
                                key={time}
                                onClick={() => !busy && setSelectedTime(time)}
                                disabled={busy}
                                className={`w-full py-2.5 sm:py-3 px-3 sm:px-4 rounded-lg text-xs sm:text-sm font-light transition-all relative
                                  ${busy 
                                    ? 'bg-red-500/20 text-red-300 cursor-not-allowed line-through' 
                                    : selectedTime === time 
                                      ? 'bg-[#c9b896] text-[#3a3a35]' 
                                      : 'bg-white/5 text-white hover:bg-white/10'
                                  }
                                `}
                              >
                                {time}
                                {busy && (
                                  <span className="absolute right-3 text-[10px] uppercase tracking-wider">
                                    {language === 'ru' ? 'Занято' : 'Booked'}
                                  </span>
                                )}
                              </button>
                            );
                          })}
                        </div>

                        {selectedTime && (
                          <button
                            onClick={handleBooking}
                            className="w-full mt-4 sm:mt-6 py-3 sm:py-4 bg-[#c9b896] text-[#3a3a35] rounded-lg text-sm font-light hover:bg-white transition-colors"
                          >
                            {(t.coursesPage as any)?.confirmBooking || 'Confirm Booking'}
                          </button>
                        )}
                      </>
                    )}
                  </div>
                ) : (
                  <p className="text-white/50 text-xs sm:text-sm font-light">
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
      <section className="py-12 sm:py-24 px-4 sm:px-6">
        <div className="max-w-4xl mx-auto text-center">
          <div className="bg-gradient-to-br from-white/40 to-white/20 backdrop-blur-sm border border-[#3a3a35]/10 p-6 sm:p-12 rounded-xl sm:rounded-2xl">
            <div className="w-12 h-12 sm:w-16 sm:h-16 rounded-full bg-[#c9b896]/20 flex items-center justify-center mx-auto mb-4 sm:mb-6">
              <svg className="w-6 h-6 sm:w-8 sm:h-8 text-[#3a3a35]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h3 className="text-2xl sm:text-3xl lg:text-4xl font-light text-[#3a3a35] mb-3 sm:mb-4">
              {t.coursesPage?.retreatsCtaTitle}
            </h3>
            <p className="text-sm sm:text-lg text-[#3a3a35]/70 font-light mb-6 sm:mb-8 max-w-2xl mx-auto">
              {t.coursesPage?.retreatsCtaDescription}
            </p>
            <Link
              href="/retreats"
              className="inline-flex items-center gap-2 sm:gap-3 px-6 sm:px-10 py-3 sm:py-4 bg-[#3a3a35] text-white hover:bg-[#c9b896] transition-all duration-300 font-light tracking-wider text-xs sm:text-sm"
            >
              {t.coursesPage?.retreatsCtaButton}
              <svg className="w-3 h-3 sm:w-4 sm:h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
          </div>
        </div>
      </section>

      {/* Payment Modal */}
      {showPaymentModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 sm:p-8 relative">
            <button
              onClick={() => setShowPaymentModal(false)}
              className="absolute top-4 right-4 text-[#3a3a35]/50 hover:text-[#3a3a35]"
            >
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            <h3 className="text-2xl font-light text-[#3a3a35] mb-6">
              {language === 'ru' ? 'Оплата занятия' : 'Payment'}
            </h3>

            <div className="mb-6 p-4 bg-[#e8e6e0] rounded-lg">
              <p className="text-sm text-[#3a3a35]/70 mb-2">
                {services.find(s => s.id === selectedService)?.name}
              </p>
              <p className="text-sm text-[#3a3a35]/70 mb-2">
                {selectedDate?.toLocaleDateString(language === 'ru' ? 'ru-RU' : 'en-US')} • {selectedTime}
              </p>
              <p className="text-2xl font-light text-[#3a3a35]">
                €{getServicePrice()}
              </p>
            </div>

            <form onSubmit={handlePaymentSubmit} className="space-y-4">
              <div>
                <label className="block text-sm text-[#3a3a35]/70 mb-2">
                  {language === 'ru' ? 'Имя' : 'Name'} *
                </label>
                <input
                  type="text"
                  required
                  value={paymentForm.name}
                  onChange={(e) => setPaymentForm({ ...paymentForm, name: e.target.value })}
                  className="w-full px-4 py-3 rounded-lg border border-[#3a3a35]/20 focus:border-[#c9b896] focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-sm text-[#3a3a35]/70 mb-2">
                  Email *
                </label>
                <input
                  type="email"
                  required
                  value={paymentForm.email}
                  onChange={(e) => setPaymentForm({ ...paymentForm, email: e.target.value })}
                  className="w-full px-4 py-3 rounded-lg border border-[#3a3a35]/20 focus:border-[#c9b896] focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-sm text-[#3a3a35]/70 mb-2">
                  {language === 'ru' ? 'Телефон' : 'Phone'}
                </label>
                <input
                  type="tel"
                  value={paymentForm.phone}
                  onChange={(e) => setPaymentForm({ ...paymentForm, phone: e.target.value })}
                  className="w-full px-4 py-3 rounded-lg border border-[#3a3a35]/20 focus:border-[#c9b896] focus:outline-none"
                />
              </div>

              {paymentError && (
                <div className="p-3 bg-red-50 border border-red-200 rounded-lg text-sm text-red-600">
                  {paymentError}
                </div>
              )}

              <button
                type="submit"
                disabled={paymentLoading}
                className="w-full py-4 bg-[#c9b896] text-[#3a3a35] rounded-lg font-light hover:bg-[#3a3a35] hover:text-white transition-colors disabled:opacity-50"
              >
                {paymentLoading 
                  ? (language === 'ru' ? 'Загрузка...' : 'Loading...') 
                  : (language === 'ru' ? 'Перейти к оплате' : 'Proceed to Payment')
                }
              </button>

              <p className="text-xs text-center text-[#3a3a35]/50">
                {language === 'ru' 
                  ? '🔒 Безопасная оплата через Fondy' 
                  : '🔒 Secure payment via Fondy'
                }
              </p>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
