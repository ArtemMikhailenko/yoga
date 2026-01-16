import dbConnect from '../lib/mongodb';
import Retreat from '../models/Retreat';

const retreatsData = [
  {
    title: {
      ru: 'Йога-Ретрит в New Vraja Dhama',
      en: 'Yoga Retreat at New Vraja Dhama',
    },
    subtitle: {
      ru: 'Венгрия | 29.01 - 02.02',
      en: 'Hungary | 29.01 - 02.02',
    },
    dates: '29.01 - 02.02',
    duration: '5 дней / 5 days',
    location: {
      ru: 'New Vraja Dhama, Венгрия',
      en: 'New Vraja Dhama, Hungary',
    },
    price: '€690',
    description: {
      ru: 'Погрузитесь в глубокую практику йоги в одном из самых необычных и духовных мест Европы. За время ретрита вы получите 16 часов йога-практики и 8 часов семинаров на выбранные темы.',
      en: 'Immerse yourself in deep yoga practice at one of the most unusual and spiritual places in Europe. During the retreat you will receive 16 hours of yoga practice and 8 hours of seminars on selected topics.',
    },
    highlights: {
      ru: [
        '16 часов йога-практики',
        '8 часов семинаров на выбранные темы',
        'Ежедневно 2 практики по 2 часа (уровень от новичка до продолжающих)',
        'Асанические алгоритмы и йогические последовательности',
        'Крия-йога и хатха-йога практики для работы с вниманием и концентрацией',
        'Дыхательные техники для работы с ментальным состоянием',
        'Посещение утренних и вечерних медитативных программ',
        'Специальный гость (сюрприз)',
      ],
      en: [
        '16 hours of yoga practice',
        '8 hours of seminars on selected topics',
        'Daily 2 practices of 2 hours each (beginner to intermediate level)',
        'Asana algorithms and yogic sequences',
        'Kriya yoga and hatha yoga practices for attention and concentration',
        'Breathing techniques for mental state management',
        'Morning and evening meditation programs',
        'Special guest (surprise)',
      ],
    },
    included: {
      ru: [
        '3-разовое вегетарианское питание ежедневно (завтрак, обед, ужин)',
        'С четверга по понедельник — всего 12 приёмов пищи',
        'Проживание в New Vraja Dhama',
        'Все практики йоги и медитации',
        'Семинары и лекции',
        'Трансфер из Вены на машинах (3,5-4 часа)',
      ],
      en: [
        '3 meals a day vegetarian food (breakfast, lunch, dinner)',
        'Thursday to Monday - 12 meals total',
        'Accommodation at New Vraja Dhama',
        'All yoga and meditation practices',
        'Seminars and lectures',
        'Transfer from Vienna by car (3.5-4 hours)',
      ],
    },
    notIncluded: {
      ru: [
        'Личные расходы',
        'Дополнительные экскурсии',
      ],
      en: [
        'Personal expenses',
        'Additional excursions',
      ],
    },
    imageUrl: '/images/admin-retrite/retrit1.JPG',
    maxParticipants: 15,
    isActive: true,
    order: 1,
  },
  {
    title: {
      ru: 'Panchakarma Retreat в Южной Индии',
      en: 'Panchakarma Retreat in South India',
    },
    subtitle: {
      ru: 'Аюрведа | 9-23 февраля',
      en: 'Ayurveda | February 9-23',
    },
    dates: '9-23 февраля / February 9-23',
    duration: '14 дней / 14 days',
    location: {
      ru: 'Южная Индия, Мангалор',
      en: 'South India, Mangalore',
    },
    price: '€2600',
    pricingTiers: [
      {
        deadline: 'До 20 ноября 2025 / Until November 20, 2025',
        price: '€2400',
      },
      {
        deadline: 'До 20 декабря 2025 / Until December 20, 2025',
        price: '€2500',
      },
      {
        deadline: 'После 20 декабря 2025 / After December 20, 2025',
        price: '€2600',
      },
    ],
    description: {
      ru: 'Окунитесь в глубинное восстановление тела и сознания в сердце древней Аюрведы. Программа проходит в традиционной клинике под наблюдением опытных врачей, в окружении природы и святых мест Южной Индии. Цель программы: Погрузиться в древнюю систему очищения и восстановления тела, восстановить жизненную энергию (прану), успокоить ум, очистить чувства и углубить связь с внутренней энергией Шакти. Выйти на новый уровень сознания и восприятия.',
      en: 'Immerse yourself in deep restoration of body and mind in the heart of ancient Ayurveda. The program takes place in a traditional clinic under the supervision of experienced doctors, surrounded by nature and sacred places of South India. Program goal: Immerse in the ancient system of body cleansing and restoration, restore vital energy (prana), calm the mind, purify the senses and deepen connection with inner Shakti energy. Reach a new level of consciousness and perception.',
    },
    highlights: {
      ru: [
        'Индивидуальная консультация аюрведического врача',
        'Ежедневное наблюдение врача на протяжении всего курса',
        '2-3 аюрведические процедуры ежедневно',
        'Абхьянга — масляный массаж двумя терапевтами',
        'Широдхара — струя масла на область третьего глаза',
        'Сведана — паровая баня с аюрведическими травами',
        'Пинда Сведа — массаж мешочками с травами и рисом',
        'Басти — очищающая терапия для баланса Ваты',
        'Насья — очищение носовых путей через ингаляции с маслами',
        'Ежедневные практики йоги и пранаямы',
        'Посещение древних храмов и мест силы',
      ],
      en: [
        'Individual consultation with Ayurvedic doctor',
        'Daily doctor supervision throughout the course',
        '2-3 Ayurvedic procedures daily',
        'Abhyanga - oil massage by two therapists',
        'Shirodhara - stream of oil on the third eye area',
        'Swedana - steam bath with Ayurvedic herbs',
        'Pinda Sweda - massage with herbal rice pouches',
        'Basti - cleansing therapy for Vata balance',
        'Nasya - nasal cleansing through oil inhalations',
        'Daily yoga and pranayama practices',
        'Visits to ancient temples and power places',
      ],
    },
    included: {
      ru: [
        'Индивидуальная консультация аюрведического врача',
        'Ежедневное наблюдение врача',
        'Лекарственные препараты и процедуры',
        'Аюрведические процедуры (2-3 ежедневно)',
        'Трёхразовое аюрведическое питание',
        'Проживание в клинике (2-местное размещение)',
        'Ежедневные практики йоги и пранаямы',
        'Посещение древних храмов с трансферами',
        'Трансфер из/в аэропорт Мангалора',
        'Образовательный семинар по Аюрведе и Пранаяме',
      ],
      en: [
        'Individual Ayurvedic doctor consultation',
        'Daily doctor supervision',
        'Medicines and procedures',
        'Ayurvedic procedures (2-3 daily)',
        'Three meals a day Ayurvedic food',
        'Accommodation at clinic (double occupancy)',
        'Daily yoga and pranayama practices',
        'Visits to ancient temples with transfers',
        'Transfer from/to Mangalore airport',
        'Educational seminar on Ayurveda and Pranayama',
      ],
    },
    notIncluded: {
      ru: [
        'Авиабилеты до Мангалора и обратно',
        'Виза в Индию',
        'Индивидуальные консультации со мной (по запросу)',
        'Консультации с ведическим астрологом',
        'Ягьи и хомы (по желанию, оплачиваются отдельно)',
        'Лекарства для приёма после возвращения домой',
      ],
      en: [
        'Flight tickets to/from Mangalore',
        'Indian visa',
        'Individual consultations with me (upon request)',
        'Consultations with Vedic astrologer',
        'Yagyas and homas (optional, paid separately)',
        'Medicines for post-return home intake',
      ],
    },
    imageUrl: '/images/admin-retrite/retrit2.JPG',
    maxParticipants: 12,
    isActive: true,
    order: 2,
  },
];

async function seedRetreats() {
  try {
    await dbConnect();
    
    // Clear existing retreats
    await Retreat.deleteMany({});
    console.log('Cleared existing retreats');
    
    // Insert new retreats
    const result = await Retreat.insertMany(retreatsData);
    console.log(`Successfully seeded ${result.length} retreats`);
    
    process.exit(0);
  } catch (error) {
    console.error('Error seeding retreats:', error);
    process.exit(1);
  }
}

seedRetreats();
