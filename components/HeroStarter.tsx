/**
 * 🎯 HERO STARTER - Versiunea simplă pentru cursanți
 *
 * Aceasta este versiunea MINIMALISTĂ de la care plecăm în curs.
 * Fără animații, fără video, fără JavaScript complex.
 * Doar HTML + Tailwind CSS = fundația de bază.
 */

import Image from "next/image";

const BLUR_DATA_URL =
  "data:image/webp;base64,UklGRnAAAABXRUJQVlA4WAoAAAAQAAAACQAABQAAQUxQSBEAAAABD9D/iAgIZJMvf+4YIvofOgBWUDggOAAAABACAJ0BKgoABgAFQHwlmAJ0AR6S2XvtRIAA9qROgg6yrU9z1m+iLcNLYRaxe9f0CZOtxV+5IAAA";

export default function HeroStarter() {

  return (
    <section className="relative min-h-screen overflow-hidden">

      {/* IMAGE BACKGROUND — next/image: WebP automat, priority (LCP), blur-up LQIP, responsive srcset */}
      <div
        className="absolute inset-0"
        style={{ animation: 'kenburns 20s ease-in-out infinite alternate' }}
      >
        <Image
          src="/hero-coffee.png"
          alt=""
          aria-hidden="true"
          fill
          priority
          sizes="100vw"
          quality={85}
          placeholder="blur"
          blurDataURL={BLUR_DATA_URL}
          className="object-cover"
        />
      </div>

      {/* Gradient — puternic stânga-jos, transparent dreapta-sus */}
      <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/30 to-transparent" />
      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />

      {/* CONȚINUT PRINCIPAL — centrat */}
      <div className="relative z-10 w-full max-w-5xl mx-auto px-6 sm:px-16 flex flex-col items-center justify-start min-h-screen text-center pt-36 sm:pt-44">

        {/* LOGO */}
        <div
          className="mb-8"
          style={{ animation: 'fadeInUp 0.8s ease 0.1s both' }}
        >
          <img src="/logo-vibe-v1.svg" alt="Vibe Caffè" className="h-16 mx-auto" />
        </div>

        {/* TITLU */}
        <h1
          className="text-5xl sm:text-9xl md:text-[11rem] font-bold leading-none mb-4 sm:mb-6 text-white"
          style={{
            animation: 'fadeInUp 0.8s ease 0.3s both',
            textShadow: '0 4px 30px rgba(0,0,0,0.8), 0 2px 10px rgba(0,0,0,0.6)',
          }}
        >
          <span className="block font-light italic opacity-90">Mă simți.....</span>
          <span className="block">Mă vrei din nou.</span>
        </h1>

        {/* LINIE DECORATIVĂ */}
        <div
          className="w-16 h-px bg-white/50 mb-4 sm:mb-5"
          style={{ animation: 'fadeInUp 0.8s ease 0.5s both' }}
        />

        {/* SUBTITLU */}
        <p
          className="text-4xl sm:text-6xl md:text-7xl font-bold leading-snug"
          style={{
            background: 'linear-gradient(90deg, rgba(255,255,255,0.6), #ffffff, #ffffff, #fef3c7, #ffffff, #ffffff, rgba(255,255,255,0.6))',
            backgroundSize: '300% auto',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
            animation: 'fadeInUp 0.8s ease 0.6s both, shimmer 6s ease-in-out infinite',
            filter: 'drop-shadow(0 4px 20px rgba(0,0,0,0.7)) drop-shadow(0 2px 8px rgba(0,0,0,0.5))',
          }}
        >
          Cafeaua care te seduce din prima înghițitură
        </p>

        {/* BUTOANE CTA */}
        <div
          className="flex flex-col sm:flex-row flex-wrap justify-center gap-3 mt-6 sm:mt-8 w-full sm:w-auto"
          style={{ animation: 'fadeInUp 0.8s ease 0.8s both' }}
        >
          <a
            href="#menu"
            className="px-6 py-2.5 text-sm bg-amber-600 text-white font-semibold rounded-full transition-all duration-300 hover:scale-105 hover:shadow-[0_8px_30px_rgba(180,83,9,0.6)]"
          >
            Vezi Meniul
          </a>
          <a
            href="#footer"
            className="px-6 py-2.5 text-sm border-2 border-white text-white font-semibold rounded-full transition-all duration-300 hover:scale-105 hover:shadow-[0_8px_30px_rgba(255,255,255,0.3)]"
          >
            Vizitează-ne
          </a>
          <a
            href="/rezervari"
            className="px-6 py-2.5 text-sm border-2 border-amber-400 text-white font-semibold rounded-full transition-all duration-300 hover:scale-105 hover:bg-amber-400 hover:text-black"
          >
            Rezervă o masă
          </a>
        </div>

      </div>

      {/* Tranziție spre secțiunea următoare */}
      <div className="absolute bottom-0 left-0 right-0 h-32 pointer-events-none" style={{ background: 'linear-gradient(to bottom, transparent, #2c1810)' }} />

      {/* SCROLL INDICATOR */}
      <div className="absolute bottom-8 left-0 right-0 flex justify-center z-10">
        <a href="#features" className="scroll-arrow group relative flex flex-col items-center gap-1">
          {/* pată de ceață */}
          <div className="absolute w-48 h-24 rounded-full bg-white/30 group-hover:bg-amber-400/30 blur-3xl transition-colors duration-300" />
          <span className="relative text-white group-hover:text-amber-400 transition-colors duration-300 text-[11px] tracking-widest uppercase font-semibold">scroll</span>
          <svg width="28" height="28" viewBox="0 0 24 24" fill="none" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="relative stroke-white group-hover:stroke-amber-400 transition-colors duration-300">
            <polyline points="6 9 12 15 18 9" />
          </svg>
        </a>
      </div>

    </section>
  );
}
