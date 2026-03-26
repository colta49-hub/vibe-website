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
    <section id="features" className="py-28 px-6" style={{ background: 'linear-gradient(180deg, #0e0e0e 0%, #2a1f15 20%, #e8d9c0 55%, #f0ebe0 100%)' }}>
      <div className="max-w-6xl mx-auto">

        {/* TITLU */}
        <div
          ref={title.ref}
          className={`mb-20 transition-all duration-1000 ${title.visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
        >
          <p className="text-amber-400 text-xs tracking-[0.3em] uppercase font-semibold mb-4">
            De ce Vibe Coffee
          </p>
          <h2 className="text-5xl md:text-7xl font-bold text-white leading-tight max-w-2xl">
            Experiența <br />
            <span className="italic font-light text-white/50">care rămâne</span>
          </h2>
        </div>

        {/* BENTO GRID */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4 md:h-[580px]">

          {/* CARD MARE — stânga, 3 coloane, full height */}
          <div
            ref={card1.ref}
            className={`md:col-span-3 md:row-span-2 relative rounded-3xl overflow-hidden group cursor-pointer
              transition-all duration-700 delay-100
              hover:shadow-[0_30px_60px_rgba(0,0,0,0.5)] hover:-translate-y-1
              ${card1.visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}
          >
            <img
              src="https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=900&auto=format&fit=crop"
              alt="Cafea de specialitate"
              className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent" />
            <div className="absolute bottom-0 left-0 p-8 md:p-10">
              <div className="w-8 h-px bg-amber-400 mb-6" />
              <h3 className="text-3xl md:text-4xl font-bold text-white mb-3 leading-tight">
                Calitate din<br />prima înghițitură
              </h3>
              <p className="text-white/70 text-base leading-relaxed max-w-sm">
                Boabe selectate din cele mai bune origini, prăjite artizanal și preparate cu precizie.
              </p>
              <a
                href="#menu"
                className="inline-block mt-6 px-6 py-2.5 border border-white/30 text-white text-sm font-semibold rounded-full hover:border-amber-400 hover:text-amber-400 transition-all duration-300"
              >
                Vezi Meniul →
              </a>
            </div>
          </div>

          {/* CARD MIC 1 — dreapta sus */}
          <div
            ref={card2.ref}
            className={`md:col-span-2 relative rounded-3xl overflow-hidden group cursor-pointer
              transition-all duration-700 delay-200
              hover:shadow-[0_30px_60px_rgba(0,0,0,0.5)] hover:-translate-y-1
              ${card2.visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}
          >
            <img
              src="https://images.unsplash.com/photo-1554118811-1e0d58224f24?w=600&auto=format&fit=crop"
              alt="Locație premium"
              className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
            <div className="absolute bottom-0 left-0 p-6 md:p-8">
              <p className="text-amber-400 text-[10px] tracking-widest uppercase font-semibold mb-2">Locație</p>
              <h3 className="text-xl md:text-2xl font-bold text-white leading-snug">
                În inima orașului
              </h3>
            </div>
          </div>

          {/* CARD MIC 2 — dreapta jos */}
          <div
            ref={card3.ref}
            className={`md:col-span-2 relative rounded-3xl overflow-hidden group cursor-pointer
              transition-all duration-700 delay-300
              hover:shadow-[0_30px_60px_rgba(0,0,0,0.5)] hover:-translate-y-1
              ${card3.visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}
          >
            <img
              src="https://images.pexels.com/photos/1638280/pexels-photo-1638280.jpeg?w=600&auto=compress&cs=tinysrgb"
              alt="Opțiuni vegane"
              className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
            <div className="absolute bottom-0 left-0 p-6 md:p-8">
              <p className="text-amber-400 text-[10px] tracking-widest uppercase font-semibold mb-2">Plant-based</p>
              <h3 className="text-xl md:text-2xl font-bold text-white leading-snug">
                Opțiuni vegane
              </h3>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
