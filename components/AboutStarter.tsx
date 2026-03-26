'use client';

import { useEffect, useRef, useState } from 'react';

function useScrollFade(delay = 0) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const timer = setTimeout(() => {
      const observer = new IntersectionObserver(
        ([entry]) => { if (entry.isIntersecting) setVisible(true); },
        { threshold: 0.1 }
      );
      if (ref.current) observer.observe(ref.current);
      return () => observer.disconnect();
    }, delay);
    return () => clearTimeout(timer);
  }, [delay]);
  return { ref, visible };
}

const values = [
  { num: '01', title: 'Calitate', desc: 'Boabe single-origin, prăjite săptămânal. Fiecare ceașcă e un ritual pregătit cu precizie și pasiune.' },
  { num: '02', title: 'Comunitate', desc: 'Un loc unde oamenii se conectează, lucrează și se relaxează împreună. Mai mult decât o cafenea.' },
  { num: '03', title: 'Sustenabilitate', desc: 'Ambalaje compostabile, furnizori locali și cafea cu impact pozitiv asupra mediului.' },
];

export default function AboutStarter() {
  const hero = useScrollFade();
  const cards = useScrollFade();

  return (
    <section id="despre" className="relative" style={{ background: 'linear-gradient(180deg, #e8d5b0 0%, #f0e6cc 50%, #faf5ec 100%)' }}>

      {/* POZA MARE CA FUNDAL CU TEXT OVERLAY */}
      <div
        ref={hero.ref}
        className={`relative h-[85vh] overflow-hidden transition-all duration-1000 ${hero.visible ? 'opacity-100' : 'opacity-0'}`}
      >
        {/* Poza */}
        <img
          src="/cafenea.jpg"
          alt="Vibe Coffee Interior"
          className="absolute inset-0 w-full h-full object-cover"
        />

        {/* Overlay gradient */}
        <div className="absolute inset-0" style={{ background: 'linear-gradient(135deg, rgba(0,0,0,0.45) 0%, rgba(0,0,0,0.2) 50%, rgba(0,0,0,0.05) 100%)' }} />

        {/* Titlu peste poză — centrat */}
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-6">
          <p className="text-amber-400 text-xs tracking-[0.3em] uppercase font-semibold mb-6"
            style={{ textShadow: '0 0 20px rgba(245,158,11,0.8)' }}
          >
            Povestea noastră · Din 2019
          </p>
          <h2 className="text-5xl md:text-7xl font-bold text-white leading-tight"
            style={{ textShadow: '0 4px 30px rgba(0,0,0,0.8)' }}
          >
            Despre{' '}
            <span style={{
              background: 'linear-gradient(90deg, #fcd34d, #f59e0b, #fcd34d)',
              backgroundSize: '200% auto',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
              animation: 'shimmer 3s linear infinite',
            }}>
              Vibe Coffee
            </span>
          </h2>
        </div>
      </div>

      {/* TEXT + STATISTICI — sub poză */}
      <div className="max-w-3xl mx-auto px-6 py-16 text-center">

        {/* Citat */}
        <p className="text-amber-700 text-xs tracking-[0.3em] uppercase font-semibold mb-6">
          Povestea noastră
        </p>
        <blockquote className="text-2xl md:text-3xl font-semibold text-gray-800 leading-relaxed mb-8 italic">
          „Am deschis Vibe Coffee pentru că credeam că o cafea bună poate schimba tonul unei zile întregi."
        </blockquote>

        {/* Descriere */}
        <p className="text-gray-600 text-base md:text-lg leading-relaxed mb-14">
          La cafeneaua noastră, fiecare detaliu este creat pentru a oferi mai mult decât o simplă cafea — oferim un loc în care te poți opri, respira și bucura de moment. Punem accent pe gust, calitate și atmosferă, pentru ca fiecare vizită să fie una plăcută și memorabilă. Fie că vii pentru cafeaua ta preferată, pentru o întâlnire relaxată sau pentru câteva momente de liniște, aici vei găsi mereu un spațiu primitor, cald și făcut cu suflet.
        </p>

        {/* Statistici */}
        <div className="flex gap-16 md:gap-24 justify-center">
          {[
            { nr: '500+', label: 'Clienți/zi' },
            { nr: '7', label: 'Ani de pasiune' },
            { nr: '12', label: 'Origini de cafea' },
          ].map((s) => (
            <div key={s.label} className="text-center">
              <p className="text-4xl md:text-5xl font-bold" style={{
                background: 'linear-gradient(90deg, #b45309, #f59e0b, #b45309)',
                backgroundSize: '200% auto',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
                animation: 'shimmer 3s linear infinite',
              }}>{s.nr}</p>
              <p className="text-gray-500 font-semibold text-xs tracking-widest uppercase mt-2">{s.label}</p>
            </div>
          ))}
        </div>
      </div>

      {/* CARDURI VALORI */}
      <div
        ref={cards.ref}
        className={`max-w-6xl mx-auto px-6 py-20 transition-all duration-1000 ${cards.visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}
      >
        <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-amber-100 rounded-3xl overflow-hidden">
          {values.map((v, i) => (
            <div
              key={v.title}
              className="relative bg-white p-10 group hover:bg-amber-50 transition-colors duration-500 overflow-hidden"
              style={{ transitionDelay: `${i * 100}ms` }}
            >
              {/* Număr decorativ în fundal */}
              <span className="absolute -top-4 -right-2 text-[9rem] font-black text-amber-50 group-hover:text-amber-100 transition-colors duration-500 leading-none select-none pointer-events-none">
                {v.num}
              </span>

              {/* Linie aurie sus */}
              <div className="w-8 h-0.5 bg-amber-400 mb-8 group-hover:w-16 transition-all duration-500" />

              <h4 className="text-2xl font-bold text-gray-900 mb-4 relative">{v.title}</h4>
              <p className="text-gray-500 text-sm leading-relaxed relative">{v.desc}</p>
            </div>
          ))}
        </div>
      </div>

    </section>
  );
}
