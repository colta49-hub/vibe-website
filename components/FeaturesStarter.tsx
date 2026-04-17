'use client'

import { useEffect, useRef, useState } from 'react'
import { useI18n } from '@/lib/i18n-context'

function useScrollFade() {
  const ref = useRef<HTMLDivElement>(null)
  const [visible, setVisible] = useState(false)
  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => { if (entry.isIntersecting) setVisible(true) }, { threshold: 0.15 })
    if (ref.current) observer.observe(ref.current)
    return () => observer.disconnect()
  }, [])
  return { ref, visible }
}

export default function FeaturesStarter() {
  const { t } = useI18n()
  const card1 = useScrollFade()
  const card2 = useScrollFade()
  const card3 = useScrollFade()
  const title = useScrollFade()

  return (
    <section id="features" className="py-28 px-6" style={{ background: 'linear-gradient(180deg, #2c1810 0%, #5c3520 20%, #8b5e3c 45%, #c9a07a 70%, #e8d5b0 100%)' }}>
      <div className="max-w-6xl mx-auto">

        <div ref={title.ref} className={`mb-20 transition-all duration-1000 ${title.visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <h2 className="text-5xl md:text-7xl font-bold text-white leading-tight max-w-3xl" style={{ textShadow: '0 4px 30px rgba(0,0,0,0.5)' }}>
            {t('features', 'titlu')} <span style={{ background: 'linear-gradient(90deg, #fcd34d, #f59e0b, #fcd34d)', backgroundSize: '200% auto', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text', animation: 'shimmer 3s linear infinite' }}>{t('features', 'titluAuriu')}</span>
          </h2>
          <p className="text-white/70 text-xl md:text-2xl mt-6 max-w-xl leading-relaxed">{t('features', 'subtitlu')}</p>
        </div>

        <div className="flex flex-col gap-6">

          <div ref={card1.ref} className={`group grid grid-cols-1 md:grid-cols-2 rounded-3xl overflow-hidden transition-all duration-700 delay-100 hover:shadow-[0_20px_60px_rgba(0,0,0,0.4)] ${card1.visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}>
            <div className="min-h-72 md:min-h-0 overflow-hidden self-stretch">
              <img src="https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=900&auto=format&fit=crop" alt="Cafea de specialitate" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
            </div>
            <div className="flex flex-col justify-center px-10 py-10" style={{ background: '#1c1008' }}>
              <p className="text-amber-400 text-[10px] tracking-[0.3em] uppercase font-semibold mb-4">{t('features', 'card1Tag')}</p>
              <div className="w-8 h-px bg-amber-400 mb-5" />
              <h3 className="text-2xl md:text-3xl font-bold text-white leading-tight mb-4">{t('features', 'card1Titlu')}</h3>
              <p className="text-white/60 text-sm leading-relaxed">{t('features', 'card1Desc')}</p>
              <a href="#menu" className="inline-flex items-center gap-2 mt-6 px-6 py-2.5 border border-amber-400 text-amber-400 text-sm font-semibold rounded-full hover:bg-amber-400 hover:text-black transition-all duration-300 w-fit">{t('features', 'card1Btn')}</a>
            </div>
          </div>

          <div ref={card2.ref} className={`group grid grid-cols-1 md:grid-cols-2 rounded-3xl overflow-hidden transition-all duration-700 delay-200 hover:shadow-[0_20px_60px_rgba(0,0,0,0.4)] ${card2.visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}>
            <div className="flex flex-col justify-center px-10 py-10 order-2 md:order-1" style={{ background: '#0e1a0a' }}>
              <p className="text-amber-400 text-[10px] tracking-[0.3em] uppercase font-semibold mb-4">{t('features', 'card2Tag')}</p>
              <div className="w-8 h-px bg-amber-400 mb-5" />
              <h3 className="text-2xl md:text-3xl font-bold text-white leading-tight mb-4">{t('features', 'card2Titlu')}</h3>
              <p className="text-white/60 text-sm leading-relaxed">{t('features', 'card2Desc')}</p>
            </div>
            <div className="h-64 md:h-72 overflow-hidden order-1 md:order-2">
              <img src="/cafenea-afara.jpg" alt="Locație premium" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
            </div>
          </div>

          <div ref={card3.ref} className={`group grid grid-cols-1 md:grid-cols-2 rounded-3xl overflow-hidden transition-all duration-700 delay-300 hover:shadow-[0_20px_60px_rgba(0,0,0,0.4)] ${card3.visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}>
            <div className="h-64 md:h-72 overflow-hidden">
              <img src="https://images.pexels.com/photos/1638280/pexels-photo-1638280.jpeg?w=600&auto=compress&cs=tinysrgb" alt="Opțiuni vegane" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
            </div>
            <div className="flex flex-col justify-center px-10 py-10" style={{ background: '#1a0e00' }}>
              <p className="text-amber-400 text-[10px] tracking-[0.3em] uppercase font-semibold mb-4">{t('features', 'card3Tag')}</p>
              <div className="w-8 h-px bg-amber-400 mb-5" />
              <h3 className="text-2xl md:text-3xl font-bold text-white leading-tight mb-4">{t('features', 'card3Titlu')}</h3>
              <p className="text-white/60 text-sm leading-relaxed">{t('features', 'card3Desc')}</p>
            </div>
          </div>

        </div>
      </div>
    </section>
  )
}
