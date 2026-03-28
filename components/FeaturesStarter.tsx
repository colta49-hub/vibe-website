/**
 * ⭐ FEATURES - Componenta 2: Imagini + Hover + Fade-in la scroll
 */

'use client';

import { useEffect, useRef, useState } from 'react';

function useScrollFade() {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true); },
      { threshold: 0.15 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return { ref, visible };
}

export default function FeaturesStarter() {
  const card1 = useScrollFade();
  const card2 = useScrollFade();
  const card3 = useScrollFade();
  const title = useScrollFade();

  return (
    <section id="features" className="py-28 px-6" style={{ background: 'linear-gradient(180deg, #2c1810 0%, #5c3520 20%, #8b5e3c 45%, #c9a07a 70%, #e8d5b0 100%)' }}>
      <div className="max-w-6xl mx-auto">

        {/* TITLU */}
        <div
          ref={title.ref}
          className={`mb-20 transition-all duration-1000 ${title.visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
        >
          <h2 className="text-5xl md:text-7xl font-bold text-white leading-tight max-w-3xl"
            style={{ textShadow: '0 4px 30px rgba(0,0,0,0.5)' }}
          >
            De ce <span style={{
              background: 'linear-gradient(90deg, #fcd34d, #f59e0b, #fcd34d)',
              backgroundSize: '200% auto',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
              animation: 'shimmer 3s linear infinite',
            }}>Vibe Caffè?</span>
          </h2>
          <p className="text-white/70 text-xl md:text-2xl mt-6 max-w-xl leading-relaxed">
            Experiență unică, ingrediente premium, atmosferă perfectă.
          </p>
        </div>

        {/* CARDS ORIZONTALE */}
        <div className="flex flex-col gap-6">

          {/* ROW 1 */}
          <div
            ref={card1.ref}
            className={`group grid grid-cols-1 md:grid-cols-2 rounded-3xl overflow-hidden transition-all duration-700 delay-100 hover:shadow-[0_20px_60px_rgba(0,0,0,0.4)] ${card1.visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}
          >
            {/* Poza */}
            <div className="min-h-72 md:min-h-0 overflow-hidden self-stretch">
              <img
                src="https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=900&auto=format&fit=crop"
                alt="Cafea de specialitate"
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
            </div>
            {/* Text */}
            <div className="flex flex-col justify-center px-10 py-10" style={{ background: '#1c1008' }}>
              <p className="text-amber-400 text-[10px] tracking-[0.3em] uppercase font-semibold mb-4">Specialty Coffee</p>
              <div className="w-8 h-px bg-amber-400 mb-5" />
              <h3 className="text-2xl md:text-3xl font-bold text-white leading-tight mb-4">
                Calitate din prima înghițitură
              </h3>
              <p className="text-white/60 text-sm leading-relaxed">
                Boabe selectate din cele mai bune origini, prăjite artizanal și preparate cu precizie.
              </p>
              <a href="#menu" className="inline-flex items-center gap-2 mt-6 px-6 py-2.5 border border-amber-400 text-amber-400 text-sm font-semibold rounded-full hover:bg-amber-400 hover:text-black transition-all duration-300 w-fit">
                Vezi Meniul →
              </a>
            </div>
          </div>

          {/* ROW 2 — poză dreapta */}
          <div
            ref={card2.ref}
            className={`group grid grid-cols-1 md:grid-cols-2 rounded-3xl overflow-hidden transition-all duration-700 delay-200 hover:shadow-[0_20px_60px_rgba(0,0,0,0.4)] ${card2.visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}
          >
            {/* Text */}
            <div className="flex flex-col justify-center px-10 py-10 order-2 md:order-1" style={{ background: '#0e1a0a' }}>
              <p className="text-amber-400 text-[10px] tracking-[0.3em] uppercase font-semibold mb-4">Locație</p>
              <div className="w-8 h-px bg-amber-400 mb-5" />
              <h3 className="text-2xl md:text-3xl font-bold text-white leading-tight mb-4">
                În inima orașului
              </h3>
              <p className="text-white/60 text-sm leading-relaxed">
                Ușor de găsit, greu de uitat. Te așteptăm cu un loc special pentru tine.
              </p>
            </div>
            {/* Poza */}
            <div className="h-64 md:h-72 overflow-hidden order-1 md:order-2">
              <img
                src="/cafenea-afara.jpg"
                alt="Locație premium"
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
            </div>
          </div>

          {/* ROW 3 */}
          <div
            ref={card3.ref}
            className={`group grid grid-cols-1 md:grid-cols-2 rounded-3xl overflow-hidden transition-all duration-700 delay-300 hover:shadow-[0_20px_60px_rgba(0,0,0,0.4)] ${card3.visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}
          >
            {/* Poza */}
            <div className="h-64 md:h-72 overflow-hidden">
              <img
                src="https://images.pexels.com/photos/1638280/pexels-photo-1638280.jpeg?w=600&auto=compress&cs=tinysrgb"
                alt="Opțiuni vegane"
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
            </div>
            {/* Text */}
            <div className="flex flex-col justify-center px-10 py-10" style={{ background: '#1a0e00' }}>
              <p className="text-amber-400 text-[10px] tracking-[0.3em] uppercase font-semibold mb-4">Plant-based</p>
              <div className="w-8 h-px bg-amber-400 mb-5" />
              <h3 className="text-2xl md:text-3xl font-bold text-white leading-tight mb-4">
                Opțiuni vegane
              </h3>
              <p className="text-white/60 text-sm leading-relaxed">
                Lapte de ovăz, migdale sau cocos — fiecare cafea adaptată stilului tău de viață.
              </p>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
