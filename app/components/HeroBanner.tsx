"use client";

import { useState } from "react";

/*
  HeroBanner — "Virtual Coins Platform" hero section.
  
  Usage:
    import HeroBanner from "@/components/HeroBanner";
    <HeroBanner />
  
  Requirements:
    - Add Google Fonts to your layout.tsx / _document:
      Cormorant Garamond (700) + Noto Sans (400, 600)
    - Place character images in /public/images/:
        hero-zeus.png, hero-athena.png, hero-poseidon.png
      (or swap src paths below)
    - Tailwind CSS configured in the project
    
  Notes:
    - All gradient / glow effects are recreated with CSS.
    - Images use next/image for optimization; swap to <img> if needed.
    - The component is fully responsive.
*/

/* ------------------------------------------------------------------ */
/*  BADGE COMPONENT                                                    */
/* ------------------------------------------------------------------ */
interface BadgeProps {
  children: React.ReactNode;
}

function Badge({ children }: BadgeProps) {
  return (
    <div
      className="relative flex items-center justify-center px-4 py-3 rounded-md text-center text-sm font-medium leading-snug"
      style={{
        width: 146,
        height: 86,
        background: "rgba(255,255,255,0.25)",
        border: "1px solid transparent",
        borderImage:
          "linear-gradient(135deg, #a98321, #ffe9b1, #a98321) 1",
        color: "#4c4741",
      }}
    >
      {children}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  BUTTON COMPONENTS                                                  */
/* ------------------------------------------------------------------ */
interface ButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
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
        color: "transparent",
        backgroundClip: "padding-box",
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
/*  MAIN HERO BANNER                                                   */
/* ------------------------------------------------------------------ */
export default function HeroBanner() {
  return (
    <section className="w-full flex justify-center px-4 py-6 md:px-8 lg:px-12">
      {/* Outer wrapper — marble-ish subtle bg */}
      <div
        className="relative w-full overflow-hidden rounded-[25px]"
        style={{
          maxWidth: 1180,
          minHeight: 447,
          background: "#81c6f0",
        }}
      >
        {/* ---- Blurred ellipse glows ---- */}
        <div
          className="absolute pointer-events-none"
          style={{
            width: 491,
            height: 509,
            left: -193,
            top: -143,
            borderRadius: "50%",
            background: "#bee9f4",
            filter: "blur(200px)",
          }}
        />
        <div
          className="absolute pointer-events-none"
          style={{
            width: 426,
            height: 367,
            left: 150,
            top: -81,
            borderRadius: "50%",
            background: "#bee9f4",
            filter: "blur(200px)",
          }}
        />
        <div
          className="absolute pointer-events-none"
          style={{
            width: 223,
            height: 187,
            left: -41,
            bottom: -50,
            borderRadius: "50%",
            background: "#bee9f4",
            filter: "blur(80px)",
          }}
        />
        <div
          className="absolute pointer-events-none"
          style={{
            width: 332,
            height: 220,
            left: 58,
            bottom: -70,
            borderRadius: "50%",
            background: "#bee9f4",
            filter: "blur(120px)",
          }}
        />

        {/* ---- Content grid ---- */}
        <div className="relative z-10 flex flex-col lg:flex-row min-h-[447px]">
          {/* Left — text content */}
          <div className="flex flex-col justify-center gap-5 p-8 md:p-10 lg:py-10 lg:pl-10 lg:pr-0 lg:max-w-[55%]">
            {/* Title */}
            <h1
              className="leading-[1.09] tracking-tight"
              style={{
                fontFamily: "'Cormorant Garamond', serif",
                fontWeight: 700,
                fontSize: "clamp(36px, 4.5vw, 56px)",
                background:
                  "linear-gradient(160deg, #9c7f3d, #ceaf72 52%, #9c7f3d)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                filter: "drop-shadow(0 0 50px rgba(232,250,255,0.9))",
              }}
            >
              Virtual Coins
              <br />
              Platform
            </h1>

            {/* Badges */}
            <div className="flex flex-wrap gap-2.5">
              <Badge>
                <span>
                  <strong>No Real</strong> Money Involved
                </span>
              </Badge>
              <Badge>
                <span>
                  Digital Entertainment{" "}
                  <strong>for Adults 18+</strong>
                </span>
              </Badge>
              <Badge>
                <span>
                  No Payouts
                  <br />
                  <strong>No Cash Prizes</strong>
                </span>
              </Badge>
            </div>

            {/* Description */}
            <div
              className="flex flex-col gap-2 text-base leading-relaxed"
              style={{
                color: "#4c4741",
                fontFamily: "'Noto Sans', sans-serif",
                maxWidth: 504,
              }}
            >
              <p>
                Experience casino-inspired gameplay using Virtual Coins
                only.
              </p>
              <p>
                There are no withdrawals, no financial rewards, and no
                real-money play – just entertainment.
              </p>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-wrap gap-4 mt-1">
              <GoldButton>Sign Up</GoldButton>
              <DarkButton>Start Playing</DarkButton>
              <WhiteButton>Get Coins</WhiteButton>
            </div>
          </div>

          {/* Right — character images */}
          <div className="relative flex-1 min-h-[280px] lg:min-h-0">
            {/*
              Replace these <img> tags with <Image> from next/image
              and provide your actual character PNGs.
              
              The positioning mimics the Figma layout where characters
              overlap and extend beyond the container.
            */}
            {/* Zeus (center-left character) */}
            <img
              src="/images/hero-zeus.png"
              alt="Zeus character"
              className="absolute bottom-0 object-contain pointer-events-none"
              style={{
                height: "100%",
                maxHeight: 502,
                left: "0%",
                zIndex: 2,
              }}
            />
            {/* Athena (center character) */}
            <img
              src="/images/hero-athena.png"
              alt="Athena character"
              className="absolute bottom-0 object-contain pointer-events-none"
              style={{
                height: "95%",
                maxHeight: 446,
                left: "25%",
                zIndex: 3,
              }}
            />
            {/* Poseidon (right character) */}
            <img
              src="/images/hero-poseidon.png"
              alt="Poseidon character"
              className="absolute bottom-0 object-contain pointer-events-none"
              style={{
                height: "100%",
                maxHeight: 441,
                right: "-5%",
                zIndex: 1,
              }}
            />
          </div>
        </div>
      </div>
    </section>
  );
}