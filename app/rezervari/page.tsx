'use client'

import { useState, useEffect, useRef } from 'react'

// ── Coduri de țară ──────────────────────────────────────────────────────────
const CODURI_TARA = [
  { cod: '+44', tara: 'UK', flag: '🇬🇧', lungime: [10, 11] },
  { cod: '+373', tara: 'Moldova', flag: '🇲🇩', lungime: [8] },
  { cod: '+40', tara: 'România', flag: '🇷🇴', lungime: [10] },
  { cod: '+1', tara: 'USA/CAN', flag: '🇺🇸', lungime: [10] },
  { cod: '+49', tara: 'Germania', flag: '🇩🇪', lungime: [10, 11] },
  { cod: '+33', tara: 'Franța', flag: '🇫🇷', lungime: [9] },
  { cod: '+39', tara: 'Italia', flag: '🇮🇹', lungime: [9, 10] },
  { cod: '+34', tara: 'Spania', flag: '🇪🇸', lungime: [9] },
  { cod: '+31', tara: 'Olanda', flag: '🇳🇱', lungime: [9] },
  { cod: '+32', tara: 'Belgia', flag: '🇧🇪', lungime: [8, 9] },
  { cod: '+48', tara: 'Polonia', flag: '🇵🇱', lungime: [9] },
  { cod: '+380', tara: 'Ucraina', flag: '🇺🇦', lungime: [9] },
  { cod: '+7', tara: 'Rusia', flag: '🇷🇺', lungime: [10] },
  { cod: '+90', tara: 'Turcia', flag: '🇹🇷', lungime: [10] },
  { cod: '+971', tara: 'UAE', flag: '🇦🇪', lungime: [9] },
]

function validareEmail(email: string): boolean {
  const e = email.trim()
  return (
    /^[a-zA-Z0-9._%+\-]+@[a-zA-Z0-9.\-]+\.[a-zA-Z]{2,}$/.test(e) &&
    (e.match(/@/g) || []).length === 1
  )
}

function normalizeazaTelefon(numar: string): string {
  return numar.replace(/[\s\-().]/g, '')
}

function validareTelefon(numar: string, lungimi: number[]): boolean {
  const cifre = normalizeazaTelefon(numar).replace(/\D/g, '')
  if (!lungimi.includes(cifre.length)) return false
  // Respinge numere evident false: toate cifrele identice (1111111111) sau secvență simplă (1234567890)
  if (/^(\d)\1+$/.test(cifre)) return false
  if (cifre === '1234567890' || cifre === '0123456789') return false
  return true
}

// Ore program normal: 07:00–20:00
const ORE_NORMALE: string[] = []
for (let h = 7; h <= 20; h++) {
  ORE_NORMALE.push(`${String(h).padStart(2, '0')}:00`)
  if (h < 20) ORE_NORMALE.push(`${String(h).padStart(2, '0')}:30`)
}

// Ore extins pentru evenimente: 00:00–23:30
const ORE_EVENIMENT: string[] = []
for (let h = 0; h < 24; h++) {
  ORE_EVENIMENT.push(`${String(h).padStart(2, '0')}:00`)
  ORE_EVENIMENT.push(`${String(h).padStart(2, '0')}:30`)
}

const DURATE_EVENIMENT = [1, 1.5, 2, 2.5, 3, 3.5, 4, 5, 6, 7, 8]

function formateazaDurata(ore: number): string {
  if (ore === 1) return '1 oră'
  if (ore % 1 === 0) return `${ore} ore`
  const h = Math.floor(ore)
  return `${h}h 30min`
}

function getAzi() { return new Date() }
function formatData(date: Date) {
  const y = date.getFullYear()
  const m = String(date.getMonth() + 1).padStart(2, '0')
  const d = String(date.getDate()).padStart(2, '0')
  return `${y}-${m}-${d}`
}
function addLuni(date: Date, n: number) { const d = new Date(date); d.setMonth(d.getMonth() + n); return d }
function getDaysInMonth(y: number, m: number) { return new Date(y, m + 1, 0).getDate() }
function getFirstDayOfMonth(y: number, m: number) {
  const day = new Date(y, m, 1).getDay()
  return day === 0 ? 6 : day - 1 // Luni = 0
}

function formatDataRo(dateStr: string) {
  const [y, m, d] = dateStr.split('-')
  const luni = ['Ianuarie','Februarie','Martie','Aprilie','Mai','Iunie','Iulie','August','Septembrie','Octombrie','Noiembrie','Decembrie']
  return `${d} ${luni[parseInt(m) - 1]} ${y}`
}

function esteWeekend(year: number, month: number, zi: number) {
  const day = new Date(year, month, zi).getDay()
  return day === 0 || day === 6
}

export default function PaginaRezervari() {
  const azi = getAzi()
  const maxData = addLuni(azi, 6)

  const [pas, setPas] = useState(1)
  const [lunaCalendar, setLunaCalendar] = useState(new Date(azi.getFullYear(), azi.getMonth(), 1))
  const [directie, setDirectie] = useState<'left' | 'right'>('right')
  const [animating, setAnimating] = useState(false)
  const [lunaSelectata, setLunaSelectata] = useState(azi.getMonth())
  const [anSelectat, setAnSelectat] = useState(azi.getFullYear())
  const [tipRezervare, setTipRezervare] = useState<'normal' | 'eveniment'>('normal')
  const [durataEveniment, setDurataEveniment] = useState(2)
  const [dataSelectata, setDataSelectata] = useState('')
  const [oraSelectata, setOraSelectata] = useState('')
  const [form, setForm] = useState({ nume: '', email: '', telefon: '', numar_persoane: 2 })
  const [codTara, setCodTara] = useState(CODURI_TARA[0]) // UK implicit
  const [dropdownDeschis, setDropdownDeschis] = useState(false)
  const [eroriForm, setEroriForm] = useState<{ email?: string; telefon?: string }>({})
  const dropdownRef = useRef<HTMLDivElement>(null)
  const [loading, setLoading] = useState(false)
  const [succes, setSucces] = useState(false)
  const [eroare, setEroare] = useState('')
  const [hoveredDay, setHoveredDay] = useState<number | null>(null)
  const [oreOcupate, setOreOcupate] = useState<string[]>([])
  // Verificare email prin cod
  const [codTrimis, setCodTrimis] = useState(false)
  const [codVerificare, setCodVerificare] = useState('')
  const [loadingCod, setLoadingCod] = useState(false)
  const [eroreCod, setEroreCod] = useState('')
  const [timerCod, setTimerCod] = useState(0) // secunde până poate retrimite

  // Închide dropdown la click în afară
  useEffect(() => {
    function handler(e: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setDropdownDeschis(false)
      }
    }
    document.addEventListener('mousedown', handler)
    return () => document.removeEventListener('mousedown', handler)
  }, [])

  const year = lunaCalendar.getFullYear()
  const month = lunaCalendar.getMonth()
  const daysInMonth = getDaysInMonth(year, month)
  const firstDay = getFirstDayOfMonth(year, month)
  const luniRo = ['Ianuarie','Februarie','Martie','Aprilie','Mai','Iunie','Iulie','August','Septembrie','Octombrie','Noiembrie','Decembrie']

  const potMergeLunaInapoi = lunaCalendar > new Date(azi.getFullYear(), azi.getMonth(), 1)
  const potMergeLunaInainte = lunaCalendar < new Date(maxData.getFullYear(), maxData.getMonth(), 1)

  function esteDisponibila(zi: number) {
    const d = new Date(year, month, zi)
    return d >= new Date(formatData(azi)) && d <= maxData
  }

  function esteAzi(zi: number) {
    return year === azi.getFullYear() && month === azi.getMonth() && zi === azi.getDate()
  }

  function schimbaLuna(directieNoua: 'left' | 'right', novaLuna: Date) {
    if (animating) return
    setDirectie(directieNoua)
    setAnimating(true)
    setTimeout(() => {
      setLunaCalendar(novaLuna)
      setAnimating(false)
    }, 280)
  }

  // Timer countdown pentru retrimitere cod
  useEffect(() => {
    if (timerCod <= 0) return
    const interval = setInterval(() => setTimerCod(t => t - 1), 1000)
    return () => clearInterval(interval)
  }, [timerCod])

  async function trimiteCod() {
    const erori: { email?: string; telefon?: string } = {}
    if (!validareEmail(form.email)) erori.email = 'Adresa de email nu este validă.'
    if (Object.keys(erori).length > 0) { setEroriForm(erori); return }
    setEroriForm({})
    setLoadingCod(true); setEroreCod('')
    try {
      const res = await fetch('/api/trimite-cod', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: form.email }),
      })
      const json = await res.json()
      if (!res.ok) throw new Error(json.eroare)
      setCodTrimis(true)
      setCodVerificare('')
      setTimerCod(60) // 60 secunde până poate retrimite
    } catch (e: unknown) {
      setEroreCod(e instanceof Error ? e.message : 'Eroare la trimiterea codului.')
    } finally {
      setLoadingCod(false)
    }
  }

  async function trimite() {
    // Validare client-side
    const erori: { email?: string; telefon?: string } = {}
    if (!validareEmail(form.email)) {
      erori.email = 'Adresa de email nu este validă.'
    }
    if (!validareTelefon(form.telefon, codTara.lungime)) {
      erori.telefon = `Numărul trebuie să aibă ${codTara.lungime.join(' sau ')} cifre pentru ${codTara.tara}.`
    }
    if (Object.keys(erori).length > 0) {
      setEroriForm(erori)
      return
    }
    setEroriForm({})
    setLoading(true); setEroare('')
    try {
      const telefonComplet = `${codTara.cod}${normalizeazaTelefon(form.telefon).replace(/\D/g, '')}`
      const res = await fetch('/api/rezervari', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...form,
          telefon: telefonComplet,
          data: dataSelectata,
          ora: oraSelectata,
          tip: tipRezervare,
          durata_ore: tipRezervare === 'eveniment' ? durataEveniment : 1,
          cod_verificare: codVerificare,
        }),
      })
      const json = await res.json()
      if (!res.ok) throw new Error(json.eroare)
      setSucces(true)
    } catch (e: unknown) {
      setEroare(e instanceof Error ? e.message : 'Eroare. Încearcă din nou.')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    if (!dataSelectata) { setOreOcupate([]); return }
    fetch(`/api/ore-ocupate?data=${dataSelectata}`)
      .then(r => r.json())
      .then(j => setOreOcupate(j.ore ?? []))
      .catch(() => setOreOcupate([]))
  }, [dataSelectata])

  function rezervareNoua() {
    setPas(1); setDataSelectata(''); setOraSelectata('')
    setTipRezervare('normal'); setDurataEveniment(2)
    setForm({ nume: '', email: '', telefon: '', numar_persoane: 2 })
    setSucces(false); setEroare(''); setEroriForm({})
    setCodTrimis(false); setCodVerificare(''); setEroreCod(''); setTimerCod(0)
  }

  // Ecran succes
  if (succes) {
    return (
      <div className="min-h-screen flex items-center justify-center px-4" style={{ background: 'linear-gradient(160deg, #2c1a0e 0%, #3d2410 50%, #1c1008 100%)' }}>
        <div className="w-full max-w-md text-center">
          <div className="w-24 h-24 rounded-full mx-auto mb-6 flex items-center justify-center text-4xl" style={{ background: 'linear-gradient(135deg, #fcd34d, #f59e0b)', boxShadow: '0 0 60px rgba(245,158,11,0.5)' }}>✓</div>
          <h2 className="text-3xl font-bold text-white mb-3">Rezervare confirmată!</h2>
          <p className="text-amber-400 mb-1 text-lg"><strong>{formatDataRo(dataSelectata)}</strong> la <strong>{oraSelectata}</strong></p>
          <p className="text-white/40 text-sm mb-8">Confirmare la {form.email}</p>
          <button onClick={rezervareNoua} className="w-full py-4 font-bold rounded-2xl text-black transition-all duration-300 hover:opacity-90 hover:scale-[1.02]" style={{ background: 'linear-gradient(135deg, #fcd34d, #f59e0b)' }}>
            Fă o rezervare nouă
          </button>
          <a href="/" className="block w-full py-4 font-semibold rounded-2xl text-center mt-3 transition-all duration-300 hover:bg-white/10" style={{ border: '1px solid rgba(255,255,255,0.2)', color: 'rgba(255,255,255,0.6)' }}>
            ← Înapoi la pagina principală
          </a>
        </div>
      </div>
    )
  }

  return (
    <>
      <style>{`
        @keyframes slideInRight {
          from { opacity: 0; transform: translateX(40px); }
          to   { opacity: 1; transform: translateX(0); }
        }
        @keyframes slideInLeft {
          from { opacity: 0; transform: translateX(-40px); }
          to   { opacity: 1; transform: translateX(0); }
        }
        @keyframes dayPop {
          0%   { transform: scale(1); }
          50%  { transform: scale(1.25); }
          100% { transform: scale(1.1); }
        }
        @keyframes glowPulse {
          0%, 100% { box-shadow: 0 0 20px rgba(245,158,11,0.4), 0 0 40px rgba(245,158,11,0.2); }
          50%       { box-shadow: 0 0 30px rgba(245,158,11,0.7), 0 0 60px rgba(245,158,11,0.3); }
        }
        .day-selected {
          animation: dayPop 0.3s ease forwards, glowPulse 2s ease-in-out infinite;
        }
      `}</style>

      <div className="min-h-screen relative overflow-hidden" style={{ background: 'linear-gradient(160deg, #2c1a0e 0%, #3d2410 50%, #1c1008 100%)' }}>

        {/* Blur orbs fundal */}
        <div className="absolute top-0 left-1/4 w-96 h-96 rounded-full opacity-20 blur-3xl pointer-events-none" style={{ background: '#fcd34d' }} />
        <div className="absolute bottom-1/4 right-1/4 w-72 h-72 rounded-full opacity-15 blur-3xl pointer-events-none" style={{ background: '#f59e0b' }} />

        <div className="relative max-w-lg mx-auto px-4 py-12">

          {/* Header */}
          <div className="text-center mb-10">
            <a href="/" className="inline-flex items-center gap-2 text-xs text-white/40 hover:text-amber-400 transition-colors mb-4">
              ← Pagina principală
            </a>
            <p className="text-xs tracking-[0.3em] uppercase font-semibold mb-2 text-amber-400">Vibe Caffè</p>
            <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">Rezervă o masă</h1>
            <p className="text-white/40 text-sm">3 pași simpli</p>
          </div>

          {/* Selector tip rezervare */}
          <div className="flex gap-3 mb-8">
            <button
              onClick={() => { setTipRezervare('normal'); setOraSelectata('') }}
              className="flex-1 flex flex-col items-center gap-1.5 py-4 rounded-2xl font-semibold text-sm transition-all duration-200"
              style={{
                background: tipRezervare === 'normal' ? 'linear-gradient(135deg, #fcd34d, #f59e0b)' : 'rgba(255,255,255,0.06)',
                color: tipRezervare === 'normal' ? '#1c1008' : 'rgba(255,255,255,0.6)',
                border: tipRezervare === 'normal' ? 'none' : '1px solid rgba(255,255,255,0.12)',
                boxShadow: tipRezervare === 'normal' ? '0 4px 20px rgba(245,158,11,0.4)' : 'none',
              }}
            >
              <span className="text-xl">☕</span>
              <span>Rezervare masă</span>
              <span className="text-[10px] opacity-70 font-normal">07:00–20:00</span>
            </button>
            <button
              onClick={() => { setTipRezervare('eveniment'); setOraSelectata('') }}
              className="flex-1 flex flex-col items-center gap-1.5 py-4 rounded-2xl font-semibold text-sm transition-all duration-200"
              style={{
                background: tipRezervare === 'eveniment' ? 'linear-gradient(135deg, #a78bfa, #7c3aed)' : 'rgba(255,255,255,0.06)',
                color: tipRezervare === 'eveniment' ? '#fff' : 'rgba(255,255,255,0.6)',
                border: tipRezervare === 'eveniment' ? 'none' : '1px solid rgba(255,255,255,0.12)',
                boxShadow: tipRezervare === 'eveniment' ? '0 4px 20px rgba(124,58,237,0.4)' : 'none',
              }}
            >
              <span className="text-xl">🎉</span>
              <span>Eveniment privat</span>
              <span className="text-[10px] opacity-70 font-normal">orice oră + durată</span>
            </button>
          </div>

          {/* Selector durată — apare doar la eveniment */}
          {tipRezervare === 'eveniment' && (
            <div className="mb-6 rounded-2xl p-4" style={{ background: 'rgba(124,58,237,0.1)', border: '1px solid rgba(167,139,250,0.2)' }}>
              <p className="text-xs text-purple-300 mb-3 font-semibold tracking-wider uppercase">Durata evenimentului</p>
              <div className="flex flex-wrap gap-2">
                {DURATE_EVENIMENT.map(d => (
                  <button key={d} onClick={() => { setDurataEveniment(d); setOraSelectata('') }}
                    className="px-3 py-1.5 rounded-xl text-xs font-semibold transition-all"
                    style={{
                      background: durataEveniment === d ? 'linear-gradient(135deg, #a78bfa, #7c3aed)' : 'rgba(255,255,255,0.07)',
                      color: durataEveniment === d ? '#fff' : 'rgba(255,255,255,0.55)',
                      border: durataEveniment === d ? 'none' : '1px solid rgba(255,255,255,0.1)',
                    }}
                  >
                    {formateazaDurata(d)}
                  </button>
                ))}
              </div>
              <p className="text-purple-300/60 text-[11px] mt-3">
                + 30 min curățenie rezervate automat după eveniment
              </p>
            </div>
          )}

          {/* Indicator pași */}
          <div className="flex items-center justify-center gap-3 mb-10">
            {[1, 2, 3].map((p) => (
              <div key={p} className="flex items-center gap-3">
                <div className={`w-9 h-9 rounded-full flex items-center justify-center font-bold text-sm transition-all duration-300 ${
                  pas === p ? 'text-black scale-110' :
                  pas > p ? 'text-white/70' : 'text-white/30'
                }`} style={{
                  background: pas === p ? 'linear-gradient(135deg, #fcd34d, #f59e0b)' :
                  pas > p ? 'rgba(245,158,11,0.3)' : 'rgba(255,255,255,0.08)',
                  boxShadow: pas === p ? '0 0 20px rgba(245,158,11,0.4)' : 'none',
                }}>
                  {pas > p ? '✓' : p}
                </div>
                {p < 3 && <div className="w-10 h-px transition-all duration-500" style={{ background: pas > p ? 'linear-gradient(90deg, #f59e0b, #fcd34d)' : 'rgba(255,255,255,0.15)' }} />}
              </div>
            ))}
          </div>

          {/* PASUL 1: Calendar cu fotografie cafea sus */}
          {pas === 1 && (() => {
            const luniRoScurt = ['Ian','Feb','Mar','Apr','Mai','Iun','Iul','Aug','Sep','Oct','Nov','Dec']
            const luniRoLung = ['Ianuarie','Februarie','Martie','Aprilie','Mai','Iunie','Iulie','August','Septembrie','Octombrie','Noiembrie','Decembrie']

            const luniDisponibile: { luna: number; an: number }[] = []
            for (let i = 0; i <= 6; i++) {
              const d = new Date(azi.getFullYear(), azi.getMonth() + i, 1)
              luniDisponibile.push({ luna: d.getMonth(), an: d.getFullYear() })
            }

            const primaZiOffset = new Date(anSelectat, lunaSelectata, 1).getDay()
            const offsetLuni = primaZiOffset === 0 ? 6 : primaZiOffset - 1
            const totalZileLuna = new Date(anSelectat, lunaSelectata + 1, 0).getDate()

            return (
              <div className="rounded-3xl overflow-hidden border" style={{ borderColor: 'rgba(245,158,11,0.2)', background: 'rgba(255,255,255,0.04)', backdropFilter: 'blur(20px)' }}>

                {/* Imagine cafea sus */}
                <div className="relative h-44 overflow-hidden">
                  <img
                    src="https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=600&auto=format&fit=crop"
                    alt="Cafea"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0" style={{ background: 'linear-gradient(to bottom, rgba(28,16,8,0.1) 0%, rgba(28,16,8,0.6) 100%)' }} />
                  {/* Selector luni peste imagine — centrat */}
                  <div className="absolute bottom-0 left-0 right-0 flex justify-center gap-2 px-4 pb-3 pt-2 flex-wrap">
                    {luniDisponibile.map(({ luna, an }) => {
                      const activa = luna === lunaSelectata && an === anSelectat
                      return (
                        <button
                          key={`${an}-${luna}`}
                          onClick={() => { setLunaSelectata(luna); setAnSelectat(an); setDataSelectata('') }}
                          className="flex-shrink-0 px-4 py-1.5 rounded-full text-xs font-bold tracking-wide transition-all duration-200 hover:scale-105"
                          style={{
                            background: activa ? 'linear-gradient(135deg, #fcd34d, #f59e0b)' : 'rgba(0,0,0,0.5)',
                            color: activa ? '#1c1008' : 'rgba(255,255,255,0.85)',
                            backdropFilter: 'blur(10px)',
                            border: activa ? 'none' : '1px solid rgba(255,255,255,0.2)',
                            boxShadow: activa ? '0 4px 12px rgba(245,158,11,0.4)' : 'none',
                          }}
                        >
                          {luniRoScurt[luna]} {an !== azi.getFullYear() ? an : ''}
                        </button>
                      )
                    })}
                  </div>
                </div>

                {/* Header lună */}
                <div className="flex items-center justify-between px-5 py-4" style={{ borderBottom: '1px solid rgba(245,158,11,0.1)' }}>
                  <button
                    onClick={() => {
                      const prev = new Date(anSelectat, lunaSelectata - 1, 1)
                      const primaLunaDisp = luniDisponibile[0]
                      if (prev >= new Date(primaLunaDisp.an, primaLunaDisp.luna, 1)) {
                        setLunaSelectata(prev.getMonth()); setAnSelectat(prev.getFullYear()); setDataSelectata('')
                      }
                    }}
                    className="w-8 h-8 rounded-full flex items-center justify-center transition-all hover:scale-110"
                    style={{ background: 'rgba(255,255,255,0.08)', color: 'rgba(255,255,255,0.5)' }}
                  >‹</button>
                  <p className="text-white font-bold text-sm tracking-widest uppercase">{luniRoLung[lunaSelectata]} {anSelectat}</p>
                  <button
                    onClick={() => {
                      const next = new Date(anSelectat, lunaSelectata + 1, 1)
                      const ultimaLuna = luniDisponibile[luniDisponibile.length - 1]
                      if (next <= new Date(ultimaLuna.an, ultimaLuna.luna, 1)) {
                        setLunaSelectata(next.getMonth()); setAnSelectat(next.getFullYear()); setDataSelectata('')
                      }
                    }}
                    className="w-8 h-8 rounded-full flex items-center justify-center transition-all hover:scale-110"
                    style={{ background: 'rgba(255,255,255,0.08)', color: 'rgba(255,255,255,0.5)' }}
                  >›</button>
                </div>

                {/* Grid calendar clasic */}
                <div className="px-4 py-4">
                  {/* Header zile săptămână */}
                  <div className="grid grid-cols-7 mb-2">
                    {['L','M','M','J','V','S','D'].map((z, i) => (
                      <div key={i} className="text-center text-[11px] font-bold tracking-wider py-1"
                        style={{ color: i >= 5 ? '#f59e0b' : 'rgba(255,255,255,0.35)' }}>
                        {z}
                      </div>
                    ))}
                  </div>

                  {/* Zile */}
                  <div className="grid grid-cols-7 gap-y-1">
                    {Array.from({ length: offsetLuni }).map((_, i) => (
                      <div key={`empty-${i}`} />
                    ))}
                    {Array.from({ length: totalZileLuna }).map((_, i) => {
                      const zi = i + 1
                      const d = new Date(anSelectat, lunaSelectata, zi)
                      const dateStr = formatData(d)
                      const selectata = dataSelectata === dateStr
                      const esteAziCard = formatData(d) === formatData(azi)
                      const ziSapt = d.getDay()
                      const weekend = ziSapt === 0 || ziSapt === 6
                      const indisponibila = d < new Date(formatData(azi)) || d > maxData

                      return (
                        <button
                          key={`zi-${lunaSelectata}-${anSelectat}-${zi}`}
                          onClick={() => !indisponibila && setDataSelectata(dateStr)}
                          disabled={indisponibila}
                          className="relative flex items-center justify-center aspect-square rounded-full text-sm font-semibold transition-all duration-150 mx-auto w-9 h-9"
                          style={{
                            background: selectata
                              ? 'linear-gradient(135deg, #fcd34d, #f59e0b)'
                              : esteAziCard
                              ? 'rgba(245,158,11,0.15)'
                              : 'transparent',
                            color: selectata
                              ? '#1c1008'
                              : indisponibila
                              ? 'rgba(255,255,255,0.15)'
                              : weekend
                              ? '#fcd34d'
                              : 'rgba(255,255,255,0.85)',
                            boxShadow: selectata ? '0 4px 15px rgba(245,158,11,0.4)' : 'none',
                            border: esteAziCard && !selectata ? '1px solid rgba(245,158,11,0.4)' : 'none',
                            fontWeight: selectata || esteAziCard ? 700 : 500,
                          }}
                        >
                          {zi}
                        </button>
                      )
                    })}
                  </div>
                </div>

                {/* Footer: preview dată + buton */}
                <div className="px-4 pb-5 pt-2" style={{ borderTop: '1px solid rgba(245,158,11,0.08)' }}>
                  {dataSelectata ? (
                    <div className="flex items-center justify-between">
                      <div className="px-4 py-2 rounded-2xl" style={{ background: 'rgba(245,158,11,0.1)', border: '1px solid rgba(245,158,11,0.2)' }}>
                        <p className="text-amber-400 font-semibold text-sm">✦ {formatDataRo(dataSelectata)}</p>
                      </div>
                      <button
                        onClick={() => setPas(2)}
                        className="px-6 py-2.5 font-bold rounded-2xl text-black text-sm transition-all hover:scale-105 hover:shadow-[0_6px_20px_rgba(245,158,11,0.4)]"
                        style={{ background: 'linear-gradient(135deg, #fcd34d, #f59e0b)' }}
                      >
                        Continuă →
                      </button>
                    </div>
                  ) : (
                    <p className="text-center text-sm font-semibold py-1" style={{ color: 'rgba(255,255,255,0.55)', letterSpacing: '0.1em' }}>← Selectează o zi din calendar →</p>
                  )}
                </div>
              </div>
            )
          })()}

          {/* PASUL 2: Ora */}
          {pas === 2 && (() => {
            const oreAfisate = tipRezervare === 'eveniment' ? ORE_EVENIMENT : ORE_NORMALE
            const accentColor = tipRezervare === 'eveniment' ? '#7c3aed' : '#f59e0b'
            const accentGrad = tipRezervare === 'eveniment'
              ? 'linear-gradient(135deg, #a78bfa, #7c3aed)'
              : 'linear-gradient(135deg, #fcd34d, #f59e0b)'
            const borderColor = tipRezervare === 'eveniment' ? 'rgba(167,139,250,0.2)' : 'rgba(245,158,11,0.15)'

            return (
            <div className="rounded-3xl p-6 border" style={{ background: 'rgba(255,255,255,0.05)', backdropFilter: 'blur(20px)', borderColor }}>
              <h2 className="text-xl font-bold text-white mb-1">Alege ora {tipRezervare === 'eveniment' ? 'de start' : ''}</h2>
              <p className="text-xs mb-1" style={{ color: accentColor }}>{formatDataRo(dataSelectata)}</p>
              {tipRezervare === 'eveniment' && (
                <p className="text-xs mb-4 text-white/40">Durată: {formateazaDurata(durataEveniment)} + 30 min curățenie</p>
              )}
              {tipRezervare === 'normal' && <div className="mb-4" />}
              <div className="grid grid-cols-4 gap-2">
                {oreAfisate.map((o) => {
                  const eOcupata = oreOcupate.includes(o)
                  const eSelectata = oraSelectata === o
                  return (
                    <button key={o} onClick={() => !eOcupata && setOraSelectata(o)}
                      disabled={eOcupata}
                      className="py-3 rounded-xl text-sm font-semibold transition-all duration-200 hover:scale-105 disabled:opacity-25 disabled:cursor-not-allowed disabled:hover:scale-100"
                      style={{
                        background: eSelectata ? accentGrad : 'rgba(255,255,255,0.08)',
                        color: eSelectata ? (tipRezervare === 'eveniment' ? '#fff' : '#1c1008') : 'rgba(255,255,255,0.75)',
                        boxShadow: eSelectata ? `0 4px 15px ${accentColor}66` : 'none',
                        transform: eSelectata ? 'scale(1.05)' : 'scale(1)',
                        border: eSelectata ? 'none' : '1px solid rgba(255,255,255,0.1)',
                        textDecoration: eOcupata ? 'line-through' : 'none',
                      }}>
                      {o}
                    </button>
                  )
                })}
              </div>
              <div className="flex gap-3 mt-6">
                <button onClick={() => setPas(1)} className="flex-1 py-4 rounded-2xl font-semibold text-white/50 transition-all hover:bg-white/5" style={{ border: '1px solid rgba(255,255,255,0.15)' }}>
                  ← Înapoi
                </button>
                <button onClick={() => setPas(3)} disabled={!oraSelectata}
                  className="flex-1 py-4 rounded-2xl font-bold transition-all disabled:opacity-30 disabled:cursor-not-allowed hover:scale-[1.02]"
                  style={{
                    background: accentGrad,
                    color: tipRezervare === 'eveniment' ? '#fff' : '#1c1008',
                  }}>
                  Continuă →
                </button>
              </div>
            </div>
            )
          })()}

          {/* PASUL 3: Detalii */}
          {pas === 3 && (
            <div className="rounded-3xl p-6 border" style={{ background: 'rgba(255,255,255,0.05)', backdropFilter: 'blur(20px)', borderColor: 'rgba(245,158,11,0.15)' }}>
              <h2 className="text-xl font-bold text-white mb-1">Detaliile tale</h2>
              <p className="text-xs mb-6 text-amber-400">{formatDataRo(dataSelectata)} la {oraSelectata}</p>

              <div className="space-y-4">

                {/* Nume — max 60 caractere, doar litere+spațiu */}
                <div>
                  <label className="text-white/50 text-xs mb-1.5 block">
                    Nume complet * <span className="text-white/20 font-normal">({form.nume.length}/60)</span>
                  </label>
                  <input type="text" placeholder="Ex: Maria Ionescu"
                    value={form.nume}
                    onChange={(e) => {
                      // Permite litere (inclusiv diacritice), spațiu, cratimă — fără cifre sau simboluri
                      const v = e.target.value.replace(/[^a-zA-ZăâîșțĂÂÎȘȚáéíóúÁÉÍÓÚàèìòùÀÈÌÒÙ\- ]/g, '').slice(0, 60)
                      setForm({ ...form, nume: v })
                    }}
                    className="w-full rounded-2xl px-5 py-3.5 text-white text-sm placeholder-white/25 focus:outline-none transition-all"
                    style={{ background: 'rgba(255,255,255,0.08)', border: '1px solid rgba(255,255,255,0.15)' }}
                    onFocus={(e) => { e.target.style.borderColor = '#f59e0b'; e.target.style.boxShadow = '0 0 0 3px rgba(245,158,11,0.15)' }}
                    onBlur={(e) => { e.target.style.borderColor = 'rgba(255,255,255,0.15)'; e.target.style.boxShadow = 'none' }}
                  />
                </div>

                {/* Email — validare caracter cu caracter */}
                <div>
                  <label className="text-white/50 text-xs mb-1.5 block">Email *</label>
                  <input type="email" placeholder="Ex: maria@gmail.com"
                    value={form.email}
                    onChange={(e) => {
                      // Blochează spații și @ duplicate
                      const v = e.target.value.replace(/\s/g, '')
                      // Max un singur @
                      const parts = v.split('@')
                      const curat = parts.length > 2 ? parts[0] + '@' + parts.slice(1).join('') : v
                      setForm({ ...form, email: curat })
                      setEroriForm(prev => ({ ...prev, email: undefined }))
                    }}
                    className="w-full rounded-2xl px-5 py-3.5 text-white text-sm placeholder-white/25 focus:outline-none transition-all"
                    style={{
                      background: 'rgba(255,255,255,0.08)',
                      border: eroriForm.email ? '1px solid #ef4444' : '1px solid rgba(255,255,255,0.15)',
                    }}
                    onFocus={(e) => { if (!eroriForm.email) { e.target.style.borderColor = '#f59e0b'; e.target.style.boxShadow = '0 0 0 3px rgba(245,158,11,0.15)' } }}
                    onBlur={(e) => {
                      // Validare la blur
                      if (form.email && !validareEmail(form.email)) {
                        setEroriForm(prev => ({ ...prev, email: 'Adresă invalidă. Ex: maria@gmail.com' }))
                        e.target.style.borderColor = '#ef4444'
                      } else {
                        e.target.style.borderColor = 'rgba(255,255,255,0.15)'
                      }
                      e.target.style.boxShadow = 'none'
                    }}
                  />
                  {eroriForm.email && <p className="text-red-400 text-xs mt-1">⚠ {eroriForm.email}</p>}
                </div>

                {/* Telefon cu selector cod țară */}
                <div>
                  <label className="text-white/50 text-xs mb-1.5 block">Telefon *</label>
                  <div className="flex gap-2">

                    {/* Dropdown cod țară */}
                    <div className="relative" ref={dropdownRef}>
                      <button
                        type="button"
                        onClick={() => setDropdownDeschis(!dropdownDeschis)}
                        className="flex items-center gap-1.5 px-3 py-3.5 rounded-2xl text-sm font-semibold text-white transition-all whitespace-nowrap"
                        style={{ background: 'rgba(255,255,255,0.08)', border: dropdownDeschis ? '1px solid #f59e0b' : '1px solid rgba(255,255,255,0.15)', minWidth: '90px' }}
                      >
                        <span>{codTara.flag}</span>
                        <span className="text-amber-400">{codTara.cod}</span>
                        <span className="text-white/40 text-xs">▾</span>
                      </button>
                      {dropdownDeschis && (
                        <div className="absolute top-full mt-1 left-0 z-50 rounded-2xl overflow-hidden overflow-y-auto max-h-64 w-52"
                          style={{ background: '#2c1a0e', border: '1px solid rgba(245,158,11,0.3)', boxShadow: '0 20px 40px rgba(0,0,0,0.6)' }}>
                          {CODURI_TARA.map((t) => (
                            <button key={t.cod} type="button"
                              onClick={() => { setCodTara(t); setDropdownDeschis(false); setForm(f => ({ ...f, telefon: '' })); setEroriForm(prev => ({ ...prev, telefon: undefined })) }}
                              className="w-full flex items-center gap-3 px-4 py-3 text-sm transition-all hover:bg-amber-400/10 text-left"
                              style={{ color: codTara.cod === t.cod ? '#fcd34d' : 'rgba(255,255,255,0.8)', borderBottom: '1px solid rgba(255,255,255,0.05)' }}
                            >
                              <span>{t.flag}</span>
                              <span className="flex-1">{t.tara}</span>
                              <span className="text-white/40 text-xs">{t.cod}</span>
                            </button>
                          ))}
                        </div>
                      )}
                    </div>

                    {/* Câmp număr — doar cifre, maxim cifre țării */}
                    <div className="flex-1">
                      <input
                        type="tel"
                        inputMode="numeric"
                        placeholder={`${codTara.lungime[codTara.lungime.length - 1]} cifre`}
                        value={form.telefon}
                        onChange={(e) => {
                          // Doar cifre, max lungimea maximă a țării selectate
                          const maxCifre = Math.max(...codTara.lungime)
                          const v = e.target.value.replace(/\D/g, '').slice(0, maxCifre)
                          setForm({ ...form, telefon: v })
                          setEroriForm(prev => ({ ...prev, telefon: undefined }))
                        }}
                        className="w-full rounded-2xl px-5 py-3.5 text-white text-sm placeholder-white/25 focus:outline-none transition-all"
                        style={{
                          background: 'rgba(255,255,255,0.08)',
                          border: eroriForm.telefon ? '1px solid #ef4444' : '1px solid rgba(255,255,255,0.15)',
                        }}
                        onFocus={(e) => { if (!eroriForm.telefon) { e.target.style.borderColor = '#f59e0b'; e.target.style.boxShadow = '0 0 0 3px rgba(245,158,11,0.15)' } }}
                        onBlur={(e) => {
                          // Validare la blur — trebuie exact numărul de cifre
                          if (form.telefon && !validareTelefon(form.telefon, codTara.lungime)) {
                            const necesar = codTara.lungime.join(' sau ')
                            setEroriForm(prev => ({ ...prev, telefon: `Trebuie exact ${necesar} cifre pentru ${codTara.tara}.` }))
                            e.target.style.borderColor = '#ef4444'
                          } else {
                            e.target.style.borderColor = 'rgba(255,255,255,0.15)'
                          }
                          e.target.style.boxShadow = 'none'
                        }}
                      />
                    </div>
                  </div>
                  {eroriForm.telefon && <p className="text-red-400 text-xs mt-1">⚠ {eroriForm.telefon}</p>}
                  {!eroriForm.telefon && (
                    <p className="text-white/30 text-[11px] mt-1">
                      {codTara.tara}: exact {codTara.lungime.join(' sau ')} cifre
                      {form.telefon.length > 0 && ` · ai introdus ${form.telefon.length}`}
                    </p>
                  )}
                </div>

                {/* Confirmare email */}
                <div>
                  <p className="text-white/30 text-[11px]">✉️ Confirmarea se trimite pe email la: <span className="text-amber-400/60">{form.email || 'adresa ta de email'}</span></p>
                </div>

                <div>
                  <label className="text-white/50 text-xs mb-1.5 block">Număr persoane (1–12)</label>
                  <div className="flex items-center gap-4">
                    <button onClick={() => setForm({ ...form, numar_persoane: Math.max(1, form.numar_persoane - 1) })}
                      className="w-12 h-12 rounded-xl text-2xl font-bold text-white transition-all hover:scale-110"
                      style={{ background: 'rgba(255,255,255,0.08)', border: '1px solid rgba(0,0,0,0.1)' }}>−</button>
                    <span className="text-white text-2xl font-bold w-8 text-center">{form.numar_persoane}</span>
                    <button onClick={() => setForm({ ...form, numar_persoane: Math.min(12, form.numar_persoane + 1) })}
                      className="w-12 h-12 rounded-xl text-2xl font-bold text-white transition-all hover:scale-110"
                      style={{ background: 'rgba(255,255,255,0.08)', border: '1px solid rgba(0,0,0,0.1)' }}>+</button>
                  </div>
                </div>
              </div>

              {/* ── Verificare email prin cod ── */}
              <div className="mt-6 rounded-2xl p-4" style={{ background: 'rgba(245,158,11,0.06)', border: '1px solid rgba(245,158,11,0.15)' }}>
                <p className="text-white/50 text-xs mb-3">🔐 Verificare email — trimitem un cod de 6 cifre pe <span className="text-amber-400/80">{form.email || 'adresa ta'}</span></p>

                {!codTrimis ? (
                  // Buton trimitere cod
                  <button
                    onClick={trimiteCod}
                    disabled={!form.email || loadingCod}
                    className="w-full py-3 rounded-xl font-semibold text-sm transition-all disabled:opacity-30 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                    style={{ background: 'rgba(245,158,11,0.15)', border: '1px solid rgba(245,158,11,0.3)', color: '#fcd34d' }}
                  >
                    {loadingCod ? (
                      <>
                        <svg className="animate-spin w-4 h-4" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
                        </svg>
                        Se trimite codul...
                      </>
                    ) : '📨 Trimite cod de verificare'}
                  </button>
                ) : (
                  // Câmp introducere cod + retrimitere
                  <div className="space-y-3">
                    <div className="flex gap-2">
                      <input
                        type="text"
                        inputMode="numeric"
                        maxLength={6}
                        placeholder="_ _ _ _ _ _"
                        value={codVerificare}
                        onChange={e => setCodVerificare(e.target.value.replace(/\D/g, '').slice(0, 6))}
                        className="flex-1 rounded-xl px-4 py-3 text-white text-center text-xl font-bold tracking-[0.3em] outline-none transition-all"
                        style={{ background: 'rgba(0,0,0,0.3)', border: `1px solid ${codVerificare.length === 6 ? 'rgba(245,158,11,0.5)' : 'rgba(255,255,255,0.1)'}` }}
                      />
                    </div>
                    <div className="flex items-center justify-between">
                      <p className="text-white/30 text-xs">Codul expiră în 15 minute</p>
                      <button
                        onClick={trimiteCod}
                        disabled={timerCod > 0 || loadingCod}
                        className="text-xs transition-all disabled:opacity-30 disabled:cursor-not-allowed"
                        style={{ color: timerCod > 0 ? 'rgba(255,255,255,0.3)' : '#fcd34d' }}
                      >
                        {timerCod > 0 ? `Retrimite în ${timerCod}s` : '↻ Trimite un cod nou'}
                      </button>
                    </div>
                  </div>
                )}

                {eroreCod && <p className="text-red-400 text-xs mt-2">{eroreCod}</p>}
              </div>

              {eroare && <p className="text-red-500 text-sm mt-4">{eroare}</p>}

              <div className="flex gap-3 mt-6">
                <button onClick={() => setPas(2)} className="flex-1 py-4 rounded-2xl font-semibold text-white/50 transition-all hover:bg-white/5" style={{ border: '1px solid rgba(255,255,255,0.15)' }}>
                  ← Înapoi
                </button>
                <button
                  onClick={trimite}
                  disabled={!form.nume || !form.email || !form.telefon || !codTrimis || codVerificare.length !== 6 || loading}
                  className="flex-1 py-4 rounded-2xl font-bold text-black transition-all disabled:opacity-30 disabled:cursor-not-allowed flex items-center justify-center gap-2 hover:scale-[1.02] hover:shadow-[0_8px_30px_rgba(245,158,11,0.4)]"
                  style={{ background: 'linear-gradient(135deg, #fcd34d, #f59e0b)' }}>
                  {loading ? (
                    <>
                      <svg className="animate-spin w-5 h-5" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
                      </svg>
                      Se trimite...
                    </>
                  ) : 'Rezervă acum ✦'}
                </button>
              </div>
            </div>
          )}

        </div>
      </div>
    </>
  )
}
