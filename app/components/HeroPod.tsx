"use client";

/*
  PromoCards — Three promotional card blocks below the hero.
  
  Layout (desktop):
    ┌──────────────┐  ┌──────────────────────┐
    │ Featured Game │  │                      │
    ├──────────────┤  │   Bonus Features      │
    │ Start Your   │  │                      │
    │ Experience   │  │                      │
    └──────────────┘  └──────────────────────┘

  Requirements:
    - Same fonts as HeroBanner: Cormorant Garamond (700) + Noto Sans (400, 600)
    - Place images in /public/images/:
        card-marble-bg.jpg    — marble texture for card backgrounds
        card-game-thumb.png   — Gatsby Gold game thumbnail
        card-athena.png       — Athena character for "Start Your Experience"
        card-medusa.png       — Medusa character for "Bonus Features"
    - Tailwind CSS configured
*/

/* ------------------------------------------------------------------ */
/*  SHARED STYLES                                                      */
/* ------------------------------------------------------------------ */
const goldGradientText = {
  background: "linear-gradient(180deg, #9d803e, #d1b064 55%, #9d803e)",
  WebkitBackgroundClip: "text",
  WebkitTextFillColor: "transparent",
};

const cardBase = {
  borderRadius: 3,
  overflow: "hidden" as const,
  position: "relative" as const,
  /* Marble-like background fallback */
  background:
    "linear-gradient(135deg, #f5f0ea 0%, #e8e2da 25%, #f7f3ef 50%, #ebe5dd 75%, #f5f0ea 100%)",
};

const cardBorder = {
  border: "1px solid",
  borderImage:
    "linear-gradient(135deg, #c9b98a 0%, #e0d5b8 30%, #a89868 60%, #d4c8a0 100%) 1",
};

/* ------------------------------------------------------------------ */
/*  BUTTON COMPONENTS (reused from HeroBanner style)                   */
/* ------------------------------------------------------------------ */
interface ButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
}

function DarkButton({ children, onClick }: ButtonProps) {
  return (
    <button
      onClick={onClick}
      className="relative cursor-pointer rounded-[7px] px-6 py-2 text-sm font-semibold tracking-wide uppercase transition-all duration-200 hover:brightness-125 hover:scale-[1.03] active:scale-[0.98]"
      style={{
        background:
          "linear-gradient(100deg, #273b56, #3680c9 40%, #304b69)",
        border: "1px solid",
        borderImage:
          "linear-gradient(180deg, #9b9689, #ecd8a1 58%, #989178) 1",
        boxShadow: "0 2px 10px rgba(0,0,0,0.35)",
        fontFamily: "'Noto Sans', sans-serif",
      }}
    >
      <span
        style={{
          background:
            "linear-gradient(180deg, #ead58a, #fff5d5 52%, #ead58a)",
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
        }}
      >
        {children}
      </span>
    </button>
  );
}

function GoldButton({ children, onClick }: ButtonProps) {
  return (
    <button
      onClick={onClick}
      className="relative cursor-pointer rounded-[7px] px-6 py-2 text-sm font-semibold tracking-wide uppercase transition-all duration-200 hover:brightness-110 hover:scale-[1.03] active:scale-[0.98]"
      style={{
        background:
          "linear-gradient(100deg, #bd8a31, #f9e99c 40%, #bd8a31)",
        border: "1px solid",
        borderImage:
          "linear-gradient(180deg, #c4a77b, #efea9c 58%, #c4a77b) 1",
        boxShadow: "0 2px 10px rgba(0,0,0,0.35)",
        color: "#4e2e00",
        fontFamily: "'Noto Sans', sans-serif",
      }}
    >
      {children}
    </button>
  );
}

function WhiteButton({ children, onClick }: ButtonProps) {
  return (
    <button
      onClick={onClick}
      className="relative cursor-pointer rounded-[7px] px-6 py-2 text-sm font-semibold tracking-wide uppercase transition-all duration-200 hover:brightness-95 hover:scale-[1.03] active:scale-[0.98]"
      style={{
        background: "#fefefe",
        border: "1px solid",
        borderImage:
          "linear-gradient(180deg, #9b9689, #ecd8a1 58%, #989178) 1",
        boxShadow: "0 2px 10px rgba(0,0,0,0.15)",
        color: "#000",
        fontFamily: "'Noto Sans', sans-serif",
      }}
    >
      {children}
    </button>
  );
}

/* ------------------------------------------------------------------ */
/*  CARD: Featured Game                                                */
/* ------------------------------------------------------------------ */
function FeaturedGameCard() {
  return (
    <div
      className="relative flex items-start justify-between p-7"
      style={{ ...cardBase, ...cardBorder, height: 147 }}
    >
      {/* Marble bg image (optional — remove if using CSS gradient only) */}
      <img
        src="/images/card-marble-bg.jpg"
        alt=""
        className="absolute inset-0 w-full h-full object-cover opacity-40 pointer-events-none"
      />

      {/* Text content */}
      <div className="relative z-10 flex flex-col gap-2">
        <h3
          className="text-[28px] leading-[0.97] tracking-tight"
          style={{
            fontFamily: "'Cormorant Garamond', serif",
            fontWeight: 700,
            ...goldGradientText,
          }}
        >
          Featured game
        </h3>
        <p
          className="text-[15px]"
          style={{
            fontFamily: "'Noto Sans', sans-serif",
            color: "#4c4741",
          }}
        >
          Gatsey GOLD by Hacksaw Gaming
        </p>
        <div className="mt-1">
          <DarkButton>Start Playing</DarkButton>
        </div>
      </div>

      {/* Game thumbnail */}
      <img
        src="/images/card-game-thumb.png"
        alt="Gatsby Gold"
        className="relative z-10 w-[101px] h-[99px] object-contain rounded-md flex-shrink-0"
      />
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  CARD: Start Your Experience                                        */
/* ------------------------------------------------------------------ */
function StartExperienceCard() {
  return (
    <div
      className="relative flex items-start justify-between p-7 overflow-hidden"
      style={{ ...cardBase, ...cardBorder, height: 147 }}
    >
      <img
        src="/images/card-marble-bg.jpg"
        alt=""
        className="absolute inset-0 w-full h-full object-cover opacity-40 pointer-events-none"
      />

      {/* Text */}
      <div className="relative z-10 flex flex-col gap-2">
        <h3
          className="text-[28px] leading-[0.97] tracking-tight"
          style={{
            fontFamily: "'Cormorant Garamond', serif",
            fontWeight: 700,
            ...goldGradientText,
          }}
        >
          Start your experience
        </h3>
        <p
          className="text-[15px]"
          style={{
            fontFamily: "'Noto Sans', sans-serif",
            color: "#4c4741",
          }}
        >
          Enjoy interactive gameplay using virtual coins only
        </p>
        <div className="mt-1">
          <GoldButton>Create Account</GoldButton>
        </div>
      </div>

      {/* Athena character — overflows bottom */}
      <img
        src="/images/card-athena.png"
        alt="Athena"
        className="absolute z-10 bottom-0 right-4 h-[180%] max-h-[282px] object-contain pointer-events-none"
      />
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  CARD: Bonus Features (tall, right side)                            */
/* ------------------------------------------------------------------ */
function BonusFeaturesCard() {
  return (
    <div
      className="relative flex flex-col justify-between p-7 overflow-hidden"
      style={{ ...cardBase, ...cardBorder, height: "100%" }}
    >
      <img
        src="/images/card-marble-bg.jpg"
        alt=""
        className="absolute inset-0 w-full h-full object-cover opacity-40 pointer-events-none"
      />

      {/* Text content */}
      <div className="relative z-10 flex flex-col gap-3">
        <h3
          className="text-[40px] leading-[1.06] tracking-tight"
          style={{
            fontFamily: "'Cormorant Garamond', serif",
            fontWeight: 700,
            ...goldGradientText,
          }}
        >
          Bonus
          <br />
          features
        </h3>
        <p
          className="text-[15px] max-w-[218px]"
          style={{
            fontFamily: "'Noto Sans', sans-serif",
            color: "#4c4741",
          }}
        >
          Access extra content, daily offers and additional virtual coins
          for gameplay
        </p>
      </div>

      <div className="relative z-10 mt-4">
        <WhiteButton>Get Coins</WhiteButton>
      </div>

      {/* Medusa character — positioned right side, overflowing */}
      <img
        src="/images/card-medusa.png"
        alt="Medusa"
        className="absolute z-10 bottom-0 right-[-40px] h-[110%] max-h-[690px] object-contain pointer-events-none"
      />
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  MAIN EXPORT                                                        */
/* ------------------------------------------------------------------ */
export default function PromoCards() {
  return (
    <section className="w-full flex justify-center px-4 md:px-8 lg:px-12">
      <div
        className="w-full grid grid-cols-1 lg:grid-cols-2 gap-4"
        style={{ maxWidth: 1180 }}
      >
        {/* Left column — two stacked cards */}
        <div className="flex flex-col gap-4">
          <FeaturedGameCard />
          <StartExperienceCard />
        </div>

        {/* Right column — tall bonus card */}
        <div className="min-h-[309px]">
          <BonusFeaturesCard />
        </div>
      </div>
    </section>
  );
}