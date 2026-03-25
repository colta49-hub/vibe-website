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

      {/* CONȚINUT PRINCIPAL — jos-stânga */}
      <div className="relative z-10 w-full max-w-6xl mx-auto px-8 sm:px-16 flex flex-col justify-center min-h-screen pt-20">

        {/* TITLU */}
        <h1
          className="text-6xl sm:text-8xl md:text-[9rem] font-bold leading-none mb-6 text-white"
          style={{ animation: 'fadeInUp 0.8s ease 0.3s both' }}
        >
          <span className="block font-light italic opacity-90">Mă simți.....</span>
          <span className="block">Mă vrei din nou.</span>
        </h1>

        {/* LINIE DECORATIVĂ */}
        <div
          className="w-16 h-px bg-white/50 mb-5"
          style={{ animation: 'fadeInUp 0.8s ease 0.5s both' }}
        />

        {/* SUBTITLU */}
        <p
          className="text-2xl sm:text-3xl md:text-4xl font-medium text-white leading-snug max-w-lg"
          style={{
            background: 'linear-gradient(90deg, #b45309, #fcd34d, #fef3c7, #fbbf24, #fcd34d, #b45309)',
            backgroundSize: '200% auto',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
            animation: 'fadeInUp 0.8s ease 0.6s both, shimmer 3s linear infinite',
          }}
        >
          Cafeaua care te seduce din prima înghițitură
        </p>

        {/* BUTOANE CTA */}
        <div
          className="flex flex-row gap-5 mt-8"
          style={{ animation: 'fadeInUp 0.8s ease 0.8s both' }}
        >
          <a
            href="#menu"
            className="px-8 py-3 bg-amber-600 text-white font-semibold rounded-full transition-all duration-300 hover:scale-105 hover:shadow-[0_8px_30px_rgba(180,83,9,0.6)]"
          >
            Vezi Meniul
          </a>
          <a
            href="#contact"
            className="px-8 py-3 border-2 border-white text-white font-semibold rounded-full transition-all duration-300 hover:scale-105 hover:shadow-[0_8px_30px_rgba(255,255,255,0.3)]"
          >
            Vizitează-ne
          </a>
        </div>

      </div>

      {/* BUTON — ancorat jos-centru */}
      <div
        className="absolute bottom-10 left-0 right-0 flex justify-center z-10"
        style={{ animation: 'fadeInUp 0.8s ease 1s both' }}
      >
        <a
          href="#contact"
          className="inline-block px-10 py-3 border-2 border-white text-white font-semibold text-sm tracking-widest uppercase rounded-full hover:bg-white hover:text-amber-900 transition-all duration-300"
        >
          Începe acum
        </a>
      </div>

    </section>
  );
}
