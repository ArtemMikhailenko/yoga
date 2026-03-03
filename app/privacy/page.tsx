'use client';

import Header from '../components/Header';
import Footer from '../components/Footer';
import { useLanguage } from '../context/LanguageContext';

interface Section {
  heading: string;
  content: (string | { type: 'list'; items: string[] } | { type: 'address'; lines: string[] })[];
}

const content: Record<'ru' | 'en', { title: string; subtitle: string; lastUpdated: string; sections: Section[] }> = {
  en: {
    title: 'Confidentiality and Data Protection Policy',
    subtitle: '',
    lastUpdated: 'Effective Date: 02 March 2026 | Last Updated: 02 March 2026',
    sections: [
      {
        heading: '1. Identity of the Controller',
        content: [
          'Vladyslav Chanheliia\nAddress: Pfeilgasse 14, 1080, Vienna, Austria\nEmail: vladybookings@gmail.com\nTelephone: +43 677 6277 0954 (WhatsApp only)\nWebsite: www.vladyoga.com',
          'Vladyslav Chanheliia (hereinafter referred to as "we") acts as the Data Controller within the meaning of Article 4(7) GDPR.',
        ],
      },
      {
        heading: '2. Legal Framework',
        content: [
          'This Policy is issued in compliance with:',
          { type: 'list', items: [
            'Regulation (EU) 2016/679 (GDPR)',
            'Austrian Data Protection Act (Datenschutzgesetz — DSG)',
            'Austrian Commercial Code (UGB)',
            'Austrian Federal Fiscal Code (BAO), where applicable',
          ]},
        ],
      },
      {
        heading: '3. Principles of Data Processing',
        content: [
          'We process personal data in accordance with Article 5 GDPR principles:',
          { type: 'list', items: [
            'Lawfulness, fairness, and transparency',
            'Purpose limitation',
            'Data minimization',
            'Accuracy',
            'Storage limitation',
            'Integrity and confidentiality',
            'Accountability',
          ]},
          'All processing activities are documented in our internal Record of Processing Activities pursuant to Article 30 GDPR.',
        ],
      },
      {
        heading: '4. Categories of Personal Data',
        content: [
          'Depending on the interaction with our website or services, we may process:',
          'Identification Data:',
          { type: 'list', items: ['Name and surname', 'Company name', 'Registration numbers'] },
          'Contact Data:',
          { type: 'list', items: ['Email address', 'Telephone number', 'Address'] },
          'Contractual and Transaction Data:',
          { type: 'list', items: ['Order details', 'Billing information', 'Payment data (processed via secure providers)'] },
          'Technical Data:',
          { type: 'list', items: ['IP address', 'Device information', 'Browser type', 'Access logs'] },
          'Communication Data:',
          { type: 'list', items: ['Messages submitted via contact forms or email'] },
          'Special categories of personal data (Art. 9 GDPR) are not processed unless explicitly required and legally justified.',
        ],
      },
      {
        heading: '5. Legal Bases for Processing',
        content: [
          'Personal data is processed exclusively under one or more of the following legal bases (Art. 6 GDPR):',
          { type: 'list', items: [
            'Performance of a contract or pre-contractual measures (Art. 6(1)(b))',
            'Compliance with legal obligations under Austrian law (Art. 6(1)(c))',
            'Legitimate interests pursued by the Company (Art. 6(1)(f))',
            'Explicit consent of the data subject (Art. 6(1)(a))',
          ]},
          'Legitimate interests may include IT security, fraud prevention, enforcement of legal claims, and business continuity.',
          'Where consent is required, it shall be obtained prior to processing and may be withdrawn at any time without affecting the lawfulness of processing based on consent before withdrawal.',
        ],
      },
      {
        heading: '6. Confidentiality Obligation',
        content: [
          'We maintain strict confidentiality regarding all personal data.',
          { type: 'list', items: [
            'All employees are bound by statutory and contractual confidentiality obligations.',
            'Access to personal data is limited to authorized personnel on a need-to-know basis.',
            'External service providers are contractually bound via Data Processing Agreements under Article 28 GDPR.',
          ]},
        ],
      },
      {
        heading: '7. Technical and Organizational Measures (TOMs)',
        content: [
          'In accordance with Article 32 GDPR, we implement appropriate technical and organizational measures to ensure a level of security appropriate to the risk, including:',
          { type: 'list', items: [
            'SSL/TLS encryption',
            'Secure EU-based hosting environments',
            'Role-based access control',
            'Multi-factor authentication where appropriate',
            'Firewalls and intrusion detection systems',
            'Data minimization and pseudonymization where feasible',
            'Regular system updates and security audits',
            'Backup and disaster recovery procedures',
          ]},
        ],
      },
      {
        heading: '8. Data Sharing and Processors',
        content: [
          'Personal data may be disclosed to:',
          { type: 'list', items: [
            'IT and hosting providers',
            'Payment service providers',
            'Accounting and tax advisors',
            'Legal counsel',
            'Authorities where legally required',
          ]},
          'All processors are carefully selected and monitored for compliance with GDPR requirements. Data processing agreements pursuant to Article 28 GDPR are concluded where required.',
        ],
      },
      {
        heading: '9. International Transfers',
        content: [
          'If personal data is transferred outside the European Economic Area (EEA), such transfer shall occur only where:',
          { type: 'list', items: [
            'An adequacy decision of the European Commission exists; or',
            'Standard Contractual Clauses (SCCs) are implemented; or',
            'Another lawful transfer mechanism under Chapter V GDPR applies.',
          ]},
        ],
      },
      {
        heading: '10. Data Retention Periods',
        content: [
          'Personal data is retained only for as long as necessary for the purposes for which it was collected or to comply with statutory retention obligations.',
          'Under Austrian law:',
          { type: 'list', items: [
            'Accounting and tax documents are retained for a minimum of 7 years (UGB, BAO).',
            'Longer retention may apply where required for pending legal proceedings or statutory limitation periods.',
          ]},
          'After expiration of retention periods, personal data is securely deleted or anonymized.',
        ],
      },
      {
        heading: '11. Data Subject Rights',
        content: [
          'Data subjects have the following rights under the GDPR:',
          { type: 'list', items: [
            'Right of access (Art. 15 GDPR)',
            'Right to rectification (Art. 16 GDPR)',
            'Right to erasure (Art. 17 GDPR)',
            'Right to restriction of processing (Art. 18 GDPR)',
            'Right to data portability (Art. 20 GDPR)',
            'Right to object (Art. 21 GDPR)',
            'Right not to be subject to automated decision-making (Art. 22 GDPR)',
          ]},
          'Requests must be submitted in writing to: vladybookings@gmail.com',
          'We reserve the right to verify identity before responding to any request.',
        ],
      },
      {
        heading: '12. Right to Lodge a Complaint',
        content: [
          'Data subjects have the right to lodge a complaint with the competent supervisory authority:',
          { type: 'address', lines: [
            'Österreichische Datenschutzbehörde',
            'Barichgasse 40-42',
            '1030 Vienna, Austria',
            'https://www.dsb.gv.at',
          ]},
        ],
      },
      {
        heading: '13. Personal Data Breaches',
        content: [
          'In the event of a personal data breach, we shall:',
          { type: 'list', items: [
            'Assess the risk to affected individuals',
            'Notify the Austrian Data Protection Authority within 72 hours, where required (Art. 33 GDPR)',
            'Inform affected individuals without undue delay where required (Art. 34 GDPR)',
          ]},
          'All breaches are documented internally.',
        ],
      },
      {
        heading: '14. Limitation of Liability',
        content: [
          'While we implement appropriate technical and organizational measures, absolute security cannot be guaranteed. To the extent permitted by law, the Company shall not be liable for damages arising from unlawful access caused by third parties beyond the Company\'s control, provided that no gross negligence or willful misconduct exists.',
        ],
      },
      {
        heading: '15. Amendments',
        content: [
          'We reserve the right to amend this Policy at any time to ensure ongoing compliance with legal requirements or changes in our data processing practices.',
          'The current version shall always be published on our website.',
        ],
      },
    ],
  },
  ru: {
    title: 'Политика конфиденциальности и защиты данных',
    subtitle: '',
    lastUpdated: 'Дата вступления в силу: 02 марта 2026 | Последнее обновление: 02 марта 2026',
    sections: [
      {
        heading: '1. Личность контролёра',
        content: [
          'Владислав Чангелия\nАдрес: Pfeilgasse 14, 1080, Вена, Австрия\nEmail: vladybookings@gmail.com\nТелефон: +43 677 6277 0954 (только WhatsApp)\nСайт: www.vladyoga.com',
          'Владислав Чангелия (далее — «мы») выступает контролёром данных в значении статьи 4(7) GDPR.',
        ],
      },
      {
        heading: '2. Правовая база',
        content: [
          'Настоящая Политика издана в соответствии с:',
          { type: 'list', items: [
            'Регламент (ЕС) 2016/679 (GDPR)',
            'Австрийский закон о защите данных (Datenschutzgesetz — DSG)',
            'Австрийский торговый кодекс (UGB)',
            'Австрийский федеральный фискальный кодекс (BAO), где применимо',
          ]},
        ],
      },
      {
        heading: '3. Принципы обработки данных',
        content: [
          'Мы обрабатываем персональные данные в соответствии с принципами статьи 5 GDPR:',
          { type: 'list', items: [
            'Законность, справедливость и прозрачность',
            'Ограничение целей',
            'Минимизация данных',
            'Точность',
            'Ограничение хранения',
            'Целостность и конфиденциальность',
            'Подотчётность',
          ]},
          'Все действия по обработке документируются в нашем внутреннем Реестре деятельности по обработке в соответствии со статьёй 30 GDPR.',
        ],
      },
      {
        heading: '4. Категории персональных данных',
        content: [
          'В зависимости от взаимодействия с нашим сайтом или услугами, мы можем обрабатывать:',
          'Идентификационные данные:',
          { type: 'list', items: ['Имя и фамилия', 'Название компании', 'Регистрационные номера'] },
          'Контактные данные:',
          { type: 'list', items: ['Адрес электронной почты', 'Номер телефона', 'Адрес'] },
          'Договорные и транзакционные данные:',
          { type: 'list', items: ['Детали заказа', 'Платёжная информация', 'Данные об оплате (обрабатываются через защищённых провайдеров)'] },
          'Технические данные:',
          { type: 'list', items: ['IP-адрес', 'Информация об устройстве', 'Тип браузера', 'Логи доступа'] },
          'Данные коммуникации:',
          { type: 'list', items: ['Сообщения, отправленные через контактные формы или email'] },
          'Специальные категории персональных данных (ст. 9 GDPR) не обрабатываются, если это явно не требуется и юридически не обосновано.',
        ],
      },
      {
        heading: '5. Правовые основания обработки',
        content: [
          'Персональные данные обрабатываются исключительно на основании одного или нескольких из следующих правовых оснований (ст. 6 GDPR):',
          { type: 'list', items: [
            'Исполнение договора или преддоговорных мер (ст. 6(1)(b))',
            'Соблюдение правовых обязательств по австрийскому законодательству (ст. 6(1)(c))',
            'Законные интересы компании (ст. 6(1)(f))',
            'Явное согласие субъекта данных (ст. 6(1)(a))',
          ]},
          'Законные интересы могут включать ИТ-безопасность, предотвращение мошенничества, защиту правовых требований и обеспечение непрерывности бизнеса.',
          'Если требуется согласие, оно будет получено до начала обработки и может быть отозвано в любое время без ущерба для законности обработки, основанной на согласии до его отзыва.',
        ],
      },
      {
        heading: '6. Обязательство конфиденциальности',
        content: [
          'Мы обеспечиваем строгую конфиденциальность всех персональных данных.',
          { type: 'list', items: [
            'Все сотрудники связаны законодательными и договорными обязательствами конфиденциальности.',
            'Доступ к персональным данным ограничен уполномоченным персоналом по принципу необходимости.',
            'Внешние поставщики услуг связаны договорами обработки данных в соответствии со статьёй 28 GDPR.',
          ]},
        ],
      },
      {
        heading: '7. Технические и организационные меры (TOM)',
        content: [
          'В соответствии со статьёй 32 GDPR мы применяем надлежащие технические и организационные меры для обеспечения уровня безопасности, соразмерного риску, включая:',
          { type: 'list', items: [
            'SSL/TLS шифрование',
            'Безопасные хостинг-среды в ЕС',
            'Контроль доступа на основе ролей',
            'Многофакторная аутентификация, где это уместно',
            'Межсетевые экраны и системы обнаружения вторжений',
            'Минимизация данных и псевдонимизация, где это возможно',
            'Регулярные обновления систем и аудиты безопасности',
            'Процедуры резервного копирования и аварийного восстановления',
          ]},
        ],
      },
      {
        heading: '8. Передача данных и обработчики',
        content: [
          'Персональные данные могут быть раскрыты:',
          { type: 'list', items: [
            'ИТ и хостинг-провайдерам',
            'Провайдерам платёжных услуг',
            'Бухгалтерским и налоговым консультантам',
            'Юридическим консультантам',
            'Органам власти, если это требуется по закону',
          ]},
          'Все обработчики тщательно отбираются и контролируются на предмет соответствия требованиям GDPR. Договоры обработки данных в соответствии со статьёй 28 GDPR заключаются при необходимости.',
        ],
      },
      {
        heading: '9. Международные передачи',
        content: [
          'Если персональные данные передаются за пределы Европейской экономической зоны (ЕЭЗ), такая передача осуществляется только при условии:',
          { type: 'list', items: [
            'Наличия решения Европейской комиссии о достаточности; или',
            'Применения стандартных договорных положений (SCC); или',
            'Другого законного механизма передачи в соответствии с главой V GDPR.',
          ]},
        ],
      },
      {
        heading: '10. Сроки хранения данных',
        content: [
          'Персональные данные хранятся только столько, сколько необходимо для целей, для которых они были собраны, или для соблюдения законодательных требований по хранению.',
          'В соответствии с австрийским законодательством:',
          { type: 'list', items: [
            'Бухгалтерские и налоговые документы хранятся минимум 7 лет (UGB, BAO).',
            'Более длительное хранение может применяться при необходимости для незавершённых судебных разбирательств или сроков исковой давности.',
          ]},
          'По истечении сроков хранения персональные данные безопасно удаляются или анонимизируются.',
        ],
      },
      {
        heading: '11. Права субъектов данных',
        content: [
          'Субъекты данных имеют следующие права в соответствии с GDPR:',
          { type: 'list', items: [
            'Право доступа (ст. 15 GDPR)',
            'Право на исправление (ст. 16 GDPR)',
            'Право на удаление (ст. 17 GDPR)',
            'Право на ограничение обработки (ст. 18 GDPR)',
            'Право на переносимость данных (ст. 20 GDPR)',
            'Право на возражение (ст. 21 GDPR)',
            'Право не подвергаться автоматизированному принятию решений (ст. 22 GDPR)',
          ]},
          'Запросы необходимо направлять в письменной форме по адресу: vladybookings@gmail.com',
          'Мы оставляем за собой право проверить личность перед ответом на любой запрос.',
        ],
      },
      {
        heading: '12. Право на подачу жалобы',
        content: [
          'Субъекты данных имеют право подать жалобу в компетентный надзорный орган:',
          { type: 'address', lines: [
            'Österreichische Datenschutzbehörde',
            'Barichgasse 40-42',
            '1030 Вена, Австрия',
            'https://www.dsb.gv.at',
          ]},
        ],
      },
      {
        heading: '13. Нарушения безопасности персональных данных',
        content: [
          'В случае нарушения безопасности персональных данных мы:',
          { type: 'list', items: [
            'Оценим риск для затронутых лиц',
            'Уведомим Австрийский орган по защите данных в течение 72 часов, если это требуется (ст. 33 GDPR)',
            'Проинформируем затронутых лиц без неоправданной задержки, если это требуется (ст. 34 GDPR)',
          ]},
          'Все нарушения документируются внутренне.',
        ],
      },
      {
        heading: '14. Ограничение ответственности',
        content: [
          'Несмотря на применение надлежащих технических и организационных мер, абсолютная безопасность не может быть гарантирована. В пределах, допускаемых законом, компания не несёт ответственности за ущерб, возникший в результате незаконного доступа третьих лиц, находящегося вне контроля компании, при условии отсутствия грубой небрежности или умышленных действий.',
        ],
      },
      {
        heading: '15. Изменения',
        content: [
          'Мы оставляем за собой право изменять настоящую Политику в любое время для обеспечения постоянного соответствия правовым требованиям или изменениям в нашей практике обработки данных.',
          'Актуальная версия всегда публикуется на нашем сайте.',
        ],
      },
    ],
  },
};

function renderContent(item: string | { type: 'list'; items: string[] } | { type: 'address'; lines: string[] }, idx: number) {
  if (typeof item === 'string') {
    return (
      <p key={idx} className="text-[#3a3a35]/70 font-light leading-relaxed whitespace-pre-line">
        {item}
      </p>
    );
  }
  if (item.type === 'list') {
    return (
      <ul key={idx} className="list-disc list-inside space-y-1 text-[#3a3a35]/70 font-light ml-2">
        {item.items.map((li, i) => (
          <li key={i}>{li}</li>
        ))}
      </ul>
    );
  }
  if (item.type === 'address') {
    return (
      <address key={idx} className="not-italic text-[#3a3a35]/70 font-light leading-relaxed">
        {item.lines.map((line, i) => (
          <span key={i}>
            {line.startsWith('http') ? (
              <a href={line} target="_blank" rel="noopener noreferrer" className="underline hover:text-[#3a3a35]">{line}</a>
            ) : line}
            {i < item.lines.length - 1 && <br />}
          </span>
        ))}
      </address>
    );
  }
  return null;
}

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
          <div className="space-y-10">
            {t.sections.map((section, index) => (
              <div key={index} className="space-y-3">
                <h2 className="text-lg font-medium text-[#3a3a35]">
                  {section.heading}
                </h2>
                {section.content.map((item, idx) => renderContent(item, idx))}
              </div>
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
