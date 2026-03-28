'use client'

import { useState, useEffect } from 'react'
import { usePathname } from 'next/navigation'

const LINKS = [
  { label: 'Acasă', href: '/' },
  { label: 'De ce noi', href: '#features' },
  { label: 'Despre', href: '#despre' },
  { label: 'Meniu', href: '#menu' },
  { label: 'Locație', href: '#footer' },
]

export default function NavbarStarter() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const pathname = usePathname()
  const paginaDeschisa = pathname === '/rezervari' || pathname === '/locatie'

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const bgStyle = paginaDeschisa
    ? { background: 'rgba(28, 16, 8, 0.95)', backdropFilter: 'blur(16px)', borderBottom: '1px solid rgba(245,158,11,0.15)' }
    : {
        background: scrolled ? 'rgba(28, 16, 8, 0.95)' : 'transparent',
        backdropFilter: scrolled ? 'blur(16px)' : 'none',
        borderBottom: scrolled ? '1px solid rgba(245,158,11,0.15)' : '1px solid transparent',
      }

  return (
    <header
      className="fixed top-0 left-0 right-0 z-50 transition-all duration-500"
      style={bgStyle}
    >
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between h-16 md:h-20">

        {/* Logo */}
        <a href="#" className="flex items-center gap-2 group">
          <span className="text-xl">☕</span>
          <span className="font-black text-lg text-white tracking-tight group-hover:text-amber-400 transition-colors">
            Vibe <span style={{
              background: 'linear-gradient(90deg, #fcd34d, #f59e0b)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            }}>Caffè</span>
          </span>
        </a>

        {/* Linkuri desktop */}
        <nav className="hidden md:flex items-center gap-1">
          {LINKS.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="px-4 py-2 rounded-xl text-sm font-medium text-white/70 hover:text-white hover:bg-white/10 transition-all duration-200"
            >
              {link.label}
            </a>
          ))}
        </nav>

        {/* Buton CTA desktop */}
        <a
          href="/rezervari"
          className="hidden md:inline-flex items-center gap-2 px-5 py-2.5 rounded-2xl text-sm font-bold text-black transition-all hover:scale-105 hover:shadow-[0_8px_25px_rgba(245,158,11,0.4)]"
          style={{ background: 'linear-gradient(135deg, #fcd34d, #f59e0b)' }}
        >
          Rezervă o masă
        </a>

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
        className={`md:hidden transition-all duration-300 overflow-hidden ${menuOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'}`}
        style={{ background: 'rgba(28,16,8,0.98)', borderTop: '1px solid rgba(245,158,11,0.1)' }}
      >
        <nav className="flex flex-col px-6 py-4 gap-1">
          {LINKS.map((link) => (
            <a
              key={link.label}
              href={link.href}
              onClick={() => setMenuOpen(false)}
              className="px-4 py-3 rounded-xl text-sm font-medium text-white/70 hover:text-white hover:bg-white/10 transition-all"
            >
              {link.label}
            </a>
          ))}
          <a
            href="/rezervari"
            onClick={() => setMenuOpen(false)}
            className="mt-3 px-4 py-3 rounded-2xl text-sm font-bold text-black text-center transition-all"
            style={{ background: 'linear-gradient(135deg, #fcd34d, #f59e0b)' }}
          >
            Rezervă o masă
          </a>
        </nav>
      </div>

    </header>
  )
}
