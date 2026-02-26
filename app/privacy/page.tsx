'use client';

import Header from '../components/Header';
import Footer from '../components/Footer';
import { useLanguage } from '../context/LanguageContext';

const content = {
  ru: {
    title: 'Политика конфиденциальности',
    lastUpdated: 'Последнее обновление: Январь 2025',
    sections: [
      {
        heading: '1. Общие положения',
        text: 'Настоящая Политика конфиденциальности определяет порядок сбора, использования, хранения и защиты персональных данных пользователей сайта vladyoga.com (далее — «Сайт»). Используя Сайт, вы соглашаетесь с условиями настоящей Политики.',
      },
      {
        heading: '2. Какие данные мы собираем',
        text: 'При использовании Сайта могут собираться следующие данные: имя и контактная информация (email, телефон), предоставленные через формы обратной связи или при бронировании; данные об использовании Сайта (cookies, IP-адрес, тип браузера); информация о платежах (обрабатывается через защищённый платёжный сервис Fondy).',
      },
      {
        heading: '3. Цели обработки данных',
        text: 'Персональные данные используются для: обработки заявок и бронирований; связи с вами по вопросам занятий и ретритов; улучшения работы Сайта; выполнения юридических обязательств.',
      },
      {
        heading: '4. Защита данных',
        text: 'Принимаются все необходимые организационные и технические меры для защиты персональных данных от несанкционированного доступа, изменения, раскрытия или уничтожения. Платёжные данные обрабатываются исключительно через сертифицированный платёжный шлюз.',
      },
      {
        heading: '5. Передача третьим лицам',
        text: 'Персональные данные не передаются третьим лицам, за исключением случаев: обработки платежей через Fondy; требований законодательства; с вашего явного согласия.',
      },
      {
        heading: '6. Файлы cookie',
        text: 'Сайт может использовать файлы cookie для улучшения пользовательского опыта. Вы можете отключить cookie в настройках своего браузера, однако это может повлиять на функциональность Сайта.',
      },
      {
        heading: '7. Ваши права',
        text: 'Вы имеете право: запросить информацию о своих персональных данных; потребовать исправления или удаления своих данных; отозвать согласие на обработку данных. Для реализации своих прав свяжитесь по email: vlady@vladyoga.com.',
      },
      {
        heading: '8. Контакты',
        text: 'По всем вопросам, связанным с обработкой персональных данных, обращайтесь: Email: vlady@vladyoga.com',
      },
    ],
  },
  en: {
    title: 'Privacy Policy',
    lastUpdated: 'Last updated: January 2025',
    sections: [
      {
        heading: '1. General Provisions',
        text: 'This Privacy Policy defines the procedures for collecting, using, storing, and protecting personal data of users of vladyoga.com (hereinafter — the "Website"). By using the Website, you agree to the terms of this Policy.',
      },
      {
        heading: '2. Data We Collect',
        text: 'When using the Website, the following data may be collected: name and contact information (email, phone) provided through contact forms or during booking; website usage data (cookies, IP address, browser type); payment information (processed through the secure payment service Fondy).',
      },
      {
        heading: '3. Purposes of Data Processing',
        text: 'Personal data is used for: processing applications and bookings; communicating with you regarding classes and retreats; improving the Website; fulfilling legal obligations.',
      },
      {
        heading: '4. Data Protection',
        text: 'All necessary organizational and technical measures are taken to protect personal data from unauthorized access, alteration, disclosure, or destruction. Payment data is processed exclusively through a certified payment gateway.',
      },
      {
        heading: '5. Third-Party Disclosure',
        text: 'Personal data is not shared with third parties, except in cases of: payment processing via Fondy; legal requirements; your explicit consent.',
      },
      {
        heading: '6. Cookies',
        text: 'The Website may use cookies to improve user experience. You can disable cookies in your browser settings, but this may affect the functionality of the Website.',
      },
      {
        heading: '7. Your Rights',
        text: 'You have the right to: request information about your personal data; request correction or deletion of your data; withdraw consent to data processing. To exercise your rights, contact us at: vlady@vladyoga.com.',
      },
      {
        heading: '8. Contact',
        text: 'For all questions related to personal data processing, please contact: Email: vlady@vladyoga.com',
      },
    ],
  },
};

export default function PrivacyPage() {
  const { language } = useLanguage();
  const t = content[language];

  return (
    <div>
      <Header />
      <main className="min-h-screen bg-[#faf9f6] pt-32 pb-20">
        <div className="max-w-3xl mx-auto px-4 sm:px-6">
          <h1 className="text-3xl sm:text-4xl font-light text-[#3a3a35] mb-2">
            {t.title}
          </h1>
          <p className="text-sm text-[#3a3a35]/50 mb-10 font-light">
            {t.lastUpdated}
          </p>
          <div className="space-y-8">
            {t.sections.map((section, index) => (
              <div key={index}>
                <h2 className="text-lg font-medium text-[#3a3a35] mb-3">
                  {section.heading}
                </h2>
                <p className="text-[#3a3a35]/70 font-light leading-relaxed">
                  {section.text}
                </p>
              </div>
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
