'use client'

import { useI18n } from '@/lib/i18n-context'

export default function FooterStarter() {
  const { t } = useI18n()

  return (
    <footer id="footer" style={{ background: 'linear-gradient(180deg, #1c1008 0%, #0a0502 100%)' }}>
      <div className="h-px w-full" style={{ background: 'linear-gradient(90deg, transparent, #f59e0b44, #f59e0b88, #f59e0b44, transparent)' }} />

      <div className="relative w-full" style={{ height: '380px' }}>
        <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2498.3!2d-0.1566!3d51.1189!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x4875f1b0b0b0b0b1%3A0x0!2s2+Pound+Hill+Parade%2C+Crawley+RH10+7EA%2C+UK!5e0!3m2!1sro!2sro!4v1" width="100%" height="100%" style={{ border: 0, opacity: 1 }} allowFullScreen loading="lazy" referrerPolicy="no-referrer-when-downgrade" title="Locație Vibe Caffè" />
        <div className="absolute bottom-5 right-5">
          <a href="https://maps.google.com/?q=2+Pound+Hill+Parade+Crawley+RH10+7EA+UK" target="_blank" rel="noopener noreferrer" className="px-5 py-2.5 rounded-2xl text-amber-400 font-bold text-xs tracking-wide transition-all hover:scale-105 border border-amber-400/40 hover:border-amber-400" style={{ background: 'rgba(28,16,8,0.85)', backdropFilter: 'blur(8px)' }}>
            {t('footer', 'deschideHarta')}
          </a>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="text-center mb-12">
          <span className="text-3xl">☕</span>
          <h3 className="text-2xl font-black text-white mt-2" style={{ background: 'linear-gradient(90deg, #fcd34d, #f59e0b, #fcd34d)', backgroundSize: '200% auto', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text', animation: 'shimmer 3s linear infinite' }}>Vibe Caffè</h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-12">

          <div className="rounded-3xl p-7" style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(245,158,11,0.15)' }}>
            <div className="w-8 h-px bg-amber-400 mb-4" />
            <h4 className="text-xs font-bold uppercase tracking-[0.3em] text-amber-500 mb-5">{t('footer', 'contact')}</h4>
            <div className="flex flex-col gap-3">
              <a href="tel:+447706644222" className="flex items-center gap-3 text-white/60 hover:text-amber-400 transition-colors text-sm group">
                <span className="w-8 h-8 rounded-xl flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform" style={{ background: 'rgba(245,158,11,0.15)' }}>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#f59e0b" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 9.81 19.79 19.79 0 01.01 1.18 2 2 0 012 0h3a2 2 0 012 1.72 12.84 12.84 0 00.7 2.81 2 2 0 01-.45 2.11L6.09 7.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45 12.84 12.84 0 002.81.7A2 2 0 0122 14.92z"/></svg>
                </span>
                +44 7706 644 222
              </a>
              <a href="mailto:brunomimi29@gmail.com" className="flex items-center gap-3 text-white/60 hover:text-amber-400 transition-colors text-sm group">
                <span className="w-8 h-8 rounded-xl flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform" style={{ background: 'rgba(245,158,11,0.15)' }}>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#f59e0b" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>
                </span>
                brunomimi29@gmail.com
              </a>
              <div className="flex items-center gap-3 text-white/40 text-sm">
                <span className="w-8 h-8 rounded-xl flex items-center justify-center shrink-0" style={{ background: 'rgba(245,158,11,0.15)' }}>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#f59e0b" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z"/><circle cx="12" cy="10" r="3"/></svg>
                </span>
                2 Pound Hill Parade, Crawley
              </div>
            </div>
          </div>

          <div className="rounded-3xl p-7" style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(245,158,11,0.15)' }}>
            <div className="w-8 h-px bg-amber-400 mb-4" />
            <h4 className="text-xs font-bold uppercase tracking-[0.3em] text-amber-500 mb-5">{t('footer', 'program')}</h4>
            <div className="flex flex-col gap-2 text-sm">
              {[
                { z: t('footer', 'luni'), o: '07:00 – 20:00' },
                { z: t('footer', 'sambata'), o: '08:00 – 21:00' },
                { z: t('footer', 'duminica'), o: '09:00 – 18:00' },
              ].map(({ z, o }) => (
                <div key={z} className="flex justify-between border-b border-white/5 pb-2 last:border-0">
                  <span className="text-white/40">{z}</span>
                  <span className="text-amber-400 font-semibold">{o}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-3xl p-7 flex flex-col justify-between" style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(245,158,11,0.15)' }}>
            <div>
              <div className="w-8 h-px bg-amber-400 mb-4" />
              <h4 className="text-xs font-bold uppercase tracking-[0.3em] text-amber-500 mb-5">{t('footer', 'rezervari')}</h4>
              <p className="text-white/40 text-sm leading-relaxed mb-8">{t('footer', 'rezervaDesc')}</p>
            </div>
            <a href="/rezervari" className="w-full text-center py-4 rounded-2xl text-sm font-bold text-black transition-all hover:scale-105 hover:shadow-[0_8px_30px_rgba(245,158,11,0.4)]" style={{ background: 'linear-gradient(135deg, #fcd34d, #f59e0b)' }}>
              {t('footer', 'rezervaBtn')}
            </a>
          </div>

        </div>

        <div className="flex gap-3 justify-center mt-8">
          <a href="https://wa.me/447706644224" target="_blank" rel="noopener noreferrer" className="w-11 h-11 rounded-xl flex items-center justify-center transition-all hover:scale-110 hover:shadow-[0_6px_20px_rgba(37,211,102,0.4)]" style={{ background: '#25D366' }}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="white"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
          </a>
          <a href="https://www.instagram.com/olgalux_aesthetics?igsh=aXNveWc3M3dya3l4&utm_source=qr" target="_blank" rel="noopener noreferrer" className="w-11 h-11 rounded-xl flex items-center justify-center transition-all hover:scale-110 hover:shadow-[0_6px_20px_rgba(253,29,29,0.4)]" style={{ background: 'linear-gradient(135deg, #833ab4, #fd1d1d, #fcb045)' }}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="white"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/></svg>
          </a>
          <a href="https://tiktok.com/@olgalux10" target="_blank" rel="noopener noreferrer" className="w-11 h-11 rounded-xl flex items-center justify-center transition-all hover:scale-110" style={{ background: 'transparent', border: '1px solid rgba(245,158,11,0.5)' }}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="white"><path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-2.88 2.5 2.89 2.89 0 01-2.89-2.89 2.89 2.89 0 012.89-2.89c.28 0 .54.04.79.1V9.01a6.33 6.33 0 00-.79-.05 6.34 6.34 0 00-6.34 6.34 6.34 6.34 0 006.34 6.34 6.34 6.34 0 006.33-6.34V8.69a8.27 8.27 0 004.84 1.55V6.78a4.85 4.85 0 01-1.07-.09z"/></svg>
          </a>
          <a href="https://www.facebook.com/share/1Bmna1F7D4/?mibextid=wwXIfr" target="_blank" rel="noopener noreferrer" className="w-11 h-11 rounded-xl flex items-center justify-center transition-all hover:scale-110 hover:shadow-[0_6px_20px_rgba(24,119,242,0.4)]" style={{ background: '#1877F2' }}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="white"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
          </a>
        </div>
      </div>

      <div className="border-t border-white/5 py-6 text-center">
        <p className="text-white/20 text-xs tracking-widest uppercase">{t('footer', 'copyright')}</p>
      </div>
    </footer>
  )
}
