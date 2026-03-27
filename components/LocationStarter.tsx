'use client'

export default function LocationStarter() {
  return (
    <section id="locatie" className="relative overflow-hidden" style={{ background: '#1c1008' }}>

      {/* Harta ca fundal full-width */}
      <div className="absolute inset-0 opacity-40">
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2498.3!2d-0.1566!3d51.1189!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x4875f1b0b0b0b0b1%3A0x0!2s2+Pound+Hill+Parade%2C+Crawley+RH10+7EA%2C+UK!5e0!3m2!1sro!2sro!4v1"
          width="100%"
          height="100%"
          style={{ border: 0, filter: 'grayscale(100%) invert(90%) sepia(20%)' }}
          allowFullScreen
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          title="Locație Vibe Caffè"
        />
      </div>

      {/* Gradient peste hartă */}
      <div className="absolute inset-0" style={{ background: 'linear-gradient(135deg, rgba(28,16,8,0.97) 0%, rgba(28,16,8,0.85) 40%, rgba(28,16,8,0.4) 100%)' }} />

      {/* Conținut */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 py-24">

        {/* Label */}
        <p className="text-amber-500 text-xs tracking-[0.4em] uppercase font-bold mb-4">Unde ne găsești</p>

        {/* Titlu mare */}
        <h2 className="text-6xl md:text-8xl font-black text-white leading-none mb-16"
          style={{ textShadow: '0 4px 40px rgba(245,158,11,0.3)' }}>
          Vibe<br />
          <span style={{
            background: 'linear-gradient(90deg, #fcd34d, #f59e0b, #fcd34d)',
            backgroundSize: '200% auto',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
            animation: 'shimmer 3s linear infinite',
          }}>Caffè.</span>
        </h2>

        {/* Grid info orizontal */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-px"
          style={{ background: 'rgba(245,158,11,0.15)', borderRadius: '24px', overflow: 'hidden' }}>

          {/* Adresă */}
          <div className="px-8 py-8" style={{ background: 'rgba(28,16,8,0.9)' }}>
            <div className="w-8 h-px bg-amber-400 mb-5" />
            <p className="text-amber-500 text-[10px] tracking-[0.3em] uppercase font-bold mb-3">Adresă</p>
            <p className="text-white font-semibold text-sm leading-relaxed">
              2 Pound Hill Parade<br />
              Crawley, RH10 7EA<br />
              <span className="text-white/40">West Sussex, UK</span>
            </p>
          </div>

          {/* Program */}
          <div className="px-8 py-8 md:col-span-2" style={{ background: 'rgba(28,16,8,0.9)' }}>
            <div className="w-8 h-px bg-amber-400 mb-5" />
            <p className="text-amber-500 text-[10px] tracking-[0.3em] uppercase font-bold mb-4">Program</p>
            <div className="flex flex-col gap-2">
              {[
                { zile: 'Luni – Vineri', ore: '07:00 – 20:00' },
                { zile: 'Sâmbătă', ore: '08:00 – 21:00' },
                { zile: 'Duminică', ore: '09:00 – 18:00' },
              ].map(({ zile, ore }) => (
                <div key={zile} className="flex justify-between items-center border-b border-white/5 pb-2 last:border-0">
                  <span className="text-white/50 text-sm">{zile}</span>
                  <span className="text-amber-400 font-bold text-sm">{ore}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Contact */}
          <div className="px-8 py-8" style={{ background: 'rgba(28,16,8,0.9)' }}>
            <div className="w-8 h-px bg-amber-400 mb-5" />
            <p className="text-amber-500 text-[10px] tracking-[0.3em] uppercase font-bold mb-3">Contact</p>
            <div className="flex flex-col gap-3">
              <a href="tel:+441293000000" className="text-white/70 hover:text-amber-400 transition-colors text-sm font-medium">
                +44 1293 000 000
              </a>
              <a href="mailto:hello@vibecaffe.co.uk" className="text-white/70 hover:text-amber-400 transition-colors text-sm font-medium">
                hello@vibecaffe.co.uk
              </a>
            </div>
          </div>

        </div>

        {/* Butoane jos */}
        <div className="flex gap-4 mt-8 flex-wrap">
          <a
            href="/rezervari"
            className="px-8 py-4 rounded-2xl text-black font-bold text-sm tracking-wide transition-all hover:scale-105 hover:shadow-[0_8px_30px_rgba(245,158,11,0.5)]"
            style={{ background: 'linear-gradient(135deg, #fcd34d, #f59e0b)' }}
          >
            Rezervă o masă →
          </a>
          <a
            href="https://maps.google.com/?q=2+Pound+Hill+Parade+Crawley+RH10+7EA+UK"
            target="_blank"
            rel="noopener noreferrer"
            className="px-8 py-4 rounded-2xl text-amber-400 font-bold text-sm tracking-wide transition-all hover:scale-105 border border-amber-400/40 hover:border-amber-400"
            style={{ background: 'rgba(245,158,11,0.08)' }}
          >
            Deschide în Google Maps →
          </a>
        </div>

      </div>
    </section>
  )
}
