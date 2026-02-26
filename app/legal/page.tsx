'use client';

import Header from '../components/Header';
import Footer from '../components/Footer';
import { useLanguage } from '../context/LanguageContext';

const content = {
  ru: {
    title: 'Юридическая информация',
    lastUpdated: 'Последнее обновление: Январь 2025',
    sections: [
      {
        heading: '1. Общая информация',
        text: 'Сайт vladyoga.com принадлежит и управляется Владиславом Чангелия (далее — «Владелец»). Сайт предоставляет информацию о занятиях йогой, ретритах и связанных услугах.',
      },
      {
        heading: '2. Условия использования',
        text: 'Используя данный Сайт, вы соглашаетесь с настоящими условиями. Если вы не согласны с какими-либо условиями, пожалуйста, прекратите использование Сайта. Владелец оставляет за собой право изменять условия без предварительного уведомления.',
      },
      {
        heading: '3. Интеллектуальная собственность',
        text: 'Все материалы, размещённые на Сайте, включая тексты, изображения, логотипы, видео и дизайн, являются собственностью Владельца и защищены законодательством об авторском праве. Любое копирование, распространение или использование материалов без письменного согласия запрещено.',
      },
      {
        heading: '4. Услуги и оплата',
        text: 'Информация об услугах и ценах на Сайте носит информационный характер и может быть изменена. Оплата услуг осуществляется через защищённый платёжный сервис Fondy. Условия возврата средств определяются индивидуально.',
      },
      {
        heading: '5. Ответственность',
        text: 'Занятия йогой требуют определённого уровня физической подготовки. Участники несут личную ответственность за своё здоровье и самочувствие во время занятий. Рекомендуется проконсультироваться с врачом перед началом практики. Владелец не несёт ответственности за травмы, полученные в результате самостоятельной практики.',
      },
      {
        heading: '6. Отмена и перенос занятий',
        text: 'Владелец оставляет за собой право отменять или переносить занятия и ретриты в случае форс-мажорных обстоятельств. В таких случаях участники будут уведомлены заблаговременно, и будет предложен альтернативный вариант или возврат средств.',
      },
      {
        heading: '7. Ссылки на сторонние ресурсы',
        text: 'Сайт может содержать ссылки на сторонние ресурсы. Владелец не несёт ответственности за содержание и политику конфиденциальности сторонних сайтов.',
      },
      {
        heading: '8. Применимое право',
        text: 'Настоящие условия регулируются и толкуются в соответствии с действующим законодательством. Все споры подлежат разрешению в установленном законом порядке.',
      },
      {
        heading: '9. Контактная информация',
        text: 'По всем юридическим вопросам обращайтесь: Email: vlady@vladyoga.com',
      },
    ],
  },
  en: {
    title: 'Legal Information',
    lastUpdated: 'Last updated: January 2025',
    sections: [
      {
        heading: '1. General Information',
        text: 'The website vladyoga.com is owned and operated by Vladislav Changelia (hereinafter — the "Owner"). The Website provides information about yoga classes, retreats, and related services.',
      },
      {
        heading: '2. Terms of Use',
        text: 'By using this Website, you agree to these terms. If you do not agree with any of the terms, please discontinue use of the Website. The Owner reserves the right to modify the terms without prior notice.',
      },
      {
        heading: '3. Intellectual Property',
        text: 'All materials published on the Website, including texts, images, logos, videos, and design, are the property of the Owner and are protected by copyright law. Any copying, distribution, or use of materials without written consent is prohibited.',
      },
      {
        heading: '4. Services and Payment',
        text: 'Information about services and prices on the Website is for informational purposes and is subject to change. Payment for services is processed through the secure payment service Fondy. Refund conditions are determined individually.',
      },
      {
        heading: '5. Liability',
        text: 'Yoga practice requires a certain level of physical fitness. Participants bear personal responsibility for their health and well-being during classes. It is recommended to consult a doctor before starting practice. The Owner is not liable for injuries resulting from independent practice.',
      },
      {
        heading: '6. Cancellation and Rescheduling',
        text: 'The Owner reserves the right to cancel or reschedule classes and retreats in case of force majeure circumstances. In such cases, participants will be notified in advance, and an alternative option or refund will be offered.',
      },
      {
        heading: '7. Third-Party Links',
        text: 'The Website may contain links to third-party resources. The Owner is not responsible for the content or privacy policies of third-party websites.',
      },
      {
        heading: '8. Applicable Law',
        text: 'These terms are governed by and construed in accordance with applicable law. All disputes shall be resolved in accordance with the established legal procedures.',
      },
      {
        heading: '9. Contact Information',
        text: 'For all legal inquiries, please contact: Email: vlady@vladyoga.com',
      },
    ],
  },
};

export default function LegalPage() {
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
