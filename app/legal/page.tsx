'use client';

import Header from '../components/Header';
import Footer from '../components/Footer';
import { useLanguage } from '../context/LanguageContext';

const content = {
  en: {
    title: 'Legal Information',
    sections: [
      {
        heading: '1. General Information',
        text: 'Vladyslav Chanheliia\nSelf-Employed Professional\nRegistered Address: Pfeilgasse 14, 1080, Vienna, Austria\nEmail: vladybookings@gmail.com\nPhone: +43 677 6277 0954 (WhatsApp only)',
      },
      {
        heading: '2. Website Ownership',
        text: 'This website is owned and operated by Vladyslav Chanheliia.\nAll information provided on this website is for general informational purposes only.',
      },
      {
        heading: '3. Intellectual Property Rights',
        text: 'All content published on this website, including but not limited to texts, images, graphics, logos, documents, product descriptions, and design elements, is protected by applicable intellectual property laws.\n\nUnauthorized copying, reproduction, modification, distribution, or commercial use of any content without prior written consent is strictly prohibited.',
      },
      {
        heading: '4. Disclaimer of Liability',
        text: 'While every effort is made to ensure that the information on this website is accurate and up to date, no guarantees are made regarding completeness, accuracy, or reliability.\n\nThe website owner shall not be liable for:\n• Direct or indirect damages\n• Loss of data\n• Loss of profit\n• Business interruption\n• Any consequences resulting from the use of the website\n\nUse of this website and its content is at your own risk.',
      },
      {
        heading: '5. External Links',
        text: 'This website may contain links to third-party websites.\nThe website owner has no control over external content and assumes no responsibility for its accuracy, legality, or privacy practices.',
      },
      {
        heading: '6. Data Protection',
        text: 'Personal data is processed in accordance with applicable data protection laws.\nFor detailed information about how personal data is collected, stored, and processed, please refer to our Privacy Policy.',
      },
      {
        heading: '7. Governing Law',
        text: 'All legal matters relating to this website shall be governed by the laws of Austria.\nAny disputes arising in connection with the use of this website shall be subject to the jurisdiction of the competent courts of Austria.',
      },
      {
        heading: '8. Contact Information',
        text: 'If you have any questions regarding this Legal Information page, please contact:\n\nEmail: vladybookings@gmail.com\nAddress: Pfeilgasse 14, 1080, Wien, Austria\nPhone: +43 677 6277 0954 (WhatsApp only)',
      },
    ],
  },
  ru: {
    title: 'Юридическая информация',
    sections: [
      {
        heading: '1. Общая информация',
        text: 'Владислав Чангелия\nСамозанятый специалист\nАдрес регистрации: Pfeilgasse 14, 1080, Вена, Австрия\nЭлектронная почта: vladybookings@gmail.com\nТелефон: +43 677 6277 0954 (только WhatsApp)',
      },
      {
        heading: '2. Владение сайтом',
        text: 'Данный веб-сайт принадлежит и управляется Владиславом Чангелией.\nВся информация, размещённая на данном сайте, предоставляется исключительно в общих информационных целях.',
      },
      {
        heading: '3. Права интеллектуальной собственности',
        text: 'Весь контент, опубликованный на данном сайте, включая, но не ограничиваясь текстами, изображениями, графикой, логотипами, документами, описаниями продуктов и элементами дизайна, защищён применимым законодательством об интеллектуальной собственности.\n\nНесанкционированное копирование, воспроизведение, изменение, распространение или коммерческое использование любого контента без предварительного письменного согласия строго запрещено.',
      },
      {
        heading: '4. Отказ от ответственности',
        text: 'Несмотря на то, что предпринимаются все усилия для обеспечения точности и актуальности информации на данном сайте, гарантии полноты, точности или надёжности не предоставляются.\n\nВладелец сайта не несёт ответственности за:\n• Прямой или косвенный ущерб\n• Потерю данных\n• Упущенную прибыль\n• Прерывание предпринимательской деятельности\n• Любые последствия, возникшие в результате использования данного сайта\n\nИспользование данного сайта и его содержимого осуществляется на ваш собственный риск.',
      },
      {
        heading: '5. Внешние ссылки',
        text: 'Данный сайт может содержать ссылки на сайты третьих лиц.\nВладелец сайта не контролирует внешний контент и не несёт ответственности за его точность, законность или практику обработки персональных данных.',
      },
      {
        heading: '6. Защита данных',
        text: 'Обработка персональных данных осуществляется в соответствии с применимым законодательством о защите данных.\nДля получения подробной информации о том, как собираются, хранятся и обрабатываются персональные данные, пожалуйста, ознакомьтесь с нашей Политикой конфиденциальности.',
      },
      {
        heading: '7. Применимое право',
        text: 'Все правовые вопросы, связанные с данным сайтом, регулируются законодательством Австрии.\nЛюбые споры, возникающие в связи с использованием данного сайта, подлежат рассмотрению в компетентных судах Австрии.',
      },
      {
        heading: '8. Контактная информация',
        text: 'Если у вас есть вопросы относительно данной страницы «Юридическая информация», пожалуйста, свяжитесь с нами:\n\nЭлектронная почта: vladybookings@gmail.com\nАдрес: Pfeilgasse 14, 1080, Вена, Австрия\nТелефон: +43 677 6277 0954 (только WhatsApp)',
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
          <h1 className="text-3xl sm:text-4xl font-light text-[#3a3a35] mb-10">
            {t.title}
          </h1>
          <div className="space-y-8">
            {t.sections.map((section, index) => (
              <div key={index}>
                <h2 className="text-lg font-medium text-[#3a3a35] mb-3">
                  {section.heading}
                </h2>
                <p className="text-[#3a3a35]/70 font-light leading-relaxed whitespace-pre-line">
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
