'use client'

import { useState, useEffect, useRef } from 'react'
import { usePathname } from 'next/navigation'
import { useI18n, LIMBI } from '@/lib/i18n-context'

export default function NavbarStarter() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const [langOpen, setLangOpen] = useState(false)
  const pathname = usePathname()
  const paginaDeschisa = pathname === '/rezervari' || pathname === '/locatie'
  const langRef = useRef<HTMLDivElement>(null)
  const { t, limba, setLimba, limbaInfo } = useI18n()

  const LINKS = [
    { label: t('nav', 'acasa'), href: '/' },
    { label: t('nav', 'deceNoi'), href: '#features' },
    { label: t('nav', 'despre'), href: '#despre' },
    { label: t('nav', 'meniu'), href: '#menu' },
    { label: t('nav', 'locatie'), href: '#footer' },
  ]

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    function handler(e: MouseEvent) {
      if (langRef.current && !langRef.current.contains(e.target as Node)) {
        setLangOpen(false)
      }
    }
    document.addEventListener('mousedown', handler)
    return () => document.removeEventListener('mousedown', handler)
  }, [])

  const bgStyle = paginaDeschisa
    ? { background: 'rgba(28, 16, 8, 0.95)', backdropFilter: 'blur(16px)', borderBottom: '1px solid rgba(245,158,11,0.15)' }
    : {
        background: scrolled ? 'rgba(28, 16, 8, 0.95)' : 'transparent',
        backdropFilter: scrolled ? 'blur(16px)' : 'none',
        borderBottom: scrolled ? '1px solid rgba(245,158,11,0.15)' : '1px solid transparent',
      }

  return (
    <header className="fixed top-0 left-0 right-0 z-50 transition-all duration-500" style={bgStyle}>
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between h-16 md:h-20">

        {/* Logo */}
        <a href="#" className="flex items-center gap-2 group">
          <span className="text-xl">☕</span>
          <span className="font-black text-lg text-white tracking-tight group-hover:text-amber-400 transition-colors">
            Vibe <span style={{ background: 'linear-gradient(90deg, #fcd34d, #f59e0b)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>Caffè</span>
          </span>
        </a>

        {/* Linkuri desktop */}
        <nav className="hidden md:flex items-center gap-1">
          {LINKS.map((link) => (
            <a key={link.label} href={link.href} className="px-4 py-2 rounded-xl text-sm font-medium text-white/70 hover:text-white hover:bg-white/10 transition-all duration-200">
              {link.label}
            </a>
          ))}
        </nav>

        {/* Dreapta: selector limbă + buton CTA */}
        <div className="hidden md:flex items-center gap-3">

          {/* Selector limbă */}
          <div ref={langRef} className="relative">
            <button
              onClick={() => setLangOpen(!langOpen)}
              className="flex items-center gap-1.5 px-3 py-2 rounded-xl text-sm font-medium text-white/70 hover:text-white hover:bg-white/10 transition-all duration-200"
            >
              <span className="text-base">{limbaInfo.flag}</span>
              <span className="text-xs opacity-70">{limbaInfo.cod.toUpperCase()}</span>
              <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className={`transition-transform duration-200 ${langOpen ? 'rotate-180' : ''}`}><polyline points="6 9 12 15 18 9"/></svg>
            </button>

            {langOpen && (
              <div
                className="absolute right-0 top-full mt-2 w-48 rounded-2xl overflow-hidden shadow-2xl z-50"
                style={{ background: 'rgba(28,16,8,0.98)', border: '1px solid rgba(245,158,11,0.2)', backdropFilter: 'blur(16px)' }}
              >
                <div className="max-h-80 overflow-y-auto py-2">
                  {LIMBI.map((l) => (
                    <button
                      key={l.cod}
                      onClick={() => { setLimba(l.cod); setLangOpen(false) }}
                      className={`w-full flex items-center gap-3 px-4 py-2.5 text-sm transition-all duration-150 text-left ${limba === l.cod ? 'text-amber-400 bg-amber-400/10' : 'text-white/70 hover:text-white hover:bg-white/10'}`}
                    >
                      <span className="text-base">{l.flag}</span>
                      <span>{l.nume}</span>
                      {limba === l.cod && <span className="ml-auto text-amber-400">✓</span>}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Buton CTA */}
          <a
            href="/rezervari"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-2xl text-sm font-bold text-black transition-all hover:scale-105 hover:shadow-[0_8px_25px_rgba(245,158,11,0.4)]"
            style={{ background: 'linear-gradient(135deg, #fcd34d, #f59e0b)' }}
          >
            {t('nav', 'rezerva')}
          </a>
        </div>

        {/* Hamburger mobil */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="md:hidden flex flex-col gap-1.5 p-2 rounded-xl hover:bg-white/10 transition-colors"
          aria-label="Meniu"
        >
          <span className={`block w-5 h-0.5 bg-white transition-all duration-300 ${menuOpen ? 'rotate-45 translate-y-2' : ''}`} />
          <span className={`block w-5 h-0.5 bg-white transition-all duration-300 ${menuOpen ? 'opacity-0' : ''}`} />
          <span className={`block w-5 h-0.5 bg-white transition-all duration-300 ${menuOpen ? '-rotate-45 -translate-y-2' : ''}`} />
        </button>
      </div>

      {/* Meniu mobil */}
      <div
        className={`md:hidden transition-all duration-300 overflow-hidden ${menuOpen ? 'max-h-[32rem] opacity-100' : 'max-h-0 opacity-0'}`}
        style={{ background: 'rgba(28,16,8,0.98)', borderTop: '1px solid rgba(245,158,11,0.1)' }}
      >
        <nav className="flex flex-col px-6 py-4 gap-1">
          {LINKS.map((link) => (
            <a key={link.label} href={link.href} onClick={() => setMenuOpen(false)} className="px-4 py-3 rounded-xl text-sm font-medium text-white/70 hover:text-white hover:bg-white/10 transition-all">
              {link.label}
            </a>
          ))}

          {/* Selector limbă mobil */}
          <div className="mt-3 pt-3" style={{ borderTop: '1px solid rgba(255,255,255,0.08)' }}>
            <p className="text-white/30 text-xs uppercase tracking-widest px-4 mb-2">Limbă / Language</p>
            <div className="grid grid-cols-4 gap-1">
              {LIMBI.map((l) => (
                <button
                  key={l.cod}
                  onClick={() => { setLimba(l.cod); setMenuOpen(false) }}
                  className={`flex flex-col items-center gap-0.5 p-2 rounded-xl text-xs transition-all ${limba === l.cod ? 'bg-amber-400/20 text-amber-400' : 'text-white/50 hover:bg-white/10 hover:text-white'}`}
                >
                  <span className="text-lg">{l.flag}</span>
                  <span className="text-[9px] uppercase tracking-wide">{l.cod}</span>
                </button>
              ))}
            </div>
          </div>

          <a href="/rezervari" onClick={() => setMenuOpen(false)} className="mt-3 px-4 py-3 rounded-2xl text-sm font-bold text-black text-center transition-all" style={{ background: 'linear-gradient(135deg, #fcd34d, #f59e0b)' }}>
            {t('nav', 'rezerva')}
          </a>
        </nav>
      </div>
    </header>
  )
}
