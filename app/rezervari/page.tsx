'use client'

import { useState, useEffect } from 'react'

const ORE_DISPONIBILE: string[] = []
for (let h = 7; h <= 20; h++) {
  ORE_DISPONIBILE.push(`${String(h).padStart(2, '0')}:00`)
  if (h < 20) ORE_DISPONIBILE.push(`${String(h).padStart(2, '0')}:30`)
}

function getAzi() { return new Date() }
function formatData(date: Date) { return date.toISOString().split('T')[0] }
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
  const [dataSelectata, setDataSelectata] = useState('')
  const [oraSelectata, setOraSelectata] = useState('')
  const [form, setForm] = useState({ nume: '', email: '', telefon: '', numar_persoane: 2 })
  const [loading, setLoading] = useState(false)
  const [succes, setSucces] = useState(false)
  const [eroare, setEroare] = useState('')
  const [hoveredDay, setHoveredDay] = useState<number | null>(null)
  const [oreOcupate, setOreOcupate] = useState<string[]>([])

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

  async function trimite() {
    setLoading(true); setEroare('')
    try {
      const res = await fetch('/api/rezervari', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...form, data: dataSelectata, ora: oraSelectata }),
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
    setForm({ nume: '', email: '', telefon: '', numar_persoane: 2 })
    setSucces(false); setEroare('')
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
          {pas === 2 && (
            <div className="rounded-3xl p-6 border" style={{ background: 'rgba(255,255,255,0.05)', backdropFilter: 'blur(20px)', borderColor: 'rgba(245,158,11,0.15)' }}>
              <h2 className="text-xl font-bold text-white mb-1">Alege ora</h2>
              <p className="text-xs mb-6 text-amber-400">{formatDataRo(dataSelectata)}</p>
              <div className="grid grid-cols-4 gap-2">
                {ORE_DISPONIBILE.filter(o => !oreOcupate.includes(o)).map((o) => (
                  <button key={o} onClick={() => setOraSelectata(o)}
                    className="py-3 rounded-xl text-sm font-semibold transition-all duration-200 hover:scale-105"
                    style={{
                      background: oraSelectata === o ? 'linear-gradient(135deg, #fcd34d, #f59e0b)' : 'rgba(255,255,255,0.08)',
                      color: oraSelectata === o ? '#1c1008' : 'rgba(0,0,0,0.6)',
                      boxShadow: oraSelectata === o ? '0 4px 15px rgba(245,158,11,0.4)' : 'none',
                      transform: oraSelectata === o ? 'scale(1.05)' : 'scale(1)',
                      border: oraSelectata === o ? 'none' : '1px solid rgba(255,255,255,0.1)',
                    }}>
                    {o}
                  </button>
                ))}
              </div>
              <div className="flex gap-3 mt-6">
                <button onClick={() => setPas(1)} className="flex-1 py-4 rounded-2xl font-semibold text-white/50 transition-all hover:bg-white/5" style={{ border: '1px solid rgba(255,255,255,0.15)' }}>
                  ← Înapoi
                </button>
                <button onClick={() => setPas(3)} disabled={!oraSelectata}
                  className="flex-1 py-4 rounded-2xl font-bold text-black transition-all disabled:opacity-30 disabled:cursor-not-allowed hover:scale-[1.02] hover:shadow-[0_8px_30px_rgba(245,158,11,0.4)]"
                  style={{ background: 'linear-gradient(135deg, #fcd34d, #f59e0b)' }}>
                  Continuă →
                </button>
              </div>
            </div>
          )}

          {/* PASUL 3: Detalii */}
          {pas === 3 && (
            <div className="rounded-3xl p-6 border" style={{ background: 'rgba(255,255,255,0.05)', backdropFilter: 'blur(20px)', borderColor: 'rgba(245,158,11,0.15)' }}>
              <h2 className="text-xl font-bold text-white mb-1">Detaliile tale</h2>
              <p className="text-xs mb-6 text-amber-400">{formatDataRo(dataSelectata)} la {oraSelectata}</p>

              <div className="space-y-4">
                {[
                  { label: 'Nume complet *', key: 'nume', type: 'text', placeholder: 'Ex: Maria Ionescu' },
                  { label: 'Email *', key: 'email', type: 'email', placeholder: 'Ex: maria@gmail.com' },
                  { label: 'Telefon *', key: 'telefon', type: 'tel', placeholder: 'Ex: 07xxxxxxxx' },
                ].map(({ label, key, type, placeholder }) => (
                  <div key={key}>
                    <label className="text-white/50 text-xs mb-1.5 block">{label}</label>
                    <input type={type} placeholder={placeholder}
                      value={form[key as keyof typeof form] as string}
                      onChange={(e) => setForm({ ...form, [key]: e.target.value })}
                      className="w-full rounded-2xl px-5 py-3.5 text-white text-sm placeholder-white/25 focus:outline-none transition-all"
                      style={{ background: 'rgba(255,255,255,0.08)', border: '1px solid rgba(255,255,255,0.15)' }}
                      onFocus={(e) => { e.target.style.borderColor = '#f59e0b'; e.target.style.boxShadow = '0 0 0 3px rgba(245,158,11,0.15)' }}
                      onBlur={(e) => { e.target.style.borderColor = 'rgba(255,255,255,0.15)'; e.target.style.boxShadow = 'none' }}
                    />
                  </div>
                ))}

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

              {eroare && <p className="text-red-500 text-sm mt-4">{eroare}</p>}

              <div className="flex gap-3 mt-8">
                <button onClick={() => setPas(2)} className="flex-1 py-4 rounded-2xl font-semibold text-white/50 transition-all hover:bg-white/5" style={{ border: '1px solid rgba(255,255,255,0.15)' }}>
                  ← Înapoi
                </button>
                <button onClick={trimite} disabled={!form.nume || !form.email || !form.telefon || loading}
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
