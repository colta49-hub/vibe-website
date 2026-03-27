export default function FooterStarter() {
  return (
    <footer id="footer" style={{ background: 'linear-gradient(180deg, #1c1008 0%, #0e0804 100%)' }}>

      {/* Linie decorativă sus */}
      <div className="h-px w-full" style={{ background: 'linear-gradient(90deg, transparent, #f59e0b44, #f59e0b88, #f59e0b44, transparent)' }} />

      {/* Conținut principal */}
      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">

          {/* Coloana 1 — Contact */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-[0.3em] text-amber-500 mb-6">Contact</h4>

            <div className="flex flex-col gap-4">
              <a
                href="tel:+441293000000"
                className="text-white/70 hover:text-amber-400 transition-colors text-sm font-medium"
              >
                +44 1293 000 000
              </a>
              <a
                href="mailto:hello@vibecaffe.co.uk"
                className="text-white/70 hover:text-amber-400 transition-colors text-sm font-medium"
              >
                hello@vibecaffe.co.uk
              </a>

              {/* WhatsApp buton */}
              <a
                href="https://wa.me/441293000000"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-3 mt-2 px-5 py-3 rounded-2xl text-sm font-semibold text-white transition-all hover:scale-105 hover:shadow-lg w-fit"
                style={{ background: '#25D366' }}
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="white">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                </svg>
                Scrie-ne pe WhatsApp
              </a>
            </div>
          </div>

          {/* Coloana 2 — Program */}
          <div className="text-center">
            <h4 className="text-xs font-bold uppercase tracking-[0.3em] text-amber-500 mb-6">Program</h4>

            <div className="flex flex-col gap-3 text-sm text-white/60 mb-8">
              <p>Lun – Vin: <span className="text-amber-400 font-semibold">07:00 – 20:00</span></p>
              <p>Sâmbătă: <span className="text-amber-400 font-semibold">08:00 – 21:00</span></p>
              <p>Duminică: <span className="text-amber-400 font-semibold">09:00 – 18:00</span></p>
            </div>

            {/* Citat */}
            <div className="inline-block px-6 py-3 rounded-2xl text-white/40 text-xs italic tracking-wide"
              style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.08)' }}>
              ↑ Respiră. Savurează. Reîncarcă.
            </div>
          </div>

          {/* Coloana 3 — Social */}
          <div className="md:text-right">
            <h4 className="text-xs font-bold uppercase tracking-[0.3em] text-amber-500 mb-6">Urmărește-ne</h4>

            <div className="flex gap-3 md:justify-end flex-wrap">

              {/* Instagram */}
              <a
                href="https://instagram.com/vibecaffe"
                target="_blank"
                rel="noopener noreferrer"
                className="w-12 h-12 rounded-2xl flex items-center justify-center transition-all hover:scale-110 hover:shadow-lg"
                style={{ background: 'linear-gradient(135deg, #833ab4, #fd1d1d, #fcb045)' }}
                aria-label="Instagram"
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="white">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/>
                </svg>
              </a>

              {/* Facebook */}
              <a
                href="https://facebook.com/vibecaffe"
                target="_blank"
                rel="noopener noreferrer"
                className="w-12 h-12 rounded-2xl flex items-center justify-center transition-all hover:scale-110 hover:shadow-lg"
                style={{ background: '#1877F2' }}
                aria-label="Facebook"
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="white">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                </svg>
              </a>

              {/* TikTok */}
              <a
                href="https://tiktok.com/@vibecaffe"
                target="_blank"
                rel="noopener noreferrer"
                className="w-12 h-12 rounded-2xl flex items-center justify-center transition-all hover:scale-110 hover:shadow-lg"
                style={{ background: '#010101' }}
                aria-label="TikTok"
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="white">
                  <path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-2.88 2.5 2.89 2.89 0 01-2.89-2.89 2.89 2.89 0 012.89-2.89c.28 0 .54.04.79.1V9.01a6.33 6.33 0 00-.79-.05 6.34 6.34 0 00-6.34 6.34 6.34 6.34 0 006.34 6.34 6.34 6.34 0 006.33-6.34V8.69a8.27 8.27 0 004.84 1.55V6.78a4.85 4.85 0 01-1.07-.09z"/>
                </svg>
              </a>

              {/* Threads */}
              <a
                href="https://threads.net/@vibecaffe"
                target="_blank"
                rel="noopener noreferrer"
                className="w-12 h-12 rounded-2xl flex items-center justify-center transition-all hover:scale-110 hover:shadow-lg"
                style={{ background: '#101010' }}
                aria-label="Threads"
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="white">
                  <path d="M12.186 24h-.007c-3.581-.024-6.334-1.205-8.184-3.509C2.35 18.44 1.5 15.586 1.472 12.01v-.017c.03-3.579.879-6.43 2.525-8.482C5.845 1.205 8.6.024 12.18 0h.014c2.746.02 5.043.725 6.826 2.098 1.677 1.29 2.858 3.13 3.509 5.467l-2.04.569c-1.104-3.96-3.898-5.984-8.304-6.015-2.91.022-5.11.936-6.54 2.717C4.307 6.504 3.616 8.914 3.589 12c.027 3.086.718 5.496 2.057 7.164 1.43 1.783 3.631 2.698 6.54 2.717 2.623-.02 4.358-.631 5.689-2.046 1.473-1.564 1.498-3.269 1.446-4.479-.022-.494-.057-1.884-1.046-2.99-.179 1.087-.497 1.989-1.009 2.728-.757 1.083-1.894 1.739-3.374 1.95-.926.13-1.876.072-2.75-.218-1.023-.34-1.777-.98-2.148-1.8-.498-1.096-.389-2.46.298-3.573.751-1.219 1.961-1.908 3.395-1.934.482-.009.962.034 1.437.143.356.083.719.202 1.088.357-.02-.32-.036-.612-.035-.87.001-.408.021-.788.059-1.143-1.14-.334-2.38-.4-3.522-.172-2.174.433-3.745 1.815-4.369 3.785-.52 1.641-.283 3.467.617 4.765.806 1.163 2.025 1.88 3.45 2.017.297.028.598.037.9.026 1.595-.058 2.838-.635 3.692-1.718.632-.802 1.002-1.86 1.144-3.219.236.306.436.656.6 1.055.449 1.099.594 2.38.399 3.635-.279 1.785-1.088 3.25-2.341 4.237C16.296 23.498 14.455 24 12.186 24z"/>
                </svg>
              </a>
            </div>
          </div>

        </div>
      </div>

      {/* Linie + copyright */}
      <div className="border-t border-white/5 py-6 text-center">
        <p className="text-white/20 text-xs tracking-widest uppercase">
          © 2026 Vibe Caffè · Crawley, UK
        </p>
      </div>

    </footer>
  )
}
