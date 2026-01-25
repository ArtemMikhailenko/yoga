'use client';

import { useEffect, useState, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import Header from '@/app/components/Header';
import Footer from '@/app/components/Footer';
import { useLanguage } from '@/app/context/LanguageContext';

interface PaymentData {
  orderId: string;
  status: string;
  amount: number;
  currency: string;
  paidAt: string | null;
  clientName: string;
  clientEmail: string;
  metadata?: {
    calendarLink?: string;
    serviceType?: string;
    serviceName?: string;
    date?: string;
    time?: string;
  };
}

function PaymentSuccessContent() {
  const searchParams = useSearchParams();
  const orderId = searchParams.get('order_id');
  const { language } = useLanguage();
  
  const [loading, setLoading] = useState(true);
  const [payment, setPayment] = useState<PaymentData | null>(null);
  const [error, setError] = useState<string | null>(null);

  const texts = {
    ru: {
      loading: 'Проверка платежа...',
      success: 'Оплата успешна!',
      pending: 'Платёж обрабатывается',
      failed: 'Ошибка оплаты',
      thankYou: 'Спасибо за вашу оплату!',
      pendingMessage: 'Ваш платёж обрабатывается. Мы уведомим вас по email, когда оплата будет подтверждена.',
      failedMessage: 'К сожалению, платёж не прошёл. Пожалуйста, попробуйте еще раз или свяжитесь с нами.',
      orderNumber: 'Номер заказа',
      amount: 'Сумма',
      status: 'Статус',
      paidAt: 'Дата оплаты',
      email: 'Email',
      confirmationSent: 'Подтверждение отправлено на ваш email',
      backHome: 'На главную',
      backRetreats: 'К ретритам',
      contactUs: 'Связаться с нами',
      tryAgain: 'Попробовать снова',
      statusCompleted: 'Оплачено',
      statusPending: 'В обработке',
      statusFailed: 'Не оплачено',
      notFound: 'Платёж не найден',
      errorMessage: 'Не удалось найти информацию о платеже',
      addingToCalendar: 'Добавляем в Google Calendar...',
      addToCalendar: 'Добавить в Google Calendar',
      calendarAdded: 'Открывается Google Calendar для добавления события',
    },
    en: {
      loading: 'Checking payment...',
      success: 'Payment Successful!',
      pending: 'Payment Processing',
      failed: 'Payment Failed',
      thankYou: 'Thank you for your payment!',
      pendingMessage: 'Your payment is being processed. We will notify you by email when the payment is confirmed.',
      failedMessage: 'Unfortunately, the payment failed. Please try again or contact us.',
      orderNumber: 'Order Number',
      amount: 'Amount',
      status: 'Status',
      paidAt: 'Paid At',
      email: 'Email',
      confirmationSent: 'Confirmation sent to your email',
      backHome: 'Back to Home',
      backRetreats: 'Back to Retreats',
      contactUs: 'Contact Us',
      tryAgain: 'Try Again',
      statusCompleted: 'Paid',
      statusPending: 'Processing',
      statusFailed: 'Failed',
      notFound: 'Payment Not Found',
      errorMessage: 'Could not find payment information',
      addingToCalendar: 'Adding to Google Calendar...',
      addToCalendar: 'Add to Google Calendar',
      calendarAdded: 'Opening Google Calendar to add event',
    },
  };

  const t = texts[language as keyof typeof texts] || texts.en;

  useEffect(() => {
    if (orderId) {
      checkPaymentStatus();
    } else {
      setLoading(false);
      setError('No order ID provided');
    }
  }, [orderId]);

  // Auto-add to Google Calendar when payment is successful
  useEffect(() => {
    if (payment?.status === 'completed' && payment?.metadata?.calendarLink) {
      // Open Google Calendar in a new window after a short delay
      const timer = setTimeout(() => {
        if (payment.metadata?.calendarLink) {
          window.open(payment.metadata.calendarLink, '_blank');
        }
      }, 1500);
      
      return () => clearTimeout(timer);
    }
  }, [payment]);

  const checkPaymentStatus = async () => {
    try {
      const response = await fetch(`/api/fondy/status?order_id=${orderId}`);
      const data = await response.json();

      if (data.success) {
        setPayment(data.data);
      } else {
        setError(data.error || 'Failed to fetch payment status');
      }
    } catch (err) {
      setError('Failed to check payment status');
    } finally {
      setLoading(false);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed':
        return 'text-green-600 bg-green-100';
      case 'pending':
        return 'text-yellow-600 bg-yellow-100';
      case 'failed':
        return 'text-red-600 bg-red-100';
      default:
        return 'text-gray-600 bg-gray-100';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'completed':
        return t.statusCompleted;
      case 'pending':
        return t.statusPending;
      case 'failed':
        return t.statusFailed;
      default:
        return status;
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#e8e6e0] flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-[#c9b896] border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p className="text-xl text-[#3a3a35] font-light">{t.loading}</p>
        </div>
      </div>
    );
  }

  if (error || !payment) {
    return (
      <div className="min-h-screen bg-[#e8e6e0] flex items-center justify-center px-4">
        <div className="text-center max-w-md">
          <div className="w-20 h-20 rounded-full bg-gray-200 flex items-center justify-center mx-auto mb-6">
            <svg className="w-10 h-10 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <h1 className="text-2xl font-light text-[#3a3a35] mb-4">{t.notFound}</h1>
          <p className="text-[#3a3a35]/70 mb-8">{t.errorMessage}</p>
          <Link
            href="/"
            className="inline-flex items-center gap-2 px-6 py-3 bg-[#3a3a35] text-white rounded-lg hover:bg-[#c9b896] hover:text-[#3a3a35] transition-colors"
          >
            {t.backHome}
          </Link>
        </div>
      </div>
    );
  }

  const isSuccess = payment.status === 'completed';
  const isPending = payment.status === 'pending';
  const isFailed = payment.status === 'failed';

  return (
    <div className="min-h-screen bg-[#e8e6e0] py-20 px-4">
      <div className="max-w-2xl mx-auto">
        {/* Status Icon */}
        <div className="text-center mb-8">
          <div className={`w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-6 ${
            isSuccess ? 'bg-green-100' : isPending ? 'bg-yellow-100' : 'bg-red-100'
          }`}>
            {isSuccess ? (
              <svg className="w-12 h-12 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            ) : isPending ? (
              <svg className="w-12 h-12 text-yellow-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            ) : (
              <svg className="w-12 h-12 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            )}
          </div>

          <h1 className="text-3xl sm:text-4xl font-light text-[#3a3a35] mb-4">
            {isSuccess ? t.success : isPending ? t.pending : t.failed}
          </h1>
          
          <p className="text-lg text-[#3a3a35]/70 font-light max-w-md mx-auto">
            {isSuccess ? t.thankYou : isPending ? t.pendingMessage : t.failedMessage}
          </p>
        </div>

        {/* Payment Details */}
        <div className="bg-white rounded-2xl shadow-lg p-6 sm:p-8 mb-8">
          <div className="space-y-4">
            <div className="flex justify-between items-center py-3 border-b border-gray-100">
              <span className="text-[#3a3a35]/60">{t.orderNumber}</span>
              <span className="text-[#3a3a35] font-medium">{payment.orderId}</span>
            </div>
            
            <div className="flex justify-between items-center py-3 border-b border-gray-100">
              <span className="text-[#3a3a35]/60">{t.amount}</span>
              <span className="text-2xl font-light text-[#3a3a35]">
                {payment.currency === 'EUR' ? '€' : payment.currency === 'UAH' ? '₴' : payment.currency} {payment.amount}
              </span>
            </div>
            
            <div className="flex justify-between items-center py-3 border-b border-gray-100">
              <span className="text-[#3a3a35]/60">{t.status}</span>
              <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(payment.status)}`}>
                {getStatusText(payment.status)}
              </span>
            </div>

            {payment.paidAt && (
              <div className="flex justify-between items-center py-3 border-b border-gray-100">
                <span className="text-[#3a3a35]/60">{t.paidAt}</span>
                <span className="text-[#3a3a35]">
                  {new Date(payment.paidAt).toLocaleString(language === 'ru' ? 'ru-RU' : 'en-US')}
                </span>
              </div>
            )}

            <div className="flex justify-between items-center py-3">
              <span className="text-[#3a3a35]/60">{t.email}</span>
              <span className="text-[#3a3a35]">{payment.clientEmail}</span>
            </div>
          </div>

          {isSuccess && (
            <>
              <div className="mt-6 p-4 bg-green-50 rounded-lg flex items-center gap-3">
                <svg className="w-5 h-5 text-green-600 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                <span className="text-green-700 text-sm">{t.confirmationSent}</span>
              </div>

              {payment.metadata?.calendarLink && (
                <div className="mt-4 p-4 bg-blue-50 rounded-lg flex items-center gap-3">
                  <svg className="w-5 h-5 text-blue-600 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                  <span className="text-blue-700 text-sm">{t.calendarAdded}</span>
                </div>
              )}
            </>
          )}
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          {isFailed ? (
            <>
              <Link
                href="/retreats"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-[#c9b896] text-[#3a3a35] rounded-lg hover:bg-[#3a3a35] hover:text-white transition-colors font-light"
              >
                {t.tryAgain}
              </Link>
              <Link
                href="/contact"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 border-2 border-[#3a3a35] text-[#3a3a35] rounded-lg hover:bg-[#3a3a35] hover:text-white transition-colors font-light"
              >
                {t.contactUs}
              </Link>
            </>
          ) : (
            <>
              {payment.metadata?.calendarLink && isSuccess && (
                <a
                  href={payment.metadata.calendarLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-[#c9b896] text-[#3a3a35] rounded-lg hover:bg-[#3a3a35] hover:text-white transition-colors font-light"
                >
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                  {t.addToCalendar}
                </a>
              )}
              <Link
                href="/"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-[#3a3a35] text-white rounded-lg hover:bg-[#c9b896] hover:text-[#3a3a35] transition-colors font-light"
              >
                {t.backHome}
              </Link>
              <Link
                href="/retreats"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 border-2 border-[#3a3a35] text-[#3a3a35] rounded-lg hover:bg-[#3a3a35] hover:text-white transition-colors font-light"
              >
                {t.backRetreats}
              </Link>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default function PaymentSuccessPage() {
  return (
    <>
      <Header />
      <Suspense fallback={
        <div className="min-h-screen bg-[#e8e6e0] flex items-center justify-center">
          <div className="w-16 h-16 border-4 border-[#c9b896] border-t-transparent rounded-full animate-spin" />
        </div>
      }>
        <PaymentSuccessContent />
      </Suspense>
      <Footer />
    </>
  );
}
