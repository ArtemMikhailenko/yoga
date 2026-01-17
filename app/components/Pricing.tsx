'use client';

import { useLanguage } from '../context/LanguageContext';

export default function Pricing() {
  const { t } = useLanguage();

  const plans = [
    {
      number: '01',
      name: t.pricing.plans[0].name,
      price: t.pricing.plans[0].price,
      features: t.pricing.plans[0].features,
    },
    {
      number: '02',
      name: t.pricing.plans[1].name,
      price: t.pricing.plans[1].price,
      features: t.pricing.plans[1].features,
    },
    {
      number: '03',
      name: t.pricing.plans[2].name,
      price: t.pricing.plans[2].price,
      features: t.pricing.plans[2].features,
    },
  ];

  return (
    <section className="relative w-full min-h-screen lg:h-screen bg-[#e8e6e0] py-16 sm:py-16 px-4 sm:px-6 lg:px-20 flex items-center">
      <div className="max-w-7xl mx-auto w-full">
        {/* Title */}
        <h2 className="text-3xl sm:text-4xl lg:text-6xl font-light text-[#3a3a35] mb-8 sm:mb-12 lg:mb-16">
          {t.pricing.title}
        </h2>

        {/* Pricing Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-6">
          {plans.map((plan, index) => (
            <div
              key={index}
              className="border border-[#3a3a35]/20 bg-white/50 flex flex-col"
            >
              {/* Card Header */}
              <div className="border-b border-[#3a3a35]/20 p-4 sm:p-6 lg:p-8">
                <div className="text-4xl sm:text-6xl lg:text-7xl font-light text-[#3a3a35]/30 mb-2 sm:mb-4">
                  {plan.number}
                </div>
                <h3 className="text-base sm:text-lg lg:text-xl font-light text-[#3a3a35] tracking-wide uppercase">
                  {plan.name}
                </h3>
              </div>

              {/* Card Features */}
              <div className="flex-1 p-4 sm:p-6 lg:p-8">
                <ul className="space-y-3">
                  {plan.features.map((feature, idx) => (
                    <li key={idx} className="flex items-start gap-3">
                      <div className="flex-shrink-0 mt-0.5">
                        {feature.included ? (
                          <svg
                            className="w-4 h-4 text-[#3a3a35]"
                            viewBox="0 0 24 24"
                            fill="currentColor"
                          >
                            <circle cx="12" cy="12" r="10" />
                            <path
                              d="M9 12l2 2 4-4"
                              stroke="white"
                              strokeWidth="2"
                              fill="none"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                          </svg>
                        ) : (
                          <svg
                            className="w-4 h-4 text-[#3a3a35]/30"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="1.5"
                          >
                            <circle cx="12" cy="12" r="10" />
                            <path d="M15 9l-6 6M9 9l6 6" strokeLinecap="round" />
                          </svg>
                        )}
                      </div>
                      <span
                        className={`text-xs lg:text-sm font-light leading-relaxed ${
                          feature.included ? 'text-[#3a3a35]' : 'text-[#3a3a35]/40'
                        }`}
                      >
                        {feature.text}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Card Price */}
              <div className="border-t border-[#3a3a35]/20 p-6 lg:p-8">
                <div className="text-xl lg:text-2xl font-light text-[#3a3a35] tracking-wide">
                  {plan.price}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
