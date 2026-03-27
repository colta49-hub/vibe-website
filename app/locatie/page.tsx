'use client'

export default function LocatiePage() {
  return (
    <div className="min-h-screen" style={{ background: 'linear-gradient(135deg, #0f172a 0%, #134e4a 50%, #0f172a 100%)' }}>
      <div className="max-w-5xl mx-auto px-6 py-16">

        {/* Header */}
        <div className="text-center mb-12">
          <p className="text-teal-400 text-sm font-semibold tracking-[0.3em] uppercase mb-3">Unde ne găsești</p>
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-4">
            Vibe <span style={{ color: '#14B8A6' }}>Caffè</span>
          </h1>
          <p className="text-white/60 text-lg">2 Pound Hill Parade, Crawley, UK RH10 7EA</p>
        </div>

        {/* Google Maps */}
        <div className="rounded-3xl overflow-hidden mb-10 border border-white/10"
          style={{ boxShadow: '0 25px 60px rgba(0,0,0,0.4)' }}>
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2498.5!2d-0.1566!3d51.1189!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x4875f1b0b0b0b0b1%3A0x0!2s2+Pound+Hill+Parade%2C+Crawley+RH10+7EA%2C+UK!5e0!3m2!1sro!2sro!4v1"
            width="100%"
            height="420"
            style={{ border: 0 }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            title="Locație Vibe Caffè"
          />
        </div>

        {/* Grid info */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

          {/* Orar */}
          <div className="backdrop-blur-md rounded-2xl border border-white/10 p-6"
            style={{ background: 'rgba(255,255,255,0.07)' }}>
            <div className="flex items-center gap-3 mb-5">
              <div className="w-10 h-10 rounded-xl flex items-center justify-center text-xl"
                style={{ background: 'rgba(20,184,166,0.2)' }}>
                🕐
              </div>
              <h2 className="text-white font-bold text-lg">Orar</h2>
            </div>
            <div className="flex flex-col gap-3 text-sm">
              {[
                { zile: 'Luni – Vineri', ore: '07:00 – 20:00' },
                { zile: 'Sâmbătă', ore: '08:00 – 21:00' },
                { zile: 'Duminică', ore: '09:00 – 18:00' },
              ].map(({ zile, ore }) => (
                <div key={zile} className="flex justify-between items-center py-2 border-b border-white/10 last:border-0">
                  <span className="text-white/60">{zile}</span>
                  <span className="text-teal-300 font-semibold">{ore}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Adresă */}
          <div className="backdrop-blur-md rounded-2xl border border-white/10 p-6"
            style={{ background: 'rgba(255,255,255,0.07)' }}>
            <div className="flex items-center gap-3 mb-5">
              <div className="w-10 h-10 rounded-xl flex items-center justify-center text-xl"
                style={{ background: 'rgba(20,184,166,0.2)' }}>
                📍
              </div>
              <h2 className="text-white font-bold text-lg">Adresă</h2>
            </div>
            <div className="flex flex-col gap-3 text-sm">
              <p className="text-white/80 leading-relaxed">
                2 Pound Hill Parade<br />
                Crawley<br />
                West Sussex<br />
                RH10 7EA, UK
              </p>
              <a
                href="https://maps.google.com/?q=2+Pound+Hill+Parade+Crawley+RH10+7EA+UK"
                target="_blank"
                rel="noopener noreferrer"
                className="mt-2 inline-flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold text-white transition-all hover:scale-105"
                style={{ background: 'rgba(20,184,166,0.3)', border: '1px solid rgba(20,184,166,0.4)' }}
              >
                Deschide în Google Maps →
              </a>
            </div>
          </div>

          {/* Contact */}
          <div className="backdrop-blur-md rounded-2xl border border-white/10 p-6"
            style={{ background: 'rgba(255,255,255,0.07)' }}>
            <div className="flex items-center gap-3 mb-5">
              <div className="w-10 h-10 rounded-xl flex items-center justify-center text-xl"
                style={{ background: 'rgba(249,115,22,0.2)' }}>
                📞
              </div>
              <h2 className="text-white font-bold text-lg">Contact</h2>
            </div>
            <div className="flex flex-col gap-4 text-sm">
              <div>
                <p className="text-white/40 text-xs mb-1 uppercase tracking-wider">Telefon</p>
                <a href="tel:+441293000000" className="text-white/80 hover:text-teal-300 transition-colors">
                  +44 1293 000 000
                </a>
              </div>
              <div>
                <p className="text-white/40 text-xs mb-1 uppercase tracking-wider">Email</p>
                <a href="mailto:hello@vibecaffe.co.uk" className="text-white/80 hover:text-teal-300 transition-colors">
                  hello@vibecaffe.co.uk
                </a>
              </div>
              <div>
                <p className="text-white/40 text-xs mb-1 uppercase tracking-wider">Rezervări</p>
                <a href="/rezervari"
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold text-white transition-all hover:scale-105"
                  style={{ background: 'rgba(249,115,22,0.3)', border: '1px solid rgba(249,115,22,0.4)' }}>
                  Rezervă o masă →
                </a>
              </div>
            </div>
          </div>

        </div>

        {/* Înapoi */}
        <div className="text-center mt-10">
          <a href="/" className="text-white/40 hover:text-white/80 text-sm transition-colors">
            ← Înapoi la site
          </a>
        </div>

      </div>
    </div>
  )
}
