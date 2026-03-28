'use client'

import { useState } from 'react'

const PROGRAM = [
  { zi: 'Luni – Vineri', ore: '07:00 – 20:00' },
  { zi: 'Sâmbătă', ore: '08:00 – 21:00' },
  { zi: 'Duminică', ore: '09:00 – 18:00' },
]

function getZiuaAziIndex() {
  const z = new Date().getDay() // 0=Dum, 6=Sâm
  if (z === 0) return 2
  if (z === 6) return 1
  return 0
}

export default function PaginaLocatie() {
  const [copiat, setCopiat] = useState(false)
  const ziuaAziIndex = getZiuaAziIndex()

  function copiazaAdresa() {
    navigator.clipboard.writeText('2 Pound Hill Parade, Crawley RH10 7EA, UK')
    setCopiat(true)
    setTimeout(() => setCopiat(false), 2000)
  }

  return (
    <>
      <style>{`
        @keyframes shimmer {
          0% { background-position: 0% center; }
          100% { background-position: 200% center; }
        }
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(24px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        .fade1 { animation: fadeUp 0.6s ease both; }
        .fade2 { animation: fadeUp 0.6s 0.12s ease both; }
        .fade3 { animation: fadeUp 0.6s 0.24s ease both; }
        .fade4 { animation: fadeUp 0.6s 0.36s ease both; }
      `}</style>

      <div className="min-h-screen" style={{ background: 'linear-gradient(160deg, #2c1a0e 0%, #3d2410 40%, #1c1008 100%)' }}>

        {/* Blur orbs */}
        <div className="fixed top-24 left-1/3 w-80 h-80 rounded-full opacity-20 blur-3xl pointer-events-none" style={{ background: '#fcd34d' }} />
        <div className="fixed bottom-1/3 right-1/4 w-64 h-64 rounded-full opacity-15 blur-3xl pointer-events-none" style={{ background: '#f59e0b' }} />

        {/* Header */}
        <div className="fade1 relative pt-28 pb-10 px-6 text-center">
          <p className="text-amber-400 text-xs tracking-[0.35em] uppercase font-semibold mb-3">Vibe Caffè · Crawley, UK</p>
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-4">Unde ne găsești</h1>
          <div className="flex items-center gap-3 justify-center">
            <div className="h-px w-16" style={{ background: 'linear-gradient(90deg, transparent, #f59e0b)' }} />
            <span className="text-amber-400">✦</span>
            <div className="h-px w-16" style={{ background: 'linear-gradient(90deg, #f59e0b, transparent)' }} />
          </div>
        </div>

        <div className="max-w-5xl mx-auto px-4 pb-20">

          {/* Hartă */}
          <div className="fade2 rounded-3xl overflow-hidden mb-5" style={{
            boxShadow: '0 20px 60px rgba(0,0,0,0.5)',
            border: '1px solid rgba(245,158,11,0.15)',
            height: '400px',
            position: 'relative',
          }}>
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2498.3!2d-0.1566!3d51.1189!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x4875f1b0b0b0b0b1%3A0x0!2s2+Pound+Hill+Parade%2C+Crawley+RH10+7EA%2C+UK!5e0!3m2!1sro!2sro!4v1"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Locație Vibe Caffè"
            />
            <div className="absolute bottom-4 right-4">
              <a
                href="https://maps.google.com/?q=2+Pound+Hill+Parade+Crawley+RH10+7EA+UK"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-4 py-2.5 rounded-2xl font-bold text-xs tracking-wide transition-all hover:scale-105"
                style={{ background: 'rgba(28,16,8,0.9)', backdropFilter: 'blur(12px)', border: '1px solid rgba(245,158,11,0.35)', color: '#f59e0b' }}
              >
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#f59e0b" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z"/><circle cx="12" cy="10" r="3"/>
                </svg>
                Deschide în Google Maps →
              </a>
            </div>
          </div>

          {/* Grid 3 carduri */}
          <div className="fade3 grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">

            {/* Adresă */}
            <div className="rounded-3xl p-6" style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(245,158,11,0.12)' }}>
              <div className="w-10 h-10 rounded-2xl flex items-center justify-center mb-4" style={{ background: 'rgba(245,158,11,0.12)' }}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#f59e0b" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z"/><circle cx="12" cy="10" r="3"/>
                </svg>
              </div>
              <h3 className="text-white font-bold text-sm mb-1 tracking-wide uppercase">Adresă</h3>
              <p className="text-white/50 text-sm leading-relaxed mb-4">
                2 Pound Hill Parade<br />Crawley RH10 7EA<br />United Kingdom
              </p>
              <button
                onClick={copiazaAdresa}
                className="flex items-center gap-2 text-xs font-semibold transition-all hover:scale-105 px-3 py-2 rounded-xl"
                style={{
                  background: copiat ? 'rgba(34,197,94,0.15)' : 'rgba(245,158,11,0.1)',
                  color: copiat ? '#22c55e' : '#f59e0b',
                  border: `1px solid ${copiat ? 'rgba(34,197,94,0.3)' : 'rgba(245,158,11,0.2)'}`,
                }}
              >
                {copiat ? (
                  <><svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>Copiat!</>
                ) : (
                  <><svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="9" y="9" width="13" height="13" rx="2"/><path d="M5 15H4a2 2 0 01-2-2V4a2 2 0 012-2h9a2 2 0 012 2v1"/></svg>Copiază adresa</>
                )}
              </button>
            </div>

            {/* Program */}
            <div className="rounded-3xl p-6" style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(245,158,11,0.12)' }}>
              <div className="w-10 h-10 rounded-2xl flex items-center justify-center mb-4" style={{ background: 'rgba(245,158,11,0.12)' }}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#f59e0b" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/>
                </svg>
              </div>
              <h3 className="text-white font-bold text-sm mb-3 tracking-wide uppercase">Program</h3>
              <div className="flex flex-col gap-1">
                {PROGRAM.map(({ zi, ore }, i) => (
                  <div key={zi}
                    className="flex justify-between items-center py-2 px-2 rounded-xl"
                    style={{
                      background: i === ziuaAziIndex ? 'rgba(245,158,11,0.1)' : 'transparent',
                      borderBottom: i < PROGRAM.length - 1 ? '1px solid rgba(255,255,255,0.05)' : 'none',
                    }}
                  >
                    <span className="text-xs flex items-center gap-1.5" style={{ color: i === ziuaAziIndex ? '#fcd34d' : 'rgba(255,255,255,0.4)' }}>
                      {i === ziuaAziIndex && <span className="w-1.5 h-1.5 rounded-full bg-amber-400 inline-block" />}
                      {zi}
                    </span>
                    <span className="text-xs font-bold" style={{ color: i === ziuaAziIndex ? '#f59e0b' : 'rgba(255,255,255,0.55)' }}>{ore}</span>
                  </div>
                ))}
              </div>
              <p className="text-amber-400/40 text-[10px] mt-3">● Zi curentă evidențiată</p>
            </div>

            {/* Contact + CTA */}
            <div className="rounded-3xl p-6 flex flex-col justify-between" style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(245,158,11,0.12)' }}>
              <div>
                <div className="w-10 h-10 rounded-2xl flex items-center justify-center mb-4" style={{ background: 'rgba(245,158,11,0.12)' }}>
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#f59e0b" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 9.81 19.79 19.79 0 01.01 1.18 2 2 0 012 0h3a2 2 0 012 1.72 12.84 12.84 0 00.7 2.81 2 2 0 01-.45 2.11L6.09 7.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45 12.84 12.84 0 002.81.7A2 2 0 0122 14.92z"/>
                  </svg>
                </div>
                <h3 className="text-white font-bold text-sm mb-3 tracking-wide uppercase">Contact</h3>
                <div className="flex flex-col gap-2.5 mb-5">
                  <a href="tel:+447706644224" className="flex items-center gap-2 text-sm transition-colors group" style={{ color: 'rgba(255,255,255,0.5)' }}>
                    <span className="w-7 h-7 rounded-lg flex items-center justify-center text-xs" style={{ background: 'rgba(245,158,11,0.1)' }}>📞</span>
                    <span className="group-hover:text-amber-400 transition-colors">+44 7706 644 224</span>
                  </a>
                  <a href="https://wa.me/447706644224" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-sm transition-colors group" style={{ color: 'rgba(255,255,255,0.5)' }}>
                    <span className="w-7 h-7 rounded-lg flex items-center justify-center text-xs" style={{ background: 'rgba(37,211,102,0.1)' }}>💬</span>
                    <span className="group-hover:text-amber-400 transition-colors">WhatsApp</span>
                  </a>
                  <a href="mailto:brunomimi29@gmail.com" className="flex items-center gap-2 text-sm transition-colors group" style={{ color: 'rgba(255,255,255,0.5)' }}>
                    <span className="w-7 h-7 rounded-lg flex items-center justify-center text-xs" style={{ background: 'rgba(245,158,11,0.1)' }}>✉️</span>
                    <span className="group-hover:text-amber-400 transition-colors">brunomigi29@gmail.com</span>
                  </a>
                </div>
              </div>
              <a
                href="/rezervari"
                className="w-full text-center py-3.5 rounded-2xl text-sm font-bold text-black transition-all hover:scale-105 hover:shadow-[0_8px_30px_rgba(245,158,11,0.4)]"
                style={{ background: 'linear-gradient(135deg, #fcd34d, #f59e0b)' }}
              >
                Rezervă o masă →
              </a>
            </div>

          </div>

          {/* Cum ajungi */}
          <div className="fade4 rounded-3xl p-6" style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(245,158,11,0.08)' }}>
            <p className="text-white/40 text-xs font-bold tracking-[0.3em] uppercase mb-4">Cum ajungi</p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
              {[
                { icon: '🚗', titlu: 'Cu mașina', desc: 'Parcare gratuită disponibilă direct în fața localului și pe strada laterală.' },
                { icon: '🚌', titlu: 'Cu autobuzul', desc: 'Liniile 2, 5 și 10 opresc la Pound Hill. Stația la 2 minute de mers pe jos.' },
                { icon: '🚉', titlu: 'Cu trenul', desc: 'Gara Crawley la 10 minute cu taxiul sau 25 minute pe jos prin parc.' },
              ].map(({ icon, titlu, desc }) => (
                <div key={titlu} className="flex gap-3">
                  <span className="text-2xl mt-0.5">{icon}</span>
                  <div>
                    <p className="text-white/70 text-sm font-semibold mb-1">{titlu}</p>
                    <p className="text-white/30 text-xs leading-relaxed">{desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>
    </>
  )
}
